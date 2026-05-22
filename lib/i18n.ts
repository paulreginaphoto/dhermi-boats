export const locales = ["en", "fr", "al"] as const;
export type Locale = (typeof locales)[number];

export const localeLabels: Record<Locale, string> = {
  en: "EN",
  fr: "FR",
  al: "AL"
};

export const localeNames: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  al: "Shqip"
};

export const localeAriaNames: Record<Locale, string> = {
  en: "English",
  fr: "French",
  al: "Albanian"
};

export const defaultLocale: Locale = "en";

export const translations: Record<Locale, Record<string, string>> = {
  en: {
    "nav.tours": "Tours",
    "nav.private": "Private",
    "nav.destinations": "Destinations",
    "nav.faq": "FAQ",
    "nav.contact": "Contact",
    "cta.book": "Book on WhatsApp",
    "cta.viewTours": "View tours",
    "cta.askAvailability": "Ask availability",
    "hero.title": "Boat tours in Dhërmi",
    "hero.text": "Discover the Albanian Riviera from the sea with private and small-group tours to Gjipe, Grama Bay, Blue Cave and the Karaburun coastline.",
    "badge.daily": "Daily departures",
    "badge.guests": "Up to 15 guests",
    "badge.skipper": "Local skipper",
    "badge.whatsapp": "WhatsApp booking",
    "badge.languages": "Albanian, French and English",
    "section.tours.label": "Choose your tour",
    "section.tours.title": "Fast booking, clear routes, real coastline.",
    "section.tours.text": "Pick a shared route for the essentials, or reserve the boat privately and shape the day around your group.",
    "section.social.label": "Social proof",
    "section.social.title": "Real moments from the boat, not stock media.",
    "section.social.text": "A light feed using public Dhermi Boat social media and real site media. Follow the profiles for current clips, route conditions and fresh guest moments.",
    "social.instagram": "Follow on Instagram",
    "social.tiktok": "Watch on TikTok",
    "social.latest": "Latest TikTok clips",
    "tour.book": "Book",
    "tour.details": "Details",
    "language.label": "Language"
  },
  fr: {
    "nav.tours": "Tours",
    "nav.private": "Privé",
    "nav.destinations": "Destinations",
    "nav.faq": "FAQ",
    "nav.contact": "Contact",
    "cta.book": "Réserver sur WhatsApp",
    "cta.viewTours": "Voir les tours",
    "cta.askAvailability": "Demander la disponibilité",
    "hero.title": "Tours en bateau à Dhërmi",
    "hero.text": "Découvrez la Riviera albanaise depuis la mer avec des tours privés et en petit groupe vers Gjipe, Grama Bay, Blue Cave et la côte de Karaburun.",
    "badge.daily": "Départs quotidiens",
    "badge.guests": "Jusqu’à 15 personnes",
    "badge.skipper": "Skipper local",
    "badge.whatsapp": "Réservation WhatsApp",
    "badge.languages": "Albanais, français et anglais",
    "section.tours.label": "Choisir son tour",
    "section.tours.title": "Réservation simple, itinéraires clairs, vraie côte.",
    "section.tours.text": "Choisissez un tour partagé pour l’essentiel, ou privatisez le bateau pour adapter la journée à votre groupe.",
    "section.social.label": "Preuve sociale",
    "section.social.title": "De vrais moments du bateau, pas des médias stock.",
    "section.social.text": "Un feed léger basé sur les réseaux publics de Dhermi Boat et les médias réels du site. Suivez les profils pour les clips récents, les conditions et les moments clients.",
    "social.instagram": "Suivre sur Instagram",
    "social.tiktok": "Voir sur TikTok",
    "social.latest": "Clips TikTok récents",
    "tour.book": "Réserver",
    "tour.details": "Détails",
    "language.label": "Langue"
  },
  al: {
    "nav.tours": "Turet",
    "nav.private": "Privat",
    "nav.destinations": "Destinacionet",
    "nav.faq": "FAQ",
    "nav.contact": "Kontakt",
    "cta.book": "Rezervo në WhatsApp",
    "cta.viewTours": "Shiko turet",
    "cta.askAvailability": "Pyet për disponueshmëri",
    "hero.title": "Ture me varkë në Dhërmi",
    "hero.text": "Zbuloni Rivierën Shqiptare nga deti me ture private dhe në grupe të vogla drejt Gjipesë, Grama Bay, Blue Cave dhe bregdetit të Karaburunit.",
    "badge.daily": "Nisje çdo ditë",
    "badge.guests": "Deri në 15 persona",
    "badge.skipper": "Kapiten lokal",
    "badge.whatsapp": "Rezervim në WhatsApp",
    "badge.languages": "Shqip, frëngjisht dhe anglisht",
    "section.tours.label": "Zgjidh turin",
    "section.tours.title": "Rezervim i shpejtë, rrugë të qarta, bregdet i vërtetë.",
    "section.tours.text": "Zgjidhni një tur të përbashkët për pikat kryesore, ose merrni varkën private për një ditë sipas grupit tuaj.",
    "section.social.label": "Media sociale",
    "section.social.title": "Momente reale nga varka, jo foto stock.",
    "section.social.text": "Një feed i lehtë me media publike nga Dhermi Boat dhe media reale të faqes. Ndiqni profilet për klipe të reja dhe momente nga udhëtimet.",
    "social.instagram": "Ndiq në Instagram",
    "social.tiktok": "Shiko në TikTok",
    "social.latest": "Klipe të fundit në TikTok",
    "tour.book": "Rezervo",
    "tour.details": "Detaje",
    "language.label": "Gjuha"
  }
};

export function isLocale(value: string | null | undefined): value is Locale {
  return Boolean(value && locales.includes(value as Locale));
}
