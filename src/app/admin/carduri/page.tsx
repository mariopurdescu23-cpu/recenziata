"use client";

import { motion } from "framer-motion";
import { Factory, Package, PackageCheck, Plus, Truck } from "lucide-react";
import { useState } from "react";
import { PageHeader, Panel } from "@/components/dashboard/shell";
import { StatCard } from "@/components/dashboard/stat-card";
import { Badge, ScrollFadeRow } from "@/components/ui/primitives";
import { cardOrders, type CardStatus } from "@/lib/data";
import { cn, formatLei } from "@/lib/utils";

const tone: Record<CardStatus, "positive" | "gold" | "neutral" | "negative"> = {
  Livrat: "positive",
  "În producție": "gold",
  Expediat: "neutral",
  Retur: "negative",
};

const filters: Array<CardStatus | "Toate"> = [
  "Toate",
  "În producție",
  "Expediat",
  "Livrat",
  "Retur",
];

export default function AdminCardsPage() {
  const [filter, setFilter] = useState<CardStatus | "Toate">("Toate");
  const rows = cardOrders.filter((o) => filter === "Toate" || o.status === filter);

  return (
    <>
      <PageHeader
        title="Carduri"
        subtitle="Producție, expediere și stocuri de carduri NFC."
        actions={
          <button className="inline-flex h-9 items-center gap-2 rounded-lg bg-ink-950 px-3.5 text-[12.5px] font-medium text-ivory-100 transition-colors hover:bg-ink-800">
            <Plus className="size-3.5" strokeWidth={2.2} />
            Comandă nouă
          </button>
        }
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard index={0} label="Livrate total" value={391} delta={4.2} icon={PackageCheck} />
        <StatCard index={1} label="În producție" value={24} delta={12.5} icon={Factory} hint="1 comandă activă" />
        <StatCard index={2} label="În tranzit" value={6} delta={-8.3} icon={Truck} hint="1 AWB activ" />
        <StatCard index={3} label="Stoc semifabricate" value={148} delta={2.1} icon={Package} hint="carduri negravate" accent />
      </div>

      <div className="mt-4">
        <Panel bodyClassName="p-0">
          <ScrollFadeRow className="flex gap-1.5 border-b border-ivory-200 p-4">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "shrink-0 rounded-full border px-3 py-1.5 text-[12px] font-medium transition-all",
                  filter === f
                    ? "border-ink-950 bg-ink-950 text-ivory-100"
                    : "border-ivory-300 bg-white text-ink-400 hover:border-ink-150 hover:text-ink-700",
                )}
              >
                {f}
              </button>
            ))}
          </ScrollFadeRow>

          <div className="hidden md:block">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-ivory-300">
                  {["Comandă", "Client", "Cantitate", "Status", "AWB", "Data", "Valoare"].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-4 py-2.5 text-[11.5px] font-medium text-ink-300 first:pl-5 last:pr-5 last:text-right"
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {rows.map((o, i) => (
                  <motion.tr
                    key={o.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.03 }}
                    className="border-b border-ivory-200 transition-colors last:border-0 hover:bg-ivory-100/70"
                  >
                    <td className="px-4 py-3.5 pl-5 font-mono text-[12.5px] text-ink-800">
                      {o.id}
                    </td>
                    <td className="px-4 py-3.5 text-[13.5px] text-ink-900">{o.client}</td>
                    <td className="tnum px-4 py-3.5 text-[13px] text-ink-500">{o.qty}</td>
                    <td className="px-4 py-3.5">
                      <Badge tone={tone[o.status]} dot>
                        {o.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3.5 font-mono text-[12.5px] text-ink-400">
                      {o.awb}
                    </td>
                    <td className="px-4 py-3.5 text-[12.5px] text-ink-400">{o.date}</td>
                    <td className="tnum px-4 py-3.5 pr-5 text-right text-[13px] font-medium text-ink-950">
                      {formatLei(o.total)}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="divide-y divide-ivory-200 md:hidden">
            {rows.map((o) => (
              <li key={o.id} className="px-4 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[13.5px] font-medium text-ink-950">{o.client}</p>
                    <p className="mt-0.5 font-mono text-[11.5px] text-ink-300">{o.id}</p>
                  </div>
                  <Badge tone={tone[o.status]} dot>
                    {o.status}
                  </Badge>
                </div>
                <div className="mt-3 flex items-center gap-4 text-[12.5px]">
                  <span className="text-ink-400">{o.qty} carduri</span>
                  <span className="text-ink-300">{o.date}</span>
                  <span className="tnum ml-auto font-medium text-ink-950">
                    {formatLei(o.total)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  );
}
