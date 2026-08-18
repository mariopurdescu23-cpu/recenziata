# Recenziata.ro — demo produs

Demo interactiv, complet funcțional pe front-end, pentru platforma SaaS
**Recenziata.ro**: card NFC premium → pagină de feedback → recenzie Google →
dashboard.

Construit cu **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**,
**Framer Motion**, **Recharts** și **Lucide**. Fără backend: datele sunt mock,
dar structurate exact ca un răspuns de API, iar componentele pot fi conectate la
un server fără modificări de UI.

---

## Pornire

```bash
npm install
npm run dev      # http://localhost:3000
```

Build de producție:

```bash
npm run build
npm start
```

Fonturile (Inter + Instrument Serif) sunt găzduite local în `src/fonts/`, deci
proiectul se construiește și fără acces la Google Fonts.

---

## Scenariul de prezentare (11 pași)

Demo-ul a fost construit în jurul acestui traseu. Îl poți parcurge integral fără
să atingi codul.

| Pas | Ce faci | Unde |
|-----|---------|------|
| 1 | Deschizi pagina principală — „Mai multe recenzii. Mai multă încredere.” | `/` |
| 2 | Apeși **„Vezi cum funcționează”** | scroll către secțiunea `#demo` |
| 3 | Demonstrezi cardul NFC (se înclină după cursor, reflexie speculară) | hero + secțiunea „Obiectul fizic” |
| 4 | Apeși **„Testează fluxul”** → simulatorul de telefon devine interactiv | `/#demo` |
| 5 | Alegi **„Aș fi vrut să fie mai bine”** | în simulator |
| 6 | Selectezi **„Timpul de așteptare”** și trimiți | în simulator |
| 7 | Apare un toast: „Feedback înregistrat” cu link către dashboard | colț dreapta-jos |
| 8 | Deschizi dashboard-ul — feedback-ul apare marcat **„live”**, contorul crește | `/dashboard` |
| 9 | Arăți graficele și **„Insight-ul săptămânii”** | `/dashboard` |
| 10 | Arăți ecranul **„Conectează Google Reviews”** cu preview live | `/dashboard/setari` |
| 11 | Arăți preview-ul aplicației mobile | `/aplicatie` |

**Navigare rapidă în prezentare:** `⌘K` / `Ctrl+K` deschide un command palette cu
toate ecranele. Util ca să nu cauți link-uri în fața clientului.

> Feedback-ul trimis în simulator se păstrează în `sessionStorage`, deci nu se
> pierde dacă reîmprospătezi pagina în timpul demonstrației. Butonul „Reia” din
> simulator resetează fluxul.

---

## Pagini

**Site public**

| Rută | Conținut |
|------|----------|
| `/` | Landing: hero cu card NFC 3D + telefon, demo interactiv, card craft, preview dashboard, testimoniale, aplicație mobilă, prețuri, FAQ, CTA |
| `/cum-functioneaza` | Fluxul explicat în 6 pași, demo interactiv, detalii card, FAQ |
| `/preturi` | 4 planuri cu comutator lunar/anual, card NFC one-time, tabel comparativ |
| `/aplicatie` | Preview aplicație mobilă (ecrane „Astăzi” și „Feedback”, notificare push) |
| `/blog` | Index de articole cu articol principal + newsletter |
| `/autentificare` | Login split-screen cu stări de loading/succes și acces rapid la ambele panouri |

**Experiența clientului final**

| Rută | Conținut |
|------|----------|
| `/maison-noir` | Pagina publică reală a afacerii — fluxul complet de feedback, mobile-first |

**Dashboard client (Maison Noir)**

| Rută | Conținut |
|------|----------|
| `/dashboard` | Stat cards, insight-ul săptămânii, grafice, feedback recent |
| `/dashboard/feedback` | Filtre pe sentiment/categorie, căutare, empty state |
| `/dashboard/scanari` | Evoluție, distribuție pe ore, amplasament |
| `/dashboard/recenzii` | Rating, distribuție pe stele, recenzii Google |
| `/dashboard/cardul-meu` | Card 3D, link public, cod QR real, carduri active |
| `/dashboard/setari` | **Conectează Google Reviews** (+ preview live), profil, notificări |

**Panou de administrare (owner Recenziata)**

| Rută | Conținut |
|------|----------|
| `/admin` | KPI, MRR, distribuție pe planuri, clienți recenți |
| `/admin/clienti` | Tabel cu căutare, filtre de status/plan, sortare |
| `/admin/carduri` | Comenzi de producție și expediere |
| `/admin/abonamente` | Reînnoiri, oportunități de upgrade |
| `/admin/plati` | Facturi, încasări, plăți eșuate |
| `/admin/feedback` | Agregat pe rețea |
| `/admin/configurare` | Categorii implicite, feature flags, limite pe plan |
| `/admin/setari` | Facturare, echipă, chei API |

---

## Arhitectură

```
src/
├── app/
│   ├── (site)/            grup de rute cu navbar + footer public
│   ├── dashboard/         layout propriu (sidebar + topbar)
│   ├── admin/             același shell, altă configurație de navigare
│   ├── maison-noir/       pagina publică de feedback
│   ├── autentificare/
│   ├── fonts.ts           fonturi self-hosted
│   ├── sitemap.ts robots.ts not-found.tsx
│   └── globals.css        tokens de design (culori, radii, umbre, utilities)
├── components/
│   ├── brand/             logo, wordmark, cod QR generat la build
│   ├── marketing/         hero, navbar, footer, secțiuni de landing, pricing
│   ├── product/           card NFC, ramă de telefon, flux de feedback, demo
│   ├── dashboard/         shell, stat cards, grafice, tabele, insight
│   ├── shell/             command palette (⌘K)
│   └── ui/                button, badge, reveal, counter, tooltip, toast…
└── lib/
    ├── data.ts            toate datele demo, tipate
    ├── demo-store.tsx     starea „vie” (feedback din simulator → dashboard)
    └── utils.ts           formatare ro-RO (numere, lei, date, relativ)
```

**Punctul de conectare la backend:** `src/lib/demo-store.tsx`. Provider-ul
expune `liveFeedback`, `addFeedback()` și `registerScan()`. Într-o implementare
reală, acesta ar fi înlocuit de un client de API + realtime (SSE/WebSocket);
restul UI-ului rămâne neschimbat.

---

## Sistem de design

Tokenii sunt definiți o singură dată, în `@theme` din `src/app/globals.css`.

- **Ink** — scară charcoal (`ink-950` … `ink-50`)
- **Ivory** — scară caldă pentru suprafețe deschise
- **Gold** — accent, folosit cu măsură (hairline-uri, stări active, un singur CTA per secțiune)
- **Semantic** — `positive`, `negative`, `warn`

Tipografie: **Inter** pentru UI (tracking negativ pe titluri, `tabular-nums` în
dashboard), **Instrument Serif italic** doar pentru accentele editoriale.

Scară de spacing, radii și umbre coerentă; umbrele sunt foarte fine
(`shadow-hair` → `shadow-float`). Easing unic: `cubic-bezier(0.22, 1, 0.36, 1)`.

Mișcarea respectă `prefers-reduced-motion`.

---

## Detalii de implementare care merită menționate

- **Cardul NFC** este 100% CSS/SVG: aluminiu periat (repeating-gradient),
  reflexie anizotropă (conic-gradient), glare speculară care urmărește
  pointerul, muchie aurie, zgomot fin, text „gravat” cu text-shadow. Se înclină
  în 3D după cursor, cu spring.
- **Codul QR este real**, generat la build din URL-ul afacerii și randat ca SVG
  (fără dependențe la runtime) — poate fi scanat.
- **Simulatorul de telefon** folosește container queries: tipografia fluxului de
  feedback se scalează cu lățimea ecranului, deci arată corect și într-un telefon
  de 150 px, și pe ecran complet.
- **SEO:** metadata per pagină, JSON-LD (Organization, WebSite,
  SoftwareApplication, FAQPage), `sitemap.xml`, `robots.txt`, URL-uri în română,
  HTML semantic, heading-uri corecte.
- **Performanță:** fonturi locale cu `display: swap`, fără imagini raster (totul
  este SVG/CSS), componente client doar acolo unde este nevoie, animații pe
  `transform`/`opacity`.

---

## Ce nu este implementat (intenționat)

Autentificare reală, plăți, persistență, integrare Google Business Profile.
Toate butoanele au stare vizuală și feedback; cele care ar necesita backend
simulează latența (loading → succes) în loc să facă request-uri.
