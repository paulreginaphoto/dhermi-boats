import Image from "next/image";
import { ArrowRight, Clock3, MessageCircle, Users } from "lucide-react";
import type { Tour } from "@/data/content";
import { whatsappUrl } from "@/lib/site";
import { LocalizedText } from "@/components/LocalizedText";
import { IconFrame, iconStrokeWidth } from "@/components/OutlineIcon";

export function TourCard({ tour }: { tour: Tour }) {
  const translationBase = `tour.${tour.id}`;
  const bookKey =
    tour.id === "private" ? "tour.private.book" : tour.id === "sunset" ? "tour.sunset.book" : tour.id === "fishing" ? "tour.fishing.book" : "tour.book";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-ink/8 bg-pearl/92 shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-soft">
      <a className="block" href={tour.href} aria-label={`View ${tour.shortTitle}`}>
        <div className="relative aspect-[4/3] overflow-hidden bg-sand">
          <Image
            src={tour.image}
            alt={tour.imageAlt ?? `${tour.shortTitle} on the Albanian Riviera`}
            fill
            loading="lazy"
            fetchPriority="low"
            decoding="async"
            quality={58}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 from-navy/30 to-transparent bg-gradient-to-t" />
        </div>
      </a>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-bronze">
              <LocalizedText id={`${translationBase}.price`}>{tour.price}</LocalizedText>
            </p>
            <h3 className="mt-2 font-serif text-2xl font-medium leading-tight text-ink">
              <LocalizedText id={`${translationBase}.shortTitle`}>{tour.shortTitle}</LocalizedText>
            </h3>
          </div>
          <a
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-ink/10 text-ink transition group-hover:border-turquoise group-hover:text-turquoise"
            href={tour.href}
            aria-label={`View details for ${tour.shortTitle}`}
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
              (<LocalizedText id={`${translationBase}.capacity`}>{tour.capacity}</LocalizedText>)
            </p>
          ) : null}
        </div>

        <ul className="mt-5 grid flex-1 gap-2 text-sm leading-6 text-ink-soft">
          {tour.included.map((item, index) => (
            <li key={item} className="flex gap-2">
              <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-bronze" />
              <span>
                <LocalizedText id={`${translationBase}.included.${index}`}>{item}</LocalizedText>
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-md bg-ink px-4 text-sm font-semibold text-pearl transition hover:bg-navy active:translate-y-px"
            data-whatsapp-key={tour.id}
            href={whatsappUrl(tour.whatsappText)}
            rel="noreferrer"
            target="_blank"
          >
            <MessageCircle className="h-4 w-4" aria-hidden strokeWidth={iconStrokeWidth} />
            <LocalizedText id={bookKey}>Book</LocalizedText>
          </a>
          <a
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-md border border-ink/15 px-4 text-sm font-semibold text-ink transition hover:border-ink/35 hover:bg-white active:translate-y-px"
            href={tour.href}
          >
            <LocalizedText id="tour.details">Details</LocalizedText>
          </a>
        </div>
      </div>
    </article>
  );
}

