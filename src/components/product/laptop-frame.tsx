import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Carcasă de MacBook Pro (generația actuală) — echivalentul PhoneFrame
 * pentru preview-uri desktop ale dashboard-ului. Bezel subțire, colțuri
 * rotunjite pe ecran și notch-ul caracteristic sus, nu o simplă cameră
 * punctiformă într-un bezel gros — plus balama și o bază minimală, vizibile
 * doar ca o linie subțire, cum arată un laptop fotografiat din față.
 */
export function LaptopFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative mx-auto w-full max-w-[1120px]", className)}>
      <div className="relative rounded-t-[1.1rem] rounded-b-md bg-[linear-gradient(150deg,#5a5a63_0%,#22222a_16%,#3a3a44_40%,#1c1c22_66%,#4a4a55_88%,#26262e_100%)] p-[6px] shadow-[0_60px_140px_-40px_rgba(8,8,10,0.7)] sm:p-[8px]">
        <div className="relative overflow-hidden rounded-t-[0.7rem] rounded-b-[0.3rem] bg-ink-950">
          {/* notch */}
          <div
            aria-hidden
            className="absolute top-0 left-1/2 z-20 h-[13px] w-[96px] -translate-x-1/2 rounded-b-[9px] bg-ink-950 sm:h-[17px] sm:w-[128px]"
          >
            <span className="absolute top-1/2 left-1/2 size-[4px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#111114] ring-1 ring-white/[0.04]" />
          </div>
          {children}
        </div>
      </div>

      {/* balama + bază — doar o linie subțire, cum se vede din față */}
      <div className="relative mx-auto h-[6px] w-[97%] bg-[linear-gradient(180deg,#3a3a44_0%,#1c1c22_55%,#111114_100%)] sm:h-[8px]">
        <div className="absolute top-0 left-1/2 h-full w-[22%] -translate-x-1/2 rounded-b-[3px] bg-[#0a0a0c]" />
      </div>
      <div className="mx-auto h-[4px] w-[78%] rounded-b-[999px] bg-[linear-gradient(180deg,#232329_0%,#131316_100%)] sm:h-[6px]" />
    </div>
  );
}
