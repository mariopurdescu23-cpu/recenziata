import type { Metadata } from "next";
import { LegalPage } from "@/components/marketing/legal-page";

export const metadata: Metadata = {
  title: "Termeni și condiții",
  description:
    "Termenii de utilizare a platformei Recenziata.ro: abonamente, carduri NFC, livrare, răspundere și încetarea contractului.",
  alternates: { canonical: "/termeni" },
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Termeni și condiții"
      intro="Documentul de față reglementează relația dintre Recenziata SRL și afacerile care folosesc platforma. Este scris ca să poată fi citit, nu ca să descurajeze cititul."
      updated="1 august 2026"
      sections={[
        {
          title: "Cine suntem și ce oferim",
          paragraphs: [
            "Recenziata SRL, cu sediul în Timișoara, județul Timiș, CUI RO 48219307, operează platforma disponibilă la adresa recenziata.ro.",
            "Serviciul constă într-o pagină publică de feedback asociată afacerii tale, unul sau mai multe carduri NFC fizice și un panou de control în care vezi scanările, feedback-ul și evoluția recenziilor.",
          ],
        },
        {
          title: "Contul și responsabilitatea ta",
          paragraphs: [
            "Ești responsabil pentru acuratețea datelor afacerii afișate public și pentru păstrarea confidențialității credențialelor de acces.",
            "Ne anunți fără întârziere dacă suspectezi o utilizare neautorizată a contului.",
          ],
        },
        {
          title: "Abonamente și plată",
          paragraphs: [
            "Abonamentele se facturează lunar sau anual, în avans, în lei, cu TVA inclus. Perioada de test este de 14 zile și nu necesită card bancar.",
            "Poți schimba planul oricând din panoul de control. La upgrade, diferența se calculează proporțional pentru perioada rămasă; la downgrade, noul preț se aplică de la următoarea perioadă de facturare.",
            "Dacă o plată eșuează, reîncercăm automat de trei ori în interval de șapte zile. După acest termen, pagina publică afișează un mesaj neutru, iar scanările continuă să fie înregistrate.",
          ],
        },
        {
          title: "Cardurile NFC",
          paragraphs: [
            "Cardurile se achiziționează separat de abonament, printr-o plată unică, și rămân proprietatea ta.",
            "Termenul standard de livrare este de 3–5 zile lucrătoare de la confirmarea designului, respectiv 7 zile lucrătoare pentru comenzi de peste 20 de bucăți.",
          ],
          list: [
            "Cardurile deteriorate în primul an din cauze de fabricație se înlocuiesc gratuit.",
            "URL-ul scris pe cip nu se modifică pe durata contractului.",
            "Nu garantăm funcționarea NFC pe dispozitive cu modulul dezactivat sau blocat de producător; pentru aceste cazuri, codul QR gravat rămâne funcțional.",
          ],
        },
        {
          title: "Utilizare corectă",
          paragraphs: [
            "Platforma nu poate fi folosită pentru a filtra, condiționa sau stimula financiar recenziile. Această restricție nu este opțională: încalcă politicile Google și pune în pericol profilul tău.",
            "Ne rezervăm dreptul de a suspenda un cont în cazul în care constatăm tipare de utilizare abuzivă.",
          ],
        },
        {
          title: "Disponibilitate și răspundere",
          paragraphs: [
            "Țintim o disponibilitate lunară de 99,9% pentru pagina publică de feedback. Intervențiile planificate sunt anunțate cu cel puțin 48 de ore înainte și se execută în afara intervalelor de vârf.",
            "Răspunderea noastră totală este limitată la contravaloarea abonamentului achitat în ultimele 12 luni. Nu răspundem pentru pierderi indirecte, inclusiv pierderi de profit sau de reputație.",
          ],
        },
        {
          title: "Încetarea contractului",
          paragraphs: [
            "Poți renunța oricând, cu efect la finalul perioadei de facturare curente, fără penalități și fără să contactezi pe cineva.",
            "La încetare, îți punem la dispoziție un export complet al datelor timp de 30 de zile, după care le ștergem definitiv.",
          ],
        },
        {
          title: "Modificări și lege aplicabilă",
          paragraphs: [
            "Orice modificare a acestor termeni este anunțată prin e-mail cu cel puțin 30 de zile înainte de intrarea în vigoare.",
            "Contractul este guvernat de legea română. Litigiile se soluționează pe cale amiabilă sau, în lipsă, de instanțele competente din Timișoara.",
          ],
        },
      ]}
      footer={
        <>
          <p className="text-[14px] font-medium text-ink-950">Ai o întrebare?</p>
          <p className="mt-2 text-[14px] leading-relaxed text-ink-400">
            Scrie la{" "}
            <a
              href="mailto:contact@recenziata.ro"
              className="text-ink-900 underline decoration-gold-400/60 underline-offset-4"
            >
              contact@recenziata.ro
            </a>{" "}
            și îți răspundem în aceeași zi lucrătoare.
          </p>
        </>
      }
    />
  );
}
