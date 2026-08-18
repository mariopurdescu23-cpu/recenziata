"use client";

import { Nfc, QrCode, TrendingUp } from "lucide-react";
import { PageHeader, Panel } from "@/components/dashboard/shell";
import { HourlyBars, InteractionsChart } from "@/components/dashboard/charts";
import { StatCard } from "@/components/dashboard/stat-card";
import { Badge, Counter } from "@/components/ui/primitives";
import { useDemo } from "@/lib/demo-store";
import { scansByHour, scansByPlacement, series30d, totals } from "@/lib/data";
import { formatNumber } from "@/lib/utils";

export default function ScansPage() {
  const { liveScans } = useDemo();
  const spark = series30d.slice(-12).map((d) => d.scanari);

  return (
    <>
      <PageHeader
        title="Scanări"
        subtitle="Fiecare atingere a cardului sau scanare a codului QR, cu context de amplasament."
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          index={0}
          label="Total scanări"
          value={totals.scanari + liveScans}
          delta={totals.scanariDelta}
          icon={QrCode}
          spark={spark}
        />
        <StatCard
          index={1}
          label="Prin NFC"
          value={981}
          delta={21.3}
          icon={Nfc}
          hint="76,4% din total"
        />
        <StatCard
          index={2}
          label="Prin cod QR"
          value={303}
          delta={9.8}
          icon={QrCode}
          hint="23,6% din total"
        />
        <StatCard
          index={3}
          label="Rată de conversie"
          value={14.6}
          decimals={1}
          suffix="%"
          delta={2.4}
          icon={TrendingUp}
          hint="scanare → feedback"
          accent
        />
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-[1.6fr_1fr]">
        <Panel
          title="Evoluția scanărilor"
          description="Ultimele 30 de zile"
          bodyClassName="p-3 sm:p-4"
        >
          <InteractionsChart data={series30d} height={260} />
        </Panel>

        <Panel title="Distribuție pe ore" description="Media zilelor lucrătoare" bodyClassName="p-3 sm:p-4">
          <HourlyBars data={scansByHour} height={260} />
        </Panel>
      </div>

      <div className="mt-4">
        <Panel
          title="Amplasament"
          description="Unde stau cardurile și cât de des sunt folosite"
          bodyClassName="p-0"
        >
          <div className="hidden md:block">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-ivory-300">
                  {["Locație", "Carduri", "Scanări (30 zile)", "Pondere", ""].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-2.5 text-[11.5px] font-medium text-ink-300 first:pl-5 last:pr-5"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {scansByPlacement.map((p) => (
                  <tr
                    key={p.name}
                    className="border-b border-ivory-200 transition-colors last:border-0 hover:bg-ivory-100/70"
                  >
                    <td className="px-4 py-3.5 pl-5 text-[13.5px] text-ink-800">
                      {p.name}
                    </td>
                    <td className="tnum px-4 py-3.5 text-[13px] text-ink-500">
                      {p.cards}
                    </td>
                    <td className="tnum px-4 py-3.5 text-[13px] font-medium text-ink-950">
                      {formatNumber(p.scans)}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="h-1.5 w-32 overflow-hidden rounded-full bg-ivory-200">
                          <div
                            className="h-full rounded-full bg-gold-400"
                            style={{ width: `${p.share}%` }}
                          />
                        </div>
                        <span className="tnum text-[12.5px] text-ink-400">
                          {p.share.toString().replace(".", ",")}%
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 pr-5 text-right">
                      <Badge tone={p.share > 25 ? "positive" : "muted"}>
                        {p.share > 25 ? "performant" : "de optimizat"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="divide-y divide-ivory-200 md:hidden">
            {scansByPlacement.map((p) => (
              <li key={p.name} className="px-4 py-4">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-[13.5px] font-medium text-ink-900">{p.name}</p>
                  <span className="tnum shrink-0 text-[13px] font-medium text-ink-950">
                    {formatNumber(p.scans)}
                  </span>
                </div>
                <div className="mt-2.5 flex items-center gap-3">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ivory-200">
                    <div
                      className="h-full rounded-full bg-gold-400"
                      style={{ width: `${p.share}%` }}
                    />
                  </div>
                  <span className="tnum text-[12px] text-ink-400">
                    {p.share.toString().replace(".", ",")}%
                  </span>
                </div>
                <p className="mt-2 text-[12px] text-ink-300">{p.cards} carduri</p>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="mt-4 rounded-xl border border-ivory-300 bg-white p-5">
        <p className="text-[13px] font-medium text-ink-950">
          Observație despre amplasare
        </p>
        <p className="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-ink-400">
          Cardurile de pe nota de plată au cea mai mică pondere (
          <Counter value={8.7} decimals={1} suffix="%" />
          ), dar cea mai bună rată de conversie în feedback. Merită testat un card
          suplimentar în același loc înainte de a le muta.
        </p>
      </div>
    </>
  );
}
