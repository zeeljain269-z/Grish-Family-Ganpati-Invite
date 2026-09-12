// ------------------------------------------------------------------
//  Venue map
//
//  Two things point at the venue: the map in the page, and the button
//  that opens the visitor's own maps app. Both are derived from the
//  address the customer has already typed, so filling in "Full address"
//  is all it takes to get a correct map.
//
//  Why derived rather than stored: an embed URL is not something anyone
//  can be expected to produce. Google only hands it out through
//  Share -> Embed a map, buried inside an <iframe> tag, and the editor
//  field for it is marked optional. Left blank it used to fall through
//  to the theme's sample embed, so a Pune invite showed a map of Mumbai
//  under a Pune address - confidently wrong, which is worse than no map
//  at all.
//
//  A customer who does paste a real embed URL still wins; anything else
//  they paste (an ordinary /maps/place/ share link, a maps.app.goo.gl
//  short link) is ignored, because Google serves those with
//  X-Frame-Options: SAMEORIGIN and the browser renders a broken frame.
// ------------------------------------------------------------------

// The only two shapes Google will allow inside an iframe.
const EMBEDDABLE = [
  /^https:\/\/(?:www\.)?google\.[a-z.]+\/maps\/embed\?/i,
  /^https:\/\/maps\.google\.[a-z.]+\/maps\?[^]*\boutput=embed\b/i,
];

const isEmbeddable = (url) =>
  typeof url === "string" && EMBEDDABLE.some((pattern) => pattern.test(url));

// The coordinate the customer picked off the venue search in the editor.
// A fallback, not the first choice - see below.
const point = (location) => {
  const lat = Number(location?.lat);
  const lng = Number(location?.lng);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return "";
  if (Math.abs(lat) > 90 || Math.abs(lng) > 180) return "";
  return `${lat},${lng}`;
};

// What we hand Google to look the venue up.
//
// The address ALONE, never the venue name with it. A house name is not a
// place Google knows, so "पाटील निवास, <address>" is read as a search for
// every Patil Nivas in the state and comes back as a scatter of pins
// zoomed out to the whole of Maharashtra, while the address on its own
// lands on the street. The venue name is only used when there is no
// address at all, where a landmark is better than an empty frame.
const query = (location) => {
  const pick = (part) => (typeof part === "string" ? part.trim() : "");
  return pick(location?.address) || pick(location?.venue);
};

// The address the customer typed beats the coordinate they tapped.
//
// It reads backwards - a coordinate cannot be misread the way a line of
// text can - and it is still how this worked at first. What settled it was
// looking at where the two actually land in India. The venue search is
// OpenStreetMap, and outside the metros OSM holds administrative
// boundaries and railway stations, not homes and mandals: searching
// Nandurbar offers the district, the taluka and the town, and searching
// Borivali offers six railway platforms. Tap any of them and you have
// pinned something real, precise, and a kilometre from the celebration.
//
// Google, handed the same customer's typed address, finds the actual
// lane - in Devanagari as readily as in English. So a real Nandurbar
// invite carried "सोनार गल्ली, बाबा गणपती, नंदुरबार", which Google puts
// on Baba Ganpati mandir, and a tapped pin that put it at the bus stand.
// The pin won, and the guests got the bus stand.
//
// The coordinate is kept for the invite that has no address to search -
// there a pin, however rough, beats an empty frame.
const target = (location) => query(location) || point(location);

// The src for the <iframe>. Empty string means "no map worth showing",
// and every design hides the frame rather than render an empty box.
export function mapEmbedSrc(location) {
  if (isEmbeddable(location?.googleMapsEmbed)) return location.googleMapsEmbed;

  const q = target(location);
  if (!q) return "";
  // The keyless embed endpoint - no API key, no billing account, and it
  // sets no X-Frame-Options, unlike every other maps.google.com path.
  return `https://maps.google.com/maps?q=${encodeURIComponent(q)}&output=embed`;
}

// The href for the "Open Maps" button. A link the customer pasted is
// used as-is: unlike the embed it is opened top-level, so a share link,
// a short link or a plus code all work.
export function mapDirectionsHref(location) {
  const link = location?.googleMapsLink;
  if (typeof link === "string" && /^https?:\/\//i.test(link.trim())) return link.trim();

  const q = target(location);
  return q ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}` : "";
}
