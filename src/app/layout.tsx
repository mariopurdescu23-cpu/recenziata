import type { Metadata, Viewport } from "next";
import { inter, display } from "./fonts";
import "./globals.css";
import { DemoProvider } from "@/lib/demo-store";
import { ToastProvider } from "@/components/ui/toast";
import { CommandPalette } from "@/components/shell/command-palette";

const siteUrl = "https://recenziata.ro";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Recenziata.ro — Mai multe recenzii Google, prin card NFC premium",
    template: "%s · Recenziata.ro",
  },
  description:
    "Recenziata transformă fiecare experiență bună într-o oportunitate de feedback și fiecare interacțiune într-o recenzie Google. Card NFC din aluminiu, pagină de feedback și dashboard pentru afacerea ta.",
  keywords: [
    "recenzii Google",
    "card NFC recenzii",
    "feedback clienți",
    "reputație online",
    "Google Business Profile",
    "restaurante",
    "saloane",
    "hoteluri",
  ],
  authors: [{ name: "Recenziata" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: siteUrl,
    siteName: "Recenziata.ro",
    title: "Mai multe recenzii. Mai multă încredere.",
    description:
      "Card NFC premium, pagină de feedback și dashboard. De la atingere la recenzie Google în câteva secunde.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Recenziata.ro — Mai multe recenzii. Mai multă încredere.",
    description:
      "Card NFC premium, pagină de feedback și dashboard pentru afaceri locale din România.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#08080a",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ro" className={`${inter.variable} ${display.variable}`}>
      <body className="antialiased">
        <DemoProvider>
          <ToastProvider>
            {children}
            <CommandPalette />
          </ToastProvider>
        </DemoProvider>
      </body>
    </html>
  );
}
