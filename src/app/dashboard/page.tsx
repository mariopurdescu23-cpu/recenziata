"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  MessageSquareQuote,
  QrCode,
  Sparkles,
  Star,
  ThumbsUp,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { PageHeader, Panel } from "@/components/dashboard/shell";
import { StatCard } from "@/components/dashboard/stat-card";
import { InsightCard } from "@/components/dashboard/insight-card";
import { FeedbackTable } from "@/components/dashboard/feedback-table";
import { InteractionsChart, ReasonsDonut } from "@/components/dashboard/charts";
import { Badge } from "@/components/ui/primitives";
import { useDemo } from "@/lib/demo-store";
import {
  business,
  reasonBreakdown,
  recentFeedback,
  series30d,
  totals,
} from "@/lib/data";
import { cn, formatNumber } from "@/lib/utils";

const ranges = [
  { id: 7, label: "7 zile" },
  { id: 30, label: "30 zile" },
  { id: 90, label: "90 zile" },
];

export default function DashboardOverview() {
  const [range, setRange] = useState(30);
  const { liveFeedback, liveScans } = useDemo();

  const chartData = useMemo(() => {
    if (range === 7) return series30d.slice(-7);
    if (range === 90) return series30d;
    return series30d;
  }, [range]);

  const entries = useMemo(
    () => [...liveFeedback, ...recentFeedback],
    [liveFeedback],
  );

  const sparkScans = series30d.slice(-12).map((d) => d.scanari);
  const sparkFeedback = series30d.slice(-12).map((d) => d.feedback);
  const sparkReviews = series30d.slice(-12).map((d) => d.recenzii);

  return (
    <>
      <PageHeader
        title={`Bun venit, ${business.name}.`}
        subtitle="Iată cum au interacționat clienții tăi în ultimele 30 de zile."
        actions={
          <>
            <div className="flex items-center rounded-lg border border-ivory-300 bg-white p-0.5">
              {ranges.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setRange(r.id)}
                  className={cn(
                    "relative rounded-md px-3 py-1.5 text-[12.5px] font-medium transition-colors",
                    range === r.id ? "text-ink-950" : "text-ink-400 hover:text-ink-700",
                  )}
                >
                  {range === r.id && (
                    <motion.span
                      layoutId="range-pill"
                      className="absolute inset-0 rounded-md bg-ivory-200"
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                  <span className="relative">{r.label}</span>
                </button>
              ))}
            </div>
            <button className="inline-flex h-9 items-center gap-2 rounded-lg border border-ivory-300 bg-white px-3.5 text-[12.5px] font-medium text-ink-600 transition-colors hover:border-ink-150 hover:text-ink-950">
              <Download className="size-3.5" strokeWidth={1.9} />
              Export
            </button>
          </>
        }
      />

      {/* Banner: feedback venit din simulator */}
      {liveFeedback.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4 flex flex-col gap-3 rounded-xl border border-gold-400/35 bg-gold-100/50 p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-start gap-3">
            <span className="relative mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg bg-gold-400/20 text-gold-600">
              <Sparkles className="size-3.5" strokeWidth={1.9} />
            </span>
            <div>
              <p className="text-[13.5px] font-medium text-ink-950">
                {liveFeedback.length === 1
                  ? "Un feedback nou tocmai a intrat."
                  : `${liveFeedback.length} feedback-uri noi tocmai au intrat.`}
              </p>
              <p className="mt-0.5 text-[12.5px] text-ink-500">
                Provine din fluxul pe care l-ai parcurs. Apare mai jos, marcat
                „live”.
              </p>
            </div>
          </div>
          <Link
            href="/dashboard/feedback"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-ink-950 px-4 py-2 text-[12.5px] font-medium text-ivory-100 transition-colors hover:bg-ink-800"
          >
            Vezi feedback-ul
            <ArrowRight className="size-3.5" />
          </Link>
        </motion.div>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          index={0}
          label="Scanări"
          value={totals.scanari + liveScans}
          delta={totals.scanariDelta}
          icon={QrCode}
          spark={sparkScans}
        />
        <StatCard
          index={1}
          label="Feedback"
          value={totals.feedback + liveFeedback.length}
          delta={totals.feedbackDelta}
          icon={MessageSquareQuote}
          spark={sparkFeedback}
        />
        <StatCard
          index={2}
          label="Recenzii Google"
          value={totals.recenzii}
          delta={totals.recenziiDelta}
          icon={Star}
          spark={sparkReviews}
        />
        <StatCard
          index={3}
          label="Rată feedback pozitiv"
          value={totals.ratePozitiv}
          decimals={1}
          suffix="%"
          delta={totals.ratePozitivDelta}
          icon={ThumbsUp}
          accent
        />
      </div>

      <div className="mt-4">
        <InsightCard />
      </div>

      {/* Grafice */}
      <div className="mt-4 grid gap-3 lg:grid-cols-[1.85fr_1fr]">
        <Panel
          title="Interacțiuni în ultimele 30 de zile"
          description="Scanări ale cardului și feedback trimis"
          action={
            <div className="flex items-center gap-4 text-[12px] text-ink-400">
              <span className="inline-flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-gold-500" />
                Scanări
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-ink-500" />
                Feedback
              </span>
            </div>
          }
          bodyClassName="p-3 sm:p-4"
        >
          <InteractionsChart data={chartData} height={280} />
        </Panel>

        <Panel
          title="De ce nu au fost mulțumiți clienții?"
          description="Distribuția motivelor selectate"
          bodyClassName="p-4"
        >
          <ReasonsDonut data={reasonBreakdown} height={180} />
          <ul className="mt-4 space-y-2.5">
            {reasonBreakdown.map((r) => (
              <li key={r.name} className="flex items-center gap-2.5 text-[13px]">
                <span
                  className="size-2.5 shrink-0 rounded-full"
                  style={{ background: r.color }}
                />
                <span className="truncate text-ink-500">{r.name}</span>
                <span className="tnum ml-auto font-medium text-ink-950">
                  {r.value}%
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      {/* Feedback recent */}
      <div className="mt-4">
        <Panel
          title="Feedback recent"
          description="Ultimele interacțiuni ale clienților"
          action={
            <Link
              href="/dashboard/feedback"
              className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-ink-500 transition-colors hover:text-ink-950"
            >
              Vezi tot
              <ArrowRight className="size-3.5" />
            </Link>
          }
          bodyClassName="p-0"
        >
          <FeedbackTable entries={entries} limit={7} />
        </Panel>
      </div>

      {/* Rezumat rapid */}
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {[
          {
            label: "Cel mai activ interval",
            value: "19:00 – 21:00",
            hint: "42% din scanările zilei",
          },
          {
            label: "Cel mai scanat amplasament",
            value: "Mese — salon principal",
            hint: `${formatNumber(612)} scanări în 30 de zile`,
          },
          {
            label: "Conversie în recenzie",
            value: "50,3%",
            hint: "din feedback-urile primite",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-ivory-300 bg-white p-4"
          >
            <p className="text-[12px] text-ink-300">{s.label}</p>
            <p className="tight mt-2 text-[17px] font-medium text-ink-950">
              {s.value}
            </p>
            <div className="mt-2">
              <Badge tone="muted">{s.hint}</Badge>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
