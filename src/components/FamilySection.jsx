import { useCallback, useEffect, useRef, useState } from "react";
import { resolveAsset } from "../lib/assets";
import { family } from "../data/family";
import { hero } from "../data/hero";
import { Reveal } from "./Reveal";
import { shows } from "../data/sections";

const lines = (value) => (Array.isArray(value) ? value : [value]).filter(Boolean);

// The viewport is a scroll-snap scroller (and becomes a plain 4-up grid at
// >=1024px, where the stylesheet hides the arrows and dots). So navigation
// scrolls the viewport rather than transforming a track - that keeps native
// swipe, snap and the desktop grid all working from one implementation.
export function FamilySection() {
  // One photo of everyone, or a portrait per person - the customer picks in
  // the editor. Both are stored, so this reads `mode` rather than guessing
  // from whichever happens to be filled in.
  const group = family.mode === "group" && !!family.photo;
  // The hero now stands the family in their doorway, and this design carries
  // exactly one photograph. When that is the same picture, showing it again
  // here is the same family twice on one scroll - so the invitation message
  // stands alone. `group` itself stays true, which is what keeps the
  // four-portrait carousel switched off: flipping it turned one duplicate
  // into four extra faces.
  const showGroupPhoto = group && family.photo !== hero.assets?.heroPhoto;
  // The frame follows the photo rather than cropping it to a shape it was
  // never taken in - see the portrait rules in index.css.
  const upright = family.orientation === "portrait";
  const members = group ? [] : (family.members ?? []).filter((m) => m?.name || m?.photo);
  const count = members.length;
  const viewportRef = useRef(null);
  const [index, setIndex] = useState(0);

  const go = useCallback(
    (next) => {
      const viewport = viewportRef.current;
      if (!viewport || !count) return;
      const target = ((next % count) + count) % count;
      const card = viewport.querySelectorAll(".family-card-wrapper")[target];
      if (!card) return;
      // scrollIntoView would also scroll the page vertically; move the
      // scroller itself instead.
      viewport.scrollTo({
        left: card.offsetLeft - (viewport.clientWidth - card.clientWidth) / 2,
        behavior: "smooth",
      });
      setIndex(target);
    },
    [count]
  );

  // Follow native swipes so the dots stay truthful.
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const cards = [...viewport.querySelectorAll(".family-card-wrapper")];
        if (!cards.length) return;
        const middle = viewport.scrollLeft + viewport.clientWidth / 2;
        let best = 0;
        let bestGap = Infinity;
        cards.forEach((card, i) => {
          const gap = Math.abs(card.offsetLeft + card.clientWidth / 2 - middle);
          if (gap < bestGap) { bestGap = gap; best = i; }
        });
        setIndex(best);
      });
    };
    viewport.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      viewport.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [count]);

  const onKeyDown = (event) => {
    if (event.key === "ArrowLeft") { event.preventDefault(); go(index - 1); }
    if (event.key === "ArrowRight") { event.preventDefault(); go(index + 1); }
  };

  // Below the hooks on purpose: an early return above them would change
  // how many hooks this component runs.
  if (!shows("family")) return null;

  const divider = resolveAsset("divider");
  const message = lines(hero.invitation?.message);

  return (
    <section className="section family-section">
      <Reveal className="family-header">
        {family.tag ? <p className="family-tag">{family.tag}</p> : null}
        {family.heading ? <h2 className="family-heading">{family.heading}</h2> : null}
        <img alt="" className="family-divider" src={divider} />
        {message.map((line, i) => (
          <p className="family-text" key={i}>{line}</p>
        ))}
        <img alt="" className="family-divider" src={divider} />
      </Reveal>

      {showGroupPhoto && (
        <Reveal className="family-showcase" delay={0.1}>
          <article
            className="family-card family-card-group"
            data-orient={upright ? "portrait" : "landscape"}
          >
            <div className="family-image-frame">
              <div className="family-image-glow" />
              <img alt={family.caption || ""} className="family-image" src={resolveAsset(family.photo)} />
            </div>
            {family.caption ? (
              <div className="family-card-content">
                <h3>{family.caption}</h3>
              </div>
            ) : null}
          </article>
        </Reveal>
      )}

      {count > 0 && (
        <>
          <Reveal
            className="family-showcase"
            delay={0.1}
            onKeyDown={onKeyDown}
            tabIndex={0}
            role="group"
            aria-roledescription="carousel"
            aria-label="Family"
          >
            <button
              className="family-arrow family-arrow-left"
              type="button"
              aria-label="Previous"
              onClick={() => go(index - 1)}
            >
              ←
            </button>
            <div className="family-card-viewport" ref={viewportRef}>
              <div className="family-card-track">
                {members.map((member, i) => (
                  <div className="family-card-wrapper" key={i}>
                    <article className="family-card">
                      <div className="family-image-frame">
                        <div className="family-image-glow" />
                        {member.photo ? (
                          <img
                            alt={member.name || ""}
                            className="family-image"
                            src={resolveAsset(member.photo)}
                            loading={i === 0 ? "eager" : "lazy"}
                          />
                        ) : null}
                      </div>
                      {member.name ? (
                        <div className="family-card-content">
                          <h3>{member.name}</h3>
                        </div>
                      ) : null}
                    </article>
                  </div>
                ))}
              </div>
            </div>
            <button
              className="family-arrow family-arrow-right"
              type="button"
              aria-label="Next"
              onClick={() => go(index + 1)}
            >
              →
            </button>
          </Reveal>

          {count > 1 && (
            <Reveal className="family-dots" delay={0.15}>
              {members.map((_, i) => (
                <span
                  key={i}
                  className={i === index ? "active-dot" : ""}
                  role="button"
                  tabIndex={0}
                  aria-label={`Show ${i + 1} of ${count}`}
                  onClick={() => go(i)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(i); } }}
                />
              ))}
            </Reveal>
          )}
        </>
      )}
    </section>
  );
}
