import { ChevronDown, MessageCircle } from "lucide-react";
import { navItems, primaryWhatsappHref } from "@/data/content";
import { LocalizedText } from "@/components/LocalizedText";

const navKeyByLabel: Record<string, string> = {
  Tours: "nav.tours",
  Photos: "nav.photos",
  Private: "nav.private",
  Destinations: "nav.destinations",
  FAQ: "nav.faq",
  Contact: "nav.contact"
};

export function MobileNav() {
  return (
    <div className="lg:hidden">
      <details className="group relative">
        <summary className="list-none">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-ink/15 bg-white text-ink">
            <span className="relative flex h-5 w-5 items-center justify-center">
              <ChevronDown className="h-5 w-5 transition duration-300 group-open:rotate-180" aria-hidden />
            </span>
          </div>
        </summary>
        <div className="absolute left-4 right-4 top-14 z-20 rounded-md border border-ink/10 bg-pearl p-4 shadow-soft hidden group-open:block">
          <nav className="grid gap-1" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <a
                key={item.href}
                className="rounded-md px-3 py-3 text-base font-semibold text-ink transition hover:bg-ink/5"
                href={item.href}
              >
                <LocalizedText id={navKeyByLabel[item.label] ?? item.label}>{item.label}</LocalizedText>
              </a>
            ))}
            <a
              className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-ink px-4 text-sm font-semibold text-pearl"
              data-whatsapp-key="default"
              href={primaryWhatsappHref}
              rel="noreferrer"
              target="_blank"
            >
              <MessageCircle className="h-4 w-4" />
              <LocalizedText id="cta.book">Book now</LocalizedText>
            </a>
          </nav>
        </div>
      </details>
    </div>
  );
}
