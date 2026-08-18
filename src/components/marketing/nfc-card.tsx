"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useCallback, useRef } from "react";
import { LogoMark } from "@/components/brand/logo";
import { QrCode } from "@/components/brand/qr";
import { cn } from "@/lib/utils";

/** Text gravat: o lumină de sus, o umbră de jos. */
const etched = {
  textShadow: "0 1px 0 rgba(255,255,255,0.09), 0 -1px 0 rgba(0,0,0,0.6)",
} as const;

/**
 * Cardul NFC Recenziata — aluminiu anodizat charcoal, gravat laser.
 *
 * Performanță: reflexia speculară este un strat pre-desenat mutat cu
 * `translate3d`, nu un `background` recalculat la fiecare cadru, iar
 * dreptunghiul cardului este citit o singură dată la intrarea cursorului.
 */
export function NfcCard({
  className,
  interactive = true,
  serial = "RC-2026-0418",
  business = "MAISON NOIR",
  intensity = 9,
}: {
  className?: string;
  interactive?: boolean;
  serial?: string;
  business?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rect = useRef<DOMRect | null>(null);
  const reduced = useReducedMotion();

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const spring = { stiffness: 130, damping: 20, mass: 0.7 };
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);

  const rotateY = useTransform(sx, [0, 1], [-intensity, intensity]);
  const rotateX = useTransform(sy, [0, 1], [intensity * 0.72, -intensity * 0.72]);

  // Strat de reflexie mutat prin transform (fără repaint de gradient).
  const glareX = useTransform(sx, [0, 1], ["-18%", "118%"]);
  const glareY = useTransform(sy, [0, 1], ["-24%", "124%"]);
  const glareTransform = useMotionTemplate`translate3d(${glareX}, ${glareY}, 0) translate(-50%, -50%)`;

  const readRect = useCallback(() => {
    rect.current = ref.current?.getBoundingClientRect() ?? null;
  }, []);

  const onMove = useCallback(
    (e: React.PointerEvent) => {
      if (!interactive || reduced) return;
      const r = rect.current;
      if (!r) return;
      px.set((e.clientX - r.left) / r.width);
      py.set((e.clientY - r.top) / r.height);
    },
    [interactive, reduced, px, py],
  );

  const onLeave = useCallback(() => {
    px.set(0.5);
    py.set(0.5);
  }, [px, py]);

  return (
    <div
      ref={ref}
      onPointerEnter={readRect}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn("[perspective:1500px]", className)}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="@container relative aspect-[1.586] w-full"
      >
        {/* umbra proiectată */}
        <div
          aria-hidden
          className="absolute inset-x-[9%] -bottom-5 h-14 rounded-[50%] bg-ink-950/50 blur-xl"
          style={{ transform: "translateZ(-40px)" }}
        />

        {/* muchie: aluminiu frezat, cu două puncte de lumină aurie */}
        <div className="relative h-full w-full rounded-[18px] bg-[linear-gradient(138deg,#f0dcb4_0%,#a08a63_9%,#4a4a56_26%,#26262e_46%,#1b1b21_60%,#3e3e48_72%,#8d7647_88%,#e6cd9c_100%)] p-[1.4px] shadow-[0_26px_60px_-24px_rgba(8,8,10,0.55),0_3px_8px_rgba(8,8,10,0.28),0_1px_0_rgba(255,255,255,0.35)]">
          <div className="relative h-full w-full overflow-hidden rounded-[17px] bg-[#22222a]">
            {/* Bază: anodizare neutră, cu o singură trecere de lumină.
                Un singur strat în loc de trei — mai puțină suprafață de pictat. */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(152deg, #33333d 0%, #2a2a33 22%, #1e1e25 52%, #262630 74%, #1b1b21 100%), radial-gradient(130% 100% at 50% -10%, rgba(255,255,255,0.10), transparent 58%)",
              }}
            />

            {/* aluminiu periat — linii foarte fine, aproape neutre */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.5]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(91deg, rgba(255,255,255,0.042) 0px, rgba(255,255,255,0.042) 0.5px, rgba(0,0,0,0.05) 0.5px, rgba(0,0,0,0.05) 2px)",
              }}
            />

            {/* reflexie anizotropă, discretă */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-55"
              style={{
                background:
                  "conic-gradient(from 208deg at 28% 18%, rgba(255,255,255,0.13), transparent 20%, rgba(255,255,255,0.05) 46%, transparent 64%, rgba(255,255,255,0.10) 84%, transparent)",
              }}
            />

            {/* reflexia care urmărește cursorul — se mută, nu se redesenează */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute top-0 left-0 h-[130%] w-[85%]"
              style={{
                transform: glareTransform,
                background:
                  "radial-gradient(closest-side, rgba(255,255,255,0.17), rgba(255,255,255,0.05) 46%, transparent 78%)",
              }}
            />

            {/* vignetă jos, pentru greutate optică */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(100% 90% at 50% 118%, rgba(0,0,0,0.45), transparent 62%)",
              }}
            />

            {/* ---------------- conținut gravat ---------------- */}
            <div className="relative flex h-full flex-col justify-between p-[6.4%]">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-[3.2%]">
                  <LogoMark className="size-[12.5%] min-w-7 opacity-95" />
                  <div>
                    <p
                      className="tight text-[clamp(0.72rem,3.15cqw,1rem)] leading-none font-medium text-ivory-100"
                      style={etched}
                    >
                      Recenziata
                      <span className="text-gold-300">.ro</span>
                    </p>
                    <p
                      className="mt-[0.35em] text-[clamp(0.42rem,1.65cqw,0.58rem)] leading-none tracking-[0.24em] text-ink-150 uppercase"
                      style={etched}
                    >
                      {business}
                    </p>
                  </div>
                </div>

                {/* undele NFC gravate */}
                <svg
                  viewBox="0 0 24 24"
                  className="w-[10.5%] min-w-6 text-gold-300/70"
                  fill="none"
                  aria-hidden
                >
                  <circle cx="5" cy="12" r="1.6" fill="currentColor" />
                  <path
                    d="M9 8.6a5.2 5.2 0 0 1 0 6.8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    opacity="0.8"
                  />
                  <path
                    d="M12.4 6a9 9 0 0 1 0 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    opacity="0.5"
                  />
                  <path
                    d="M15.8 3.4a12.8 12.8 0 0 1 0 17.2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    opacity="0.26"
                  />
                </svg>
              </div>

              <div className="flex items-end justify-between gap-[5%]">
                <div className="min-w-0">
                  <p
                    className="text-[clamp(0.8rem,3.7cqw,1.2rem)] leading-[1.15] font-normal text-ivory-100"
                    style={{ ...etched, fontFamily: "var(--font-display)" }}
                  >
                    Cum a fost
                    <br />
                    experiența ta?
                  </p>
                  <p
                    className="mt-[0.9em] text-[clamp(0.36rem,1.5cqw,0.55rem)] leading-none tracking-[0.18em] whitespace-nowrap text-ink-200 uppercase"
                    style={etched}
                  >
                    Atinge cu telefonul
                    <span className="mx-[0.6em] text-ink-400">·</span>
                    {serial}
                  </p>
                </div>

                {/* QR gravat, într-un locaș ușor adâncit */}
                <div className="relative w-[18.5%] min-w-14 shrink-0">
                  <div
                    className="rounded-[4px] p-[8%]"
                    style={{
                      background:
                        "linear-gradient(160deg, rgba(0,0,0,0.32), rgba(255,255,255,0.05))",
                      boxShadow:
                        "inset 0 1px 1px rgba(0,0,0,0.5), inset 0 -1px 0 rgba(255,255,255,0.07)",
                    }}
                  >
                    <QrCode className="text-ivory-100/72" />
                  </div>
                </div>
              </div>
            </div>

            {/* margine interioară gravată */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-[3.4%] rounded-[11px] ring-1 ring-white/[0.05] ring-inset"
            />
            {/* teșitura de sus, unde se sprijină lumina */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
