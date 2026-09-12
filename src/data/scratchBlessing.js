import { customise } from "./inject";

// The blessing a guest uncovers by scratching the foil off it.
//
// Deliberately a different section from `blessings`: that one is Bappa
// receiving something from the guest (flowers offered at his feet), this one
// is the guest receiving something back. Hence a heading addressed to them
// rather than to him, so the two never read as the same section twice.
//
// `quote` is an array because the language layer merges lists line by line;
// joinLines() puts it back together as one sentence for display.
export const scratchBlessing = customise("scratchBlessing", {
  heading: "तुमच्यासाठी आशीर्वाद",
  hint: "खरवडून पहा",
  quote: ["जिथे भक्ती, तिथे बाप्पा.", "तुमच्या घरी सुख, समृद्धी", "आणि आरोग्य नांदो."],
  signature: "॥ गणपती बाप्पा मोरया ॥",
});
