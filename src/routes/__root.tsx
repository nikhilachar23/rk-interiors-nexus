import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { WhatsappFab } from "@/components/site/whatsapp-fab";
import { fetchSiteSettings, type SiteSettings } from "@/lib/sanity";

function NotFoundComponent() {
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
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

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
  loader: async ({ context }) => {
    const settings = await context.queryClient.ensureQueryData({
      queryKey: ["siteSettings"],
      queryFn: fetchSiteSettings,
      staleTime: 60_000,
    });
    return { settings } as { settings: SiteSettings | null };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.settings ?? null;
    const siteName = s?.brandName ?? "RK Interiors";
    const title =
      s?.seo?.metaTitle ?? "RK Interiors (Vedu) — Interior Design & Turnkey Construction in Bengaluru";
    const description =
      s?.seo?.metaDescription ??
      "RK Interiors — also known as Interiors by Vedu — designs and builds premium homes, modular kitchens, villas and commercial spaces across Bengaluru. Trusted for work inside Sattva, Prestige, Godrej and Sobha apartments.";
    const ogImage = s?.seo?.ogImageUrl;
    // Editors sometimes paste an entire <script> snippet into the ID field.
    // Extract just the measurement/container ID so we never inject broken JS.
    const gaId = s?.analytics?.googleAnalyticsId?.match(/(G|AW|UA)-[A-Z0-9-]+/i)?.[0];
    const gtmId = s?.analytics?.googleTagManagerId?.match(/GTM-[A-Z0-9]+/i)?.[0];
    const gsv = s?.analytics?.googleSiteVerification?.trim();
    // Only inline JS is safe as script children; reject pasted markup.
    const rawCustomHead = s?.analytics?.customHeadHtml?.trim();
    const customHead = rawCustomHead && !/[<>]/.test(rawCustomHead) ? rawCustomHead : undefined;
    const faviconHref = s?.faviconUrl ?? "/favicon.ico";

    const meta: Array<Record<string, string>> = [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title },
      { name: "description", content: description },
      { name: "author", content: siteName },
      { name: "application-name", content: "RK Interiors" },
      { name: "theme-color", content: "#0b1224" },
      { property: "og:site_name", content: siteName },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ];
    if (gsv) meta.push({ name: "google-site-verification", content: gsv });
    if (s?.seo?.keywords?.length) {
      meta.push({ name: "keywords", content: s.seo.keywords.join(", ") });
    }
    if (ogImage) {
      meta.push({ property: "og:image", content: ogImage });
      meta.push({ name: "twitter:image", content: ogImage });
    }

    const links: Array<Record<string, string>> = [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: faviconHref },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter+Tight:wght@400;500;600;700&display=swap",
      },
    ];

    const scripts: Array<Record<string, unknown>> = [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": "https://www.rkinterio.com/#website",
          name: "RK Interiors",
          alternateName: ["Interiors by Vedu", "RK Interiors Bengaluru", "RK Interio"],
          url: "https://www.rkinterio.com/",
          inLanguage: "en-IN",
          publisher: { "@id": "https://www.rkinterio.com/#business" },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "@id": "https://www.rkinterio.com/#organization",
          name: "RK Interiors",
          legalName: "RK Interiors",
          alternateName: ["Interiors by Vedu", "RK Interiors Bengaluru"],
          url: "https://www.rkinterio.com/",
          logo: ogImage ?? "https://www.rkinterio.com/rk-social.jpg",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HomeAndConstructionBusiness",
          "@id": "https://www.rkinterio.com/#business",
          name: siteName,
          alternateName: ["Interiors by Vedu", "RK Interiors Bengaluru"],
          description,
          image: ogImage ?? "/rk-social.jpg",
          url: "https://www.rkinterio.com/",
          telephone: [s?.primaryPhone ?? "+91-9538772060", s?.secondaryPhone ?? "+91-7892656285"],
          email: s?.email ?? "vedaraj.vedu@gmail.com",
          priceRange: "₹1,499–₹1,999+ / sq ft",
          areaServed: [
            "Bengaluru", "Bangalore", "Whitefield", "Kanakapura Road", "Bannerghatta Road",
            "Marathahalli", "KR Puram Road", "Airport Road", "Devanahalli", "Magadi Road",
            "Tumkur Road", "Mysore Road", "Rajajinagar", "Jayanagar", "Banashankari", "Karnataka",
          ],
          sameAs: [
            s?.instagramUrl ?? "https://www.instagram.com/rkinterior_____",
            s?.facebookUrl ?? "https://www.facebook.com/share/1B7TZHJMbH/",
            "https://wa.me/919538772060",
          ],
          address: {
            "@type": "PostalAddress",
            addressLocality: "Bengaluru",
            addressRegion: "Karnataka",
            addressCountry: "IN",
          },
          founder: { "@type": "Person", name: "Vedu (Vedhachar)" },
        }),
      },
    ];
    if (gtmId) {
      scripts.push({
        children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`,
      });
    }
    if (gaId) {
      scripts.push({
        src: `https://www.googletagmanager.com/gtag/js?id=${gaId}`,
        async: true,
      });
      scripts.push({
        children: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`,
      });
    }
    if (customHead) {
      scripts.push({ children: customHead });
    }

    return { meta, links, scripts };
  },
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
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col marble-surface">
        <SiteNav />
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
        <WhatsappFab />
        <GtmNoScript />
      </div>
    </QueryClientProvider>
  );
}

function GtmNoScript() {
  const { data: settings } = useQuery({
    queryKey: ["siteSettings"],
    queryFn: fetchSiteSettings,
    staleTime: 60_000,
  });
  const gtmId = settings?.analytics?.googleTagManagerId?.trim();
  if (!gtmId) return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="gtm"
      />
    </noscript>
  );
}
