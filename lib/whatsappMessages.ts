import type { Locale } from "@/lib/i18n";
import { whatsappUrl } from "@/lib/site";

export const whatsappMessages = {
  default: {
    en: "Hello Dhermi Boat, I'd like to book a boat tour. Tour: __ / Date: __ / Adults: __ / Children: __ / Preferred time: __ / Questions: __",
    fr: "Bonjour Dhermi Boat, je souhaite réserver un tour en bateau. Tour : __ / Date : __ / Adultes : __ / Enfants : __ / Horaire souhaité : __ / Questions : __",
    sq: "Përshëndetje Dhermi Boat, dua të rezervoj një tur me varkë. Turi: __ / Data: __ / Të rritur: __ / Fëmijë: __ / Ora e preferuar: __ / Pyetje: __"
  },
  gjipe: {
    en: "Hello Dhermi Boat, I'd like to book the Gjipe Tour. Tour: Gjipe Tour / Date: __ / Adults: __ / Children: __ / Preferred time: __ / Questions: __",
    fr: "Bonjour Dhermi Boat, je souhaite réserver le tour de Gjipe. Tour : Gjipe / Date : __ / Adultes : __ / Enfants : __ / Horaire souhaité : __ / Questions : __",
    sq: "Përshëndetje Dhermi Boat, dua të rezervoj Turin e Gjipesë. Turi: Gjipe / Data: __ / Të rritur: __ / Fëmijë: __ / Ora e preferuar: __ / Pyetje: __"
  },
  grama: {
    en: "Hello Dhermi Boat, I'd like to ask about Grama Bay availability. Tour: Grama Bay Tour / Date: __ / Adults: __ / Children: __ / Preferred time: __ / Questions: __",
    fr: "Bonjour Dhermi Boat, je souhaite vérifier la disponibilité du tour de Grama. Tour : Grama / Date : __ / Adultes : __ / Enfants : __ / Horaire souhaité : __ / Questions : __",
    sq: "Përshëndetje Dhermi Boat, dua të pyes për disponueshmërinë e Gramës. Turi: Grama / Data: __ / Të rritur: __ / Fëmijë: __ / Ora e preferuar: __ / Pyetje: __"
  },
  private: {
    en: "Hello Dhermi Boat, I'd like to plan a private boat tour. Tour: Private Boat Tour / Date: __ / Adults: __ / Children: __ / Preferred time: __ / Questions: __",
    fr: "Bonjour Dhermi Boat, je souhaite planifier un tour privé en bateau. Tour : tour privé / Date : __ / Adultes : __ / Enfants : __ / Horaire souhaité : __ / Questions : __",
    sq: "Përshëndetje Dhermi Boat, dua të planifikoj një tur privat me varkë. Turi: tur privat / Data: __ / Të rritur: __ / Fëmijë: __ / Ora e preferuar: __ / Pyetje: __"
  },
  sunset: {
    en: "Hello Dhermi Boat, I'd like to ask about the sunset tour. Tour: Sunset Private Tour / Date: __ / Adults: __ / Children: __ / Preferred time: sunset / Questions: __",
    fr: "Bonjour Dhermi Boat, je souhaite vérifier la disponibilité au coucher de soleil. Tour : coucher de soleil / Date : __ / Adultes : __ / Enfants : __ / Horaire souhaité : coucher de soleil / Questions : __",
    sq: "Përshëndetje Dhermi Boat, dua të pyes për turin në perëndim. Turi: perëndim / Data: __ / Të rritur: __ / Fëmijë: __ / Ora e preferuar: perëndim / Pyetje: __"
  },
  fishing: {
    en: "Hello Dhermi Boat, I'd like to ask about the morning fishing tour. Tour: Morning Fishing Tour / Date: __ / Adults: __ / Children: __ / Preferred time: 5 AM to 8 AM / Questions: __",
    fr: "Bonjour Dhermi Boat, je souhaite vérifier la disponibilité pour la pêche du matin. Tour : pêche du matin / Date : __ / Adultes : __ / Enfants : __ / Horaire souhaité : 5 h à 8 h / Questions : __",
    sq: "Përshëndetje Dhermi Boat, dua të pyes për turin e peshkimit në mëngjes. Turi: peshkimi në mëngjes / Data: __ / Të rritur: __ / Fëmijë: __ / Ora e preferuar: 5:00 - 8:00 / Pyetje: __"
  }
} as const satisfies Record<string, Record<Locale, string>>;

export type WhatsappMessageKey = keyof typeof whatsappMessages;

export function whatsappHrefForKey(key: WhatsappMessageKey, locale: Locale = "en") {
  return whatsappUrl(whatsappMessages[key][locale]);
}
