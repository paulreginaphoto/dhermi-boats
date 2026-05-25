import Image from "next/image";
import { ArrowRight, Clock3, MessageCircle, Sparkles, Users } from "lucide-react";
import type { Tour } from "@/data/content";
import { whatsappUrl } from "@/lib/site";
import { tourBookFallback, tourBookKey } from "@/lib/tourBookingCopy";
import { LocalizedText } from "@/components/LocalizedText";
import { IconFrame, iconStrokeWidth } from "@/components/OutlineIcon";

export function TourCard({ tour, imagePriority = false }: { tour: Tour; imagePriority?: boolean }) {
  const translationBase = `tour.${tour.id}`;
  const bookKey = tourBookKey(tour.id);
  const bookFallback = tourBookFallback(tour.id);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-ink/8 bg-pearl/92 shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-soft">
      <a className="block" href={tour.href} aria-label={`View ${tour.shortTitle}`}>
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
          <p className="absolute left-4 top-4 max-w-[calc(100%-2rem)] rounded-full bg-pearl px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-ink shadow-sm">
            <LocalizedText id={`${translationBase}.price`}>{tour.price}</LocalizedText>
          </p>
        </div>
      </a>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-turquoise-soft px-3 py-1.5 text-xs font-bold text-ink">
              <Sparkles className="h-3.5 w-3.5 text-turquoise" aria-hidden strokeWidth={iconStrokeWidth} />
              <LocalizedText id={`${translationBase}.bestFor`}>{tour.bestFor}</LocalizedText>
            </p>
            <h3 className="mt-3 font-serif text-2xl font-medium leading-tight text-ink">
              <LocalizedText id={`${translationBase}.shortTitle`}>{tour.shortTitle}</LocalizedText>
            </h3>
          </div>
          <a
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-ink/10 text-ink transition group-hover:border-turquoise group-hover:text-turquoise"
            href={tour.href}
            aria-label={`See route and price for ${tour.shortTitle}`}
          >
            <ArrowRight className="h-4 w-4" strokeWidth={iconStrokeWidth} />
          </a>
        </div>

        {tour.subtitle ? (
          <p className="mt-4 text-sm leading-7 text-ink-soft">
            <LocalizedText id={`${translationBase}.subtitle`}>{tour.subtitle}</LocalizedText>
          </p>
        ) : null}

        <div className="mt-5 grid gap-2 text-sm font-semibold text-ink">
          {tour.duration ? (
            <p className="flex items-center gap-2">
              <IconFrame icon={Clock3} variant="soft" size="sm" />
              <LocalizedText id={`${translationBase}.durationDisplay`}>Duration • {tour.duration}</LocalizedText>
            </p>
          ) : null}
          {tour.capacity ? (
            <p className="flex items-center gap-2">
              <IconFrame icon={Users} variant="soft" size="sm" />
              <LocalizedText id={`${translationBase}.capacity`}>{tour.capacity}</LocalizedText>
            </p>
          ) : null}
        </div>

        <ul className="mt-5 grid flex-1 gap-2 text-sm leading-6 text-ink-soft">
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
            data-analytics-event="tour_card_book_click"
            data-tour-id={tour.id}
            data-whatsapp-key={tour.id}
            href={whatsappUrl(tour.whatsappText)}
            rel="noreferrer"
            target="_blank"
          >
            <MessageCircle className="h-4 w-4" aria-hidden strokeWidth={iconStrokeWidth} />
            <LocalizedText id={bookKey}>{bookFallback}</LocalizedText>
          </a>
          <a
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-md border border-ink/15 px-4 text-sm font-semibold text-ink transition hover:border-ink/35 hover:bg-white active:translate-y-px"
            href={tour.href}
          >
            <LocalizedText id="tour.details">See route and price</LocalizedText>
          </a>
        </div>
      </div>
    </article>
  );
}
