import { SearchX } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center bg-surface px-5 pt-36 pb-24 text-center sm:pt-40">
        <span className="bg-cta-gradient-soft inline-flex items-center rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-brand-magenta">
          Error 404
        </span>
        <h1 className="mt-6 text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-navy sm:text-6xl">
          This page took a{" "}
          <span className="gradient-text">wrong turn.</span>
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
          The page you&apos;re looking for has moved, never existed, or is busy growing a
          marketplace store somewhere. Let&apos;s get you back on track.
        </p>
        <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row">
          <ButtonLink href="/">Back to Home</ButtonLink>
          <ButtonLink href="/#contact" variant="outline">
            Contact Us
          </ButtonLink>
        </div>
        <SearchX className="mt-14 h-16 w-16 text-brand-magenta/20" aria-hidden="true" />
      </main>
      <Footer />
    </>
  );
}
