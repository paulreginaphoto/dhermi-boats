import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Destination } from "@/data/content";
import { LocalizedText } from "@/components/LocalizedText";

export function DestinationCard({ destination }: { destination: Destination }) {
  const translationBase = `destination.${destination.id}`;

  return (
    <Link
      className="group block overflow-hidden rounded-md border border-white/12 bg-white/6 text-pearl shadow-image"
      href={destination.href}
    >
      <article className="relative min-h-[420px]">
        <Image
          src={destination.image}
          alt={`${destination.title} boat tour destination in Albania`}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/45 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-sand">
            <LocalizedText id={`${translationBase}.eyebrow`}>{destination.eyebrow}</LocalizedText>
          </p>
          <h3 className="mt-3 font-serif text-3xl font-medium">
            <LocalizedText id={`${translationBase}.title`}>{destination.title}</LocalizedText>
          </h3>
          <p className="mt-3 text-sm leading-7 text-pearl/78">
            <LocalizedText id={`${translationBase}.summary`}>{destination.summary}</LocalizedText>
          </p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold">
            <LocalizedText id="tour.details">VIEW DETAILS</LocalizedText>
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </span>
        </div>
      </article>
    </Link>
  );
}
