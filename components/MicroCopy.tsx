import { LocalizedText } from "@/components/LocalizedText";
import { translations } from "@/lib/i18n";

export const TourDetailsText = () => <LocalizedText id="tour.details">{translations.en["tour.details"] ?? ""}</LocalizedText>;
export const CompareToursText = () => <LocalizedText id="cta.compareTours">{translations.en["cta.compareTours"] ?? ""}</LocalizedText>;
export const HeroWhatsappText = () => <LocalizedText id="cta.heroWhatsapp">{translations.en["cta.heroWhatsapp"] ?? ""}</LocalizedText>;
export const BookingTitleText = () => <LocalizedText id="booking.title">{translations.en["booking.title"] ?? ""}</LocalizedText>;
