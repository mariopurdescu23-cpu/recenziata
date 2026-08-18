"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Heart,
  Loader2,
  RotateCcw,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { LogoMark } from "@/components/brand/logo";
import { useDemo } from "@/lib/demo-store";
import type { FeedbackCategory } from "@/lib/data";
import { cn } from "@/lib/utils";

type Step = "intro" | "positive" | "reasons" | "sending" | "sent" | "google" | "done";

const reasons: Array<{ id: FeedbackCategory; label: string; message: string }> = [
  { id: "Timp de așteptare", label: "Timpul de așteptare", message: "Timpul de așteptare a fost prea mare." },
  { id: "Calitate", label: "Calitatea", message: "Calitatea nu a fost la nivelul așteptat." },
  { id: "Personal", label: "Personalul", message: "Interacțiunea cu personalul putea fi mai bună." },
  { id: "Curățenie", label: "Curățenia", message: "Curățenia putea fi mai bună." },
  { id: "Altceva", label: "Altceva", message: "Am avut o observație despre experiență." },
];

const ease = [0.22, 1, 0.36, 1] as const;

const variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 34, scale: 0.985 }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (dir: number) => ({ opacity: 0, x: dir * -26, scale: 0.99 }),
};

export function FeedbackFlow({
  businessName = "Maison Noir",
  businessType = "Restaurant · Timișoara",
  compact = false,
  onComplete,
  onReset,
  className,
}: {
  businessName?: string;
  businessType?: string;
  /** true când rulează în interiorul simulatorului de telefon */
  compact?: boolean;
  onComplete?: (payload: { sentiment: "pozitiv" | "negativ"; category: FeedbackCategory }) => void;
  onReset?: () => void;
  className?: string;
}) {
  const [step, setStep] = useState<Step>("intro");
  const [dir, setDir] = useState(1);
  const [reason, setReason] = useState<FeedbackCategory | null>(null);
  const [note, setNote] = useState("");
  const [stars, setStars] = useState(0);
  const submitted = useRef(false);
  const { addFeedback } = useDemo();

  const goto = useCallback((next: Step, direction = 1) => {
    setDir(direction);
    setStep(next);
  }, []);

  const reset = useCallback(() => {
    submitted.current = false;
    setReason(null);
    setNote("");
    setStars(0);
    setDir(-1);
    setStep("intro");
    onReset?.();
  }, [onReset]);

  const submitNegative = useCallback(() => {
    if (!reason) return;
    goto("sending");
    const picked = reasons.find((r) => r.id === reason)!;
    window.setTimeout(() => {
      if (!submitted.current) {
        submitted.current = true;
        addFeedback({
          sentiment: "negativ",
          category: reason,
          message: note.trim() || picked.message,
          wentToGoogle: false,
        });
        onComplete?.({ sentiment: "negativ", category: reason });
      }
      goto("sent");
    }, 1150);
  }, [reason, note, addFeedback, goto, onComplete]);

  const goToGoogle = useCallback(() => {
    goto("google");
  }, [goto]);

  const publishReview = useCallback(() => {
    if (!submitted.current) {
      submitted.current = true;
      addFeedback({
        sentiment: "pozitiv",
        category: "Apreciere",
        message: "Clientul a apreciat experiența.",
        wentToGoogle: true,
      });
      onComplete?.({ sentiment: "pozitiv", category: "Apreciere" });
    }
    goto("done");
  }, [addFeedback, goto, onComplete]);

  const pad = compact ? "px-[7.5%]" : "px-6";

  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-col overflow-hidden bg-ivory-100",
        className,
      )}
    >
      {/* fundal: halou auriu foarte discret */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-24 h-64 opacity-70"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 0%, rgba(210,171,99,0.18), transparent 70%)",
        }}
      />
      <div className="bg-grid-light pointer-events-none absolute inset-0 opacity-40" />

      {/* header */}
      <header
        className={cn(
          "relative z-10 flex shrink-0 items-center justify-between",
          pad,
          compact ? "pt-[15%] pb-[3%]" : "pt-6 pb-3",
        )}
      >
        <div className="flex min-w-0 items-center gap-2.5">
          <LogoMark className={cn("shrink-0", compact ? "size-[10cqw]" : "size-8")} />
          <div className="min-w-0 leading-tight">
            <p
              className={cn(
                "tight truncate font-medium text-ink-950",
                compact ? "text-[4.9cqw]" : "text-[15px]",
              )}
            >
              {businessName}
            </p>
            <p
              className={cn(
                "truncate text-ink-300",
                compact ? "text-[3.7cqw]" : "text-[11.5px]",
              )}
            >
              {businessType}
            </p>
          </div>
        </div>
      </header>

      {/* conținut */}
      <div className="relative z-10 flex min-h-0 flex-1 items-center">
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.div
            key={step}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.42, ease }}
            className={cn("w-full", pad)}
          >
            {step === "intro" && (
              <Intro
                compact={compact}
                onYes={() => goto("positive")}
                onNo={() => goto("reasons")}
              />
            )}
            {step === "positive" && (
              <Positive
                compact={compact}
                onGoogle={goToGoogle}
                onBack={() => goto("intro", -1)}
              />
            )}
            {step === "reasons" && (
              <Reasons
                compact={compact}
                reason={reason}
                setReason={setReason}
                note={note}
                setNote={setNote}
                onSubmit={submitNegative}
                onBack={() => goto("intro", -1)}
              />
            )}
            {step === "sending" && <Sending compact={compact} />}
            {step === "sent" && (
              <Sent compact={compact} onGoogle={() => goto("google")} />
            )}
            {step === "google" && (
              <GoogleScreen
                compact={compact}
                businessName={businessName}
                stars={stars}
                setStars={setStars}
                onDone={publishReview}
              />
            )}
            {step === "done" && <Done compact={compact} onReset={reset} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* footer */}
      <footer
        className={cn(
          "relative z-10 flex shrink-0 items-center justify-between",
          pad,
          compact ? "pb-[6%] text-[3.4cqw]" : "pb-6 text-[11px]",
        )}
      >
        <span className="inline-flex items-center gap-1.5 text-ink-300">
          <ShieldCheck className={compact ? "size-[3.4cqw]" : "size-3.5"} strokeWidth={1.8} />
          Feedback anonim
        </span>
        {step !== "intro" ? (
          <button
            onClick={reset}
            className="inline-flex items-center gap-1.5 text-ink-300 transition hover:text-ink-900"
          >
            <RotateCcw className={compact ? "size-[3.2cqw]" : "size-3"} strokeWidth={1.8} />
            Reia
          </button>
        ) : (
          <span className="text-ink-300">
            Recenziata<span className="text-gold-500">.ro</span>
          </span>
        )}
      </footer>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Ecrane                                                                    */
/* -------------------------------------------------------------------------- */

function Title({ compact, children }: { compact?: boolean; children: React.ReactNode }) {
  return (
    <h2
      className={cn(
        "tight font-medium text-ink-950",
        compact ? "text-[7.7cqw] leading-[1.18]" : "text-[26px] leading-[1.14] sm:text-[30px]",
      )}
    >
      {children}
    </h2>
  );
}

function Sub({ compact, children }: { compact?: boolean; children: React.ReactNode }) {
  return (
    <p
      className={cn(
        "text-ink-400",
        compact ? "mt-[2cqw] text-[4.4cqw] leading-snug" : "mt-3 text-[15px] leading-relaxed",
      )}
    >
      {children}
    </p>
  );
}

function BigButton({
  children,
  onClick,
  tone = "primary",
  compact,
  disabled,
  icon,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  tone?: "primary" | "secondary" | "gold";
  compact?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.975 }}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex w-full items-center justify-center gap-2 rounded-2xl font-medium transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:cursor-not-allowed disabled:opacity-45",
        compact ? "h-[17cqw] text-[5cqw] rounded-[4.5cqw]" : "h-[56px] text-[15px]",
        tone === "primary" &&
          "bg-ink-950 text-ivory-100 shadow-[0_10px_28px_-12px_rgba(8,8,10,0.6)] hover:bg-ink-800",
        tone === "secondary" &&
          "border border-ink-100 bg-white text-ink-800 hover:border-ink-200 hover:bg-ivory-50",
        tone === "gold" &&
          "bg-gradient-to-b from-gold-300 to-gold-500 text-ink-950 shadow-[0_12px_30px_-14px_rgba(189,145,71,0.9)] hover:from-gold-200 hover:to-gold-400",
      )}
    >
      {icon}
      {children}
    </motion.button>
  );
}

function Intro({
  compact,
  onYes,
  onNo,
}: {
  compact?: boolean;
  onYes: () => void;
  onNo: () => void;
}) {
  return (
    <div>
      <Title compact={compact}>Cum a fost experiența ta?</Title>
      <Sub compact={compact}>
        Durează 10 secunde și ne ajută să facem lucrurile mai bine.
      </Sub>
      <div className={cn("flex flex-col", compact ? "mt-[6cqw] gap-[2.4cqw]" : "mt-8 gap-3")}>
        <BigButton compact={compact} onClick={onYes} tone="primary">
          Da, mi-a plăcut
        </BigButton>
        <BigButton compact={compact} onClick={onNo} tone="secondary">
          Aș fi vrut să fie mai bine
        </BigButton>
      </div>
    </div>
  );
}

function Positive({
  compact,
  onGoogle,
  onBack,
}: {
  compact?: boolean;
  onGoogle: () => void;
  onBack: () => void;
}) {
  return (
    <div>
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.55, ease, delay: 0.06 }}
        className={cn(
          "grid place-items-center rounded-2xl bg-gold-400/12 ring-1 ring-gold-400/22 ring-inset",
          compact ? "size-[16cqw]" : "size-14",
        )}
      >
        <Heart
          className={cn("text-gold-500", compact ? "size-[8cqw]" : "size-7")}
          strokeWidth={1.6}
          fill="currentColor"
          fillOpacity={0.14}
        />
      </motion.div>
      <div className={compact ? "mt-[5cqw]" : "mt-6"}>
        <Title compact={compact}>Ne bucurăm.</Title>
        <Sub compact={compact}>
          Vrei să împărtășești experiența ta pe Google? Ajută alți clienți să ne
          găsească.
        </Sub>
      </div>
      <div className={cn("flex flex-col", compact ? "mt-[6cqw] gap-[2.4cqw]" : "mt-8 gap-3")}>
        <BigButton compact={compact} onClick={onGoogle} tone="primary" icon={<GoogleG compact={compact} />}>
          Lasă o recenzie pe Google
        </BigButton>
        <button
          onClick={onBack}
          className={cn(
            "inline-flex items-center justify-center gap-1.5 text-ink-300 transition hover:text-ink-800",
            compact ? "text-[4.3cqw]" : "text-[13.5px]",
          )}
        >
          <ArrowLeft className={compact ? "size-[3.6cqw]" : "size-3.5"} />
          Înapoi
        </button>
      </div>
    </div>
  );
}

function Reasons({
  compact,
  reason,
  setReason,
  note,
  setNote,
  onSubmit,
  onBack,
}: {
  compact?: boolean;
  reason: FeedbackCategory | null;
  setReason: (r: FeedbackCategory) => void;
  note: string;
  setNote: (v: string) => void;
  onSubmit: () => void;
  onBack: () => void;
}) {
  return (
    <div>
      <Title compact={compact}>Îți mulțumim pentru sinceritate.</Title>
      <Sub compact={compact}>Ce am putea îmbunătăți?</Sub>

      <div
        role="radiogroup"
        aria-label="Motivul nemulțumirii"
        className={cn("flex flex-col", compact ? "mt-[4cqw] gap-[1.6cqw]" : "mt-6 gap-2")}
      >
        {reasons.map((r, i) => {
          const active = reason === r.id;
          return (
            <motion.button
              key={r.id}
              role="radio"
              aria-checked={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.04 * i + 0.05, duration: 0.4, ease }}
              whileTap={{ scale: 0.985 }}
              onClick={() => setReason(r.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl border text-left transition-all duration-250",
                compact ? "h-[15.5cqw] px-[3.5cqw] text-[4.7cqw] rounded-[4cqw]" : "h-[52px] px-4 text-[14.5px]",
                active
                  ? "border-ink-950 bg-white shadow-[0_8px_24px_-14px_rgba(8,8,10,0.45)]"
                  : "border-ink-100 bg-white/70 hover:border-ink-200 hover:bg-white",
              )}
            >
              <span
                className={cn(
                  "relative grid shrink-0 place-items-center rounded-full border transition-colors",
                  compact ? "size-[6cqw]" : "size-[19px]",
                  active ? "border-ink-950 bg-ink-950" : "border-ink-200 bg-white",
                )}
              >
                <AnimatePresence>
                  {active && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.22, ease }}
                    >
                      <Check
                        className={cn("text-ivory-100", compact ? "size-[3.2cqw]" : "size-3")}
                        strokeWidth={3}
                      />
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
              <span className={active ? "text-ink-950" : "text-ink-600"}>{r.label}</span>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {reason && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.38, ease }}
            className="overflow-hidden"
          >
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value.slice(0, 180))}
              placeholder="Vrei să adaugi un detaliu? (opțional)"
              rows={compact ? 2 : 3}
              className={cn(
                "w-full resize-none rounded-xl border border-ink-100 bg-white text-ink-900 placeholder:text-ink-300 focus:border-ink-300 focus:outline-none",
                compact ? "mt-[2.4cqw] p-[3cqw] text-[4.3cqw]" : "mt-4 p-3.5 text-[14px]",
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className={cn("flex flex-col", compact ? "mt-[3cqw] gap-[1.8cqw]" : "mt-5 gap-2.5")}>
        <BigButton
          compact={compact}
          onClick={onSubmit}
          disabled={!reason}
          tone="primary"
          icon={<Send className={compact ? "size-[4.4cqw]" : "size-4"} strokeWidth={1.8} />}
        >
          Trimite feedback-ul
        </BigButton>
        <button
          onClick={onBack}
          className={cn(
            "inline-flex items-center justify-center gap-1.5 text-ink-300 transition hover:text-ink-800",
            compact ? "text-[4.1cqw]" : "text-[13px]",
          )}
        >
          <ArrowLeft className={compact ? "size-[3.6cqw]" : "size-3.5"} />
          Înapoi
        </button>
      </div>
    </div>
  );
}

function Sending({ compact }: { compact?: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <Loader2
        className={cn("animate-spin text-ink-300", compact ? "size-[10cqw]" : "size-8")}
        strokeWidth={1.6}
      />
      <p
        className={cn(
          "mt-4 text-ink-400",
          compact ? "text-[4.4cqw]" : "text-[14.5px]",
        )}
      >
        Se trimite feedback-ul…
      </p>
    </div>
  );
}

function Sent({ compact, onGoogle }: { compact?: boolean; onGoogle: () => void }) {
  return (
    <div>
      <motion.div
        initial={{ scale: 0.55, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease }}
        className={cn(
          "relative grid place-items-center rounded-2xl bg-positive-50 ring-1 ring-positive-500/18 ring-inset",
          compact ? "size-[16cqw]" : "size-14",
        )}
      >
        <span className="absolute inset-0 rounded-2xl bg-positive-400/25 animate-pulse-ring" />
        <svg
          viewBox="0 0 24 24"
          className={cn("relative text-positive-500", compact ? "size-[8cqw]" : "size-7")}
          fill="none"
        >
          <motion.path
            d="M4.5 12.5 9.5 17.5 19.5 7.5"
            stroke="currentColor"
            strokeWidth="2.1"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.55, ease, delay: 0.15 }}
          />
        </svg>
      </motion.div>

      <div className={compact ? "mt-[5cqw]" : "mt-6"}>
        <Title compact={compact}>Feedback-ul tău a fost trimis.</Title>
        <Sub compact={compact}>
          A ajuns direct la echipă. Dacă dorești, poți lăsa și o recenzie pe
          Google — părerea ta contează la fel de mult acolo.
        </Sub>
      </div>

      <div className={cn("flex flex-col", compact ? "mt-[6cqw] gap-[2.4cqw]" : "mt-8 gap-3")}>
        <BigButton compact={compact} onClick={onGoogle} tone="primary" icon={<GoogleG compact={compact} />}>
          Continuă către Google
        </BigButton>
      </div>
    </div>
  );
}

function GoogleScreen({
  compact,
  businessName,
  stars,
  setStars,
  onDone,
}: {
  compact?: boolean;
  businessName: string;
  stars: number;
  setStars: (n: number) => void;
  onDone: () => void;
}) {
  useEffect(() => {
    const t = window.setTimeout(() => setStars(5), 700);
    return () => window.clearTimeout(t);
  }, [setStars]);

  return (
    <div className="rounded-2xl border border-ink-100 bg-white p-[6%] shadow-[0_18px_50px_-26px_rgba(8,8,10,0.35)]">
      <div className="flex items-center gap-2.5">
        <GoogleG compact={compact} size={compact ? 14 : 18} />
        <span
          className={cn(
            "font-medium text-ink-400",
            compact ? "text-[3.9cqw]" : "text-[12.5px]",
          )}
        >
          Google · Scrie o recenzie
        </span>
      </div>

      <p
        className={cn(
          "tight mt-3 font-medium text-ink-950",
          compact ? "text-[5.6cqw]" : "text-[19px]",
        )}
      >
        {businessName}
      </p>
      <p className={cn("text-ink-300", compact ? "text-[3.8cqw]" : "text-[12px]")}>
        Restaurant · Timișoara
      </p>

      <div className={cn("flex gap-1", compact ? "mt-[3.6cqw]" : "mt-5")}>
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.button
            key={i}
            onClick={() => setStars(i)}
            aria-label={`${i} stele`}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{
              scale: stars >= i ? 1 : 0.94,
              opacity: 1,
            }}
            transition={{ delay: 0.7 + i * 0.07, duration: 0.35, ease }}
          >
            <Star
              className={cn(
                compact ? "size-[9.5cqw]" : "size-9",
                stars >= i ? "text-gold-400" : "text-ink-100",
              )}
              fill="currentColor"
              strokeWidth={0}
            />
          </motion.button>
        ))}
      </div>

      <div
        className={cn(
          "rounded-xl border border-ink-100 bg-ivory-50 text-ink-300",
          compact ? "mt-[3.6cqw] p-[3cqw] text-[3.9cqw]" : "mt-5 p-4 text-[13px]",
        )}
      >
        Spune-le altora despre experiența ta…
      </div>

      <div className={compact ? "mt-[3.6cqw]" : "mt-5"}>
        <BigButton compact={compact} onClick={onDone} tone="primary">
          Publică recenzia
        </BigButton>
      </div>
      <p
        className={cn(
          "text-center text-ink-300",
          compact ? "mt-[2.4cqw] text-[3.3cqw]" : "mt-3 text-[11px]",
        )}
      >
        Ecran simulat pentru demonstrație
      </p>
    </div>
  );
}

function Done({ compact, onReset }: { compact?: boolean; onReset: () => void }) {
  return (
    <div className="text-center">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease }}
        className={cn(
          "mx-auto grid place-items-center rounded-2xl bg-gold-400/12 ring-1 ring-gold-400/22 ring-inset",
          compact ? "size-[16cqw]" : "size-14",
        )}
      >
        <Sparkles
          className={cn("text-gold-500", compact ? "size-[8cqw]" : "size-7")}
          strokeWidth={1.6}
        />
      </motion.div>
      <div className={compact ? "mt-[5cqw]" : "mt-6"}>
        <Title compact={compact}>Mulțumim.</Title>
        <Sub compact={compact}>
          Recenzia ta a fost publicată, iar feedback-ul a ajuns la echipă.
        </Sub>
      </div>
      <button
        onClick={onReset}
        className={cn(
          "mx-auto mt-6 inline-flex items-center gap-1.5 rounded-full border border-ink-100 bg-white px-4 py-2 text-ink-500 transition hover:border-ink-200 hover:text-ink-900",
          compact ? "text-[4.1cqw]" : "text-[13px]",
        )}
      >
        <ArrowRight className={compact ? "size-[3.6cqw]" : "size-3.5"} />
        Reia demonstrația
      </button>
    </div>
  );
}

/* Marca Google — reprezentare simplificată, doar pentru demonstrație */
function GoogleG({ compact, size }: { compact?: boolean; size?: number }) {
  const s = size ?? (compact ? 14 : 17);
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" aria-hidden className="shrink-0">
      <path
        fill="#4285F4"
        d="M23.5 12.3c0-.9-.1-1.7-.2-2.5H12v4.8h6.5a5.6 5.6 0 0 1-2.4 3.7v3h3.9c2.3-2.1 3.5-5.2 3.5-9Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.2-4 1.2-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.4 14.4a7.2 7.2 0 0 1 0-4.6V6.7H1.4a12 12 0 0 0 0 10.8l4-3.1Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4C17.9 1.2 15.2 0 12 0 7.4 0 3.4 2.6 1.4 6.7l4 3.1C6.3 6.9 8.9 4.8 12 4.8Z"
      />
    </svg>
  );
}
