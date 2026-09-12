import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Assets live in /public/assets and are referenced as "/assets/<file>"
// from both the CSS (verbatim from the original build) and src/lib/assets.js.
export default defineConfig({
  plugins: [react()],
});
