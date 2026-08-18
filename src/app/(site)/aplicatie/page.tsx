import type { Metadata } from "next";
import { Bell, Fingerprint, Gauge, Share2 } from "lucide-react";
import { PageHero } from "@/components/marketing/page-hero";
import { MobileApp } from "@/components/marketing/mobile-app";
import { FinalCta } from "@/components/marketing/final-cta";
import { Reveal, SectionHeading } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Aplicația mobilă",
  description:
    "Dashboard-ul Recenziata pe telefon: cifrele zilei, notificări la feedback negativ și acces rapid la recenzii. În testare privată pentru iOS și Android.",
  alternates: { canonical: "/aplicatie" },
};

const features = [
  {
    icon: Bell,
    title: "Notificări care merită deschise",
    body: "Doar ce contează: feedback negativ, recenzii noi și praguri atinse. Poți configura ce primești și când.",
  },
  {
    icon: Gauge,
    title: "Cifrele zilei în trei secunde",
    body: "Scanări, feedback și recenzii de azi, plus evoluția ultimelor 12 ore. Fără să deschizi laptopul.",
  },
  {
    icon: Share2,
    title: "Distribuie raportul",
    body: "Trimiți rezumatul zilei către manager sau echipă direct din aplicație, în format PDF.",
  },
  {
    icon: Fingerprint,
    title: "Acces securizat",
    body: "Autentificare biometrică și sesiuni separate pentru fiecare membru al echipei.",
  },
];

export default function AppPage() {
  return (
    <>
      <PageHero
        eyebrow="Aplicația mobilă"
        title={
          <>
            Produsul nu se oprește
            <br />
            <span className="display italic text-gold-300">la browser.</span>
          </>
        }
        description="Arhitectura platformei a fost gândită de la început pentru a funcționa identic pe web și pe mobil. Aplicația este în testare privată — mai jos, ecranele reale."
      />

      <MobileApp standalone />

      <section className="bg-ivory-100 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
          <SectionHeading
            eyebrow="Ce include"
            title="Gândită pentru cineva care e în picioare toată ziua"
            description="Un manager de restaurant nu stă la birou. Aplicația e construită pentru intervale scurte de atenție, cu o singură mână."
          />

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:gap-5">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <Reveal key={f.title} delay={i * 0.07}>
                  <article className="flex h-full gap-5 rounded-2xl border border-ivory-300 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_2px_6px_rgba(8,8,10,0.03),0_28px_60px_-30px_rgba(8,8,10,0.28)] sm:p-7">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-ink-950 text-gold-300">
                      <Icon className="size-[19px]" strokeWidth={1.6} />
                    </span>
                    <div>
                      <h3 className="tight text-[17px] font-medium text-ink-950">
                        {f.title}
                      </h3>
                      <p className="mt-2.5 text-[14px] leading-relaxed text-ink-400">
                        {f.body}
                      </p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
