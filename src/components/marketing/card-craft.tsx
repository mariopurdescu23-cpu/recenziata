"use client";

import { Check, Droplets, Layers, Ruler, Wifi } from "lucide-react";
import { NfcCard } from "@/components/marketing/nfc-card";
import { Button } from "@/components/ui/button";
import { Eyebrow, Reveal } from "@/components/ui/primitives";

const specs = [
  { icon: Layers, label: "Material", value: "Aluminiu anodizat, 0,8 mm" },
  { icon: Ruler, label: "Dimensiune", value: "85,6 × 54 mm — format card" },
  { icon: Wifi, label: "Cip", value: "NTAG 215, rescriptibil" },
  { icon: Droplets, label: "Finisaj", value: "Gravură laser, rezistent la lichide" },
];

const included = [
  "Design personalizat cu numele afacerii",
  "URL unic, care nu se schimbă niciodată",
  "Cod QR gravat pentru orice telefon",
  "Suport antiderapant inclus",
];

export function CardCraft() {
  return (
    <section
      id="card"
      className="relative overflow-hidden border-t border-ivory-300 bg-ivory-200 py-20 sm:py-28"
    >
      <div className="bg-grid-light pointer-events-none absolute inset-0 opacity-50" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Card */}
          <Reveal className="order-2 lg:order-1">
            <div className="relative">
              <div className="float-slow relative mx-auto max-w-[440px]">
                <NfcCard intensity={11} />
              </div>

              <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 sm:gap-x-10">
                {specs.map((s) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.label} className="flex gap-3">
                      <Icon
                        className="mt-0.5 size-4 shrink-0 text-gold-600"
                        strokeWidth={1.7}
                      />
                      <div>
                        <p className="text-[11.5px] tracking-[0.1em] text-ink-300 uppercase">
                          {s.label}
                        </p>
                        <p className="mt-1 text-[13.5px] leading-snug text-ink-800">
                          {s.value}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <Reveal>
              <Eyebrow>Obiectul fizic</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="tighter mt-5 text-[clamp(1.85rem,4.6vw,3rem)] leading-[1.06] font-medium text-ink-950">
                Un obiect pe care
                <br />
                <span className="display italic text-gold-600">
                  clientul vrea să-l atingă.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-lg text-[15.5px] leading-relaxed text-ink-500 sm:text-base">
                Cardul stă pe masă lângă nota de plată sau la recepție. Nu arată a
                material promoțional — arată ca parte din amenajare. Aluminiu rece
                la atingere, gravură fină, muchii ușor teșite.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <ul className="mt-8 space-y-3">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-[3px] grid size-4 shrink-0 place-items-center rounded-full bg-gold-500/14 ring-1 ring-gold-500/25 ring-inset">
                      <Check className="size-2.5 text-gold-600" strokeWidth={3} />
                    </span>
                    <span className="text-[14.5px] text-ink-700">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Button href="/preturi" variant="solid" size="lg" sheen>
                  99 lei · comandă unică
                </Button>
                <p className="text-[13px] leading-snug text-ink-400">
                  Livrare în 3–5 zile lucrătoare
                  <br className="hidden sm:block" /> Gravat în România
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
