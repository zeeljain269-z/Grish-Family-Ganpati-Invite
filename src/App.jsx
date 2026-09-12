import { useEffect, useState } from "react";
import { MusicProvider, useMusic } from "./context/MusicContext";
import { CurtainIntro } from "./components/CurtainIntro";
import { Hero } from "./components/Hero";
import { Ambience } from "./components/Ambience";
import { FamilySection } from "./components/FamilySection";
import { Utsav } from "./components/Utsav";
import { LocationSection } from "./components/LocationSection";
import { Gallery } from "./components/Gallery";
import { Blessings } from "./components/Blessings";
import { ScratchBlessing } from "./components/ScratchBlessing";
import { FinalSection } from "./components/FinalSection";
import { useAutoScroll } from "./hooks/useAutoScroll";

// Embedded modes:
//   ?preview=1 - landing-page thumbnail preview
//   ?edit=1    - the customer's live preview while editing: gates open at
//                once, scroll position survives each reload.
function useEmbedModes() {
  const params = new URLSearchParams(window.location.search);
  const isPreview = params.has("preview");
  const isEditor = params.has("edit");
  const noIntro = isEditor && params.has("nointro");

  useEffect(() => {
    if (!isPreview && !isEditor) return;
    document.documentElement.setAttribute("data-preview", "true");
    if (isEditor) document.documentElement.setAttribute("data-editor", "true");
  }, [isPreview, isEditor]);

  // ?edit=1 - keep the customer looking at the part they are editing
  useEffect(() => {
    if (!isEditor) return;
    const KEY = "inviteo:preview-scroll";
    const saved = Number(window.sessionStorage.getItem(KEY) || 0);
    const restore = saved > 0 ? setTimeout(() => window.scrollTo(0, saved), noIntro ? 40 : 900) : 0;
    const remember = () => window.sessionStorage.setItem(KEY, String(window.scrollY));
    window.addEventListener("scroll", remember, { passive: true });
    return () => {
      if (restore) clearTimeout(restore);
      window.removeEventListener("scroll", remember);
    };
  }, [isEditor, noIntro]);

  return { isPreview, isEditor, noIntro, embedded: isPreview || isEditor };
}

function Invite() {
  const { startMusic } = useMusic();
  const { embedded, noIntro, isEditor } = useEmbedModes();
  const [introState, setIntroState] = useState(noIntro ? "complete" : "closed");

  // Auto-scroll the website after 3 seconds
  useAutoScroll({ enabled: !isEditor, delayMs: 3000 });

  return (
    <>
      {!noIntro && (
        <CurtainIntro
          autoOpen={embedded}
          onOpenStart={() => {
            setIntroState("complete");
            if (!embedded) startMusic();
          }}
        />
      )}
      <div className="site-shell" data-intro-state={introState}>
        {/* Decoration only - fixed, aria-hidden, pointer-events:none. */}
        <Ambience />
        <Hero />
        <FamilySection />
        <Utsav />
        <LocationSection />
        {/* Past years, once the guest knows when and where to come. The
            family carousel above says who is inviting; this says how many
            years Bappa has already come to this house. */}
        <Gallery />
        <Blessings />
        {/* Last thing before the sign-off: the guest leaves with
            something, having spent the whole invite being asked. */}
        <ScratchBlessing />
        <FinalSection />
      </div>
    </>
  );
}

export default function App() {
  return (
    <MusicProvider>
      <Invite />
    </MusicProvider>
  );
}
