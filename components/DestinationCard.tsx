import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Destination } from "@/data/content";
import { LocalizedText } from "@/components/LocalizedText";
import { TourDetailsText } from "@/components/MicroCopy";

export function DestinationCard({
  destination,
  imagePriority = false
}: {
  destination: Destination;
  imagePriority?: boolean;
}) {
  const translationBase = `destination.${destination.id}`;

  return (
    <a
      className="group block overflow-hidden rounded-lg border border-white/14 bg-white/7 text-pearl shadow-image transition duration-300 hover:-translate-y-1 hover:border-white/28"
      href={destination.href}
    >
      <article className="relative min-h-[320px] md:min-h-[420px]">
        <Image
          src={destination.cardImage ?? destination.image}
          alt={destination.imageAlt ?? `${destination.title} boat tour destination in Albania`}
          fill
          loading={imagePriority ? "eager" : "lazy"}
          fetchPriority={imagePriority ? "high" : "low"}
          decoding="async"
          quality={50}
          sizes="(min-width: 1024px) 31vw, 92vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/92 via-navy/48 to-navy/10" />
        <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
          <div className="photo-panel-overlay rounded-lg p-4 md:p-5">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-sand">
              <LocalizedText id={`${translationBase}.eyebrow`}>{destination.eyebrow}</LocalizedText>
            </p>
            <h3 className="mt-3 font-serif text-3xl font-medium text-pearl photo-title">
              <LocalizedText id={`${translationBase}.title`}>{destination.title}</LocalizedText>
            </h3>
            <p className="mt-3 text-sm leading-7 text-pearl/94">
              <LocalizedText id={`${translationBase}.summary`}>{destination.summary}</LocalizedText>
            </p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold">
              <TourDetailsText />
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
            </span>
          </div>
        </div>
      </article>
    </a>
  );
}

