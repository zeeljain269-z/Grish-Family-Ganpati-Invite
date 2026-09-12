import { useState } from "react";
import { Share2 } from "lucide-react";
import { resolveAsset } from "../lib/assets";
import { footer } from "../data/footer";
import { shows } from "../data/sections";
import { Reveal } from "./Reveal";
import { ShareModal } from "./ShareModal";

// The closing blessing and share invitation action.
export function FinalSection() {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const quote = footer.quote ?? {};
  const closing = shows("footer");
  const linesOfQuote = closing
    ? [quote.firstLine, quote.secondLine, quote.endingText].filter(Boolean)
    : [];

  return (
    <section className="section final-section">
      <img alt="" className="final-deco final-deco-top" src={resolveAsset("topDeco")} />

      <Reveal className="final-content">
        <img alt="" className="final-divider" src={resolveAsset("divider")} />
        {linesOfQuote.length > 0 && (
          <p className="final-message">
            {linesOfQuote.map((line, i) => (
              <span key={i}>
                {i > 0 ? <br /> : null}
                {line}
              </span>
            ))}
          </p>
        )}
        {closing && footer.family ? <p className="final-family">{footer.family}</p> : null}

        <div className="share-invite-wrap">
          <button
            type="button"
            className="share-invite-button"
            onClick={() => setIsShareOpen(true)}
            aria-label="Share invitation"
          >
            <Share2 size={18} />
            <span>निमंत्रण शेअर करा • Share Invite</span>
          </button>
        </div>

        <div className="final-glow" />
      </Reveal>

      <ShareModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} />
    </section>
  );
}
