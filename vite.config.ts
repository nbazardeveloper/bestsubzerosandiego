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
    // NOTE: a fully static prerendered export (Nitro's "cloudflare-pages-static"
    // preset) was attempted here first, since the site has no database/admin
    // left and a pure static export is the ideal end state. It currently fails
    // in this exact TanStack Start + Nitro (3.0.260603-beta) + Vite 8 beta
    // combination with "rolldownOptions.input should not be an html file when
    // building for SSR" during Nitro's own build step, independent of how the
    // prerender routes are configured (tried both Nitro's `prerender` option
    // and TanStack Start's own `prerender`/`autoStaticPathsDiscovery`) — this
    // looks like a genuine upstream incompatibility in the beta toolchain, not
    // a config mistake. Falling back to "cloudflare-module": this still ships
    // with zero database/admin/secrets (the actual goal), just as a small
    // Cloudflare Worker doing SSR instead of pure static files. Deploy it to
    // Cloudflare Pages via Pages' "Advanced Mode" (a project pointed at this
    // build output, which includes a _worker.js). Revisit the static preset
    // once TanStack Start/Nitro update past this beta.
    ...(command === "build" ? [nitro({ preset: "cloudflare-module" })] : []),
    viteReact(),
  ],
}));
