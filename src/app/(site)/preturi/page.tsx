import type { Metadata } from "next";
import { PricingSection, ComparisonTable } from "@/components/marketing/pricing";
import { FaqSection } from "@/components/marketing/faq";
import { FinalCta } from "@/components/marketing/final-cta";
import { Reveal } from "@/components/ui/primitives";
import { CalendarClock, PackageCheck, RefreshCcw } from "lucide-react";

export const metadata: Metadata = {
  title: "Prețuri",
  description:
    "Planuri de la 25 lei/lună și card NFC premium la 99 lei, plată unică. Fără contract minim, primele 14 zile gratuite.",
  alternates: { canonical: "/preturi" },
};

const guarantees = [
  {
    icon: CalendarClock,
    title: "14 zile gratuit",
    body: "Testezi cu date reale, fără card bancar. Dacă nu se potrivește, nu plătești nimic.",
  },
  {
    icon: RefreshCcw,
    title: "Fără contract minim",
    body: "Poți schimba planul sau renunța oricând, direct din dashboard. Fără discuții.",
  },
  {
    icon: PackageCheck,
    title: "Carduri de schimb",
    body: "Dacă un card se deteriorează în primul an, îl înlocuim gratuit. Se întâmplă rar.",
  },
];

export default function PricingPage() {
  return (
    <>
      {/* Secțiunea e deja închisă la culoare, deci navbar-ul rămâne lizibil
          fără spațiator suplimentar. */}
      <PricingSection className="border-t-0 pt-28 sm:pt-36" />

      <section className="bg-ivory-200 py-16">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 sm:px-7 md:grid-cols-3 lg:px-10">
          {guarantees.map((g, i) => {
            const Icon = g.icon;
            return (
              <Reveal key={g.title} delay={i * 0.07}>
                <div className="flex h-full gap-4 rounded-2xl border border-ivory-300 bg-white p-5">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-ivory-200 text-gold-600">
                    <Icon className="size-4" strokeWidth={1.7} />
                  </span>
                  <div>
                    <h3 className="text-[14.5px] font-medium text-ink-950">{g.title}</h3>
                    <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-400">
                      {g.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <ComparisonTable />
      <FaqSection />
      <FinalCta />
    </>
  );
}
