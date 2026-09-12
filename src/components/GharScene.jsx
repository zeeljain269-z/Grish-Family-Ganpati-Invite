// ------------------------------------------------------------------
//  The doorway of the house
//
//  This design's hero used to float the golden gateway on empty night.
//  Here that same gateway sits inside a family's own front door: a
//  terracotta wall, the door standing open with a toran strung across
//  it, a diya burning on either side, and rangoli chalked on the step -
//  the light from inside spilling out across it.
//
//  Everything but the gateway itself is drawn in CSS, so it costs no
//  extra image, scales to any width and stays crisp on every screen.
//  The gateway keeps its own alt text; the house around it is scenery
//  and is hidden from screen readers.
// ------------------------------------------------------------------
export function GharScene({ children }) {
  return (
    <div className="ghar-scene">
      <span aria-hidden="true" className="ghar-sky" />

      <div aria-hidden="true" className="ghar-wall">
        <span className="ghar-course" />
        <span className="ghar-course ghar-course--low" />
      </div>

      <div className="ghar-door">
        <span aria-hidden="true" className="ghar-jamb ghar-jamb--l" />
        <span aria-hidden="true" className="ghar-jamb ghar-jamb--r" />
        <span aria-hidden="true" className="ghar-lintel" />
        <div className="ghar-doorway">{children}</div>
        {/* the toran hangs from the lintel, across the opening */}
        <span aria-hidden="true" className="ghar-toran">
          {Array.from({ length: 11 }, (_, i) => (
            <i key={i} style={{ "--i": i }} />
          ))}
        </span>
      </div>

      <span aria-hidden="true" className="ghar-diya ghar-diya--l"><i /></span>
      <span aria-hidden="true" className="ghar-diya ghar-diya--r"><i /></span>

      {/* the light the open door throws onto the step */}
      <span aria-hidden="true" className="ghar-spill" />
      <span aria-hidden="true" className="ghar-step" />
      <span aria-hidden="true" className="ghar-rangoli" />
    </div>
  );
}
