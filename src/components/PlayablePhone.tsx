import { useEffect, useRef } from "react";

declare global {
  interface Window {
    QQPlayables: {
      createKneadGame: (el: HTMLElement) => { destroy: () => void };
      createAttaGame: (el: HTMLElement) => { destroy: () => void };
    };
  }
}

export type GameId = "knead" | "atta";

/** Phone frame that mounts one of the live playables from /qq-playables.js */
export default function PlayablePhone({ game }: { game: GameId }) {
  const screenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!screenRef.current || !window.QQPlayables) return;
    const instance =
      game === "atta"
        ? window.QQPlayables.createAttaGame(screenRef.current)
        : window.QQPlayables.createKneadGame(screenRef.current);
    return () => instance.destroy();
  }, [game]);

  return (
    <div className="phone">
      <div className="phone-screen" ref={screenRef} />
      <div className="phone-notch" />
    </div>
  );
}
