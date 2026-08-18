"use client";

import { Download, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { PageHeader, Panel } from "@/components/dashboard/shell";
import { FeedbackTable } from "@/components/dashboard/feedback-table";
import { Badge } from "@/components/ui/primitives";
import { useDemo } from "@/lib/demo-store";
import { recentFeedback, type FeedbackCategory } from "@/lib/data";
import { cn } from "@/lib/utils";

const sentiments = [
  { id: "toate", label: "Toate" },
  { id: "negativ", label: "Negativ" },
  { id: "pozitiv", label: "Pozitiv" },
] as const;

const categories: Array<FeedbackCategory | "Toate"> = [
  "Toate",
  "Timp de așteptare",
  "Calitate",
  "Personal",
  "Curățenie",
  "Apreciere",
  "Altceva",
];

export default function FeedbackPage() {
  const { liveFeedback } = useDemo();
  const [sentiment, setSentiment] = useState<(typeof sentiments)[number]["id"]>("toate");
  const [category, setCategory] = useState<FeedbackCategory | "Toate">("Toate");
  const [query, setQuery] = useState("");

  const all = useMemo(() => [...liveFeedback, ...recentFeedback], [liveFeedback]);

  const filtered = useMemo(
    () =>
      all.filter((f) => {
        if (sentiment !== "toate" && f.sentiment !== sentiment) return false;
        if (category !== "Toate" && f.category !== category) return false;
        if (query && !f.message.toLowerCase().includes(query.toLowerCase()))
          return false;
        return true;
      }),
    [all, sentiment, category, query],
  );

  const negative = all.filter((f) => f.sentiment === "negativ").length;
  const positive = all.length - negative;

  return (
    <>
      <PageHeader
        title="Feedback"
        subtitle={`${all.length} interacțiuni în ultimele 30 de zile · ${positive} pozitive, ${negative} negative`}
        actions={
          <button className="inline-flex h-9 items-center gap-2 rounded-lg border border-ivory-300 bg-white px-3.5 text-[12.5px] font-medium text-ink-600 transition-colors hover:border-ink-150 hover:text-ink-950">
            <Download className="size-3.5" strokeWidth={1.9} />
            Exportă CSV
          </button>
        }
      />

      <Panel bodyClassName="p-0">
        {/* Filtre */}
        <div className="flex flex-col gap-3 border-b border-ivory-200 p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center rounded-lg border border-ivory-300 bg-ivory-100 p-0.5">
              {sentiments.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSentiment(s.id)}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-[12.5px] font-medium transition-all",
                    sentiment === s.id
                      ? "bg-white text-ink-950 shadow-[0_1px_2px_rgba(8,8,10,0.06)]"
                      : "text-ink-400 hover:text-ink-700",
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <div className="relative">
              <Search
                className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-ink-300"
                strokeWidth={1.9}
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Caută în feedback…"
                className="h-9 w-full rounded-lg border border-ivory-300 bg-white pr-3 pl-9 text-[13px] text-ink-900 placeholder:text-ink-300 focus:border-ink-200 focus:outline-none sm:w-56"
              />
            </div>
          </div>

          <div className="no-scrollbar mask-fade-x -mx-1 flex gap-1.5 overflow-x-auto px-1">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={cn(
                  "shrink-0 rounded-full border px-3 py-1.5 text-[12px] font-medium transition-all",
                  category === c
                    ? "border-ink-950 bg-ink-950 text-ivory-100"
                    : "border-ivory-300 bg-white text-ink-400 hover:border-ink-150 hover:text-ink-700",
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between px-4 py-2.5">
          <p className="text-[12.5px] text-ink-400">
            {filtered.length} rezultate
          </p>
          {(sentiment !== "toate" || category !== "Toate" || query) && (
            <button
              onClick={() => {
                setSentiment("toate");
                setCategory("Toate");
                setQuery("");
              }}
              className="text-[12.5px] font-medium text-ink-500 underline-offset-4 hover:text-ink-950 hover:underline"
            >
              Resetează filtrele
            </button>
          )}
        </div>

        <FeedbackTable
          entries={filtered}
          emptyLabel="Niciun feedback pentru filtrele selectate."
        />
      </Panel>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {[
          { label: "Timp mediu de răspuns", value: "1 h 12 min", tone: "positive" as const },
          { label: "Rezolvate luna aceasta", value: "23 din 31", tone: "neutral" as const },
          { label: "Au continuat către Google", value: "78%", tone: "gold" as const },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-ivory-300 bg-white p-4">
            <p className="text-[12px] text-ink-300">{s.label}</p>
            <div className="mt-2 flex items-center justify-between">
              <p className="tight text-[19px] font-medium text-ink-950">{s.value}</p>
              <Badge tone={s.tone}>30 zile</Badge>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
