// ============================================================================
// SITE DATA ACCESSORS
// ============================================================================
// Plain functions over the static content in site-data.ts — no database, no
// server round-trip. Kept as small async functions (rather than importing
// site-data.ts directly everywhere) so every route that already calls these
// through useQuery/loader `ensureQueryData` keeps working unchanged.
// ============================================================================

export type SiteSettings = {
  business_name: string;
  phone: string;
  email: string;
  address: string | null;
  hours: string | null;
  diagnostic_fee: string | null;
  social_links: Record<string, string>;
  review_count: number | null;
  review_rating: number | null;
  yelp_review_count: number | null;
  yelp_review_rating: number | null;
};

export async function getSiteSettings(): Promise<SiteSettings> {
  const { siteSettings } = await import("./site-data");
  return siteSettings;
}

export async function listServices() {
  const { services } = await import("./site-data");
  return services.filter((s) => s.is_published).sort((a, b) => a.sort_order - b.sort_order);
}

export async function listFeaturedServices() {
  const { services } = await import("./site-data");
  return services
    .filter((s) => s.is_published && s.is_featured)
    .sort((a, b) => a.sort_order - b.sort_order);
}

export async function getServiceBySlug({ data }: { data: { slug: string } }) {
  const { services } = await import("./site-data");
  return services.find((s) => s.slug === data.slug && s.is_published) ?? null;
}

export async function listProjects() {
  const { projects } = await import("./site-data");
  return projects
    .filter((p) => p.is_published)
    .sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
}

export async function listFeaturedProjects() {
  const { projects } = await import("./site-data");
  return projects
    .filter((p) => p.is_published)
    .sort((a, b) => (a.created_at < b.created_at ? 1 : -1))
    .slice(0, 3);
}

export async function listBlogPosts() {
  const { blogPosts } = await import("./site-data");
  return [...blogPosts]
    .filter((p) => p.is_published)
    .sort((a, b) => (a.published_at < b.published_at ? 1 : -1));
}

export async function getBlogPostBySlug({ data }: { data: { slug: string } }) {
  const { blogPosts } = await import("./site-data");
  return blogPosts.find((p) => p.slug === data.slug && p.is_published) ?? null;
}
