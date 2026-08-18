import type { ReactNode } from "react";
import { Eyebrow, Reveal } from "@/components/ui/primitives";
import { Glow } from "@/components/ui/glow";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-ink-950 pt-32 pb-16 sm:pt-40 sm:pb-20">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
      <Glow className="-top-48 left-1/2 h-[32rem] w-[60rem] -translate-x-1/2" opacity={0.6} />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow onDark>{eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="tighter mt-6 text-[clamp(2.2rem,6vw,3.75rem)] leading-[1.02] font-medium text-ivory-100">
              {title}
            </h1>
          </Reveal>
          {description && (
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-ink-200 sm:text-[17px]">
                {description}
              </p>
            </Reveal>
          )}
          {children && <Reveal delay={0.18}>{children}</Reveal>}
        </div>
      </div>
    </section>
  );
}
