import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Glow } from "@/components/ui/glow";

export default function NotFound() {
  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-ink-950 px-6 text-center">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
      <Glow className="top-1/2 left-1/2 h-[28rem] w-[50rem] -translate-x-1/2 -translate-y-1/2" opacity={0.65} />

      <div className="relative">
        <Logo onDark href="/" />
        <p className="display mt-10 text-[clamp(4rem,14vw,7rem)] leading-none text-ivory-100/90 italic">
          404
        </p>
        <h1 className="tight mt-4 text-[22px] font-medium text-ivory-100 sm:text-[26px]">
          Pagina aceasta nu există.
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-[14.5px] leading-relaxed text-ink-300">
          Poate a fost mutată, poate linkul e greșit. Oricum, te putem duce
          înapoi.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex h-11 items-center gap-2 rounded-full bg-ivory-100 px-5 text-[14px] font-medium text-ink-950 transition-colors hover:bg-white"
        >
          <ArrowLeft className="size-4" />
          Înapoi la pagina principală
        </Link>
      </div>
    </div>
  );
}
