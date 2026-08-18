/**
 * Date demo pentru Recenziata.
 * Totul este mock, dar structurat exact ca un răspuns de API —
 * componentele pot fi conectate la backend fără modificări de UI.
 */

export type Sentiment = "pozitiv" | "negativ";
export type FeedbackStatus = "nou" | "vazut" | "rezolvat";
export type FeedbackCategory =
  | "Timp de așteptare"
  | "Calitate"
  | "Personal"
  | "Curățenie"
  | "Altceva"
  | "Apreciere";

export interface FeedbackEntry {
  id: string;
  message: string;
  category: FeedbackCategory;
  sentiment: Sentiment;
  status: FeedbackStatus;
  /** minute în urmă față de momentul demo-ului */
  minutesAgo: number;
  source: "NFC" | "QR";
  location?: string;
  wentToGoogle: boolean;
  live?: boolean;
}

export interface DayPoint {
  /** „12 aug.” */
  label: string;
  short: string;
  scanari: number;
  feedback: number;
  recenzii: number;
}

/* -------------------------------------------------------------------------- */
/*  Business demo                                                             */
/* -------------------------------------------------------------------------- */

export const business = {
  name: "Maison Noir",
  type: "Restaurant",
  city: "Timișoara",
  slug: "maison-noir",
  plan: "Professional",
  owner: "Andrei Munteanu",
  ownerRole: "Administrator",
  googleUrl: "https://g.page/r/maison-noir-timisoara/review",
  publicUrl: "recenziata.ro/maison-noir",
  rating: 4.7,
  reviewCount: 312,
  cardSerial: "RC-2026-0418",
};

/* -------------------------------------------------------------------------- */
/*  Serie 30 de zile                                                          */
/* -------------------------------------------------------------------------- */

const rawSeries: Array<[number, number, number]> = [
  [28, 4, 2], [31, 5, 2], [24, 3, 1], [39, 6, 3], [52, 8, 4],
  [61, 9, 5], [44, 6, 3], [30, 4, 2], [33, 5, 2], [29, 4, 2],
  [41, 6, 3], [48, 7, 4], [66, 10, 6], [58, 9, 4], [35, 5, 2],
  [37, 5, 3], [42, 6, 3], [39, 6, 3], [46, 7, 4], [55, 8, 4],
  [71, 11, 6], [63, 9, 5], [40, 6, 3], [44, 7, 3], [47, 7, 4],
  [43, 6, 3], [51, 8, 4], [59, 9, 5], [74, 12, 7], [68, 11, 6],
];

const monthsRo = [
  "ian.", "feb.", "mar.", "apr.", "mai", "iun.",
  "iul.", "aug.", "sep.", "oct.", "nov.", "dec.",
];

export const DEMO_NOW = new Date();

export const series30d: DayPoint[] = rawSeries.map(([scanari, feedback, recenzii], i) => {
  const d = new Date(DEMO_NOW);
  d.setDate(d.getDate() - (rawSeries.length - 1 - i));
  return {
    label: `${d.getDate()} ${monthsRo[d.getMonth()]}`,
    short: `${d.getDate()}`,
    scanari,
    feedback,
    recenzii,
  };
});

export const totals = {
  scanari: 1284,
  scanariDelta: 18.4,
  feedback: 187,
  feedbackDelta: 12.7,
  recenzii: 94,
  recenziiDelta: 23.1,
  ratePozitiv: 78.6,
  ratePozitivDelta: 3.2,
};

/* -------------------------------------------------------------------------- */
/*  Motive de nemulțumire                                                     */
/* -------------------------------------------------------------------------- */

export const reasonBreakdown = [
  { name: "Timp de așteptare", value: 38, color: "#bd9147" },
  { name: "Calitate", value: 24, color: "#3a3a43" },
  { name: "Personal", value: 18, color: "#7c7c88" },
  { name: "Curățenie", value: 12, color: "#a8a8b2" },
  { name: "Altele", value: 8, color: "#ded7c9" },
];

/* -------------------------------------------------------------------------- */
/*  Feedback recent                                                           */
/* -------------------------------------------------------------------------- */

export const recentFeedback: FeedbackEntry[] = [
  {
    id: "fb-1041",
    message: "Așteptare prea mare la prânz.",
    category: "Timp de așteptare",
    sentiment: "negativ",
    status: "nou",
    minutesAgo: 42,
    source: "NFC",
    location: "Masa 12",
    wentToGoogle: true,
  },
  {
    id: "fb-1040",
    message: "Personal foarte amabil.",
    category: "Apreciere",
    sentiment: "pozitiv",
    status: "vazut",
    minutesAgo: 96,
    source: "NFC",
    location: "Masa 4",
    wentToGoogle: true,
  },
  {
    id: "fb-1039",
    message: "Mâncarea a fost excelentă.",
    category: "Apreciere",
    sentiment: "pozitiv",
    status: "vazut",
    minutesAgo: 180,
    source: "QR",
    location: "Terasă",
    wentToGoogle: true,
  },
  {
    id: "fb-1038",
    message: "Ar putea fi mai curat în zona de terasă.",
    category: "Curățenie",
    sentiment: "negativ",
    status: "rezolvat",
    minutesAgo: 310,
    source: "NFC",
    location: "Terasă",
    wentToGoogle: false,
  },
  {
    id: "fb-1037",
    message: "Am așteptat 25 de minute pentru nota de plată.",
    category: "Timp de așteptare",
    sentiment: "negativ",
    status: "vazut",
    minutesAgo: 420,
    source: "NFC",
    location: "Masa 9",
    wentToGoogle: true,
  },
  {
    id: "fb-1036",
    message: "Atmosferă superbă, revenim sigur.",
    category: "Apreciere",
    sentiment: "pozitiv",
    status: "vazut",
    minutesAgo: 640,
    source: "QR",
    location: "Salon principal",
    wentToGoogle: true,
  },
  {
    id: "fb-1035",
    message: "Preparatul a venit rece.",
    category: "Calitate",
    sentiment: "negativ",
    status: "rezolvat",
    minutesAgo: 1250,
    source: "NFC",
    location: "Masa 7",
    wentToGoogle: true,
  },
  {
    id: "fb-1034",
    message: "Recomandările chelnerului au fost excelente.",
    category: "Apreciere",
    sentiment: "pozitiv",
    status: "vazut",
    minutesAgo: 1490,
    source: "NFC",
    location: "Masa 2",
    wentToGoogle: true,
  },
  {
    id: "fb-1033",
    message: "Muzica era prea tare pentru o seară de miercuri.",
    category: "Altceva",
    sentiment: "negativ",
    status: "vazut",
    minutesAgo: 1980,
    source: "QR",
    location: "Salon principal",
    wentToGoogle: false,
  },
  {
    id: "fb-1032",
    message: "Rezervarea a fost gestionată impecabil.",
    category: "Apreciere",
    sentiment: "pozitiv",
    status: "rezolvat",
    minutesAgo: 2400,
    source: "NFC",
    location: "Recepție",
    wentToGoogle: true,
  },
];

/* -------------------------------------------------------------------------- */
/*  Scanări — pe ore și pe locație                                            */
/* -------------------------------------------------------------------------- */

export const scansByHour = [
  { hour: "08", value: 12 }, { hour: "09", value: 18 }, { hour: "10", value: 24 },
  { hour: "11", value: 31 }, { hour: "12", value: 58 }, { hour: "13", value: 74 },
  { hour: "14", value: 66 }, { hour: "15", value: 38 }, { hour: "16", value: 27 },
  { hour: "17", value: 33 }, { hour: "18", value: 49 }, { hour: "19", value: 82 },
  { hour: "20", value: 96 }, { hour: "21", value: 71 }, { hour: "22", value: 34 },
];

export const scansByPlacement = [
  { name: "Mese — salon principal", cards: 14, scans: 612, share: 47.7 },
  { name: "Terasă", cards: 8, scans: 341, share: 26.6 },
  { name: "Recepție / bar", cards: 2, scans: 218, share: 17.0 },
  { name: "Nota de plată", cards: 4, scans: 113, share: 8.7 },
];

/* -------------------------------------------------------------------------- */
/*  Recenzii Google                                                           */
/* -------------------------------------------------------------------------- */

export const googleReviews = [
  {
    id: "gr-1",
    author: "Ioana P.",
    rating: 5,
    daysAgo: 1,
    text: "Cea mai bună cină din Timișoara în ultima perioadă. Serviciu impecabil și un meniu bine gândit.",
  },
  {
    id: "gr-2",
    author: "Radu M.",
    rating: 5,
    daysAgo: 2,
    text: "Am venit pentru o aniversare. Atmosfera și atenția la detalii au făcut diferența.",
  },
  {
    id: "gr-3",
    author: "Alexandra D.",
    rating: 4,
    daysAgo: 3,
    text: "Mâncare foarte bună. La prânz se aglomerează, merită rezervare.",
  },
  {
    id: "gr-4",
    author: "Mihai C.",
    rating: 5,
    daysAgo: 5,
    text: "Personal amabil, preparate consistente. Recomand terasa seara.",
  },
  {
    id: "gr-5",
    author: "Cristina V.",
    rating: 4,
    daysAgo: 6,
    text: "Raport calitate-preț corect. Am revenit a treia oară.",
  },
];

export const ratingTrend = [
  { month: "mar.", value: 4.3 },
  { month: "apr.", value: 4.4 },
  { month: "mai", value: 4.4 },
  { month: "iun.", value: 4.5 },
  { month: "iul.", value: 4.6 },
  { month: "aug.", value: 4.7 },
];

export const ratingBreakdown = [
  { stars: 5, count: 214 },
  { stars: 4, count: 68 },
  { stars: 3, count: 19 },
  { stars: 2, count: 7 },
  { stars: 1, count: 4 },
];

/* -------------------------------------------------------------------------- */
/*  Admin — clienți                                                           */
/* -------------------------------------------------------------------------- */

export type ClientStatus = "Activ" | "Trial" | "Restant" | "Anulat";

export interface ClientRow {
  id: string;
  name: string;
  type: string;
  city: string;
  status: ClientStatus;
  plan: "Starter" | "Professional" | "Business" | "Multi-location";
  mrr: number;
  cards: number;
  scans30d: number;
  since: string;
}

export const clients: ClientRow[] = [
  { id: "c-001", name: "Maison Noir", type: "Restaurant", city: "Timișoara", status: "Activ", plan: "Professional", mrr: 249, cards: 28, scans30d: 1284, since: "mar. 2025" },
  { id: "c-002", name: "Urban Beauty", type: "Salon", city: "Cluj-Napoca", status: "Activ", plan: "Starter", mrr: 49, cards: 4, scans30d: 214, since: "iun. 2025" },
  { id: "c-003", name: "Grand Hotel Severin", type: "Hotel", city: "Drobeta-Turnu Severin", status: "Activ", plan: "Multi-location", mrr: 599, cards: 62, scans30d: 3418, since: "ian. 2025" },
  { id: "c-004", name: "Clinica Nova", type: "Clinică", city: "București", status: "Activ", plan: "Business", mrr: 199, cards: 12, scans30d: 906, since: "sep. 2025" },
  { id: "c-005", name: "Casa Verde", type: "Restaurant", city: "Brașov", status: "Activ", plan: "Professional", mrr: 99, cards: 18, scans30d: 742, since: "apr. 2025" },
  { id: "c-006", name: "Cafeneaua Central", type: "Cafenea", city: "Sibiu", status: "Trial", plan: "Starter", mrr: 0, cards: 3, scans30d: 88, since: "aug. 2026" },
  { id: "c-007", name: "Dental Prim", type: "Cabinet", city: "Iași", status: "Activ", plan: "Starter", mrr: 49, cards: 2, scans30d: 137, since: "nov. 2025" },
  { id: "c-008", name: "Boutique Hotel Amber", type: "Hotel", city: "Constanța", status: "Restant", plan: "Business", mrr: 199, cards: 22, scans30d: 511, since: "feb. 2025" },
  { id: "c-009", name: "Atelier Barber", type: "Salon", city: "Oradea", status: "Activ", plan: "Starter", mrr: 49, cards: 3, scans30d: 176, since: "iul. 2025" },
  { id: "c-010", name: "Trattoria Sole", type: "Restaurant", city: "Timișoara", status: "Activ", plan: "Professional", mrr: 99, cards: 16, scans30d: 688, since: "mai 2025" },
  { id: "c-011", name: "Spa Lumina", type: "Salon", city: "Cluj-Napoca", status: "Activ", plan: "Business", mrr: 199, cards: 9, scans30d: 402, since: "oct. 2025" },
  { id: "c-012", name: "Bistro 47", type: "Restaurant", city: "București", status: "Anulat", plan: "Starter", mrr: 0, cards: 6, scans30d: 0, since: "dec. 2024" },
];

export const adminKpi = {
  clientiActivi: 428,
  clientiActiviDelta: 6.8,
  mrr: 64820,
  mrrDelta: 9.4,
  carduriLivrate: 391,
  carduriDelta: 4.2,
  feedbackLuna: 5284,
  feedbackDelta: 14.9,
};

export const mrrSeries = [
  { month: "sep.", value: 41200 },
  { month: "oct.", value: 45800 },
  { month: "nov.", value: 48900 },
  { month: "dec.", value: 51400 },
  { month: "ian.", value: 54100 },
  { month: "feb.", value: 56900 },
  { month: "mar.", value: 58300 },
  { month: "apr.", value: 59700 },
  { month: "mai", value: 61200 },
  { month: "iun.", value: 62400 },
  { month: "iul.", value: 63500 },
  { month: "aug.", value: 64820 },
];

export const planDistribution = [
  { name: "Starter", value: 186, color: "#a8a8b2" },
  { name: "Professional", value: 154, color: "#bd9147" },
  { name: "Business", value: 68, color: "#3a3a43" },
  { name: "Multi-location", value: 20, color: "#d2ab63" },
];

export type CardStatus = "Livrat" | "În producție" | "Expediat" | "Retur";

export const cardOrders = [
  { id: "CMD-2418", client: "Grand Hotel Severin", qty: 24, status: "În producție" as CardStatus, date: "14 aug. 2026", awb: "—", total: 2376 },
  { id: "CMD-2417", client: "Maison Noir", qty: 6, status: "Expediat" as CardStatus, date: "13 aug. 2026", awb: "FAN 8841 2290", total: 594 },
  { id: "CMD-2416", client: "Clinica Nova", qty: 4, status: "Livrat" as CardStatus, date: "11 aug. 2026", awb: "FAN 8839 1174", total: 396 },
  { id: "CMD-2415", client: "Trattoria Sole", qty: 10, status: "Livrat" as CardStatus, date: "9 aug. 2026", awb: "FAN 8836 4402", total: 990 },
  { id: "CMD-2414", client: "Atelier Barber", qty: 3, status: "Livrat" as CardStatus, date: "6 aug. 2026", awb: "FAN 8830 7719", total: 297 },
  { id: "CMD-2413", client: "Cafeneaua Central", qty: 3, status: "Retur" as CardStatus, date: "2 aug. 2026", awb: "FAN 8824 1063", total: 297 },
];

export const payments = [
  { id: "F-2026-1188", client: "Grand Hotel Severin", amount: 599, method: "Card", status: "Încasat", date: "15 aug. 2026" },
  { id: "F-2026-1187", client: "Maison Noir", amount: 249, method: "Card", status: "Încasat", date: "15 aug. 2026" },
  { id: "F-2026-1186", client: "Clinica Nova", amount: 199, method: "Transfer", status: "Încasat", date: "14 aug. 2026" },
  { id: "F-2026-1185", client: "Boutique Hotel Amber", amount: 199, method: "Card", status: "Eșuat", date: "14 aug. 2026" },
  { id: "F-2026-1184", client: "Casa Verde", amount: 99, method: "Card", status: "Încasat", date: "13 aug. 2026" },
  { id: "F-2026-1183", client: "Spa Lumina", amount: 199, method: "Card", status: "Încasat", date: "12 aug. 2026" },
  { id: "F-2026-1182", client: "Trattoria Sole", amount: 99, method: "Transfer", status: "În procesare", date: "12 aug. 2026" },
];

/* -------------------------------------------------------------------------- */
/*  Pricing                                                                   */
/* -------------------------------------------------------------------------- */

export interface Plan {
  id: string;
  name: string;
  price: number | null;
  priceLabel: string;
  tagline: string;
  locations: string;
  cards: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
}

export const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    price: 49,
    priceLabel: "49",
    tagline: "Pentru afaceri mici, cu un singur punct de contact.",
    locations: "1 locație",
    cards: "până la 3 carduri",
    cta: "Începe cu Starter",
    features: [
      "Pagină de feedback personalizată",
      "Redirect automat către Google",
      "Dashboard cu scanări și feedback",
      "Export CSV",
      "Suport pe e-mail",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    price: 99,
    priceLabel: "99",
    tagline: "Cel mai ales de restaurante și saloane.",
    locations: "1 locație",
    cards: "până la 15 carduri",
    highlighted: true,
    cta: "Alege Professional",
    features: [
      "Tot ce include Starter",
      "Categorii de feedback personalizabile",
      "Insight-uri săptămânale automate",
      "Alerte pe e-mail la feedback negativ",
      "Statistici pe locație și pe card",
      "Suport prioritar",
    ],
  },
  {
    id: "business",
    name: "Business",
    price: 199,
    priceLabel: "199",
    tagline: "Pentru echipe care lucrează cu date, nu cu impresii.",
    locations: "până la 3 locații",
    cards: "carduri nelimitate",
    cta: "Alege Business",
    features: [
      "Tot ce include Professional",
      "Comparație între locații",
      "Conturi separate pentru manageri",
      "Rapoarte lunare în PDF",
      "Integrare Google Business Profile",
      "Onboarding asistat",
    ],
  },
  {
    id: "multi",
    name: "Multi-location",
    price: null,
    priceLabel: "La cerere",
    tagline: "Rețele, francize și grupuri hoteliere.",
    locations: "locații nelimitate",
    cards: "carduri nelimitate",
    cta: "Discutăm despre proiect",
    features: [
      "Tot ce include Business",
      "Dashboard centralizat pe rețea",
      "Roluri și permisiuni avansate",
      "API și webhook-uri",
      "SLA și contract dedicat",
      "Manager de cont",
    ],
  },
];

export const comparisonRows: Array<{
  label: string;
  values: [string | boolean, string | boolean, string | boolean, string | boolean];
  group: string;
}> = [
  { group: "Acoperire", label: "Locații incluse", values: ["1", "1", "3", "Nelimitat"] },
  { group: "Acoperire", label: "Carduri NFC active", values: ["3", "15", "Nelimitat", "Nelimitat"] },
  { group: "Acoperire", label: "Conturi de utilizator", values: ["1", "3", "10", "Nelimitat"] },
  { group: "Feedback", label: "Pagină de feedback personalizată", values: [true, true, true, true] },
  { group: "Feedback", label: "Categorii personalizabile", values: [false, true, true, true] },
  { group: "Feedback", label: "Alerte la feedback negativ", values: [false, true, true, true] },
  { group: "Feedback", label: "Comentariu liber de la client", values: [false, true, true, true] },
  { group: "Analiză", label: "Dashboard în timp real", values: [true, true, true, true] },
  { group: "Analiză", label: "Insight-uri săptămânale", values: [false, true, true, true] },
  { group: "Analiză", label: "Comparație între locații", values: [false, false, true, true] },
  { group: "Analiză", label: "Rapoarte PDF lunare", values: [false, false, true, true] },
  { group: "Integrări", label: "Redirect Google Reviews", values: [true, true, true, true] },
  { group: "Integrări", label: "Google Business Profile", values: [false, false, true, true] },
  { group: "Integrări", label: "API & webhook-uri", values: [false, false, false, true] },
  { group: "Suport", label: "Suport e-mail", values: [true, true, true, true] },
  { group: "Suport", label: "Suport prioritar", values: [false, true, true, true] },
  { group: "Suport", label: "Manager de cont", values: [false, false, false, true] },
];

/* -------------------------------------------------------------------------- */
/*  FAQ                                                                       */
/* -------------------------------------------------------------------------- */

export const faq = [
  {
    q: "Recenziata filtrează recenziile negative?",
    a: "Nu. Orice client poate ajunge pe Google, indiferent de răspunsul dat în pagina de feedback. Diferența este că tu primești contextul înainte: știi ce anume nu a mers bine și poți interveni. Filtrarea recenziilor încalcă politicile Google, iar noi nu construim produse pe practici care pot fi sancționate.",
  },
  {
    q: "Clientul trebuie să instaleze o aplicație?",
    a: "Nu. Cardul NFC deschide direct pagina în browserul telefonului, iar codul QR funcționează cu aplicația de cameră. Nu există cont, descărcare sau înregistrare — de la atingere la recenzie sunt câteva secunde.",
  },
  {
    q: "Cât durează până primesc cardurile?",
    a: "Cardurile sunt gravate laser în România. Livrarea standard este de 3–5 zile lucrătoare de la confirmarea designului. Pentru comenzi peste 20 de carduri, termenul este de 7 zile lucrătoare.",
  },
  {
    q: "Ce se întâmplă dacă abonamentul expiră?",
    a: "Pagina de feedback afișează un mesaj neutru, fără branding, iar scanările sunt înregistrate în continuare. La reactivare, totul revine instantaneu — cardurile nu trebuie schimbate, pentru că URL-ul rămâne același.",
  },
  {
    q: "Funcționează pe orice telefon?",
    a: "NFC funcționează pe practic toate telefoanele Android din ultimii ani și pe iPhone 7 sau mai nou. Pentru restul situațiilor, codul QR gravat pe card acoperă 100% din cazuri.",
  },
  {
    q: "Datele clienților mei sunt în siguranță?",
    a: "Feedback-ul este anonim și nu colectăm date personale de la clientul final. Infrastructura este găzduită în Uniunea Europeană, iar procesarea respectă GDPR. Poți exporta sau șterge datele oricând din dashboard.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Blog                                                                      */
/* -------------------------------------------------------------------------- */

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] };

export const blogPosts: Array<{
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  accent: string;
  author: string;
  authorRole: string;
  body: ArticleBlock[];
}> = [
  {
    slug: "cum-influenteaza-recenziile-decizia-de-rezervare",
    title: "Cum influențează recenziile decizia de rezervare într-un restaurant",
    excerpt:
      "Diferența dintre 4,2 și 4,6 stele nu pare mare pe hârtie. În practică, schimbă complet lista de rezultate în care apari.",
    category: "Reputație",
    readTime: "6 min",
    date: "12 august 2026",
    accent: "from-gold-400/20",
    author: "Andrei Vlas",
    authorRole: "Redacția Recenziata",
    body: [
      { type: "p", text: "Când cauți „restaurant lângă mine”, Google nu îți arată o listă neutră. Ordonează rezultatele după relevanță, distanță și proeminență — iar proeminența se traduce, în practică, în număr de recenzii și rating mediu." },
      { type: "h2", text: "Diferența dintre 4,2 și 4,6" },
      { type: "p", text: "Pe hârtie sunt patru zecimi. În lista de rezultate, sunt două poziții. Am urmărit 38 de locații din rețeaua noastră care au trecut peste pragul de 4,5 în ultimele 12 luni: media de afișări în Google Maps a crescut cu 31%, iar apelurile inițiate direct din profil cu 22%." },
      { type: "p", text: "Explicația nu ține de un algoritm secret. Ține de comportamentul oamenilor: un rating sub 4,3 introduce ezitare, iar ezitarea înseamnă că utilizatorul se întoarce la listă și deschide alt profil." },
      { type: "h2", text: "Volumul contează mai mult decât crezi" },
      { type: "p", text: "Un rating de 4,8 din 11 recenzii inspiră mai puțină încredere decât 4,6 din 300. Volumul semnalează că locul este activ și că părerea reflectă mai mult de o seară bună. Sub 50 de recenzii, fiecare recenzie nouă mișcă vizibil media — ceea ce e în egală măsură o oportunitate și un risc." },
      { type: "quote", text: "Nu ai nevoie de recenzii perfecte. Ai nevoie de suficiente recenzii recente ca media să fie stabilă." },
      { type: "h2", text: "Prospețimea" },
      { type: "p", text: "Google acordă greutate mai mare recenziilor recente, iar utilizatorii se uită instinctiv la dată. Un profil cu ultima recenzie de acum șapte luni comunică, involuntar, că locul nu mai este ce a fost. Un flux constant de 20–30 de recenzii pe lună rezolvă problema fără niciun efort de marketing." },
      { type: "h2", text: "Ce facem cu asta" },
      { type: "list", items: ["Măsoară-ți punctul de plecare: rating, număr de recenzii, data ultimei recenzii.", "Stabilește un ritm realist — 15–25 de recenzii pe lună schimbă profilul în trei luni.", "Nu cere recenzii selectiv. Este împotriva politicilor Google și se vede în tipar.", "Urmărește motivele nemulțumirii, nu doar media. Acolo e informația care se poate acționa."] },
    ],
  },
  {
    slug: "de-ce-clientii-multumiti-nu-lasa-recenzii",
    title: "De ce clienții mulțumiți nu lasă recenzii (și ce poți face)",
    excerpt:
      "Nemulțumirea este un motiv de acțiune. Mulțumirea, nu. Analizăm decalajul și soluțiile care funcționează fără să pară insistente.",
    category: "Comportament",
    readTime: "5 min",
    date: "4 august 2026",
    accent: "from-ink-400/20",
    author: "Diana Mureșan",
    authorRole: "Redacția Recenziata",
    body: [
      { type: "p", text: "Nemulțumirea este un motiv de acțiune. Mulțumirea, nu. Un client care a avut o seară bună pleacă acasă mulțumit și atât — experiența s-a încheiat exact așa cum se aștepta, deci nu are ce raporta." },
      { type: "h2", text: "Asimetria motivației" },
      { type: "p", text: "Cine a avut o problemă vrea reparație, scuze sau măcar consecințe. Cine a avut o experiență bună a primit deja ce a plătit. De aceea profilurile fără intervenție tind spre o medie mai mică decât realitatea: vocile negative sunt suprareprezentate structural." },
      { type: "h2", text: "Fereastra de 90 de secunde" },
      { type: "p", text: "Din datele noastre, 71% din recenziile obținute prin card NFC apar în primele 90 de secunde după atingere, iar aproape toate înainte ca oaspetele să părăsească locația. Dacă momentul trece, șansa scade abrupt: un link trimis pe e-mail a doua zi convertește sub 3%." },
      { type: "quote", text: "Nu convingi pe cineva să lase o recenzie. Îi scoți din drum tot ce îl împiedică să o facă în momentul în care ar face-o oricum." },
      { type: "h2", text: "De ce nu funcționează cererea verbală" },
      { type: "p", text: "„Ne-ați lăsa o recenzie?” pune clientul într-o poziție socială incomodă și pune chelnerul într-una și mai incomodă. Rata de acceptare declarată este mare, rata de execuție este mică. Un obiect pe masă nu cere nimic — este disponibil dacă vrei." },
      { type: "h2", text: "Ce funcționează" },
      { type: "list", items: ["Momentul: imediat după plată, nu la ieșire.", "Zero pași intermediari: fără aplicație, cont sau formular lung.", "O singură întrebare, cu două răspunsuri clare.", "Un obiect fizic, nu un afiș — obiectele se ating, afișele se ignoră."] },
    ],
  },
  {
    slug: "nfc-vs-qr-ce-functioneaza-mai-bine",
    title: "NFC sau QR: ce funcționează mai bine pe masă",
    excerpt:
      "Am analizat 214.000 de interacțiuni din rețeaua Recenziata. Rezultatul depinde mai mult de plasare decât de tehnologie.",
    category: "Date",
    readTime: "8 min",
    date: "27 iulie 2026",
    accent: "from-gold-300/20",
    author: "Echipa de date",
    authorRole: "Recenziata",
    body: [
      { type: "p", text: "Am analizat 214.000 de interacțiuni înregistrate în rețeaua Recenziata între ianuarie și iulie 2026, pe 428 de locații active. Întrebarea era simplă: NFC sau QR?" },
      { type: "h2", text: "Cifra brută" },
      { type: "p", text: "76,4% dintre interacțiuni au venit prin NFC, 23,6% prin cod QR. Diferența pare tranșantă, dar ascunde ceva important: cele două nu se canibalizează. Locațiile care au ambele opțiuni pe același card au un volum total cu 18% mai mare decât cele care se bazează pe una singură." },
      { type: "h2", text: "Plasarea bate tehnologia" },
      { type: "p", text: "Același card, aceeași locație, poziții diferite: pe suportul notei de plată rata de interacțiune a fost de 14,6%, pe masă în timpul mesei 8,1%, la recepție 5,4%. Diferența dintre cea mai bună și cea mai slabă plasare este mai mare decât diferența dintre NFC și QR." },
      { type: "quote", text: "Nu contează cât de bună e tehnologia dacă obiectul stă într-un loc în care nimeni nu se uită." },
      { type: "h2", text: "Când QR-ul salvează situația" },
      { type: "p", text: "NFC nu funcționează pe iPhone-uri mai vechi de 7, pe telefoane cu NFC dezactivat sau prin huse metalice groase. În aceste cazuri, QR-ul gravat pe același card acoperă restul. Practic: cardul funcționează 100% din timp, indiferent de dispozitiv." },
      { type: "h2", text: "Recomandarea noastră" },
      { type: "list", items: ["Un card la fiecare 3–4 mese pentru un restaurant mediu.", "Prioritate absolută: suportul notei de plată.", "Evită suprafețele metalice — reduc semnalul.", "Păstrează codul QR vizibil, chiar dacă mizezi pe NFC."] },
    ],
  },
  {
    slug: "cum-raspunzi-la-o-recenzie-negativa",
    title: "Cum răspunzi la o recenzie negativă fără să pierzi clientul",
    excerpt:
      "Un răspuns bun nu apără afacerea. Recunoaște problema, arată ce s-a schimbat și se oprește la timp.",
    category: "Ghid",
    readTime: "7 min",
    date: "19 iulie 2026",
    accent: "from-ink-300/20",
    author: "Diana Mureșan",
    authorRole: "Redacția Recenziata",
    body: [
      { type: "p", text: "Un răspuns la o recenzie negativă nu se scrie pentru autorul recenziei. Se scrie pentru următorii câteva sute de oameni care o vor citi înainte să decidă dacă rezervă." },
      { type: "h2", text: "Structura care funcționează" },
      { type: "list", items: ["Mulțumește pentru semnalare, fără formule șablon.", "Recunoaște concret ce nu a mers — nu „ne pare rău că nu ați fost mulțumit”.", "Spune ce s-a schimbat de atunci, dacă s-a schimbat ceva.", "Oferă o cale privată de continuare și oprește-te."] },
      { type: "h2", text: "Ce distruge un răspuns" },
      { type: "p", text: "Contrazicerea faptelor. Chiar dacă ai dreptate, un răspuns defensiv semnalează cititorului că, în caz de problemă, va trebui să se certe. Al doilea ucigaș: lungimea. Peste patru rânduri, răspunsul pare o pledoarie." },
      { type: "quote", text: "Cititorul nu evaluează cine are dreptate. Evaluează cum te comporți când ceva merge prost." },
      { type: "h2", text: "Timpul de răspuns" },
      { type: "p", text: "Sub 24 de ore este ideal, sub 72 de ore este acceptabil. După o săptămână, răspunsul face mai mult rău decât bine: confirmă că nu urmărești ce se scrie despre tine." },
      { type: "p", text: "Cel mai bun scenariu rămâne însă acela în care afli despre problemă înainte ca ea să devină recenzie. Atunci nu răspunzi public — repari pe loc." },
    ],
  },
  {
    slug: "politica-google-privind-filtrarea-recenziilor",
    title: "Ce spune Google despre filtrarea recenziilor",
    excerpt:
      "„Review gating” este interzis explicit. Explicăm regulile și de ce Recenziata este construită pe direcția opusă.",
    category: "Conformitate",
    readTime: "4 min",
    date: "8 iulie 2026",
    accent: "from-gold-500/20",
    author: "Echipa Recenziata",
    authorRole: "Conformitate",
    body: [
      { type: "p", text: "„Review gating” înseamnă a filtra clienții în funcție de opinie: cei mulțumiți sunt trimiși pe Google, cei nemulțumiți sunt redirecționați către un formular privat. Practica este interzisă explicit de politicile Google pentru profilurile de business." },
      { type: "h2", text: "Ce spune regula" },
      { type: "p", text: "Politica privind conținutul interzice „solicitarea selectivă de recenzii pozitive de la clienți” și „descurajarea recenziilor negative”. Sancțiunile merg de la eliminarea recenziilor afectate până la suspendarea profilului." },
      { type: "quote", text: "Riscul nu este o amendă. Riscul este să pierzi într-o zi profilul pe care ai construit trei ani." },
      { type: "h2", text: "De ce Recenziata funcționează invers" },
      { type: "p", text: "În fluxul nostru, orice client — mulțumit sau nu — primește opțiunea de a lăsa recenzie pe Google. Diferența este că, atunci când experiența nu a fost bună, întrebăm mai întâi ce anume nu a mers. Informația ajunge la business înainte, nu în locul recenziei." },
      { type: "h2", text: "Ce câștigi din asta" },
      { type: "list", items: ["Context operațional: știi dacă problema e ora 13:00 sau bucătăria.", "Timp de reacție: poți repara înainte ca oaspetele să plece.", "Conformitate: nimic din flux nu contravine politicilor Google.", "Credibilitate: un profil cu recenzii mixte și răspunsuri bune convertește mai bine decât unul suspect de perfect."] },
    ],
  },
  {
    slug: "unde-pui-cardul-nfc-in-restaurant",
    title: "Unde pui cardul NFC în restaurant: 5 plasări testate",
    excerpt:
      "Aceleași carduri, aceeași locație, rate de scanare de trei ori diferite. Contează unde și când.",
    category: "Operațional",
    readTime: "5 min",
    date: "1 iulie 2026",
    accent: "from-ink-500/20",
    author: "Echipa de date",
    authorRole: "Recenziata",
    body: [
      { type: "p", text: "Am testat cinci plasări în 42 de restaurante, timp de opt săptămâni, rotind pozițiile ca să eliminăm diferențele dintre locații. Aceleași carduri, același design, rate de interacțiune de peste trei ori diferite." },
      { type: "h2", text: "Rezultatele, în ordine" },
      { type: "list", items: ["Suportul notei de plată — 14,6% rată de interacțiune", "Masa, lângă solniță sau meniu — 8,1%", "Bar / recepție — 5,4%", "Terasă, pe masă — 4,9%", "Vitrină sau intrare — 1,2%"] },
      { type: "h2", text: "De ce câștigă nota de plată" },
      { type: "p", text: "În momentul plății, experiența s-a încheiat și clientul are deja o opinie formată. Mai important: are telefonul în mână, pentru că plătește cu el. Fricțiunea este practic zero." },
      { type: "quote", text: "Cel mai bun moment nu este când clientul e cel mai mulțumit. Este când are deja telefonul în mână." },
      { type: "h2", text: "Greșeli frecvente" },
      { type: "p", text: "Cardul pus lângă casa de marcat, cu fața în sus, sub o lampă puternică — reflexia face gravura ilizibilă. Cardul pe o tavă metalică — semnalul NFC scade. Cardul într-un suport de plexiglas gros — atingerea nu mai funcționează, rămâne doar QR-ul." },
      { type: "p", text: "Și cea mai costisitoare: un singur card pentru toată sala. Sub un card la patru mese, volumul scade proporțional cu distanța pe care trebuie să o parcurgă clientul." },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Referințe / social proof                                                  */
/* -------------------------------------------------------------------------- */

export const testimonials = [
  {
    quote:
      "Am trecut de la 3–4 recenzii pe lună la peste 30. Dar ce a contat cu adevărat a fost să aflăm că problema era ora 13:00, nu bucătăria.",
    author: "Andrei Munteanu",
    role: "Administrator, Maison Noir",
    city: "Timișoara",
    metric: "+186% recenzii în 4 luni",
  },
  {
    quote:
      "Clientele lasă recenzie înainte să iasă pe ușă. Cardul stă la recepție și nu trebuie să cerem nimic verbal.",
    author: "Diana Ilieș",
    role: "Fondatoare, Urban Beauty",
    city: "Cluj-Napoca",
    metric: "4,9 rating mediu",
  },
  {
    quote:
      "Cu 62 de carduri în trei clădiri, dashboard-ul e primul lucru pe care îl deschid luni dimineața.",
    author: "Vlad Popescu",
    role: "Director operațiuni, Grand Hotel Severin",
    city: "Drobeta-Turnu Severin",
    metric: "3.418 scanări / lună",
  },
];

export const logos = [
  "Maison Noir",
  "Urban Beauty",
  "Casa Verde",
  "Grand Hotel Severin",
  "Clinica Nova",
  "Trattoria Sole",
  "Spa Lumina",
  "Atelier Barber",
];

/* -------------------------------------------------------------------------- */
/*  Notificări                                                                */
/* -------------------------------------------------------------------------- */

export const notifications = [
  {
    id: "n-1",
    title: "Feedback nou",
    body: "Un client a raportat un timp de așteptare mai mare.",
    minutesAgo: 42,
    kind: "feedback" as const,
    unread: true,
  },
  {
    id: "n-2",
    title: "Recenzie Google nouă",
    body: "Ioana P. a lăsat o recenzie de 5 stele.",
    minutesAgo: 190,
    kind: "review" as const,
    unread: true,
  },
  {
    id: "n-3",
    title: "Prag atins",
    body: "Ai depășit 1.200 de scanări în ultimele 30 de zile.",
    minutesAgo: 1440,
    kind: "milestone" as const,
    unread: false,
  },
  {
    id: "n-4",
    title: "Comandă expediată",
    body: "6 carduri NFC au fost expediate — AWB FAN 8841 2290.",
    minutesAgo: 2880,
    kind: "order" as const,
    unread: false,
  },
];

/* -------------------------------------------------------------------------- */
/*  Aplicație mobilă — date pentru preview                                    */
/* -------------------------------------------------------------------------- */

export const mobileToday = {
  greeting: "Bună dimineața, Maison Noir",
  scanari: 48,
  feedback: 7,
  recenzii: 3,
  sparkline: [8, 12, 9, 16, 14, 21, 18, 26, 22, 31, 28, 34],
};

export const mobileFeedback = [
  { id: "m-1", text: "Timp de așteptare mai mare la prânz.", category: "Timp de așteptare", sentiment: "negativ" as Sentiment, time: "12:41" },
  { id: "m-2", text: "Personal foarte atent.", category: "Apreciere", sentiment: "pozitiv" as Sentiment, time: "12:18" },
  { id: "m-3", text: "Preparatele au venit rapid.", category: "Apreciere", sentiment: "pozitiv" as Sentiment, time: "11:52" },
  { id: "m-4", text: "Terasa ar avea nevoie de curățenie.", category: "Curățenie", sentiment: "negativ" as Sentiment, time: "11:07" },
  { id: "m-5", text: "Meniu bine gândit.", category: "Apreciere", sentiment: "pozitiv" as Sentiment, time: "10:33" },
];
