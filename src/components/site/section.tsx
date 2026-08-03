import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { Reveal } from "@/components/site/reveal";

export function Section({
  children,
  className,
  tone = "marble",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: "marble" | "navy" | "plain";
  id?: string;
}) {
  const toneCls =
    tone === "navy"
      ? "navy-surface text-marble"
      : tone === "marble"
        ? "marble-surface text-ink"
        : "";
  return (
    <section id={id} className={cn("py-20 lg:py-28", toneCls, className)}>
      <Reveal className="mx-auto max-w-7xl px-5 lg:px-8">{children}</Reveal>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-8 bg-gradient-gold" />
      <span className="eyebrow text-gold-gradient">{children}</span>
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  center,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  center?: boolean;
}) {
  return (
    <div className={cn("max-w-3xl", center && "mx-auto text-center")}>
      {eyebrow ? (
        <div className={cn(center && "justify-center", "flex")}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
      ) : null}
      <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl lg:text-6xl">
        {title}
      </h2>
      {lead ? <p className="mt-5 text-base text-muted-foreground md:text-lg">{lead}</p> : null}
    </div>
  );
}