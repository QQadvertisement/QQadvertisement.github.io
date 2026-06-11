import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import PlayablePhone, { type GameId } from "../components/PlayablePhone";

const BOOKING_URL = "https://calendly.com/thitipun-snw/30min";

/* ── Hero ──────────────────────────────────────────────────── */
function QQHero() {
  return (
    <header className="hero" id="top">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <div className="eyebrow">Playable ads · designed + coded by one engineer</div>
          <div className="hero-qq" aria-label="QQ">
            <span className="q1">Q</span><span className="q2">Q</span>
          </div>
          <h1 className="h-xl hero-headline">
            Playable ads that pre-qualify the install before the CPI hits.
          </h1>
          <p className="body-lg hero-sub muted">
            I design and code custom HTML5 playables for consumer apps and games — players run your core loop on Meta and TikTok before they ever tap Download, so the installs you're buying already know what they're getting.
          </p>
          <div className="cta-row">
            <a className="btn btn-primary" href="#pricing">Start a build</a>
            <a className="btn btn-ghost" href={BOOKING_URL} target="_blank" rel="noreferrer">Book a call</a>
          </div>
          <p className="hero-micro">Custom HTML5 playables for Meta &amp; TikTok · built in days, not weeks</p>
        </div>
        <div className="hero-stage">
          <div className="try-tag">← it's real, tap it</div>
          <PlayablePhone game="knead" />
          <img
            className="hero-mascot"
            src="/assets/qq/qq-hero.png"
            alt="QQ the quokka jumping"
          />
        </div>
      </div>
    </header>
  );
}

/* ── Pitch ─────────────────────────────────────────────────── */
function QQPitch() {
  return (
    <section className="pitch">
      <div className="wrap">
        <div className="eyebrow" style={{ color: "inherit" }}>01 — Why playables</div>
        <p className="statement" style={{ marginTop: 18 }}>
          Video gets watched. Playables get <em>played</em>. When someone hits Download after thirty seconds inside your core loop, they already know what they're installing —{" "}
          <span className="hl-amber">that install was pre-qualified before the CPI was charged.</span>
        </p>
        <div className="pitch-row">
          <span>HIGHER-INTENT INSTALLS</span>
          <span>IPM CEILINGS STATIC CAN'T TOUCH</span>
          <span>RETENTION CURVES THAT START HONEST</span>
        </div>
        <p style={{ marginTop: 26 }}>
          <Link className="link-arrow" to="/playable-ads-explained" style={{ color: "inherit" }}>
            New to the format? Playable ads, explained →
          </Link>
        </p>
      </div>
    </section>
  );
}

/* ── Work ──────────────────────────────────────────────────── */
function QQWork({ onPlay }: { onPlay: (game: "knead" | "atta") => void }) {
  return (
    <section id="work">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="eyebrow">02 — Live demos</div>
          <h2 className="h-lg">Go play the work.</h2>
          <p className="body-lg muted">
            These are craft samples — playables I designed and coded end-to-end. Open one, finish the loop, hit the fake Download. Then picture your app in the frame.
          </p>
        </div>
        <div className="work-grid">
          <article className="work-card reveal">
            <button
              className="work-thumb"
              onClick={() => onPlay("knead")}
              style={{ background: "#f5a727", border: "none", cursor: "pointer", padding: 0 }}
              aria-label="Play Knead Rush"
            >
              <img src="/assets/qq/qq-idle.png" alt="Knead Rush playable — quokka kneading dough" />
              <span className="play-hint"><span>▶ PLAY IT</span></span>
            </button>
            <div className="work-meta">
              <div className="work-tags">
                <span className="tag">Friends Ramen</span>
                <span className="tag">tap loop · 10s</span>
              </div>
              <h3>Knead Rush</h3>
              <p className="muted" style={{ fontSize: 15 }}>
                Score-chase kneading mechanic with an end-card CTA. Concept, character art, game feel, code — all one pair of hands.{" "}
                <Link to="/case-studies/friends-ramen">Read the case study →</Link>
              </p>
              <button className="btn btn-ghost" onClick={() => onPlay("knead")}>▶&nbsp;Play it</button>
            </div>
          </article>

          <article className="work-card reveal">
            <button
              className="work-thumb"
              onClick={() => onPlay("atta")}
              style={{ background: "#ffa22c", border: "none", cursor: "pointer", padding: 0 }}
              aria-label="Play Sprint to the Finish"
            >
              <img src="/assets/qq/qq-run-happy.png" alt="Atta runner playable — quokka sprinting" style={{ width: "86%", borderRadius: 16 }} />
              <span className="play-hint"><span>▶ PLAY IT</span></span>
            </button>
            <div className="work-meta">
              <div className="work-tags">
                <span className="tag">Atta</span>
                <span className="tag">tap-mash runner · 8s</span>
              </div>
              <h3>Sprint to the Finish</h3>
              <p className="muted" style={{ fontSize: 15 }}>
                Tap-rate runner with a win/lose end state — losing players replay, winning players convert. Either way they touched the loop.{" "}
                <Link to="/case-studies/atta">Read the case study →</Link>
              </p>
              <button className="btn btn-ghost" onClick={() => onPlay("atta")}>▶&nbsp;Play it</button>
            </div>
          </article>

          <article className="work-card reveal">
            <a
              href="https://jenkaiwang.github.io/QQStudio-Game-Sample/"
              target="_blank"
              rel="noreferrer"
              className="work-thumb"
              style={{ background: "#d8fff5", border: "none", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ink-deep)" }}
              aria-label="Play Game Sample"
            >
              <span style={{ fontSize: 18, fontWeight: 800 }}>2D Game</span>
              <span className="play-hint"><span>▶ PLAY IT</span></span>
            </a>
            <div className="work-meta">
              <div className="work-tags">
                <span className="tag">Sample</span>
                <span className="tag">2D mechanics</span>
              </div>
              <h3>Game Sample</h3>
              <p className="muted" style={{ fontSize: 15 }}>
                Interactive 2D gameplay mechanics demo.
              </p>
              <a href="https://jenkaiwang.github.io/QQStudio-Game-Sample/" target="_blank" rel="noreferrer" className="btn btn-ghost">▶&nbsp;Play it</a>
            </div>
          </article>

          <article className="work-card reveal">
            <a
              href="https://jenkaiwang.github.io/QQStudio-Game-3D-Sample/"
              target="_blank"
              rel="noreferrer"
              className="work-thumb"
              style={{ background: "#c0e7ff", border: "none", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ink-deep)" }}
              aria-label="Play 3D Game Sample"
            >
              <span style={{ fontSize: 18, fontWeight: 800 }}>3D Game</span>
              <span className="play-hint"><span>▶ PLAY IT</span></span>
            </a>
            <div className="work-meta">
              <div className="work-tags">
                <span className="tag">3D Sample</span>
                <span className="tag">3D mechanics</span>
              </div>
              <h3>3D Game Sample</h3>
              <p className="muted" style={{ fontSize: 15 }}>
                Interactive 3D gameplay mechanics demo.
              </p>
              <a href="https://jenkaiwang.github.io/QQStudio-Game-3D-Sample/" target="_blank" rel="noreferrer" className="btn btn-ghost">▶&nbsp;Play it</a>
            </div>
          </article>
        </div>
        <p className="body-lg" style={{ marginTop: 32 }}>
          <Link className="link-arrow" to="/our-work">See all projects →</Link>
        </p>
      </div>
    </section>
  );
}

/* ── Process ───────────────────────────────────────────────── */
function QQProcess() {
  return (
    <section id="process">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="eyebrow">03 — How it works</div>
          <h2 className="h-lg">Call. Build. Test.</h2>
        </div>
        <div className="steps">
          <div className="step reveal">
            <div className="num"><b>01</b>THE CALL</div>
            <h3>30 minutes on your app</h3>
            <p>Core loop, UA goals, what your current creative mix is doing on Meta and TikTok. You bring the store listing; I bring questions.</p>
          </div>
          <div className="step reveal">
            <div className="num"><b>02</b>THE BUILD</div>
            <h3>A custom playable, in days</h3>
            <p>I design and code the playable around the one mechanic that sells your app. You get a testable build, not a storyboard deck — and revisions happen in hours because the designer and the engineer are the same person.</p>
          </div>
          <div className="step reveal">
            <div className="num"><b>03</b>THE TEST</div>
            <h3>Drop it into Ads Manager</h3>
            <p>Single-file HTML5, sized to Meta and TikTok playable specs, CTA wired to your store links. Run it against your control and read the IPM and CPI yourself.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Why QQ ────────────────────────────────────────────────── */
function QQWhy() {
  return (
    <section className="why">
      <div className="wrap why-grid">
        <div className="reveal">
          <div className="eyebrow">04 — Why QQ</div>
          <h2 className="h-lg" style={{ marginTop: 12 }}>
            One person.<br />Both halves of the job.
          </h2>
          <ul className="why-points">
            <li>Illustration, game feel, and code in the same head — no handoff loss, no agency overhead baked into your invoice.</li>
            <li>Days, not the multi-week agency cycle. Creative testing only works if the creative shows up while the hypothesis is still warm.</li>
            <li>Not a template factory: every playable is built around <i>your</i> core loop, in your art direction.</li>
            <li>Founder-to-founder — you talk to the person who builds it, every time.</li>
          </ul>
          <p style={{ marginTop: 24 }}>
            <Link className="link-arrow" to="/about">Learn more about QQ →</Link>
          </p>
        </div>
        <figure className="why-card reveal">
          <img src="/assets/qq/qq-sawasdee.png" alt="QQ the quokka saying hello" />
          <figcaption>QQ — studio quokka, QA department, and morale officer.</figcaption>
        </figure>
      </div>
    </section>
  );
}

/* ── Pricing ───────────────────────────────────────────────── */
function QQPricing() {
  function handlePlaceholder(e: React.MouseEvent) {
    e.preventDefault();
    alert("Placeholder — wire this to your Stripe payment link / calendar.");
  }

  return (
    <section id="pricing">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="eyebrow">05 — Pricing</div>
          <h2 className="h-lg">One package. No retainer theater.</h2>
        </div>
        <div className="price-card reveal">
          <div>
            <div className="eyebrow">The Playable Build</div>
            <div style={{ marginTop: 14 }}>
              <span className="ph-tag">placeholder — final number TBD</span>
              <div className="price-num ph" style={{ display: "inline-block" }}>$X,XXX</div>
              <span className="mono-note" style={{ marginLeft: 10 }}>flat, per playable</span>
            </div>
            <ul className="price-list" style={{ marginTop: 26 }}>
              <li>Concept, character art, and code — custom to your app</li>
              <li>Single-file HTML5 export, within Meta &amp; TikTok size caps</li>
              <li>Two revision rounds on game feel and end card</li>
              <li>CTA wired to your store links, ready for Ads Manager</li>
              <li>Delivered in days — one build slot at a time</li>
            </ul>
          </div>
          <div className="price-cta">
            <a className="btn btn-accent" href="#" onClick={handlePlaceholder}>Start a build →</a>
            <span className="mono-note">→ secure checkout via Stripe<br />(payment link placeholder)</span>
            <a className="btn btn-ghost" href={BOOKING_URL} target="_blank" rel="noreferrer">Book a call first</a>
            <span className="mono-note">Not sure a playable fits your funnel? The call is free and I'll tell you honestly.</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Final CTA ─────────────────────────────────────────────── */
function QQFinal() {
  return (
    <section className="final" id="final">
      <div className="wrap final-inner">
        <div className="reveal">
          <div className="eyebrow" style={{ color: "inherit" }}>06 — Start</div>
          <h2 className="h-lg" style={{ marginTop: 12 }}>
            Got a core loop?<br />Let's make it the ad.
          </h2>
          <p className="body-lg" style={{ opacity: 0.75, marginTop: 16, maxWidth: "30em" }}>
            One call, one build, one test cell in your next creative round. If it doesn't beat your control, you'll know in a week — not a quarter.
          </p>
          <div className="cta-row" style={{ marginTop: 28 }}>
            <a className="btn btn-accent" href="#pricing">Start a build</a>
            <a className="btn btn-ghost" href={BOOKING_URL} target="_blank" rel="noreferrer">Book a call</a>
          </div>
        </div>
        <img
          className="final-mascot reveal"
          src="/assets/qq/qq-sit.png"
          alt="QQ the quokka sitting with a game controller"
        />
      </div>
    </section>
  );
}

/* ── Playable Overlay ──────────────────────────────────────── */
function PlayableOverlay({
  game,
  onClose,
}: {
  game: GameId | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!game) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [game, onClose]);

  if (!game) return null;

  return (
    <div
      className="overlay open"
      role="dialog"
      aria-modal
      aria-label="Playable demo"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="overlay-box">
        <button className="overlay-close" onClick={onClose} aria-label="Close demo">✕</button>
        <PlayablePhone game={game} />
      </div>
    </div>
  );
}

/* ── Scroll Reveal ─────────────────────────────────────────── */
function useScrollReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>(".reveal");
    let ioFired = false;
    const io = new IntersectionObserver(
      (entries) => {
        ioFired = true;
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    nodes.forEach((n) => io.observe(n));
    const fallback = setTimeout(() => {
      if (!ioFired) nodes.forEach((n) => n.classList.add("in"));
    }, 600);
    return () => { io.disconnect(); clearTimeout(fallback); };
  }, []);
}

/* ── Page ──────────────────────────────────────────────────── */
export default function Home() {
  const [activeGame, setActiveGame] = useState<GameId | null>(null);
  useScrollReveal();

  return (
    <>
      <Seo
        title="Playable Ads for Mobile App User Acquisition | QQ Advertisement"
        description="Custom HTML5 playable ads for Meta & TikTok, designed and coded by one engineer. Players run your app's core loop before they tap Download — pre-qualifying every install."
        path="/"
      />

      <main>
        <QQHero />
        <QQPitch />
        <QQWork onPlay={setActiveGame} />
        <QQProcess />
        <QQWhy />
        <QQPricing />
        <QQFinal />
      </main>

      <PlayableOverlay game={activeGame} onClose={() => setActiveGame(null)} />
    </>
  );
}
