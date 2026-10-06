import { BadgeCheck, Handshake, Rocket, Wallet } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Card } from "@/components/ui/card";
import { SITE } from "@/lib/constants";

const PILLARS = [
  {
    icon: Rocket,
    title: "Founder-Led",
    description:
      "You work directly with our founders and senior strategists — never handed off to junior account managers.",
  },
  {
    icon: Wallet,
    title: "ROI-First",
    description:
      "Every rupee of your budget is mapped to a measurable metric before it is ever spent.",
  },
  {
    icon: Handshake,
    title: "Transparent Pricing",
    description:
      "A fixed monthly retainer plus a performance component for ads. No hidden charges, no surprises.",
  },
  {
    icon: BadgeCheck,
    title: "Zero-to-Scale Ready",
    description:
      "Half our clients started from zero. We right-size every engagement to your stage and budget.",
  },
];

export function About() {
  return (
    <section id="about" className="scroll-mt-20 bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Why Consultancy Wala"
              title={
                <>
                  Smart Solutions. <span className="gradient-text">Stronger Businesses.</span>
                </>
              }
              subtitle="We exist so that small and mid-size sellers can compete like the giants — without giant-agency bloat."
            />
            <Reveal delay={0.1}>
              <div className="space-y-4 text-base leading-7 text-muted-foreground">
                <p>
                  Founded by {SITE.coFounder} in Patna, Consultancy Wala started with a simple
                  belief: every brand deserves enterprise-grade e-commerce support, priced
                  honestly and delivered by people who actually do the work.
                </p>
                <p>
                  Today we manage marketplaces, catalogs and ad budgets for brands selling on
                  Amazon, Flipkart, Meesho and beyond — combining marketplace muscle with the
                  care of a team that answers when you call.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-8 text-lg font-bold text-navy">{SITE.taglineAlt}</p>
            </Reveal>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {PILLARS.map((pillar, index) => (
              <Reveal key={pillar.title} delay={index * 0.08}>
                <Card className="h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/10">
                  <span className="bg-cta-gradient inline-flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-md shadow-brand-magenta/25">
                    <pillar.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-navy">{pillar.title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                    {pillar.description}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}