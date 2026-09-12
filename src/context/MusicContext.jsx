import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { resolveAsset } from "../lib/assets";
import { music } from "../data/music";

const FADE_MS = 600; // smooth fade in/out duration in ms
const FADE_STEPS = 20;
const TARGET_VOLUME = 0.7; // balanced, comfortable listening volume

const MusicContext = createContext({
  enabled: true,
  isPlaying: false,
  startMusic: () => {},
  toggleMusic: () => {},
});

export function useMusic() {
  return useContext(MusicContext);
}

export function MusicProvider({ children }) {
  const audioRef = useRef(null);
  const fadeRef = useRef(null);
  const userWantsPlayRef = useRef(false);
  const fadingOutRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Clear any in-flight volume fade interval
  const clearFade = useCallback(() => {
    if (fadeRef.current) {
      clearInterval(fadeRef.current);
      fadeRef.current = null;
    }
  }, []);

  // Smoothly raise volume up to TARGET_VOLUME
  const fadeIn = useCallback(
    (audio) => {
      clearFade();
      let vol = audio.volume;
      const step = (TARGET_VOLUME - vol) / FADE_STEPS;
      const tick = FADE_MS / FADE_STEPS;
      fadeRef.current = setInterval(() => {
        vol = Math.min(vol + step, TARGET_VOLUME);
        audio.volume = Math.max(0, Math.min(1, vol));
        if (vol >= TARGET_VOLUME) {
          audio.volume = TARGET_VOLUME;
          clearFade();
        }
      }, tick);
    },
    [clearFade]
  );

  // Smoothly lower volume to 0 then pause
  const fadeOut = useCallback(
    (audio, onComplete) => {
      clearFade();
      let vol = audio.volume;
      const step = vol / FADE_STEPS;
      const tick = FADE_MS / FADE_STEPS;
      fadeRef.current = setInterval(() => {
        vol = Math.max(vol - step, 0);
        audio.volume = Math.max(0, Math.min(1, vol));
        if (vol <= 0) {
          audio.volume = 0;
          clearFade();
          audio.pause();
          onComplete?.();
        }
      }, tick);
    },
    [clearFade]
  );

  // Determine source path with reliable fallback
  const resolvedTrack = music.enabled === false ? "" : resolveAsset(music.track || "bgMusic");
  const defaultFallback = resolveAsset("bgMusic") || "/assets/bgMusic.mp3";
  const source = resolvedTrack || defaultFallback;

  const getAudio = useCallback(() => {
    if (!source || music.enabled === false) return null;

    if (!audioRef.current) {
      const audio = new Audio();
      audio.src = source;
      audio.loop = true; // Seamless continuous background loop
      audio.volume = 0;
      audio.preload = "auto";

      audio.addEventListener("play", () => {
        setIsPlaying(true);
      });

      audio.addEventListener("pause", () => {
        if (!fadingOutRef.current) {
          setIsPlaying(false);
        }
      });

      audio.addEventListener("error", (err) => {
        console.warn("Audio load error on track:", audio.src, err);
        // If current source failed and isn't the fallback, try default
        if (defaultFallback && audio.src !== defaultFallback && !audio.src.endsWith("bgMusic.mp3")) {
          audio.src = defaultFallback;
          audio.load();
          if (userWantsPlayRef.current) {
            audio.play().then(() => fadeIn(audio)).catch(() => {});
          }
        } else {
          setIsPlaying(false);
        }
      });

      audioRef.current = audio;
    }

    return audioRef.current;
  }, [source, defaultFallback, fadeIn]);

  // Start playback (e.g. called when curtain opens)
  const startMusic = useCallback(() => {
    const audio = getAudio();
    if (!audio) return;
    userWantsPlayRef.current = true;
    fadingOutRef.current = false;

    if (audio.paused) {
      audio.volume = 0;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            fadeIn(audio);
          })
          .catch((err) => {
            // Autoplay blocked by browser policy; user gesture fallback handles it
            console.info("Audio waiting for user gesture to play:", err.message);
          });
      }
    } else {
      fadeIn(audio);
    }
  }, [getAudio, fadeIn]);

  // Manual toggle from header button
  const toggleMusic = useCallback(() => {
    const audio = getAudio();
    if (!audio) return;

    if (isPlaying) {
      userWantsPlayRef.current = false;
      fadingOutRef.current = true;
      setIsPlaying(false);
      fadeOut(audio, () => {
        fadingOutRef.current = false;
      });
    } else {
      userWantsPlayRef.current = true;
      fadingOutRef.current = false;
      audio.volume = 0;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            fadeIn(audio);
          })
          .catch((err) => {
            console.warn("Audio playback error:", err);
          });
      }
    }
  }, [getAudio, isPlaying, fadeIn, fadeOut]);

  // If user wanted music but browser blocked autoplay, resume on first document interaction
  useEffect(() => {
    const unlockOnInteraction = () => {
      if (!userWantsPlayRef.current) return;
      const audio = audioRef.current;
      if (audio && audio.paused) {
        audio.play().then(() => fadeIn(audio)).catch(() => {});
      }
    };

    window.addEventListener("click", unlockOnInteraction, { once: true, passive: true });
    window.addEventListener("touchstart", unlockOnInteraction, { once: true, passive: true });

    return () => {
      window.removeEventListener("click", unlockOnInteraction);
      window.removeEventListener("touchstart", unlockOnInteraction);
    };
  }, [fadeIn]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearFade();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [clearFade]);

  return (
    <MusicContext.Provider value={{ enabled: !!source && music.enabled !== false, isPlaying, startMusic, toggleMusic }}>
      {children}
    </MusicContext.Provider>
  );
}
