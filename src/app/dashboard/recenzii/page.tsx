"use client";

import { motion } from "framer-motion";
import { ExternalLink, MessageSquare, Star, TrendingUp } from "lucide-react";
import { PageHeader, Panel } from "@/components/dashboard/shell";
import { Sparkline } from "@/components/dashboard/charts";
import { Badge, Counter } from "@/components/ui/primitives";
import { business, googleReviews, ratingBreakdown, ratingTrend } from "@/lib/data";
import { cn, formatNumber } from "@/lib/utils";

export default function ReviewsPage() {
  const total = ratingBreakdown.reduce((s, r) => s + r.count, 0);

  return (
    <>
      <PageHeader
        title="Recenzii Google"
        subtitle="Sincronizat cu profilul Google Business al afacerii tale."
        actions={
          <a
            href={business.googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center gap-2 rounded-lg border border-ivory-300 bg-white px-3.5 text-[12.5px] font-medium text-ink-600 transition-colors hover:border-ink-150 hover:text-ink-950"
          >
            <ExternalLink className="size-3.5" strokeWidth={1.9} />
            Deschide pe Google
          </a>
        }
      />

      <div className="grid gap-3 lg:grid-cols-[1fr_1.4fr]">
        {/* Rating */}
        <Panel bodyClassName="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[12.5px] font-medium text-ink-400">Rating mediu</p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="tighter text-[44px] leading-none font-medium text-ink-950">
                  <Counter value={4.7} decimals={1} />
                </span>
                <span className="text-[13px] text-ink-300">/ 5</span>
              </div>
              <div className="mt-2.5 flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className={cn(
                      "size-4",
                      i <= 4 ? "text-gold-400" : "text-gold-400/40",
                    )}
                    fill="currentColor"
                    strokeWidth={0}
                  />
                ))}
              </div>
              <p className="mt-2 text-[12.5px] text-ink-300">
                {formatNumber(total)} recenzii publice
              </p>
            </div>
            <Badge tone="positive" dot>
              +0,4 în 6 luni
            </Badge>
          </div>

          <div className="mt-6 space-y-2">
            {ratingBreakdown.map((r) => (
              <div key={r.stars} className="flex items-center gap-3">
                <span className="tnum w-3 text-[12px] text-ink-400">{r.stars}</span>
                <Star className="size-3 text-gold-400" fill="currentColor" strokeWidth={0} />
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ivory-200">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(r.count / total) * 100}%` }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full bg-gold-400"
                  />
                </div>
                <span className="tnum w-10 text-right text-[12px] text-ink-400">
                  {r.count}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-ivory-200 pt-4">
            <div className="flex items-center justify-between">
              <p className="text-[12.5px] text-ink-400">Evoluția ratingului</p>
              <span className="inline-flex items-center gap-1 text-[12px] font-medium text-positive-500">
                <TrendingUp className="size-3" strokeWidth={2.2} />
                în creștere
              </span>
            </div>
            <Sparkline data={ratingTrend.map((r) => r.value)} height={48} />
            <div className="flex justify-between text-[11px] text-ink-300">
              {ratingTrend.map((r) => (
                <span key={r.month}>{r.month}</span>
              ))}
            </div>
          </div>
        </Panel>

        {/* Lista recenziilor */}
        <Panel
          title="Recenzii recente"
          description="Preluate automat din Google Business Profile"
          bodyClassName="p-0"
        >
          <ul className="divide-y divide-ivory-200">
            {googleReviews.map((r, i) => (
              <motion.li
                key={r.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="px-5 py-4 transition-colors hover:bg-ivory-100/60"
              >
                <div className="flex items-start gap-3">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-ivory-200 text-[11.5px] font-medium text-ink-600">
                    {r.author[0]}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                      <span className="text-[13.5px] font-medium text-ink-900">
                        {r.author}
                      </span>
                      <span className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={cn(
                              "size-3",
                              s <= r.rating ? "text-gold-400" : "text-ink-100",
                            )}
                            fill="currentColor"
                            strokeWidth={0}
                          />
                        ))}
                      </span>
                      <span className="text-[11.5px] text-ink-300">
                        acum {r.daysAgo} {r.daysAgo === 1 ? "zi" : "zile"}
                      </span>
                    </div>
                    <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-500">
                      {r.text}
                    </p>
                    <button className="mt-2.5 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-ink-400 transition-colors hover:text-ink-950">
                      <MessageSquare className="size-3" strokeWidth={1.9} />
                      Răspunde
                    </button>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  );
}
