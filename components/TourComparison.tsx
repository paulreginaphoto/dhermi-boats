import Image from "next/image";
import { ArrowRight, CheckCircle2, Clock3, Euro, ListChecks, MessageCircle, Users } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { LocalizedText } from "@/components/LocalizedText";
import { primaryWhatsappHref, tourComparison, tours } from "@/data/content";
import { conversionAttrs } from "@/lib/conversion";
import { whatsappHrefForKey, type WhatsappMessageKey } from "@/lib/whatsappMessages";
import { TourDetailsText } from "@/components/MicroCopy";
import { tourBookFallback, tourBookKey } from "@/lib/tourBookingCopy";
import { translations } from "@/lib/i18n";

export function TourComparison() {
  return (
    <section id="compare-tours" className="bg-pearl py-14 md:py-20">
      <div className="site-band">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-bronze">
              <LocalizedText id="comparison.label">{translations.en["comparison.label"] ?? ""}</LocalizedText>
            </p>
            <h2 className="mt-3 font-serif text-4xl font-medium leading-tight text-ink md:text-5xl">
              <LocalizedText id="comparison.title">{translations.en["comparison.title"] ?? ""}</LocalizedText>
            </h2>
          </div>
          <ButtonLink href={primaryWhatsappHref} icon={MessageCircle} variant="primary" whatsappKey="default" analyticsPlacement="comparison_help">
            <LocalizedText id="comparison.cta">{translations.en["comparison.cta"] ?? ""}</LocalizedText>
          </ButtonLink>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {tourComparison.map((item, index) => {
            const tour = tours.find((tourItem) => tourItem.id === item.tourId);

            if (!tour) return null;

            return (
              <article
                key={item.tourId}
                className="group flex min-h-[18rem] flex-col overflow-hidden rounded-lg border border-ink/10 bg-limestone/80 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-soft"
                data-tour-card={tour.id}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-sand">
                  <Image
                    src={tour.cardImage ?? tour.image}
                    alt={tour.imageAlt ?? `${tour.shortTitle} on the Albanian Riviera`}
                    fill
                    loading="lazy"
                    fetchPriority="low"
                    decoding="async"
                    quality={50}
                    sizes="(min-width: 1280px) 20vw, (min-width: 768px) 50vw, 92vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/62 via-transparent to-transparent" />
                  <p className="absolute bottom-3 left-3 max-w-[calc(100%-1.5rem)] rounded-md bg-pearl px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-ink shadow-sm">
                    <LocalizedText id={`comparison.${index}.angle`}>{item.angle}</LocalizedText>
                  </p>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-serif text-2xl font-medium leading-tight text-ink">
                    <LocalizedText id={`tour.${tour.id}.shortTitle`}>{tour.shortTitle}</LocalizedText>
                  </h3>
                  <dl className="mt-5 grid gap-2 text-sm font-semibold text-ink-soft">
                    <div className="flex items-center gap-2 rounded-md bg-pearl/70 p-2.5">
                      <Clock3 className="h-4 w-4 shrink-0 text-turquoise" aria-hidden strokeWidth={1.75} />
                      <dt className="sr-only">
                        <LocalizedText id="tour.durationLabel">{translations.en["tour.durationLabel"] ?? ""}</LocalizedText>
                      </dt>
                      <dd className="leading-5">
                        <LocalizedText id={`tour.${tour.id}.duration`}>{tour.duration}</LocalizedText>
                      </dd>
                    </div>
                    <div className="flex items-center gap-2 rounded-md bg-pearl/70 p-2.5">
                      <Euro className="h-4 w-4 shrink-0 text-turquoise" aria-hidden strokeWidth={1.75} />
                      <dt className="sr-only">
                        <LocalizedText id="tour.priceLabel">{translations.en["tour.priceLabel"] ?? ""}</LocalizedText>
                      </dt>
                      <dd className="leading-5">
                        <LocalizedText id={`tour.${tour.id}.price`}>{tour.price}</LocalizedText>
                      </dd>
                    </div>
                    <div className="flex items-center gap-2 rounded-md bg-pearl/70 p-2.5">
                      <Users className="h-4 w-4 shrink-0 text-turquoise" aria-hidden strokeWidth={1.75} />
                      <dt className="sr-only">
                        <LocalizedText id="tour.capacityLabel">{translations.en["tour.capacityLabel"] ?? ""}</LocalizedText>
                      </dt>
                      <dd className="leading-5">
                        <LocalizedText id={`tour.${tour.id}.capacity`}>{tour.capacity}</LocalizedText>
                      </dd>
                    </div>
                  </dl>
                  <div className="mt-4 rounded-md bg-pearl/70 p-3">
                    <p className="sr-only">
                      <LocalizedText id="comparison.audience">{translations.en["comparison.audience"] ?? ""}</LocalizedText>
                    </p>
                    <p className="text-sm font-semibold leading-6 text-ink">
                      <LocalizedText id={`tour.${tour.id}.bestFor`}>{tour.bestFor}</LocalizedText>
                    </p>
                  </div>
                  <div className="mt-4">
                    <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-bronze">
                      <ListChecks className="h-4 w-4 text-turquoise" aria-hidden strokeWidth={1.75} />
                      <LocalizedText id="comparison.stops">{translations.en["comparison.stops"] ?? ""}</LocalizedText>
                    </p>
                    <ul className="mt-2 grid gap-1.5 text-sm leading-6 text-ink-soft">
                      {tour.cardHighlights.slice(0, 3).map((stop, stopIndex) => (
                        <li key={stop} className="flex gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-turquoise" aria-hidden strokeWidth={1.75} />
                          <span>
                            <LocalizedText id={`tour.${tour.id}.cardHighlight.${stopIndex}`}>{stop}</LocalizedText>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-auto grid gap-2 pt-5">
                    <p className="sr-only">
                      <LocalizedText id="comparison.ctaLabel">{translations.en["comparison.ctaLabel"] ?? ""}</LocalizedText>
                    </p>
                    <a
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-ink px-3 text-sm font-semibold text-pearl transition hover:bg-navy"
                      data-tour-id={tour.id}
                      data-whatsapp-key={tour.id}
                      href={whatsappHrefForKey(tour.id as WhatsappMessageKey)}
                      {...conversionAttrs({ tourId: tour.id, placement: "comparison_card" })}
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden strokeWidth={1.75} />
                      <LocalizedText id={tourBookKey(tour.id)}>{tourBookFallback(tour.id)}</LocalizedText>
                    </a>
                    <a className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-ink/15 px-3 text-sm font-semibold text-ink transition hover:border-ink/35 hover:bg-white" data-analytics-event="tour_card_click" data-tour-id={tour.id} href={tour.href}>
                      <TourDetailsText />
                      <ArrowRight className="h-4 w-4" aria-hidden strokeWidth={1.75} />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
