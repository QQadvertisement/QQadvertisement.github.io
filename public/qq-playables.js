/* QQ playables — vanilla JS mini-games rendered into a .phone-screen element */
(function () {
  "use strict";

  var ASSETS = {
    idle: "assets/qq/qq-idle.png",
    knead: "assets/qq/qq-knead.png",
    finish: "assets/qq/qq-finish.png",
    runHappy: "assets/qq/qq-run-happy.png",
    runTired: "assets/qq/qq-run-tired.png",
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

  /* ============ KNEAD RUSH (Friends Ramen) ============ */
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
      s.appendChild(el("div", "g-cover-sub", "Friends Ramen presents"));
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

  /* ============ ATTA DASH (runner) ============ */
  function createAttaGame(screenEl) {
    var DURATION = 8;
    var GOAL = 100;
    var root = el("div", "game");
    root.style.background = "#ffa22c";
    screenEl.appendChild(root);
    var timers = [];
    function later(fn, ms) { timers.push(setTimeout(fn, ms)); }
    function clearTimers() { timers.forEach(clearTimeout); timers = []; }

    function cover() {
      root.innerHTML = "";
      var s = el("div", "g-screen");
      s.appendChild(el("div", "g-cover-sub", "Atta presents"));
      s.appendChild(el("div", "g-cover-title", "SPRINT TO<br>THE FINISH!"));
      var img = el("img", "g-sprite");
      img.src = ASSETS.runHappy;
      img.alt = "QQ quokka running";
      img.style.borderRadius = "20px";
      s.appendChild(img);
      var btn = el("button", "g-btn g-pulse", "▶&nbsp; RUN");
      btn.addEventListener("click", play);
      s.appendChild(btn);
      s.appendChild(el("div", "g-cover-sub", "Tap fast — reach " + GOAL + "m in " + DURATION + "s"));
      root.appendChild(s);
    }

    function play() {
      root.innerHTML = "";
      clearTimers();
      var dist = 0;
      var taps = [];
      var ended = false;

      var bar = el("div", "g-bar");
      root.appendChild(bar);
      var hud = el("div", "g-hud");
      var distEl = el("div", "g-count", "0m");
      var timeEl = el("div", "g-time", DURATION.toFixed(1) + "s");
      hud.appendChild(distEl);
      hud.appendChild(timeEl);
      root.appendChild(hud);

      var s = el("div", "g-screen");
      s.style.cursor = "pointer";
      var img = el("img", "g-sprite");
      img.src = ASSETS.runTired;
      img.alt = "QQ quokka sprinting";
      img.style.maxWidth = "280px";
      img.style.width = "84%";
      img.style.borderRadius = "20px";
      s.appendChild(img);
      var track = el("div", "g-progress-track");
      var fill = el("div", "g-progress-fill");
      track.appendChild(fill);
      s.appendChild(track);
      var hint = el("div", "g-cover-sub", "TAP FAST TO SPRINT!");
      s.appendChild(hint);
      root.appendChild(s);

      function onTap() {
        if (ended) return;
        var now = performance.now();
        taps.push(now);
        dist = Math.min(GOAL, dist + 2.5);
        if (hint.parentNode) hint.remove();
        if (navigator.vibrate) navigator.vibrate(8);
      }
      s.addEventListener("pointerdown", onTap);

      var start = performance.now();
      var bobPhase = 0;
      function tick() {
        if (ended) return;
        var now = performance.now();
        var elapsed = (now - start) / 1000;
        var left = Math.max(0, DURATION - elapsed);
        timeEl.textContent = left.toFixed(1) + "s";
        bar.style.transform = "scaleX(" + left / DURATION + ")";
        // tap rate over last second
        taps = taps.filter(function (t) { return now - t < 1000; });
        var fast = taps.length >= 4;
        img.src = fast ? ASSETS.runHappy : ASSETS.runTired;
        bobPhase += fast ? 0.35 : 0.15;
        img.style.transform = "translateY(" + Math.sin(bobPhase) * 6 + "px)";
        distEl.textContent = Math.round(dist) + "m";
        fill.style.width = (dist / GOAL) * 100 + "%";
        if (dist >= GOAL || left <= 0) { ended = true; end(dist, elapsed); return; }
        requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }

    function end(dist, elapsed) {
      root.innerHTML = "";
      var won = dist >= GOAL;
      var s = el("div", "g-screen");
      var img = el("img", "g-sprite");
      img.src = won ? ASSETS.runHappy : ASSETS.runTired;
      img.alt = "QQ quokka at the finish line";
      img.style.borderRadius = "20px";
      s.appendChild(img);
      s.appendChild(el("div", "g-end-title", won ? "PHOTO FINISH!" : "SO CLOSE!"));
      s.appendChild(el("div", "g-end-score", won ? GOAL + "m IN " + elapsed.toFixed(1) + "s" : Math.round(dist) + "m / " + GOAL + "m"));
      var dl = el("button", "g-btn g-btn-dl g-pulse", "⬇&nbsp; DOWNLOAD");
      dl.addEventListener("click", function () {
        showToast(root, "↗ In a live ad, this opens the Play Store");
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

  window.QQPlayables = { createKneadGame: createKneadGame, createAttaGame: createAttaGame };
})();
