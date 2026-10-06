import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { SITE } from "@/lib/constants";
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

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: SITE.name,
  title: {
    default: siteTitle,
    template: "%s | Consultancy Wala",
  },
  description:
    "E-commerce growth agency helping brands launch, scale and dominate Amazon, Flipkart, Meesho and beyond. Strategy, PPC, cataloging and operations — all in one place.",
  keywords: [
    "ecommerce consultant",
    "amazon seller",
    "flipkart seller",
    "amazon ppc",
    "ecommerce agency india",
    "marketplace listing",
    "consultancy wala",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteTitle,
    description:
      "E-commerce growth agency helping brands launch, scale and dominate Amazon, Flipkart, Meesho and beyond.",
    url: siteUrl,
    siteName: SITE.name,
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description:
      "E-commerce growth agency helping brands launch, scale and dominate Amazon, Flipkart, Meesho and beyond.",
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-navy">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: SITE.name,
              url: siteUrl,
              email: SITE.email,
              telephone: SITE.phone,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Patna",
                addressRegion: "Bihar",
                postalCode: "800026",
                addressCountry: "IN",
              },
              description:
                "E-commerce growth agency helping brands launch, scale and dominate Amazon, Flipkart, Meesho and beyond.",
            }),
          }}
        />
      </body>
    </html>
  );
}
