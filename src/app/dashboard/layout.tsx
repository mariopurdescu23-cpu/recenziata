"use client";

import {
  CreditCard,
  LayoutDashboard,
  MessageSquareQuote,
  ScanLine,
  Settings,
  Star,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { DashboardShell } from "@/components/dashboard/shell";
import { business } from "@/lib/data";

const sections = [
  {
    items: [
      { href: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
      { href: "/dashboard/feedback", label: "Feedback", icon: MessageSquareQuote },
      { href: "/dashboard/scanari", label: "Scanări", icon: ScanLine },
      { href: "/dashboard/recenzii", label: "Recenzii", icon: Star },
    ],
  },
  {
    title: "Configurare",
    items: [
      { href: "/dashboard/cardul-meu", label: "Cardul meu", icon: CreditCard },
      { href: "/dashboard/setari", label: "Setări", icon: Settings },
    ],
  },
];

function PlanCard() {
  return (
    <div className="rounded-lg border border-white/[0.07] bg-white/[0.03] p-3">
      <div className="flex items-center justify-between">
        <p className="text-[12px] font-medium text-ivory-100">Plan Professional</p>
        <span className="rounded-full bg-gold-400/14 px-2 py-0.5 text-[10px] font-medium text-gold-300">
          activ
        </span>
      </div>
      <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-white/[0.08]">
        <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-gold-400 to-gold-300" />
      </div>
      <p className="mt-2 text-[11px] text-ink-400">9 din 15 carduri active</p>
      <Link
        href="/preturi"
        className="mt-2.5 inline-block text-[11.5px] font-medium text-gold-300 underline-offset-4 hover:underline"
      >
        Adaugă carduri
      </Link>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardShell
      sections={sections}
      brandLabel={business.name}
      brandSub={`${business.type} · ${business.city}`}
      account={business.owner}
      accountRole={business.ownerRole}
      footerCard={<PlanCard />}
    >
      {children}
    </DashboardShell>
  );
}
