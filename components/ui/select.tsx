import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import type { SelectHTMLAttributes } from "react";

export function Select({
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select
        className={cn(
          "h-12 w-full appearance-none rounded-xl border border-border bg-surface px-4 pr-10 text-sm text-navy transition-colors focus:border-brand-magenta/60 focus:outline-none focus:ring-2 focus:ring-brand-magenta/20",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
    </div>
  );
}