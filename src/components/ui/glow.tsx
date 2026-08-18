import { cn } from "@/lib/utils";

/**
 * Halou decorativ.
 *
 * Folosește un gradient radial cu mai multe opriri în loc de `filter: blur()`.
 * Rezultatul vizual este practic identic, dar nu creează un layer care trebuie
 * re-filtrat la fiecare cadru — diferența se vede direct în fluiditatea
 * scroll-ului, mai ales pe laptopuri fără GPU dedicat.
 */

type Tone = "gold" | "goldSoft" | "ink";

const stops: Record<Tone, string> = {
  gold:
    "rgba(210,171,99,0.30) 0%, rgba(210,171,99,0.20) 26%, rgba(210,171,99,0.11) 45%, rgba(210,171,99,0.05) 62%, rgba(210,171,99,0.018) 78%, rgba(210,171,99,0) 100%",
  goldSoft:
    "rgba(210,171,99,0.20) 0%, rgba(210,171,99,0.13) 28%, rgba(210,171,99,0.07) 48%, rgba(210,171,99,0.028) 66%, rgba(210,171,99,0) 100%",
  ink:
    "rgba(120,120,140,0.16) 0%, rgba(120,120,140,0.09) 34%, rgba(120,120,140,0.035) 60%, rgba(120,120,140,0) 100%",
};

export function Glow({
  className,
  tone = "gold",
  opacity = 1,
}: {
  className?: string;
  tone?: Tone;
  opacity?: number;
}) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute", className)}
      style={{
        opacity,
        backgroundImage: `radial-gradient(closest-side, ${stops[tone]})`,
      }}
    />
  );
}
