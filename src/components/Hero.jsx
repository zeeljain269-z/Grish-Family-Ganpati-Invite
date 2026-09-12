import { useEffect, useState } from "react";
import { resolveAsset } from "../lib/assets";
import { hero } from "../data/hero";
import { ui } from "../data/ui";
import { Reveal } from "./Reveal";
import { MusicToggle } from "./MusicToggle";
import { Decor } from "./Decor";

const lines = (value) => (Array.isArray(value) ? value : [value]).filter(Boolean);

// The doorway fills the first screen, so nothing below it is visible until
// someone scrolls - and on a phone there is no scrollbar to say there is
// more. The hint says so, and answers to a tap as well as explaining. It
// has done its job the moment the page moves, so it leaves and stays gone.
function ScrollCue() {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (window.scrollY > 80) return setGone(true);
    const onScroll = () => {
      if (window.scrollY > 80) {
        setGone(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      aria-hidden={gone ? "true" : undefined}
      aria-label={ui.scrollCue}
      className={`scroll-pill${gone ? " is-gone" : ""}`}
      onClick={() =>
        document.querySelector(".family-section")?.scrollIntoView({ behavior: "smooth", block: "start" })
      }
      tabIndex={gone ? -1 : 0}
      type="button"
    >
      <span aria-hidden="true" className="scroll-dot" />
      <span aria-hidden="true" className="scroll-arrow">↓</span>
    </button>
  );
}

export function Hero() {
  // The hero is the doorway of the house: Bappa on a chowrang just inside
  // the family's own front door. A customer's own banner photo replaces it
  // the moment they upload one. Their family photo has its own section
  // below, so the invitation still shows the people doing the inviting.
  const heroImage = resolveAsset(hero.assets?.heroPhoto || "heroScene");
  const divider = resolveAsset("divider");

  return (
    <section className="hero">
      <div className="hero-backdrop" />
      <div className="hero-noise" />
      <div className="hero-glow glow-1" />
      <div className="hero-glow glow-2" />
      <Decor />

      <div className="hero-inner">
        <Reveal className="hero-top-controls">
          <div className="hero-logo">
            <img alt="Ganesh" src={resolveAsset("logo")} />
            {hero.shlok ? <p className="sacred-line">{hero.shlok}</p> : null}
          </div>
          <div className="hero-actions">
            <MusicToggle />
          </div>
        </Reveal>

        <Reveal className="hero-copy" delay={0.1}>
          {hero.subtitle ? <p className="intro-line">{hero.subtitle}</p> : null}
          <h1 className="hero-title">
            {lines(hero.heading).map((line, i) => (
              <span key={i}>{line}</span>
            ))}
          </h1>
          {hero.date ? <p className="hero-date">{hero.date}</p> : null}
        </Reveal>

        <Reveal className="visual-wrap" delay={0.2}>
          <img alt={ui.heroAlt} className="murti" src={heroImage} />
        </Reveal>

        <Reveal className="invite-signature" delay={0.3}>
          <img alt="" className="invite-divider" src={divider} />
          {hero.invitation?.familyName ? (
            <p className="family-name">{hero.invitation.familyName}</p>
          ) : null}
          {hero.invitation?.tag ? <p className="invite-subtext">{hero.invitation.tag}</p> : null}
          <img alt="" className="invite-divider" src={divider} />
        </Reveal>

        <ScrollCue />
      </div>
    </section>
  );
}
