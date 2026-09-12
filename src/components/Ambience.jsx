// Petals drifting down through the whole invite.
//
// This design already drops petals, but only inside the hero
// (.darbar-petals is absolutely positioned in the arch), so the moment a
// guest scrolls past the gateway everything stops moving - the programme,
// the venue and the family sit completely still.
//
// This is the same petal, continued: a fixed layer over the page, sparser
// and slower than the hero's so it reads as the tail of that fall rather
// than a second effect competing with it.
//
// Decoration only: aria-hidden, pointer-events:none, no layout, transform
// and opacity alone, and removed entirely for a reader who asked their
// device for less motion (see index.css). The spread comes from --i in CSS
// rather than Math.random, so it is identical for every guest.
export function Ambience({ count = 10 }) {
  return (
    <div className="darbar-ambience" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span key={i} style={{ "--i": i }} />
      ))}
    </div>
  );
}
