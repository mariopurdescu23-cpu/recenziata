import {
  Building2,
  ChefHat,
  Home,
  Scissors,
  Sparkles,
  Stethoscope,
  Utensils,
  type LucideIcon,
} from "lucide-react";
import { logos } from "@/lib/data";
import { cn } from "@/lib/utils";

/** Fiecare nume fictiv primește o pictogramă și o tipografie distinctă,
 *  ca să citească drept branduri diferite și nu doar un șir de text uniform. */
const marks: Record<string, { icon: LucideIcon; font: "sans" | "serif" }> = {
  "Maison Noir": { icon: Utensils, font: "serif" },
  "Urban Beauty": { icon: Scissors, font: "sans" },
  "Casa Verde": { icon: Home, font: "sans" },
  "Grand Hotel Severin": { icon: Building2, font: "serif" },
  "Clinica Nova": { icon: Stethoscope, font: "sans" },
  "Trattoria Sole": { icon: ChefHat, font: "serif" },
  "Spa Lumina": { icon: Sparkles, font: "sans" },
  "Atelier Barber": { icon: Scissors, font: "serif" },
};

export function LogoMarquee() {
  const list = [...logos, ...logos];
  return (
    <section
      aria-label="Tipuri de afaceri potrivite pentru Recenziata"
      className="relative border-y border-white/[0.06] bg-ink-950 py-7"
    >
      <p className="mb-6 text-center text-[12px] tracking-[0.14em] text-ink-400 uppercase">
        Gândit pentru afaceri ca acestea
      </p>
      <div className="mask-fade-x overflow-hidden">
        <div className="animate-marquee flex w-max items-center gap-12 pr-12">
          {list.map((name, i) => {
            const mark = marks[name];
            const Icon = mark?.icon ?? Building2;
            return (
              <span
                key={`${name}-${i}`}
                className="inline-flex shrink-0 items-center gap-2.5 whitespace-nowrap text-ink-300/70 transition-colors hover:text-ink-100"
              >
                <span className="grid size-7 shrink-0 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.03]">
                  <Icon className="size-3.5" strokeWidth={1.6} />
                </span>
                <span
                  className={cn(
                    "text-[17px] sm:text-[19px]",
                    mark?.font === "serif" ? "display italic" : "tight font-medium",
                  )}
                >
                  {name}
                </span>
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
