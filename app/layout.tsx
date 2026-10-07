import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { FAQS, SERVICE_GROUPS, SITE } from "@/lib/constants";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

const siteUrl = SITE.url;
const siteTitle = "Consultancy Wala — Smart Solutions. Stronger Businesses.";
const siteDescription =
  "E-commerce growth agency helping brands launch, scale and dominate Amazon, Flipkart, Meesho and beyond. Strategy, PPC, cataloging and operations — all in one place.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: SITE.name,
  title: {
    default: siteTitle,
    template: "%s | Consultancy Wala",
  },
  description: siteDescription,
  keywords: [
    "ecommerce consultant",
    "amazon seller",
    "flipkart seller",
    "amazon ppc",
    "ecommerce agency india",
    "marketplace listing",
    "consultancy wala",
  ],
  // No `alternates.canonical` here on purpose. Metadata is inherited by nested
  // routes, so a canonical of "/" on the root layout would have pointed
  // /privacy and /terms back at the homepage and de-indexed them as
  // duplicates. Individual routes declare their own canonical instead.
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: SITE.name,
    type: "website",
    locale: "en_IN",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${siteUrl}/#organization`,
  name: SITE.name,
  url: siteUrl,
  email: SITE.email,
  telephone: SITE.phone,
  description: siteDescription,
  slogan: SITE.tagline,
  founder: { "@type": "Person", name: SITE.coFounder },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Kumhrar",
    addressLocality: "Patna",
    addressRegion: "Bihar",
    postalCode: "800026",
    addressCountry: "IN",
  },
  sameAs: [SITE.instagram, SITE.linkedin],
  areaServed: { "@type": "Country", name: "India" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "E-commerce growth services",
    itemListElement: SERVICE_GROUPS.flatMap((group) =>
      group.services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
        },
      }))
    ),
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: SITE.name,
  inLanguage: "en-IN",
  publisher: { "@id": `${siteUrl}/#organization` },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${siteUrl}/#faq`,
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

/**
 * JSON-LD must be serialised with `<` escaped. Without this a value containing
 * `</script>` would terminate the tag early and inject markup.
 * See node_modules/next/dist/docs/01-app/02-guides/json-ld.md
 */
function toJsonLd(schema: object): string {
  return JSON.stringify(schema).replace(/</g, "\\u003c");
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-navy">
        {children}
        {/*
          A native <script> is correct here, not next/script: JSON-LD is data,
          not executable code. Per the Next.js docs the value must have `<`
          escaped, which toJsonLd handles.
        */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: [
              toJsonLd(organizationSchema),
              toJsonLd(websiteSchema),
              toJsonLd(faqSchema),
            ].join("\n"),
          }}
        />
      </body>
    </html>
  );
}