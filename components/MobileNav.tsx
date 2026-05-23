import { Menu, MessageCircle, X } from "lucide-react";
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
        <summary
          aria-label="Navigation menu"
          className="list-none cursor-pointer rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turquoise [&::-webkit-details-marker]:hidden"
        >
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-ink/12 bg-pearl text-ink shadow-sm transition hover:border-ink/22 hover:bg-white active:translate-y-px">
            <Menu className="h-5 w-5 group-open:hidden" aria-hidden strokeWidth={1.75} />
            <X className="hidden h-5 w-5 group-open:block" aria-hidden strokeWidth={1.75} />
          </span>
        </summary>
        <div className="fixed inset-x-0 bottom-0 top-20 z-40 hidden bg-navy/45 backdrop-blur-[2px] group-open:block" />
        <div className="fixed left-3 right-3 top-[5.75rem] z-50 hidden overflow-hidden rounded-xl border border-ink/10 bg-pearl p-2 shadow-[0_28px_90px_rgba(7,27,38,0.28)] group-open:block">
          <nav className="grid gap-1" aria-label="Mobile navigation">
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
