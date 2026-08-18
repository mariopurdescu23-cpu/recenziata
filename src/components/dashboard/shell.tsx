"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Bell,
  ChevronDown,
  Command,
  LogOut,
  Menu,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Logo } from "@/components/brand/logo";
import { Badge } from "@/components/ui/primitives";
import { relativeFromMinutes } from "@/components/dashboard/feedback-table";
import { notifications as baseNotifications } from "@/lib/data";
import { useDemo } from "@/lib/demo-store";
import { cn, initials } from "@/lib/utils";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  exact?: boolean;
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}

const ease = [0.22, 1, 0.36, 1] as const;

export function DashboardShell({
  sections,
  brandLabel,
  brandSub,
  account,
  accountRole,
  children,
  footerCard,
  homeHref = "/dashboard",
}: {
  sections: NavSection[];
  brandLabel: string;
  brandSub: string;
  account: string;
  accountRole: string;
  children: ReactNode;
  footerCard?: ReactNode;
  homeHref?: string;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    if (mobileOpen) setMobileOpen(false);
  }

  const nav = (
    <nav className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-3 py-4 scrollbar-fine">
      {sections.map((section, si) => (
        <div key={si}>
          {section.title && (
            <p className="eyebrow px-3 pb-2.5 text-ink-500">{section.title}</p>
          )}
          <ul className="space-y-0.5">
            {section.items.map((item) => {
              const active = item.exact
                ? pathname === item.href
                : pathname === item.href ||
                  pathname.startsWith(item.href + "/");
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13.5px] transition-colors duration-250",
                      active
                        ? "text-ivory-100"
                        : "text-ink-300 hover:bg-white/[0.04] hover:text-ivory-100",
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="dash-active"
                        className="absolute inset-0 rounded-lg bg-white/[0.07] ring-1 ring-white/[0.07] ring-inset"
                        transition={{ duration: 0.35, ease }}
                      />
                    )}
                    <Icon
                      className={cn(
                        "relative size-[17px] shrink-0 transition-colors",
                        active ? "text-gold-300" : "text-ink-400 group-hover:text-ink-200",
                      )}
                      strokeWidth={1.7}
                    />
                    <span className="relative">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );

  const sidebarInner = (
    <>
      <div className="flex h-16 shrink-0 items-center gap-2.5 border-b border-white/[0.06] px-5">
        <Logo onDark href={homeHref} showTld={false} />
      </div>

      <div className="border-b border-white/[0.06] px-3 py-3">
        <div className="flex items-center gap-3 rounded-lg bg-white/[0.04] px-3 py-2.5 ring-1 ring-white/[0.06] ring-inset">
          <span className="grid size-8 shrink-0 place-items-center rounded-md bg-gradient-to-br from-gold-300 to-gold-600 text-[11.5px] font-semibold text-ink-950">
            {initials(brandLabel)}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-medium text-ivory-100">
              {brandLabel}
            </p>
            <p className="truncate text-[11px] text-ink-400">{brandSub}</p>
          </div>
          <ChevronDown className="size-3.5 shrink-0 text-ink-400" strokeWidth={1.8} />
        </div>
      </div>

      {nav}

      <div className="shrink-0 border-t border-white/[0.06] p-3">
        {footerCard}
        <div className="mt-2 flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-white/[0.04]">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white/[0.07] text-[11px] font-medium text-ivory-100 ring-1 ring-white/10 ring-inset">
            {initials(account)}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12.5px] text-ivory-100">{account}</p>
            <p className="truncate text-[11px] text-ink-400">{accountRole}</p>
          </div>
          <Link
            href="/autentificare"
            aria-label="Deconectare"
            className="text-ink-400 transition-colors hover:text-ivory-100"
          >
            <LogOut className="size-3.5" strokeWidth={1.8} />
          </Link>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-dvh bg-ivory-100">
      {/* Sidebar desktop */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[248px] flex-col border-r border-white/[0.06] bg-ink-950 lg:flex">
        {sidebarInner}
      </aside>

      {/* Sidebar mobil */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-50 bg-ink-950/50 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.42, ease }}
              className="fixed inset-y-0 left-0 z-50 flex w-[268px] flex-col bg-ink-950 lg:hidden"
            >
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Închide meniul"
                className="absolute top-4 right-3 z-10 grid size-9 place-items-center rounded-lg text-ink-300 transition hover:bg-white/8 hover:text-ivory-100"
              >
                <X className="size-4.5" strokeWidth={1.8} />
              </button>
              {sidebarInner}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Conținut */}
      <div className="lg:pl-[248px]">
        <Topbar
          brandLabel={brandLabel}
          brandSub={brandSub}
          account={account}
          onMenu={() => setMobileOpen(true)}
        />
        <main className="mx-auto max-w-[1400px] px-4 pt-5 pb-16 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Topbar                                                                    */
/* -------------------------------------------------------------------------- */

function Topbar({
  brandLabel,
  brandSub,
  account,
  onMenu,
}: {
  brandLabel: string;
  brandSub: string;
  account: string;
  onMenu: () => void;
}) {
  const [openNotif, setOpenNotif] = useState(false);
  const { liveFeedback, seen, markSeen } = useDemo();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpenNotif(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const unread = baseNotifications.filter((n) => n.unread).length + liveFeedback.length;

  const items = [
    ...liveFeedback.map((f) => ({
      id: f.id,
      title: f.sentiment === "negativ" ? "Feedback nou" : "Client mulțumit",
      body: f.message,
      minutesAgo: 0,
      unread: true,
    })),
    ...baseNotifications,
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-ivory-300 bg-ivory-100/97">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-3 px-4 sm:px-6 lg:px-8">
        <button
          onClick={onMenu}
          aria-label="Deschide meniul"
          className="-ml-1.5 grid size-9 shrink-0 place-items-center rounded-lg text-ink-500 transition hover:bg-ink-950/[0.05] hover:text-ink-950 lg:hidden"
        >
          <Menu className="size-5" strokeWidth={1.7} />
        </button>

        <div className="min-w-0 flex-1">
          <p className="truncate text-[14.5px] font-medium text-ink-950">{brandLabel}</p>
          <p className="hidden text-[12px] text-ink-300 sm:block">{brandSub}</p>
        </div>

        <button
          onClick={() => {
            const evt = new KeyboardEvent("keydown", {
              key: "k",
              metaKey: true,
              bubbles: true,
            });
            window.dispatchEvent(evt);
          }}
          className="hidden h-9 items-center gap-2 rounded-lg border border-ivory-300 bg-white px-3 text-[12.5px] text-ink-300 transition hover:border-ink-150 hover:text-ink-500 md:flex"
        >
          <Search className="size-3.5" strokeWidth={1.9} />
          Caută…
          <kbd className="ml-4 flex items-center gap-0.5 rounded border border-ivory-300 bg-ivory-100 px-1 py-0.5 text-[10px] text-ink-300">
            <Command className="size-2.5" />K
          </kbd>
        </button>

        <div className="relative" ref={ref}>
          <button
            onClick={() => {
              setOpenNotif((v) => !v);
              markSeen();
            }}
            aria-label="Notificări"
            className="relative grid size-9 place-items-center rounded-lg text-ink-500 transition hover:bg-ink-950/[0.05] hover:text-ink-950"
          >
            <Bell className="size-4.5" strokeWidth={1.7} />
            {unread > 0 && (
              <span className="absolute top-1.5 right-1.5 flex size-2">
                {!seen && (
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-gold-400 opacity-70" />
                )}
                <span className="relative inline-flex size-2 rounded-full bg-gold-500 ring-2 ring-ivory-100" />
              </span>
            )}
          </button>

          <AnimatePresence>
            {openNotif && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.99 }}
                transition={{ duration: 0.25, ease }}
                className="absolute right-0 z-50 mt-2 w-[320px] overflow-hidden rounded-xl border border-ivory-300 bg-white shadow-[0_28px_70px_-24px_rgba(8,8,10,0.35)]"
              >
                <div className="flex items-center justify-between border-b border-ivory-200 px-4 py-3">
                  <p className="text-[13px] font-medium text-ink-950">Notificări</p>
                  <Badge tone="muted">{unread} noi</Badge>
                </div>
                <ul className="scrollbar-fine max-h-[320px] divide-y divide-ivory-200 overflow-y-auto">
                  {items.slice(0, 6).map((n) => (
                    <li
                      key={n.id}
                      className={cn(
                        "flex gap-3 px-4 py-3 transition-colors hover:bg-ivory-100",
                        n.unread && "bg-gold-100/25",
                      )}
                    >
                      <span className="mt-1 grid size-6 shrink-0 place-items-center rounded-md bg-ivory-200 text-ink-400">
                        <Sparkles className="size-3" strokeWidth={1.9} />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[12.5px] font-medium text-ink-900">
                          {n.title}
                        </p>
                        <p className="mt-0.5 text-[12px] leading-snug text-ink-400">
                          {n.body}
                        </p>
                        <p className="mt-1 text-[11px] text-ink-300">
                          {relativeFromMinutes(n.minutesAgo)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/dashboard/feedback"
                  className="flex items-center justify-center gap-1.5 border-t border-ivory-200 py-2.5 text-[12.5px] font-medium text-ink-600 transition-colors hover:text-ink-950"
                >
                  Vezi tot feedback-ul
                  <ArrowUpRight className="size-3" />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-ink-950 text-[11.5px] font-medium text-ivory-100">
          {initials(account)}
        </span>
      </div>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/*  Antet de pagină                                                           */
/* -------------------------------------------------------------------------- */

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 pt-2 pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="tight text-[24px] leading-tight font-medium text-ink-950 sm:text-[28px]"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.06, ease }}
            className="mt-1.5 text-[14px] text-ink-400"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function Panel({
  title,
  description,
  action,
  children,
  className,
  bodyClassName,
}: {
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <section
      className={cn(
        "overflow-hidden rounded-xl border border-ivory-300 bg-white shadow-[0_1px_2px_rgba(8,8,10,0.035)]",
        className,
      )}
    >
      {(title || action) && (
        <div className="flex items-start justify-between gap-4 border-b border-ivory-200 px-5 py-4">
          <div className="min-w-0">
            {title && (
              <h2 className="text-[14.5px] font-medium text-ink-950">{title}</h2>
            )}
            {description && (
              <p className="mt-1 text-[12.5px] text-ink-300">{description}</p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      <div className={bodyClassName ?? "p-5"}>{children}</div>
    </section>
  );
}
