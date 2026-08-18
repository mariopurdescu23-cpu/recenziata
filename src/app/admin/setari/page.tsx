"use client";

import { Check, Copy, Plus } from "lucide-react";
import { useState } from "react";
import { PageHeader, Panel } from "@/components/dashboard/shell";
import { Badge } from "@/components/ui/primitives";
import { useToast } from "@/components/ui/toast";
import { cn, initials } from "@/lib/utils";

const team = [
  { name: "Andrei Munteanu", email: "andrei@recenziata.ro", role: "Owner" },
  { name: "Elena Dobre", email: "elena@recenziata.ro", role: "Operațiuni" },
  { name: "Tudor Ilie", email: "tudor@recenziata.ro", role: "Suport" },
];

const keys = [
  { label: "Cheie de producție", value: "rcz_live_8f2a…c41d", created: "12 mar. 2026" },
  { label: "Cheie de test", value: "rcz_test_1b90…7ee2", created: "12 mar. 2026" },
];

export default function AdminSettingsPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const { toast } = useToast();

  function copy(v: string) {
    navigator.clipboard?.writeText(v).catch(() => {});
    setCopied(v);
    toast({ title: "Cheie copiată în clipboard" });
    window.setTimeout(() => setCopied(null), 2000);
  }

  return (
    <>
      <PageHeader title="Setări" subtitle="Cont, echipă și acces la API." />

      <div className="grid gap-3 lg:grid-cols-2">
        <Panel title="Date de facturare">
          <dl className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
            {[
              { k: "Denumire", v: "Recenziata SRL" },
              { k: "CUI", v: "RO 48219307" },
              { k: "Reg. com.", v: "J35/1842/2025" },
              { k: "Sediu", v: "Timișoara, jud. Timiș" },
              { k: "IBAN", v: "RO49 BTRL 0000 0000 1284 9301" },
              { k: "Bancă", v: "Banca Transilvania" },
            ].map((r) => (
              <div key={r.k}>
                <dt className="text-[12px] text-ink-300">{r.k}</dt>
                <dd className="mt-1 text-[13.5px] text-ink-800">{r.v}</dd>
              </div>
            ))}
          </dl>
        </Panel>

        <Panel
          title="Echipă"
          description="Cine are acces la panoul de administrare"
          action={
            <button className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-ivory-300 bg-white px-3 text-[12px] font-medium text-ink-600 transition-colors hover:border-ink-150 hover:text-ink-950">
              <Plus className="size-3" strokeWidth={2.4} />
              Invită
            </button>
          }
          bodyClassName="p-0"
        >
          <ul className="divide-y divide-ivory-200">
            {team.map((m) => (
              <li key={m.email} className="flex items-center gap-3 px-5 py-3.5">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-ink-950 text-[11.5px] font-medium text-ivory-100">
                  {initials(m.name)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13.5px] font-medium text-ink-900">
                    {m.name}
                  </p>
                  <p className="truncate text-[12px] text-ink-300">{m.email}</p>
                </div>
                <Badge tone={m.role === "Owner" ? "gold" : "muted"}>{m.role}</Badge>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="mt-3">
        <Panel
          title="Chei API"
          description="Folosite pentru integrări și webhook-uri (planul Multi-location)"
        >
          <ul className="space-y-2.5">
            {keys.map((k) => (
              <li
                key={k.label}
                className="flex flex-col gap-3 rounded-xl border border-ivory-300 bg-ivory-50 p-3.5 sm:flex-row sm:items-center"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-medium text-ink-900">{k.label}</p>
                  <p className="mt-1 font-mono text-[12.5px] text-ink-400">{k.value}</p>
                </div>
                <span className="text-[12px] text-ink-300">creată {k.created}</span>
                <button
                  onClick={() => copy(k.value)}
                  className={cn(
                    "inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg px-3 text-[12px] font-medium transition-all",
                    copied === k.value
                      ? "bg-positive-50 text-positive-500"
                      : "border border-ivory-300 bg-white text-ink-600 hover:border-ink-150 hover:text-ink-950",
                  )}
                >
                  {copied === k.value ? (
                    <Check className="size-3" strokeWidth={2.6} />
                  ) : (
                    <Copy className="size-3" strokeWidth={2} />
                  )}
                  {copied === k.value ? "Copiat" : "Copiază"}
                </button>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  );
}
