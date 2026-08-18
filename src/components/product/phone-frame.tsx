"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Carcasă de telefon premium: ramă titan, dynamic island, reflexie fină pe ecran.
 * Ecranul are proporția 19.5:9 și un container query pentru scalarea conținutului.
 */
export function PhoneFrame({
  children,
  className,
  statusBar = true,
  time = "9:41",
  glare = true,
}: {
  children: ReactNode;
  className?: string;
  statusBar?: boolean;
  time?: string;
  glare?: boolean;
}) {
  return (
    <div className={cn("relative w-full max-w-[320px]", className)}>
      {/* butoane laterale */}
      <div
        aria-hidden
        className="absolute top-[19%] -left-[3px] h-[7%] w-[3px] rounded-l-sm bg-gradient-to-b from-ink-500 to-ink-700"
      />
      <div
        aria-hidden
        className="absolute top-[29%] -left-[3px] h-[11%] w-[3px] rounded-l-sm bg-gradient-to-b from-ink-500 to-ink-700"
      />
      <div
        aria-hidden
        className="absolute top-[26%] -right-[3px] h-[13%] w-[3px] rounded-r-sm bg-gradient-to-b from-ink-500 to-ink-700"
      />

      <div className="relative rounded-[2.6rem] bg-[linear-gradient(150deg,#5a5a63_0%,#22222a_16%,#3a3a44_40%,#1c1c22_66%,#4a4a55_88%,#26262e_100%)] p-[3px] shadow-[0_40px_90px_-30px_rgba(8,8,10,0.75),0_2px_8px_rgba(8,8,10,0.35)]">
        <div className="relative rounded-[2.45rem] bg-ink-950 p-[7px]">
          <div className="@container relative aspect-[9/19.5] w-full overflow-hidden rounded-[2rem] bg-ivory-100">
            {/* dynamic island */}
            <div
              aria-hidden
              className="absolute top-[1.6%] left-1/2 z-30 h-[3.1%] w-[30%] -translate-x-1/2 rounded-full bg-ink-950"
            />

            {statusBar && (
              <div className="absolute inset-x-0 top-0 z-20 flex h-[6.2%] items-center justify-between px-[7%] text-[9.5px] font-semibold text-ink-900">
                <span className="tnum">{time}</span>
                <span className="flex items-center gap-1">
                  <svg viewBox="0 0 18 12" className="h-2.5 w-4" fill="currentColor">
                    <rect x="0" y="7" width="3" height="5" rx="1" />
                    <rect x="4.5" y="5" width="3" height="7" rx="1" />
                    <rect x="9" y="2.5" width="3" height="9.5" rx="1" />
                    <rect x="13.5" y="0" width="3" height="12" rx="1" opacity="0.35" />
                  </svg>
                  <svg viewBox="0 0 26 12" className="h-2.5 w-5" fill="none">
                    <rect
                      x="0.6"
                      y="0.6"
                      width="21"
                      height="10.8"
                      rx="3"
                      stroke="currentColor"
                      strokeOpacity="0.4"
                      strokeWidth="1.1"
                    />
                    <rect x="2.2" y="2.2" width="15" height="7.6" rx="1.8" fill="currentColor" />
                    <path
                      d="M23.4 4.2v3.6c1-.3 1.6-1 1.6-1.8s-.6-1.5-1.6-1.8Z"
                      fill="currentColor"
                      fillOpacity="0.4"
                    />
                  </svg>
                </span>
              </div>
            )}

            <div className="absolute inset-0">{children}</div>

            {/* home indicator */}
            <div
              aria-hidden
              className="absolute bottom-[1%] left-1/2 z-30 h-[0.45%] w-[32%] -translate-x-1/2 rounded-full bg-ink-950/25"
            />

            {glare && (
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-40"
                style={{
                  background:
                    "linear-gradient(122deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.04) 22%, transparent 42%)",
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
