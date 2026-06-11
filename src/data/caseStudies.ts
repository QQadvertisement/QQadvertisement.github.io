import type { GameId } from "../components/PlayablePhone";

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
  game: GameId;
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
    name: "Knead Rush",
    title: "Friends Ramen — Knead Rush Playable Ad",
    metaTitle: "Friends Ramen Playable Ad Case Study — Knead Rush | QQ Advertisement",
    metaDescription:
      "How QQ Advertisement designed and coded Knead Rush, a 10-second tap-loop playable ad for Friends Ramen — concept, character art, game feel, and HTML5 build.",
    vertical: "Food & restaurant brand",
    format: "Tap-loop score chase",
    loopLength: "~10 seconds",
    platforms: "Meta & TikTok playable specs",
    game: "knead",
    image: "/assets/casestudies/friendsramen.webp",
    imageAlt: "Knead Rush playable ad for Friends Ramen — quokka character kneading ramen dough",
    summary:
      "A 10-second kneading mini-game that turns Friends Ramen's craft — hand-made noodles — into the ad itself. Players mash the dough, chase a score, and land on a branded end card with a single CTA.",
    challenge: [
      "Static food photography gets scrolled past. Friends Ramen needed creative that makes people stop and do something, not just watch.",
      "The brand's whole story is hand-made noodles — craft you can feel. A video can show kneading; only a playable can let the viewer knead.",
      "The creative had to fit paid social constraints: a single self-contained HTML5 file inside Meta and TikTok playable size caps, playable in seconds with zero instructions.",
    ],
    solution: [
      "One mechanic, chosen from the brand's core story: tap to knead the dough. No tutorial needed — the first tap teaches the game.",
      "A score-chase loop (~10 seconds) with juicy feedback: squash-and-stretch character animation, score pops, and a countdown bar that creates urgency.",
      "Original character art — QQ the quokka as the noodle chef — illustrated, animated, and coded by the same person, so game feel and art direction never drifted apart.",
      "A branded end card with score recap, replay option, and one CTA. Losing players replay; winning players convert. Either way they touched the brand's craft.",
      "Shipped as a single-file HTML5 playable with the CTA wired for store/landing links, ready to drop into Ads Manager.",
    ],
    results: [
      "The full playable is live on this site — you can play the exact build, finish the loop, and hit the end card yourself.",
      "The replay loop is designed for repeat plays: a visible score target makes 'one more try' the default behavior after a miss.",
      "Campaign performance numbers (IPM, CPI vs. control, engagement rate) are published here once paid runs complete and the client signs off on sharing.",
    ],
    learnings: [
      "Picking the mechanic from the brand story — kneading, for a hand-made noodle shop — did more for clarity than any copywriting pass.",
      "Ten seconds is enough. The loop is short enough to finish, which is what makes the end card feel earned instead of interruptive.",
      "End-card design matters as much as the game: one CTA keeps the post-play decision binary — replay or download.",
    ],
  },
  {
    slug: "atta",
    client: "Atta",
    name: "Sprint to the Finish",
    title: "Atta — Sprint to the Finish Playable Ad",
    metaTitle: "Atta Playable Ad Case Study — Sprint to the Finish | QQ Advertisement",
    metaDescription:
      "How QQ Advertisement built Sprint to the Finish for Atta — an 8-second tap-mash runner playable ad with a win/lose end state that drives replays and conversions.",
    vertical: "Consumer app",
    format: "Tap-mash runner, win/lose end state",
    loopLength: "~8 seconds",
    platforms: "Meta & TikTok playable specs",
    game: "atta",
    image: "/assets/qq/qq-run-happy.png",
    imageAlt: "Sprint to the Finish playable ad for Atta — quokka character sprinting toward the finish line",
    summary:
      "An 8-second tap-rate runner with a real win/lose end state. Tap fast enough and the runner crosses the line — too slow and you lose, which is exactly when players hit replay.",
    challenge: [
      "Atta needed ad creative that pre-qualifies installs: people who tap Download should already understand the energy of the product, not just recognize the logo.",
      "Most playables can't lose — and an ad you can't lose doesn't feel like a game. The challenge was making failure useful instead of a drop-off point.",
      "Like every QQ build, it had to be a single HTML5 file within platform size caps, instantly playable with no instructions.",
    ],
    solution: [
      "A tap-mash sprint: tap as fast as you can for eight seconds to push the runner to the finish line. Effort maps directly to on-screen speed, so the mechanic is understood by the second tap.",
      "A genuine win/lose end state. Losing players get an immediate, friction-free replay — losing is the retention loop. Winning players get the victory moment and the CTA.",
      "Character states (happy sprint, tired stumble) drawn and animated to sell the effort — game feel and art produced together, in days.",
      "Single-file HTML5 export with the end-card CTA wired to store links, sized for Meta and TikTok playable placements.",
    ],
    results: [
      "The build is playable on this site right now — same file that ships to Ads Manager, fake Download button included.",
      "The win/lose design converts both outcomes: losses drive replays (more time in the loop), wins drive end-card taps.",
      "IPM, install rate, and creative win-rate numbers are added here when paid campaign data is published with client sign-off.",
    ],
    learnings: [
      "A losable game reads as a real game — failure is designed to create the second play, not the drop-off.",
      "Eight seconds of tap-mashing is a physical experience; the ad leaves a muscle memory of the brand that static creative can't.",
      "Tuning the difficulty threshold is the whole game: the win rate has to be high enough to reward effort but low enough that replays stay tempting.",
    ],
  },
];

export function getCaseStudy(slug: string | undefined) {
  return caseStudies.find((c) => c.slug === slug);
}
