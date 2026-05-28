import Image from "next/image";
import { ArrowRight, Clock3, Euro, ListChecks, MessageCircle, Users } from "lucide-react";
import type { Tour } from "@/data/content";
import { conversionAttrs } from "@/lib/conversion";
import { translations } from "@/lib/i18n";
import { whatsappHrefForKey, type WhatsappMessageKey } from "@/lib/whatsappMessages";
import { tourBookFallback, tourBookKey } from "@/lib/tourBookingCopy";
import { LocalizedText } from "@/components/LocalizedText";
import { TourDetailsText } from "@/components/MicroCopy";
import { IconFrame, iconStrokeWidth } from "@/components/OutlineIcon";

const tourLabelKeyById: Partial<Record<string, string>> = {
  gjipe: "tour.label.bestValue",
  grama: "tour.label.mostComplete",
  private: "tour.label.privateOption"
};

export function TourCard({ tour, imagePriority = false }: { tour: Tour; imagePriority?: boolean }) {
  const enText = (key: string) => translations.en[key] ?? "";
  const translationBase = `tour.${tour.id}`;
  const bookKey = tourBookKey(tour.id);
  const bookFallback = tourBookFallback(tour.id);
  const tourDetailsFallback = enText("tour.details");
  const tourLabelKey = tourLabelKeyById[tour.id];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-ink/8 bg-pearl/92 shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-soft" data-tour-card={tour.id}>
      <a className="block" data-analytics-event="tour_card_click" data-tour-id={tour.id} href={tour.href}>
        <div className="relative aspect-[4/3] overflow-hidden bg-sand">
          <Image
            src={tour.cardImage ?? tour.image}
            alt={tour.imageAlt ?? `${tour.shortTitle} on the Albanian Riviera`}
            fill
            loading={imagePriority ? "eager" : "lazy"}
            fetchPriority={imagePriority ? "high" : "low"}
            decoding="async"
            quality={52}
            sizes="(min-width: 1280px) 31vw, (min-width: 768px) 46vw, 92vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/55 via-transparent to-transparent" />
          {tourLabelKey ? (
            <p className="absolute left-4 top-4 max-w-[calc(100%-2rem)] rounded-md bg-pearl px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-ink shadow-sm">
              <LocalizedText id={tourLabelKey}>{enText(tourLabelKey)}</LocalizedText>
            </p>
          ) : null}
        </div>
      </a>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="font-serif text-2xl font-medium leading-tight text-ink">
              <LocalizedText id={`${translationBase}.shortTitle`}>{tour.shortTitle}</LocalizedText>
            </h3>
            <p className="mt-2 text-sm font-semibold leading-6 text-turquoise">
              <LocalizedText id={`${translationBase}.bestFor`}>{tour.bestFor}</LocalizedText>
            </p>
          </div>
            <a
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-ink/10 text-ink transition group-hover:border-turquoise group-hover:text-turquoise"
            data-analytics-event="tour_card_click"
            data-tour-id={tour.id}
            href={tour.href}
            aria-label={`${tourDetailsFallback}: ${tour.shortTitle}`}
          >
            <ArrowRight className="h-4 w-4" strokeWidth={iconStrokeWidth} />
          </a>
        </div>

        {tour.subtitle ? (
          <p className="mt-4 text-sm leading-7 text-ink-soft">
            <LocalizedText id={`${translationBase}.subtitle`}>{tour.subtitle}</LocalizedText>
          </p>
        ) : null}

        <div className="mt-5 grid gap-2 text-sm font-semibold text-ink sm:grid-cols-2">
          {tour.duration ? (
            <div className="flex items-center gap-2 rounded-md bg-limestone/70 p-3">
              <IconFrame icon={Clock3} variant="soft" size="sm" />
              <div>
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-bronze">
                  <LocalizedText id="tour.durationLabel">{enText("tour.durationLabel")}</LocalizedText>
                </p>
                <p className="mt-0.5">
                  <LocalizedText id={`${translationBase}.duration`}>{tour.duration}</LocalizedText>
                </p>
              </div>
            </div>
          ) : null}
          {tour.capacity ? (
            <div className="flex items-center gap-2 rounded-md bg-limestone/70 p-3">
              <IconFrame icon={Users} variant="soft" size="sm" />
              <div>
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-bronze">
                  <LocalizedText id="tour.capacityLabel">{enText("tour.capacityLabel")}</LocalizedText>
                </p>
                <p className="mt-0.5">
                  <LocalizedText id={`${translationBase}.capacity`}>{tour.capacity}</LocalizedText>
                </p>
              </div>
            </div>
          ) : null}
          <div className="flex items-center gap-2 rounded-md bg-limestone/70 p-3 sm:col-span-2">
            <IconFrame icon={Euro} variant="soft" size="sm" />
            <div>
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-bronze">
                <LocalizedText id="tour.priceLabel">{enText("tour.priceLabel")}</LocalizedText>
              </p>
              <p className="mt-0.5">
                <LocalizedText id={`${translationBase}.price`}>{tour.price}</LocalizedText>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-bronze">
          <ListChecks className="h-4 w-4 text-turquoise" aria-hidden strokeWidth={iconStrokeWidth} />
          <LocalizedText id="tour.mainStopsLabel">{enText("tour.mainStopsLabel")}</LocalizedText>
        </div>
        <ul className="mt-3 grid flex-1 gap-2 text-sm leading-6 text-ink-soft">
          {tour.cardHighlights.slice(0, 5).map((item, index) => (
            <li key={item} className="flex gap-2">
              <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-bronze" />
              <span>
                <LocalizedText id={`${translationBase}.cardHighlight.${index}`}>{item}</LocalizedText>
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-md bg-ink px-4 text-sm font-semibold text-pearl transition hover:bg-navy active:translate-y-px"
            data-tour-id={tour.id}
            data-whatsapp-key={tour.id}
            href={whatsappHrefForKey(tour.id as WhatsappMessageKey)}
            rel="noreferrer"
            target="_blank"
            {...conversionAttrs({ tourId: tour.id, placement: "tour_card" })}
          >
            <MessageCircle className="h-4 w-4" aria-hidden strokeWidth={iconStrokeWidth} />
            <LocalizedText id={bookKey}>{bookFallback}</LocalizedText>
          </a>
          <a
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-md border border-ink/15 px-4 text-sm font-semibold text-ink transition hover:border-ink/35 hover:bg-white active:translate-y-px"
            data-analytics-event="tour_card_click"
            data-tour-id={tour.id}
            href={tour.href}
          >
            <TourDetailsText />
          </a>
        </div>
      </div>
    </article>
  );
}
