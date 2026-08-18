"use client";

import { motion } from "framer-motion";
import {
  Bell,
  ChevronRight,
  Home,
  MessageSquareQuote,
  QrCode,
  Settings,
  Star,
  TrendingUp,
} from "lucide-react";
import { LogoMark } from "@/components/brand/logo";
import { PhoneFrame } from "@/components/product/phone-frame";
import { Sparkline } from "@/components/dashboard/charts";
import { Button } from "@/components/ui/button";
import { Eyebrow, Reveal } from "@/components/ui/primitives";
import { mobileFeedback, mobileToday } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Glow } from "@/components/ui/glow";

const ease = [0.22, 1, 0.36, 1] as const;

const benefits = [
  "Notificare instant la fiecare feedback negativ",
  "Cifrele zilei, înainte de prima cafea",
  "Răspuns rapid, direct de pe telefon",
];

export function MobileApp({ standalone = false }: { standalone?: boolean }) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-ink-950 py-20 sm:py-28",
        !standalone && "border-t border-white/[0.06]",
      )}
    >
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" />
      <Glow className="top-1/5 -right-20 h-[30rem] w-[42rem]" tone="goldSoft" opacity={0.85} />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_1.15fr]">
          <div className="max-w-lg">
            <Reveal>
              <Eyebrow onDark>În lucru</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="tighter mt-5 text-[clamp(1.85rem,4.6vw,3rem)] leading-[1.06] font-medium text-ivory-100">
                Aceleași date,
                <br />
                <span className="display italic text-gold-300">în buzunar.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-5 text-[15.5px] leading-relaxed text-ink-200">
                Aplicația mobilă Recenziata aduce dashboard-ul acolo unde ești
                oricum: pe telefon. Aceeași arhitectură, aceleași date, aceeași
                grijă pentru detaliu.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <ul className="mt-8 space-y-3.5">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="mt-1 size-1.5 shrink-0 rounded-full bg-gold-400" />
                    <span className="text-[14.5px] leading-snug text-ink-200">{b}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Button href="/dashboard" variant="outlineLight" size="lg">
                  Vezi versiunea web
                </Button>
                <p className="text-[13px] text-ink-400">
                  iOS și Android · în testare privată
                </p>
              </div>
            </Reveal>
          </div>

          {/* Telefoane */}
          <div className="relative mx-auto flex w-full max-w-[560px] items-end justify-center gap-4 sm:gap-8">
            <Reveal delay={0.1} y={28} className="hidden w-[42%] max-w-[210px] sm:block">
              <div className="float-slower">
                <PhoneFrame className="w-full" time="9:38">
                  <FeedbackScreen />
                </PhoneFrame>
              </div>
            </Reveal>

            <Reveal delay={0.04} y={28} className="relative w-[70%] max-w-[250px] sm:w-[48%]">
              <div className="float-slow">
                <PhoneFrame className="w-full">
                  <TodayScreen />
                </PhoneFrame>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

function TodayScreen() {
  return (
    <div className="relative flex h-full flex-col bg-ivory-100">
      {/* Notificare push, exact unde ar apărea pe un telefon real */}
      <motion.div
        initial={{ opacity: 0, y: -26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1, duration: 0.7, ease }}
        className="absolute inset-x-[5%] top-[7.5%] z-30 rounded-[14px] border border-white/40 bg-white/85 p-[4.5%] shadow-[0_12px_28px_-12px_rgba(8,8,10,0.35)] backdrop-blur-md"
      >
        <div className="flex items-start gap-2">
          <LogoMark className="size-[13%] min-w-6 shrink-0" />
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline gap-2">
              <p className="text-[9px] font-semibold text-ink-950">Recenziata</p>
              <span className="ml-auto text-[8px] text-ink-300">acum</span>
            </div>
            <p className="mt-[3px] text-[8.5px] leading-tight font-medium text-ink-900">
              Feedback nou
            </p>
            <p className="mt-[2px] text-[8px] leading-snug text-ink-500">
              Clientul a raportat un timp de așteptare mai mare.
            </p>
          </div>
        </div>
      </motion.div>

      <div className="px-[7%] pt-[9%]">
        <p className="text-[9.5px] text-ink-300">Luni, 17 august</p>
        <p className="tight mt-1 text-[15px] leading-tight font-medium text-ink-950">
          Bună dimineața,
          <br />
          Maison Noir
        </p>
      </div>

      <div className="mt-[15%] px-[7%]">
        <p className="eyebrow text-ink-300">Astăzi</p>
        <div className="mt-2 grid grid-cols-3 gap-1.5">
          {[
            { label: "Scanări", value: mobileToday.scanari, icon: QrCode },
            { label: "Feedback", value: mobileToday.feedback, icon: MessageSquareQuote },
            { label: "Recenzii", value: mobileToday.recenzii, icon: Star },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="rounded-xl border border-ivory-300 bg-white p-2"
              >
                <Icon className="size-3 text-ink-300" strokeWidth={1.8} />
                <p className="tnum tight mt-1.5 text-[17px] leading-none font-medium text-ink-950">
                  {s.value}
                </p>
                <p className="mt-1 text-[8px] text-ink-300">{s.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-3 px-[7%]">
        <div className="rounded-xl border border-ivory-300 bg-white p-2.5">
          <div className="flex items-center justify-between">
            <p className="text-[9.5px] font-medium text-ink-600">Ultimele 12 ore</p>
            <span className="inline-flex items-center gap-0.5 text-[8.5px] font-medium text-positive-500">
              <TrendingUp className="size-2.5" strokeWidth={2.2} />
              +24%
            </span>
          </div>
          <Sparkline data={mobileToday.sparkline} height={38} />
        </div>
      </div>

      <div className="mt-3 px-[7%]">
        <div className="relative overflow-hidden rounded-xl bg-ink-950 p-2.5">
          <div className="hairline-gold absolute inset-x-0 top-0 h-px opacity-60" />
          <p className="eyebrow text-gold-300">Insight</p>
          <p className="mt-1.5 text-[9.5px] leading-snug text-ivory-100">
            Timpul de așteptare a generat 38% dintre feedback-urile negative.
          </p>
        </div>
      </div>

      {/* tab bar */}
      <div className="mt-auto flex items-center justify-around border-t border-ivory-300 bg-white/80 px-2 pt-2 pb-[7%] backdrop-blur">
        {[
          { icon: Home, active: true },
          { icon: MessageSquareQuote, active: false },
          { icon: Bell, active: false },
          { icon: Settings, active: false },
        ].map((t, i) => {
          const Icon = t.icon;
          return (
            <span
              key={i}
              className={cn(
                "grid size-7 place-items-center rounded-lg",
                t.active ? "text-ink-950" : "text-ink-300",
              )}
            >
              <Icon className="size-3.5" strokeWidth={1.9} />
            </span>
          );
        })}
      </div>
    </div>
  );
}

function FeedbackScreen() {
  return (
    <div className="flex h-full flex-col bg-ivory-100">
      <div className="px-[7%] pt-[9%]">
        <p className="tight text-[14px] font-medium text-ink-950">Feedback</p>
        <p className="mt-0.5 text-[9px] text-ink-300">7 azi · 2 necitite</p>
      </div>

      <div className="mt-3 flex gap-1 px-[7%]">
        {["Toate", "Negativ", "Pozitiv"].map((f, i) => (
          <span
            key={f}
            className={cn(
              "rounded-full px-2 py-1 text-[8px] font-medium",
              i === 0
                ? "bg-ink-950 text-ivory-100"
                : "border border-ivory-300 bg-white text-ink-400",
            )}
          >
            {f}
          </span>
        ))}
      </div>

      <ul className="mt-2.5 flex-1 space-y-1.5 overflow-hidden px-[7%]">
        {mobileFeedback.map((f, i) => (
          <motion.li
            key={f.id}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.08, duration: 0.45, ease }}
            className="flex items-start gap-2 rounded-xl border border-ivory-300 bg-white p-2"
          >
            <span
              className={cn(
                "mt-1 size-1.5 shrink-0 rounded-full",
                f.sentiment === "pozitiv" ? "bg-positive-400" : "bg-negative-400",
              )}
            />
            <div className="min-w-0 flex-1">
              <p className="text-[8.5px] leading-snug text-ink-800">{f.text}</p>
              <p className="mt-1 text-[7.5px] text-ink-300">
                {f.category} · {f.time}
              </p>
            </div>
            <ChevronRight className="mt-0.5 size-2.5 shrink-0 text-ink-200" />
          </motion.li>
        ))}
      </ul>

      <div className="px-[7%] pb-[9%]">
        <div className="rounded-xl bg-ink-950 px-2.5 py-2 text-center text-[8.5px] font-medium text-ivory-100">
          Exportă raportul zilei
        </div>
      </div>
    </div>
  );
}
