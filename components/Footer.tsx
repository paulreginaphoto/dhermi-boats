import { AtSign, Mail, MapPin, MessageCircle, Music2, Phone, Ticket } from "lucide-react";
import { navItems, primaryWhatsappHref } from "@/data/content";
import { emailAddress, getYourGuideUrl, googleMapsUrl, instagramHandle, instagramUrl, phoneDisplay, tiktokHandle, tiktokUrl } from "@/lib/site";
import { LocalizedText } from "@/components/LocalizedText";

const navKeyByLabel: Record<string, string> = {
  Tours: "nav.tours",
  Photos: "nav.photos",
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
          <p className="font-serif text-3xl font-semibold leading-none">Dhermi Boat</p>
          <p className="mt-3 text-sm text-pearl/86">
            <LocalizedText id="footer.tagline">Discover the Albanian Riviera.</LocalizedText>
          </p>
          <p className="mt-6 max-w-md text-sm leading-7 text-pearl/86">
            <LocalizedText id="footer.text">
              Discover the Albanian Riviera.
            </LocalizedText>
          </p>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-sand">
            <LocalizedText id="footer.explore">Explore</LocalizedText>
          </p>
          <nav className="mt-5 grid gap-3 text-sm text-pearl/88" aria-label="Footer navigation">
            {navItems.map((item) => (
              <a key={item.href} className="transition hover:text-white" href={item.href}>
                <LocalizedText id={navKeyByLabel[item.label] ?? item.label}>{item.label}</LocalizedText>
              </a>
            ))}
          </nav>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-sand">
            <LocalizedText id="footer.contact">Contact</LocalizedText>
          </p>
          <div className="mt-5 grid gap-3 text-sm text-pearl/88">
            <a className="flex items-center gap-3 transition hover:text-white" data-whatsapp-key="default" href={primaryWhatsappHref} rel="noreferrer" target="_blank">
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
            <a className="flex items-center gap-3 transition hover:text-white" href={getYourGuideUrl} rel="noreferrer" target="_blank">
              <Ticket className="h-4 w-4 text-turquoise" />
              <LocalizedText id="footer.getyourguide">GetYourGuide</LocalizedText>
            </a>
            <p className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-turquoise" />
              <LocalizedText id="footer.location">Dhërmi area, Albania</LocalizedText>
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-pearl/82">
        © {new Date().getFullYear()} Dhermi Boat.{" "}
        <LocalizedText id="footer.credits">Boat Tours in Dhërmi.</LocalizedText>
      </div>
    </footer>
  );
}

