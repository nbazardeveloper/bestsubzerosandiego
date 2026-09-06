import { createFileRoute, Link } from "@tanstack/react-router";
import { absUrl, DEFAULT_OG_IMAGE, twitterMeta } from "@/lib/seo";
import { MapPin } from "lucide-react";
import { FinalCta } from "@/components/site/FinalCta";

const AREAS = [
  {
    name: "San Diego",
    blurb:
      "Our home base. We know San Diego neighborhoods and can typically reach customers same day when schedules allow.",
  },
  {
    name: "La Jolla",
    blurb:
      "Regular routes throughout La Jolla, from oceanfront condos to hillside homes with built-in Sub-Zero and Wolf.",
  },
  {
    name: "Pacific Beach",
    blurb:
      "Coverage across Pacific Beach for premium refrigeration, ranges and ovens in single-family and multi-family homes.",
  },
  {
    name: "Coronado",
    blurb: "Frequent service across Coronado's island neighborhoods and beachfront properties.",
  },
  {
    name: "Del Mar",
    blurb: "Regular appointments in Del Mar and surrounding coastal North County communities.",
  },
  {
    name: "Chula Vista",
    blurb:
      "High-rise and single-family service across Chula Vista for premium residential kitchens.",
  },
  {
    name: "National City",
    blurb: "Serving National City homeowners for repair and preventive maintenance.",
  },
  {
    name: "North County San Diego",
    blurb:
      "Broader coverage across North County — Carlsbad, Encinitas and Oceanside — for high-end residential appliances.",
  },
];

export const Route = createFileRoute("/service-area")({
  head: () => ({
    meta: [
      { title: "Service Area | Sub-Zero & Viking Repair in San Diego" },
      {
        name: "description",
        content:
          "We repair premium kitchen appliances across San Diego, La Jolla, Pacific Beach, Coronado, Del Mar, Chula Vista and North County San Diego.",
      },
      { property: "og:title", content: "Service Area" },
      { property: "og:description", content: "Where we repair premium kitchen appliances." },
      { property: "og:url", content: absUrl("/service-area") },
      { property: "og:image", content: DEFAULT_OG_IMAGE },
      ...twitterMeta("Service Area", "Where we repair premium kitchen appliances."),
    ],
    links: [{ rel: "canonical", href: absUrl("/service-area") }],
  }),
  component: ServiceArea,
});

function ServiceArea() {
  return (
    <div>
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Service <span className="text-accent">area</span>
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            We serve homeowners across San Diego and North County. Same-day service depends on
            technician availability — we'll tell you honestly when we can be there.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {AREAS.map((a) => (
            <div key={a.name} className="rounded-lg border border-border bg-card p-6">
              <MapPin className="h-5 w-5 text-accent" aria-hidden />
              <h2 className="mt-4 text-lg font-semibold">{a.name}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{a.blurb}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Where we <span className="text-accent">work</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            Centered on San Diego, radiating out through the service area above.
          </p>
          <div className="mt-8 h-[420px] overflow-hidden rounded-lg border border-border md:h-[640px]">
            <iframe
              title="Map of the San Diego service area"
              src="https://www.google.com/maps?q=San+Diego,+CA&output=embed"
              width="100%"
              height="100%"
              className="border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Not sure if we cover your address?{" "}
            <Link to="/contact" className="text-accent hover:underline">
              Send us a request
            </Link>{" "}
            and we'll confirm.
          </p>
        </div>
      </section>

      <FinalCta />
    </div>
  );
}
