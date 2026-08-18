"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { FeedbackFlow } from "@/components/product/feedback-flow";
import { useDemo } from "@/lib/demo-store";
import { useToast } from "@/components/ui/toast";
import { Glow } from "@/components/ui/glow";

export function ExperienceView() {
  const { registerScan } = useDemo();
  const { toast } = useToast();

  useEffect(() => {
    registerScan();
  }, [registerScan]);

  return (
    <div className="relative min-h-dvh bg-ink-950">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" />
      <Glow className="-top-40 left-1/2 h-[30rem] w-[52rem] -translate-x-1/2" opacity={0.65} />

      {/* Bara de prezentare — nu face parte din experiența clientului */}
      <div className="relative z-20 hidden items-center justify-between px-6 py-4 sm:flex">
        <p className="text-[12.5px] text-ink-400">
          Pagina publică a afacerii ·{" "}
          <span className="text-ink-200">recenziata.ro/maison-noir</span>
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1.5 text-[12.5px] text-ink-200 backdrop-blur transition hover:border-white/25 hover:text-ivory-100"
        >
          <LayoutDashboard className="size-3.5" strokeWidth={1.8} />
          Vezi dashboard-ul
          <ArrowUpRight className="size-3" />
        </Link>
      </div>

      {/* Mobil: ecran complet. Desktop: card centrat. */}
      <div className="relative z-10 flex min-h-dvh items-center justify-center sm:min-h-[calc(100dvh-4.5rem)] sm:p-6">
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="h-dvh w-full sm:h-auto sm:max-w-[420px] sm:overflow-hidden sm:rounded-3xl sm:border sm:border-white/10 sm:shadow-[0_50px_120px_-40px_rgba(0,0,0,0.9)]"
        >
          <div className="h-full sm:h-[640px]">
            <FeedbackFlow
              onComplete={({ sentiment, category }) =>
                toast({
                  title: "Feedback înregistrat",
                  description:
                    sentiment === "negativ"
                      ? `Motiv: ${category}. Vizibil deja în dashboard.`
                      : "Client mulțumit — redirecționat către Google.",
                  action: { label: "Deschide dashboard-ul", href: "/dashboard" },
                })
              }
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
