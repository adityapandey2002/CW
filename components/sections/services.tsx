import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SERVICE_GROUPS } from "@/lib/constants";

export function Services() {
  return (
    <section id="services" className="scroll-mt-20 bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Our Services"
          title={
            <>
              Everything your store needs to <span className="gradient-text">win online.</span>
            </>
          }
          subtitle="From your first listing to full-funnel advertising and beyond — one team, zero guesswork."
        />

        <div className="space-y-20">
          {SERVICE_GROUPS.map((group) => (
            <div key={group.title}>
              <Reveal>
                <div className="mb-8 max-w-2xl">
                  <h3 className="text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
                    {group.title}
                  </h3>
                  <p className="mt-2 text-base text-muted-foreground">{group.subtitle}</p>
                </div>
              </Reveal>
              <div className="grid gap-5 md:grid-cols-2">
                {group.services.map((service, index) => (
                  <Reveal key={service.title} delay={index * 0.06}>
                    <Card className="group h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/10 sm:p-7">
                      <div className="flex items-start gap-4">
                        <span className="bg-cta-gradient inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white shadow-md shadow-brand-magenta/25 transition-transform duration-300 group-hover:scale-110">
                          <service.icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <div>
                          <h4 className="text-lg font-bold text-navy">{service.title}</h4>
                          <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Reveal className="mt-20 flex justify-center" delay={0.1}>
          <ButtonLink href="#contact" size="lg">
            Not sure where to start? Get a free audit
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}