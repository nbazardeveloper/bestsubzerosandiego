import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Phone, CheckCircle2, Award, BadgeCheck, ShieldCheck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ImagePlaceholder } from "@/components/site/ImagePlaceholder";
import { GuaranteeBadge } from "@/components/site/GuaranteeBadge";
import { getSiteSettings } from "@/lib/site.functions";
import { absUrl, twitterMeta } from "@/lib/seo";
import {
  DiagnosticsIcon,
  PricingIcon,
  SameDayIcon,
  WarrantyIcon,
} from "@/components/site/icons/WhyChooseIcons";
import { BOOKING_URL } from "@/lib/booking";

const BRANDS = ["InSinkErator", "Waste King", "Moen", "KitchenAid"];

const ADVANTAGES = [
  {
    icon: Award,
    title: "13+ Years Experience",
    body: "Insured & certified technicians who've seen almost every garbage disposal failure there is — jams, leaks and dead motors.",
  },
  {
    icon: DiagnosticsIcon,
    title: "Accurate Diagnostics",
    body: "We find the real fault before quoting — no guesswork, no unnecessary parts.",
  },
  {
    icon: PricingIcon,
    title: "Transparent Pricing",
    body: "$95 diagnostic fee, waived when you complete the repair with us. No surprise charges.",
  },
  {
    icon: SameDayIcon,
    title: "Same-Day Service",
    body: "Sink backed up? Call early for same-day availability; most repairs done in one visit.",
  },
  {
    icon: WarrantyIcon,
    title: "Warranty on All Work",
    body: "Labor and parts covered by warranty for 90 days to 6 months, depending on the repair.",
  },
  {
    icon: BadgeCheck,
    title: "OEM Parts",
    body: "We use OEM or manufacturer-approved parts whenever available — not generic substitutes.",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Call or request a quote",
    body: "Tell us what's happening — humming, leaking, not turning on — and the disposal's brand if you know it. We'll get you on the schedule.",
  },
  {
    step: "02",
    title: "On-site diagnosis",
    body: "A certified technician inspects the disposal and identifies the actual cause.",
  },
  {
    step: "03",
    title: "Upfront price, no surprises",
    body: "We explain what's wrong and quote the repair before touching a single part.",
  },
  {
    step: "04",
    title: "Repair, same visit",
    body: "Most repairs are completed on the spot using OEM or manufacturer-approved parts.",
  },
];

const SYMPTOM_FIXES = [
  "Hums but won't spin",
  "Won't turn on at all",
  "Jammed or stuck",
  "Leaking under the sink",
  "Sink drains slowly or backs up",
  "Grinding, rattling or loud noises",
];

const PART_FIXES = [
  "Jam clearing and flywheel freeing",
  "Tripped reset switch and wiring",
  "Sink flange and mounting ring leaks",
  "Drain line and dishwasher hose connections",
  "Worn or seized motors",
  "Wall switch and air switch faults",
];

const FAQS = [
  {
    q: "How much is the diagnostic fee?",
    a: "$95, and it's waived when you complete the repair with us — you only pay for the fix.",
  },
  {
    q: "Do you offer same-day repair?",
    a: "Often, yes — same-day service depends on technician availability that day, so call early for the best chance.",
  },
  {
    q: "Do you use original manufacturer parts?",
    a: "We use OEM or manufacturer-approved parts whenever available, not generic substitutes.",
  },
  {
    q: "Is the repair covered by a warranty?",
    a: "Yes. Labor and parts are covered by warranty for 90 days to 6 months, depending on the repair.",
  },
  {
    q: "Which garbage disposal brands do you repair?",
    a: "InSinkErator, Waste King, Moen and KitchenAid. Don't see your brand? Call us and we'll let you know if we can help.",
  },
  {
    q: "My disposal hums but won't spin — what's wrong?",
    a: "Usually something is jammed between the flywheel and the grind ring. Turn off the power and don't put your hand in the unit. Freeing a jam is often a quick fix, but a hum can also mean a seized motor — we'll tell you which on the first visit.",
  },
  {
    q: "Is it worth repairing, or should I replace it?",
    a: "Jams, reset switches, wiring and leaks at the connections are usually worth repairing. If the motor is seized or the housing itself is leaking, repair often isn't economical — we'll tell you upfront before any work begins.",
  },
  {
    q: "Can a bad disposal stop my dishwasher from draining?",
    a: "Yes. Most dishwashers drain through the disposal, so a clog there can leave water in the dishwasher. We repair dishwashers too and can check both in the same visit.",
  },
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
// /services/garbage-disposal-repair (the organic/site-nav version of
// this service), and this page exists to match ad copy, not to rank.
export const Route = createFileRoute("/lp/garbage-disposal-repair")({
  head: () => {
    const title = "Garbage Disposal Repair San Diego | InSinkErator & More | Same-Day";
    const description =
      "Garbage disposal repair in San Diego — jammed, humming, leaking or won't turn on. InSinkErator, Waste King, Moen & KitchenAid. $95 diagnostic, waived on repair.";
    const image = absUrl("/images/services/garbage-disposal-repair-v2.webp");
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: "noindex, follow" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: absUrl("/lp/garbage-disposal-repair") },
        { property: "og:image", content: image },
        ...twitterMeta(title, description, image),
      ],
      links: [{ rel: "canonical", href: absUrl("/lp/garbage-disposal-repair") }],
    };
  },
  component: GarbageDisposalRepairLanding,
});

function GarbageDisposalRepairLanding() {
  const { data: settings } = useQuery({
    queryKey: ["site-settings"],
    queryFn: () => getSiteSettings(),
  });
  const phone = settings?.phone ?? "+1 (619) 975-4755";
  const telHref = `tel:${phone.replace(/[^+\d]/g, "")}`;
  const rating = settings?.review_rating;

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
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

      {/* HERO */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 py-14 md:grid-cols-2 md:px-8 md:py-20">
          <div>
            <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent">
              San Diego · Same-day service available
            </span>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              Garbage Disposal <span className="text-accent">Repair</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Jammed, humming, leaking or dead garbage disposals fixed fast. Upfront pricing, OEM
              parts, and a technician who explains the actual problem — not just a bill.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-3 rounded-lg border border-accent/30 bg-accent/5 px-4 py-3">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-accent/15">
                  <Award className="h-6 w-6 text-accent" aria-hidden />
                </div>
                <div>
                  <p className="text-lg font-bold leading-none text-foreground">13+ Years</p>
                  <p className="mt-1 text-xs text-muted-foreground">of hands-on experience</p>
                </div>
              </div>
              {rating ? (
                <div className="inline-flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-accent/15">
                    <Star className="h-6 w-6 fill-accent text-accent" aria-hidden />
                  </div>
                  <div>
                    <p className="text-lg font-bold leading-none text-foreground">
                      {rating.toFixed(1)}★ Rating
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">from San Diego customers</p>
                  </div>
                </div>
              ) : null}
            </div>

            <ul className="mt-6 space-y-2 text-sm">
              {[
                "Insured & certified technicians",
                "$95 diagnostic fee — waived when we complete the repair",
                "OEM or manufacturer-approved parts",
              ].map((t) => (
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
              <a href={BOOKING_URL}>
                <Button size="lg" variant="outline">
                  Get a Free Quote
                </Button>
              </a>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              No obligation — same-day response, most repairs finished in one visit.
            </p>
          </div>
          <ImagePlaceholder
            aspect="video"
            label="Garbage Disposal Repair"
            src="/images/services/garbage-disposal-repair-v2.webp"
            alt="Garbage disposal repair in San Diego"
            priority
          />
        </div>
      </section>

      {/* TRUST BAND */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-5xl px-4 py-6 md:px-8">
          <div className="flex flex-col items-center justify-center gap-4 text-center sm:flex-row sm:gap-0 sm:divide-x sm:divide-primary-foreground/20">
            {[
              "Insured & Certified",
              "13+ Years Experience",
              "$95 Diagnostic — Waived on Repair",
              "Warranty on All Work",
            ].map((t) => (
              <span
                key={t}
                className="flex items-center gap-2 px-4 py-1 text-xs font-semibold uppercase tracking-wide sm:text-[11px]"
              >
                <ShieldCheck className="h-4 w-4 flex-shrink-0 text-accent" aria-hidden /> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* BRANDS */}
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
        <p className="mx-auto mt-4 max-w-lg text-center text-xs text-muted-foreground">
          Don't see your brand? Call us and we'll let you know if we can help.
        </p>
      </section>

      {/* WHY CHOOSE US */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-5xl px-4 py-14 md:px-8">
          <h2 className="text-center text-2xl font-semibold tracking-tight md:text-3xl">
            Why San Diego homeowners <span className="text-accent">choose us</span>
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ADVANTAGES.map((a) => (
              <div key={a.title} className="rounded-lg border border-border bg-card p-5">
                <a.icon className="h-8 w-8 text-accent" aria-hidden />
                <h3 className="mt-3 text-base font-semibold">{a.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-5xl px-4 py-14 md:px-8">
        <h2 className="text-center text-2xl font-semibold tracking-tight md:text-3xl">
          How it <span className="text-accent">works</span>
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <div key={s.step} className="rounded-lg border border-border bg-card p-6">
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
                Step {s.step}
              </span>
              <h3 className="mt-3 text-base font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT WE FIX */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-5xl px-4 py-14 md:px-8">
          <h2 className="text-center text-2xl font-semibold tracking-tight md:text-3xl">
            What we <span className="text-accent">fix</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-muted-foreground">
            Garbage disposal repair for the most common problems we fix in San Diego homes:
          </p>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Symptoms we fix
              </h3>
              <div className="mt-4 space-y-2">
                {SYMPTOM_FIXES.map((f) => (
                  <div
                    key={f}
                    className="flex items-start gap-2 rounded-lg border border-border bg-card p-3 text-sm"
                  >
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent"
                      aria-hidden
                    />{" "}
                    {f}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Parts we repair & replace
              </h3>
              <div className="mt-4 space-y-2">
                {PART_FIXES.map((f) => (
                  <div
                    key={f}
                    className="flex items-start gap-2 rounded-lg border border-border bg-card p-3 text-sm"
                  >
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent"
                      aria-hidden
                    />{" "}
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GUARANTEE */}
      <section className="mx-auto max-w-5xl px-4 py-14 text-center md:px-8">
        <GuaranteeBadge className="mx-auto" />
      </section>

      {/* FAQ */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-2xl px-4 py-14 md:px-8">
          <h2 className="text-center text-2xl font-semibold tracking-tight md:text-3xl">
            Common <span className="text-accent">questions</span>
          </h2>
          <Accordion type="single" collapsible className="mt-8 w-full">
            {FAQS.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* AREAS */}
      <section className="mx-auto max-w-5xl px-4 py-14 md:px-8">
        <h2 className="text-center text-2xl font-semibold tracking-tight md:text-3xl">
          Areas we <span className="text-accent">cover</span>
        </h2>
        <ul className="mx-auto mt-6 grid max-w-2xl grid-cols-2 gap-2 text-sm sm:grid-cols-4">
          {AREAS.map((a) => (
            <li key={a} className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-accent" aria-hidden /> {a}
            </li>
          ))}
        </ul>
      </section>

      {/* FINAL CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center md:px-8">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Get your disposal <span className="text-accent">working again</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/75">
            Call now for same-day availability, or request a free quote online. $95 diagnostic —
            waived when we complete the repair.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={telHref}>
              <Button size="lg" className="gap-2 bg-white text-primary hover:bg-white/90">
                <Phone className="h-4 w-4" /> Call {phone}
              </Button>
            </a>
            <a href={BOOKING_URL}>
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                Get a Free Quote
              </Button>
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-5xl px-4 py-6 text-center text-xs text-muted-foreground md:px-8">
          © {new Date().getFullYear()} Best Sub-Zero &amp; Viking Service. Independent appliance
          repair service. Not affiliated with the manufacturers of the brands listed above.
        </div>
      </footer>

      {/* Sticky mobile CTA bar — this page has no site-wide sticky CTA
          (that's suppressed for /lp/ routes in __root.tsx), so it brings
          its own with both paths to convert. */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-border bg-background p-3 shadow-[0_-4px_16px_rgba(0,0,0,0.1)] md:hidden">
        <a href={telHref} className="flex-1">
          <Button size="lg" className="w-full gap-2">
            <Phone className="h-4 w-4" /> Call Now
          </Button>
        </a>
        <a href={BOOKING_URL} className="flex-1">
          <Button size="lg" variant="outline" className="w-full">
            Free Quote
          </Button>
        </a>
      </div>
    </div>
  );
}
