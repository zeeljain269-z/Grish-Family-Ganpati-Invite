// ------------------------------------------------------------------
//  Asset registry
//  Every image/audio the invite uses, keyed by a friendly name.
//  Files live in /public/assets and are served at "/assets/<file>".
//  To swap an image: drop the new file in public/assets and update its
//  path below (that's the only place the filename appears).
// ------------------------------------------------------------------

const FILES = {
  // The one banner this design carries: a carved archway with Bappa on a
  // marble throne, brass lanterns on chains and a flowering garden at the
  // plinth. Its edges fade to the same tone as the page, so it sits in the
  // design rather than on top of it. Customers upload over it like any
  // banner. To replace it, generate a new one with the Image-1 prompt in
  // TEMPLE-DARBAR-PROMPT.md, save it as public/assets/hero-scene.webp and
  // rebuild.
  heroScene: "/assets/hero-scene.webp",

  // The memories wall samples: Bappa at a family's home across four past
  // years. Every one is replaced outright the moment a customer uploads
  // their own - they are here so the section shows what it is for.
  gallery1: "/assets/gallery-1.webp",
  gallery2: "/assets/gallery-2.webp",
  gallery3: "/assets/gallery-3.webp",
  gallery4: "/assets/gallery-4.webp",

  logo: "/assets/logo.webp",
  divider: "/assets/divider.webp",
  topDeco: "/assets/top-deco.webp",

  // Real marigold strands, photographed against transparency - the same two
  // the fort and Kailash designs hang. One is marigolds with mango leaves,
  // the other a dense marigold rope.
  malaLeaf: "/assets/mala-leaf.webp",
  malaMarigold: "/assets/mala-marigold.webp",

  // family carousel portraits
  // The sample for "one photo of everyone" - a whole family, not a
  // single portrait, so it is obvious what to upload here.
  familyGroup: "/assets/family-group.webp",

  family1: "/assets/family-1.jpg",
  family2: "/assets/family-2.jpg",
  family3: "/assets/family-3.jpg",
  family4: "/assets/family-4.jpg",

  // InviteO brand mark (footer credit)
  inviteoLogo: "/assets/inviteo-logo.svg",

  // audio
  bgMusic: "/assets/bgMusic.mp3",

  // Blessing section image
  blessingImage: "/assets/blessing-ganesha.jpg",
};

// When an invite is served from /t/<theme>/ (production, via /api/render)
// the bundle's base path is not "/", so every "/assets/…" path above needs
// that prefix. Uploaded images (absolute URLs or /api/media) pass through
// untouched.
const BASE = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
const withBase = (value) =>
  typeof value === "string" && value.startsWith("/assets/") ? BASE + value : value;

export const ASSETS = Object.fromEntries(
  Object.entries(FILES).map(([key, value]) => [key, withBase(value)])
);

// Resolve a key to a URL. Unknown keys pass through (so you can also
// pass a raw URL/path directly).
export function resolveAsset(key) {
  return key ? ASSETS[key] ?? withBase(key) : "";
}
