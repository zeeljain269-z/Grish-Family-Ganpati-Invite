import { useCallback, useEffect, useState } from "react";
import { ui } from "../data/ui";

// Two temple gates that part when the visitor taps the seal. The stylesheet
// owns the animation (it keys off curtain-intro--opening / --exiting); this
// only drives the state and reports when the gates start moving, so music
// can begin on that same gesture - browsers require a user gesture for audio.
const OPEN_MS = 2200;  // matches --curtain-open-duration in the stylesheet
const FADE_MS = 220;   // matches --curtain-overlay-fade-duration

export function CurtainIntro({ onOpenStart, autoOpen = false }) {
  const [state, setState] = useState("closed"); // closed -> opening -> exiting -> complete

  const open = useCallback(() => {
    setState((current) => {
      if (current !== "closed") return current;
      onOpenStart?.();
      return "opening";
    });
  }, [onOpenStart]);

  // Automatically open gates so the invitation reveals smoothly and can auto-scroll
  useEffect(() => {
    if (state !== "closed") return;
    const delay = autoOpen ? 60 : 700;
    const timer = setTimeout(open, delay);
    return () => clearTimeout(timer);
  }, [autoOpen, open, state]);

  useEffect(() => {
    if (state === "opening") {
      const timer = setTimeout(() => setState("exiting"), OPEN_MS);
      return () => clearTimeout(timer);
    }
    if (state === "exiting") {
      const timer = setTimeout(() => setState("complete"), FADE_MS);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [state]);

  // Hold the page still only while closed; once gates part, page is scrollable
  useEffect(() => {
    document.body.style.overflow = state === "closed" ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [state]);

  if (state === "complete") return null;

  return (
    <div
      className={`curtain-intro${state === "closed" ? "" : ` curtain-intro--${state}`}`}
      aria-label="Invitation opening"
      style={{
        // The gates are the first thing a guest sees, so they are the same
        // warm ivory as the invitation waiting behind them - opening them
        // should feel like the page brightening, not a change of design.
        "--curtain-intro-bg": "#fae8f1",
        "--curtain-intro-bg-deep": "#f0d8ea",
        "--curtain-intro-atmosphere": "rgba(232, 166, 201, 0.22)",
        "--curtain-intro-panel-shade": "rgba(122, 74, 112, 0.14)",
        "--curtain-open-duration": `${OPEN_MS}ms`,
        "--curtain-overlay-fade-duration": `${FADE_MS}ms`,
      }}
    >
      <div className="curtain-intro__gate curtain-intro__gate--left">
        <div className="gate-panel">
          <div className="panel-top-line" />
          <div className="panel-frame" />
          <div className="gate-pillar" />
          <div className="gate-center-detail" />
        </div>
      </div>
      <div className="curtain-intro__gate curtain-intro__gate--right">
        <div className="gate-panel">
          <div className="gate-pillar" />
          <div className="gate-center-detail" />
        </div>
      </div>
      <div className="curtain-intro__seam" />
      {/* .curtain-seal is the hook the landing-page preview and the editor
          click to open the invite without a human tap. */}
      <button type="button" className="curtain-intro__button curtain-seal" aria-label="Open invitation" onClick={open}>
        <div className="curtain-intro__button-content">
          <span className="curtain-intro__button-text">{ui.curtainSeal}</span>
          <span className="curtain-intro__button-subtitle">{ui.curtainTap}</span>
        </div>
        <span className="curtain-intro__button-shine" aria-hidden="true" />
      </button>
    </div>
  );
}
