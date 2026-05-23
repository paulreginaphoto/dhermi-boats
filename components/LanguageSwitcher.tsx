import { Languages } from "lucide-react";
import { locales, type Locale } from "@/lib/i18n";
import { LocalizedText } from "@/components/LocalizedText";
import { localeLabels, localeAriaNames } from "@/lib/i18n";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "language-switcher language-switcher-compact" : "language-switcher"} role="group" aria-label="Language selector">
      {!compact ? (
        <span className="hidden items-center gap-1 text-xs font-bold uppercase tracking-[0.18em] text-ink-soft xl:flex">
          <Languages className="h-4 w-4" aria-hidden />
          <LocalizedText id="language.label">Language</LocalizedText>
        </span>
      ) : null}
      <div className={compact ? "language-switcher-shell language-switcher-shell-compact" : "language-switcher-shell"}>
        {locales.map((item: Locale) => (
          <a
            key={item}
            href={`?dlang=${item}`}
            aria-label={`Switch language to ${localeAriaNames[item]}`}
            data-locale={item}
            data-locale-switcher
            className="language-option"
          >
            <span>{localeLabels[item]}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
