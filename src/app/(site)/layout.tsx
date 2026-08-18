import type { ReactNode } from "react";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#continut"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:rounded-full focus:bg-ivory-100 focus:px-4 focus:py-2 focus:text-[13px] focus:font-medium focus:text-ink-950"
      >
        Sari la conținut
      </a>
      <Navbar />
      <main id="continut">{children}</main>
      <Footer />
    </>
  );
}
