import React, { useEffect, useId, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";
import { SITE_CONFIG } from "../config";

type SupportedLanguage = (typeof SITE_CONFIG.supportedLanguages)[number];

const FLAGS_BASE = "/images/flags/";

const LANGUAGE_FLAG_SRC: Record<SupportedLanguage, string> = {
  cs: "cz.svg",
  en: "gb.svg",
  uk: "ua.svg",
  ru: "ru.svg",
};

const LANGUAGE_NAMES: Record<SupportedLanguage, string> = {
  cs: "Česky",
  en: "English",
  uk: "Українська",
  ru: "Русский",
};

type LanguageSwitcherProps = {
  className?: string;
  buttonClassName?: string;
  listClassName?: string;
  onAfterChange?: () => void;
};

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className = "",
  buttonClassName = "",
  listClassName = "",
  onAfterChange,
}) => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const raw = i18n.resolvedLanguage ?? i18n.language;
  const current = (SITE_CONFIG.supportedLanguages.find(
    (l) => l === raw || raw.startsWith(`${l}-`),
  ) ?? SITE_CONFIG.defaultLanguage) as SupportedLanguage;

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const select = (lng: SupportedLanguage) => {
    void i18n.changeLanguage(lng);
    setOpen(false);
    onAfterChange?.();
  };

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        id={`${listId}-trigger`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={LANGUAGE_NAMES[current]}
        onClick={() => setOpen((o) => !o)}
        className={`inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white py-1 pl-1.5 pr-1 shadow-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent ${buttonClassName}`}
      >
        <img
          src={`${FLAGS_BASE}${LANGUAGE_FLAG_SRC[current]}`}
          alt=""
          width={22}
          height={16}
          className="h-4 w-[22px] shrink-0 rounded-sm object-cover shadow-sm ring-1 ring-black/5"
        />
        <ChevronDown
          className={`h-3.5 w-3.5 shrink-0 text-gray-500 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-labelledby={`${listId}-trigger`}
          className={`absolute right-0 z-[60] mt-1 max-h-64 min-w-[11rem] overflow-auto rounded-md border border-gray-200 bg-white py-1 shadow-lg ${listClassName}`}
        >
          {SITE_CONFIG.supportedLanguages.map((lng) => (
            <li key={lng} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={lng === current}
                onClick={() => select(lng)}
                className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-gray-50 ${
                  lng === current ? "bg-gray-50 font-medium" : ""
                }`}
              >
                <img
                  src={`${FLAGS_BASE}${LANGUAGE_FLAG_SRC[lng]}`}
                  alt=""
                  width={22}
                  height={16}
                  className="h-4 w-[22px] shrink-0 rounded-sm object-cover shadow-sm ring-1 ring-black/5"
                />
                <span className="whitespace-nowrap">{LANGUAGE_NAMES[lng]}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
