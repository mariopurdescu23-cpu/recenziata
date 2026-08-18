"use client";

import { motion } from "framer-motion";
import { CreditCard, Download, Receipt, TriangleAlert, Wallet } from "lucide-react";
import { useState } from "react";
import { PageHeader, Panel } from "@/components/dashboard/shell";
import { StatCard } from "@/components/dashboard/stat-card";
import { Badge } from "@/components/ui/primitives";
import { payments } from "@/lib/data";
import { cn, formatLei } from "@/lib/utils";

const statusTone = {
  Încasat: "positive",
  Eșuat: "negative",
  "În procesare": "gold",
} as const;

const filters = ["Toate", "Încasat", "În procesare", "Eșuat"];

export default function AdminPaymentsPage() {
  const [filter, setFilter] = useState("Toate");
  const rows = payments.filter((p) => filter === "Toate" || p.status === filter);
  const incasat = payments
    .filter((p) => p.status === "Încasat")
    .reduce((s, p) => s + p.amount, 0);

  return (
    <>
      <PageHeader
        title="Plăți"
        subtitle="Facturi, încasări și eșecuri de plată."
        actions={
          <button className="inline-flex h-9 items-center gap-2 rounded-lg border border-ivory-300 bg-white px-3.5 text-[12.5px] font-medium text-ink-600 transition-colors hover:border-ink-150 hover:text-ink-950">
            <Download className="size-3.5" strokeWidth={1.9} />
            Descarcă facturile
          </button>
        }
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard index={0} label="Încasat luna aceasta" value={62410} delta={8.7} icon={Wallet} suffix=" lei" accent />
        <StatCard index={1} label="Facturi emise" value={431} delta={6.2} icon={Receipt} />
        <StatCard index={2} label="Rată de succes" value={98.4} decimals={1} suffix="%" delta={0.6} icon={CreditCard} />
        <StatCard index={3} label="Plăți eșuate" value={7} delta={-22.2} icon={TriangleAlert} hint="reîncercare automată" />
      </div>

      <div className="mt-4">
        <Panel bodyClassName="p-0">
          <div className="flex flex-col gap-3 border-b border-ivory-200 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="no-scrollbar mask-fade-x flex gap-1.5 overflow-x-auto">
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
            </div>
            <p className="text-[12.5px] text-ink-400">
              Total încasat afișat:{" "}
              <span className="tnum font-medium text-ink-950">{formatLei(incasat)}</span>
            </p>
          </div>

          <div className="hidden md:block">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-ivory-300">
                  {["Factură", "Client", "Metodă", "Data", "Status", "Sumă"].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-2.5 text-[11.5px] font-medium text-ink-300 first:pl-5 last:pr-5 last:text-right"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((p, i) => (
                  <motion.tr
                    key={p.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.03 }}
                    className="border-b border-ivory-200 transition-colors last:border-0 hover:bg-ivory-100/70"
                  >
                    <td className="px-4 py-3.5 pl-5 font-mono text-[12.5px] text-ink-800">
                      {p.id}
                    </td>
                    <td className="px-4 py-3.5 text-[13.5px] text-ink-900">{p.client}</td>
                    <td className="px-4 py-3.5 text-[13px] text-ink-500">{p.method}</td>
                    <td className="px-4 py-3.5 text-[12.5px] text-ink-400">{p.date}</td>
                    <td className="px-4 py-3.5">
                      <Badge
                        tone={statusTone[p.status as keyof typeof statusTone]}
                        dot
                      >
                        {p.status}
                      </Badge>
                    </td>
                    <td className="tnum px-4 py-3.5 pr-5 text-right text-[13px] font-medium text-ink-950">
                      {formatLei(p.amount)}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="divide-y divide-ivory-200 md:hidden">
            {rows.map((p) => (
              <li key={p.id} className="px-4 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[13.5px] font-medium text-ink-950">{p.client}</p>
                    <p className="mt-0.5 font-mono text-[11.5px] text-ink-300">{p.id}</p>
                  </div>
                  <Badge tone={statusTone[p.status as keyof typeof statusTone]} dot>
                    {p.status}
                  </Badge>
                </div>
                <div className="mt-3 flex items-center gap-4 text-[12.5px]">
                  <span className="text-ink-400">{p.method}</span>
                  <span className="text-ink-300">{p.date}</span>
                  <span className="tnum ml-auto font-medium text-ink-950">
                    {formatLei(p.amount)}
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
