import { customise } from "./inject";

// The memories wall: Bappa at this family's home in years gone by, hung
// after the venue and before the blessing.
//
// It sits there rather than beside the family carousel on purpose. The
// carousel says who is inviting you; this says how many years Bappa has
// already come to this house, and a guest only cares about the second once
// they know when and where to come.
//
// Same customise() contract as every other block: arrays replace wholesale,
// so a customer's uploads take the place of these samples instead of
// blending with them. The samples are asset keys rather than URLs and
// resolveAsset() takes either, so a shipped photograph and an uploaded one
// are handled identically.
export const gallery = customise("gallery", {
  tag: "आठवणी",
  heading: "मागील वर्षांचे गणपती",
  subtitle: "आमच्या घरी विराजमान झालेले बाप्पा",
  photos: [
    { url: "gallery1", caption: "२०२२" },
    { url: "gallery2", caption: "२०२३" },
    { url: "gallery3", caption: "२०२४" },
    { url: "gallery4", caption: "२०२५" },
  ],
});
