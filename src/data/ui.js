import { customise } from "./inject";

// Strings the components own rather than the customer: the seal on the
// temple gates, the labels on the two buttons, the image description a
// screen reader reads out, and the fallback title that travels inside a
// guest's calendar entry. They still have to follow the invite's language,
// which is why they live here and not inline.
export const ui = customise("ui", {
  musicOn: "संगीत सुरू करा",
  musicOff: "संगीत बंद करा",
  curtainSeal: "॥ गणेशाय नमः ॥",
  // The gates carry this in small Latin capitals in every language - it is
  // part of the carved-brass look of the seal, not a sentence.
  curtainTap: "TAP TO OPEN",
  calendarLabel: "दिनदर्शिकेत जोडा",
  mapsButton: "नकाशा उघडा",
  // Used only when a calendar event has no summary of its own.
  calendarFallback: "गणपती उत्सव",
  heroAlt: "कोरीव संगमरवरी मंडपात सिंहासनावर विराजमान श्री गणेश",
  // Read out for the scroll hint under the doorway, which is a button as
  // well as a hint - tapping it moves down to the family.
  scrollCue: "खाली स्क्रोल करा",
});
