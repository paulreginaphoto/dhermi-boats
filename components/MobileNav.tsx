"use client";

import Link from "next/link";
import { Menu, MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { navItems, primaryWhatsappHref } from "@/data/content";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { LocalizedText } from "@/components/LocalizedText";

const navKeyByLabel: Record<string, string> = {
  Tours: "nav.tours",
  Private: "nav.private",
  Destinations: "nav.destinations",
  FAQ: "nav.faq",
  Contact: "nav.contact"
};

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        aria-expanded={open}
        aria-label={open ? "Close navigation" : "Open navigation"}
        className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-ink/15 bg-white text-ink"
        type="button"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open ? (
        <div className="absolute left-4 right-4 top-24 rounded-md border border-ink/10 bg-pearl p-4 shadow-soft">
          <nav className="grid gap-1" aria-label="Mobile navigation">
            <div className="px-3 py-2">
              <LanguageSwitcher compact />
            </div>
            {navItems.map((item) => (
              <Link
                key={item.href}
                className="rounded-md px-3 py-3 text-base font-semibold text-ink transition hover:bg-ink/5"
                href={item.href}
                onClick={() => setOpen(false)}
              >
                <LocalizedText id={navKeyByLabel[item.label] ?? item.label}>{item.label}</LocalizedText>
              </Link>
            ))}
            <a
              className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-ink px-4 text-sm font-semibold text-pearl"
              href={primaryWhatsappHref}
              rel="noreferrer"
              target="_blank"
              onClick={() => setOpen(false)}
            >
              <MessageCircle className="h-4 w-4" />
              <LocalizedText id="cta.book">BOOK YOUR TOUR NOW</LocalizedText>
            </a>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
