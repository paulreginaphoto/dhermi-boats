import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, MessageCircle, Users } from "lucide-react";
import type { Tour } from "@/data/content";
import { whatsappUrl } from "@/lib/site";
import { LocalizedText } from "@/components/LocalizedText";

export function TourCard({ tour, priority = false }: { tour: Tour; priority?: boolean }) {
  return (
    <article className="group overflow-hidden rounded-md border border-ink/10 bg-pearl shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      <Link className="block" href={tour.href} aria-label={`View ${tour.shortTitle}`}>
        <div className="relative aspect-[4/3] overflow-hidden bg-sand">
          <Image
            src={tour.image}
            alt={`${tour.shortTitle} on the Albanian Riviera`}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="p-5 md:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-bronze">{tour.price}</p>
            <h3 className="mt-2 font-serif text-2xl font-medium leading-tight text-ink">{tour.shortTitle}</h3>
          </div>
          <Link
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/10 text-ink transition group-hover:border-turquoise group-hover:text-turquoise"
            href={tour.href}
            aria-label={`View details for ${tour.shortTitle}`}
          >
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <p className="mt-4 min-h-20 text-sm leading-7 text-ink-soft">{tour.subtitle}</p>

        <div className="mt-5 grid gap-2 text-sm font-semibold text-ink">
          <p className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-turquoise" aria-hidden />
            {tour.duration}
          </p>
          <p className="flex items-center gap-2">
            <Users className="h-4 w-4 text-turquoise" aria-hidden />
            {tour.capacity}
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-md bg-ink px-4 text-sm font-semibold text-pearl transition hover:bg-navy"
            href={whatsappUrl(tour.whatsappText)}
            rel="noreferrer"
            target="_blank"
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            <LocalizedText id="tour.book">Book</LocalizedText>
          </a>
          <Link
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-md border border-ink/15 px-4 text-sm font-semibold text-ink transition hover:border-ink/35 hover:bg-white"
            href={tour.href}
          >
            <LocalizedText id="tour.details">Details</LocalizedText>
          </Link>
        </div>
      </div>
    </article>
  );
}
