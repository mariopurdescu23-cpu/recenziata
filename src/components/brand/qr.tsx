import qrData from "@/lib/qr-data.json";
import { cn } from "@/lib/utils";

type QrKey = keyof typeof qrData;

/**
 * Cod QR real, generat la build din URL-ul afacerii și randat ca SVG.
 * Fără dependențe la runtime — se scalează perfect și la gravură laser.
 */
export function QrCode({
  target = "maison-noir",
  className,
  quiet = 1,
}: {
  target?: QrKey;
  className?: string;
  /** module de margine albă */
  quiet?: number;
}) {
  const { size, rows } = qrData[target];
  const total = size + quiet * 2;

  const cells: string[] = [];
  rows.forEach((row: string, y: number) => {
    let run = 0;
    for (let x = 0; x <= size; x++) {
      const on = row[x] === "1";
      if (on) {
        run++;
      } else if (run > 0) {
        cells.push(`M${x - run + quiet} ${y + quiet}h${run}v1h-${run}z`);
        run = 0;
      }
    }
  });

  return (
    <svg
      viewBox={`0 0 ${total} ${total}`}
      className={cn("block h-auto w-full", className)}
      shapeRendering="crispEdges"
      role="img"
      aria-label="Cod QR către pagina de feedback"
    >
      <path d={cells.join("")} fill="currentColor" />
    </svg>
  );
}
