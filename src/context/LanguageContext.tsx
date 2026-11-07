"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import kmStrings from "../../public/locales/km.json";
import enStrings from "../../public/locales/en.json";
import zhStrings from "../../public/locales/zh.json";

export type Locale = "km" | "en" | "zh";

export interface LanguageOption {
  code: Locale;
  shortCode: string;
  label: string;
  flag: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: "km", shortCode: "KH", label: "ភាសាខ្មែរ", flag: "🇰🇭" },
  { code: "en", shortCode: "EN", label: "English", flag: "🇺🇸" },
  { code: "zh", shortCode: "CN", label: "中文", flag: "🇨🇳" },
];

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  currentLang: LanguageOption;
  t: (path: string) => string;
}

const translations: Record<Locale, any> = {
  km: kmStrings,
  en: enStrings,
  zh: zhStrings,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("km");

  useEffect(() => {
    const saved = localStorage.getItem("newkhmer_locale") as Locale;
    if (saved === "km" || saved === "en" || saved === "zh") {
      setLocaleState(saved);
      document.documentElement.lang = saved;
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("newkhmer_locale", newLocale);
    document.cookie = `newkhmer_locale=${newLocale}; path=/; max-age=31536000`;
    document.documentElement.lang = newLocale;
  };

  const currentLang = LANGUAGES.find((l) => l.code === locale) || LANGUAGES[0];

  const t = (path: string): string => {
    const keys = path.split(".");
    let current: any = translations[locale] || translations.km;

    for (const key of keys) {
      if (current && typeof current === "object" && key in current) {
        current = current[key];
      } else {
        let fallback: any = translations.km;
        for (const fbKey of keys) {
          if (fallback && typeof fallback === "object" && fbKey in fallback) {
            fallback = fallback[fbKey];
          } else {
            return path;
          }
        }
        return typeof fallback === "string" ? fallback : path;
      }
    }

    return typeof current === "string" ? current : path;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, currentLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
