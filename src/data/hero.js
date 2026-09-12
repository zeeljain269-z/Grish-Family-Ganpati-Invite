import { customise } from "./inject";

// The opening screen: the sacred line, the two-word title, the golden
// gateway with Bappa, and the family signature beneath it.
//
// Shape is identical to the other themes (see api/_lib/schema.js), so the
// same editor drives all three designs with no extra fields.
export const hero = customise("hero", {
  shlok: "॥ श्री गणेशाय नमः ॥",
  subtitle: "आमच्या घरी यावर्षी",
  heading: ["बाप्पाचे", "आगमन"],
  date: "१४ आणि १५ सप्टेंबर",
  assets: {
    // The pink marble arch: Bappa on a carved throne under a blush-white
    // archway with rose-gold inlay, brass lanterns, roses and lilac at the
    // plinth, under a pink and lilac dawn. It carries the design's palette,
    // so the page and the artwork are one piece. A customer's own banner
    // photo replaces it.
    heroPhoto: "heroScene",
  },
  invitation: {
    familyName: "पाटील परिवाराकडून",
    tag: "सस्नेह आमंत्रण",
    message: [
      "गणरायाच्या आगमनाच्या या मंगल क्षणी आपण सर्वांनी उपस्थित राहून उत्सवाची शोभा वाढवावी.",
    ],
  },
});
