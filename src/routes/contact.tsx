import { createFileRoute } from "@tanstack/react-router";
import {
  absUrl,
  DEFAULT_OG_IMAGE,
  ORG_ID,
  LOCAL_BUSINESS_ADDRESS,
  LOCAL_BUSINESS_HOURS,
  twitterMeta,
} from "@/lib/seo";
import { useQuery } from "@tanstack/react-query";
import { Phone, Mail, MapPin, CalendarClock, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GuaranteeBadge } from "@/components/site/GuaranteeBadge";
import { ReviewsBar } from "@/components/site/ReviewsBar";
import { getSiteSettings } from "@/lib/site.functions";

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

const BOOKING_URL = "https://api.prosbuddy.com/widget/bookings/san-diego-booking-best-sub-zero";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | Best Sub-Zero & Viking Service San Diego" },
      {
        name: "description",
        content:
          "Call (619) 975-4755 or book online for premium Sub-Zero, Viking and Wolf appliance repair across San Diego, La Jolla, Coronado and North County.",
      },
      { property: "og:title", content: "Contact Best Sub-Zero & Viking Service" },
      { property: "og:description", content: "Get in touch to schedule a diagnostic or repair." },
      { property: "og:url", content: absUrl("/contact") },
      { property: "og:image", content: DEFAULT_OG_IMAGE },
      ...twitterMeta(
        "Contact Best Sub-Zero & Viking Service",
        "Get in touch to schedule a diagnostic or repair.",
      ),
    ],
    links: [{ rel: "canonical", href: absUrl("/contact") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": ORG_ID,
          name: "Best Sub-Zero & Viking Service",
          telephone: "+1-619-975-4755",
          email: "subzerovikingrepair.pro@gmail.com",
          url: absUrl("/"),
          priceRange: "$$",
          address: LOCAL_BUSINESS_ADDRESS,
          openingHoursSpecification: LOCAL_BUSINESS_HOURS,
          areaServed: AREAS,
        }),
      },
    ],
  }),
  loader: ({ context }) =>
    context.queryClient.ensureQueryData({
      queryKey: ["site-settings"],
      queryFn: () => getSiteSettings(),
    }),
  component: Contact,
});

function Contact() {
  const { data: s } = useQuery({ queryKey: ["site-settings"], queryFn: () => getSiteSettings() });
  const phone = s?.phone ?? "+1 (619) 975-4755";
  const digits = phone.replace(/[^+\d]/g, "");

  return (
    <div>
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Contact <span className="text-accent">us</span>
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Call or book online below. Please have your appliance's model number, serial number and
            a brief problem description ready.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:grid-cols-[3fr_2fr] md:px-8">
        <div>
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">Book your service</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Pick a time that works for you — our online scheduler books your diagnostic
                  appointment directly.
                </p>
              </div>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="hidden sm:inline-flex"
              >
                <Button variant="outline" className="gap-2">
                  <CalendarClock className="h-4 w-4" /> Open scheduler
                </Button>
              </a>
            </div>
            <div className="mt-6 overflow-hidden rounded-lg border border-border">
              <iframe
                title="Book a service appointment online"
                src={BOOKING_URL}
                width="100%"
                height="720"
                className="border-0"
                loading="lazy"
              />
            </div>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-3 inline-flex text-sm text-accent hover:underline sm:hidden"
            >
              Open the scheduler in a new tab →
            </a>
            <p className="mt-3 text-xs text-muted-foreground">
              Trouble loading the scheduler above?{" "}
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="text-accent hover:underline"
              >
                Open it in a new tab
              </a>
              .
            </p>
          </div>
        </div>

        <div className="min-w-0 space-y-8">
          <div className="min-w-0">
            <h2 className="text-xs uppercase tracking-[0.2em] text-accent">Direct contact</h2>
            <div className="mt-4 grid gap-4">
              <a href={`tel:${digits}`} className="min-w-0">
                <Button
                  size="lg"
                  className="w-full min-w-0 justify-start gap-3 whitespace-normal text-left"
                >
                  <Phone className="h-4 w-4 flex-shrink-0" /> Call {phone}
                </Button>
              </a>
              {s?.email ? (
                <a href={`mailto:${s.email}`} className="min-w-0">
                  <Button
                    size="lg"
                    variant="ghost"
                    className="w-full min-w-0 justify-start gap-3 whitespace-normal text-left"
                  >
                    <Mail className="h-4 w-4 flex-shrink-0" />
                    <span className="break-all">{s.email}</span>
                  </Button>
                </a>
              ) : null}
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="flex items-center gap-2 text-sm font-semibold">
              <Clock className="h-4 w-4 text-accent" /> Business hours
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">24/7 Live Operator Service</p>
            <h3 className="mt-6 text-sm font-semibold">Diagnostic fee</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {s?.diagnostic_fee ?? "$95, waived when the repair is completed."}
            </p>
            <h3 className="mt-6 text-sm font-semibold">Reviews</h3>
            <ReviewsBar className="mt-2" />
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-accent">Service area</h3>
            <ul className="mt-4 grid grid-cols-2 gap-1 text-sm text-muted-foreground">
              {AREAS.map((a) => (
                <li key={a} className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-accent" aria-hidden /> {a}
                </li>
              ))}
            </ul>
          </div>

          <GuaranteeBadge />
        </div>
      </section>
    </div>
  );
}
