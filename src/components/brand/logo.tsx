import Link from "next/link";
import { cn } from "@/lib/utils";

/** Marca Recenziata — undele NFC care pornesc dintr-un punct de contact. */
export function LogoMark({
  className,
  gold = true,
}: {
  className?: string;
  gold?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={cn("size-8", className)}
    >
      <rect
        width="32"
        height="32"
        rx="9"
        className="fill-ink-950"
      />
      <rect
        x="0.5"
        y="0.5"
        width="31"
        height="31"
        rx="8.5"
        className="stroke-white/10"
      />
      <circle
        cx="11"
        cy="16"
        r="2.1"
        className={gold ? "fill-gold-300" : "fill-ivory-100"}
      />
      <path
        d="M15.6 11.6a6.2 6.2 0 0 1 0 8.8"
        className={gold ? "stroke-gold-300" : "stroke-ivory-100"}
        strokeWidth="1.7"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M19.4 8.6a10.6 10.6 0 0 1 0 14.8"
        className={gold ? "stroke-gold-400" : "stroke-ivory-100"}
        strokeWidth="1.7"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M23.2 5.8a14.8 14.8 0 0 1 0 20.4"
        className={gold ? "stroke-gold-500" : "stroke-ivory-100"}
        strokeWidth="1.7"
        strokeLinecap="round"
        opacity="0.28"
      />
    </svg>
  );
}

export function Wordmark({
  className,
  onDark,
  showTld = true,
}: {
  className?: string;
  onDark?: boolean;
  showTld?: boolean;
}) {
  return (
    <span
      className={cn(
        "tight text-[17px] leading-none font-medium",
        onDark ? "text-ivory-100" : "text-ink-950",
        className,
      )}
    >
      Recenziata
      {showTld && (
        <span className={onDark ? "text-gold-400" : "text-gold-500"}>.ro</span>
      )}
    </span>
  );
}

export function Logo({
  onDark,
  href = "/",
  className,
  showTld = true,
}: {
  onDark?: boolean;
  href?: string | null;
  className?: string;
  showTld?: boolean;
}) {
  const content = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="size-[30px]" />
      <Wordmark onDark={onDark} showTld={showTld} />
    </span>
  );

  if (!href) return content;

  return (
    <Link href={href} aria-label="Recenziata — pagina principală" className="inline-flex">
      {content}
    </Link>
  );
}
