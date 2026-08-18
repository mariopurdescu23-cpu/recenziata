"use client";

import { ArrowRight, MessageSquareQuote, QrCode, Star, ThumbsUp } from "lucide-react";
import { BrowserFrame } from "@/components/ui/browser-frame";
import { LaptopFrame } from "@/components/product/laptop-frame";
import { InteractionsChart, ReasonsDonut } from "@/components/dashboard/charts";
import { Button } from "@/components/ui/button";
import { Counter, Eyebrow, Reveal } from "@/components/ui/primitives";
import { reasonBreakdown, series30d, totals } from "@/lib/data";
import { Glow } from "@/components/ui/glow";

const tiles = [
  { label: "Scanări", value: totals.scanari, delta: totals.scanariDelta, icon: QrCode },
  { label: "Feedback", value: totals.feedback, delta: totals.feedbackDelta, icon: MessageSquareQuote },
  { label: "Recenzii Google", value: totals.recenzii, delta: totals.recenziiDelta, icon: Star },
  { label: "Feedback pozitiv", value: totals.ratePozitiv, delta: totals.ratePozitivDelta, icon: ThumbsUp, suffix: "%", decimals: 1 },
];

export function DashboardPreview() {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] bg-ink-950 py-20 sm:py-28">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" />
      <Glow className="-bottom-48 left-1/2 h-[34rem] w-[66rem] -translate-x-1/2" tone="goldSoft" opacity={0.8} />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <Reveal>
              <Eyebrow onDark>Panoul de control</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="tighter mt-5 text-[clamp(1.85rem,4.6vw,3rem)] leading-[1.06] font-medium text-ivory-100">
                Ce s-a întâmplat azi
                <br />
                <span className="display italic text-gold-300">într-un singur ecran.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-5 text-[15.5px] leading-relaxed text-ink-200">
                Scanări, feedback, recenzii și motivele reale din spatele lor. Fără
                rapoarte de citit — doar ce merită observat.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.18}>
            <Button href="/dashboard" variant="outlineLight" size="lg">
              Deschide dashboard-ul demo
              <ArrowRight className="size-4" />
            </Button>
          </Reveal>
        </div>

        <Reveal delay={0.1} y={26}>
          <div className="mt-12 lg:mt-16">
            <LaptopFrame>
            <BrowserFrame
              url="recenziata.ro/dashboard"
              tone="dark"
              className="rounded-none border-0 shadow-none"
            >
              <div className="bg-ivory-100 p-4 sm:p-6">
                <div className="flex items-baseline justify-between gap-4">
                  <div>
                    <h3 className="tight text-[17px] font-medium text-ink-950 sm:text-[20px]">
                      Bun venit, Maison Noir.
                    </h3>
                    <p className="mt-1 text-[12.5px] text-ink-400 sm:text-[13.5px]">
                      Iată cum au interacționat clienții tăi în ultimele 30 de zile.
                    </p>
                  </div>
                  <span className="hidden rounded-full border border-ivory-300 bg-white px-3 py-1.5 text-[12px] text-ink-400 sm:block">
                    Ultimele 30 de zile
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
                  {tiles.map((t) => {
                    const Icon = t.icon;
                    return (
                      <div
                        key={t.label}
                        className="rounded-xl border border-ivory-300 bg-white p-3.5"
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-[11.5px] font-medium text-ink-400">
                            {t.label}
                          </p>
                          <Icon className="size-3.5 text-ink-300" strokeWidth={1.7} />
                        </div>
                        <p className="tight mt-2 text-[21px] leading-none font-medium text-ink-950 sm:text-[24px]">
                          <Counter value={t.value} decimals={t.decimals ?? 0} />
                          {t.suffix}
                        </p>
                        <p className="mt-2 text-[11px] font-medium text-positive-500">
                          +{new Intl.NumberFormat("ro-RO", { minimumFractionDigits: 1 }).format(t.delta)}%
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-3 grid gap-3 lg:grid-cols-[1.9fr_1fr]">
                  <div className="rounded-xl border border-ivory-300 bg-white p-4">
                    <p className="text-[13px] font-medium text-ink-950">
                      Interacțiuni în ultimele 30 de zile
                    </p>
                    <div className="mt-1 flex items-center gap-4 text-[11.5px] text-ink-400">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="size-2 rounded-full bg-gold-500" />
                        Scanări
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <span className="size-2 rounded-full bg-ink-500" />
                        Feedback
                      </span>
                    </div>
                    <InteractionsChart data={series30d} height={200} />
                  </div>

                  <div className="rounded-xl border border-ivory-300 bg-white p-4">
                    <p className="text-[13px] font-medium text-ink-950">
                      De ce nu au fost mulțumiți
                    </p>
                    <ReasonsDonut data={reasonBreakdown} height={140} />
                    <ul className="mt-1 space-y-1.5">
                      {reasonBreakdown.slice(0, 3).map((r) => (
                        <li
                          key={r.name}
                          className="flex items-center gap-2 text-[11.5px]"
                        >
                          <span
                            className="size-2 rounded-full"
                            style={{ background: r.color }}
                          />
                          <span className="text-ink-400">{r.name}</span>
                          <span className="tnum ml-auto font-medium text-ink-900">
                            {r.value}%
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </BrowserFrame>
            </LaptopFrame>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
