import { Languages } from "lucide-react";
import { locales, type Locale } from "@/lib/i18n";
import { LocalizedText } from "@/components/LocalizedText";
import { localeLabels, localeAriaNames } from "@/lib/i18n";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "flex items-center" : "flex items-center gap-2"} role="group" aria-label="Language selector">
      {!compact ? (
        <span className="hidden items-center gap-1 text-xs font-bold uppercase tracking-[0.18em] text-ink-soft xl:flex">
          <Languages className="h-4 w-4" aria-hidden />
          <LocalizedText id="language.label">Language</LocalizedText>
        </span>
      ) : null}
      <div className={compact ? "inline-flex rounded-md border border-ink/12 bg-white p-0.5 shadow-sm" : "inline-flex rounded-md border border-ink/12 bg-white p-1"}>
        {locales.map((item: Locale) => (
          <a
            key={item}
            href={`?dlang=${item}`}
            aria-label={`Switch language to ${localeAriaNames[item]}`}
            data-locale={item}
            data-locale-switcher
            className={[
              compact ? "h-8 min-w-7 rounded px-1 text-[10px] sm:min-w-8 sm:px-1.5 sm:text-[11px]" : "h-8 min-w-9 rounded px-2 text-xs",
              "font-bold transition active:translate-y-px text-ink-soft hover:bg-ink/5 hover:text-ink"
            ].join(" ")}
          >
            {localeLabels[item]}
          </a>
        ))}
      </div>
    </div>
  );
}
