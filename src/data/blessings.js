import { customise } from "./inject";

// The blessings card. Tapping it fades to the next blessing.
//
// This is the theme's own idiom, not a port from the other designs: the
// stylesheet this design was rebuilt from already carries .blessing-card /
// .blessing-text with the fade classes, and no separate murti artwork -
// hero-arch.webp is the whole gateway, Bappa included. heading, subtitle
// and note ride the shared `blessings` schema so the editor drives them;
// the blessing lines are theme copy, like everything in ui.js.
export const blessings = customise("blessings", {
  tag: "ASHIRWAD",
  heading: "बाप्पाचा आशीर्वाद",
  subtitle: "स्पर्श करा आणि बाप्पाचा आशीर्वाद घ्या",
  note: "पुन्हा स्पर्श करा",
  // The flower shower under the blessing card.
  buttonText: "फुलांची वर्षाव करा",
  lines: [
    "सुख, समृद्धी आणि आरोग्य लाभो.",
    "विघ्नहर्ता आपल्या सर्व अडचणी दूर करो.",
    "घरात सदैव आनंद आणि शांती नांदो.",
    "मनातील सर्व इच्छा पूर्ण होवोत.",
    "बुद्धी, यश आणि कीर्ती आपल्या पदरी पडो.",
  ],
});
