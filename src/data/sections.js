import { customise } from "./inject";

// Which parts of the invite the customer wants at all.
//
// The editor stores only the ones switched OFF (see REMOVABLE in
// api/_lib/schema.js), so anything absent here is shown. That is what keeps
// every invite sold before this existed rendering exactly as it did.
//
// Switching a section off hides it; it never deletes what was typed, so the
// words come back with it.
export const sections = customise("sections", {});

export const shows = (key) => sections?.[key] !== false;
