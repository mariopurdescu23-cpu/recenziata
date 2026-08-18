import type { Metadata } from "next";
import {
  BellRing,
  ClipboardCheck,
  Hand,
  LineChart,
  Link2,
  ShieldCheck,
} from "lucide-react";
import { PageHero } from "@/components/marketing/page-hero";
import { InteractiveDemo } from "@/components/product/interactive-demo";
import { CardCraft } from "@/components/marketing/card-craft";
import { FaqSection } from "@/components/marketing/faq";
import { FinalCta } from "@/components/marketing/final-cta";
import { Button } from "@/components/ui/button";
import { Reveal, SectionHeading } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Cum funcționează",
  description:
    "De la cardul NFC de pe masă până la recenzia publicată pe Google: fluxul complet Recenziata, explicat pas cu pas.",
  alternates: { canonical: "/cum-functioneaza" },
};

const timeline = [
  {
    icon: Hand,
    title: "Clientul atinge cardul",
    body: "Cardul NFC stă la vedere: pe masă, lângă nota de plată sau la recepție. O atingere cu telefonul — sau codul QR gravat, pentru orice dispozitiv.",
    detail: "NTAG 215 · compatibil iPhone 7+ și Android",
  },
  {
    icon: Link2,
    title: "Se deschide URL-ul unic al afacerii",
    body: "Fiecare locație are propria adresă, care nu se schimbă niciodată. Cardurile nu trebuie reprogramate atunci când schimbi ceva în cont.",
    detail: "recenziata.ro/numele-afacerii",
  },
  {
    icon: ShieldCheck,
    title: "Sistemul verifică abonamentul",
    body: "Dacă abonamentul este activ, se încarcă pagina personalizată. Dacă nu, clientul vede un mesaj neutru — fără erori și fără branding.",
    detail: "verificare sub 200 ms",
  },
  {
    icon: ClipboardCheck,
    title: "Clientul răspunde la o întrebare",
    body: "„Cum a fost experiența ta?” Dacă a fost bine, merge direct la Google. Dacă nu, alege motivul dintr-o listă scurtă și poate adăuga un detaliu.",
    detail: "5 categorii, personalizabile pe planul Professional",
  },
  {
    icon: BellRing,
    title: "Feedback-ul ajunge la tine",
    body: "Apare instant în dashboard și, dacă vrei, pe e-mail. Știi ce s-a întâmplat înainte ca situația să devină o recenzie publică.",
    detail: "alerte configurabile pe categorie",
  },
  {
    icon: LineChart,
    title: "Recenzia ajunge pe Google",
    body: "Indiferent de răspuns, clientul primește opțiunea de a lăsa recenzie. Nu filtrăm nimic — respectăm politicile Google integral.",
    detail: "conform politicilor Google Business Profile",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="Produs"
        title={
          <>
            Un flux simplu,
            <br />
            <span className="display italic text-gold-300">gândit până la capăt.</span>
          </>
        }
        description="Nu cerem clientului nimic complicat: o atingere și o întrebare. Tot ce este complex se întâmplă în spate — verificări, atribuire, statistici, alerte."
      >
        <div className="mt-9 flex flex-wrap gap-3">
          <Button href="#demo" variant="ivory" size="lg" sheen>
            Testează fluxul
          </Button>
          <Button href="/preturi" variant="outlineLight" size="lg">
            Vezi prețurile
          </Button>
        </div>
      </PageHero>

      <section className="bg-ivory-100 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
          <SectionHeading
            eyebrow="Pas cu pas"
            title="Ce se întâmplă, în ordine"
            description="Șase pași, dintre care clientul final observă doar doi."
          />

          <ol className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {timeline.map((t, i) => {
              const Icon = t.icon;
              return (
                <Reveal key={t.title} delay={i * 0.06} as="li">
                  <div className="group h-full rounded-2xl border border-ivory-300 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_2px_6px_rgba(8,8,10,0.03),0_28px_60px_-30px_rgba(8,8,10,0.28)]">
                    <div className="flex items-center justify-between">
                      <span className="grid size-10 place-items-center rounded-xl bg-ink-950 text-gold-300">
                        <Icon className="size-[18px]" strokeWidth={1.6} />
                      </span>
                      <span className="tnum eyebrow text-ink-200">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="tight mt-5 text-[17px] font-medium text-ink-950">
                      {t.title}
                    </h3>
                    <p className="mt-2.5 text-[14px] leading-relaxed text-ink-400">
                      {t.body}
                    </p>
                    <p className="mt-5 border-t border-ivory-200 pt-3.5 text-[12px] text-ink-300">
                      {t.detail}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </section>

      <InteractiveDemo />
      <CardCraft />
      <FaqSection />
      <FinalCta />
    </>
  );
}
