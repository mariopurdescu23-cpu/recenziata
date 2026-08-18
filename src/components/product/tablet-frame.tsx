import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Carcasă de iPad (generația actuală, landscape) — bezel uniform subțire pe
 * toate laturile, colțuri rotunjite, cameră centrată sus, fără buton fizic
 * de Home. O singură placă, spre deosebire de laptop — se scalează curat
 * și pe ecrane mici, fără balama/bază de gestionat la dimensiuni reduse.
 */
export function TabletFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative mx-auto w-full max-w-[1120px]", className)}>
      <div className="relative rounded-[1.4rem] bg-[linear-gradient(150deg,#5a5a63_0%,#22222a_16%,#3a3a44_40%,#1c1c22_66%,#4a4a55_88%,#26262e_100%)] p-[10px] shadow-[0_60px_140px_-40px_rgba(8,8,10,0.7)] sm:rounded-[1.8rem] sm:p-[14px]">
        {/* cameră */}
        <div
          aria-hidden
          className="absolute top-[5px] left-1/2 z-20 size-[5px] -translate-x-1/2 rounded-full bg-[#111114] ring-1 ring-white/[0.06] sm:top-[7px] sm:size-[6px]"
        />
        <div className="overflow-hidden rounded-[0.7rem] bg-ink-950 sm:rounded-[1rem]">
          {children}
        </div>
      </div>
    </div>
  );
}
