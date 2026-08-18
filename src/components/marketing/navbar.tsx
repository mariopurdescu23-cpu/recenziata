"use client";

import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/cum-functioneaza", label: "Cum funcționează" },
  { href: "/preturi", label: "Prețuri" },
  { href: "/aplicatie", label: "Aplicație" },
  { href: "/blog", label: "Blog" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  // Actualizăm starea doar la traversarea pragului, nu la fiecare cadru de scroll.
  useMotionValueEvent(scrollY, "change", (v) => {
    const next = v > 16;
    setScrolled((prev) => (prev === next ? prev : next));
  });

  // Ajustare de stare în timpul render-ului (pattern recomandat React)
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          // Tranziționăm doar culorile. `transition-all` ar fi animat și
          // backdrop-filter — cel mai scump lucru pe care îl poți anima.
          "fixed inset-x-0 top-0 z-50 border-b [transition:background-color_400ms_var(--ease-premium),border-color_400ms_var(--ease-premium)]",
          // Filtrul se aplică doar când e nevoie: un backdrop-filter activ
          // permanent obligă browserul să compună fundalul la fiecare cadru.
          scrolled
            ? "border-white/[0.07] bg-ink-950/75 [backdrop-filter:blur(14px)_saturate(150%)]"
            : "border-transparent bg-transparent",
        )}
      >
        {/* linia aurie foarte fină, apare la scroll */}
        <div
          className={cn(
            "hairline-gold absolute inset-x-0 bottom-0 h-px transition-opacity duration-700",
            scrolled ? "opacity-45" : "opacity-0",
          )}
        />
        <nav
          aria-label="Navigare principală"
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between px-5 [transition:height_400ms_var(--ease-premium)] sm:px-7 lg:px-10",
            scrolled ? "h-[60px]" : "h-[72px]",
          )}
        >
          <Logo onDark />

          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
            {links.map((l) => {
              const active = pathname.startsWith(l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={cn(
                      "relative rounded-full px-3.5 py-2 text-[13.5px] transition-colors duration-300",
                      active
                        ? "text-ivory-100"
                        : "text-ink-200 hover:text-ivory-100",
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-white/[0.07] ring-1 ring-white/[0.08] ring-inset"
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      />
                    )}
                    <span className="relative">{l.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden items-center gap-2 lg:flex">
            <Link
              href="/autentificare"
              className="rounded-full px-3.5 py-2 text-[13.5px] text-ink-200 transition-colors hover:text-ivory-100"
            >
              Autentificare
            </Link>
            <Button href="/maison-noir" variant="ivory" size="sm" sheen>
              Încearcă demo-ul
              <ArrowUpRight className="size-3.5" />
            </Button>
          </div>

          <button
            onClick={() => setOpen(true)}
            aria-label="Deschide meniul"
            className="-mr-2 grid size-10 place-items-center rounded-full text-ivory-100 transition hover:bg-white/8 lg:hidden"
          >
            <Menu className="size-5" strokeWidth={1.6} />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-ink-950/96 backdrop-blur-xl lg:hidden"
          >
            <div className="flex h-[72px] items-center justify-between px-5 sm:px-7">
              <Logo onDark />
              <button
                onClick={() => setOpen(false)}
                aria-label="Închide meniul"
                className="-mr-2 grid size-10 place-items-center rounded-full text-ivory-100 transition hover:bg-white/8"
              >
                <X className="size-5" strokeWidth={1.6} />
              </button>
            </div>

            <nav className="flex flex-col px-5 pt-6 sm:px-7">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.05 + i * 0.05,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    href={l.href}
                    className="tight flex items-center justify-between border-b border-white/[0.06] py-4.5 text-[26px] font-medium text-ivory-100"
                  >
                    {l.label}
                    <ArrowUpRight className="size-5 text-ink-400" strokeWidth={1.5} />
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8 flex flex-col gap-3"
              >
                <Button href="/maison-noir" variant="ivory" size="lg" className="w-full">
                  Încearcă demo-ul
                </Button>
                <Button
                  href="/autentificare"
                  variant="outlineLight"
                  size="lg"
                  className="w-full"
                >
                  Autentificare
                </Button>
                <Link
                  href="/dashboard"
                  className="mt-2 text-center text-[13px] text-ink-300 underline-offset-4 hover:text-ivory-100 hover:underline"
                >
                  Vezi dashboard-ul demo
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
