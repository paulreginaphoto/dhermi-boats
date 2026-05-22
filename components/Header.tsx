import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { navItems, primaryWhatsappHref } from "@/data/content";
import { ButtonLink } from "@/components/ButtonLink";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { LocalizedText } from "@/components/LocalizedText";
import { MobileNav } from "@/components/MobileNav";

const navKeyByLabel: Record<string, string> = {
  Tours: "nav.tours",
  Private: "nav.private",
  Destinations: "nav.destinations",
  FAQ: "nav.faq",
  Contact: "nav.contact"
};

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-pearl/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-site items-center justify-between gap-3 px-4 md:px-8">
        <Link className="min-w-0 leading-none" href="/" aria-label="Dhermi Boat home">
          <span className="flex min-w-0 flex-col leading-none">
            <span className="whitespace-nowrap font-serif text-xl font-semibold tracking-wide text-ink sm:text-2xl">
              Dhermi Boat
            </span>
            <span className="mt-1 hidden text-[10px] font-bold uppercase tracking-[0.24em] text-ink-soft sm:block">
              <LocalizedText id="brand.region">Albania Riviera</LocalizedText>
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              className="text-sm font-semibold text-ink-soft transition hover:text-ink"
              href={item.href}
            >
              <LocalizedText id={navKeyByLabel[item.label] ?? item.label}>{item.label}</LocalizedText>
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <ButtonLink href={primaryWhatsappHref} icon={MessageCircle}>
            <LocalizedText id="cta.book">Book now</LocalizedText>
          </ButtonLink>
        </div>

        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          <LanguageSwitcher compact />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
