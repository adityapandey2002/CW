import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { About } from "@/components/sections/about";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { WhatsAppBubble } from "@/components/whatsapp-bubble";

export const metadata: Metadata = {
  // Declared per-route rather than on the root layout, because layout metadata
  // is inherited by /privacy and /terms and would point them back at "/".
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <About />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <WhatsAppBubble />
    </>
  );
}