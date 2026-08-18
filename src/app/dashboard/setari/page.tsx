"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Check,
  CircleCheck,
  ExternalLink,
  Loader2,
  RefreshCcw,
  Store,
  TriangleAlert,
} from "lucide-react";
import { useState } from "react";
import { PageHeader, Panel } from "@/components/dashboard/shell";
import { PhoneFrame } from "@/components/product/phone-frame";
import { FeedbackFlow } from "@/components/product/feedback-flow";
import { Badge } from "@/components/ui/primitives";
import { useToast } from "@/components/ui/toast";
import { business } from "@/lib/data";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const tabs = [
  { id: "google", label: "Google Reviews", icon: ExternalLink },
  { id: "profil", label: "Profilul afacerii", icon: Store },
  { id: "notificari", label: "Notificări", icon: Bell },
] as const;

type Tab = (typeof tabs)[number]["id"];

export default function SettingsPage() {
  const [tab, setTab] = useState<Tab>("google");

  return (
    <>
      <PageHeader
        title="Setări"
        subtitle="Conectarea la Google, datele afacerii și alertele pe care le primești."
      />

      <div className="no-scrollbar mask-fade-x -mx-1 mb-4 flex gap-1 overflow-x-auto px-1">
        {tabs.map((t) => {
          const Icon = t.icon;
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "relative inline-flex shrink-0 items-center gap-2 rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors",
                active ? "text-ink-950" : "text-ink-400 hover:text-ink-700",
              )}
            >
              {active && (
                <motion.span
                  layoutId="settings-tab"
                  className="absolute inset-0 rounded-lg border border-ivory-300 bg-white shadow-[0_1px_2px_rgba(8,8,10,0.05)]"
                  transition={{ duration: 0.32, ease }}
                />
              )}
              <Icon className="relative size-3.5" strokeWidth={1.9} />
              <span className="relative">{t.label}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.28, ease }}
        >
          {tab === "google" && <GoogleSettings />}
          {tab === "profil" && <ProfileSettings />}
          {tab === "notificari" && <NotificationSettings />}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Google Reviews                                                            */
/* -------------------------------------------------------------------------- */

type SaveState = "idle" | "saving" | "saved";
type TestState = "idle" | "testing" | "ok" | "fail";

function GoogleSettings() {
  const [url, setUrl] = useState(business.googleUrl);
  const [save, setSave] = useState<SaveState>("idle");
  const [test, setTest] = useState<TestState>("idle");
  const { toast } = useToast();

  const valid = /^https?:\/\/.+/.test(url);

  function doSave() {
    if (!valid || save !== "idle") return;
    setSave("saving");
    window.setTimeout(() => {
      setSave("saved");
      toast({
        title: "Setările au fost salvate",
        description: "Redirecționarea către Google folosește noul link.",
      });
      window.setTimeout(() => setSave("idle"), 2400);
    }, 1100);
  }

  function doTest() {
    if (test === "testing") return;
    setTest("testing");
    window.setTimeout(() => setTest(valid ? "ok" : "fail"), 1000);
  }

  return (
    <div className="grid gap-3 lg:grid-cols-[1.35fr_1fr] lg:items-start">
      <div className="space-y-3">
        <Panel bodyClassName="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="tight text-[18px] font-medium text-ink-950">
                Conectează Google Reviews
              </h2>
              <p className="mt-1.5 max-w-md text-[13.5px] leading-relaxed text-ink-400">
                Linkul către care sunt trimiși clienții atunci când vor să lase o
                recenzie. Îl găsești în Google Business Profile → „Cere recenzii”.
              </p>
            </div>
            <Badge tone="positive" dot className="shrink-0">
              Conectat
            </Badge>
          </div>

          <div className="mt-6">
            <label
              htmlFor="google-url"
              className="mb-1.5 block text-[13px] font-medium text-ink-700"
            >
              Google Reviews URL
            </label>
            <div className="relative">
              <input
                id="google-url"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setTest("idle");
                }}
                className={cn(
                  "h-12 w-full rounded-xl border bg-white px-4 pr-11 font-mono text-[13px] text-ink-900 transition-colors focus:outline-none",
                  valid
                    ? "border-ivory-400 focus:border-ink-400"
                    : "border-negative-400/60 focus:border-negative-500",
                )}
                placeholder="https://g.page/r/…/review"
              />
              {valid && (
                <CircleCheck
                  className="absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-positive-500"
                  strokeWidth={2}
                />
              )}
            </div>
            {!valid && (
              <p className="mt-2 flex items-center gap-1.5 text-[12.5px] text-negative-500">
                <TriangleAlert className="size-3.5" strokeWidth={2} />
                Introdu o adresă completă, care începe cu https://
              </p>
            )}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            <button
              onClick={doSave}
              disabled={!valid}
              className={cn(
                "inline-flex h-10 min-w-[124px] items-center justify-center gap-2 rounded-lg text-[13.5px] font-medium transition-all duration-300 disabled:opacity-45",
                save === "saved"
                  ? "bg-positive-500 text-white"
                  : "bg-ink-950 text-ivory-100 hover:bg-ink-800 active:scale-[0.98]",
              )}
            >
              {save === "saving" && <Loader2 className="size-3.5 animate-spin" />}
              {save === "saved" && <Check className="size-3.5" strokeWidth={2.6} />}
              {save === "idle" ? "Salvează" : save === "saving" ? "Se salvează…" : "Salvat"}
            </button>

            <button
              onClick={doTest}
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-ivory-300 bg-white px-4 text-[13.5px] font-medium text-ink-600 transition-colors hover:border-ink-150 hover:text-ink-950"
            >
              {test === "testing" ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                <RefreshCcw className="size-3.5" strokeWidth={1.9} />
              )}
              Testează linkul
            </button>

            <AnimatePresence>
              {test === "ok" && (
                <motion.span
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-positive-500"
                >
                  <CircleCheck className="size-3.5" strokeWidth={2} />
                  Linkul răspunde corect (200 OK)
                </motion.span>
              )}
              {test === "fail" && (
                <motion.span
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-negative-500"
                >
                  <TriangleAlert className="size-3.5" strokeWidth={2} />
                  Linkul nu a putut fi verificat
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </Panel>

        <Panel title="Stare conexiune">
          <dl className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
            {[
              { k: "Profil Google", v: "Maison Noir · Timișoara" },
              { k: "ID locație", v: "ChIJk3sT2q9UR0cRb1Q" },
              { k: "Ultima sincronizare", v: "acum 12 minute" },
              { k: "Recenzii sincronizate", v: "312" },
            ].map((r) => (
              <div key={r.k}>
                <dt className="text-[12px] text-ink-300">{r.k}</dt>
                <dd className="mt-1 font-mono text-[13px] text-ink-800">{r.v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-5 flex flex-wrap gap-2 border-t border-ivory-200 pt-4">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center gap-2 rounded-lg border border-ivory-300 bg-white px-3.5 text-[12.5px] font-medium text-ink-600 transition-colors hover:border-ink-150 hover:text-ink-950"
            >
              <ExternalLink className="size-3.5" strokeWidth={1.9} />
              Deschide profilul
            </a>
            <button className="inline-flex h-9 items-center gap-2 rounded-lg px-3.5 text-[12.5px] font-medium text-negative-500 transition-colors hover:bg-negative-50">
              Deconectează
            </button>
          </div>
        </Panel>
      </div>

      {/* Preview */}
      <Panel
        title="Așa va vedea clientul tău experiența"
        description="Previzualizare în timp real a paginii publice"
        bodyClassName="p-5"
      >
        <div className="flex justify-center">
          <PhoneFrame className="w-[196px]">
            <FeedbackFlow compact />
          </PhoneFrame>
        </div>
        <p className="mt-5 text-center text-[12.5px] leading-relaxed text-ink-400">
          Butonul „Lasă o recenzie pe Google” trimite către linkul de mai sus.
        </p>
      </Panel>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function ProfileSettings() {
  return (
    <div className="grid gap-3 lg:grid-cols-2">
      <Panel title="Datele afacerii" description="Apar pe pagina publică de feedback">
        <div className="space-y-4">
          <Input label="Numele afacerii" defaultValue={business.name} />
          <Input label="Tip" defaultValue={business.type} />
          <Input label="Oraș" defaultValue={business.city} />
          <Input label="Adresa publică" defaultValue={business.publicUrl} mono />
        </div>
        <button className="mt-5 inline-flex h-10 items-center rounded-lg bg-ink-950 px-4 text-[13.5px] font-medium text-ivory-100 transition-colors hover:bg-ink-800">
          Salvează modificările
        </button>
      </Panel>

      <Panel
        title="Categorii de feedback"
        description="Ce poate selecta clientul când ceva nu a mers bine"
      >
        <ul className="space-y-2">
          {[
            "Timpul de așteptare",
            "Calitatea",
            "Personalul",
            "Curățenia",
            "Altceva",
          ].map((c, i) => (
            <li
              key={c}
              className="flex items-center gap-3 rounded-lg border border-ivory-300 bg-white px-3.5 py-2.5"
            >
              <span className="tnum text-[12px] text-ink-300">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 text-[13.5px] text-ink-800">{c}</span>
              <Badge tone="muted">activ</Badge>
            </li>
          ))}
        </ul>
        <button className="mt-4 text-[13px] font-medium text-ink-500 underline-offset-4 transition-colors hover:text-ink-950 hover:underline">
          Adaugă o categorie
        </button>
      </Panel>
    </div>
  );
}

function NotificationSettings() {
  const rows = [
    { label: "Feedback negativ", desc: "Imediat ce este trimis", on: true },
    { label: "Recenzie Google nouă", desc: "La fiecare recenzie sincronizată", on: true },
    { label: "Rezumat zilnic", desc: "În fiecare dimineață la 08:30", on: true },
    { label: "Rezumat săptămânal", desc: "Luni dimineață, cu insight-ul săptămânii", on: false },
    { label: "Praguri atinse", desc: "La fiecare 500 de scanări", on: false },
  ];

  return (
    <Panel title="Alerte pe e-mail" description="andrei@maisonnoir.ro">
      <ul className="divide-y divide-ivory-200">
        {rows.map((r) => (
          <NotificationRow key={r.label} {...r} />
        ))}
      </ul>
    </Panel>
  );
}

function NotificationRow({
  label,
  desc,
  on,
}: {
  label: string;
  desc: string;
  on: boolean;
}) {
  const [checked, setChecked] = useState(on);
  return (
    <li className="flex items-center justify-between gap-4 py-3.5">
      <div>
        <p className="text-[13.5px] font-medium text-ink-900">{label}</p>
        <p className="mt-0.5 text-[12.5px] text-ink-400">{desc}</p>
      </div>
      <button
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => setChecked((v) => !v)}
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300",
          checked ? "bg-ink-950" : "bg-ivory-400",
        )}
      >
        <motion.span
          layout
          transition={{ duration: 0.28, ease }}
          className={cn(
            "absolute top-0.5 size-5 rounded-full bg-white shadow-sm",
            checked ? "left-[22px]" : "left-0.5",
          )}
        />
      </button>
    </li>
  );
}

function Input({
  label,
  defaultValue,
  mono,
}: {
  label: string;
  defaultValue: string;
  mono?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-medium text-ink-700">{label}</span>
      <input
        defaultValue={defaultValue}
        className={cn(
          "h-11 w-full rounded-xl border border-ivory-400 bg-white px-4 text-[14px] text-ink-900 transition-colors focus:border-ink-400 focus:outline-none",
          mono && "font-mono text-[13px]",
        )}
      />
    </label>
  );
}
