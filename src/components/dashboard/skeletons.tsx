import { Skeleton } from "@/components/ui/primitives";

/**
 * Schelet pentru rutele din aplicație.
 *
 * Reproduce exact geometria conținutului real, ca trecerea de la schelet la
 * date să nu miște nimic pe ecran. Un schelet care „sare" costă mai multă
 * încredere decât un spinner.
 */
const rowWidths = [
  "h-3.5 w-[72%]",
  "h-3.5 w-[54%]",
  "h-3.5 w-[64%]",
  "h-3.5 w-[46%]",
  "h-3.5 w-[68%]",
  "h-3.5 w-[58%]",
];

export function DashboardSkeleton({
  stats = 4,
  charts = true,
  rows = 6,
}: {
  stats?: number;
  charts?: boolean;
  rows?: number;
}) {
  return (
    <div aria-busy="true" aria-live="polite">
      <span className="sr-only">Se încarcă datele…</span>

      <div className="flex flex-col gap-4 pt-2 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Skeleton className="h-7 w-56" />
          <Skeleton className="mt-3 h-4 w-72" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-9 w-40 rounded-lg" />
          <Skeleton className="h-9 w-24 rounded-lg" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {Array.from({ length: stats }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-ivory-300 bg-white p-4 sm:p-5"
          >
            <div className="flex items-start justify-between">
              <Skeleton className="h-3.5 w-20" />
              <Skeleton className="size-9 rounded-lg" />
            </div>
            <Skeleton className="mt-3 h-7 w-24" />
            <Skeleton className="mt-4 h-3 w-16" />
          </div>
        ))}
      </div>

      {charts && (
        <>
          <Skeleton className="mt-4 h-[132px] rounded-xl" />
          <div className="mt-4 grid gap-3 lg:grid-cols-[1.85fr_1fr]">
            <div className="rounded-xl border border-ivory-300 bg-white p-5">
              <Skeleton className="h-4 w-56" />
              <Skeleton className="mt-2 h-3 w-40" />
              <Skeleton className="mt-5 h-[280px] rounded-lg" />
            </div>
            <div className="rounded-xl border border-ivory-300 bg-white p-5">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="mx-auto mt-6 size-[150px] rounded-full" />
              <div className="mt-6 space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-3.5 w-full" />
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      <div className="mt-4 overflow-hidden rounded-xl border border-ivory-300 bg-white">
        <div className="border-b border-ivory-200 px-5 py-4">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="mt-2 h-3 w-56" />
        </div>
        <div className="divide-y divide-ivory-200">
          {Array.from({ length: rows }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-4">
              <Skeleton className="size-2 shrink-0 rounded-full" />
              {/* lățimi ușor diferite: un tabel real nu are rânduri identice */}
              <div className="flex-1">
                <Skeleton className={rowWidths[i % rowWidths.length]} />
              </div>
              <Skeleton className="hidden h-5 w-20 rounded-full sm:block" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
