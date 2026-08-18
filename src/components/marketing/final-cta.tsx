import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, ScrollFadeRow } from "@/components/ui/primitives";
import { Glow } from "@/components/ui/glow";

const points = ["14 zile gratuit", "Fără contract minim", "Livrare în 3–5 zile"];

export function FinalCta() {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] bg-ink-950 py-24 sm:py-32">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" />
      <Glow className="top-1/2 left-1/2 h-[30rem] w-[58rem] -translate-x-1/2 -translate-y-1/2" opacity={0.7} />

      <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-7">
        <Reveal>
          <h2 className="tighter text-[clamp(2.1rem,6vw,3.6rem)] leading-[1.02] font-medium text-ivory-100">
            Pune cardul pe masă.
            <br />
            <span className="display italic text-gold-300">
              Restul se întâmplă singur.
            </span>
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mx-auto mt-6 max-w-lg text-[16px] leading-relaxed text-ink-200">
            Începe cu o locație și un card. În două săptămâni vei ști exact ce
            spun clienții tăi — și de ce.
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/autentificare" variant="ivory" size="lg" sheen>
              Începe gratuit
              <ArrowRight className="size-4" />
            </Button>
            <Button href="/maison-noir" variant="outlineLight" size="lg">
              Vezi fluxul complet
            </Button>
          </div>
        </Reveal>
        <Reveal delay={0.24}>
          <ScrollFadeRow
            as="ul"
            className="mt-9 flex items-center justify-start gap-x-4 gap-y-3 px-5 sm:flex-wrap sm:justify-center sm:gap-x-7 sm:px-0"
          >
            {points.map((p) => (
              <li
                key={p}
                className="inline-flex shrink-0 items-center gap-1.5 text-[12px] whitespace-nowrap text-ink-300 sm:gap-2 sm:text-[13px]"
              >
                <Check className="size-3 shrink-0 text-gold-400 sm:size-3.5" strokeWidth={2.2} />
                {p}
              </li>
            ))}
          </ScrollFadeRow>
        </Reveal>
      </div>
    </section>
  );
}
