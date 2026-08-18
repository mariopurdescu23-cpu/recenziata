"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, CreditCard, Minus } from "lucide-react";
import { Fragment, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge, Eyebrow, Reveal } from "@/components/ui/primitives";
import { comparisonRows, plans } from "@/lib/data";
import { cn, formatNumber } from "@/lib/utils";
import { Glow } from "@/components/ui/glow";

const ease = [0.22, 1, 0.36, 1] as const;

export function PricingSection({
  compactHeading = false,
  className,
}: {
  compactHeading?: boolean;
  className?: string;
}) {
  const [annual, setAnnual] = useState(false);

  return (
    <section
      id="preturi"
      className={cn(
        "relative overflow-hidden border-t border-white/[0.06] bg-ink-950 py-20 sm:py-28",
        className,
      )}
    >
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" />
      <Glow className="-top-16 left-1/2 h-[30rem] w-[60rem] -translate-x-1/2" tone="goldSoft" opacity={0.8} />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow onDark className="justify-center">
              Prețuri
            </Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2
              className={cn(
                "tighter mt-5 leading-[1.06] font-medium text-ivory-100",
                compactHeading
                  ? "text-[clamp(1.85rem,4.6vw,3rem)]"
                  : "text-[clamp(2.1rem,5.4vw,3.5rem)]",
              )}
            >
              Un preț corect,
              <br />
              <span className="display italic text-gold-300">fără surprize.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-5 text-[15.5px] leading-relaxed text-ink-200">
              Abonament lunar, fără perioadă minimă. Cardul NFC se plătește o
              singură dată. Primele 14 zile sunt gratuite.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-8 inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1">
              {[
                { id: false, label: "Lunar" },
                { id: true, label: "Anual · −20%" },
              ].map((o) => (
                <button
                  key={String(o.id)}
                  onClick={() => setAnnual(o.id)}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-[13px] font-medium transition-colors",
                    annual === o.id ? "text-ink-950" : "text-ink-200 hover:text-ivory-100",
                  )}
                >
                  {annual === o.id && (
                    <motion.span
                      layoutId="price-toggle"
                      className="absolute inset-0 rounded-full bg-ivory-100"
                      transition={{ duration: 0.4, ease }}
                    />
                  )}
                  <span className="relative">{o.label}</span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {plans.map((plan, i) => {
            const highlighted = plan.highlighted;
            const monthly = plan.price;
            const shown =
              monthly === null ? null : annual ? Math.round(monthly * 0.8) : monthly;

            return (
              <Reveal
                key={plan.id}
                delay={i * 0.07}
                className={highlighted ? "order-first lg:order-none" : undefined}
              >
                <article
                  className={cn(
                    "relative flex h-full flex-col rounded-2xl border p-5 transition-all duration-500 sm:p-6",
                    highlighted
                      ? "border-gold-400/35 bg-gradient-to-b from-white/[0.09] to-white/[0.03] shadow-[0_0_0_1px_rgba(210,171,99,0.12),0_40px_90px_-40px_rgba(210,171,99,0.55)]"
                      : "border-white/[0.08] bg-white/[0.025] hover:border-white/[0.16] hover:bg-white/[0.05]",
                  )}
                >
                  {highlighted && (
                    <span className="absolute -top-3 left-6 z-10">
                      <Badge tone="goldSolid" className="shadow-[0_6px_18px_-8px_rgba(189,145,71,0.9)]">
                        Cel mai ales
                      </Badge>
                    </span>
                  )}

                  <h3 className="tight text-[17px] font-medium text-ivory-100">
                    {plan.name}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-snug text-ink-300 lg:min-h-[2.5rem]">
                    {plan.tagline}
                  </p>

                  <div className="mt-5 flex items-baseline gap-1.5">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        key={`${plan.id}-${shown}`}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.28, ease }}
                        className="tighter tnum text-[34px] leading-none font-medium text-ivory-100 sm:text-[38px]"
                      >
                        {shown === null ? "La cerere" : formatNumber(shown)}
                      </motion.span>
                    </AnimatePresence>
                    {shown !== null && (
                      <span className="text-[13px] text-ink-300">lei / lună</span>
                    )}
                  </div>
                  <p className="mt-1.5 text-[11.5px] text-ink-400">
                    {shown === null
                      ? "ofertă personalizată"
                      : annual
                        ? "facturat anual, TVA inclus"
                        : "fără perioadă minimă, TVA inclus"}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <Badge tone="onDark">{plan.locations}</Badge>
                    <Badge tone="onDark">{plan.cards}</Badge>
                  </div>

                  <ul className="mt-5 flex-1 space-y-2.5 sm:mt-6">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <Check
                          className={cn(
                            "mt-0.5 size-3.5 shrink-0",
                            highlighted ? "text-gold-300" : "text-ink-300",
                          )}
                          strokeWidth={2.2}
                        />
                        <span className="text-[13px] leading-snug text-ink-200">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 sm:mt-7">
                    <Button
                      href="/autentificare"
                      variant={highlighted ? "gold" : "outlineLight"}
                      size="md"
                      sheen={highlighted}
                      className="w-full"
                    >
                      {plan.cta}
                    </Button>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Card NFC — ofertă separată */}
        <Reveal delay={0.1}>
          <div className="mt-5 flex flex-col items-start justify-between gap-6 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 sm:flex-row sm:items-center sm:p-7">
            <div className="flex items-start gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-gold-300 to-gold-600 text-ink-950">
                <CreditCard className="size-5" strokeWidth={1.7} />
              </span>
              <div>
                <h3 className="tight text-[17px] font-medium text-ivory-100">
                  Card NFC Premium
                </h3>
                <p className="mt-1.5 max-w-lg text-[13.5px] leading-relaxed text-ink-300">
                  Aluminiu anodizat, gravat laser, personalizat cu numele afacerii.
                  Plată unică, indiferent de abonament. Livrare în 3–5 zile.
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-6">
              <div className="text-right">
                <p className="tighter tnum text-[30px] leading-none font-medium text-ivory-100">
                  99
                </p>
                <p className="mt-1 text-[11.5px] text-ink-400">lei / card, o dată</p>
              </div>
              <Button href="/preturi#comparatie" variant="outlineLight" size="md">
                Detalii
                <ArrowRight className="size-3.5" />
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Comparație                                                                */
/* -------------------------------------------------------------------------- */

export function ComparisonTable() {
  const groups = [...new Set(comparisonRows.map((r) => r.group))];

  return (
    <section id="comparatie" className="bg-ivory-100 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-7 lg:px-10">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>Comparație</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="tighter mt-5 text-[clamp(1.7rem,4vw,2.5rem)] leading-[1.08] font-medium text-ink-950">
              Ce include fiecare plan
            </h2>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 overflow-hidden rounded-2xl border border-ivory-300 bg-white">
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full min-w-[680px] border-collapse text-left">
                <thead className="sticky top-0">
                  <tr className="border-b border-ivory-300 bg-white">
                    <th className="w-[34%] px-5 py-4 text-[12px] font-medium text-ink-300">
                      Funcționalitate
                    </th>
                    {plans.map((p) => (
                      <th
                        key={p.id}
                        className={cn(
                          "px-4 py-4 text-center text-[13px] font-medium",
                          p.highlighted ? "text-ink-950" : "text-ink-500",
                        )}
                      >
                        <span className="block">{p.name}</span>
                        <span className="mt-0.5 block text-[11.5px] font-normal text-ink-300">
                          {p.price === null ? "la cerere" : `${p.price} lei`}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {groups.map((group) => (
                    <Fragment key={group}>
                      <tr className="bg-ivory-100/70">
                        <td
                          colSpan={5}
                          className="px-5 py-2 text-[11px] tracking-[0.12em] text-ink-400 uppercase"
                        >
                          {group}
                        </td>
                      </tr>
                      {comparisonRows
                        .filter((r) => r.group === group)
                        .map((row) => (
                          <tr
                            key={row.label}
                            className="border-b border-ivory-200 transition-colors last:border-0 hover:bg-ivory-100/60"
                          >
                            <td className="px-5 py-3 text-[13.5px] text-ink-700">
                              {row.label}
                            </td>
                            {row.values.map((v, i) => (
                              <td
                                key={i}
                                className={cn(
                                  "px-4 py-3 text-center",
                                  plans[i].highlighted && "bg-gold-100/25",
                                )}
                              >
                                {typeof v === "boolean" ? (
                                  v ? (
                                    <Check
                                      className="mx-auto size-4 text-positive-500"
                                      strokeWidth={2.2}
                                    />
                                  ) : (
                                    <Minus
                                      className="mx-auto size-4 text-ink-150"
                                      strokeWidth={2}
                                    />
                                  )
                                ) : (
                                  <span className="tnum text-[13px] text-ink-800">{v}</span>
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
