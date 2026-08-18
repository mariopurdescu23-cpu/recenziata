"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Play, Star } from "lucide-react";
import { NfcCard } from "@/components/marketing/nfc-card";
import { PhoneFrame } from "@/components/product/phone-frame";
import { FeedbackFlow } from "@/components/product/feedback-flow";
import { Button } from "@/components/ui/button";
import { Counter } from "@/components/ui/primitives";
import { Glow } from "@/components/ui/glow";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-ink-950 pt-24 pb-14 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-28">
      {/* fundal */}
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
      <Glow className="-top-52 left-1/2 h-[38rem] w-[70rem] -translate-x-1/2" opacity={0.75} />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 to-transparent"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
        <div className="grid items-center gap-10 sm:gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
          {/* --- Text --- */}
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.09] bg-white/[0.04] py-1.5 pr-4 pl-1.5 backdrop-blur"
            >
              <span className="rounded-full bg-gold-400/15 px-2.5 py-1 text-[10.5px] font-medium tracking-[0.08em] text-gold-300 uppercase">
                Nou
              </span>
              <span className="text-[12.5px] whitespace-nowrap text-ink-200">
                <span className="sm:hidden">Card NFC gravat în România</span>
                <span className="hidden sm:inline">
                  Card NFC din aluminiu, gravat laser în România
                </span>
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.08, ease }}
              className="tighter mt-6 text-[clamp(2.35rem,7.2vw,4.25rem)] leading-[0.98] font-medium text-ivory-100 sm:mt-7"
            >
              Mai multe recenzii.
              <br />
              <span className="display text-gold-300 italic">
                Mai multă încredere.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.16, ease }}
              className="mt-5 max-w-lg text-[15.5px] leading-relaxed text-ink-200 sm:mt-6 sm:text-[17px]"
            >
              Recenziata transformă fiecare experiență bună într-o oportunitate de
              feedback și fiecare interacțiune într-o recenzie Google.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.24, ease }}
              className="mt-7 flex flex-col gap-2.5 sm:mt-9 sm:flex-row sm:items-center sm:gap-3"
            >
              <Button href="#demo" variant="ivory" size="lg" sheen className="sm:w-auto">
                Vezi cum funcționează
                <ArrowRight className="size-4" />
              </Button>
              <Button href="/maison-noir" variant="outlineLight" size="lg">
                <Play className="size-3.5" fill="currentColor" strokeWidth={0} />
                Încearcă demo-ul
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.42, ease }}
              className="mt-8 grid grid-cols-3 divide-x divide-white/[0.08] border-t border-white/[0.07] pt-6 sm:mt-10 sm:pt-7"
            >
              <Stat value={428} label="afaceri active" />
              <Stat
                value={214}
                suffix="k"
                label="scanări"
                labelWide="scanări procesate"
                className="pl-4 sm:pl-6"
              />
              <Stat
                value={4.9}
                decimals={1}
                label="rating mediu"
                className="pl-4 sm:pl-6"
                stars
              />
            </motion.div>
          </div>

          {/* --- Vizual: card + telefon --- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease }}
            className="relative mx-auto w-full max-w-[460px] sm:max-w-[520px] lg:max-w-none"
          >
            <div className="relative aspect-[4/4.4] w-full sm:aspect-[4/3.4] lg:aspect-[4/3.1]">
              {/* halou */}
              <Glow className="inset-[6%]" tone="goldSoft" opacity={0.9} />

              {/* card */}
              <div
                className="absolute top-[8%] -left-[2%] w-[74%] sm:top-[4%] sm:w-[70%]"
                style={{ transform: "rotate(-7deg)" }}
              >
                <div className={reduced ? undefined : "float-slow"}>
                  <NfcCard />
                </div>
              </div>

              {/* unde NFC între card și telefon */}
              {!reduced && (
                <div aria-hidden className="absolute top-[38%] left-[46%] size-0">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="emit-ring absolute size-[190px] rounded-full border border-gold-300/40"
                      style={{ animationDelay: `${i * 0.95}s` }}
                    />
                  ))}
                </div>
              )}

              {/* telefon */}
              <div className="absolute right-0 bottom-0 w-[50%] max-w-[230px] sm:w-[45%]">
                <div className={reduced ? undefined : "float-slower"}>
                  <PhoneFrame className="w-full">
                    <FeedbackFlow compact />
                  </PhoneFrame>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  value,
  suffix,
  label,
  labelWide,
  decimals = 0,
  className,
  stars,
}: {
  value: number;
  suffix?: string;
  label: string;
  /** variantă completă, afișată doar când există spațiu */
  labelWide?: string;
  decimals?: number;
  className?: string;
  stars?: boolean;
}) {
  return (
    <div className={className}>
      <p className="tight flex items-baseline text-[21px] font-medium text-ivory-100 sm:text-[22px]">
        <span className="whitespace-nowrap">
          <Counter value={value} decimals={decimals} />
          {suffix}
        </span>
        {stars && (
          <Star
            className="ml-1.5 size-3.5 translate-y-[-1px] text-gold-400"
            fill="currentColor"
            strokeWidth={0}
          />
        )}
      </p>
      <p className="mt-1 text-[12px] leading-snug whitespace-nowrap text-ink-300 sm:text-[12.5px]">
        {labelWide ? (
          <>
            <span className="sm:hidden">{label}</span>
            <span className="hidden sm:inline">{labelWide}</span>
          </>
        ) : (
          label
        )}
      </p>
    </div>
  );
}
