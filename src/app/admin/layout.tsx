"use client";

import {
  BadgeEuro,
  CreditCard,
  LayoutDashboard,
  MessageSquareQuote,
  Receipt,
  Settings,
  SlidersHorizontal,
  Users,
} from "lucide-react";
import type { ReactNode } from "react";
import { DashboardShell } from "@/components/dashboard/shell";

const sections = [
  {
    items: [
      { href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
      { href: "/admin/clienti", label: "Clienți", icon: Users },
      { href: "/admin/carduri", label: "Carduri", icon: CreditCard },
    ],
  },
  {
    title: "Financiar",
    items: [
      { href: "/admin/abonamente", label: "Abonamente", icon: BadgeEuro },
      { href: "/admin/plati", label: "Plăți", icon: Receipt },
    ],
  },
  {
    title: "Platformă",
    items: [
      { href: "/admin/feedback", label: "Feedback", icon: MessageSquareQuote },
      { href: "/admin/configurare", label: "Configurare", icon: SlidersHorizontal },
      { href: "/admin/setari", label: "Setări", icon: Settings },
    ],
  },
];

function StatusCard() {
  return (
    <div className="rounded-lg border border-white/[0.07] bg-white/[0.03] p-3">
      <div className="flex items-center gap-2">
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-positive-400 opacity-60" />
          <span className="relative inline-flex size-2 rounded-full bg-positive-400" />
        </span>
        <p className="text-[12px] font-medium text-ivory-100">Sisteme operaționale</p>
      </div>
      <p className="mt-2 text-[11px] leading-snug text-ink-400">
        API 99,98% · ultima incidență acum 42 de zile
      </p>
    </div>
  );
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardShell
      sections={sections}
      brandLabel="Recenziata"
      brandSub="Panou de administrare"
      account="Andrei Munteanu"
      accountRole="Owner"
      footerCard={<StatusCard />}
      homeHref="/admin"
    >
      {children}
    </DashboardShell>
  );
}
