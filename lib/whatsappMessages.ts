import type { Locale } from "@/lib/i18n";
import { defaultBookingMessage, whatsappUrl } from "@/lib/site";

export const whatsappMessages = {
  default: {
    en: defaultBookingMessage,
    fr: "Bonjour Dhermi Boat, je voudrais réserver un tour en bateau. Date : __ / Personnes : __ / Tour souhaité : __",
    sq: "Përshëndetje Dhermi Boat, dua të rezervoj një tur me varkë. Data: __ / Persona: __ / Turi i preferuar: __"
  },
  gjipe: {
    en: "Hello Dhermi Boat, I would like to book the Gjipe Tour. Date: __ / Adults: __ / Children: __",
    fr: "Bonjour Dhermi Boat, je voudrais réserver le Tour de Gjipe. Date : __ / Adultes : __ / Enfants : __",
    sq: "Përshëndetje Dhermi Boat, dua të rezervoj Turin e Gjipesë. Data: __ / Të rritur: __ / Fëmijë: __"
  },
  grama: {
    en: "Hello Dhermi Boat, I would like to book the Grama Bay Tour. Date: __ / Adults: __ / Children: __",
    fr: "Bonjour Dhermi Boat, je voudrais réserver le Tour de Grama. Date : __ / Adultes : __ / Enfants : __",
    sq: "Përshëndetje Dhermi Boat, dua të rezervoj Turin e Gramës. Data: __ / Të rritur: __ / Fëmijë: __"
  },
  private: {
    en: "Hello Dhermi Boat, I would like a private boat tour. Date: __ / People: __ / Hours: __ / Places: __",
    fr: "Bonjour Dhermi Boat, je voudrais un tour privé en bateau. Date : __ / Personnes : __ / Heures : __ / Lieux : __",
    sq: "Përshëndetje Dhermi Boat, dua një tur privat me varkë. Data: __ / Persona: __ / Orë: __ / Vende: __"
  },
  sunset: {
    en: "Hello Dhermi Boat, I would like to ask about the Sunset Private Tour. Date: __ / People: __",
    fr: "Bonjour Dhermi Boat, je voudrais demander le tour privé au coucher du soleil. Date : __ / Personnes : __",
    sq: "Përshëndetje Dhermi Boat, dua të pyes për turin privat në perëndim. Data: __ / Persona: __"
  },
  fishing: {
    en: "Hello Dhermi Boat, I would like to ask about the Morning Fishing Tour. Date: __ / People: __",
    fr: "Bonjour Dhermi Boat, je voudrais demander le tour pêche du matin. Date : __ / Personnes : __",
    sq: "Përshëndetje Dhermi Boat, dua të pyes për turin e peshkimit në mëngjes. Data: __ / Persona: __"
  }
} as const satisfies Record<string, Record<Locale, string>>;

export type WhatsappMessageKey = keyof typeof whatsappMessages;

export function whatsappHrefForKey(key: WhatsappMessageKey, locale: Locale = "en") {
  return whatsappUrl(whatsappMessages[key][locale]);
}
