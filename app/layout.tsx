import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
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

export const metadata: Metadata = {
  title: {
    default: "Consultancy Wala — Smart Solutions. Stronger Businesses.",
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
  openGraph: {
    title: "Consultancy Wala — Smart Solutions. Stronger Businesses.",
    description:
      "E-commerce growth agency helping brands launch, scale and dominate Amazon, Flipkart, Meesho and beyond.",
    type: "website",
    locale: "en_IN",
    siteName: "Consultancy Wala",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-navy">
        {children}
      </body>
    </html>
  );
}