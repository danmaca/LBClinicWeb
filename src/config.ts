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
    recipientName: "LB Clinic",
    get spdString() {
      return `SPD*1.0*ACC:${this.iban}*CC:CZK*MSG:Platba LB Clinic*RN:${this.recipientName}`;
    }
  },
  supportedLanguages: ["cs", "en", "uk", "ru"] as const,
  defaultLanguage: "cs",
  contactApiUrl: "/api/contact.php",
  googleMapsEmbedQuery: "Vodňanská+1656/5,+Praha+9",
  social: {
    instagram: "https://www.instagram.com/lbdentalclinic",
  },
  insurance: [
    { key: "vzp", name: "VZP", logo: "/images/insurance-vzp.png" },
    { key: "ozp", name: "OZP", logo: "/images/insurance-ozp.png" },
    { key: "zpmv", name: "ZP MV", logo: "/images/insurance-zpmv.png" },
  ],
};
