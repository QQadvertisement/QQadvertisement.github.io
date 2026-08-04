/**
 * The real playable, running in an iframe.
 *
 * Every build the site plays is a standalone file served from
 * /playables/ — the Atta unit is the exact file the network was given,
 * and the house demo is assembled from replication-kit/ by
 * scripts/build-playables.mjs. Nothing here reimplements a mechanic.
 *
 * The iframe is the point rather than an implementation detail: it
 * gives each build its own document, so its CSS and its asset paths
 * work exactly as they do in the wild, and the site's design system
 * cannot leak in and quietly restyle a client's ad.
 *
 * It is a content layer only. The phone chrome, the loader and the
 * focus ring belong to PlayableFrame, which mounts this after load.
 */
export default function PlayableGame({
  src,
  title,
}: {
  /** URL of the playable file to run */
  src: string;
  title: string;
}) {
  return (
    <div className="playable-game">
      <iframe
        src={src}
        title={title}
        /* Same-origin so the build's own relative asset paths resolve;
           scripts are what a playable IS. Nothing wider is granted. */
        sandbox="allow-scripts allow-same-origin"
        loading="lazy"
      />
    </div>
  );
}
