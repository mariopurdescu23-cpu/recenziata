"use client";

import { motion } from "framer-motion";
import { ArrowRight, Lightbulb, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Glow } from "@/components/ui/glow";

export function InsightCard({
  title = "Timpul de așteptare a generat 38% dintre feedback-urile negative în ultimele 30 de zile.",
  sub = "Este cu 11% mai mult decât luna trecută. Vârful apare între 12:30 și 14:00.",
  href = "/dashboard/feedback",
  cta = "Vezi feedback-ul",
}: {
  title?: string;
  sub?: string;
  href?: string;
  cta?: string;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      aria-labelledby="insight-title"
      className="relative overflow-hidden rounded-xl bg-ink-950 p-5 sm:p-6"
    >
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
      <Glow className="-top-24 -right-16 size-72" opacity={0.55} />
      <div className="hairline-gold absolute inset-x-0 top-0 h-px opacity-60" />

      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2.5">
            <span className="grid size-7 place-items-center rounded-lg bg-gold-400/14 text-gold-300 ring-1 ring-gold-400/22 ring-inset">
              <Lightbulb className="size-3.5" strokeWidth={1.8} />
            </span>
            <span className="eyebrow text-gold-300">Insight-ul săptămânii</span>
          </div>

          <h2
            id="insight-title"
            className="tight mt-4 text-[18px] leading-snug font-medium text-ivory-100 sm:text-[21px]"
          >
            {title}
          </h2>

          <p className="mt-2.5 flex items-start gap-2 text-[13.5px] leading-relaxed text-ink-300">
            <TrendingUp
              className="mt-0.5 size-3.5 shrink-0 text-negative-400"
              strokeWidth={1.9}
            />
            {sub}
          </p>
        </div>

        <Link
          href={href}
          className="group inline-flex h-10 shrink-0 items-center gap-2 self-start rounded-full border border-white/14 bg-white/[0.05] px-4 text-[13px] font-medium text-ivory-100 transition-all duration-300 hover:border-white/28 hover:bg-white/[0.1]"
        >
          {cta}
          <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </motion.section>
  );
}
