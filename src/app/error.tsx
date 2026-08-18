"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, RotateCcw, TriangleAlert } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Glow } from "@/components/ui/glow";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Într-o implementare reală, aici ar merge raportarea către Sentry.
    console.error(error);
  }, [error]);

  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-ink-950 px-6 text-center">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" />
      <Glow
        className="top-1/2 left-1/2 h-[26rem] w-[46rem] -translate-x-1/2 -translate-y-1/2"
        tone="goldSoft"
        opacity={0.5}
      />

      <div className="relative max-w-md">
        <Logo onDark href="/" />

        <span className="mx-auto mt-10 grid size-12 place-items-center rounded-xl bg-negative-400/12 text-negative-400 ring-1 ring-negative-400/25 ring-inset">
          <TriangleAlert className="size-5" strokeWidth={1.7} />
        </span>

        <h1 className="tight mt-6 text-[24px] leading-tight font-medium text-ivory-100">
          Ceva nu a mers bine.
        </h1>
        <p className="mt-3 text-[14.5px] leading-relaxed text-ink-300">
          Am înregistrat eroarea și o investigăm. Poți reîncerca — de cele mai
          multe ori se rezolvă din prima.
        </p>

        {error.digest && (
          <p className="mt-4 font-mono text-[11.5px] text-ink-500">
            cod: {error.digest}
          </p>
        )}

        <div className="mt-8 flex flex-col items-center justify-center gap-2.5 sm:flex-row">
          <button
            onClick={reset}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-ivory-100 px-5 text-[14px] font-medium text-ink-950 transition-colors hover:bg-white active:scale-[0.985]"
          >
            <RotateCcw className="size-4" strokeWidth={2} />
            Reîncearcă
          </button>
          <Link
            href="/"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-white/[0.16] px-5 text-[14px] font-medium text-ivory-100 transition-colors hover:border-white/30 hover:bg-white/[0.06]"
          >
            <ArrowLeft className="size-4" />
            Pagina principală
          </Link>
        </div>
      </div>
    </div>
  );
}
