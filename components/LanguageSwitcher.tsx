"use client";

import { Languages } from "lucide-react";
import { localeAriaNames, localeLabels, locales, type Locale } from "@/lib/i18n";
import { useLanguage } from "@/components/LanguageProvider";
import { LocalizedText } from "@/components/LocalizedText";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="flex items-center gap-2" role="group" aria-label="Language selector">
      {!compact ? (
        <span className="hidden items-center gap-1 text-xs font-bold uppercase tracking-[0.18em] text-ink-soft xl:flex">
          <Languages className="h-4 w-4" aria-hidden />
          <LocalizedText id="language.label">Language</LocalizedText>
        </span>
      ) : null}
      <div className="inline-flex rounded-md border border-ink/12 bg-white p-1">
        {locales.map((item: Locale) => (
          <button
            key={item}
            aria-label={`Switch language to ${localeAriaNames[item]}`}
            aria-pressed={locale === item}
            className={[
              "h-8 min-w-9 rounded px-2 text-xs font-bold transition",
              locale === item ? "bg-ink text-pearl" : "text-ink-soft hover:bg-ink/5 hover:text-ink"
            ].join(" ")}
            type="button"
            onClick={() => setLocale(item)}
          >
            {localeLabels[item]}
          </button>
        ))}
      </div>
    </div>
  );
}
