"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  ArrowRight,
  CreditCard,
  Lock,
  MessageSquareQuote,
  Play,
  Radio,
  Star,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { LogoMark } from "@/components/brand/logo";
import { PhoneFrame } from "@/components/product/phone-frame";
import { FeedbackFlow } from "@/components/product/feedback-flow";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/primitives";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import { Glow } from "@/components/ui/glow";

const ease = [0.22, 1, 0.36, 1] as const;

const steps = [
  {
    id: "card",
    label: "Card NFC",
    title: "Clientul atinge cardul",
    body: "Cardul de aluminiu stă pe masă sau la recepție. O atingere — fără aplicație, fără cont.",
    icon: CreditCard,
  },
  {
    id: "scan",
    label: "Scanare",
    title: "Se deschide pagina afacerii",
    body: "URL unic, verificare de abonament și pagina personalizată, în mai puțin de o secundă.",
    icon: Radio,
  },
  {
    id: "feedback",
    label: "Feedback",
    title: "Răspunde la o singură întrebare",
    body: "Dacă ceva nu a mers bine, alege motivul. Contextul ajunge instant în dashboard.",
    icon: MessageSquareQuote,
  },
  {
    id: "google",
    label: "Recenzie Google",
    title: "Ajunge pe Google",
    body: "Indiferent de răspuns. Nu filtrăm nimic — doar aflăm ce s-a întâmplat înainte.",
    icon: Star,
  },
] as const;

export function InteractiveDemo() {
  const [index, setIndex] = useState(0);
  const [live, setLive] = useState(false);
  const [auto, setAuto] = useState(true);
  const { toast } = useToast();
  const sectionRef = useRef<HTMLElement>(null);
  // Fără asta, secțiunea și-ar reface starea la fiecare 3,4 s chiar și când
  // utilizatorul citește cu totul altă parte a paginii.
  const inView = useInView(sectionRef, { margin: "-15% 0px -15% 0px" });

  useEffect(() => {
    if (!auto || live || !inView) return;
    const t = window.setTimeout(() => setIndex((i) => (i + 1) % steps.length), 3600);
    return () => window.clearTimeout(t);
  }, [auto, live, index, inView]);

  const startLive = useCallback(() => {
    setAuto(false);
    setLive(true);
    setIndex(2);
  }, []);

  const select = useCallback((i: number) => {
    setAuto(false);
    setLive(false);
    setIndex(i);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="demo"
      className="relative overflow-hidden border-t border-white/[0.06] bg-ink-950 py-20 sm:py-28"
    >
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" />
      <Glow className="top-1/2 right-0 h-[34rem] w-[40rem] -translate-y-1/2 translate-x-1/4" tone="goldSoft" opacity={0.55} />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-7 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-14">
          <div className="order-2 lg:order-1">
          <div className="max-w-2xl">
          <Eyebrow onDark>Demonstrație live</Eyebrow>
          <h2 className="tighter mt-5 text-[clamp(1.85rem,4.6vw,3rem)] leading-[1.06] font-medium text-ivory-100">
            De la atingere la recenzie
            <br className="hidden sm:block" />{" "}
            <span className="display italic text-gold-300">în câteva secunde.</span>
          </h2>
          <p className="mt-5 max-w-lg text-[15.5px] leading-relaxed text-ink-200">
            Patru pași, fără fricțiune. Apasă „Testează fluxul” și parcurge exact
            ce vede clientul tău — feedback-ul ajunge apoi în dashboard.
          </p>
        </div>

            <ol className="relative mt-12">
              <div
                aria-hidden
                className="absolute top-2 bottom-2 left-[19px] w-px bg-white/[0.08]"
              />
              <motion.div
                aria-hidden
                className="absolute left-[19px] w-px bg-gradient-to-b from-gold-300 to-gold-600"
                initial={false}
                animate={{
                  top: 8,
                  height: `calc(${(index / (steps.length - 1)) * 100}% - ${(index / (steps.length - 1)) * 16}px)`,
                }}
                transition={{ duration: 0.7, ease }}
              />
              {steps.map((s, i) => {
                const active = i === index;
                const past = i < index;
                const Icon = s.icon;
                return (
                  <li key={s.id} className="relative">
                    <button
                      onClick={() => select(i)}
                      className="group flex w-full gap-4 py-3.5 text-left sm:gap-5 sm:py-4"
                    >
                      <span
                        className={cn(
                          "relative z-10 grid size-10 shrink-0 place-items-center rounded-xl border transition-all duration-500",
                          active
                            ? "border-gold-400/40 bg-gold-400/12 text-gold-300"
                            : past
                              ? "border-white/12 bg-ink-800 text-ink-200"
                              : "border-white/[0.08] bg-ink-900 text-ink-400 group-hover:border-white/20 group-hover:text-ink-200",
                        )}
                      >
                        {active && (
                          <motion.span
                            layoutId="step-glow"
                            className="absolute inset-0 rounded-xl"
                            style={{
                              boxShadow:
                                "0 0 0 1px rgba(210,171,99,0.28), 0 12px 40px -14px rgba(210,171,99,0.6)",
                            }}
                            transition={{ duration: 0.5, ease }}
                          />
                        )}
                        <Icon className="relative size-[18px]" strokeWidth={1.7} />
                      </span>
                      <span className="min-w-0 flex-1 pt-0.5">
                        <span className="flex items-baseline gap-2.5">
                          <span
                            className={cn(
                              "eyebrow transition-colors",
                              active ? "text-gold-300" : "text-ink-400",
                            )}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span
                            className={cn(
                              "tight text-[16px] font-medium transition-colors sm:text-[17px]",
                              active ? "text-ivory-100" : "text-ink-200",
                            )}
                          >
                            {s.title}
                          </span>
                        </span>
                        <AnimatePresence initial={false}>
                          {active && (
                            <motion.span
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.45, ease }}
                              className="block overflow-hidden"
                            >
                              <span className="block max-w-md pt-1.5 text-[14px] leading-relaxed text-ink-300">
                                {s.body}
                              </span>
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Button onClick={startLive} variant="gold" size="lg" sheen className="w-full sm:w-auto">
                <Play className="size-4" fill="currentColor" strokeWidth={0} />
                Testează fluxul
              </Button>
              <Button
                href="/maison-noir"
                variant="outlineLight"
                size="lg"
                className="w-full sm:w-auto"
              >
                Deschide pagina reală
                <ArrowRight className="size-4" />
              </Button>
            </div>

            {live && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 flex items-center gap-2 text-[13px] text-ink-300"
              >
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-gold-400 opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-gold-400" />
                </span>
                Simulator activ — răspunde ca un client real.
              </motion.p>
            )}
          </div>

          {/* Telefon */}
          <div className="order-1 flex flex-col items-center gap-4 lg:order-2">
            {/* Reper de context pentru mobil — fără el, telefonul apare înaintea
                explicației și nu se știe ce pas se vede. */}
            <div className="flex items-center gap-2.5 lg:hidden">
              <span className="eyebrow text-gold-300">
                {live ? "Live" : `${String(index + 1).padStart(2, "0")}/${String(steps.length).padStart(2, "0")}`}
              </span>
              <span className="h-3 w-px bg-white/15" />
              <span className="text-[12.5px] font-medium text-ivory-100">
                {live ? "Simulator activ" : steps[index].title}
              </span>
            </div>

            <div className="relative">
              <Glow className="-inset-16" tone="goldSoft" opacity={0.8} />
              <PhoneFrame className="relative w-[252px] sm:w-[292px]">
                {live ? (
                  <FeedbackFlow
                    compact
                    onComplete={({ sentiment, category }) =>
                      toast({
                        title: "Feedback înregistrat",
                        description:
                          sentiment === "negativ"
                            ? `Motiv: ${category}. Apare deja în dashboard.`
                            : "Client mulțumit — redirecționat către Google.",
                        action: { label: "Deschide dashboard-ul", href: "/dashboard" },
                      })
                    }
                  />
                ) : (
                  <ScriptedScreen step={steps[index].id} />
                )}
              </PhoneFrame>
            </div>

            {/* Progres tapabil, la îndemâna degetului mare — evită derularea
                până la listă doar ca să schimbi pasul. */}
            {!live && (
              <div className="flex items-center gap-1.5 lg:hidden">
                {steps.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => select(i)}
                    aria-label={`Pasul ${i + 1}: ${s.title}`}
                    aria-current={i === index}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      i === index ? "w-5 bg-gold-400" : "w-1.5 bg-white/20",
                    )}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Ecrane scriptate pentru pașii 1, 2 și 4                                   */
/* -------------------------------------------------------------------------- */

function ScriptedScreen({ step }: { step: (typeof steps)[number]["id"] }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease }}
        className="h-full w-full"
      >
        {step === "card" && <LockScreen />}
        {step === "scan" && <LoadingScreen />}
        {step === "feedback" && <FeedbackFlow compact />}
        {step === "google" && <GoogleResult />}
      </motion.div>
    </AnimatePresence>
  );
}

function LockScreen() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#12121a]">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 30% 10%, rgba(210,171,99,0.16), transparent 60%), radial-gradient(100% 70% at 80% 90%, rgba(70,70,90,0.5), transparent 60%)",
        }}
      />
      <div className="relative flex h-full flex-col items-center pt-[22%]">
        <p className="text-[11px] text-white/50">luni, 17 august</p>
        <p className="tnum tighter mt-1 text-[54px] leading-none font-light text-white">
          9:41
        </p>

        {/* undele NFC */}
        <div className="relative mt-[16%] flex size-20 items-center justify-center">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="emit-ring absolute top-1/2 left-1/2 size-[88px] rounded-full border border-gold-300/45"
              style={{ animationDelay: `${i * 0.9}s`, animationDuration: "2.6s" }}
            />
          ))}
          <span className="relative grid size-11 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/15 backdrop-blur">
            <Radio className="size-5 text-gold-300" strokeWidth={1.6} />
          </span>
        </div>

        {/* banner NFC */}
        <motion.div
          initial={{ y: 22, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.6, ease }}
          className="mt-auto mb-[9%] w-[86%] rounded-2xl border border-white/12 bg-white/[0.13] p-3 backdrop-blur-md"
        >
          <div className="flex items-center gap-2.5">
            <LogoMark className="size-8" />
            <div className="min-w-0 flex-1">
              <p className="text-[11px] leading-tight font-medium text-white">
                Recenziata.ro
              </p>
              <p className="truncate text-[9.5px] text-white/55">
                recenziata.ro/maison-noir
              </p>
            </div>
            <span className="rounded-full bg-white px-2.5 py-1 text-[9.5px] font-medium text-ink-950">
              Deschide
            </span>
          </div>
        </motion.div>

        <div className="mb-[6%] flex items-center gap-1.5 text-[9.5px] text-white/45">
          <Lock className="size-2.5" strokeWidth={2} />
          Ținut aproape de card
        </div>
      </div>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="flex h-full w-full flex-col bg-ivory-100">
      {/* bara de browser */}
      <div className="mt-[6.5%] px-[6%] pt-[3%]">
        <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-[0_1px_2px_rgba(8,8,10,0.06)]">
          <Lock className="size-2.5 text-ink-300" strokeWidth={2.4} />
          <span className="text-[10px] text-ink-500">recenziata.ro/maison-noir</span>
        </div>
        <div className="relative mt-2 h-[2px] overflow-hidden rounded-full bg-ink-100">
          <motion.div
            className="absolute inset-y-0 left-0 w-full origin-left bg-gold-400"
            initial={{ scaleX: 0.08 }}
            animate={{ scaleX: [0.08, 0.72, 1] }}
            transition={{ duration: 1.5, ease, repeat: Infinity }}
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center gap-3 px-[7.5%]">
        <div className="skeleton h-6 w-8 rounded-lg" />
        <div className="skeleton h-4 w-[85%] rounded-md" />
        <div className="skeleton h-4 w-[62%] rounded-md" />
        <div className="mt-3 space-y-2">
          <div className="skeleton h-[42px] rounded-2xl" />
          <div className="skeleton h-[42px] rounded-2xl" />
        </div>
      </div>

      <div className="px-[7.5%] pb-[9%]">
        <p className="text-center text-[9px] text-ink-300">
          Verificăm abonamentul afacerii…
        </p>
      </div>
    </div>
  );
}

function GoogleResult() {
  return (
    <div className="flex h-full w-full flex-col bg-white">
      <div className="mt-[6.5%] flex items-center gap-2 px-[6%] pt-[3%]">
        <Lock className="size-2.5 text-ink-300" strokeWidth={2.4} />
        <span className="text-[10px] text-ink-400">google.com</span>
      </div>

      <div className="flex-1 px-[7%] pt-[6%]">
        <div className="flex items-baseline gap-2">
          <span className="tight text-[15px] font-medium text-ink-950">Maison Noir</span>
        </div>
        <div className="mt-1.5 flex items-center gap-1.5">
          <span className="tnum text-[13px] font-medium text-ink-900">4,8</span>
          <span className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.span
                key={i}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.06, duration: 0.3, ease }}
              >
                <Star className="size-3 text-gold-400" fill="currentColor" strokeWidth={0} />
              </motion.span>
            ))}
          </span>
          <span className="text-[10px] text-ink-300">313 recenzii</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5, ease }}
          className="mt-4 rounded-xl border border-positive-500/20 bg-positive-50 p-3"
        >
          <p className="text-[10px] font-medium text-positive-500">
            Recenzia ta a fost publicată
          </p>
          <p className="mt-1 text-[9.5px] leading-snug text-ink-400">
            Apare public în profilul afacerii în câteva minute.
          </p>
        </motion.div>

        <div className="mt-4 space-y-2.5">
          {[
            { n: "Ioana P.", t: "Serviciu impecabil și un meniu bine gândit." },
            { n: "Radu M.", t: "Atmosfera și atenția la detalii au făcut diferența." },
          ].map((r, i) => (
            <motion.div
              key={r.n}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.12, duration: 0.45, ease }}
              className="rounded-xl border border-ink-100 p-2.5"
            >
              <div className="flex items-center gap-2">
                <span className="grid size-5 place-items-center rounded-full bg-ink-100 text-[8px] font-medium text-ink-500">
                  {r.n[0]}
                </span>
                <span className="text-[9.5px] font-medium text-ink-800">{r.n}</span>
                <span className="ml-auto flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className="size-2 text-gold-400"
                      fill="currentColor"
                      strokeWidth={0}
                    />
                  ))}
                </span>
              </div>
              <p className="mt-1.5 text-[9px] leading-snug text-ink-400">{r.t}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <p className="pb-[8%] text-center text-[8.5px] text-ink-300">
        Ecran simulat pentru demonstrație
      </p>
    </div>
  );
}
