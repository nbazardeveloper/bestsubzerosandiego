import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";

export default defineConfig(({ command }) => ({
  server: {
    host: true,
    port: 8080,
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    // Keep a single copy of React/React Query in the graph — TanStack Start's
    // server + client bundles can otherwise resolve two different copies and
    // break hooks (invalid hook call) or React Query's cache identity.
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-dom/client",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
    ],
  },
  plugins: [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      // Route TanStack Start's bundled server entry through src/server.ts,
      // which wraps SSR errors into a friendly error page instead of a raw 500.
      server: { entry: "server" },
    }),
    // Deploy adapter — only needed when producing a build, not during `vite dev`.
    //
    // "cloudflare-pages" outputs a Cloudflare Pages "Advanced Mode" build:
    // static assets at the root of dist/ plus a dist/_worker.js doing SSR —
    // exactly what Cloudflare Pages' dashboard Git-integration build expects
    // (Build command: `npm run build`, Build output directory: `dist`).
    //
    // NOTE: a fully static *prerendered* export (Nitro's "cloudflare-pages-static"
    // preset, which extends Nitro's generic "static" preset) was tried first,
    // since the site has no database/admin left and a pure static export with
    // zero server code is the ideal end state. It fails in this exact
    // TanStack Start + Nitro (3.0.260603-beta) + Vite 8 beta combination with
    // "rolldownOptions.input should not be an html file when building for SSR"
    // during Nitro's own build step, independent of how the prerender routes
    // are configured (tried both Nitro's `prerender` option and TanStack
    // Start's own `prerender`/`autoStaticPathsDiscovery`) — a genuine upstream
    // incompatibility in the beta toolchain's static/prerender path, not a
    // config mistake. "cloudflare-pages" (this one) doesn't go through that
    // prerender path at all — it's an SSR preset like "cloudflare-module",
    // just packaged into Pages' _worker.js convention instead of a standalone
    // Worker — so it doesn't hit the same bug. Revisit the static preset once
    // TanStack Start/Nitro update past this beta.
    ...(command === "build" ? [nitro({ preset: "cloudflare-pages" })] : []),
    viteReact(),
  ],
}));
