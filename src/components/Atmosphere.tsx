import { useEffect, useRef } from "react";

/**
 * ATMOSPHERE — the hero's living ground.
 *
 * A domain-warped fbm gradient rendered in raw WebGL1. No three.js, no
 * @react-three/fiber, no @shadergradient/react.
 *
 * WHY HAND-ROLLED. The measured cost of the library route, built and
 * gzipped on 2026-08-04:
 *
 *     @shadergradient/react + @react-three/fiber
 *     + three + three-stdlib + camera-controls .... 342.3 KB gzip
 *     this file ..................................... ~3 KB gzip
 *     the entire rest of the site .................. 109.9 KB gzip
 *
 * The library would have tripled the site's payload to decorate a page
 * whose headline promise is "every build ships under 2 MB, interactive
 * inside the first second", directly beside a readout of the Atta
 * build's 25.5 KB. The argument on this page has to survive its own
 * network tab. A background is not allowed to cost more than the work.
 *
 * THE TEAL GATE. Teal appears here only as low-amplitude LIGHT — a
 * bloom anchored under the phone, reading as screen spill on the
 * stage. It is deliberately held below the threshold of being a
 * discrete coloured region, so it does not consume one of the three
 * teal regions the homepage is allowed. It is never a shape, an edge
 * or a word. If you raise TEAL_GAIN to where the bloom reads as an
 * object rather than as light, it becomes a fourth region and the
 * census in Home.tsx is wrong.
 *
 * BANDING. Large dark gradients quantise into visible steps on 8-bit
 * displays, which is one of the most reliable ways a page reads as
 * cheap. The shader dithers with a per-pixel hash before writing, at
 * roughly half a code value — invisible as noise, decisive on bands.
 */

/* Ordered from the deep end of the navy ramp. Sourced from tokens.css:
   --color-ground-deep, --color-ground-primary, --color-ground-raised. */
const VERT = `
attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;

uniform vec2  u_res;
uniform float u_time;
uniform vec2  u_bloom;    // cool bloom anchor, in 0..1 uv space
uniform float u_tealGain;
uniform vec2  u_warm;     // warm bloom anchor
uniform float u_warmGain;

/* --- value noise + fbm ------------------------------------------- */
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.02 + vec2(17.3, 9.1);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  /* Correct for aspect so the flow doesn't stretch on wide viewports. */
  vec2 st = uv;
  st.x *= u_res.x / u_res.y;

  float t = u_time * 0.028;

  /* Domain warp — two fbm lookups feeding a third. This is what makes
     the field read as slow weather rather than as a moving gradient. */
  vec2 q = vec2(fbm(st + vec2(0.0, t)), fbm(st + vec2(5.2, 1.3 - t)));
  vec2 r = vec2(
    fbm(st + 2.4 * q + vec2(1.7, 9.2) + 0.15 * t),
    fbm(st + 2.4 * q + vec2(8.3, 2.8) - 0.12 * t)
  );
  float f = fbm(st + 2.0 * r);

  /* --- the navy ramp --------------------------------------------- */
  vec3 deep    = vec3(0.055, 0.106, 0.192);  // #0E1B31
  vec3 primary = vec3(0.090, 0.165, 0.290);  // #172A4A
  vec3 raised  = vec3(0.133, 0.227, 0.380);  // #223A61

  vec3 col = mix(deep, primary, smoothstep(0.25, 0.85, f));
  col = mix(col, raised, smoothstep(0.55, 1.05, f + 0.22 * r.x));

  /* A broad vertical lift so the stage has a top-down light, which
     keeps the phone from floating in an undifferentiated field. */
  col += vec3(0.020, 0.028, 0.045) * smoothstep(0.15, 1.0, uv.y);

  /* --- teal bloom: LIGHT, not a region --------------------------- */
  vec2 bd = uv - u_bloom;
  bd.x *= u_res.x / u_res.y;
  float d = length(bd);
  float bloom = exp(-d * d * 5.5);
  /* Modulated by the noise field so the bloom has the same weather as
     everything else and never reads as a hard radial sprite. */
  bloom *= 0.65 + 0.35 * f;
  col += vec3(0.031, 0.780, 0.863) * bloom * u_tealGain;

  /* --- warm bloom ------------------------------------------------
     The counterweight to the teal, and the reason the navy stopped
     reading cold. A single cool light source makes a dark ground
     feel like a screen; two lights of opposing temperature make it
     feel like a room. Anchored away from the phone so the two never
     mix into grey, and held to a lower gain than the teal — it is
     ambient warmth, not a second focal point. */
  vec2 wd = uv - u_warm;
  wd.x *= u_res.x / u_res.y;
  float wdist = length(wd);
  float warm = exp(-wdist * wdist * 3.2);
  warm *= 0.6 + 0.4 * (1.0 - f);
  col += vec3(0.910, 0.640, 0.235) * warm * u_warmGain;

  /* --- vignette --------------------------------------------------- */
  vec2 vd = uv - 0.5;
  col *= 1.0 - 0.28 * dot(vd, vd);

  /* --- dither ----------------------------------------------------- */
  float dith = (hash(gl_FragCoord.xy) - 0.5) / 255.0;
  gl_FragColor = vec4(col + dith, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export default function Atmosphere({
  /** Cool bloom anchor in 0..1 uv space, y up. Put it under the playable. */
  bloomX = 0.72,
  bloomY = 0.52,
  tealGain = 0.10,
  /** Warm bloom anchor. Keep it well away from the cool one. */
  warmX = 0.14,
  warmY = 0.16,
  warmGain = 0.15,
  className = "",
}: {
  bloomX?: number;
  bloomY?: number;
  tealGain?: number;
  warmX?: number;
  warmY?: number;
  warmGain?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      (canvas.getContext("webgl", { antialias: false, alpha: false, depth: false }) as
        | WebGLRenderingContext
        | null) ??
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

    /* No WebGL — the CSS gradient underneath the canvas is the whole
       fallback, so there is nothing to do but leave the canvas blank
       and let it show through. */
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    /* One oversized triangle beats a quad: no diagonal seam, one less
       vertex, and the clip happens for free. */
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uBloom = gl.getUniformLocation(prog, "u_bloom");
    const uTeal = gl.getUniformLocation(prog, "u_tealGain");
    const uWarm = gl.getUniformLocation(prog, "u_warm");
    const uWarmGain = gl.getUniformLocation(prog, "u_warmGain");

    gl.uniform2f(uBloom, bloomX, bloomY);
    gl.uniform1f(uTeal, tealGain);
    gl.uniform2f(uWarm, warmX, warmY);
    gl.uniform1f(uWarmGain, warmGain);

    /* The field is all low frequency — it survives being rendered
       below device resolution, and halving DPR on retina roughly
       quarters the fragment cost. */
    const dpr = () => Math.min(window.devicePixelRatio || 1, 1.5);

    let w = 0;
    let h = 0;
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const nw = Math.max(1, Math.round(r.width * dpr()));
      const nh = Math.max(1, Math.round(r.height * dpr()));
      if (nw === w && nh === h) return;
      w = nw;
      h = nh;
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    };

    const draw = (tSec: number) => {
      gl.uniform1f(uTime, tSec);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    let raf = 0;
    let running = false;
    let start = performance.now();
    /* Time is accumulated rather than read from the clock, so pausing
       and resuming never jumps the field. */
    let elapsed = 0;

    const loop = (now: number) => {
      elapsed += (now - start) / 1000;
      start = now;
      resize();
      draw(elapsed);
      raf = requestAnimationFrame(loop);
    };

    const play = () => {
      if (running || reduced.matches) return;
      running = true;
      start = performance.now();
      raf = requestAnimationFrame(loop);
    };

    const pause = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(raf);
    };

    /* Reduced motion keeps the material — it just stops moving. One
       frame at a fixed offset, redrawn only on resize. */
    const still = () => {
      pause();
      resize();
      draw(12.0);
    };

    const onMotionChange = () => (reduced.matches ? still() : play());

    /* Offscreen and backgrounded tabs cost nothing. */
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !document.hidden) onMotionChange();
        else pause();
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    const onVisibility = () => {
      if (document.hidden) pause();
      else onMotionChange();
    };

    const onResize = () => {
      if (reduced.matches) still();
    };

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("resize", onResize);
    reduced.addEventListener("change", onMotionChange);

    resize();
    onMotionChange();

    return () => {
      pause();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
      reduced.removeEventListener("change", onMotionChange);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, [bloomX, bloomY, tealGain, warmX, warmY, warmGain]);

  return (
    <div className={`atmos ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="atmos__canvas" />
      <div className="atmos__grain" />
    </div>
  );
}
