import { useEffect, useRef } from "react";

/**
 * useAutoScroll
 * Starts a smooth, continuous auto-scroll down through the website after delayMs (default 3 seconds).
 * - Pauses immediately if the user touches the screen, scrolls with mouse wheel, or presses keys.
 * - Resumes smoothly 3 seconds after user inactivity.
 * - Reverses or loops gently upon reaching the bottom and top.
 */
export function useAutoScroll({ enabled = true, delayMs = 3000 } = {}) {
  const userInteractingRef = useRef(false);
  const idleTimerRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;

    const doc = document.documentElement;
    const prevBehavior = doc.style.scrollBehavior;
    doc.style.scrollBehavior = "auto";

    let active = false;
    let lastTime = 0;
    let direction = 1; // 1 = down, -1 = up
    let holdRemaining = 0;
    const SPEED_PPS = 70; // 70 pixels per second - readable, graceful pace
    const HOLD_MS = 2400; // 2.4s rest at bottom and top

    const step = (now) => {
      if (!active) return;
      rafRef.current = requestAnimationFrame(step);

      if (!lastTime) {
        lastTime = now;
        return;
      }

      const dt = Math.min(now - lastTime, 64);
      lastTime = now;

      // Yield control while user is actively interacting
      if (userInteractingRef.current) return;

      const maxScroll = Math.max(0, document.body.scrollHeight - window.innerHeight);
      if (maxScroll <= 0) return;

      if (holdRemaining > 0) {
        holdRemaining -= dt;
        return;
      }

      const currentScroll = window.scrollY || doc.scrollTop || 0;
      let nextScroll = currentScroll + direction * SPEED_PPS * (dt / 1000);

      if (nextScroll >= maxScroll) {
        nextScroll = maxScroll;
        direction = -1;
        holdRemaining = HOLD_MS;
      } else if (nextScroll <= 0) {
        nextScroll = 0;
        direction = 1;
        holdRemaining = HOLD_MS;
      }

      window.scrollTo(0, nextScroll);
    };

    // Start auto-scroll after delayMs (3 seconds)
    const startTimer = setTimeout(() => {
      active = true;
      lastTime = 0;
      rafRef.current = requestAnimationFrame(step);
    }, delayMs);

    // Pause on user interaction and resume after 3s of idle time
    const handleUserInteraction = () => {
      userInteractingRef.current = true;
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
      idleTimerRef.current = setTimeout(() => {
        userInteractingRef.current = false;
        lastTime = 0;
      }, 3000);
    };

    window.addEventListener("wheel", handleUserInteraction, { passive: true });
    window.addEventListener("touchstart", handleUserInteraction, { passive: true });
    window.addEventListener("touchmove", handleUserInteraction, { passive: true });
    window.addEventListener("pointerdown", handleUserInteraction, { passive: true });
    window.addEventListener("keydown", handleUserInteraction, { passive: true });

    return () => {
      clearTimeout(startTimer);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      active = false;
      doc.style.scrollBehavior = prevBehavior;
      window.removeEventListener("wheel", handleUserInteraction);
      window.removeEventListener("touchstart", handleUserInteraction);
      window.removeEventListener("touchmove", handleUserInteraction);
      window.removeEventListener("pointerdown", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
    };
  }, [enabled, delayMs]);
}
