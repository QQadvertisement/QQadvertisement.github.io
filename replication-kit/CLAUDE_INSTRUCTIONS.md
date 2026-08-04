# Claude replication instructions: hero tapping demo

Replicate the hero tapping game from the QQ Advertisement site.

## Goal
Recreate the animated 10-second tap challenge shown in the home hero. The experience should feel like a compact playable ad: cover screen, tap gameplay, progress bar, score counter, end card, and replay.

## Source of truth
Use the following project files as the reference:
- [public/qq-playables.js](../public/qq-playables.js) — the original game implementation
- [src/index.css](../src/index.css) — UI styles for the game internals
- [public/assets/qq/qq-idle.png](../public/assets/qq/qq-idle.png), [public/assets/qq/qq-knead.png](../public/assets/qq/qq-knead.png), [public/assets/qq/qq-finish.png](../public/assets/qq/qq-finish.png) — the sprite assets

## Files included in this bundle
- [replication-kit/hero-tap-game.html](hero-tap-game.html) — a standalone demo page
- [replication-kit/hero-tap-game.css](hero-tap-game.css) — styles for the game UI
- [replication-kit/hero-tap-game.js](hero-tap-game.js) — the extracted game logic
- [replication-kit/assets](assets) — copied image assets

## What to build
Create a single-screen playable ad demo with these behaviors:
1. Cover screen with title: "READY, SET, KNEAD!"
2. Primary button: "PLAY"
3. Once started, show:
   - a 10-second countdown
   - a score counter
   - a top progress bar that shrinks over time
   - a tapping surface that responds to pointer/touch input
4. Every tap should:
   - increment the score
   - swap the sprite to the kneading image for a short moment
   - show a floating "+1" or "BAM!" pop effect
5. When time ends, show an end card with:
   - a finish sprite
   - a completion message
   - a fake download CTA
   - a replay button
6. The replay button should reset the experience without a page reload.

## Implementation notes
- Keep the game inside a fixed-size phone-style frame if you want to match the original site.
- Use a bright amber background and dark ink text to mirror the existing visual style.
- Make the experience responsive and work on touch devices.
- Keep the code modular: one initialization function that mounts into a container element.
- The original site uses pointer events and a short sprite animation for each tap. Preserve that behavior.

## Acceptance criteria
- The page loads and shows the cover screen immediately.
- Clicking the play button starts the game.
- Tapping increases the count and updates the UI.
- The timer counts down from 10 to 0.
- The end screen appears after the timer completes.
- The replay button restarts the game.

## Reuse guidance
If you want to embed this on another site, mount the game into an element like:
```html
<div id="hero-demo"></div>
<script src="hero-tap-game.js"></script>
<script>
  window.initHeroTapGame(document.getElementById('hero-demo'));
</script>
```

Do not overcomplicate it. The goal is a faithful, lightweight recreation of the original hero demo.
