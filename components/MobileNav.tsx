"use client";

import { useState } from "react";
import { Menu, MessageCircle, X } from "lucide-react";
import { navItems, primaryWhatsappHref } from "@/data/content";
import { ActiveNavLink } from "@/components/ActiveNavLink";
import { LocalizedText } from "@/components/LocalizedText";
import { navActivePathsByLabel, navKeyByLabel } from "@/components/navigationConfig";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const menuLabel = isOpen ? "Close menu" : "Navigation menu";

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={menuLabel}
        aria-controls="mobile-navigation-panel"
        aria-expanded={isOpen}
        className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-ink/12 bg-pearl text-ink shadow-sm transition hover:border-ink/22 hover:bg-white active:translate-y-px"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? <X className="h-5 w-5" aria-hidden strokeWidth={1.75} /> : <Menu className="h-5 w-5" aria-hidden strokeWidth={1.75} />}
      </button>

      {isOpen ? (
        <>
          <button
            type="button"
            aria-label="Close navigation menu"
            className="fixed inset-x-0 bottom-0 top-20 z-40 cursor-default bg-navy/45 backdrop-blur-[2px]"
            onClick={() => setIsOpen(false)}
          />
          <div
            id="mobile-navigation-panel"
            className="fixed left-3 right-3 top-[5.75rem] z-50 overflow-hidden rounded-xl border border-ink/10 bg-pearl p-2 shadow-[0_28px_90px_rgba(7,27,38,0.28)]"
          >
            <nav className="grid gap-1" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <ActiveNavLink
                  key={item.href}
                  activeClassName="bg-turquoise-soft text-ink shadow-[inset_0_0_0_1px_rgba(16,34,45,0.06)]"
                  activePaths={navActivePathsByLabel[item.label]}
                  className="flex min-h-12 items-center justify-between rounded-lg px-4 text-base font-semibold text-ink transition hover:bg-limestone active:translate-y-px"
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                >
                  <LocalizedText id={navKeyByLabel[item.label] ?? item.label}>{item.label}</LocalizedText>
                </ActiveNavLink>
              ))}
              <a
                className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-ink px-4 text-sm font-semibold text-pearl shadow-soft transition hover:bg-navy active:translate-y-px"
                data-analytics-event="whatsapp_click"
                data-whatsapp-key="default"
                href={primaryWhatsappHref}
                onClick={() => setIsOpen(false)}
                rel="noreferrer"
                target="_blank"
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                <LocalizedText id="cta.heroWhatsapp">Check availability on WhatsApp</LocalizedText>
              </a>
            </nav>
          </div>
        </>
      ) : null}
    </div>
  );
}
