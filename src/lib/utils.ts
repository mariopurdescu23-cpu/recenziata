import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combină clase Tailwind și rezolvă corect conflictele (ex: `w-full` +
 * `w-[252px]` din default + override) păstrând ultima valoare intenționată,
 * indiferent de ordinea de apariție a claselor în stylesheet-ul generat.
 */
export function cn(...classes: ClassValue[]) {
  return twMerge(clsx(...classes));
}

const roNumber = new Intl.NumberFormat("ro-RO");
const roNumber1 = new Intl.NumberFormat("ro-RO", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export function formatNumber(value: number) {
  return roNumber.format(Math.round(value));
}

export function formatDecimal(value: number) {
  return roNumber1.format(value);
}

export function formatLei(value: number) {
  return `${roNumber.format(Math.round(value))} lei`;
}

export function formatPercent(value: number) {
  return `${roNumber1.format(value)}%`;
}

export function formatDelta(value: number) {
  const sign = value > 0 ? "+" : value < 0 ? "−" : "";
  return `${sign}${roNumber1.format(Math.abs(value))}%`;
}

/** 14 mar. 2026 */
export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("ro-RO", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

/** 14 mar., 19:42 */
export function formatDateTime(date: Date) {
  return new Intl.DateTimeFormat("ro-RO", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

/** „acum 4 minute” */
export function formatRelative(date: Date, now: Date = new Date()) {
  const diff = Math.round((date.getTime() - now.getTime()) / 1000);
  const abs = Math.abs(diff);
  const rtf = new Intl.RelativeTimeFormat("ro-RO", { numeric: "auto" });
  if (abs < 60) return "chiar acum";
  if (abs < 3600) return rtf.format(Math.round(diff / 60), "minute");
  if (abs < 86400) return rtf.format(Math.round(diff / 3600), "hour");
  if (abs < 86400 * 30) return rtf.format(Math.round(diff / 86400), "day");
  return formatDate(date);
}

export function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
