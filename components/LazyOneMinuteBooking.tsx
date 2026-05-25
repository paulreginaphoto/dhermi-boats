import { LocalizedText } from "@/components/LocalizedText";
import { HeroWhatsappText } from "@/components/MicroCopy";
import { conversionAttrs } from "@/lib/conversion";
import { defaultBookingMessage, whatsappUrl } from "@/lib/site";
import { translations } from "@/lib/i18n";

const fallbackWhatsappHref = whatsappUrl(defaultBookingMessage);

export function LazyOneMinuteBooking() {
  return (
    <section id="book" className="overflow-hidden bg-ink text-pearl">
      <div className="site-band grid gap-6 py-14 md:py-20 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <div className="max-w-xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-sand">
            <LocalizedText id="quick.label">{translations.en["quick.label"] ?? ""}</LocalizedText>
          </p>
          <h2 className="mt-4 font-serif text-4xl font-medium leading-[1.02] md:text-6xl">
            <LocalizedText id="quick.title">{translations.en["quick.title"] ?? ""}</LocalizedText>
          </h2>
          <p className="mt-5 text-base leading-8 text-pearl/88 md:text-lg">
            <LocalizedText id="quick.text">{translations.en["quick.text"] ?? ""}</LocalizedText>
          </p>
        </div>
        <a
          className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-pearl px-5 text-sm font-semibold text-ink shadow-soft transition hover:bg-white lg:w-auto"
          data-whatsapp-key="default"
          href={fallbackWhatsappHref}
          rel="noreferrer"
          target="_blank"
          {...conversionAttrs({ tourId: "default", placement: "quick_fallback" })}
        >
          <HeroWhatsappText />
        </a>
      </div>
    </section>
  );
}
