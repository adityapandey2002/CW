"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { FAQS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <section id="faq" className="scroll-mt-20 bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title={
            <>
              Questions? <span className="gradient-text">Answered.</span>
            </>
          }
          subtitle="Everything sellers usually ask us before we start working together."
        />

        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const open = openIndex === index;
            const buttonId = `faq-question-${index}`;
            const answerId = `faq-answer-${index}`;

            return (
              <div
                key={faq.question}
                className={cn(
                  "overflow-hidden rounded-2xl border transition-colors duration-300",
                  open ? "border-brand-magenta/40 bg-white shadow-md" : "border-border bg-white"
                )}
              >
                <h3 className="m-0">
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={open}
                    aria-controls={answerId}
                    onClick={() => setOpenIndex(open ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                  >
                    <span className="text-base font-bold text-navy sm:text-lg">
                      {faq.question}
                    </span>
                    <span
                      className={cn(
                        "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                        open
                          ? "bg-cta-gradient rotate-45 text-white shadow-md shadow-brand-magenta/25"
                          : "bg-surface text-navy"
                      )}
                    >
                      <Plus className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </button>
                </h3>

                {/*
                  The answer stays in the DOM whether open or collapsed. It was
                  previously mounted conditionally, which meant only the first
                  answer appeared in the prerendered HTML and the other four
                  were invisible to search engines. Height 0 + overflow-hidden
                  keeps it visually collapsed while remaining crawlable.
                */}
                <motion.div
                  id={answerId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={false}
                  animate={{
                    height: open ? "auto" : 0,
                    opacity: open || reduce ? 1 : 0,
                  }}
                  transition={{ duration: reduce ? 0 : 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-[15px] leading-7 text-muted-foreground sm:px-6 sm:pb-6">
                    {faq.answer}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}