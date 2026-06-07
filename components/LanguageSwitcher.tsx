"use client";

import { Languages } from "lucide-react";
import { locales, type Locale, translations, localeLabels, localeAriaNames } from "@/lib/i18n";
import { LocalizedText } from "@/components/LocalizedText";
import { useLanguage } from "@/components/LanguageProvider";

const enText = (key: string) => translations.en[key] ?? "";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const baseId = compact ? "language-switcher-mobile" : "language-switcher-desktop";
  const { locale, setLocale } = useLanguage();

  return (
    <div className={compact ? "language-switcher language-switcher-compact" : "language-switcher"}>
      <span id={`${baseId}-label`} className="sr-only">
        <LocalizedText id="a11y.languageSwitcher">{enText("a11y.languageSwitcher")}</LocalizedText>
      </span>
      {!compact ? (
        <span className="hidden items-center gap-1 text-xs font-bold uppercase tracking-[0.18em] text-ink-soft xl:flex">
          <Languages className="h-4 w-4" aria-hidden />
            <LocalizedText id="language.label">{enText("language.label")}</LocalizedText>
          </span>
      ) : null}
      <div className={compact ? "language-switcher-shell language-switcher-shell-compact" : "language-switcher-shell"}>
        {locales.map((item: Locale) => (
          <button
            key={item}
            type="button"
            aria-label={`${localeLabels[item]} - ${localeAriaNames[item]}`}
            data-analytics-event="language_switch_click"
            data-locale={item}
            data-locale-switcher
            data-active={item === locale ? true : undefined}
            aria-current={item === locale ? "true" : undefined}
            aria-pressed={item === locale}
            className="language-option"
            onClick={() => setLocale(item)}
          >
            <span>{localeLabels[item]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
