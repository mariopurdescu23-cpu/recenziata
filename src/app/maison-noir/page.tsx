import type { Metadata } from "next";
import { ExperienceView } from "./experience-view";

export const metadata: Metadata = {
  title: "Maison Noir — Cum a fost experiența ta?",
  description:
    "Spune-ne în 10 secunde cum a fost experiența ta la Maison Noir. Feedback anonim.",
  robots: { index: false, follow: false },
};

export default function ExperiencePage() {
  return <ExperienceView />;
}
