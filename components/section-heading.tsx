import { cn } from "@/lib/utils";
import { Reveal } from "@/components/reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "center" | "left";
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "mx-auto mb-14 flex max-w-3xl flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left"
      )}
    >
      {eyebrow ? (
        <span className="bg-cta-gradient-soft inline-flex items-center rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-brand-magenta">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="text-balance text-3xl font-extrabold tracking-tight text-navy sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
        {title}
      </h2>
      {subtitle ? <p className="max-w-2xl text-lg text-muted-foreground">{subtitle}</p> : null}
    </Reveal>
  );
}