"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Reveal — scroll reveal discret, o singură dată                            */
/* -------------------------------------------------------------------------- */

/** Componentele motion sunt create o singură dată, nu la fiecare render. */
const motionTags = {
  div: motion.div,
  li: motion.li,
  section: motion.section,
  article: motion.article,
  span: motion.span,
} as const;

export function Reveal({
  children,
  delay = 0,
  y = 14,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: keyof typeof motionTags;
}) {
  const MotionTag = motionTags[as] ?? motion.div;
  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px -8% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

/* -------------------------------------------------------------------------- */
/*  Counter — numere care se animă la intrarea în viewport                    */
/* -------------------------------------------------------------------------- */

export function Counter({
  value,
  decimals = 0,
  suffix = "",
  prefix = "",
  duration = 1.1,
  className,
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  // Pornim la 60% din valoare: cifra nu apare niciodată ca „0", ceea ce într-un
  // dashboard citește instant ca „nu am date".
  const from = value * 0.62;
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  const mv = useMotionValue(from);
  const spring = useSpring(mv, { duration: duration * 1000, bounce: 0 });
  const text = useTransform(spring, (latest) =>
    new Intl.NumberFormat("ro-RO", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(latest),
  );
  const [display, setDisplay] = useState(
    new Intl.NumberFormat("ro-RO", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(reduced ? value : from),
  );

  useEffect(() => {
    // La reduced-motion, `display` pornește deja pe valoarea finală —
    // nu mai atingem spring-ul ca să nu declanșeze o animație de numărare.
    if (reduced) return;
    if (inView) mv.set(value);
  }, [inView, mv, value, reduced]);

  useEffect(() => text.on("change", setDisplay), [text]);

  return (
    <span ref={ref} className={cn("tnum", className)}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Badge                                                                     */
/* -------------------------------------------------------------------------- */

type BadgeTone =
  | "neutral"
  | "gold"
  | "goldSolid"
  | "positive"
  | "negative"
  | "muted"
  | "dark"
  | "onDark";

const badgeTones: Record<BadgeTone, string> = {
  neutral: "bg-ink-950/[0.045] text-ink-600 ring-ink-950/[0.06]",
  gold: "bg-gold-400/12 text-gold-600 ring-gold-500/20",
  goldSolid: "bg-gold-300 text-ink-950 ring-gold-200",
  positive: "bg-positive-50 text-positive-500 ring-positive-500/18",
  negative: "bg-negative-50 text-negative-500 ring-negative-500/18",
  muted: "bg-ivory-200 text-ink-400 ring-ink-950/[0.05]",
  dark: "bg-ink-950 text-ivory-100 ring-transparent",
  onDark: "bg-white/[0.07] text-ink-150 ring-white/10",
};

export function Badge({
  children,
  tone = "neutral",
  className,
  dot,
}: {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] leading-none font-medium ring-1 ring-inset",
        badgeTones[tone],
        className,
      )}
    >
      {dot && <span className="size-1.5 rounded-full bg-current opacity-70" />}
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Eyebrow — etichetă de secțiune                                            */
/* -------------------------------------------------------------------------- */

export function Eyebrow({
  children,
  className,
  onDark,
}: {
  children: ReactNode;
  className?: string;
  onDark?: boolean;
}) {
  return (
    <div
      className={cn(
        "eyebrow inline-flex items-center gap-2.5",
        onDark ? "text-gold-300" : "text-gold-600",
        className,
      )}
    >
      <span
        className={cn(
          "h-px w-6",
          onDark ? "bg-gold-300/45" : "bg-gold-500/45",
        )}
      />
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Tooltip                                                                   */
/* -------------------------------------------------------------------------- */

export function Tooltip({
  label,
  children,
  side = "top",
  className,
}: {
  label: string;
  children: ReactNode;
  side?: "top" | "bottom" | "right";
  className?: string;
}) {
  const pos =
    side === "top"
      ? "bottom-full left-1/2 -translate-x-1/2 mb-2"
      : side === "bottom"
        ? "top-full left-1/2 -translate-x-1/2 mt-2"
        : "left-full top-1/2 -translate-y-1/2 ml-2";

  return (
    <span className={cn("group/tt relative inline-flex", className)}>
      {children}
      <span
        role="tooltip"
        className={cn(
          "pointer-events-none absolute z-50 hidden whitespace-nowrap rounded-lg bg-ink-950 px-2.5 py-1.5 text-[11.5px] font-medium text-ivory-100 opacity-0 shadow-lg transition-opacity duration-200 group-hover/tt:opacity-100 md:block",
          pos,
        )}
      >
        {label}
      </span>
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Skeleton                                                                  */
/* -------------------------------------------------------------------------- */

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("skeleton rounded-lg", className)} />;
}

/* -------------------------------------------------------------------------- */
/*  SectionHeading                                                            */
/* -------------------------------------------------------------------------- */

export function SectionHeading({
  eyebrow,
  title,
  description,
  onDark,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  onDark?: boolean;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <Eyebrow
            onDark={onDark}
            className={align === "center" ? "justify-center" : undefined}
          >
            {eyebrow}
          </Eyebrow>
        </Reveal>
      )}
      <Reveal delay={0.06}>
        <h2
          className={cn(
            "tighter mt-5 text-[clamp(1.75rem,4.2vw,2.75rem)] leading-[1.08] font-medium",
            onDark ? "text-ivory-100" : "text-ink-950",
          )}
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.12}>
          <p
            className={cn(
              "mt-4 text-[15.5px] leading-relaxed sm:text-base",
              onDark ? "text-ink-200" : "text-ink-400",
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
