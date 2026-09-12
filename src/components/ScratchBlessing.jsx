import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";
import { scratchBlessing } from "../data/scratchBlessing";
import "../scratch-blessing.css";

// A blessing the guest uncovers instead of reads. The words sit in the page
// as ordinary text; a canvas of gold foil is painted on top and rubbed away.
//
// The text is never drawn into the canvas. Two reasons: a screen reader gets
// the blessing for free because it is real DOM, and Devanagari drawn to a
// canvas depends on the font having loaded before the paint, which on a cold
// phone connection it has not.
//
// This design has no useScrollReveal hook and no Asset helpers - it enters
// blocks with <Reveal> instead - so this file is the same component written
// in that idiom rather than an import away from the other two.
const CLEAR_AT = 0.55;

// Reading every pixel of a retina canvas on every pointer move is what makes
// scratch cards stutter. Every 8th pixel says the same thing.
const SAMPLE_STEP = 8;

// Wide enough that a fingertip clears a satisfying stripe, not a pencil line.
const BRUSH = 34;

export function ScratchBlessing() {
  const canvasRef = useRef(null);
  const cardRef = useRef(null);
  // The box size the foil was last painted for, so we repaint on a real
  // size change and never on a re-render.
  const paintedFor = useRef("");
  const [revealed, setRevealed] = useState(false);
  const [started, setStarted] = useState(false);
  const painting = useRef(false);
  const last = useRef(null);
  const moves = useRef(0);

  // The foil colours come from this design's own stylesheet rather than from
  // here, so one component wears four palettes without knowing any of them.
  const paintFoil = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = "source-over";

    const styles = getComputedStyle(canvas);
    const a = styles.getPropertyValue("--foil-a").trim() || "#d4a64a";
    const b = styles.getPropertyValue("--foil-b").trim() || "#b88a2f";

    const grad = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    grad.addColorStop(0, a);
    grad.addColorStop(0.5, b);
    grad.addColorStop(1, a);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, rect.width, rect.height);

    ctx.globalAlpha = 0.12;
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 1;
    for (let x = -rect.height; x < rect.width; x += 9) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + rect.height, rect.height);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }, []);

  const pointFrom = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const rubTo = (x, y) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = BRUSH;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    const from = last.current ?? { x, y };
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(x, y);
    ctx.stroke();
    // A single tap should leave a mark too, not just a drag.
    ctx.beginPath();
    ctx.arc(x, y, BRUSH / 2, 0, Math.PI * 2);
    ctx.fill();
    last.current = { x, y };
  };

  const clearedFraction = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { willReadFrequently: true });
    if (!ctx) return 0;
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let clear = 0;
    let total = 0;
    for (let i = 3; i < data.length; i += 4 * SAMPLE_STEP) {
      total += 1;
      if (data[i] < 128) clear += 1;
    }
    return total ? clear / total : 0;
  };

  const open = useCallback(() => {
    painting.current = false;
    last.current = null;
    setRevealed(true);
  }, []);

  const onPointerDown = (event) => {
    if (revealed) return;
    painting.current = true;
    setStarted(true);
    last.current = null;
    try {
      canvasRef.current.setPointerCapture(event.pointerId);
    } catch {
      /* capture is a nicety; scratching still works without it */
    }
    const point = pointFrom(event);
    rubTo(point.x, point.y);
  };

  const onPointerMove = (event) => {
    if (!painting.current || revealed) return;
    const point = pointFrom(event);
    rubTo(point.x, point.y);
    moves.current += 1;
    if (moves.current % 6 === 0 && clearedFraction() >= CLEAR_AT) open();
  };

  const stop = () => {
    painting.current = false;
    last.current = null;
  };

  // Enter or Space opens it outright. Without this the blessing is reachable
  // only by people who can drag a pointer across a box.
  const onKeyDown = (event) => {
    if (revealed) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      open();
    }
  };

  // Paint only when the box and the backing store disagree, so a repaint can
  // never quietly hand back a cover the guest has already scratched.
  const ensureFoil = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return false;
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return false;
    const key = `${Math.round(rect.width)}x${Math.round(rect.height)}`;
    if (paintedFor.current === key) return true;
    paintFoil();
    paintedFor.current = key;
    return true;
  }, [paintFoil]);

  useEffect(() => {
    if (revealed) return undefined;

    // The section is lazy and only reveals on scroll, so at first mount the
    // card can still be zero-width - and a zero box is exactly what paintFoil
    // refuses to draw into. Ask again each frame until it has a real box.
    // Without this the foil never paints and the blessing is simply readable,
    // which is the one way this component must not fail.
    let frame = 0;
    let tries = 0;
    const tick = () => {
      if (ensureFoil() || tries > 180) return;
      tries += 1;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const repaint = () => {
      // Only while untouched: a phone rotating mid-scratch must not be handed
      // back the cover it just removed.
      if (started) return;
      paintedFor.current = "";
      ensureFoil();
    };
    window.addEventListener("resize", repaint);

    let observer;
    if (typeof ResizeObserver !== "undefined" && cardRef.current) {
      observer = new ResizeObserver(repaint);
      observer.observe(cardRef.current);
    }

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", repaint);
      if (observer) observer.disconnect();
    };
  }, [ensureFoil, revealed, started]);

  const { heading, hint, quote, signature } = scratchBlessing;
  const line = Array.isArray(quote) ? quote.join(" ") : quote;

  return (
    <section className="section sb-section">
      <Reveal className="sb-inner">
        <h2 className="sb-heading">{heading}</h2>

        <div
          className={`sb-card${revealed ? " is-open" : ""}`}
          ref={cardRef}
          role={revealed ? undefined : "button"}
          tabIndex={revealed ? undefined : 0}
          aria-label={revealed ? undefined : hint}
          onKeyDown={onKeyDown}
        >
          <div className="sb-parchment">
            <p className="sb-quote">{line}</p>
            <p className="sb-sign">{signature}</p>
          </div>

          <canvas
            aria-hidden="true"
            className="sb-foil"
            ref={canvasRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={stop}
            onPointerCancel={stop}
            onPointerLeave={stop}
          />
          <span className={`sb-hint${started ? " is-gone" : ""}`} aria-hidden="true">
            {hint}
          </span>
        </div>
      </Reveal>
    </section>
  );
}

export default ScratchBlessing;
