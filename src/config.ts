import type { ReferenceSlide } from "./TypeDefinitions";

export const SITE_CONFIG = {
  companyName: "LB dental clinic s.r.o.",
  brandName: "LB DENTAL CLINIC S.R.O.",
  url: "https://www.lbclinic.cz/",
  email: "recepce@lbclinic.cz",
  phone: "+420 776 377 100",
  address: {
    street: "Vodňanská 1656/5",
    zip: "198 00",
    city: "Praha 9",
  },
  bankAccount: {
    number: "41419/5500",
    bankName: "Raiffeisenbank",
    iban: "CZ2855000000000000041419",
    recipientName: "LB clinic",
    get spdString() {
      return `SPD*1.0*ACC:${this.iban}*CC:CZK*MSG:Platba LB clinic*RN:${this.recipientName}`;
    },
  },
  supportedLanguages: ["cs", "en", "uk", "ru"] as const,
  defaultLanguage: "cs",
  contactApiUrl: "/api/contact.php",
  /** Souřadnice ordinace (OpenStreetMap embed, bez API klíče) */
  clinicMapCoordinates: { lat: 50.1079862, lon: 14.5625057 },
  social: {
    instagram: "https://www.instagram.com/lbdentalclinic",
  },
  teamMembers: [
    {
      name: "MDDr. Kateřina Vernerová",
      photo1: "vernerova_1.jpg",
      photo2: "vernerova_2.jpg",
    },
    {
      name: "Bc. Adéla Bakešová, DiS.",
      photo1: "bakesova_1.jpg",
      photo2: "bakesova_2.jpg",
    },
  ],
  insurance: [
    { key: "vzp", name: "Všeobecná zdravotní pojišťovna", logo: "vzp.png" },
    { key: "ozp", name: "Obohacená zdravotní pojišťovna", logo: "ozp.png" },
    {
      key: "zpmv",
      name: "Zdravotní pojišťovna ministerstva vnitra",
      logo: "zpmv.png",
    },
  ],
  gallery: {
    totalPhotos: 20,
  },
};

export const REFERENCE_SLIDES: ReferenceSlide[] = [
  {
    image: "1.jpg",
    personName: "",
    text: "",
  },
  {
    image: "2.jpg",
    personName: "",
    text: "",
  },
  {
    image: "3.jpg",
    personName: "",
    text: "",
  },
  {
    image: "4.jpg",
    personName: "",
    text: "",
  },
];
