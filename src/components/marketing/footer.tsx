import Link from "next/link";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Glow } from "@/components/ui/glow";

const columns = [
  {
    title: "Produs",
    links: [
      { label: "Cum funcționează", href: "/cum-functioneaza" },
      { label: "Prețuri", href: "/preturi" },
      { label: "Aplicația mobilă", href: "/aplicatie" },
      { label: "Flux de feedback", href: "/maison-noir" },
    ],
  },
  {
    title: "Pentru clienți",
    links: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Autentificare", href: "/autentificare" },
      { label: "Cardul meu", href: "/dashboard/cardul-meu" },
      { label: "Setări Google", href: "/dashboard/setari" },
    ],
  },
  {
    title: "Resurse",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Întrebări frecvente", href: "/cum-functioneaza#intrebari" },
      { label: "Ghid de plasare", href: "/blog" },
      { label: "Status platformă", href: "/admin" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-ink-950">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" />
      <Glow className="-top-40 left-1/2 h-72 w-[48rem] -translate-x-1/2" tone="goldSoft" opacity={0.7} />

      <div className="relative mx-auto max-w-7xl px-5 pt-16 pb-8 sm:px-7 sm:pt-20 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Logo onDark />
            <p className="mt-5 max-w-xs text-[14px] leading-relaxed text-ink-300">
              Cardul NFC premium și platforma care transformă experiențele bune în
              recenzii Google — fără să filtreze nimic.
            </p>
            <div className="mt-6 flex flex-col gap-2.5 text-[13px] text-ink-300">
              <a
                href="mailto:contact@recenziata.ro"
                className="inline-flex items-center gap-2.5 transition-colors hover:text-ivory-100"
              >
                <Mail className="size-3.5 text-gold-500" strokeWidth={1.7} />
                contact@recenziata.ro
              </a>
              <span className="inline-flex items-center gap-2.5">
                <MapPin className="size-3.5 text-gold-500" strokeWidth={1.7} />
                Timișoara, România
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="eyebrow text-ink-400">{col.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="group inline-flex items-center gap-1 text-[13.5px] text-ink-200 transition-colors hover:text-ivory-100"
                      >
                        {l.label}
                        <ArrowUpRight className="size-3 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-60" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/[0.07] pt-6 text-[12.5px] text-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Recenziata.ro · Toate drepturile rezervate</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/termeni" className="transition-colors hover:text-ink-150">
              Termeni
            </Link>
            <Link href="/confidentialitate" className="transition-colors hover:text-ink-150">
              Confidențialitate
            </Link>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-positive-400" />
              Toate sistemele funcționează
            </span>
          </div>
        </div>
      </div>

      {/* Wordmark supradimensionat, întins de la margine la margine — prezent doar ca textură */}
      <div
        aria-hidden
        className="pointer-events-none relative h-[clamp(2.5rem,9vw,6rem)] overflow-hidden px-5 sm:px-7 lg:px-10"
      >
        <div className="absolute inset-x-5 -top-[0.16em] flex justify-between text-[clamp(2.75rem,15vw,10rem)] leading-[0.8] font-medium text-white/[0.025] select-none sm:inset-x-7 lg:inset-x-10">
          {"Recenziata".split("").map((ch, i) => (
            <span key={i}>{ch}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}
