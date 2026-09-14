import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// GitHub Pages serves the built app from a project subpath
// (https://<user>.github.io/<repo>/), so `base` must match the repo name.
// Override at build time with `VITE_BASE=/repo-name/ npm run build` once the
// repo is created; "/" is correct for local dev and for a user/org root page.
export default defineConfig({
  base: process.env.VITE_BASE ?? "/",
  plugins: [react(), tailwindcss()],
  // Default environment stays "node": the Phase 4 lib tests read the seed
  // file from disk via import.meta.url and break under jsdom's faked
  // location. Any future component test can opt into jsdom per-file with a
  // `// @vitest-environment jsdom` comment.
});
