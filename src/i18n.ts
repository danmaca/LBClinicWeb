import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import cs from "./locales/cs.json";
import en from "./locales/en.json";
import uk from "./locales/uk.json";
import ru from "./locales/ru.json";
import { SITE_CONFIG } from "./config";

const STORAGE_KEY = "i18nextLng";

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
    // Strip region codes (e.g. cs-CZ → cs, en-US → en) so that
    // Safari / iOS, which reports full locale tags, correctly matches
    // the supported language list.
    load: "languageOnly",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      // Check localStorage first (explicit user choice), then browser language.
      order: ["localStorage", "navigator"],
      // Do NOT auto-cache the detected language. This prevents a stale
      // auto-detected value (e.g. "en" from an old visit) from overriding
      // a correct navigator detection on subsequent visits.
      // Only the explicit user choice in LanguageSwitcher writes to localStorage.
      caches: [],
      lookupLocalStorage: STORAGE_KEY,
    },
  });

i18n.on("languageChanged", (lng) => {
  document.documentElement.setAttribute("lang", lng);
});

/**
 * Persist a language choice to localStorage.
 * Call this ONLY when the user explicitly picks a language
 * (e.g. from the LanguageSwitcher), not on auto-detection.
 */
export function persistLanguageChoice(lng: string): void {
  try {
    localStorage.setItem(STORAGE_KEY, lng);
  } catch {
    // localStorage may be unavailable (private browsing, quota, etc.)
  }
}

export default i18n;
