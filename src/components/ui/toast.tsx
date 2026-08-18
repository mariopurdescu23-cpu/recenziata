"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Info, TriangleAlert, X } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type ToastTone = "success" | "info" | "warning";

interface Toast {
  id: number;
  title: string;
  description?: string;
  tone: ToastTone;
  action?: { label: string; href: string };
}

interface ToastApi {
  toast: (t: Omit<Toast, "id" | "tone"> & { tone?: ToastTone }) => void;
}

const ToastContext = createContext<ToastApi | null>(null);

const icons: Record<ToastTone, typeof Check> = {
  success: Check,
  info: Info,
  warning: TriangleAlert,
};

const toneStyles: Record<ToastTone, string> = {
  success: "text-positive-400 bg-positive-400/12",
  info: "text-gold-300 bg-gold-300/12",
  warning: "text-warn-400 bg-warn-400/12",
};

let counter = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback<ToastApi["toast"]>(
    ({ title, description, tone = "success", action }) => {
      const id = ++counter;
      setToasts((prev) => [...prev.slice(-2), { id, title, description, tone, action }]);
      window.setTimeout(() => dismiss(id), 5200);
    },
    [dismiss],
  );

  const api = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-0 z-[90] flex flex-col items-center gap-2 p-4 sm:items-end sm:p-6"
      >
        <AnimatePresence initial={false}>
          {toasts.map((t) => {
            const Icon = icons[t.tone];
            return (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, y: 16, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-xl border border-white/10 bg-ink-900/92 p-3.5 text-ivory-100 shadow-[0_24px_60px_-20px_rgba(8,8,10,0.6)] backdrop-blur-xl"
              >
                <div className="flex gap-3">
                  <span
                    className={`mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg ${toneStyles[t.tone]}`}
                  >
                    <Icon className="size-4" strokeWidth={2} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13.5px] leading-tight font-medium">{t.title}</p>
                    {t.description && (
                      <p className="mt-1 text-[12.5px] leading-snug text-ink-200">
                        {t.description}
                      </p>
                    )}
                    {t.action && (
                      <a
                        href={t.action.href}
                        className="mt-2 inline-block text-[12.5px] font-medium text-gold-300 underline-offset-4 hover:underline"
                      >
                        {t.action.label}
                      </a>
                    )}
                  </div>
                  <button
                    onClick={() => dismiss(t.id)}
                    aria-label="Închide notificarea"
                    className="-m-1 size-7 shrink-0 rounded-lg p-1 text-ink-300 transition hover:bg-white/8 hover:text-ivory-100"
                  >
                    <X className="size-full" strokeWidth={2} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast trebuie folosit în interiorul ToastProvider");
  return ctx;
}
