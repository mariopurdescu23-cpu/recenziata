import type { Metadata } from "next";
import { LegalPage } from "@/components/marketing/legal-page";

export const metadata: Metadata = {
  title: "Politica de confidențialitate",
  description:
    "Ce date colectează Recenziata.ro, de ce, cât timp le păstrează și ce drepturi ai. Infrastructură în Uniunea Europeană, conform GDPR.",
  alternates: { canonical: "/confidentialitate" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Politica de confidențialitate"
      intro="Colectăm cât mai puțin cu putință. Clientul final care lasă feedback rămâne anonim — nu îi cerem nume, e-mail sau telefon în niciun punct al fluxului."
      updated="1 august 2026"
      sections={[
        {
          title: "Operatorul de date",
          paragraphs: [
            "Recenziata SRL, Timișoara, județul Timiș, CUI RO 48219307, este operatorul datelor prelucrate prin platformă.",
            "Pentru orice solicitare privind datele personale, scrie la contact@recenziata.ro.",
          ],
        },
        {
          title: "Ce colectăm de la clientul final",
          paragraphs: [
            "Când cineva atinge cardul, înregistrăm evenimentul de scanare și, dacă alege să răspundă, categoria selectată și eventualul comentariu liber.",
          ],
          list: [
            "Nu cerem și nu stocăm nume, adresă de e-mail sau număr de telefon.",
            "Nu folosim cookie-uri de urmărire pe pagina publică de feedback.",
            "Adresa IP este folosită doar pentru limitarea abuzurilor și este stocată sub formă trunchiată, maximum 7 zile.",
            "Comentariul liber este opțional și rămâne vizibil doar afacerii respective.",
          ],
        },
        {
          title: "Ce colectăm de la afacerea client",
          paragraphs: [
            "Datele de contact ale persoanei care administrează contul, datele de facturare și informațiile publice ale afacerii (denumire, tip, oraș, link Google).",
            "Datele de plată sunt procesate integral de procesatorul nostru; nu stocăm numere de card pe serverele noastre.",
          ],
        },
        {
          title: "Temeiul prelucrării",
          paragraphs: [
            "Executarea contractului, pentru furnizarea serviciului și facturare.",
            "Interesul legitim, pentru securitate, prevenirea abuzurilor și îmbunătățirea produsului pe baza unor statistici agregate, care nu permit identificarea unei persoane.",
          ],
        },
        {
          title: "Cât timp păstrăm datele",
          paragraphs: [
            "Feedback-ul și evenimentele de scanare se păstrează pe durata contractului și 30 de zile după încetarea acestuia.",
            "Documentele contabile se păstrează conform termenelor legale din România.",
          ],
        },
        {
          title: "Unde sunt găzduite datele",
          paragraphs: [
            "Infrastructura este localizată în Uniunea Europeană. Nu transferăm date în afara Spațiului Economic European.",
            "Accesul intern este limitat la persoanele care au nevoie de el pentru operare și suport, pe bază de roluri.",
          ],
        },
        {
          title: "Drepturile tale",
          paragraphs: [
            "Ai dreptul de acces, rectificare, ștergere, restricționare, portabilitate și opoziție. Exportul complet al datelor este disponibil oricând din panoul de control, fără să ne contactezi.",
            "Dacă apreciezi că îți sunt încălcate drepturile, te poți adresa Autorității Naționale de Supraveghere a Prelucrării Datelor cu Caracter Personal.",
          ],
        },
        {
          title: "Subîmprocesatori",
          paragraphs: [
            "Folosim furnizori pentru găzduire, procesarea plăților, trimiterea e-mailurilor tranzacționale și livrarea cardurilor. Lista actualizată este disponibilă la cerere, iar orice modificare este anunțată în avans.",
          ],
        },
      ]}
      footer={
        <>
          <p className="text-[14px] font-medium text-ink-950">
            Vrei ștergerea datelor?
          </p>
          <p className="mt-2 text-[14px] leading-relaxed text-ink-400">
            O poți face singur din Setări, sau ne scrii la{" "}
            <a
              href="mailto:contact@recenziata.ro"
              className="text-ink-900 underline decoration-gold-400/60 underline-offset-4"
            >
              contact@recenziata.ro
            </a>
            . Termenul nostru de rezolvare este de maximum 5 zile lucrătoare.
          </p>
        </>
      }
    />
  );
}
