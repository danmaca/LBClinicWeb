import type { ReferenceSlide } from './TypeDefinitions';

export const SITE_CONFIG = {
  companyName: "LB dental clinic s.r.o.",
  brandName: "LB Clinic",
  url: "https://www.lbclinic.cz/",
  email: "recepce@lbclinic.cz",
  phone: "+420 776 377 100",
  address: {
    street: "Vodňanská 1656/5",
    zip: "198 00",
    city: "Praha 9",
  },
  bankAccount: {
    number: "670100-2200909939/6210",
    bankName: "mBank",
    iban: "CZ1262100000006701002200909939",  // A dummy IBAN derived for the purposes, check needed
    recipientName: "LB clinic",
    get spdString() {
      return `SPD*1.0*ACC:${this.iban}*CC:CZK*MSG:Platba LB Clinic*RN:${this.recipientName}`;
    }
  },
  supportedLanguages: ["cs", "en", "uk", "ru"] as const,
  defaultLanguage: "cs",
  contactApiUrl: "/api/contact.php",
  /** Souřadnice ordinace (OpenStreetMap embed, bez API klíče) */
  clinicMapCoordinates: { lat: 50.1079862, lon: 14.5625057 },
  social: {
    instagram: "https://www.instagram.com/lbdentalclinic",
  },
  insurance: [
    { key: "vzp", name: "Všeobecná zdravotní pojišťovna", logo: "/images/insurance/vzp.png" },
    { key: "ozp", name: "Obohacená zdravotní pojišťovna", logo: "/images/insurance/ozp.png" },
    { key: "zpmv", name: "Zdravotní pojišťovna ministerstva vnitra", logo: "/images/insurance/zpmv.png" },
  ],
};

export const REFERENCE_SLIDES: ReferenceSlide[] = [
  { image: '/images/reference/1.png', caption: ['Před ošetřením', 'Po ošetření'] },
  { image: '/images/reference/2.png', caption: ['Byl jsem tam poprvé a hrozně jsem se bál', 'Nakonec to bylo úplně v pohodě. Nakonec to bylo úplně v pohodě']  },
  { image: '/images/reference/3.png', caption: 'Estetická stomatologie' },
  { image: '/images/reference/4.png' },
];