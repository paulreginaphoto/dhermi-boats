import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { navItems, primaryWhatsappHref } from "@/data/content";
import { ButtonLink } from "@/components/ButtonLink";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { LocalizedText } from "@/components/LocalizedText";
import { MobileNav } from "@/components/MobileNav";
import { navKeyByLabel } from "@/components/navigationConfig";
import { translations } from "@/lib/i18n";

const enText = (key: string) => translations.en[key] ?? "";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-pearl/90 backdrop-blur-xl">
      <div className="relative mx-auto flex h-20 max-w-site items-center justify-between gap-2 px-2 sm:gap-3 sm:px-4 md:px-8">
        <Link className="flex min-h-11 min-w-0 flex-1 items-center leading-none lg:flex-none" href="/" prefetch={false}>
          <span className="flex min-w-0 flex-col leading-none">
            <span className="truncate whitespace-nowrap font-serif text-[0.95rem] font-semibold tracking-wide text-ink min-[360px]:text-base sm:text-2xl">
              Dhermi Boat
            </span>
            <span className="mt-1 hidden text-[10px] font-bold uppercase tracking-[0.24em] text-ink-soft sm:block">
              <LocalizedText id="brand.region">{enText("brand.region")}</LocalizedText>
            </span>
          </span>
        </Link>

        <span id="main-navigation-label" className="sr-only">
          <LocalizedText id="a11y.mainNavigation">{enText("a11y.mainNavigation")}</LocalizedText>
        </span>
        <nav className="hidden items-center gap-1 lg:flex" aria-labelledby="main-navigation-label">
          {navItems.map((item) => (
            <a
              key={item.href}
              className="rounded-full px-3 py-2 text-sm font-semibold text-ink-soft transition hover:bg-white/70 hover:text-ink"
              href={item.href}
            >
              <LocalizedText id={navKeyByLabel[item.label] ?? item.label}>{item.label}</LocalizedText>
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <ButtonLink href={primaryWhatsappHref} icon={MessageCircle} whatsappKey="default" analyticsPlacement="header">
            <LocalizedText id="cta.askAvailability">{enText("cta.askAvailability")}</LocalizedText>
          </ButtonLink>
        </div>

        <div className="flex shrink-0 items-center gap-1 lg:hidden">
          <LanguageSwitcher compact />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
