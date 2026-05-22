import Image from "next/image";
import Link from "next/link";
import { AtSign, Mail, MapPin, MessageCircle, Music2, Phone } from "lucide-react";
import { navItems, primaryWhatsappHref } from "@/data/content";
import { assetPath, emailAddress, googleMapsUrl, instagramHandle, instagramUrl, phoneDisplay, tiktokHandle, tiktokUrl } from "@/lib/site";
import { LocalizedText } from "@/components/LocalizedText";

const navKeyByLabel: Record<string, string> = {
  Tours: "nav.tours",
  Private: "nav.private",
  Destinations: "nav.destinations",
  FAQ: "nav.faq",
  Contact: "nav.contact"
};

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
              <p className="mt-1 text-sm text-pearl/70">
                <LocalizedText id="footer.tagline">Discover the Albanian Riviera.</LocalizedText>
              </p>
            </div>
          </div>
          <p className="mt-6 max-w-md text-sm leading-7 text-pearl/72">
            <LocalizedText id="footer.text">
              Discover the Albanian Riviera.
            </LocalizedText>
          </p>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-sand">
            <LocalizedText id="footer.explore">Explore</LocalizedText>
          </p>
          <nav className="mt-5 grid gap-3 text-sm text-pearl/78" aria-label="Footer navigation">
            {navItems.map((item) => (
              <Link key={item.href} className="transition hover:text-white" href={item.href}>
                <LocalizedText id={navKeyByLabel[item.label] ?? item.label}>{item.label}</LocalizedText>
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-sand">
            <LocalizedText id="footer.contact">Contact</LocalizedText>
          </p>
          <div className="mt-5 grid gap-3 text-sm text-pearl/78">
            <a className="flex items-center gap-3 transition hover:text-white" href={primaryWhatsappHref} rel="noreferrer" target="_blank">
              <MessageCircle className="h-4 w-4 text-turquoise" />
              <LocalizedText id="footer.whatsapp">WhatsApp booking</LocalizedText>
            </a>
            <a className="flex items-center gap-3 transition hover:text-white" href={`tel:${phoneDisplay.replace(/\s/g, "")}`}>
              <Phone className="h-4 w-4 text-turquoise" />
              {phoneDisplay}
            </a>
            <a className="flex items-center gap-3 transition hover:text-white" href={`mailto:${emailAddress}`}>
              <Mail className="h-4 w-4 text-turquoise" />
              {emailAddress}
            </a>
            <a className="flex items-center gap-3 transition hover:text-white" href={googleMapsUrl} rel="noreferrer" target="_blank">
              <MapPin className="h-4 w-4 text-turquoise" />
              <LocalizedText id="footer.google">Google Maps</LocalizedText>
            </a>
            <a className="flex items-center gap-3 transition hover:text-white" href={instagramUrl} rel="noreferrer" target="_blank">
              <AtSign className="h-4 w-4 text-turquoise" />
              {instagramHandle}
            </a>
            <a className="flex items-center gap-3 transition hover:text-white" href={tiktokUrl} rel="noreferrer" target="_blank">
              <Music2 className="h-4 w-4 text-turquoise" />
              {tiktokHandle}
            </a>
            <p className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-turquoise" />
              <LocalizedText id="footer.location">Dhërmi area, Albania</LocalizedText>
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-pearl/55">
        © {new Date().getFullYear()} Dhermi Boat.{" "}
        <LocalizedText id="footer.credits">Boat Tours in Dhërmi.</LocalizedText>
      </div>
    </footer>
  );
}
