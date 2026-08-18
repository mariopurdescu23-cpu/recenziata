"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { FeedbackCategory, FeedbackEntry, Sentiment } from "./data";

/**
 * Starea „vie” a demo-ului.
 *
 * Feedback-ul trimis din simulatorul de telefon ajunge instant în dashboard.
 * Într-o implementare reală, acest provider ar fi înlocuit de un client
 * de API + realtime (websocket / SSE) — restul UI-ului rămâne identic.
 */

export interface LiveFeedback extends FeedbackEntry {
  createdAt: number;
}

interface DemoState {
  liveFeedback: LiveFeedback[];
  liveScans: number;
  addFeedback: (input: {
    sentiment: Sentiment;
    category: FeedbackCategory;
    message: string;
    wentToGoogle: boolean;
  }) => void;
  registerScan: () => void;
  reset: () => void;
  seen: boolean;
  markSeen: () => void;
}

const DemoContext = createContext<DemoState | null>(null);

const STORAGE_KEY = "recenziata.demo.v1";

export function DemoProvider({ children }: { children: ReactNode }) {
  const [liveFeedback, setLiveFeedback] = useState<LiveFeedback[]>([]);
  const [liveScans, setLiveScans] = useState(0);
  const [seen, setSeen] = useState(true);

  // sessionStorage nu există la randarea pe server, deci restaurarea se face
  // după montare. Până când starea salvată este citită, NU scriem nimic —
  // altfel primul render (gol) ar șterge exact ce încercăm să restaurăm.
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;
    Promise.resolve().then(() => {
      if (cancelled) return;
      try {
        const raw = window.sessionStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          setLiveFeedback(parsed.liveFeedback ?? []);
          setLiveScans(parsed.liveScans ?? 0);
          setSeen(parsed.seen ?? true);
        }
      } catch {
        /* sessionStorage indisponibil — demo-ul funcționează oricum */
      }
      setHydrated(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ liveFeedback, liveScans, seen }),
      );
    } catch {
      /* ignorăm */
    }
  }, [hydrated, liveFeedback, liveScans, seen]);

  const addFeedback = useCallback<DemoState["addFeedback"]>((input) => {
    setLiveFeedback((prev) => [
      {
        id: `fb-live-${Date.now()}`,
        message: input.message,
        category: input.category,
        sentiment: input.sentiment,
        status: "nou",
        minutesAgo: 0,
        source: "NFC",
        location: "Masa 12",
        wentToGoogle: input.wentToGoogle,
        live: true,
        createdAt: Date.now(),
      },
      ...prev,
    ]);
    setSeen(false);
  }, []);

  const registerScan = useCallback(() => setLiveScans((n) => n + 1), []);

  const reset = useCallback(() => {
    setLiveFeedback([]);
    setLiveScans(0);
    setSeen(true);
  }, []);

  const markSeen = useCallback(() => setSeen(true), []);

  const value = useMemo(
    () => ({ liveFeedback, liveScans, addFeedback, registerScan, reset, seen, markSeen }),
    [liveFeedback, liveScans, addFeedback, registerScan, reset, seen, markSeen],
  );

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemo trebuie folosit în interiorul DemoProvider");
  return ctx;
}
