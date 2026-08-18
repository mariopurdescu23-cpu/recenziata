"use client";

import { Download, Plus } from "lucide-react";
import { PageHeader, Panel } from "@/components/dashboard/shell";
import { ClientsTable } from "@/components/dashboard/clients-table";
import { clients } from "@/lib/data";
import { formatLei, formatNumber } from "@/lib/utils";

export default function AdminClientsPage() {
  const activi = clients.filter((c) => c.status === "Activ").length;
  const mrr = clients.reduce((s, c) => s + c.mrr, 0);
  const carduri = clients.reduce((s, c) => s + c.cards, 0);

  return (
    <>
      <PageHeader
        title="Clienți"
        subtitle={`${clients.length} conturi în sistem · ${activi} active`}
        actions={
          <>
            <button className="inline-flex h-9 items-center gap-2 rounded-lg border border-ivory-300 bg-white px-3.5 text-[12.5px] font-medium text-ink-600 transition-colors hover:border-ink-150 hover:text-ink-950">
              <Download className="size-3.5" strokeWidth={1.9} />
              Export
            </button>
            <button className="inline-flex h-9 items-center gap-2 rounded-lg bg-ink-950 px-3.5 text-[12.5px] font-medium text-ivory-100 transition-colors hover:bg-ink-800">
              <Plus className="size-3.5" strokeWidth={2.2} />
              Client nou
            </button>
          </>
        }
      />

      <div className="mb-4 grid grid-cols-3 divide-x divide-ivory-200 rounded-xl border border-ivory-300 bg-white sm:gap-3 sm:divide-x-0 sm:border-0 sm:bg-transparent">
        {[
          { label: "MRR din acest segment", short: "MRR", value: formatLei(mrr) },
          { label: "Carduri asociate", short: "Carduri", value: formatNumber(carduri) },
          {
            label: "Scanări cumulate (30 zile)",
            short: "Scanări 30z",
            value: formatNumber(clients.reduce((s, c) => s + c.scans30d, 0)),
          },
        ].map((s) => (
          <div
            key={s.label}
            className="p-3.5 sm:rounded-xl sm:border sm:border-ivory-300 sm:bg-white sm:p-4"
          >
            <p className="text-[11.5px] text-ink-300 sm:text-[12px]">
              <span className="sm:hidden">{s.short}</span>
              <span className="hidden sm:inline">{s.label}</span>
            </p>
            <p className="tight tnum mt-1.5 text-[17px] font-medium text-ink-950 sm:mt-2 sm:text-[21px]">
              {s.value}
            </p>
          </div>
        ))}
      </div>

      <Panel bodyClassName="p-0">
        <ClientsTable />
      </Panel>
    </>
  );
}
