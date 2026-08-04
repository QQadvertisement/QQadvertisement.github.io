(function () {
  "use strict";

  const ASSETS = {
    idle: "assets/qq-idle.png",
    knead: "assets/qq-knead.png",
    finish: "assets/qq-finish.png"
  };

  function el(tag, cls, html) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  function showToast(root, msg) {
    const t = el("div", "g-toast", msg);
    root.appendChild(t);
    setTimeout(function () {
      t.remove();
    }, 2500);
  }

  function initHeroTapGame(container) {
    if (!container) return null;

    const DURATION = 10;
    const root = el("div", "game");
    root.style.background = "#f5a727";
    container.innerHTML = "";
    container.appendChild(root);

    const timers = [];
    function later(fn, ms) {
      timers.push(setTimeout(fn, ms));
    }
    function clearTimers() {
      timers.forEach(clearTimeout);
      while (timers.length) timers.pop();
    }

    function cover() {
      root.innerHTML = "";
      const s = el("div", "g-screen");
      s.appendChild(el("div", "g-cover-sub", "QQ Advertisement presents"));
      s.appendChild(el("div", "g-cover-title", "READY, SET,<br>KNEAD!"));
      const img = el("img", "g-sprite");
      img.src = ASSETS.idle;
      img.alt = "QQ quokka ready to knead";
      s.appendChild(img);
      const btn = el("button", "g-btn", "▶&nbsp; PLAY");
      btn.addEventListener("click", play);
      s.appendChild(btn);
      s.appendChild(el("div", "g-cover-sub", "Knead as much dough as you can in " + DURATION + "s"));
      root.appendChild(s);
    }

    function play() {
      root.innerHTML = "";
      clearTimers();
      let count = 0;
      let left = DURATION;
      const bar = el("div", "g-bar");
      root.appendChild(bar);

      const hud = el("div", "g-hud");
      const countEl = el("div", "g-count", "0");
      const timeEl = el("div", "g-time", left.toFixed(1) + "s");
      hud.appendChild(countEl);
      hud.appendChild(timeEl);
      root.appendChild(hud);

      const s = el("div", "g-screen");
      s.style.cursor = "pointer";
      const img = el("img", "g-sprite");
      img.src = ASSETS.idle;
      img.alt = "QQ quokka kneading dough";
      img.style.maxWidth = "300px";
      img.style.width = "88%";
      img.style.transition = "transform 0.08s ease";
      s.appendChild(img);
      const hint = el("div", "g-cover-sub", "TAP! TAP! TAP!");
      s.appendChild(hint);
      root.appendChild(s);

      let revert = null;
      let ended = false;

      function onTap(e) {
        if (ended) return;
        count += 1;
        countEl.textContent = String(count);
        img.src = ASSETS.knead;
        img.style.transform = "scale(1.12)";
        if (revert) clearTimeout(revert);
        revert = setTimeout(function () {
          img.src = ASSETS.idle;
          img.style.transform = "scale(1)";
        }, 130);
        timers.push(revert);

        const rect = root.getBoundingClientRect();
        const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
        const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
        const pop = el("div", "g-pop", count % 7 === 0 ? "BAM!" : "+1");
        pop.style.left = x + "px";
        pop.style.top = y - 20 + "px";
        root.appendChild(pop);
        later(function () {
          pop.remove();
        }, 650);
        if (hint.parentNode) hint.remove();
      }

      s.addEventListener("pointerdown", onTap);

      const start = performance.now();
      function tick() {
        if (ended) return;
        const elapsed = (performance.now() - start) / 1000;
        left = Math.max(0, DURATION - elapsed);
        timeEl.textContent = left.toFixed(1) + "s";
        bar.style.transform = "scaleX(" + left / DURATION + ")";
        if (left <= 0) {
          ended = true;
          end(count);
          return;
        }
        requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }

    /* The end card is the install screen, not a score screen.

       This is the beat a UA manager is actually buying: the player has
       finished the loop and is being asked to install. So it is built
       the way a shipped end card is built — icon, name, category,
       rating, one reason to tap, one CTA — with the score folded into
       the headline rather than given a screen of its own.

       Nothing here claims a real product. The app being advertised is
       this demo, and the CTA says so when tapped. */
    function end(count) {
      root.innerHTML = "";
      const strong = count >= 25;
      const card = el("div", "g-endcard");

      const icon = el("div", "g-app-icon");
      const img = el("img", null, null);
      img.src = ASSETS.finish;
      img.alt = "";
      icon.appendChild(img);
      card.appendChild(icon);

      card.appendChild(el("h2", "g-app-name", "Ready, Set, Knead!"));
      card.appendChild(el("p", "g-app-sub", "Arcade &middot; Casual"));

      const stars = el("div", "g-stars");
      const row = el("span", "g-star-row");
      for (let i = 0; i < 5; i += 1) {
        row.appendChild(
          el(
            "span",
            "g-star",
            '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3-5.8 3 1.1-6.5L2.6 9.4l6.5-.9z" fill="currentColor"/></svg>'
          )
        );
      }
      stars.appendChild(row);
      stars.appendChild(el("span", "g-star-score", "4.9"));
      card.appendChild(stars);

      // The score is the hook, so it goes in the headline.
      card.appendChild(
        el(
          "p",
          "g-end-head",
          "You kneaded <em>" + count + "</em> " + (count === 1 ? "loaf" : "loaves")
        )
      );
      card.appendChild(
        el("p", "g-end-rank", strong ? "DOUGH MASTER &middot; TOP TIER" : "NICE KNEADING &middot; NOT BAD")
      );

      const dl = el("button", "g-cta", "Get it free");
      dl.addEventListener("click", function () {
        showToast(root, "↗ In a live ad, this opens the App Store");
      });
      card.appendChild(dl);

      const rp = el(
        "button",
        "g-replay",
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1M3.5 4v4.4H8" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg> Replay'
      );
      rp.addEventListener("click", cover);
      card.appendChild(rp);

      root.appendChild(card);
    }

    cover();
    return {
      destroy: function () {
        clearTimers();
        root.remove();
      }
    };
  }

  window.initHeroTapGame = initHeroTapGame;
})();
