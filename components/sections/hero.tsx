import { ArrowRight, Sparkles } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/ui/button";
import { SITE, STATS } from "@/lib/constants";

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden scroll-mt-20 bg-surface pt-36 pb-20 sm:pt-44 sm:pb-28"
    >
      <div
        className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_55%_60%_at_50%_35%,black,transparent)]"
        aria-hidden="true"
      />
      <div
        className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-brand-magenta/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-brand-orange/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-5 text-center sm:px-8">
        <Reveal>
          <span className="bg-cta-gradient-soft inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-magenta sm:text-xs">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            India&apos;s E-Commerce Growth Agency
          </span>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="mt-6 max-w-4xl text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-navy sm:text-6xl lg:text-[4.25rem]">
            Your E-Commerce <span className="gradient-text">Growth Partner.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground sm:text-xl sm:leading-9">
            We help brands launch, scale and dominate Amazon, Flipkart, Meesho and
            beyond — strategy, PPC, cataloging and operations handled end-to-end by
            senior strategists who treat your business like their own.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row">
            <ButtonLink
              href={SITE.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
            >
              Book a Free Strategy Call
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="#services" variant="outline" size="lg">
              Explore Services
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal delay={0.32}>
          <div className="mt-16 grid w-full max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border shadow-sm sm:grid-cols-4">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-1 bg-white px-4 py-6"
              >
                <span className="gradient-text text-3xl font-extrabold tracking-tight sm:text-4xl">
                  {stat.value}
                </span>
                <span className="text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:text-xs">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}