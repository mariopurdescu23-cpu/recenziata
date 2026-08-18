"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, CheckCircle2, MessageSquareQuote, Nfc, QrCode, Star } from "lucide-react";
import { useCallback, useState } from "react";
import { Badge, Tooltip } from "@/components/ui/primitives";
import { useToast } from "@/components/ui/toast";
import type { FeedbackEntry, FeedbackStatus } from "@/lib/data";
import { cn } from "@/lib/utils";

export function relativeFromMinutes(m: number) {
  if (m < 1) return "chiar acum";
  if (m < 60) return `acum ${m} min.`;
  const h = Math.round(m / 60);
  if (h < 24) return `acum ${h} h`;
  const d = Math.round(h / 24);
  return d === 1 ? "acum o zi" : `acum ${d} zile`;
}

const statusTone = {
  nou: "gold",
  vazut: "neutral",
  rezolvat: "positive",
} as const;

const statusLabel = {
  nou: "Nou",
  vazut: "Văzut",
  rezolvat: "Rezolvat",
} as const;

export function FeedbackTable({
  entries,
  limit,
  emptyLabel = "Niciun feedback în acest interval.",
}: {
  entries: FeedbackEntry[];
  limit?: number;
  emptyLabel?: string;
}) {
  const rows = limit ? entries.slice(0, limit) : entries;
  const { toast } = useToast();
  // Rezolvarea se aplică optimist, exact ca într-un client de API real.
  const [resolved, setResolved] = useState<Record<string, true>>({});

  const resolve = useCallback(
    (id: string, message: string) => {
      setResolved((prev) => ({ ...prev, [id]: true }));
      toast({
        title: "Marcat ca rezolvat",
        description: message.length > 52 ? `${message.slice(0, 52)}…` : message,
      });
    },
    [toast],
  );

  const statusOf = (f: FeedbackEntry): FeedbackStatus =>
    resolved[f.id] ? "rezolvat" : f.status;

  if (rows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
        <span className="grid size-11 place-items-center rounded-xl bg-ivory-200 text-ink-300">
          <MessageSquareQuote className="size-5" strokeWidth={1.6} />
        </span>
        <p className="mt-4 text-[14px] font-medium text-ink-800">{emptyLabel}</p>
        <p className="mt-1.5 max-w-xs text-[13px] leading-relaxed text-ink-300">
          Modifică filtrele sau așteaptă următoarea interacțiune — datele apar în
          timp real.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* --- Desktop --- */}
      <div className="hidden md:block">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-ivory-300">
              {["Feedback", "Categorie", "Sentiment", "Sursă", "Primit", "Status"].map(
                (h) => (
                  <th
                    key={h}
                    scope="col"
                    className="px-4 py-2.5 text-[11.5px] font-medium text-ink-300 first:pl-5 last:pr-5 last:text-right"
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence initial={false}>
              {rows.map((f) => (
                <motion.tr
                  key={f.id}
                  layout
                  initial={f.live ? { opacity: 0, y: -8 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    "group border-b border-ivory-200 transition-colors last:border-0 hover:bg-ivory-100/70",
                    f.live && "bg-gold-100/40",
                  )}
                >
                  <td className="max-w-[24rem] px-4 py-3.5 pl-5">
                    <div className="flex items-start gap-2.5">
                      <span
                        className={cn(
                          "mt-1.5 size-1.5 shrink-0 rounded-full",
                          f.sentiment === "pozitiv"
                            ? "bg-positive-400"
                            : "bg-negative-400",
                        )}
                      />
                      <span className="text-[13.5px] leading-snug text-ink-800">
                        {f.message}
                      </span>
                      {f.live && (
                        <Badge tone="gold" className="ml-1 shrink-0">
                          live
                        </Badge>
                      )}
                    </div>
                    {f.location && (
                      <p className="mt-1 pl-4 text-[11.5px] text-ink-300">
                        {f.location}
                      </p>
                    )}
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-[13px] text-ink-500">{f.category}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <Badge tone={f.sentiment === "pozitiv" ? "positive" : "negative"} dot>
                      {f.sentiment === "pozitiv" ? "Pozitiv" : "Negativ"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="inline-flex items-center gap-1.5 text-[12.5px] text-ink-400">
                      {f.source === "NFC" ? (
                        <Nfc className="size-3.5" strokeWidth={1.8} />
                      ) : (
                        <QrCode className="size-3.5" strokeWidth={1.8} />
                      )}
                      {f.source}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-[12.5px] whitespace-nowrap text-ink-400">
                      {relativeFromMinutes(f.minutesAgo)}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 pr-5">
                    <div className="flex items-center justify-end gap-2">
                      <span className="grid w-4 shrink-0 place-items-center">
                        {f.wentToGoogle && (
                          <Tooltip label="A continuat către Google">
                            <span className="text-gold-500">
                              <Star
                                className="size-3.5"
                                fill="currentColor"
                                strokeWidth={0}
                              />
                            </span>
                          </Tooltip>
                        )}
                      </span>
                      {/* Randat mereu, ca lățimea rândului să nu difere după
                          starea rezolvat/nerezolvat — altfel steaua "aluneca"
                          pe orizontală de la un rând la altul. */}
                      <button
                        onClick={() =>
                          statusOf(f) !== "rezolvat" && resolve(f.id, f.message)
                        }
                        tabIndex={statusOf(f) === "rezolvat" ? -1 : 0}
                        aria-hidden={statusOf(f) === "rezolvat"}
                        className={cn(
                          "inline-flex h-6 shrink-0 items-center gap-1 rounded-full border border-ivory-300 bg-white px-2 text-[11px] font-medium text-ink-500 transition-all duration-200 hover:border-positive-500/40 hover:text-positive-500 focus-visible:opacity-100",
                          statusOf(f) === "rezolvat"
                            ? "pointer-events-none opacity-0"
                            : "opacity-0 group-hover:opacity-100",
                        )}
                      >
                        <Check className="size-3" strokeWidth={2.6} />
                        Rezolvă
                      </button>
                      <motion.span layout>
                        <Badge tone={statusTone[statusOf(f)]}>
                          {statusLabel[statusOf(f)]}
                        </Badge>
                      </motion.span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* --- Mobil --- */}
      <ul className="divide-y divide-ivory-200 md:hidden">
        <AnimatePresence initial={false}>
          {rows.map((f) => (
            <motion.li
              key={f.id}
              layout
              initial={f.live ? { opacity: 0, y: -8 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className={cn("px-4 py-4", f.live && "bg-gold-100/40")}
            >
              <div className="flex items-start gap-2.5">
                <span
                  className={cn(
                    "mt-1.5 size-1.5 shrink-0 rounded-full",
                    f.sentiment === "pozitiv" ? "bg-positive-400" : "bg-negative-400",
                  )}
                />
                <p className="flex-1 text-[13.5px] leading-snug text-ink-800">
                  {f.message}
                </p>
                {f.live && <Badge tone="gold">live</Badge>}
              </div>
              <div className="mt-2.5 flex flex-wrap items-center gap-2 pl-4">
                <Badge tone={f.sentiment === "pozitiv" ? "positive" : "negative"} dot>
                  {f.sentiment === "pozitiv" ? "Pozitiv" : "Negativ"}
                </Badge>
                <Badge tone="muted">{f.category}</Badge>
                <Badge tone={statusTone[statusOf(f)]}>
                  {statusLabel[statusOf(f)]}
                </Badge>
                {statusOf(f) !== "rezolvat" && (
                  <button
                    onClick={() => resolve(f.id, f.message)}
                    className="inline-flex items-center gap-1 rounded-full border border-ivory-300 bg-white px-2 py-1 text-[11px] font-medium text-ink-500 active:scale-[0.97]"
                  >
                    <Check className="size-3" strokeWidth={2.6} />
                    Marchează rezolvat
                  </button>
                )}
                {f.wentToGoogle && (
                  <span className="inline-flex items-center gap-1 text-[11.5px] text-gold-600">
                    <CheckCircle2 className="size-3" strokeWidth={2} />
                    Google
                  </span>
                )}
                <span className="ml-auto text-[11.5px] text-ink-300">
                  {relativeFromMinutes(f.minutesAgo)}
                </span>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </>
  );
}
