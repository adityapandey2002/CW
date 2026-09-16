import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { About } from "@/components/sections/about";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";

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
    </>
  );
}