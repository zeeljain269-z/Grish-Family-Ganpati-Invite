import { customise } from "./inject";

// Background music. `track` is either a key from the asset registry or a
// path served by the site (/media/music/…, or an uploaded file). `enabled`
// false means a silent invitation - no audio element, no toggle button.
export const music = customise("music", {
  enabled: true,
  track: "bgMusic",
});
