import { resolveAsset } from "../lib/assets";
import { footer } from "../data/footer";
import { shows } from "../data/sections";
import { Reveal } from "./Reveal";

// The closing blessing. The original build signed off with its own maker's
// credit; this one carries the InviteO mark instead.
export function FinalSection() {
  const quote = footer.quote ?? {};
  // The closing words are the customer's to remove. The InviteO credit
  // below them is not part of that switch.
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
        <div className="final-glow" />
      </Reveal>
    </section>
  );
}
