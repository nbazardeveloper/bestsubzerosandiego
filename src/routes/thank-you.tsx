import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { CheckCircle2, Phone } from "lucide-react";
import { absUrl } from "@/lib/seo";
import { Button } from "@/components/ui/button";

// The online scheduler (see lib/booking.ts) redirects here after a booking is
// submitted, so a visit to this page counts as a conversion. Kept out of the
// sitemap and search results.
export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [
      { title: "Thank You | Best Sub-Zero & Viking Service San Diego" },
      { name: "description", content: "Your service request has been received." },
      { name: "robots", content: "noindex, nofollow" },
    ],
    links: [{ rel: "canonical", href: absUrl("/thank-you") }],
  }),
  component: ThankYou,
});

function ThankYou() {
  useEffect(() => {
    const w = window as unknown as { dataLayer?: unknown[] };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ event: "booking_submitted" });
  }, []);

  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center md:px-8 md:py-32">
      <CheckCircle2 className="mx-auto h-14 w-14 text-accent" aria-hidden />
      <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-5xl">
        Thank <span className="text-accent">you!</span>
      </h1>
      <p className="mt-4 text-muted-foreground">
        Your service request has been received. Our team will contact you shortly to confirm your
        appointment.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <a href="tel:+16199754755">
          <Button
            size="lg"
            className="w-full gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <Phone className="h-4 w-4" /> Call (619) 975-4755
          </Button>
        </a>
        <Link to="/">
          <Button size="lg" variant="outline" className="w-full">
            Back to home
          </Button>
        </Link>
      </div>
    </div>
  );
}
