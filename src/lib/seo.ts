// SEO helpers shared across route `head()` functions.
// Keeps generated <title> in the 50–60 char range and <meta name="description">
// in the 150–160 char range, per project SEO standards, even for dynamic
// (DB-driven) content such as individual service pages.

const SITE_NAME = "Best Sub-Zero & Viking Service";
const SITE_URL = "https://subzerovikingrepairpro.com";

/**
 * Turns a site-relative path into an absolute URL. Canonical links and
 * og:url must be absolute — a relative canonical (e.g. href="/") is invalid
 * per spec and gets flagged by SEO audits (Lighthouse "canonical" audit).
 */
export function absUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Fallback `og:image` for pages that don't have their own hero/photo (About,
 * Contact, FAQ, Privacy Policy, etc). Without an og:image, links shared on
 * Facebook/LinkedIn/iMessage show no preview image at all and Twitter/X's
 * "summary_large_image" card (set site-wide in __root.tsx) fails to render
 * — so every page needs at least this generic one.
 */
export const DEFAULT_OG_IMAGE = absUrl("/images/hero.webp");

/**
 * Shared identity fields for the Organization/LocalBusiness JSON-LD blocks
 * declared across __root.tsx, index.tsx, contact.tsx and services_.$slug.tsx
 * — kept in one place so the entity stays consistent (same "@id", address,
 * hours) everywhere it's declared, which matters for Google associating them
 * as the same business rather than several distinct ones.
 */
export const ORG_ID = absUrl("/#organization");

export const LOCAL_BUSINESS_ADDRESS = {
  "@type": "PostalAddress",
  addressLocality: "San Diego",
  addressRegion: "CA",
  addressCountry: "US",
} as const;

export const LOCAL_BUSINESS_HOURS = {
  "@type": "OpeningHoursSpecification",
  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  opens: "08:00",
  closes: "19:00",
} as const;

/**
 * Twitter Card tags mirroring a page's og:title/description/image. Twitter
 * falls back to the og: equivalents when these are absent, but not every
 * validator/crawler implements that fallback, so every page sets them
 * explicitly.
 */
export function twitterMeta(title: string, description: string, image: string = DEFAULT_OG_IMAGE) {
  return [
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
  ];
}

const TITLE_SUFFIXES = [
  ` | Sub-Zero & Viking Repair Experts in San Diego`,
  ` | Sub-Zero & Viking Repair Experts`,
  ` | ${SITE_NAME}`,
  ` | San Diego Appliance Repair`,
  ` | San Diego Repair`,
  ` | San Diego`,
];

/**
 * Builds a page <title> from a base string, appending a brand/location
 * suffix chosen so the final title lands within 50–60 characters.
 * Falls back to the shortest suffix (or the bare base) if nothing fits.
 */
export function buildTitle(base: string): string {
  for (const suffix of TITLE_SUFFIXES) {
    const total = base.length + suffix.length;
    if (total >= 50 && total <= 60) return base + suffix;
  }
  // Nothing landed in range (very short or very long base) — best effort.
  const withShortest = base + TITLE_SUFFIXES[TITLE_SUFFIXES.length - 1];
  return withShortest.length <= 60 ? withShortest : base.slice(0, 60);
}

/**
 * Builds a <meta name="description"> from a short summary + a longer body,
 * truncated at a word boundary so the result lands within 150–160 chars.
 */
export function buildMetaDescription(short: string, long: string, max = 160, min = 150): string {
  const combined = long ? `${short} ${long}` : short;
  if (combined.length <= max) return combined;

  let truncated = combined.slice(0, max - 1);
  const lastSpace = truncated.lastIndexOf(" ");
  if (lastSpace >= min - 1) truncated = truncated.slice(0, lastSpace);
  truncated = truncated.replace(/[,;:.\-–—\s]+$/, "");
  return `${truncated}…`;
}
