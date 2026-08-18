"use client";

import { motion } from "framer-motion";
import { GripVertical, Plus } from "lucide-react";
import { useState } from "react";
import { PageHeader, Panel } from "@/components/dashboard/shell";
import { PhoneFrame } from "@/components/product/phone-frame";
import { FeedbackFlow } from "@/components/product/feedback-flow";
import { Badge } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const defaultCategories = [
  "Timpul de așteptare",
  "Calitatea",
  "Personalul",
  "Curățenia",
  "Altceva",
];

const flags = [
  { label: "Comentariu liber în pagina de feedback", desc: "Disponibil de la planul Professional", on: true },
  { label: "Redirect automat către Google pentru feedback pozitiv", desc: "Fără pas intermediar", on: true },
  { label: "Insight-uri săptămânale", desc: "Generate luni la 06:00", on: true },
  { label: "Pagină de feedback în engleză", desc: "Detectare automată după limba telefonului", on: false },
  { label: "Mod mentenanță", desc: "Afișează un mesaj neutru pe toate paginile publice", on: false },
];

export default function AdminConfigPage() {
  return (
    <>
      <PageHeader
        title="Configurare"
        subtitle="Setări globale ale platformei, aplicabile tuturor conturilor."
      />

      <div className="grid gap-3 lg:grid-cols-[1.35fr_1fr] lg:items-start">
        <div className="space-y-3">
          <Panel
            title="Categorii implicite de feedback"
            description="Se aplică oricărui cont nou. Clienții le pot personaliza de la planul Professional."
          >
            <ul className="space-y-2">
              {defaultCategories.map((c, i) => (
                <li
                  key={c}
                  className="flex items-center gap-3 rounded-lg border border-ivory-300 bg-white px-3 py-2.5"
                >
                  <GripVertical className="size-4 shrink-0 text-ink-200" strokeWidth={1.8} />
                  <span className="tnum text-[12px] text-ink-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-[13.5px] text-ink-800">{c}</span>
                  <Badge tone="muted">implicit</Badge>
                </li>
              ))}
            </ul>
            <button className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-500 transition-colors hover:text-ink-950">
              <Plus className="size-3.5" strokeWidth={2.2} />
              Adaugă o categorie
            </button>
          </Panel>

          <Panel title="Funcționalități" description="Comutatoare globale">
            <ul className="divide-y divide-ivory-200">
              {flags.map((f) => (
                <FlagRow key={f.label} {...f} />
              ))}
            </ul>
          </Panel>

          <Panel title="Limite pe plan" description="Numărul maxim de carduri active">
            <div className="grid gap-3 sm:grid-cols-4">
              {[
                { plan: "Starter", limit: "3" },
                { plan: "Professional", limit: "15" },
                { plan: "Business", limit: "∞" },
                { plan: "Multi-location", limit: "∞" },
              ].map((l) => (
                <div
                  key={l.plan}
                  className="rounded-xl border border-ivory-300 bg-ivory-50 p-3.5 text-center"
                >
                  <p className="text-[12px] text-ink-300">{l.plan}</p>
                  <p className="tight tnum mt-1.5 text-[22px] font-medium text-ink-950">
                    {l.limit}
                  </p>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <Panel
          title="Previzualizare pagină publică"
          description="Cu setările globale curente"
          bodyClassName="p-5"
        >
          <div className="flex justify-center">
            <PhoneFrame className="w-[196px]">
              <FeedbackFlow compact />
            </PhoneFrame>
          </div>
          <p className="mt-5 text-center text-[12.5px] leading-relaxed text-ink-400">
            Modificările se propagă în maximum 60 de secunde către toate conturile.
          </p>
        </Panel>
      </div>
    </>
  );
}

function FlagRow({ label, desc, on }: { label: string; desc: string; on: boolean }) {
  const [checked, setChecked] = useState(on);
  return (
    <li className="flex items-center justify-between gap-4 py-3.5">
      <div className="min-w-0">
        <p className="text-[13.5px] font-medium text-ink-900">{label}</p>
        <p className="mt-0.5 text-[12.5px] text-ink-400">{desc}</p>
      </div>
      <button
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => setChecked((v) => !v)}
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300",
          checked ? "bg-ink-950" : "bg-ivory-400",
        )}
      >
        <motion.span
          layout
          transition={{ duration: 0.28, ease }}
          className={cn(
            "absolute top-0.5 size-5 rounded-full bg-white shadow-sm",
            checked ? "left-[22px]" : "left-0.5",
          )}
        />
      </button>
    </li>
  );
}
