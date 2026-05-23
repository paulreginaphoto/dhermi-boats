"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LanguageContext = createContext<LanguageContextValue>({
  locale: defaultLocale,
  setLocale: () => {}
});

function normalizeLocale(value: string | null | undefined) {
  if (!value) return value;
  if (value === "sq-AL") return "sq";

  const normalized = value.toLowerCase().replace("_", "-");
  if (normalized === "al" || normalized === "sq-al") return "sq";

  const primaryLocale = normalized.split("-")[0];
  return primaryLocale === "al" ? "sq" : primaryLocale;
}

function browserLocale(): Locale {
  const preferredLocales = navigator.languages.length ? navigator.languages : [navigator.language || "en"];

  for (const preferredLocale of preferredLocales) {
    const normalized = normalizeLocale(preferredLocale);
    if (isLocale(normalized)) return normalized;
  }

  return defaultLocale;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale);
    const url = new URL(window.location.href);
    url.searchParams.set("dlang", nextLocale);
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get("dlang") || params.get("lang");
    const stored = window.localStorage.getItem("dhermi-language");
    const normalizedRequested = normalizeLocale(requested);
    const normalizedStored = normalizeLocale(stored);
    const nextLocale = isLocale(normalizedRequested)
      ? normalizedRequested
      : isLocale(normalizedStored)
        ? normalizedStored
        : browserLocale();
    const frame = window.requestAnimationFrame(() => setLocaleState(nextLocale));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    window.localStorage.setItem("dhermi-language", locale);
  }, [locale]);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return undefined;

    const frame = window.requestAnimationFrame(() => {
      document.getElementById(decodeURIComponent(hash))?.scrollIntoView();
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const value = useMemo(
    () => ({
      locale,
      setLocale
    }),
    [locale, setLocale]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
