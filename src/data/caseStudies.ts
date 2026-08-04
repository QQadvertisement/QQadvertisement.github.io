export interface CaseStudy {
  slug: string;
  client: string;
  name: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  vertical: string;
  format: string;
  loopLength: string;
  platforms: string;
  /** production URL when the build is live but shown via screenshots */
  liveUrl?: string;
  /** screenshot walkthrough of the production build */
  flow?: { src: string; alt: string; caption: string }[];
  image: string;
  imageAlt: string;
  summary: string;
  challenge: string[];
  solution: string[];
  results: string[];
  learnings: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "friends-ramen",
    client: "Friends Ramen",
    name: "Ramen Slurping Challenge",
    title: "Friends Ramen — Ramen Slurping Challenge",
    metaTitle: "Friends Ramen Case Study — Ramen Slurping Challenge Gamified Survey | QQ Advertisement",
    metaDescription:
      "How QQ Advertisement built the Ramen Slurping Challenge for Friends Ramen — a gamified survey where diners play a 10-second tap game, chase a weekly gift-card leaderboard, and answer three feedback questions on the way to their score.",
    vertical: "Food & restaurant brand",
    format: "Gamified survey — 10s tap challenge",
    loopLength: "10s game + 3-question survey",
    platforms: "Mobile web · Supabase backend",
    liveUrl: "https://qqadvertisement.com/PL01FR1N3DR4M3NCH/",
    flow: [
      {
        src: "/assets/casestudies/Friends Ramen/slurp-challenge-page-1.png",
        alt: "Ramen Slurping Challenge start screen — illustrated chef slurping noodles under a torii gate",
        caption: "Start screen: the illustrated challenge poster. One button — Play.",
      },
      {
        src: "/assets/casestudies/Friends Ramen/slurp-challenge-page-2.png",
        alt: "Registration screen — name, phone, email fields with a consent checkbox and the weekly $15 gift card prize",
        caption: "Opt-in with explicit consent: name, phone, email — and the reason to share them, a weekly $15 gift card.",
      },
      {
        src: "/assets/casestudies/Friends Ramen/slurp-challenge-page-3.png",
        alt: "Tutorial screen — 'tap as much as you can' with an I'M READY button",
        caption: "One-line tutorial, then I'M READY starts a 3-2-1 countdown.",
      },
      {
        src: "/assets/casestudies/Friends Ramen/slurp-challenge-page-4.png",
        alt: "Gameplay — score counter at 47, timer bar, and ramen bowls stacking up around the chef",
        caption: "Ten seconds of tapping. The chef levels through six sprite states as the bowls pile up.",
      },
      {
        src: "/assets/casestudies/Friends Ramen/slurp-challenge-page-5.png",
        alt: "Survey screen — rate your dining experience, how likely to recommend, and how did you hear about us",
        caption: "The survey gate: three questions stand between the player and their results.",
      },
      {
        src: "/assets/casestudies/Friends Ramen/slurp-challenge-page-6.png",
        alt: "Results screen — final score, live leaderboard of player names, and a Play again button",
        caption: "Time's up: your score, the live leaderboard, and Play again.",
      },
    ],
    image: "/assets/casestudies/Friends Ramen/friendsramen.webp",
    imageAlt: "Ramen Slurping Challenge for Friends Ramen — hand holding a phone showing the game's start screen",
    summary:
      "A gamified survey for a ramen shop: diners opt in with name, phone, and email, slurp through a 10-second tap challenge, and answer three feedback questions to unlock their score and leaderboard rank. A weekly $15 gift card keeps the leaderboard competitive — and the feedback flowing.",
    challenge: [
      "Friends Ramen wanted honest dining feedback and a marketing contact list — but nobody fills out a paper comment card, and a QR code that says 'take our survey' converts even worse.",
      "The attribution question every restaurant struggles with — 'how did you hear about us?' — needed real answers at volume, tied to real visits, not guesses.",
      "Contact info had to be collected properly: explicit consent, a genuine reason to share it, and structured storage — not a shoebox of paper cards.",
    ],
    solution: [
      "A 10-second tap challenge in the brand's illustrated world: tap to slurp, and the chef powers through six increasingly heroic sprite states as the score climbs. Multi-touch counts, so two fingers slurp faster than one.",
      "The survey is placed where motivation peaks: after 'time's up' and before the score reveal, three questions — rate the experience, would you recommend us, how did you hear about us — stand between the player and the leaderboard.",
      "A weekly $15 gift card on a public leaderboard turns one play into a habit: players return to defend their rank, and every 'Play again' routes through a short game-feedback form (experience rating, suggestions, preferred languages).",
      "Consent-first data capture: name, phone, and email behind an explicit promotional-consent checkbox, stored in Supabase with a per-session ID tying every score, survey answer, and feedback note to one play.",
      "Built as a lightweight mobile web page — no install, no app — with the public leaderboard reading from a restricted view that exposes only names and scores, never contact info.",
    ],
    results: [
      "The build is live and collecting: the screens above are captured from production, leaderboard names included.",
      "Every play produces structured data — a consented contact, a score, three survey answers, and optional game feedback — all keyed to a session ID in Supabase, ready to query.",
      "Response volumes and prize-redemption numbers are published here once the client signs off on sharing.",
    ],
    learnings: [
      "Gate the reward, not the game: putting the survey between 'time's up' and the leaderboard makes answering feel like part of the flow instead of a favor.",
      "A prize with a cadence beats a one-off prize — 'weekly winner' gives regulars a reason to replay on every visit, which compounds the survey data.",
      "Gamified surveys and playable ads are the same craft pointed at different funnels: one pre-qualifies an install, the other turns a meal into a data point and a reason to come back.",
    ],
  },
  {
    slug: "atta",
    client: "Atta",
    name: "Sync Your Day",
    title: "Atta — Sync Your Day Playable Ad",
    metaTitle: "Atta Playable Ad Case Study — Sync Your Day | QQ Advertisement",
    metaDescription:
      "How QQ Advertisement built Sync Your Day for Atta — a personalized quiz playable ad where players match food, work, and rest to their cycle phase, ending on a live App Store CTA.",
    vertical: "Women's health app",
    format: "Personalized quiz — drag & match",
    loopLength: "~15 seconds",
    platforms: "MRAID networks, webview fallback",
    image: "/assets/casestudies/atta-sync-your-day.jpg",
    imageAlt: "Sync Your Day playable ad for Atta — intro screen with the headline 'Turn your cycle into a superpower'",
    summary:
      "A personalized quiz playable for Atta, a women's health assistant. The ad shows a cycle ring on day 24 — luteal phase — and asks you to drag the right Eat, Work, and Rest cards into your day. Match all three and your day syncs; the end card opens Atta's real App Store listing.",
    challenge: [
      "Atta's value is personal: the app tells you what your body needs on this day of your cycle. Generic creative can claim that — only an interactive unit can make a viewer feel it before installing.",
      "A health app can't advertise like a hyper-casual game. The unit had to carry the product's calm, editorial art direction — sage and cream, serif headlines — while still being a game you instantly know how to play.",
      "It had to ship as one self-contained HTML file with zero network requests: inline SVG icons, CSS-only animation, MRAID install handling with a plain-webview fallback, and a view-gated start so the intro never burns off-screen.",
    ],
    solution: [
      "A quiz you answer by dragging: three phase-matched cards (Eat / Work / Rest) go into three slots under a cycle ring showing day 24, luteal phase. Wrong cards wobble back with a gentle in-voice hint — 'Not for this phase' — so even mistakes teach the product.",
      "Personalization as the mechanic, not the copy: by the third card you've experienced what cycle-syncing means. Completing the day earns a bloom animation — 'Your day, synced to your body' — before the end card.",
      "Art direction built as a token system: the entire look (palette, serif stack, glow color) lives in CSS variables, and phase, cycle day, and store URL live in one config block — the unit re-skins for another wellness brand or cycle phase in minutes.",
      "Production plumbing in the same file: MRAID view-gating, mraid.open() with window.open() fallback for the store link, and analytics events (play_start, first_interaction, level_complete, cta_click, replay) exposed via console and postMessage for whatever network wraps it.",
      "An end card that converts: app icon, star rating, one 'Get it free' CTA — the whole card is tappable, and the replay control is isolated so it never steals the install click.",
    ],
    results: [
      "The exact production file is embedded on this page — not a re-creation. Finish the quiz and the CTA opens Atta's live App Store listing.",
      "Every event a UA team needs is already instrumented in-file: play_start, first_interaction, level_complete, cta_click, and replay.",
      "IPM, install rate, and creative win-rate numbers are added here when paid campaign data is published with client sign-off.",
    ],
    learnings: [
      "Personalization is a mechanic, not a headline. Asking the player to make choices about their own day converts 'this app knows cycles' into 'this app knows me.'",
      "Wrong answers are where the teaching happens — the rejection hint ('Not for this phase') delivers more product education than the correct drops do.",
      "Tokenized art direction pays for itself: one CSS-variable block re-skins the brand, one config block re-targets the phase and store link, so the same build becomes a whole creative test matrix.",
    ],
  },
];

export function getCaseStudy(slug: string | undefined) {
  return caseStudies.find((c) => c.slug === slug);
}
