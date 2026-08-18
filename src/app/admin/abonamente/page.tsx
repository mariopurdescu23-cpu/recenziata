"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, BadgeEuro, RefreshCcw, TrendingDown, Users } from "lucide-react";
import { PageHeader, Panel } from "@/components/dashboard/shell";
import { StatCard } from "@/components/dashboard/stat-card";
import { MrrChart } from "@/components/dashboard/charts";
import { Badge } from "@/components/ui/primitives";
import { clients, mrrSeries, planDistribution, plans } from "@/lib/data";
import { formatLei, formatNumber } from "@/lib/utils";

const renewals = [
  { client: "Grand Hotel Severin", plan: "Multi-location", amount: 599, date: "1 sep. 2026" },
  { client: "Maison Noir", plan: "Professional", amount: 249, date: "3 sep. 2026" },
  { client: "Clinica Nova", plan: "Business", amount: 199, date: "5 sep. 2026" },
  { client: "Spa Lumina", plan: "Business", amount: 199, date: "8 sep. 2026" },
  { client: "Casa Verde", plan: "Professional", amount: 99, date: "11 sep. 2026" },
];

export default function AdminSubscriptionsPage() {
  const total = planDistribution.reduce((s, p) => s + p.value, 0);

  return (
    <>
      <PageHeader
        title="Abonamente"
        subtitle="Distribuție pe planuri, reînnoiri și mișcări de venit."
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard index={0} label="MRR total" value={64820} delta={9.4} icon={BadgeEuro} suffix=" lei" accent />
        <StatCard index={1} label="Abonamente active" value={total} delta={6.8} icon={Users} />
        <StatCard index={2} label="Reînnoiri luna viitoare" value={296} delta={5.1} icon={RefreshCcw} hint="programate" />
        <StatCard index={3} label="Churn lunar" value={1.8} decimals={1} suffix="%" delta={-0.4} icon={TrendingDown} />
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-[1.6fr_1fr]">
        <Panel title="MRR pe ultimele 12 luni" bodyClassName="p-3 sm:p-4">
          <MrrChart data={mrrSeries} height={280} />
        </Panel>

        <Panel title="Planuri" description="Număr de abonamente per plan">
          <ul className="space-y-4">
            {planDistribution.map((p) => {
              const planMeta = plans.find(
                (pl) => pl.name.toLowerCase() === p.name.toLowerCase(),
              );
              const pct = (p.value / total) * 100;
              return (
                <li key={p.name}>
                  <div className="flex items-baseline justify-between">
                    <span className="text-[13.5px] font-medium text-ink-900">
                      {p.name}
                    </span>
                    <span className="tnum text-[13px] text-ink-500">
                      {formatNumber(p.value)}
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ivory-200">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full rounded-full"
                      style={{ background: p.color }}
                    />
                  </div>
                  <p className="mt-1.5 text-[11.5px] text-ink-300">
                    {planMeta?.price ? `${planMeta.price} lei/lună` : "preț personalizat"} ·{" "}
                    {pct.toFixed(1).replace(".", ",")}% din total
                  </p>
                </li>
              );
            })}
          </ul>
        </Panel>
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        <Panel title="Reînnoiri programate" description="Următoarele 30 de zile" bodyClassName="p-0">
          <ul className="divide-y divide-ivory-200">
            {renewals.map((r) => (
              <li
                key={r.client}
                className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-ivory-100/60"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13.5px] font-medium text-ink-900">
                    {r.client}
                  </p>
                  <p className="mt-0.5 text-[12px] text-ink-300">
                    {r.plan} · {r.date}
                  </p>
                </div>
                <span className="tnum text-[13px] font-medium text-ink-950">
                  {formatLei(r.amount)}
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Oportunități de upgrade" description="Clienți care depășesc limitele planului">
          <ul className="space-y-3">
            {clients
              .filter((c) => c.plan === "Starter" && c.cards > 2 && c.status === "Activ")
              .map((c) => (
                <li
                  key={c.id}
                  className="flex items-center gap-3 rounded-xl border border-ivory-300 bg-ivory-50 p-3.5"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13.5px] font-medium text-ink-900">
                      {c.name}
                    </p>
                    <p className="mt-0.5 text-[12px] text-ink-400">
                      {c.cards} carduri active pe planul Starter (max. 3)
                    </p>
                  </div>
                  <Badge tone="gold">+50 lei</Badge>
                  <ArrowUpRight className="size-4 shrink-0 text-ink-300" />
                </li>
              ))}
            <li className="rounded-xl border border-dashed border-ivory-400 p-3.5 text-center text-[12.5px] text-ink-300">
              Analiza rulează zilnic la 06:00
            </li>
          </ul>
        </Panel>
      </div>
    </>
  );
}
