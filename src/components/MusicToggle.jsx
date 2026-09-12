import { useMusic } from "../context/MusicContext";
import { ui } from "../data/ui";

// The note button in the top corner of the banner. The label says what the
// tap will do rather than "toggle", so a guest with a screen reader knows
// whether they are about to start the music or stop it.
export function MusicToggle() {
  const { enabled, isPlaying, toggleMusic } = useMusic();
  if (!enabled) return null;

  return (
    <button
      className={`circle-btn music-toggle${isPlaying ? " active" : ""}`}
      aria-label={isPlaying ? ui.musicOff : ui.musicOn}
      aria-pressed={isPlaying}
      title={isPlaying ? ui.musicOff : ui.musicOn}
      type="button"
      onClick={toggleMusic}
    >
      {isPlaying ? (
        <span className="music-bars" aria-hidden="true">
          <span className="music-bar bar-1" />
          <span className="music-bar bar-2" />
          <span className="music-bar bar-3" />
        </span>
      ) : (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" height="1em" width="1em">
          <path
            fillRule="evenodd"
            d="M19.952 1.651a.75.75 0 0 1 .298.599V16.303a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.403-4.909l2.311-.66a1.5 1.5 0 0 0 1.088-1.442V6.994l-9 2.572v9.737a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.402-4.909l2.31-.66a1.5 1.5 0 0 0 1.088-1.442V5.25a.75.75 0 0 1 .544-.721l10.5-3a.75.75 0 0 1 .658.122Z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </button>
  );
}
