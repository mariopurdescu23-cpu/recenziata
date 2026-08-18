import { Eye, ShieldCheck, Zap } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/ui/primitives";

const pillars = [
  {
    icon: Zap,
    title: "Zero fricțiune",
    body: "Fără aplicație, fără cont, fără link trimis pe WhatsApp. O atingere și pagina e deschisă — exact în momentul în care experiența e încă proaspătă.",
    stat: "sub 1 secundă",
    statLabel: "de la atingere la pagină",
  },
  {
    icon: Eye,
    title: "Contextul dinaintea recenziei",
    body: "Când ceva nu a mers bine, afli motivul în aceeași secundă în care clientul îl simte. Nu peste o săptămână, dintr-o recenzie publică.",
    stat: "5 categorii",
    statLabel: "configurabile pe afacerea ta",
  },
  {
    icon: ShieldCheck,
    title: "Fără filtrare, fără riscuri",
    body: "Orice client poate ajunge pe Google, indiferent de răspuns. Respectăm politicile Google — construim reputație, nu o simulăm.",
    stat: "100%",
    statLabel: "conform politicilor Google",
  },
];

export function ValueProps() {
  return (
    <section className="relative bg-ivory-100 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
        <SectionHeading
          eyebrow="De ce funcționează"
          title={
            <>
              Recenziile nu se cer.
              <br />
              <span className="text-ink-300">Se fac ușor de lăsat.</span>
            </>
          }
          description="Clienții mulțumiți nu sunt leneși — doar nu au un motiv suficient de simplu să acționeze. Recenziata elimină tot ce stă între ei și un profil Google mai bun."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-3 lg:gap-5">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.title} delay={i * 0.08}>
                <article className="group h-full rounded-2xl border border-ivory-300 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-ivory-400 hover:shadow-[0_2px_6px_rgba(8,8,10,0.03),0_28px_60px_-30px_rgba(8,8,10,0.28)] sm:p-7">
                  <span className="grid size-11 place-items-center rounded-xl bg-ink-950 text-gold-300 transition-transform duration-500 group-hover:scale-105">
                    <Icon className="size-[19px]" strokeWidth={1.6} />
                  </span>
                  <h3 className="tight mt-6 text-[19px] font-medium text-ink-950">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-ink-400">
                    {p.body}
                  </p>
                  <div className="mt-6 border-t border-ivory-200 pt-4">
                    <p className="tight text-[17px] font-medium text-ink-950">
                      {p.stat}
                    </p>
                    <p className="mt-0.5 text-[12.5px] text-ink-300">{p.statLabel}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
