/* ============================================================
   THE SHIPPED PLAYABLE FILES

   One place naming every build the site can actually run, so a page
   never hard-codes a path to a file it is also printing numbers about.

   `atta` is the production ad unit, committed as shipped and never
   edited. `knead` is the QQ house demo, assembled at build time from
   replication-kit/ by scripts/build-playables.mjs — edit the kit, not
   the output.

   A build that is absent from here is one we do not embed. That is a
   deliberate call per build: Friends Ramen is a live mobile web page
   that writes every play to its production database, so framing it on
   a marketing page would post real rows. It links out instead.
   ============================================================ */

export const ATTA_URL = "/playables/atta-sync-your-day.html";
export const KNEAD_URL = "/playables/qq-knead-rush.html";

export interface PlayableBuild {
  src: string;
  /** iframe title — announced to screen readers as the frame's name */
  title: string;
  /** measurement id in measurements.generated.ts */
  measurementId: string;
}

export const playables = {
  atta: {
    src: ATTA_URL,
    title: "Sync Your Day — playable ad for Atta",
    measurementId: "atta",
  },
  knead: {
    src: KNEAD_URL,
    title: "Ready, Set, Knead — QQ house demo",
    measurementId: "knead",
  },
} satisfies Record<string, PlayableBuild>;

export type PlayableId = keyof typeof playables;
