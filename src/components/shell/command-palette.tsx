"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BadgeEuro,
  BookOpen,
  CreditCard,
  Gauge,
  LayoutDashboard,
  LogIn,
  MessageSquareQuote,
  Search,
  Shield,
  Smartphone,
  Sparkles,
  Star,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface Item {
  id: string;
  label: string;
  hint?: string;
  href: string;
  group: string;
  icon: typeof Gauge;
  keywords?: string;
}

const items: Item[] = [
  { id: "home", label: "Pagina principală", href: "/", group: "Site", icon: Sparkles, keywords: "landing acasa hero" },
  { id: "how", label: "Cum funcționează", href: "/cum-functioneaza", group: "Site", icon: Gauge, keywords: "produs flux nfc" },
  { id: "pricing", label: "Prețuri", href: "/preturi", group: "Site", icon: BadgeEuro, keywords: "abonament plan tarife" },
  { id: "app", label: "Aplicația mobilă", href: "/aplicatie", group: "Site", icon: Smartphone, keywords: "mobil ios android" },
  { id: "blog", label: "Blog", href: "/blog", group: "Site", icon: BookOpen, keywords: "articole ghiduri" },
  { id: "login", label: "Autentificare", href: "/autentificare", group: "Site", icon: LogIn, keywords: "login cont" },

  { id: "flow", label: "Flux de feedback (live)", hint: "Pagina reală a clientului", href: "/maison-noir", group: "Demo", icon: MessageSquareQuote, keywords: "scan card client experienta" },

  { id: "dash", label: "Dashboard — Overview", href: "/dashboard", group: "Aplicație", icon: LayoutDashboard },
  { id: "dash-fb", label: "Dashboard — Feedback", href: "/dashboard/feedback", group: "Aplicație", icon: MessageSquareQuote },
  { id: "dash-scan", label: "Dashboard — Scanări", href: "/dashboard/scanari", group: "Aplicație", icon: Gauge },
  { id: "dash-rev", label: "Dashboard — Recenzii", href: "/dashboard/recenzii", group: "Aplicație", icon: Star },
  { id: "dash-card", label: "Dashboard — Cardul meu", href: "/dashboard/cardul-meu", group: "Aplicație", icon: CreditCard },
  { id: "dash-set", label: "Dashboard — Setări & Google", href: "/dashboard/setari", group: "Aplicație", icon: Shield },

  { id: "admin", label: "Admin — Overview", href: "/admin", group: "Administrare", icon: Shield },
  { id: "admin-cl", label: "Admin — Clienți", href: "/admin/clienti", group: "Administrare", icon: Shield },
  { id: "admin-cards", label: "Admin — Carduri", href: "/admin/carduri", group: "Administrare", icon: CreditCard },
  { id: "admin-sub", label: "Admin — Abonamente", href: "/admin/abonamente", group: "Administrare", icon: BadgeEuro },
  { id: "admin-pay", label: "Admin — Plăți", href: "/admin/plati", group: "Administrare", icon: BadgeEuro },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const router = useRouter();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  // în aplicație există deja căutare în topbar — nu dublăm declanșatorul
  const showTrigger = !pathname.startsWith("/dashboard") && !pathname.startsWith("/admin");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) =>
      `${i.label} ${i.group} ${i.keywords ?? ""} ${i.hint ?? ""}`
        .toLowerCase()
        .includes(q),
    );
  }, [query]);

  const grouped = useMemo(() => {
    const map = new Map<string, Item[]>();
    filtered.forEach((i) => {
      map.set(i.group, [...(map.get(i.group) ?? []), i]);
    });
    return [...map.entries()];
  }, [filtered]);

  const flat = useMemo(() => grouped.flatMap(([, list]) => list), [grouped]);

  const go = useCallback(
    (href: string) => {
      setOpen(false);
      setQuery("");
      router.push(href);
    },
    [router],
  );

  useEffect(() => {
    function isTypingTarget(el: EventTarget | null) {
      if (!(el instanceof HTMLElement)) return false;
      return (
        el.tagName === "INPUT" ||
        el.tagName === "TEXTAREA" ||
        el.tagName === "SELECT" ||
        el.isContentEditable
      );
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      const withModifier = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
      const plainK =
        !e.metaKey && !e.ctrlKey && !e.altKey && e.key.toLowerCase() === "k";
      if ((withModifier || plainK) && !isTypingTarget(e.target)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 60);
      document.documentElement.style.overflow = "hidden";
      return () => {
        window.clearTimeout(t);
        document.documentElement.style.overflow = "";
      };
    }
  }, [open]);

  // Resetăm selecția când se schimbă interogarea sau se redeschide paleta
  const [lastKey, setLastKey] = useState(`${open}|${query}`);
  const key = `${open}|${query}`;
  if (lastKey !== key) {
    setLastKey(key);
    if (active !== 0) setActive(0);
  }

  function onInputKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, flat.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = flat[active];
      if (item) go(item.href);
    }
  }

  useEffect(() => {
    listRef.current
      ?.querySelector('[data-active="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  return (
    <>
      {/* Declanșator discret — util în prezentare */}
      {showTrigger && (
      <button
        onClick={() => setOpen(true)}
        aria-label="Deschide navigarea rapidă"
        className="fixed right-4 bottom-4 z-40 hidden h-10 items-center gap-2 rounded-full border border-white/12 bg-ink-900/95 pr-3 pl-3.5 text-[12.5px] font-medium text-ink-150 shadow-[0_10px_36px_-12px_rgba(8,8,10,0.6)] transition hover:border-white/25 hover:text-ivory-100 lg:flex"
      >
        <Search className="size-3.5" />
        Navigare rapidă
        <kbd className="ml-1 flex items-center gap-0.5 rounded-md border border-white/12 bg-white/[0.06] px-1.5 py-0.5 text-[10.5px] text-ink-200">
          K
        </kbd>
      </button>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="absolute inset-0 bg-ink-950/55 backdrop-blur-[3px]"
              onClick={() => setOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Navigare rapidă"
              initial={{ opacity: 0, y: -10, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.99 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-ink-900/95 shadow-[0_40px_100px_-28px_rgba(8,8,10,0.8)] backdrop-blur-2xl"
            >
              <div className="flex items-center gap-3 border-b border-white/8 px-4">
                <Search className="size-4 shrink-0 text-ink-300" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onInputKey}
                  placeholder="Caută o pagină sau un ecran…"
                  className="h-13 w-full bg-transparent py-4 text-[14.5px] text-ivory-100 placeholder:text-ink-400 focus:outline-none"
                />
                <kbd className="hidden rounded-md border border-white/10 px-1.5 py-0.5 text-[10.5px] text-ink-400 sm:block">
                  esc
                </kbd>
              </div>

              <div
                ref={listRef}
                className="scrollbar-fine max-h-[52vh] overflow-y-auto overscroll-contain p-2"
              >
                {grouped.length === 0 && (
                  <p className="px-3 py-8 text-center text-[13.5px] text-ink-300">
                    Niciun rezultat pentru „{query}”.
                  </p>
                )}
                {grouped.map(([group, list]) => (
                  <div key={group} className="mb-1">
                    <p className="eyebrow px-3 pt-3 pb-1.5 text-ink-400">{group}</p>
                    {list.map((item) => {
                      const idx = flat.indexOf(item);
                      const isActive = idx === active;
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          data-active={isActive}
                          onMouseMove={() => setActive(idx)}
                          onClick={() => go(item.href)}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition",
                            isActive ? "bg-white/[0.08]" : "hover:bg-white/[0.04]",
                          )}
                        >
                          <Icon
                            className={cn(
                              "size-4 shrink-0",
                              isActive ? "text-gold-300" : "text-ink-300",
                            )}
                          />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[13.5px] text-ivory-100">
                              {item.label}
                            </span>
                            {item.hint && (
                              <span className="block truncate text-[11.5px] text-ink-400">
                                {item.hint}
                              </span>
                            )}
                          </span>
                          <ArrowRight
                            className={cn(
                              "size-3.5 shrink-0 transition",
                              isActive
                                ? "translate-x-0 text-ink-200 opacity-100"
                                : "-translate-x-1 opacity-0",
                            )}
                          />
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-white/8 px-4 py-2.5 text-[11px] text-ink-400">
                <span>Navighează cu ↑ ↓ · Enter pentru a deschide</span>
                <span className="hidden sm:block">Recenziata — demo</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
