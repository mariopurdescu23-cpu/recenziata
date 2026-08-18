"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Eye, EyeOff, Loader2, Star } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/brand/logo";
import { cn } from "@/lib/utils";
import { Glow } from "@/components/ui/glow";

const ease = [0.22, 1, 0.36, 1] as const;

type State = "idle" | "loading" | "done" | "error";

export function LoginView() {
  const router = useRouter();
  const [email, setEmail] = useState("andrei@maisonnoir.ro");
  const [password, setPassword] = useState("demo1234");
  const [show, setShow] = useState(false);
  const [state, setState] = useState<State>("idle");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "loading") return;
    if (!email.includes("@") || password.length < 4) {
      setState("error");
      return;
    }
    setState("loading");
    window.setTimeout(() => {
      setState("done");
      window.setTimeout(() => router.push("/dashboard"), 700);
    }, 1100);
  }

  return (
    <div className="grid min-h-dvh lg:grid-cols-[1.05fr_1fr]">
      {/* ---------- Panou stânga ---------- */}
      <aside className="relative hidden overflow-hidden bg-ink-950 lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
        <Glow className="-top-40 -left-28 h-[34rem] w-[34rem]" opacity={0.7} />

        <div className="relative">
          <Logo onDark />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="relative max-w-lg"
        >
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className="size-4 text-gold-400"
                fill="currentColor"
                strokeWidth={0}
              />
            ))}
          </div>
          <p className="display mt-6 text-[clamp(1.6rem,2.6vw,2.15rem)] leading-[1.22] text-ivory-100 italic">
            „Am trecut de la 3–4 recenzii pe lună la peste 30. Dar ce a contat cu
            adevărat a fost să aflăm că problema era ora 13:00, nu bucătăria.”
          </p>
          <div className="mt-7 flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-full bg-white/[0.07] text-[12px] font-medium text-ivory-100 ring-1 ring-white/10 ring-inset">
              AM
            </span>
            <div>
              <p className="text-[13.5px] font-medium text-ivory-100">Andrei Munteanu</p>
              <p className="text-[12px] text-ink-400">Administrator, Maison Noir</p>
            </div>
          </div>
        </motion.div>

        <div className="relative flex items-center gap-8 border-t border-white/[0.07] pt-6">
          {[
            { v: "428", l: "afaceri active" },
            { v: "214k", l: "scanări procesate" },
            { v: "4,9", l: "rating mediu" },
          ].map((s) => (
            <div key={s.l}>
              <p className="tight text-[19px] font-medium text-ivory-100">{s.v}</p>
              <p className="mt-0.5 text-[12px] text-ink-400">{s.l}</p>
            </div>
          ))}
        </div>
      </aside>

      {/* ---------- Formular ---------- */}
      <main className="relative flex flex-col justify-center bg-ivory-100 px-5 py-10 sm:px-10">
        <div className="bg-grid-light pointer-events-none absolute inset-0 opacity-40" />

        <div className="relative mx-auto w-full max-w-[400px]">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[13px] text-ink-400 transition-colors hover:text-ink-950"
          >
            <ArrowLeft className="size-3.5" />
            Înapoi la site
          </Link>

          <div className="mt-8 lg:hidden">
            <Logo />
          </div>

          <h1 className="tight mt-8 text-[28px] leading-tight font-medium text-ink-950">
            Bine ai revenit.
          </h1>
          <p className="mt-2 text-[14.5px] text-ink-400">
            Intră în cont pentru a-ți vedea scanările și feedback-ul.
          </p>

          <form onSubmit={submit} className="mt-8 space-y-4">
            <Field label="E-mail">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setState("idle");
                }}
                autoComplete="email"
                className="h-12 w-full rounded-xl border border-ivory-400 bg-white px-4 text-[14.5px] text-ink-900 transition-colors placeholder:text-ink-300 focus:border-ink-400 focus:outline-none"
                placeholder="adresa@afacerea-ta.ro"
              />
            </Field>

            <Field
              label="Parolă"
              aside={
                <Link
                  href="/autentificare"
                  className="text-[12.5px] text-ink-400 underline-offset-4 transition-colors hover:text-ink-950 hover:underline"
                >
                  Am uitat parola
                </Link>
              }
            >
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setState("idle");
                  }}
                  autoComplete="current-password"
                  className="h-12 w-full rounded-xl border border-ivory-400 bg-white px-4 pr-11 text-[14.5px] text-ink-900 transition-colors focus:border-ink-400 focus:outline-none"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShow((v) => !v)}
                  aria-label={show ? "Ascunde parola" : "Arată parola"}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-ink-300 transition-colors hover:text-ink-600"
                >
                  {show ? (
                    <EyeOff className="size-4" strokeWidth={1.8} />
                  ) : (
                    <Eye className="size-4" strokeWidth={1.8} />
                  )}
                </button>
              </div>
            </Field>

            {state === "error" && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg bg-negative-50 px-3 py-2 text-[13px] text-negative-500"
              >
                Verifică adresa de e-mail și parola.
              </motion.p>
            )}

            <button
              type="submit"
              disabled={state === "loading" || state === "done"}
              className={cn(
                "flex h-12 w-full items-center justify-center gap-2 rounded-xl text-[14.5px] font-medium transition-all duration-300",
                state === "done"
                  ? "bg-positive-500 text-white"
                  : "bg-ink-950 text-ivory-100 hover:bg-ink-800 active:scale-[0.99]",
              )}
            >
              {state === "loading" && <Loader2 className="size-4 animate-spin" />}
              {state === "done" && <Check className="size-4" strokeWidth={2.4} />}
              {state === "idle" || state === "error"
                ? "Intră în cont"
                : state === "loading"
                  ? "Se verifică…"
                  : "Autentificat"}
            </button>
          </form>

          <div className="mt-8 rounded-xl border border-ivory-300 bg-white p-4">
            <p className="text-[12px] font-medium tracking-[0.1em] text-ink-300 uppercase">
              Acces demo
            </p>
            <p className="mt-2 text-[13px] leading-relaxed text-ink-400">
              Datele sunt deja completate. Poți intra direct în oricare dintre
              cele două panouri.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-1.5 rounded-full border border-ivory-400 px-3.5 py-1.5 text-[12.5px] font-medium text-ink-700 transition-colors hover:border-ink-300 hover:text-ink-950"
              >
                Dashboard client
                <ArrowRight className="size-3" />
              </Link>
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 rounded-full border border-ivory-400 px-3.5 py-1.5 text-[12.5px] font-medium text-ink-700 transition-colors hover:border-ink-300 hover:text-ink-950"
              >
                Panou administrare
                <ArrowRight className="size-3" />
              </Link>
            </div>
          </div>

          <p className="mt-8 text-center text-[13px] text-ink-400">
            Nu ai încă un cont?{" "}
            <Link
              href="/preturi"
              className="font-medium text-ink-950 underline decoration-gold-400/60 underline-offset-4"
            >
              Vezi planurile
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

function Field({
  label,
  aside,
  children,
}: {
  label: string;
  aside?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center justify-between">
        <span className="text-[13px] font-medium text-ink-700">{label}</span>
        {aside}
      </span>
      {children}
    </label>
  );
}
