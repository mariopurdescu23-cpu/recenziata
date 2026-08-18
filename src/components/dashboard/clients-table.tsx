"use client";

import { motion } from "framer-motion";
import { ArrowUpDown, MoreHorizontal, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/primitives";
import { clients, type ClientRow, type ClientStatus } from "@/lib/data";
import { cn, formatNumber, initials } from "@/lib/utils";

const statusTone: Record<ClientStatus, "positive" | "gold" | "negative" | "muted"> = {
  Activ: "positive",
  Trial: "gold",
  Restant: "negative",
  Anulat: "muted",
};

const statusFilters: Array<ClientStatus | "Toate"> = [
  "Toate",
  "Activ",
  "Trial",
  "Restant",
  "Anulat",
];

const planFilters = ["Toate", "Starter", "Professional", "Business", "Multi-location"];

type SortKey = "name" | "mrr" | "scans30d";

export function ClientsTable({
  compact = false,
  limit,
}: {
  compact?: boolean;
  limit?: number;
}) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<ClientStatus | "Toate">("Toate");
  const [plan, setPlan] = useState("Toate");
  const [sort, setSort] = useState<SortKey>("mrr");
  const [asc, setAsc] = useState(false);

  const rows = useMemo(() => {
    const filtered = clients.filter((c) => {
      if (status !== "Toate" && c.status !== status) return false;
      if (plan !== "Toate" && c.plan !== plan) return false;
      if (
        query &&
        !`${c.name} ${c.city} ${c.type}`.toLowerCase().includes(query.toLowerCase())
      )
        return false;
      return true;
    });
    const sorted = [...filtered].sort((a, b) => {
      const va = sort === "name" ? a.name : (a[sort] as number);
      const vb = sort === "name" ? b.name : (b[sort] as number);
      if (typeof va === "string" && typeof vb === "string")
        return asc ? va.localeCompare(vb, "ro") : vb.localeCompare(va, "ro");
      return asc ? (va as number) - (vb as number) : (vb as number) - (va as number);
    });
    return limit ? sorted.slice(0, limit) : sorted;
  }, [query, status, plan, sort, asc, limit]);

  function toggleSort(key: SortKey) {
    if (sort === key) setAsc((v) => !v);
    else {
      setSort(key);
      setAsc(false);
    }
  }

  return (
    <div>
      {!compact && (
        <div className="flex flex-col gap-3 border-b border-ivory-200 p-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="relative xl:w-72">
            <Search
              className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-ink-300"
              strokeWidth={1.9}
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Caută după nume, oraș sau tip…"
              className="h-9 w-full rounded-lg border border-ivory-300 bg-white pr-3 pl-9 text-[13px] text-ink-900 placeholder:text-ink-300 focus:border-ink-200 focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="no-scrollbar mask-fade-x flex gap-1 overflow-x-auto">
              {statusFilters.map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={cn(
                    "shrink-0 rounded-full border px-3 py-1.5 text-[12px] font-medium transition-all",
                    status === s
                      ? "border-ink-950 bg-ink-950 text-ivory-100"
                      : "border-ivory-300 bg-white text-ink-400 hover:border-ink-150 hover:text-ink-700",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>

            <select
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              aria-label="Filtrează după plan"
              className="h-9 rounded-lg border border-ivory-300 bg-white px-3 text-[12.5px] text-ink-600 focus:border-ink-200 focus:outline-none"
            >
              {planFilters.map((p) => (
                <option key={p} value={p}>
                  {p === "Toate" ? "Toate planurile" : p}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {rows.length === 0 ? (
        <div className="px-6 py-14 text-center">
          <p className="text-[14px] font-medium text-ink-800">Niciun client găsit.</p>
          <p className="mt-1.5 text-[13px] text-ink-300">
            Încearcă alt termen de căutare sau resetează filtrele.
          </p>
          <button
            onClick={() => {
              setQuery("");
              setStatus("Toate");
              setPlan("Toate");
            }}
            className="mt-4 text-[13px] font-medium text-ink-600 underline underline-offset-4 hover:text-ink-950"
          >
            Resetează filtrele
          </button>
        </div>
      ) : (
        <>
          <div className="hidden md:block">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-ivory-300">
                  <th className="px-4 py-2.5 pl-5">
                    <SortButton
                      label="Client"
                      active={sort === "name"}
                      onClick={() => toggleSort("name")}
                    />
                  </th>
                  <th className="px-4 py-2.5 text-[11.5px] font-medium text-ink-300">
                    Status
                  </th>
                  <th className="px-4 py-2.5 text-[11.5px] font-medium text-ink-300">
                    Plan
                  </th>
                  <th className="px-4 py-2.5">
                    <SortButton
                      label="Abonament"
                      active={sort === "mrr"}
                      onClick={() => toggleSort("mrr")}
                    />
                  </th>
                  <th className="px-4 py-2.5">
                    <SortButton
                      label="Scanări 30z"
                      active={sort === "scans30d"}
                      onClick={() => toggleSort("scans30d")}
                    />
                  </th>
                  <th className="px-4 py-2.5 text-[11.5px] font-medium text-ink-300">
                    Carduri
                  </th>
                  <th className="px-4 py-2.5 pr-5" />
                </tr>
              </thead>
              <tbody>
                {rows.map((c, i) => (
                  <ClientRowDesktop key={c.id} client={c} index={i} />
                ))}
              </tbody>
            </table>
          </div>

          <ul className="divide-y divide-ivory-200 md:hidden">
            {rows.map((c) => (
              <li key={c.id} className="px-4 py-4">
                <div className="flex items-start gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-ivory-200 text-[11.5px] font-medium text-ink-600">
                    {initials(c.name)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13.5px] font-medium text-ink-950">
                      {c.name}
                    </p>
                    <p className="mt-0.5 text-[12px] text-ink-300">
                      {c.type} · {c.city}
                    </p>
                  </div>
                  <Badge tone={statusTone[c.status]} dot>
                    {c.status}
                  </Badge>
                </div>
                <div className="mt-2.5 pl-12">
                  <div className="flex items-center gap-2">
                    <Badge tone="muted">{c.plan}</Badge>
                    <span className="tnum text-[12.5px] font-medium whitespace-nowrap text-ink-950">
                      {c.mrr === 0 ? "—" : `${c.mrr} lei/lună`}
                    </span>
                  </div>
                  <p className="tnum mt-1.5 text-[11.5px] text-ink-300">
                    {formatNumber(c.scans30d)} scanări · {c.cards} carduri
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

function SortButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 text-[11.5px] font-medium transition-colors",
        active ? "text-ink-800" : "text-ink-300 hover:text-ink-600",
      )}
    >
      {label}
      <ArrowUpDown className="size-3" strokeWidth={2} />
    </button>
  );
}

function ClientRowDesktop({ client: c, index }: { client: ClientRow; index: number }) {
  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.03, 0.3) }}
      className="group border-b border-ivory-200 transition-colors last:border-0 hover:bg-ivory-100/70"
    >
      <td className="px-4 py-3.5 pl-5">
        <div className="flex items-center gap-3">
          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-ivory-200 text-[11px] font-medium text-ink-600">
            {initials(c.name)}
          </span>
          <div className="min-w-0">
            <p className="truncate text-[13.5px] font-medium text-ink-900">{c.name}</p>
            <p className="text-[11.5px] text-ink-300">
              {c.type} · {c.city}
            </p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3.5">
        <Badge tone={statusTone[c.status]} dot>
          {c.status}
        </Badge>
      </td>
      <td className="px-4 py-3.5 text-[13px] text-ink-500">{c.plan}</td>
      <td className="tnum px-4 py-3.5 text-[13px] font-medium text-ink-950">
        {c.mrr === 0 ? "—" : `${c.mrr} lei/lună`}
      </td>
      <td className="tnum px-4 py-3.5 text-[13px] text-ink-500">
        {formatNumber(c.scans30d)}
      </td>
      <td className="tnum px-4 py-3.5 text-[13px] text-ink-500">{c.cards}</td>
      <td className="px-4 py-3.5 pr-5 text-right">
        <button
          aria-label={`Acțiuni pentru ${c.name}`}
          className="rounded-md p-1.5 text-ink-300 opacity-0 transition-all group-hover:opacity-100 hover:bg-ivory-200 hover:text-ink-700"
        >
          <MoreHorizontal className="size-4" strokeWidth={2} />
        </button>
      </td>
    </motion.tr>
  );
}
