import { createFileRoute, notFound } from "@tanstack/react-router";
import { NotFoundComponent } from "./__root";

// Splat/catch-all route ("$" matches any otherwise-unmatched path, e.g. the
// removed /admin, /auth, or any stale/typo'd URL). Without this route,
// __root's own notFoundComponent handled unmatched paths directly: HTTP
// status was a correct 404, but the <head> carried __root's default
// title/description with no "noindex" — a soft-404 that SEO audit tools
// flag as a duplicate title. beforeLoad throws notFound() so the response
// stays a real 404 (confirmed via a live request — omitting this made the
// splat "match" and return 200 instead), while this route's own head()
// still supplies a distinct title + noindex.
export const Route = createFileRoute("/$")({
  beforeLoad: () => {
    throw notFound();
  },
  head: () => ({
    meta: [
      { title: "Page Not Found | Best Sub-Zero & Viking Service" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  notFoundComponent: NotFoundComponent,
});
