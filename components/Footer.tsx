import Image from "next/image";
import Link from "next/link";
import { AtSign, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { navItems, primaryWhatsappHref } from "@/data/content";
import { assetPath, emailAddress, instagramHandle, instagramUrl, phoneDisplay } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-navy text-pearl">
      <div className="mx-auto grid max-w-site gap-10 px-5 py-14 md:grid-cols-[1.2fr_0.8fr_0.8fr] md:px-8">
        <div>
          <div className="flex items-center gap-4">
            <span className="relative flex h-14 w-20 items-center justify-center overflow-hidden rounded-sm bg-white">
              <Image
                src={assetPath("/images/brand-mark-wide.webp")}
                alt=""
                width={104}
                height={45}
                className="h-auto w-16"
              />
            </span>
            <div>
              <p className="font-serif text-2xl font-semibold">Dhermi Boat</p>
              <p className="mt-1 text-sm text-pearl/70">Premium boat tours from Dhërmi, Albania.</p>
            </div>
          </div>
          <p className="mt-6 max-w-md text-sm leading-7 text-pearl/72">
            Small-group and private boat tours to Gjipe, Grama Bay, Blue Cave and the Albanian Riviera.
            Booking is confirmed directly on WhatsApp.
          </p>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-sand">Explore</p>
          <nav className="mt-5 grid gap-3 text-sm text-pearl/78" aria-label="Footer navigation">
            {navItems.map((item) => (
              <Link key={item.href} className="transition hover:text-white" href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-sand">Contact</p>
          <div className="mt-5 grid gap-3 text-sm text-pearl/78">
            <a className="flex items-center gap-3 transition hover:text-white" href={primaryWhatsappHref} rel="noreferrer" target="_blank">
              <MessageCircle className="h-4 w-4 text-turquoise" />
              WhatsApp booking
            </a>
            <a className="flex items-center gap-3 transition hover:text-white" href={`tel:${phoneDisplay.replace(/\s/g, "")}`}>
              <Phone className="h-4 w-4 text-turquoise" />
              {phoneDisplay}
            </a>
            <a className="flex items-center gap-3 transition hover:text-white" href={`mailto:${emailAddress}`}>
              <Mail className="h-4 w-4 text-turquoise" />
              {emailAddress}
            </a>
            <a className="flex items-center gap-3 transition hover:text-white" href={instagramUrl} rel="noreferrer" target="_blank">
              <AtSign className="h-4 w-4 text-turquoise" />
              {instagramHandle}
            </a>
            <p className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-turquoise" />
              Dhërmi area, Albania
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-pearl/55">
        © {new Date().getFullYear()} Dhermi Boat. Static site built for speed, clarity and direct booking.
      </div>
    </footer>
  );
}
