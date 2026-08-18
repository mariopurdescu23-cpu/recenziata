import type { ReactNode } from "react";
import { PageHero } from "@/components/marketing/page-hero";

export interface LegalSection {
  title: string;
  paragraphs: string[];
  list?: string[];
}

export function LegalPage({
  eyebrow,
  title,
  intro,
  updated,
  sections,
  footer,
}: {
  eyebrow: string;
  title: ReactNode;
  intro: string;
  updated: string;
  sections: LegalSection[];
  footer?: ReactNode;
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={intro}>
        <p className="mt-8 text-[13px] text-ink-400">
          Ultima actualizare: {updated}
        </p>
      </PageHero>

      <section className="bg-ivory-100 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-7 lg:grid-cols-[15rem_1fr] lg:gap-16 lg:px-10">
          {/* Cuprins — pe desktop rămâne lipit, ca într-un document real */}
          <nav aria-label="Cuprins" className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow text-ink-300">Cuprins</p>
            <ol className="mt-4 space-y-2.5">
              {sections.map((s, i) => (
                <li key={s.title}>
                  <a
                    href={`#sectiunea-${i + 1}`}
                    className="group flex gap-2.5 text-[13.5px] leading-snug text-ink-400 transition-colors hover:text-ink-950"
                  >
                    <span className="tnum text-ink-200 transition-colors group-hover:text-gold-600">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="max-w-[40rem]">
            {sections.map((s, i) => (
              <section
                key={s.title}
                id={`sectiunea-${i + 1}`}
                className="scroll-mt-28 border-t border-ivory-300 py-8 first:border-t-0 first:pt-0"
              >
                <h2 className="tight flex gap-3 text-[19px] leading-snug font-medium text-ink-950 sm:text-[21px]">
                  <span className="tnum mt-[3px] text-[13px] font-normal text-gold-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.title}
                </h2>
                <div className="mt-4 space-y-4">
                  {s.paragraphs.map((p) => (
                    <p key={p} className="text-[15px] leading-[1.75] text-ink-500">
                      {p}
                    </p>
                  ))}
                </div>
                {s.list && (
                  <ul className="mt-5 space-y-2.5">
                    {s.list.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-[9px] size-1.5 shrink-0 rounded-full bg-gold-500" />
                        <span className="text-[14.5px] leading-relaxed text-ink-500">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {footer && (
              <div className="mt-8 rounded-2xl border border-ivory-300 bg-white p-6">
                {footer}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
