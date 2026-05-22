import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { navItems, primaryWhatsappHref } from "@/data/content";
import { assetPath } from "@/lib/site";
import { ButtonLink } from "@/components/ButtonLink";
import { MobileNav } from "@/components/MobileNav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-pearl/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-site items-center justify-between px-5 md:px-8">
        <Link className="flex items-center gap-3" href="/" aria-label="Dhermi Boat home">
          <span className="relative flex h-11 w-16 items-center justify-center overflow-hidden rounded-sm bg-white shadow-sm">
            <Image
              src={assetPath("/images/brand-mark-wide.webp")}
              alt=""
              width={92}
              height={40}
              priority
              className="h-auto w-14"
            />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-serif text-xl font-semibold tracking-wide text-ink">Dhermi Boat</span>
            <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.24em] text-ink-soft">
              Albania Riviera
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
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ButtonLink href={primaryWhatsappHref} icon={MessageCircle}>
            Book on WhatsApp
          </ButtonLink>
        </div>

        <MobileNav />
      </div>
    </header>
  );
}

