// ============================================================================
// STATIC SITE DATA
// ============================================================================
// This is the single source of truth for content that used to live in
// Supabase (site settings, services, projects) — the site has no database or
// admin panel, so this file IS the CMS. Edit it directly and redeploy to
// change content.
// ============================================================================

import type { SiteSettings } from "./site.functions";
import { BLOG_POSTS } from "./blog-data";

// TODO: social_links is still empty — add the real San Diego Google
// Reviews/Yelp/Instagram/Facebook/YouTube URLs once you have them.
export const siteSettings: SiteSettings = {
  business_name: "Best Sub-Zero & Viking Service",
  phone: "+1 (619) 975-4755",
  email: "subzerovikingrepair.pro@gmail.com",
  address: null,
  hours: "Mon–Sat: 8:00 AM – 7:00 PM",
  diagnostic_fee: "$95, waived when the repair is completed",
  social_links: {},
  review_count: null,
  review_rating: 5.0,
  yelp_review_count: null,
  yelp_review_rating: 4.9,
};

type Service = {
  id: string;
  slug: string;
  title: string;
  brands: string[];
  category: string;
  short_description: string;
  description: string;
  image_url: string | null;
  is_published: boolean;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
};

const now = new Date().toISOString();

export const services: Service[] = [
  {
    id: "svc-1",
    slug: "refrigerator-freezer-repair",
    title: "Refrigerator & Freezer Repair",
    brands: ["Sub-Zero", "Viking", "Thermador", "GE Monogram"],
    category: "Refrigeration",
    short_description: "Expert repair for built-in and freestanding refrigerators and freezers.",
    description:
      "We service Sub-Zero, Viking, Thermador and other premium built-in and freestanding refrigerators and freezers. Common issues we resolve include temperature problems, compressor failures, evaporator icing, condenser cleaning, control board faults, door seal replacement and drainage issues.",
    image_url: "/images/services/refrigerator-freezer-repair.webp",
    is_published: true,
    is_featured: true,
    sort_order: 1,
    created_at: now,
  },
  {
    id: "svc-2",
    slug: "wine-cooler-repair",
    title: "Wine Cooler Repair",
    brands: ["Sub-Zero", "Viking", "Thermador"],
    category: "Refrigeration",
    short_description: "Precision service for wine preservation units and dual-zone wine coolers.",
    description:
      "Wine coolers require careful diagnostics to protect your collection. We repair cooling systems, thermostats, dual-zone controls, humidity issues, door seals and lighting on Sub-Zero, Viking and other premium wine preservation units.",
    image_url: "/images/services/wine-cooler-repair.webp",
    is_published: true,
    is_featured: false,
    sort_order: 2,
    created_at: now,
  },
  {
    id: "svc-3",
    slug: "ice-maker-repair",
    title: "Ice Maker Repair",
    brands: [
      "Sub-Zero",
      "Scotsman",
      "Hoshizaki",
      "U-Line",
      "Marvel",
      "KitchenAid",
      "GE Monogram",
      "Viking",
      "Manitowoc",
    ],
    category: "Refrigeration",
    short_description: "Repair for built-in and clear-ice ice makers.",
    description:
      "From dedicated built-in ice makers to in-refrigerator ice systems, we diagnose water inlet valves, ice mold heaters, augers, control modules and clear-ice production issues.",
    image_url: "/images/services/ice-maker-repair.webp",
    is_published: true,
    is_featured: false,
    sort_order: 3,
    created_at: now,
  },
  {
    id: "svc-4",
    slug: "range-stove-repair",
    title: "Range & Stove Repair",
    brands: ["Viking", "Wolf", "Thermador", "Bertazzoni", "Dacor", "Blue Star"],
    category: "Cooking",
    short_description: "Gas and electric range and stove repair for premium brands.",
    description:
      "We repair gas and dual-fuel ranges, sealed burners, ignition modules, safety valves, oven igniters, electric elements and control boards on Viking, Wolf, Thermador, Bertazzoni, Dacor and Blue Star equipment.",
    image_url: "/images/services/range-stove-repair.webp",
    is_published: true,
    is_featured: true,
    sort_order: 4,
    created_at: now,
  },
  {
    id: "svc-5",
    slug: "oven-repair",
    title: "Oven Repair",
    brands: ["Wolf", "Viking", "Thermador", "Bosch", "Blue Star"],
    category: "Cooking",
    short_description: "Wall oven and range oven diagnostics and repair.",
    description:
      "Wall ovens, double ovens, convection and steam ovens — we address heating faults, thermostat calibration, door hinges, glass replacement, control boards and fan systems.",
    image_url: "/images/services/oven-repair.webp",
    is_published: true,
    is_featured: false,
    sort_order: 5,
    created_at: now,
  },
  {
    id: "svc-6",
    slug: "cooktop-repair",
    title: "Cooktop Repair",
    brands: ["Wolf", "Viking", "Thermador", "Bosch", "Blue Star"],
    category: "Cooking",
    short_description: "Gas, induction and electric cooktop repair.",
    description:
      "Cooktop repair for gas, induction and radiant electric surfaces. We handle burner ignition, sealed-burner cleaning and rebuild, induction coil replacement, glass-top replacement and touch controls.",
    image_url: "/images/services/cooktop-repair.webp",
    is_published: true,
    is_featured: false,
    sort_order: 6,
    created_at: now,
  },
  {
    id: "svc-7",
    slug: "range-hood-repair",
    title: "Range Hood & Ventilation Repair",
    brands: ["Wolf", "Viking", "Thermador"],
    category: "Ventilation",
    short_description: "Repair for professional range hoods, blowers and downdraft ventilation.",
    description:
      "We service internal and external blowers, downdraft systems, lighting, dampers and controls on professional-grade range hoods.",
    image_url: "/images/services/range-hood-repair.webp",
    is_published: true,
    is_featured: false,
    sort_order: 7,
    created_at: now,
  },
  {
    id: "svc-8",
    slug: "outdoor-kitchen-bbq-repair",
    title: "Outdoor Kitchen & BBQ Repair",
    brands: ["Wolf", "Viking", "Sub-Zero"],
    category: "Outdoor",
    short_description: "Repair for outdoor grills, outdoor refrigeration and BBQ islands.",
    description:
      "We repair outdoor grills, outdoor refrigeration, warming drawers and outdoor kitchen components — burners, ignition, gas systems and weather-related failures.",
    image_url: "/images/services/outdoor-kitchen-bbq-repair.webp",
    is_published: true,
    is_featured: false,
    sort_order: 8,
    created_at: now,
  },
  {
    id: "svc-9",
    slug: "warming-drawer-repair",
    title: "Warming Drawer & Food Warmer Repair",
    brands: ["Wolf", "Viking", "Thermador"],
    category: "Cooking",
    short_description: "Precise repair for built-in warming drawers.",
    description:
      "Warming drawer heating elements, controls, thermostats and drawer mechanisms serviced on Wolf, Viking and Thermador units.",
    image_url: "/images/services/warming-drawer-repair.webp",
    is_published: true,
    is_featured: false,
    sort_order: 9,
    created_at: now,
  },
  {
    id: "svc-10",
    slug: "microwave-repair",
    title: "Microwave Repair",
    brands: ["Wolf", "Viking", "Thermador", "GE Monogram"],
    category: "Cooking",
    short_description: "Built-in and speed-oven microwave repair.",
    description:
      "We repair built-in microwaves, drawer microwaves, speed ovens and convection microwaves, including magnetrons, high-voltage components, door interlocks and control boards.",
    image_url: "/images/services/microwave-repair.webp",
    is_published: true,
    is_featured: false,
    sort_order: 10,
    created_at: now,
  },
  {
    id: "svc-11",
    slug: "preventive-maintenance",
    title: "Preventive Maintenance & Diagnostics",
    brands: [
      "Sub-Zero",
      "Viking",
      "Wolf",
      "Thermador",
      "Bosch",
      "Dacor",
      "GE Monogram",
      "Bertazzoni",
      "Blue Star",
    ],
    category: "Maintenance",
    short_description: "Scheduled maintenance to extend the life of premium appliances.",
    description:
      "Preventive maintenance for refrigeration and cooking appliances: condenser cleaning, seal inspection, calibration, safety checks and full diagnostics to prevent costly failures.",
    image_url: "/images/services/preventive-maintenance.webp",
    is_published: true,
    is_featured: true,
    sort_order: 11,
    created_at: now,
  },
];

type Project = {
  id: string;
  slug: string;
  title: string;
  description: string;
  brands: string[];
  service_area: string | null;
  image_urls: string[];
  completed_on: string | null;
  is_published: boolean;
  created_at: string;
};

export const projects: Project[] = [
  {
    id: "prj-1",
    slug: "subzero-built-in-refrigerator-repair-la-jolla",
    title: "Sub-Zero Built-In Refrigerator & Freezer Repair",
    description:
      "Diagnostics and repair on a Sub-Zero built-in column refrigerator and freezer in a La Jolla kitchen — restored proper cooling and food storage on both sides.",
    brands: ["Sub-Zero"],
    service_area: "La Jolla",
    image_urls: [
      "/images/projects/subzero-built-in-refrigerator-repair-la-jolla-1.webp",
      "/images/projects/subzero-built-in-refrigerator-repair-la-jolla-2.webp",
      "/images/projects/subzero-built-in-refrigerator-repair-la-jolla-3.webp",
    ],
    completed_on: null,
    is_published: true,
    created_at: now,
  },
  {
    id: "prj-2",
    slug: "subzero-side-by-side-refrigerator-repair-coronado",
    title: "Sub-Zero Side-by-Side Refrigerator Repair",
    description:
      "Full-service repair on a built-in Sub-Zero side-by-side refrigerator in Coronado, keeping both the fridge and freezer sides fully stocked and running.",
    brands: ["Sub-Zero"],
    service_area: "Coronado",
    image_urls: [
      "/images/projects/subzero-side-by-side-refrigerator-repair-coronado-1.webp",
      "/images/projects/subzero-side-by-side-refrigerator-repair-coronado-2.webp",
      "/images/projects/subzero-side-by-side-refrigerator-repair-coronado-3.webp",
    ],
    completed_on: null,
    is_published: true,
    created_at: now,
  },
  {
    id: "prj-3",
    slug: "viking-wine-cooler-repair-del-mar",
    title: "Viking Wine Cooler Repair",
    description:
      "Refrigerant system diagnostics and repair on a built-in Viking wine cooler column in Del Mar, restoring proper temperature control for a wine collection.",
    brands: ["Viking"],
    service_area: "Del Mar",
    image_urls: [
      "/images/projects/viking-wine-cooler-repair-del-mar-1.webp",
      "/images/projects/viking-wine-cooler-repair-del-mar-2.webp",
      "/images/projects/viking-wine-cooler-repair-del-mar-3.webp",
    ],
    completed_on: null,
    is_published: true,
    created_at: now,
  },
  {
    id: "prj-4",
    slug: "viking-range-refrigerator-repair-chula-vista",
    title: "Viking Range & Refrigerator Repair",
    description:
      "Combined service call in Chula Vista: range and oven repair alongside a refrigerator/freezer check, completed in a single visit.",
    brands: ["Viking"],
    service_area: "Chula Vista",
    image_urls: [
      "/images/projects/viking-range-refrigerator-repair-chula-vista-1.webp",
      "/images/projects/viking-range-refrigerator-repair-chula-vista-2.webp",
      "/images/projects/viking-range-refrigerator-repair-chula-vista-3.webp",
      "/images/projects/viking-range-refrigerator-repair-chula-vista-4.webp",
      "/images/projects/viking-range-refrigerator-repair-chula-vista-5.webp",
      "/images/projects/viking-range-refrigerator-repair-chula-vista-6.webp",
    ],
    completed_on: null,
    is_published: true,
    created_at: now,
  },
  {
    id: "prj-5",
    slug: "refrigerator-repair-national-city",
    title: "Built-In Refrigerator Repair",
    description:
      "Refrigerator repair for a National City family kitchen — back up and running for daily use.",
    brands: ["Sub-Zero"],
    service_area: "National City",
    image_urls: [
      "/images/projects/refrigerator-repair-national-city-1.webp",
      "/images/projects/refrigerator-repair-national-city-2.webp",
    ],
    completed_on: null,
    is_published: true,
    created_at: now,
  },
  {
    id: "prj-6",
    slug: "outdoor-kitchen-bbq-grill-repair-carlsbad",
    title: "Outdoor Kitchen BBQ Grill Repair",
    description:
      "Burner, ignition and grate service on a built-in outdoor kitchen grill in Carlsbad, restoring even heat across the cooking surface.",
    brands: ["Viking"],
    service_area: "North County San Diego",
    image_urls: [
      "/images/projects/outdoor-kitchen-bbq-grill-repair-carlsbad-1.webp",
      "/images/projects/outdoor-kitchen-bbq-grill-repair-carlsbad-2.webp",
      "/images/projects/outdoor-kitchen-bbq-grill-repair-carlsbad-3.webp",
    ],
    completed_on: null,
    is_published: true,
    created_at: now,
  },
  {
    id: "prj-7",
    slug: "viking-range-repair-san-diego",
    title: "Viking Range Repair",
    description:
      "Freestanding Viking range repair in a San Diego kitchen — diagnosed and resolved a heating fault and restored full function.",
    brands: ["Viking"],
    service_area: "San Diego",
    image_urls: [
      "/images/projects/viking-range-repair-san-diego-1.webp",
      "/images/projects/viking-range-repair-san-diego-2.webp",
      "/images/projects/viking-range-repair-san-diego-3.webp",
    ],
    completed_on: null,
    is_published: true,
    created_at: now,
  },
];

export type BlogPostRow = {
  id: string;
  slug: string;
  title: string;
  meta_description: string;
  hero_image: string | null;
  paragraphs: string[];
  is_published: boolean;
  source: string;
  published_at: string;
  created_at: string;
};

// Mirrors the old blog_posts table shape. Content itself still lives in
// blog-data.ts (single source of truth) — this just adapts it to the row
// shape the rest of the app (post.$slug.tsx, blog.tsx, sitemap.xml) expects.
export const blogPosts: BlogPostRow[] = BLOG_POSTS.map((p) => ({
  id: p.slug,
  slug: p.slug,
  title: p.title,
  meta_description: p.metaDescription,
  hero_image: p.heroImage,
  paragraphs: p.paragraphs,
  is_published: true,
  source: "manual",
  published_at: p.publishedAt,
  created_at: p.publishedAt,
}));
