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
    const nextLocale = isLocale(requested) ? requested : isLocale(stored) ? stored : defaultLocale;
    const frame = window.requestAnimationFrame(() => setLocaleState(nextLocale));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "al" ? "sq" : locale;
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
