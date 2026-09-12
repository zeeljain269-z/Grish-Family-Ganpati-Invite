import { customise } from "./inject";

// Venue block: an embedded map, the address, and a button that opens
// directions in the visitor's own maps app.
export const location = customise("location", {
  tag: "LOCATION",
  heading: "ठिकाण",
  venue: "पाटील निवास",
  address: "प्लॉट नं. १२, गणेशनगर, शिवाजीनगर, पुणे, महाराष्ट्र",
  // No googleMapsLink / googleMapsEmbed here on purpose: both are derived
  // from the address above by src/lib/maps.js. A sample URL left in place
  // becomes the fallback for every customer who does not fill the optional
  // embed field in, which is how a Pune address ended up on a map of a
  // different city.
  footerMessage: ["बाप्पाच्या दर्शनासाठी अवश्य या"],
});
