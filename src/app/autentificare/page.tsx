import type { Metadata } from "next";
import { LoginView } from "./login-view";

export const metadata: Metadata = {
  title: "Autentificare",
  description: "Intră în contul Recenziata pentru a-ți vedea scanările, feedback-ul și recenziile.",
  alternates: { canonical: "/autentificare" },
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return <LoginView />;
}
