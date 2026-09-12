import { resolveAsset } from "../lib/assets";

// ------------------------------------------------------------------
//  Flowers.
//
//  Every Ganpati house is decorated before Bappa arrives: strands of
//  marigold hung across the doorway, malas beside the murti, petals on
//  the floor. The gateway alone read as a bare hall, so the same three go
//  on here - real photographed marigolds, not drawn ones, so they sit
//  beside the photographic arch rather than arguing with it.
// ------------------------------------------------------------------

// The toran: strands hung from a string across the top, at uneven lengths
// the way a real one is tied. Mostly the leaf-and-marigold strand, with the
// denser marigold rope every third one - enough variety to look tied by
// hand, without the whole hero turning orange.
const STRANDS = 9;

export function Decor() {
  const leaf = resolveAsset("malaLeaf");
  const marigold = resolveAsset("malaMarigold");

  return (
    <>
      <div className="darbar-toran" aria-hidden="true">
        <span className="darbar-toran-string" />
        {Array.from({ length: STRANDS }, (_, i) => (
          <img
            alt=""
            className="darbar-strand"
            key={i}
            src={i % 3 === 2 ? marigold : leaf}
            style={{ "--i": i }}
          />
        ))}
      </div>

      {/* one long mala down each side, framing the arch - the leaf strand on
          both, so the sides read green and gold rather than solid orange */}
      <img alt="" className="darbar-mala darbar-mala--left" src={leaf} aria-hidden="true" />
      <img alt="" className="darbar-mala darbar-mala--right" src={leaf} aria-hidden="true" />

      {/* petals off the garlands, drifting through the hero */}
      <div className="darbar-petals" aria-hidden="true">
        {Array.from({ length: 14 }, (_, i) => (
          <span className="darbar-petal" key={i} style={{ "--i": i }} />
        ))}
      </div>
    </>
  );
}
