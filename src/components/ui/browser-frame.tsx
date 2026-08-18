import type { ReactNode } from "react";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export function BrowserFrame({
  url = "recenziata.ro/dashboard",
  children,
  className,
  tone = "dark",
}: {
  url?: string;
  children: ReactNode;
  className?: string;
  tone?: "dark" | "light";
}) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border shadow-[0_40px_100px_-40px_rgba(8,8,10,0.6)]",
        dark ? "border-white/10 bg-ink-900" : "border-ink-100 bg-white",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center gap-3 border-b px-4 py-2.5",
          dark ? "border-white/[0.07] bg-ink-850" : "border-ink-100 bg-ivory-100",
        )}
      >
        <div className="flex gap-1.5">
          {["#e0605a", "#dfab4a", "#5aa96f"].map((c) => (
            <span
              key={c}
              className="size-2.5 rounded-full opacity-70"
              style={{ background: c }}
            />
          ))}
        </div>
        <div
          className={cn(
            "mx-auto flex max-w-xs flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1 text-[11px]",
            dark ? "bg-white/[0.05] text-ink-300" : "bg-white text-ink-400",
          )}
        >
          <Lock className="size-2.5" strokeWidth={2.4} />
          {url}
        </div>
        <div className="w-12" />
      </div>
      {children}
    </div>
  );
}
