import { Menu, MessageCircle, X } from "lucide-react";
import { navItems, primaryWhatsappHref } from "@/data/content";
import { HeroWhatsappText } from "@/components/MicroCopy";
import { LocalizedText } from "@/components/LocalizedText";
import { navKeyByLabel } from "@/components/navigationConfig";
import { conversionAttrs } from "@/lib/conversion";
import { translations } from "@/lib/i18n";

export function MobileNav() {
  return (
    <details className="group relative z-[95] lg:hidden">
      <span id="mobile-navigation-label" className="sr-only">
        <LocalizedText id="a11y.mobileNavigation">{translations.en["a11y.mobileNavigation"] ?? ""}</LocalizedText>
      </span>
      <summary
        aria-label="Navigation menu"
        aria-labelledby="mobile-navigation-label"
        className="inline-flex h-11 w-11 list-none items-center justify-center rounded-lg border border-ink/12 bg-pearl text-ink shadow-sm transition hover:border-ink/22 hover:bg-white active:translate-y-px [&::-webkit-details-marker]:hidden"
      >
        <Menu className="h-5 w-5 group-open:hidden" aria-hidden strokeWidth={1.75} />
        <X className="hidden h-5 w-5 group-open:block" aria-hidden strokeWidth={1.75} />
      </summary>
      <div
        id="mobile-navigation-panel"
        className="fixed left-3 right-3 top-[5.75rem] z-[95] overflow-hidden rounded-xl border border-ink/10 bg-pearl p-2 shadow-[0_28px_90px_rgba(7,27,38,0.28)]"
      >
        <nav className="grid gap-1" aria-labelledby="mobile-navigation-label">
          {navItems.map((item) => (
            <a
              key={item.href}
              className="flex min-h-12 items-center justify-between rounded-lg px-4 text-base font-semibold text-ink transition hover:bg-limestone active:translate-y-px"
              href={item.href}
            >
              <LocalizedText id={navKeyByLabel[item.label] ?? item.label}>{item.label}</LocalizedText>
            </a>
          ))}
          <a
            className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-ink px-4 text-sm font-semibold text-pearl shadow-soft transition hover:bg-navy active:translate-y-px"
            data-whatsapp-key="default"
            href={primaryWhatsappHref}
            {...conversionAttrs({ tourId: "default", placement: "mobile_menu" })}
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            <HeroWhatsappText />
          </a>
        </nav>
      </div>
    </details>
  );
}
