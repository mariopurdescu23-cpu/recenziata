"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Eyebrow, Reveal } from "@/components/ui/primitives";
import { faq } from "@/lib/data";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="intrebari" className="bg-ivory-100 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <Reveal>
              <Eyebrow>Întrebări frecvente</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="tighter mt-5 text-[clamp(1.85rem,4.6vw,2.85rem)] leading-[1.06] font-medium text-ink-950">
                Ce ne întreabă
                <br />
                <span className="display italic text-gold-600">cel mai des.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-ink-400">
                Dacă nu găsești răspunsul aici, scrie-ne la{" "}
                <a
                  href="mailto:contact@recenziata.ro"
                  className="text-ink-900 underline decoration-gold-400/60 underline-offset-4 transition-colors hover:decoration-gold-500"
                >
                  contact@recenziata.ro
                </a>
                . Răspundem în aceeași zi lucrătoare.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <dl className="divide-y divide-ivory-300 border-y border-ivory-300">
              {faq.map((item, i) => {
                const isOpen = open === i;
                return (
                  <div key={item.q}>
                    <dt>
                      <button
                        onClick={() => setOpen(isOpen ? null : i)}
                        aria-expanded={isOpen}
                        className="group flex w-full items-start justify-between gap-6 py-5 text-left"
                      >
                        <span
                          className={cn(
                            "text-[15.5px] leading-snug font-medium transition-colors sm:text-[16.5px]",
                            isOpen ? "text-ink-950" : "text-ink-700 group-hover:text-ink-950",
                          )}
                        >
                          {item.q}
                        </span>
                        <span
                          className={cn(
                            "mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border transition-all duration-400",
                            isOpen
                              ? "rotate-45 border-ink-950 bg-ink-950 text-ivory-100"
                              : "border-ivory-400 text-ink-400 group-hover:border-ink-200",
                          )}
                        >
                          <Plus className="size-3.5" strokeWidth={2} />
                        </span>
                      </button>
                    </dt>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.dd
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-xl pb-6 text-[14.5px] leading-relaxed text-ink-400">
                            {item.a}
                          </p>
                        </motion.dd>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
