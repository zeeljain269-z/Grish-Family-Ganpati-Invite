// ------------------------------------------------------------------
//  Per-customer content injection
//
//  A published invite is served by /api/render, which writes the
//  customer's saved content into the page as:
//
//      <script>window.__INVITE__ = { slug, theme, data:{...} }</script>
//
//  before this bundle loads. Every module in src/data wraps its
//  defaults in customise("<key>", {...}) so the customer's values win
//  and anything they never touched falls back to the sample content -
//  a half-filled invite still renders completely.
//
//  With no injection present (local dev, plain build) the defaults are
//  used unchanged.
// ------------------------------------------------------------------

import { PACKS } from "./lang";

function isPlainObject(value) {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

// Objects merge key-by-key; arrays and scalars replace wholesale
// (an events list the customer edited must not blend with the sample one).
function deepMerge(defaults, override) {
  if (override === undefined || override === null) return defaults;
  if (!isPlainObject(defaults) || !isPlainObject(override)) return override;

  const out = { ...defaults };
  for (const [key, value] of Object.entries(override)) {
    if (value === undefined) continue;
    out[key] = deepMerge(defaults[key], value);
  }
  return out;
}

function injected() {
  if (typeof window === "undefined") return null;
  // The editor preview re-injects through sessionStorage so a reload
  // picks up unsaved edits without a round trip to the API.
  try {
    // ...but only on an editor preview URL, so a real invite opened in the
    // same tab can never pick up someone's draft content.
    if (new URLSearchParams(window.location.search).has("edit")) {
      const preview = window.sessionStorage.getItem("inviteo:preview");
      if (preview) return JSON.parse(preview);
    }
  } catch {
    /* storage blocked (private mode) - fall through to the page payload */
  }
  return window.__INVITE__ ?? null;
}

// ------------------------------------------------------------------
//  Language
//
//  Marathi is the base content of this theme; Hindi and English ship as
//  override packs in ./lang. A pack carries only text - ids, asset keys
//  and layout hints stay with the Marathi defaults, which is why the
//  language layer merges lists position-by-position instead of replacing
//  them (customer edits still replace a list wholesale: an events list
//  they rewrote must not blend with our sample one).
// ------------------------------------------------------------------
const LANGS = ["mr", "hi", "en"];

function mergeLang(base, over) {
  if (over === undefined || over === null) return base;
  if (Array.isArray(base) && Array.isArray(over)) {
    return base.map((item, i) => (i < over.length ? mergeLang(item, over[i]) : item));
  }
  if (!isPlainObject(base) || !isPlainObject(over)) return over;
  const out = { ...base };
  for (const [key, value] of Object.entries(over)) {
    if (value === undefined) continue;
    out[key] = mergeLang(base[key], value);
  }
  return out;
}

function activeLang() {
  const payload = injected();
  // A published invite carries the language its owner bought it in.
  const saved = payload?.data?.lang ?? payload?.lang;
  if (LANGS.includes(saved)) return saved;
  // Landing-page and editor previews ask for one with ?lang=…
  if (typeof window !== "undefined") {
    const asked = new URLSearchParams(window.location.search).get("lang");
    if (LANGS.includes(asked)) return asked;
  }
  return "mr";
}

export const lang = activeLang();

// Devanagari and Latin want different sizes and letter-spacing, and a
// screen reader should be told which language it is reading.
if (typeof document !== "undefined") {
  document.documentElement.setAttribute("lang", lang === "en" ? "en-IN" : lang);
  document.documentElement.setAttribute("data-lang", lang);
}

export function customise(key, defaults) {
  const payload = injected();
  const base = lang === "mr" ? defaults : mergeLang(defaults, PACKS[lang]?.[key]);
  return deepMerge(base, payload?.data?.[key]);
}

export const inviteMeta = (() => {
  const payload = injected();
  return {
    slug: payload?.slug ?? null,
    theme: payload?.theme ?? null,
    isPreview: !!payload?.preview,
  };
})();
