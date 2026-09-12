import { useCallback, useRef, useState } from "react";
import { resolveAsset } from "../lib/assets";
import { blessings } from "../data/blessings";
import { Reveal } from "./Reveal";

// ------------------------------------------------------------------
//  The flower shower, carried over from Kailash and Aapla Bappa.
//
//  Petals are thrown in from both edges and arc across the section on a
//  parabola, so they read as flowers offered towards the card rather than
//  rain falling past it. Built with the Web Animations API rather than
//  CSS keyframes because every petal wants its own arc, spin and
//  duration, and thirty-odd one-off @keyframes blocks is not a
//  stylesheet.
//
//  They are appended to the section itself, which is why it needs a ref:
//  the section is the positioning context and clips them at its edges.
// ------------------------------------------------------------------
function useFlowerOffering(sectionRef) {
  const clickCount = useRef(0);

  const spawnPetal = useCallback(() => {
    const container = sectionRef.current;
    if (!container) return;

    const petal = document.createElement("div");
    petal.classList.add("petal");

    const fromSide = Math.random() > 0.5 ? "left" : "right";
    const dir = fromSide === "left" ? 1 : -1;
    const height = container.offsetHeight;
    const startX = fromSide === "left" ? -50 : window.innerWidth + 50;
    const startY = height * 0.4 + Math.random() * (height * 0.2);

    petal.style.left = `${startX}px`;
    petal.style.top = `${startY}px`;
    const size = 15 + Math.random() * 20;
    petal.style.width = `${size}px`;
    petal.style.height = `${size}px`;
    container.appendChild(petal);

    const endVW = 30 + Math.random() * 40;
    const deltaX = (window.innerWidth * endVW) / 100 - startX;
    const deltaY = height - startY + 50;
    const spin = 360 + Math.random() * 720;
    const duration = 2500 + Math.random() * 1500;
    // peak is where the arc tops out; a and b solve the parabola that
    // passes through it and lands at deltaY.
    const peak = 0.2 + Math.random() * 0.15;
    const a = deltaY / (1 - 2 * peak);
    const b = -2 * a * peak;
    const STEPS = 30;
    const scaleAmp = 0.2 + Math.random() * 0.4;
    const frames = [];

    for (let p = 0; p <= STEPS; p += 1) {
      const t = p / STEPS;
      const x = deltaX * t;
      const y = a * t * t + b * t;
      const scale = 0.5 + Math.sin(t * Math.PI) * scaleAmp;
      let opacity = 1;
      if (t < 0.08) opacity = t * 12.5;
      if (t > 0.4) opacity = 1 - (t - 0.4) / 0.6;
      frames.push({
        offset: t,
        opacity,
        transform: `translate(${x}px, ${y}px) rotate(${dir * spin * t}deg) scale(${scale})`,
      });
    }

    petal.animate(frames, { duration, easing: "linear", fill: "forwards" });
    window.setTimeout(() => petal.remove(), duration);
  }, [sectionRef]);

  const offerFlowers = useCallback(() => {
    // Someone who keeps tapping gets a thinner shower - the section is
    // already full of petals by then, and the animations add up.
    clickCount.current += 1;
    const count = clickCount.current > 35 ? 8 : 18;
    for (let i = 0; i < count; i += 1) spawnPetal();
  }, [spawnPetal]);

  return offerFlowers;
}

export function Blessings() {
  const deco = resolveAsset("topDeco");
  const divider = resolveAsset("divider");
  const blessingImageSrc =
    resolveAsset(blessings.image || "blessingImage") ||
    resolveAsset("/assets/blessing-ganesha.jpg");

  const [imgSrc, setImgSrc] = useState(blessingImageSrc);
  const sectionRef = useRef(null);
  const offerFlowers = useFlowerOffering(sectionRef);

  return (
    <section className="section blessings-section" ref={sectionRef}>
      <img alt="" className="blessing-deco blessing-deco-top" src={deco} />
      <img alt="" className="blessing-deco blessing-deco-bottom" src={deco} />

      <Reveal className="blessings-content">
        {blessings.tag ? <p className="blessings-tag">{blessings.tag}</p> : null}
        {blessings.heading ? <h2 className="blessings-heading">{blessings.heading}</h2> : null}
        <img alt="" className="blessings-divider" src={divider} />
        {blessings.subtitle ? <p className="blessings-subtitle">{blessings.subtitle}</p> : null}

        <button
          className="blessing-card blessing-card-image"
          onClick={offerFlowers}
          type="button"
          aria-label="Lord Ganesha Blessing"
        >
          <span aria-hidden="true" className="blessing-glow" />
          <span aria-hidden="true" className="blessing-icon">॥ ॐ ॥</span>
          <div className="blessing-image-wrapper">
            <img
              alt="Lord Ganesha Blessing"
              className="blessing-image"
              src={imgSrc}
              referrerPolicy="no-referrer"
              onError={() => {
                if (imgSrc !== "/assets/blessing-ganesha.jpg") {
                  setImgSrc("/assets/blessing-ganesha.jpg");
                }
              }}
            />
          </div>
          {blessings.note ? (
            <span className="blessing-hint">{blessings.note}</span>
          ) : null}
        </button>

        {blessings.buttonText ? (
          <button className="flower-btn" onClick={offerFlowers} type="button">
            {blessings.buttonText}
          </button>
        ) : null}
      </Reveal>
    </section>
  );
}
