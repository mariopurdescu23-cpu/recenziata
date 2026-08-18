"use client";

import { ArrowRight, BadgeEuro, CreditCard, MessageSquareQuote, Users } from "lucide-react";
import Link from "next/link";
import { PageHeader, Panel } from "@/components/dashboard/shell";
import { StatCard } from "@/components/dashboard/stat-card";
import { MrrChart, ReasonsDonut } from "@/components/dashboard/charts";
import { ClientsTable } from "@/components/dashboard/clients-table";
import { InsightCard } from "@/components/dashboard/insight-card";
import { Badge } from "@/components/ui/primitives";
import { adminKpi, mrrSeries, planDistribution } from "@/lib/data";
import { formatNumber } from "@/lib/utils";

export default function AdminOverview() {
  const mrrSpark = mrrSeries.slice(-12).map((m) => m.value);

  return (
    <>
      <PageHeader
        title="Overview"
        subtitle="Starea platformei Recenziata — august 2026."
        actions={
          <>
            <span className="inline-flex h-9 items-center rounded-lg border border-ivory-300 bg-white px-3.5 text-[12.5px] text-ink-400">
              Luna curentă
            </span>
            <button className="inline-flex h-9 items-center gap-2 rounded-lg bg-ink-950 px-3.5 text-[12.5px] font-medium text-ivory-100 transition-colors hover:bg-ink-800">
              Raport lunar
            </button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          index={0}
          label="Clienți activi"
          value={adminKpi.clientiActivi}
          delta={adminKpi.clientiActiviDelta}
          icon={Users}
        />
        <StatCard
          index={1}
          label="MRR"
          value={adminKpi.mrr}
          delta={adminKpi.mrrDelta}
          icon={BadgeEuro}
          suffix=" lei"
          spark={mrrSpark}
          accent
        />
        <StatCard
          index={2}
          label="Carduri livrate"
          value={adminKpi.carduriLivrate}
          delta={adminKpi.carduriDelta}
          icon={CreditCard}
        />
        <StatCard
          index={3}
          label="Feedback luna aceasta"
          value={adminKpi.feedbackLuna}
          delta={adminKpi.feedbackDelta}
          icon={MessageSquareQuote}
        />
      </div>

      <div className="mt-4">
        <InsightCard
          title="Trei clienți din planul Starter au depășit limita de carduri în ultimele 14 zile."
          sub="Sunt candidați direcți pentru upgrade la Professional — potențial +297 lei MRR."
          href="/admin/clienti"
          cta="Vezi clienții"
        />
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-[1.7fr_1fr]">
        <Panel
          title="Evoluția MRR"
          description="Ultimele 12 luni, în lei"
          bodyClassName="p-3 sm:p-4"
        >
          <MrrChart data={mrrSeries} height={260} />
        </Panel>

        <Panel title="Distribuție pe planuri" bodyClassName="p-4">
          <ReasonsDonut data={planDistribution} height={180} />
          <ul className="mt-4 space-y-2.5">
            {planDistribution.map((p) => (
              <li key={p.name} className="flex items-center gap-2.5 text-[13px]">
                <span
                  className="size-2.5 shrink-0 rounded-full"
                  style={{ background: p.color }}
                />
                <span className="truncate text-ink-500">{p.name}</span>
                <span className="tnum ml-auto font-medium text-ink-950">
                  {formatNumber(p.value)}
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { label: "Churn lunar", value: "1,8%", tone: "positive" as const, hint: "sub media pieței" },
          { label: "Valoare medie / client", value: "151 lei", tone: "neutral" as const, hint: "+4,2% față de iulie" },
          { label: "Trial → plătit", value: "62%", tone: "gold" as const, hint: "38 din 61 în iulie" },
          { label: "Facturi restante", value: "3", tone: "negative" as const, hint: "597 lei în total" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-ivory-300 bg-white p-4">
            <p className="text-[12px] text-ink-300">{s.label}</p>
            <div className="mt-2 flex items-center justify-between gap-2">
              <p className="tight text-[19px] font-medium text-ink-950">{s.value}</p>
              <Badge tone={s.tone}>{s.hint}</Badge>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <Panel
          title="Clienți recenți"
          description="Cei mai activi din ultimele 30 de zile"
          action={
            <Link
              href="/admin/clienti"
              className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-ink-500 transition-colors hover:text-ink-950"
            >
              Vezi toți clienții
              <ArrowRight className="size-3.5" />
            </Link>
          }
          bodyClassName="p-0"
        >
          <ClientsTable compact limit={6} />
        </Panel>
      </div>
    </>
  );
}
