"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Counter } from "@/components/ui/primitives";
import { Sparkline } from "@/components/dashboard/charts";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  decimals = 0,
  suffix,
  delta,
  icon: Icon,
  spark,
  hint,
  index = 0,
  accent,
}: {
  label: string;
  value: number;
  decimals?: number;
  suffix?: string;
  delta?: number;
  icon: LucideIcon;
  spark?: number[];
  hint?: string;
  index?: number;
  accent?: boolean;
}) {
  const positive = (delta ?? 0) >= 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative overflow-hidden rounded-xl border bg-white p-4 transition-all duration-400 hover:-translate-y-0.5 sm:p-5",
        accent
          ? "border-gold-400/28 shadow-[0_1px_2px_rgba(8,8,10,0.04),0_18px_44px_-26px_rgba(189,145,71,0.5)]"
          : "border-ivory-300 shadow-[0_1px_2px_rgba(8,8,10,0.035)] hover:border-ivory-400 hover:shadow-[0_2px_4px_rgba(8,8,10,0.03),0_18px_40px_-24px_rgba(8,8,10,0.22)]",
      )}
    >
      <div
        aria-hidden
        className="hairline-gold absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-70"
      />

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[12.5px] font-medium text-ink-400">{label}</p>
          <p className="tight mt-2 text-[26px] leading-none font-medium text-ink-950 sm:text-[30px]">
            <Counter value={value} decimals={decimals} />
            {suffix}
          </p>
        </div>
        <span
          className={cn(
            "grid size-9 shrink-0 place-items-center rounded-lg transition-colors",
            accent
              ? "bg-gold-400/12 text-gold-600"
              : "bg-ivory-200 text-ink-400 group-hover:bg-ivory-300",
          )}
        >
          <Icon className="size-4" strokeWidth={1.7} />
        </span>
      </div>

      <div className="mt-3.5 flex items-end justify-between gap-3">
        <div className="flex items-center gap-2">
          {delta !== undefined && (
            <span
              className={cn(
                "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[11.5px] font-medium",
                positive
                  ? "bg-positive-50 text-positive-500"
                  : "bg-negative-50 text-negative-500",
              )}
            >
              {positive ? (
                <ArrowUpRight className="size-3" strokeWidth={2.2} />
              ) : (
                <ArrowDownRight className="size-3" strokeWidth={2.2} />
              )}
              {new Intl.NumberFormat("ro-RO", {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              }).format(Math.abs(delta))}
              %
            </span>
          )}
          <span className="hidden text-[11.5px] text-ink-300 sm:inline">{hint ?? "vs. luna trecută"}</span>
        </div>

        {spark && (
          <div className="hidden w-20 shrink-0 opacity-70 transition-opacity group-hover:opacity-100 sm:block">
            <Sparkline data={spark} height={32} color={accent ? "#bd9147" : "#a8a8b2"} />
          </div>
        )}
      </div>
    </motion.article>
  );
}
