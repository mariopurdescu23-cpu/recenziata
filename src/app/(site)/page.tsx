import type { Metadata } from "next";
import { Hero } from "@/components/marketing/hero";
import { LogoMarquee } from "@/components/marketing/logo-marquee";
import { ValueProps } from "@/components/marketing/value-props";
import { InteractiveDemo } from "@/components/product/interactive-demo";
import { CardCraft } from "@/components/marketing/card-craft";
import { DashboardPreview } from "@/components/marketing/dashboard-preview";
import { Testimonials } from "@/components/marketing/testimonials";
import { MobileApp } from "@/components/marketing/mobile-app";
import { PricingSection } from "@/components/marketing/pricing";
import { FaqSection } from "@/components/marketing/faq";
import { FinalCta } from "@/components/marketing/final-cta";
import { faq } from "@/lib/data";

export const metadata: Metadata = {
  title: "Recenziata.ro — Mai multe recenzii. Mai multă încredere.",
  description:
    "Card NFC premium din aluminiu, pagină de feedback personalizată și dashboard în timp real. De la atingere la recenzie Google în câteva secunde.",
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://recenziata.ro/#organizatie",
      name: "Recenziata.ro",
      url: "https://recenziata.ro",
      email: "contact@recenziata.ro",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Timișoara",
        addressCountry: "RO",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://recenziata.ro/#site",
      url: "https://recenziata.ro",
      name: "Recenziata.ro",
      inLanguage: "ro-RO",
      publisher: { "@id": "https://recenziata.ro/#organizatie" },
    },
    {
      "@type": "SoftwareApplication",
      name: "Recenziata",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      inLanguage: "ro-RO",
      description:
        "Platformă SaaS care ajută afacerile locale din România să colecteze feedback și recenzii Google printr-un card NFC premium.",
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "RON",
        lowPrice: "49",
        highPrice: "199",
        offerCount: "4",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "128",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <LogoMarquee />
      <ValueProps />
      <InteractiveDemo />
      <CardCraft />
      <DashboardPreview />
      <Testimonials />
      <MobileApp />
      <PricingSection compactHeading />
      <FaqSection />
      <FinalCta />
    </>
  );
}
