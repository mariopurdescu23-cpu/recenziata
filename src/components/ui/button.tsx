"use client";

import Link from "next/link";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant =
  | "solid"
  | "ivory"
  | "gold"
  | "outline"
  | "outlineLight"
  | "ghost"
  | "ghostLight";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] select-none disabled:pointer-events-none disabled:opacity-50 active:scale-[0.985]";

const variants: Record<Variant, string> = {
  solid:
    "bg-ink-950 text-ivory-100 shadow-[0_1px_2px_rgba(8,8,10,0.16),0_10px_28px_-12px_rgba(8,8,10,0.5)] hover:bg-ink-800 hover:shadow-[0_2px_4px_rgba(8,8,10,0.16),0_16px_40px_-14px_rgba(8,8,10,0.55)]",
  ivory:
    "bg-ivory-100 text-ink-950 shadow-[0_1px_2px_rgba(0,0,0,0.2),0_10px_30px_-12px_rgba(0,0,0,0.55)] hover:bg-white",
  gold: "bg-gradient-to-b from-gold-200 to-gold-400 text-ink-950 shadow-[0_1px_2px_rgba(8,8,10,0.2),0_10px_24px_-16px_rgba(189,145,71,0.55)] hover:from-gold-100 hover:to-gold-300",
  outline:
    "border border-ink-150 bg-white/70 text-ink-900 hover:border-ink-300 hover:bg-white",
  outlineLight:
    "border border-white/[0.16] bg-white/[0.05] text-ivory-100 hover:border-white/30 hover:bg-white/[0.1]",
  ghost: "text-ink-600 hover:bg-ink-950/[0.05] hover:text-ink-950",
  ghostLight: "text-ink-200 hover:bg-white/8 hover:text-ivory-100",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-5 text-[14px]",
  lg: "h-[52px] px-7 text-[15px]",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  children?: ReactNode;
  sheen?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "solid", size = "md", href, className, children, sheen, ...props },
  ref,
) {
  const classes = cn(base, variants[variant], sizes[size], className);

  const inner = (
    <>
      {sheen && (
        <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
          <span className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-opacity duration-300 group-hover/btn:animate-[rec-sheen_1.1s_ease-out] group-hover/btn:opacity-100" />
        </span>
      )}
      {children}
    </>
  );

  if (href) {
    const external = href.startsWith("http");
    if (external) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {inner}
      </Link>
    );
  }

  return (
    <button ref={ref} className={classes} {...props}>
      {inner}
    </button>
  );
});
