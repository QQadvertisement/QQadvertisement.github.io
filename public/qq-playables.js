/* QQ playables — mini-games and real client builds mounted into a .phone-screen element */
(function () {
  "use strict";

  var ASSETS = {
    idle: "/assets/qq/qq-idle.png",
    knead: "/assets/qq/qq-knead.png",
    finish: "/assets/qq/qq-finish.png",
  };

  // preload
  Object.keys(ASSETS).forEach(function (k) {
    var i = new Image();
    i.src = ASSETS[k];
  });

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  function showToast(root, msg) {
    var t = el("div", "g-toast", msg);
    root.appendChild(t);
    setTimeout(function () { t.remove(); }, 2500);
  }

  /* ============ KNEAD RUSH (QQ house demo — hero toy, not client work) ============ */
  function createKneadGame(screenEl) {
    var DURATION = 10;
    var root = el("div", "game");
    root.style.background = "#f5a727";
    screenEl.appendChild(root);
    var timers = [];
    function later(fn, ms) { timers.push(setTimeout(fn, ms)); }
    function clearTimers() { timers.forEach(clearTimeout); timers = []; }

    function cover() {
      root.innerHTML = "";
      var s = el("div", "g-screen");
      s.appendChild(el("div", "g-cover-sub", "QQ Advertisement presents"));
      s.appendChild(el("div", "g-cover-title", "READY, SET,<br>KNEAD!"));
      var img = el("img", "g-sprite");
      img.src = ASSETS.idle;
      img.alt = "QQ quokka ready to knead";
      s.appendChild(img);
      var btn = el("button", "g-btn g-pulse", "▶&nbsp; PLAY");
      btn.addEventListener("click", play);
      s.appendChild(btn);
      s.appendChild(el("div", "g-cover-sub", "Knead as much dough as you can in " + DURATION + "s"));
      root.appendChild(s);
    }

    function play() {
      root.innerHTML = "";
      clearTimers();
      var count = 0;
      var left = DURATION;
      var bar = el("div", "g-bar");
      root.appendChild(bar);
      var hud = el("div", "g-hud");
      var countEl = el("div", "g-count", "0");
      var timeEl = el("div", "g-time", left.toFixed(1) + "s");
      hud.appendChild(countEl);
      hud.appendChild(timeEl);
      root.appendChild(hud);

      var s = el("div", "g-screen");
      s.style.cursor = "pointer";
      var img = el("img", "g-sprite");
      img.src = ASSETS.idle;
      img.alt = "QQ quokka kneading dough";
      img.style.maxWidth = "300px";
      img.style.width = "88%";
      img.style.transition = "transform 0.08s ease";
      s.appendChild(img);
      var hint = el("div", "g-cover-sub", "TAP! TAP! TAP!");
      s.appendChild(hint);
      root.appendChild(s);

      var revert = null;
      var ended = false;

      function onTap(e) {
        if (ended) return;
        count++;
        countEl.textContent = String(count);
        img.src = ASSETS.knead;
        img.style.transform = "scale(1.12)";
        if (revert) clearTimeout(revert);
        revert = setTimeout(function () {
          img.src = ASSETS.idle;
          img.style.transform = "scale(1)";
        }, 130);
        timers.push(revert);
        // pop
        var rect = root.getBoundingClientRect();
        var x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
        var y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
        var pop = el("div", "g-pop", count % 7 === 0 ? "BAM!" : "+1");
        pop.style.left = x + "px";
        pop.style.top = y - 20 + "px";
        root.appendChild(pop);
        later(function () { pop.remove(); }, 650);
        if (hint.parentNode) hint.remove();
      }
      s.addEventListener("pointerdown", onTap);

      var start = performance.now();
      function tick() {
        if (ended) return;
        var elapsed = (performance.now() - start) / 1000;
        left = Math.max(0, DURATION - elapsed);
        timeEl.textContent = left.toFixed(1) + "s";
        bar.style.transform = "scaleX(" + left / DURATION + ")";
        if (left <= 0) { ended = true; end(count); return; }
        requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }

    function end(count) {
      root.innerHTML = "";
      var s = el("div", "g-screen");
      s.style.background = "#f5a727";
      var img = el("img", "g-sprite");
      img.src = ASSETS.finish;
      img.alt = "QQ quokka holding finished dough";
      img.style.borderRadius = "20px";
      s.appendChild(img);
      s.appendChild(el("div", "g-end-title", count >= 25 ? "DOUGH MASTER!" : "NICE KNEADING!"));
      s.appendChild(el("div", "g-end-score", count + " KNEADS · " + (count >= 25 ? "TOP TIER" : "NOT BAD") + ""));
      var dl = el("button", "g-btn g-btn-dl g-pulse", "⬇&nbsp; DOWNLOAD");
      dl.addEventListener("click", function () {
        showToast(root, "↗ In a live ad, this opens the App Store");
      });
      s.appendChild(dl);
      var rp = el("button", "g-replay", "↺ replay");
      rp.addEventListener("click", cover);
      s.appendChild(rp);
      root.appendChild(s);
    }

    cover();
    return { destroy: function () { clearTimers(); root.remove(); } };
  }

  /* ============ ATTA — SYNC YOUR DAY (actual production playable) ============
     The real single-file MRAID unit shipped for Atta, embedded as-is.
     Kept in /playables/ so the demo on the site is the exact ad file. */
  function createAttaGame(screenEl) {
    var frame = document.createElement("iframe");
    frame.src = "/playables/atta-sync-your-day.html";
    frame.title = "Atta — Sync Your Day playable ad";
    frame.style.cssText = "display:block;width:100%;height:100%;border:0;background:#F4EEE3;";
    screenEl.appendChild(frame);
    return { destroy: function () { frame.remove(); } };
  }

  window.QQPlayables = { createKneadGame: createKneadGame, createAttaGame: createAttaGame };
})();
