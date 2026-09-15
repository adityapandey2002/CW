import { cn } from "@/lib/utils";

export function Logo({
  variant = "dark",
  className,
}: {
  variant?: "dark" | "light";
  className?: string;
}) {
  return (
    <a href="#home" className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="bg-cta-gradient flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-md shadow-brand-magenta/25">
        <span className="text-sm font-extrabold tracking-tight">CW</span>
      </span>
      <span className="flex flex-col justify-center leading-none">
        <span
          className={cn(
            "text-lg font-extrabold tracking-tight",
            variant === "dark" ? "text-navy" : "text-white"
          )}
        >
          Consultancy <span className="gradient-text">Wala</span>
        </span>
        <span
          className={cn(
            "mt-1 text-[10px] font-semibold tracking-[0.16em] uppercase",
            variant === "dark" ? "text-muted-foreground" : "text-white/60"
          )}
        >
          Smart Solutions. Stronger Businesses.
        </span>
      </span>
    </a>
  );
}