import type { Locale } from "@/lib/i18n";
import { whatsappUrl } from "@/lib/site";

export const whatsappMessages = {
  default: {
    en: "Hello Dhermi Boat, I'd like to book a boat tour. Date: __ / Number of people: __ / Preferred tour: __ / Preferred time: __",
    fr: "Bonjour Dhermi Boat, je souhaite réserver un tour en bateau. Date : __ / Nombre de personnes : __ / Tour souhaité : __ / Horaire souhaité : __",
    sq: "Përshëndetje Dhermi Boat, dua të rezervoj një tur me varkë. Data: __ / Numri i personave: __ / Turi i preferuar: __ / Orari i preferuar: __"
  },
  gjipe: {
    en: "Hello Dhermi Boat, I'd like to book the Gjipe Tour. Date: __ / Number of adults: __ / Number of children: __ / Preferred time: __",
    fr: "Bonjour Dhermi Boat, je souhaite réserver le tour de Gjipe. Date : __ / Nombre d’adultes : __ / Nombre d’enfants : __ / Horaire souhaité : __",
    sq: "Përshëndetje Dhermi Boat, dua të rezervoj Turin e Gjipesë. Data: __ / Numri i të rriturve: __ / Numri i fëmijëve: __ / Orari i preferuar: __"
  },
  grama: {
    en: "Hello Dhermi Boat, I'd like to ask about Grama Bay availability. Date: __ / Number of adults: __ / Number of children: __ / Preferred time: __",
    fr: "Bonjour Dhermi Boat, je souhaite vérifier la disponibilité du tour de Grama. Date : __ / Nombre d’adultes : __ / Nombre d’enfants : __ / Horaire souhaité : __",
    sq: "Përshëndetje Dhermi Boat, dua të pyes për disponueshmërinë e Gramës. Data: __ / Numri i të rriturve: __ / Numri i fëmijëve: __ / Orari i preferuar: __"
  },
  private: {
    en: "Hello Dhermi Boat, I'd like to plan a private boat tour. Date: __ / Number of people: __ / Hours: __ / Route ideas: __",
    fr: "Bonjour Dhermi Boat, je souhaite planifier un tour privé en bateau. Date : __ / Nombre de personnes : __ / Heures : __ / Idées de route : __",
    sq: "Përshëndetje Dhermi Boat, dua të planifikoj një tur privat me varkë. Data: __ / Numri i personave: __ / Orë: __ / Ide për itinerarin: __"
  },
  sunset: {
    en: "Hello Dhermi Boat, I'd like to ask about the sunset tour. Date: __ / Number of people: __ / Preferred time: sunset / Route ideas: __",
    fr: "Bonjour Dhermi Boat, je souhaite demander le tour coucher de soleil. Date : __ / Nombre de personnes : __ / Horaire souhaité : coucher de soleil / Idées de route : __",
    sq: "Përshëndetje Dhermi Boat, dua të pyes për turin në perëndim. Data: __ / Numri i personave: __ / Orari i preferuar: perëndim / Ide për itinerarin: __"
  },
  fishing: {
    en: "Hello Dhermi Boat, I'd like to ask about the morning fishing tour. Date: __ / Number of people: __ / Preferred time: 5 AM to 8 AM / Route ideas: __",
    fr: "Bonjour Dhermi Boat, je souhaite demander le tour pêche du matin. Date : __ / Nombre de personnes : __ / Horaire souhaité : 5 h à 8 h / Idées de route : __",
    sq: "Përshëndetje Dhermi Boat, dua të pyes për turin e peshkimit në mëngjes. Data: __ / Numri i personave: __ / Orari i preferuar: 5:00 - 8:00 / Ide për itinerarin: __"
  }
} as const satisfies Record<string, Record<Locale, string>>;

export type WhatsappMessageKey = keyof typeof whatsappMessages;

export function whatsappHrefForKey(key: WhatsappMessageKey, locale: Locale = "en") {
  return whatsappUrl(whatsappMessages[key][locale]);
}
