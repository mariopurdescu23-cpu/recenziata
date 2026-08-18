"use client";

import { Check, Copy, Download, Nfc, Plus, QrCode } from "lucide-react";
import { useState } from "react";
import { PageHeader, Panel } from "@/components/dashboard/shell";
import { NfcCard } from "@/components/marketing/nfc-card";
import { QrCode as QrSvg } from "@/components/brand/qr";
import { Badge } from "@/components/ui/primitives";
import { useToast } from "@/components/ui/toast";
import { business } from "@/lib/data";
import { cn } from "@/lib/utils";

const cards = [
  { serial: "RC-2026-0418", placement: "Masa 12", status: "Activ", scans: 148 },
  { serial: "RC-2026-0419", placement: "Masa 4", status: "Activ", scans: 132 },
  { serial: "RC-2026-0420", placement: "Terasă — masa 3", status: "Activ", scans: 96 },
  { serial: "RC-2026-0421", placement: "Recepție", status: "Activ", scans: 218 },
  { serial: "RC-2026-0422", placement: "Nefolosit", status: "Inactiv", scans: 0 },
];

const tips = [
  "Pune cardul lângă nota de plată — momentul cu cea mai bună rată de răspuns.",
  "Evită suprafețele metalice: reduc semnalul NFC.",
  "Un card la fiecare 3–4 mese este suficient pentru un restaurant mediu.",
];

export default function MyCardPage() {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  function copy() {
    navigator.clipboard?.writeText(`https://${business.publicUrl}`).catch(() => {});
    setCopied(true);
    toast({ title: "Link copiat", description: business.publicUrl });
    window.setTimeout(() => setCopied(false), 2200);
  }

  return (
    <>
      <PageHeader
        title="Cardul meu"
        subtitle="Cardurile active, linkul public și materialele de printat."
        actions={
          <button className="inline-flex h-9 items-center gap-2 rounded-lg bg-ink-950 px-3.5 text-[12.5px] font-medium text-ivory-100 transition-colors hover:bg-ink-800">
            <Plus className="size-3.5" strokeWidth={2.2} />
            Comandă carduri
          </button>
        }
      />

      <div className="grid gap-3 lg:grid-cols-[1.25fr_1fr] lg:items-start">
        <Panel bodyClassName="p-6 sm:p-8">
          <div className="mx-auto max-w-[420px]">
            <NfcCard serial={business.cardSerial} business={business.name.toUpperCase()} />
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <Badge tone="gold" dot>
              NTAG 215
            </Badge>
            <Badge tone="muted">Aluminiu anodizat</Badge>
            <Badge tone="muted">85,6 × 54 mm</Badge>
          </div>
        </Panel>

        <div className="space-y-3">
          <Panel title="Linkul public" description="Adresa scrisă pe cip și în codul QR">
            <div className="flex items-center gap-2 rounded-lg border border-ivory-300 bg-ivory-100 p-2.5">
              <span className="truncate font-mono text-[13px] text-ink-700">
                {business.publicUrl}
              </span>
              <button
                onClick={copy}
                className={cn(
                  "ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[12px] font-medium transition-all",
                  copied
                    ? "bg-positive-50 text-positive-500"
                    : "bg-white text-ink-500 ring-1 ring-ivory-300 ring-inset hover:text-ink-950",
                )}
              >
                {copied ? (
                  <Check className="size-3" strokeWidth={2.4} />
                ) : (
                  <Copy className="size-3" strokeWidth={2} />
                )}
                {copied ? "Copiat" : "Copiază"}
              </button>
            </div>
            <p className="mt-3 text-[12.5px] leading-relaxed text-ink-400">
              Acest link nu se schimbă niciodată. Poți modifica orice în cont fără
              să reprogramezi cardurile.
            </p>
          </Panel>

          <Panel title="Cod QR" description="Pentru meniuri, vitrine sau materiale printate">
            <div className="flex items-center gap-5">
              <div className="size-28 shrink-0 rounded-xl border border-ivory-300 bg-white p-3">
                <QrSvg className="text-ink-950" />
              </div>
              <div className="flex-1">
                <p className="text-[13px] leading-relaxed text-ink-400">
                  Fișier vectorial, potrivit pentru orice dimensiune de print.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button className="inline-flex h-9 items-center gap-2 rounded-lg border border-ivory-300 bg-white px-3 text-[12.5px] font-medium text-ink-600 transition-colors hover:border-ink-150 hover:text-ink-950">
                    <Download className="size-3.5" strokeWidth={1.9} />
                    SVG
                  </button>
                  <button className="inline-flex h-9 items-center gap-2 rounded-lg border border-ivory-300 bg-white px-3 text-[12.5px] font-medium text-ink-600 transition-colors hover:border-ink-150 hover:text-ink-950">
                    <Download className="size-3.5" strokeWidth={1.9} />
                    PNG
                  </button>
                </div>
              </div>
            </div>
          </Panel>
        </div>
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-[1.6fr_1fr] lg:items-start">
        <Panel
          title="Carduri active"
          description="5 carduri asociate acestei locații"
          bodyClassName="p-0"
        >
          <ul className="divide-y divide-ivory-200">
            {cards.map((c) => (
              <li
                key={c.serial}
                className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-ivory-100/60"
              >
                <span
                  className={cn(
                    "grid size-9 shrink-0 place-items-center rounded-lg",
                    c.status === "Activ"
                      ? "bg-ink-950 text-gold-300"
                      : "bg-ivory-200 text-ink-300",
                  )}
                >
                  <Nfc className="size-4" strokeWidth={1.7} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[12.5px] text-ink-800">{c.serial}</p>
                  <p className="mt-0.5 text-[12px] text-ink-300">{c.placement}</p>
                </div>
                <span className="tnum hidden text-[13px] text-ink-500 sm:block">
                  {c.scans} scanări
                </span>
                <Badge tone={c.status === "Activ" ? "positive" : "muted"}>
                  {c.status}
                </Badge>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Recomandări de amplasare">
          <ul className="space-y-3.5">
            {tips.map((t) => (
              <li key={t} className="flex gap-3">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-ivory-200 text-ink-500">
                  <QrCode className="size-2.5" strokeWidth={2.2} />
                </span>
                <span className="text-[13.5px] leading-relaxed text-ink-500">{t}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  );
}
