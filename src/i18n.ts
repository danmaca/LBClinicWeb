import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import cs from "./locales/cs.json";
import en from "./locales/en.json";
import uk from "./locales/uk.json";
import ru from "./locales/ru.json";
import { SITE_CONFIG } from "./config";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      cs: { translation: cs },
      en: { translation: en },
      uk: { translation: uk },
      ru: { translation: ru },
    },
    fallbackLng: SITE_CONFIG.defaultLanguage,
    supportedLngs: SITE_CONFIG.supportedLanguages,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      // Check localStorage first so the user's explicit choice always wins
      // over the browser's navigator language.
      order: ["localStorage", "navigator"],
      // Persist the selected language to localStorage
      caches: ["localStorage"],
      lookupLocalStorage: "i18nextLng",
    },
  });

i18n.on("languageChanged", (lng) => {
  document.documentElement.setAttribute("lang", lng);
});

export default i18n;
