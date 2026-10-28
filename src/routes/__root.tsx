import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { CalendarClock } from "lucide-react";

import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Button } from "@/components/ui/button";
import { getSiteSettings } from "@/lib/site.functions";
import {
  absUrl,
  DEFAULT_OG_IMAGE,
  ORG_ID,
  LOCAL_BUSINESS_ADDRESS,
  LOCAL_BUSINESS_HOURS,
} from "@/lib/seo";
import { BOOKING_URL } from "@/lib/booking";

// Toasts (sonner) are only ever triggered by form submissions (lead form,
// admin, auth) — never needed for the initial render of any page. Loading
// it lazily keeps its code out of the shared vendor chunk that every route
// (including the homepage) would otherwise pay to parse/execute upfront.
const Toaster = lazy(() => import("sonner").then((m) => ({ default: m.Toaster })));

export function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Return to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Best Sub-Zero & Viking Service | San Diego Appliance Repair" },
      {
        name: "description",
        content:
          "Premium residential appliance repair in San Diego — Sub-Zero, Viking, Wolf, Thermador, Bosch and Dacor. Honest, transparent, expert service.",
      },
      { name: "author", content: "Best Sub-Zero & Viking Service" },
      { property: "og:site_name", content: "Best Sub-Zero & Viking Service" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      // Site-wide fallback — pages with their own og:title/description/image
      // override these via their own head()'s twitterMeta() call.
      {
        name: "twitter:title",
        content: "Best Sub-Zero & Viking Service | San Diego Appliance Repair",
      },
      {
        name: "twitter:description",
        content:
          "Premium residential appliance repair in San Diego — Sub-Zero, Viking, Wolf, Thermador, Bosch and Dacor.",
      },
      { name: "twitter:image", content: DEFAULT_OG_IMAGE },
      { name: "theme-color", content: "#0f1115" },
      // TODO: this Bing site-verification token is tied to the old NY domain
      // — replace with a new token once the San Diego domain is verified in
      // Bing Webmaster Tools.
      { name: "msvalidate.01", content: "8603B5AEE860A3E9A624B9A128FDD7C7" },
    ],
    links: [
      // Fonts are self-hosted (see styles.css) and preloaded here so they
      // start fetching immediately instead of waiting for the CSS that
      // references them to be discovered.
      {
        rel: "preload",
        href: "/fonts/montserrat-latin.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        href: "/fonts/opensans-latin.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "apple-touch-icon", href: "/favicon-512.png" },
    ],
    scripts: [
      // Google Tag Manager — placed first so it loads as high in <head> as
      // possible, per Google's install instructions. The matching <noscript>
      // fallback lives in RootShell, right after the opening <body> tag.
      {
        children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PKFXGLNV');`,
      },
      // Google Ads tag (AW-990368648) — defines gtag() so the "Click to
      // call" conversion below can fire.
      { src: "https://www.googletagmanager.com/gtag/js?id=AW-990368648", async: true },
      {
        children: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'AW-990368648');`,
      },
      // Google Ads "Click to call (3)" conversion. Fired for every tel: link
      // on the site via one delegated listener, so header/footer/hero/CTA
      // phone buttons are all covered without wiring each one. The timeout
      // fallback makes sure the call still goes through if gtag.js is
      // blocked (ad blockers) and event_callback never runs.
      {
        children: `function gtag_report_conversion(url) {
  var done = false;
  var callback = function () {
    if (done) return;
    done = true;
    if (typeof(url) != 'undefined') {
      window.location = url;
    }
  };
  gtag('event', 'conversion', {
      'send_to': 'AW-990368648/2w9fCJXnnIsdEIinn9gD',
      'value': 1.0,
      'currency': 'USD',
      'event_callback': callback
  });
  setTimeout(callback, 1000);
  return false;
}
document.addEventListener('click', function (e) {
  var a = e.target && e.target.closest && e.target.closest('a[href^="tel:"]');
  if (!a) return;
  e.preventDefault();
  gtag_report_conversion(a.getAttribute('href'));
});`,
      },
      // Microsoft Advertising UET (Universal Event Tracking) — lets
      // Microsoft Advertising see site visits and attribute conversions
      // (calls, form submissions, etc.) back to Bing/Microsoft Ads clicks.
      {
        children: `(function(w,d,t,r,u){
  var f,n,i;
  w[u]=w[u]||[],f=function(){
    var o={ti:"343195501", enableAutoSpaAdTracking:true};
    o.q=w[u],w[u]=new UET(o),w[u].push("pageLoad")
  },
  n=d.createElement(t),n.src=r,n.async=1,n.onload=n.onreadystatechange=function(){
    var s=this.readyState;
    s&&s!=="loaded"&&s!=="complete"||(f(),n.onload=n.onreadystatechange=null)
  },
  i=d.getElementsByTagName(t)[0],
  i.parentNode.insertBefore(n,i)
})(window,document,"script","https://bat.bing.com/bat.js","uetq");`,
      },
      // GoHighLevel (LeadConnector) chat widget — TODO: this widget id is
      // tied to the original NY business's GHL location, so chats started
      // here would currently route to their CRM/inbox, not a San Diego one.
      // Either replace "data-widget-id" with a San Diego GHL location's own
      // widget id, or remove this script entirely (lead capture is already
      // handled by the ProsBuddy booking widget on /contact).
      {
        src: "https://widgets.leadconnectorhq.com/loader.js",
        "data-resources-url": "https://widgets.leadconnectorhq.com/chat-widget/loader.js",
        "data-widget-id": "6931f74fe96b4e66a8694988",
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "@id": ORG_ID,
          name: "Best Sub-Zero & Viking Service",
          url: absUrl("/"),
          logo: absUrl("/images/logo.webp"),
          telephone: "+1-619-975-4755",
          email: "subzerovikingrepair.pro@gmail.com",
          address: LOCAL_BUSINESS_ADDRESS,
          openingHoursSpecification: LOCAL_BUSINESS_HOURS,
          areaServed: [
            "San Diego",
            "La Jolla",
            "Pacific Beach",
            "Coronado",
            "Del Mar",
            "Chula Vista",
            "National City",
            "North County San Diego",
          ],
          sameAs: [],
        }),
      },
    ],
  }),
  // SiteHeader and SiteFooter (rendered on every route below) both read the
  // "site-settings" query for phone/social links. Without prefetching it
  // here, pages that don't already load it themselves (only index/contact
  // did) would render header/footer with no data during SSR and then patch
  // in real data on the client — a server/client HTML mismatch that made
  // React discard and re-render the page on hydration (visible as a flash/
  // layout jump right at the top of the page, between header and hero).
  loader: ({ context }) =>
    context.queryClient.ensureQueryData({
      queryKey: ["site-settings"],
      queryFn: () => getSiteSettings(),
    }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PKFXGLNV"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();
  const mainRef = useRef<HTMLElement>(null);
  // Hidden while the page's top hero/banner block (every page's first
  // <section>) is on screen, so it doesn't duplicate/overlap that section's
  // own CTA — appears once the visitor scrolls past it.
  const [showMobileCta, setShowMobileCta] = useState(false);

  // Standalone ad landing pages ("/lp/...") render outside the normal site
  // chrome — no header nav, no footer, no site-wide sticky CTA bar — so paid
  // traffic lands on a single-focus page with nothing to click but the
  // page's own call-to-action. See src/routes/lp/ for these routes.
  const isLandingPage = router.state.location.pathname.startsWith("/lp/");

  useEffect(() => {
    if (isLandingPage) return;
    // Every page component renders one wrapping <div>, whose own first
    // child is the actual hero/banner <section> — that inner element is
    // the one to observe, not the wrapper (which spans the entire page).
    const pageRoot = mainRef.current?.firstElementChild;
    const hero = pageRoot?.firstElementChild ?? pageRoot;
    if (!hero) {
      setShowMobileCta(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      setShowMobileCta(!entry.isIntersecting);
    });
    observer.observe(hero);
    return () => observer.disconnect();
    // Re-observe whenever the route changes — each page has its own hero element.
  }, [router.state.location.pathname, isLandingPage]);

  if (isLandingPage) {
    return (
      <QueryClientProvider client={queryClient}>
        <main ref={mainRef}>
          <Outlet />
        </main>
        <Suspense fallback={null}>
          <Toaster position="top-right" richColors closeButton />
        </Suspense>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col pb-20 md:pb-0">
        <SiteHeader />
        <main ref={mainRef} className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background p-3 shadow-[0_-4px_16px_rgba(0,0,0,0.1)] transition-transform duration-300 md:hidden ${
          showMobileCta ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <a href={BOOKING_URL}>
          <Button
            size="lg"
            className="w-full gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <CalendarClock className="h-4 w-4" /> Request Service
          </Button>
        </a>
      </div>
      <Suspense fallback={null}>
        <Toaster position="top-right" richColors closeButton />
      </Suspense>
    </QueryClientProvider>
  );
}
