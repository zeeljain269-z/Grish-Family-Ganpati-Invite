import { customise } from "./inject";

// The photo carousel. Each member is a name and a portrait; the portrait
// is either an asset-registry key or an uploaded image path.
//
// This is the one block Temple Darbar adds beyond the shared schema, so
// api/_lib/schema.js normalises `family.members[]` too.
export const family = customise("family", {
  tag: "INVITATION",
  heading: "सस्नेह आमंत्रण",

  // A sample family photo, so the design shows what this section is for -
  // a buyer looking at the template can see the feature before paying, and
  // a customer replaces it with their own in one upload. It is the only
  // photograph besides the arch; the four-portrait carousel stays off.
  // "group" is one photo of everyone; "members" is a portrait per person.
  mode: "group",
  photo: "familyGroup",
  caption: "पाटील परिवार",
  // "portrait" when the group photo was taken with the phone upright
  orientation: "landscape",
  members: [],
});
