import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { services, blogPosts } from "@/lib/site-data";

// Sitemap URLs must be absolute per the sitemap protocol. Falls back to the
// production domain if SITE_URL isn't set in the environment.
const BASE_URL = process.env.SITE_URL || "https://subzerovikingrepairpro.com";

const STATIC_ROUTES = [
  { path: "/", priority: "1.0", changefreq: "weekly" as const },
  { path: "/services", priority: "0.9", changefreq: "weekly" as const },
  { path: "/projects", priority: "0.8", changefreq: "weekly" as const },
  { path: "/service-area", priority: "0.8", changefreq: "monthly" as const },
  { path: "/about", priority: "0.7", changefreq: "monthly" as const },
  { path: "/reviews", priority: "0.7", changefreq: "monthly" as const },
  { path: "/blog", priority: "0.7", changefreq: "weekly" as const },
  { path: "/faq", priority: "0.7", changefreq: "monthly" as const },
  { path: "/contact", priority: "0.9", changefreq: "monthly" as const },
  { path: "/privacy-policy", priority: "0.3", changefreq: "yearly" as const },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        // Build-time date for pages with no tracked "last modified" of their
        // own (static pages, service listings) — blog posts use their real
        // published_at instead, since that's an actual last-modified date.
        const buildDate = new Date().toISOString().slice(0, 10);

        const urls = [
          ...STATIC_ROUTES.map((r) => ({
            loc: r.path,
            priority: r.priority,
            changefreq: r.changefreq,
            lastmod: buildDate,
          })),
          ...services
            .filter((s) => s.is_published)
            .map((s) => ({
              loc: `/services/${s.slug}`,
              priority: "0.7",
              changefreq: "monthly" as const,
              lastmod: buildDate,
            })),
          // Individual projects don't have their own URL — they're anchors
          // (#slug) on the /projects page, and URL fragments aren't crawled
          // as distinct pages by Google, so listing "/projects#slug" here
          // would just be N duplicate entries for the same /projects URL
          // already in STATIC_ROUTES above. Omitted entirely instead.
          ...blogPosts
            .filter((p) => p.is_published)
            .map((p) => ({
              loc: `/post/${p.slug}`,
              priority: "0.6",
              changefreq: "monthly" as const,
              lastmod: p.published_at.slice(0, 10),
            })),
        ];

        const body = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          ...urls.map(
            (u) =>
              `  <url><loc>${BASE_URL}${u.loc}</loc><lastmod>${u.lastmod}</lastmod><changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`,
          ),
          "</urlset>",
        ].join("\n");

        return new Response(body, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
