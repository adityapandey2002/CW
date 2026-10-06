import { Quote, Star } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Card } from "@/components/ui/card";
import { TESTIMONIALS } from "@/lib/constants";

export function Testimonials() {
  return (
    <section id="testimonials" className="scroll-mt-20 bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Client Stories"
          title={
            <>
              Brands that trusted us — <span className="gradient-text">and grew.</span>
            </>
          }
          subtitle="Real words from sellers across Amazon, Flipkart and beyond."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 0.08}>
              <Card className="flex h-full flex-col p-7">
                <Quote className="h-8 w-8 text-brand-magenta/25" aria-hidden="true" />
                <div className="mt-4 flex gap-1" aria-label="Rated 5 out of 5 stars">
                  {Array.from({ length: 5 }, (_, star) => (
                    <Star
                      key={star}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-base leading-7 text-navy">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 border-t border-border pt-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-bold text-navy">{testimonial.name}</p>
                      <p className="mt-0.5 text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-surface px-3 py-1 text-xs font-semibold text-brand-magenta">
                      {testimonial.platform}
                    </span>
                  </div>
                </figcaption>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}