import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Phone, CheckCircle2, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ImagePlaceholder } from "@/components/site/ImagePlaceholder";
import { getSiteSettings } from "@/lib/site.functions";
import { absUrl, twitterMeta } from "@/lib/seo";

const BRANDS = [
  "Whirlpool",
  "Maytag",
  "GE",
  "Kenmore",
  "Bosch",
  "Electrolux",
  "Miele",
  "Asko",
  "Speed Queen",
];

const FIXES = [
  "Washer won't drain or spin",
  "Leaks and door lock/latch failures",
  "Noisy bearings and drum issues",
  "Dryer not heating",
  "Worn drum belts and thermal fuses",
  "Vent and airflow problems",
];

const AREAS = [
  "San Diego",
  "La Jolla",
  "Pacific Beach",
  "Coronado",
  "Del Mar",
  "Chula Vista",
  "National City",
  "North County San Diego",
];

// Standalone ad landing page for paid traffic (Google/Microsoft Ads) — no
// site nav or footer (see __root.tsx's isLandingPage branch), single focus
// on the call/quote CTA. Deliberately noindexed: its content overlaps with
// /services/washing-machine-dryer-repair (the organic/site-nav version of
// this service), and this page exists to match ad copy, not to rank.
export const Route = createFileRoute("/lp/washing-machine-dryer-repair")({
  head: () => {
    const title = "Washing Machine & Dryer Repair San Diego | Same-Day Service";
    const description =
      "13+ years repairing washing machines and dryers in San Diego — Whirlpool, Maytag, GE, Bosch, Electrolux, Miele & more. $95 diagnostic, waived on repair. Call now.";
    const image = absUrl("/images/services/washing-machine-dryer-repair.webp");
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: "noindex, follow" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: absUrl("/lp/washing-machine-dryer-repair") },
        { property: "og:image", content: image },
        ...twitterMeta(title, description, image),
      ],
      links: [{ rel: "canonical", href: absUrl("/lp/washing-machine-dryer-repair") }],
    };
  },
  component: WashingMachineDryerLanding,
});

function WashingMachineDryerLanding() {
  const { data: settings } = useQuery({
    queryKey: ["site-settings"],
    queryFn: () => getSiteSettings(),
  });
  const phone = settings?.phone ?? "+1 (619) 975-4755";
  const telHref = `tel:${phone.replace(/[^+\d]/g, "")}`;
  const rating = settings?.review_rating;

  const trustPoints = [
    "Insured & certified technicians",
    "$95 diagnostic fee — waived when we complete the repair",
    rating ? `${rating.toFixed(1)}★ average rating` : null,
  ].filter((t): t is string => Boolean(t));

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0">
      {/* Slim top bar — logo + click-to-call only, no nav menu. */}
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 md:px-8">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/images/logo.webp"
              alt="Best Sub-Zero & Viking Service"
              className="h-10 w-10 flex-shrink-0 rounded-full object-cover"
            />
            <span className="font-display text-sm font-bold leading-tight sm:text-base">
              Best Sub-Zero &amp; Viking Service
            </span>
          </Link>
          <a href={telHref}>
            <Button size="sm" className="gap-2">
              <Phone className="h-4 w-4" /> {phone}
            </Button>
          </a>
        </div>
      </header>

      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 py-14 md:grid-cols-2 md:px-8 md:py-20">
          <div>
            <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent">
              San Diego · Same-day available
            </span>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              Washing Machine &amp; Dryer <span className="text-accent">Repair</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Fast, honest repair for front-load and top-load washers and gas or electric dryers —
              Whirlpool, Maytag, GE, Bosch, Electrolux, Miele and more.
            </p>
            <div className="mt-6 inline-flex w-fit items-center gap-3 rounded-lg border border-accent/30 bg-accent/5 px-4 py-3">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-accent/15">
                <Award className="h-6 w-6 text-accent" aria-hidden />
              </div>
              <div>
                <p className="text-lg font-bold leading-none text-foreground">13+ Years</p>
                <p className="mt-1 text-xs text-muted-foreground">of hands-on experience</p>
              </div>
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              {trustPoints.map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-accent" aria-hidden /> {t}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={telHref}>
                <Button size="lg" className="gap-2">
                  <Phone className="h-4 w-4" /> Call {phone}
                </Button>
              </a>
              <Link to="/contact">
                <Button size="lg" variant="outline">
                  Get a Free Quote
                </Button>
              </Link>
            </div>
          </div>
          <ImagePlaceholder
            aspect="video"
            label="Washing Machine & Dryer Repair"
            src="/images/services/washing-machine-dryer-repair.webp"
            alt="Bosch washing machine and dryer repair"
            priority
          />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-10 md:px-8">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Brands we service
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {BRANDS.map((b) => (
            <Badge key={b} variant="secondary" className="font-normal">
              {b}
            </Badge>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-5xl px-4 py-14 md:px-8">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            What we <span className="text-accent">fix</span>
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {FIXES.map((f) => (
              <div
                key={f}
                className="flex items-start gap-2 rounded-lg border border-border bg-card p-4 text-sm"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" aria-hidden /> {f}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 md:px-8">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Areas we <span className="text-accent">cover</span>
        </h2>
        <ul className="mt-6 grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
          {AREAS.map((a) => (
            <li key={a} className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-accent" aria-hidden /> {a}
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center md:px-8">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Get your washer or dryer <span className="text-accent">fixed right</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/75">
            Call now or request a free quote. We do not service LG or Samsung laundry appliances.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={telHref}>
              <Button size="lg" className="gap-2 bg-white text-primary hover:bg-white/90">
                <Phone className="h-4 w-4" /> Call {phone}
              </Button>
            </a>
            <Link to="/contact">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                Get a Free Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-5xl px-4 py-6 text-center text-xs text-muted-foreground md:px-8">
          © {new Date().getFullYear()} Best Sub-Zero &amp; Viking Service. Independent appliance
          repair service. Not affiliated with the manufacturers of the brands listed above.
        </div>
      </footer>

      {/* Sticky mobile call bar — this page has no site-wide sticky CTA
          (that's suppressed for /lp/ routes in __root.tsx), so it brings
          its own. */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background p-3 shadow-[0_-4px_16px_rgba(0,0,0,0.1)] md:hidden">
        <a href={telHref}>
          <Button size="lg" className="w-full gap-2">
            <Phone className="h-4 w-4" /> Call {phone}
          </Button>
        </a>
      </div>
    </div>
  );
}
