import type { Locale } from "@/lib/i18n";
import { defaultBookingMessage, whatsappUrl } from "@/lib/site";

export const whatsappMessages = {
  default: {
    en: defaultBookingMessage,
    fr: "Bonjour Dhermi Boat, je voudrais réserver un tour en bateau. Date : __ / Personnes : __ / Tour souhaité : __",
    al: "Pershendetje Dhermi Boat, dua te rezervoj nje tur me varke. Data: __ / Persona: __ / Turi i preferuar: __"
  },
  gjipe: {
    en: "Hello Dhermi Boat, I would like to book the Gjipe Tour. Date: __ / Adults: __ / Children: __",
    fr: "Bonjour Dhermi Boat, je voudrais réserver le Tour de Gjipe. Date : __ / Adultes : __ / Enfants : __",
    al: "Pershendetje Dhermi Boat, dua te rezervoj Turin e Gjipesë. Data: __ / Te rritur: __ / Femije: __"
  },
  grama: {
    en: "Hello Dhermi Boat, I would like to book the Grama Bay Tour. Date: __ / Adults: __ / Children: __",
    fr: "Bonjour Dhermi Boat, je voudrais réserver le Tour de Grama. Date : __ / Adultes : __ / Enfants : __",
    al: "Pershendetje Dhermi Boat, dua te rezervoj Turin e Gramës. Data: __ / Te rritur: __ / Femije: __"
  },
  private: {
    en: "Hello Dhermi Boat, I would like a private boat tour. Date: __ / People: __ / Hours: __ / Places: __",
    fr: "Bonjour Dhermi Boat, je voudrais un tour privé en bateau. Date : __ / Personnes : __ / Heures : __ / Lieux : __",
    al: "Pershendetje Dhermi Boat, dua nje tur privat me varke. Data: __ / Persona: __ / Ore: __ / Vende: __"
  },
  sunset: {
    en: "Hello Dhermi Boat, I would like to ask about the Sunset Private Tour. Date: __ / People: __",
    fr: "Bonjour Dhermi Boat, je voudrais demander le Sunset Tour privé. Date : __ / Personnes : __",
    al: "Pershendetje Dhermi Boat, dua te pyes per Sunset Tour privat. Data: __ / Persona: __"
  },
  fishing: {
    en: "Hello Dhermi Boat, I would like to ask about the Morning Fishing Tour. Date: __ / People: __",
    fr: "Bonjour Dhermi Boat, je voudrais demander le Morning Fishing Tour. Date : __ / Personnes : __",
    al: "Pershendetje Dhermi Boat, dua te pyes per Morning Fishing Tour. Data: __ / Persona: __"
  }
} as const satisfies Record<string, Record<Locale, string>>;

export type WhatsappMessageKey = keyof typeof whatsappMessages;

export function whatsappHrefForKey(key: WhatsappMessageKey, locale: Locale = "en") {
  return whatsappUrl(whatsappMessages[key][locale]);
}
