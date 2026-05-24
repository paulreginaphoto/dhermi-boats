import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { navItems, primaryWhatsappHref } from "@/data/content";
import { ActiveNavLink } from "@/components/ActiveNavLink";
import { ButtonLink } from "@/components/ButtonLink";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { LocalizedText } from "@/components/LocalizedText";
import { MobileNav } from "@/components/MobileNav";
import { navActivePathsByLabel, navKeyByLabel } from "@/components/navigationConfig";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-pearl/90 backdrop-blur-xl">
      <div className="relative mx-auto flex h-20 max-w-site items-center justify-between gap-1 px-2 sm:gap-3 sm:px-4 md:px-8">
        <Link className="flex min-h-11 min-w-0 items-center leading-none" href="/" aria-label="Dhermi Boat home" prefetch={false}>
          <span className="flex min-w-0 flex-col leading-none">
            <span className="whitespace-nowrap font-serif text-base font-semibold tracking-wide text-ink sm:text-2xl">
              Dhermi Boat
            </span>
            <span className="mt-1 hidden text-[10px] font-bold uppercase tracking-[0.24em] text-ink-soft sm:block">
              <LocalizedText id="brand.region">Albania Riviera</LocalizedText>
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <ActiveNavLink
              key={item.href}
              activeClassName="bg-turquoise-soft text-ink shadow-[inset_0_0_0_1px_rgba(16,34,45,0.06)]"
              activePaths={navActivePathsByLabel[item.label]}
              className="rounded-full px-3 py-2 text-sm font-semibold text-ink-soft transition hover:bg-white/70 hover:text-ink"
              href={item.href}
            >
              <LocalizedText id={navKeyByLabel[item.label] ?? item.label}>{item.label}</LocalizedText>
            </ActiveNavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <ButtonLink href={primaryWhatsappHref} icon={MessageCircle} whatsappKey="default" analyticsEvent="whatsapp_click">
            <LocalizedText id="cta.book">Book now</LocalizedText>
          </ButtonLink>
        </div>

        <div className="absolute right-2 top-1/2 flex shrink-0 -translate-y-1/2 items-center gap-1 lg:hidden">
          <LanguageSwitcher compact />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
