import { AtSign, MapPin, MessageCircle, Music2, Ticket } from "lucide-react";
import { navItems, primaryWhatsappHref } from "@/data/content";
import { getYourGuideUrl, googleMapsUrl, instagramHandle, instagramUrl, tiktokHandle, tiktokUrl } from "@/lib/site";
import { ActiveNavLink } from "@/components/ActiveNavLink";
import { LocalizedText } from "@/components/LocalizedText";
import { navActivePathsByLabel, navKeyByLabel } from "@/components/navigationConfig";
import { conversionAttrs } from "@/lib/conversion";
import { translations } from "@/lib/i18n";

export function Footer() {
  return (
    <footer className="bg-navy text-pearl">
      <div className="mx-auto grid max-w-site gap-10 px-5 py-14 md:grid-cols-[1.2fr_0.8fr_0.8fr] md:px-8">
        <div>
          <p className="font-serif text-3xl font-semibold leading-none">Dhermi Boat</p>
          <p className="mt-3 text-sm text-pearl/86">
            <LocalizedText id="footer.tagline">{translations.en["footer.tagline"] ?? ""}</LocalizedText>
          </p>
          <p className="mt-6 max-w-md text-sm leading-7 text-pearl/86">
            <LocalizedText id="footer.text">{translations.en["footer.text"] ?? ""}</LocalizedText>
          </p>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-sand">
            <LocalizedText id="footer.explore">{translations.en["footer.explore"] ?? ""}</LocalizedText>
          </p>
          <span id="footer-navigation-label" className="sr-only">
            <LocalizedText id="a11y.footerNavigation">{translations.en["a11y.footerNavigation"] ?? ""}</LocalizedText>
          </span>
          <nav className="mt-5 grid gap-3 text-sm text-pearl/88" aria-labelledby="footer-navigation-label">
            {navItems.map((item) => (
              <ActiveNavLink
                key={item.href}
                activeClassName="bg-white/10 text-white"
                activePaths={navActivePathsByLabel[item.label]}
                className="-mx-2 rounded-md px-2 py-1 transition hover:bg-white/8 hover:text-white"
                href={item.href}
              >
                <LocalizedText id={navKeyByLabel[item.label] ?? item.label}>{item.label}</LocalizedText>
              </ActiveNavLink>
            ))}
          </nav>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-sand">
            <LocalizedText id="footer.contact">{translations.en["footer.contact"] ?? ""}</LocalizedText>
          </p>
          <div className="mt-5 grid gap-3 text-sm text-pearl/88">
            <a className="flex items-center gap-3 transition hover:text-white" data-whatsapp-key="default" href={primaryWhatsappHref} {...conversionAttrs({ tourId: "default", placement: "footer" })}>
              <MessageCircle className="h-4 w-4 text-turquoise" />
              <LocalizedText id="footer.whatsapp">{translations.en["footer.whatsapp"] ?? ""}</LocalizedText>
            </a>
            <a className="flex items-center gap-3 transition hover:text-white" data-analytics-event="maps_click" href={googleMapsUrl} rel="noreferrer" target="_blank">
              <MapPin className="h-4 w-4 text-turquoise" />
              <LocalizedText id="footer.google">{translations.en["footer.google"] ?? ""}</LocalizedText>
            </a>
            <a className="flex items-center gap-3 transition hover:text-white" data-analytics-event="instagram_click" href={instagramUrl} rel="noreferrer" target="_blank">
              <AtSign className="h-4 w-4 text-turquoise" />
              {instagramHandle}
            </a>
            <a className="flex items-center gap-3 transition hover:text-white" data-analytics-event="tiktok_click" href={tiktokUrl} rel="noreferrer" target="_blank">
              <Music2 className="h-4 w-4 text-turquoise" />
              {tiktokHandle}
            </a>
            <a className="flex items-center gap-3 transition hover:text-white" data-analytics-event="getyourguide_click" href={getYourGuideUrl} rel="noreferrer" target="_blank">
              <Ticket className="h-4 w-4 text-turquoise" />
              <LocalizedText id="footer.getyourguide">{translations.en["footer.getyourguide"] ?? ""}</LocalizedText>
            </a>
            <p className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-turquoise" />
              <LocalizedText id="footer.location">{translations.en["footer.location"] ?? ""}</LocalizedText>
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-pearl/82">
        © {new Date().getFullYear()} Dhermi Boat.{" "}
        <LocalizedText id="footer.credits">{translations.en["footer.credits"] ?? ""}</LocalizedText>
      </div>
    </footer>
  );
}

