import { BadgeCheck } from "lucide-react";
import { Eyebrow, Reveal } from "@/components/ui/primitives";
import { testimonials } from "@/lib/data";
import { cn, initials } from "@/lib/utils";

const avatarTones = [
  "from-gold-300 to-gold-600",
  "from-ink-500 to-ink-800",
  "from-gold-400 to-ink-700",
];

export function Testimonials() {
  return (
    <section className="relative bg-ivory-100 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>Rezultate reale</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="tighter mt-5 text-[clamp(1.85rem,4.6vw,3rem)] leading-[1.06] font-medium text-ink-950">
              Ce se schimbă în{" "}
              <span className="display text-gold-600 italic">primele trei luni.</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-ivory-300 sm:mt-14 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.author} delay={i * 0.08} className="bg-white">
              <figure className="flex h-full flex-col p-6 sm:p-8">
                {/* Cifra este argumentul — ea conduce cardul, nu ghilimeaua. */}
                <p className="tighter text-[clamp(1.6rem,2.6vw,2rem)] leading-none font-medium text-ink-950">
                  {t.metric.split(" ")[0]}
                </p>
                <p className="mt-2 text-[13px] tracking-[0.02em] text-gold-600">
                  {t.metric.split(" ").slice(1).join(" ")}
                </p>

                <div className="mt-6 h-px w-full bg-ivory-300" />

                <blockquote className="mt-6 flex-1 text-[15px] leading-relaxed text-ink-600">
                  <span className="text-ink-200">„</span>
                  {t.quote}
                  <span className="text-ink-200">”</span>
                </blockquote>

                <figcaption className="mt-7 flex items-center gap-3">
                  <span className="relative shrink-0">
                    <span
                      className={cn(
                        "grid size-11 place-items-center rounded-full bg-gradient-to-br text-[13px] font-medium text-white ring-2 ring-white",
                        avatarTones[i % avatarTones.length],
                      )}
                    >
                      {initials(t.author)}
                    </span>
                    <span
                      className="absolute -right-1 -bottom-1 grid size-4 place-items-center rounded-full bg-white shadow-[0_1px_3px_rgba(8,8,10,0.15)]"
                      title="Client verificat"
                    >
                      <BadgeCheck className="size-4 text-gold-500" strokeWidth={2} />
                    </span>
                  </span>
                  <div className="min-w-0">
                    <p className="flex items-center gap-1.5 truncate text-[13.5px] font-medium text-ink-950">
                      {t.author}
                    </p>
                    <p className="truncate text-[12px] text-ink-300">
                      {t.role} · {t.city}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
