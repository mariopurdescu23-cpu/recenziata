"use client";

import { MessageSquareQuote, Star, ThumbsUp, TrendingUp } from "lucide-react";
import { PageHeader, Panel } from "@/components/dashboard/shell";
import { StatCard } from "@/components/dashboard/stat-card";
import { InteractionsChart, ReasonsDonut } from "@/components/dashboard/charts";
import { FeedbackTable } from "@/components/dashboard/feedback-table";
import { Badge } from "@/components/ui/primitives";
import { useDemo } from "@/lib/demo-store";
import { reasonBreakdown, recentFeedback, series30d } from "@/lib/data";
import { formatNumber } from "@/lib/utils";

const networkSeries = series30d.map((d) => ({
  label: d.label,
  scanari: d.scanari * 27,
  feedback: d.feedback * 27,
}));

const topClients = [
  { name: "Grand Hotel Severin", feedback: 842, negative: 18.2 },
  { name: "Maison Noir", feedback: 187, negative: 21.4 },
  { name: "Clinica Nova", feedback: 164, negative: 12.8 },
  { name: "Trattoria Sole", feedback: 141, negative: 26.9 },
  { name: "Spa Lumina", feedback: 98, negative: 9.2 },
];

export default function AdminFeedbackPage() {
  const { liveFeedback } = useDemo();

  return (
    <>
      <PageHeader
        title="Feedback pe platformă"
        subtitle="Agregat pe toate conturile active — august 2026."
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard index={0} label="Feedback luna aceasta" value={5284} delta={14.9} icon={MessageSquareQuote} />
        <StatCard index={1} label="Rată feedback pozitiv" value={76.2} decimals={1} suffix="%" delta={1.8} icon={ThumbsUp} accent />
        <StatCard index={2} label="Recenzii generate" value={2617} delta={19.4} icon={Star} />
        <StatCard index={3} label="Conversie scanare → feedback" value={13.9} decimals={1} suffix="%" delta={0.7} icon={TrendingUp} />
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-[1.7fr_1fr]">
        <Panel
          title="Interacțiuni pe întreaga rețea"
          description="Scanări și feedback, ultimele 30 de zile"
          bodyClassName="p-3 sm:p-4"
        >
          <InteractionsChart data={networkSeries} height={270} />
        </Panel>

        <Panel title="Motive de nemulțumire" description="Media pe toate conturile" bodyClassName="p-4">
          <ReasonsDonut data={reasonBreakdown} height={180} />
          <ul className="mt-4 space-y-2.5">
            {reasonBreakdown.map((r) => (
              <li key={r.name} className="flex items-center gap-2.5 text-[13px]">
                <span
                  className="size-2.5 shrink-0 rounded-full"
                  style={{ background: r.color }}
                />
                <span className="truncate text-ink-500">{r.name}</span>
                <span className="tnum ml-auto font-medium text-ink-950">{r.value}%</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_1.4fr]">
        <Panel title="Conturi cu cel mai mult feedback" bodyClassName="p-0">
          <ul className="divide-y divide-ivory-200">
            {topClients.map((c) => (
              <li
                key={c.name}
                className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-ivory-100/60"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13.5px] font-medium text-ink-900">
                    {c.name}
                  </p>
                  <p className="mt-0.5 text-[12px] text-ink-300">
                    {formatNumber(c.feedback)} feedback-uri
                  </p>
                </div>
                <Badge tone={c.negative > 22 ? "negative" : "muted"}>
                  {c.negative.toString().replace(".", ",")}% negativ
                </Badge>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel
          title="Flux live"
          description="Ultimele interacțiuni din rețea"
          bodyClassName="p-0"
        >
          <FeedbackTable entries={[...liveFeedback, ...recentFeedback]} limit={6} />
        </Panel>
      </div>
    </>
  );
}
