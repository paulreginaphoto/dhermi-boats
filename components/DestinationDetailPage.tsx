import { Compass, MessageCircle } from "lucide-react";
import { BookingCTA } from "@/components/BookingCTA";
import { ButtonLink } from "@/components/ButtonLink";
import { GalleryGrid } from "@/components/GalleryGrid";
import { PageHero } from "@/components/PageHero";
import { tours, type Destination } from "@/data/content";
import { primaryWhatsappHref } from "@/data/content";

export function DestinationDetailPage({ destination }: { destination: Destination }) {
  const relatedTours = tours.filter((tour) =>
    destination.id === "gjipe"
      ? tour.id === "gjipe"
      : destination.id === "grama" || destination.id === "blue-cave"
        ? tour.id === "grama" || tour.id === "private"
        : tour.id === "private"
  );

  return (
    <>
      <PageHero title={`${destination.title} boat tour`} image={destination.image} label={destination.eyebrow}>
        <p>{destination.summary}</p>
        <div className="mt-8">
          <ButtonLink href={primaryWhatsappHref} icon={MessageCircle} variant="dark">
            Ask availability
          </ButtonLink>
        </div>
      </PageHero>

      <section className="bg-pearl py-16 md:py-24">
        <div className="site-band grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Compass className="h-10 w-10 text-turquoise" aria-hidden />
            <h2 className="mt-5 font-serif text-4xl font-medium leading-tight text-ink md:text-5xl">
              Why this stop works by boat
            </h2>
            <p className="mt-5 text-base leading-8 text-ink-soft">
              The Dhërmi coast is best understood from the water: limestone walls, hidden coves,
              sea caves and beaches that feel completely different from the road. The route is
              confirmed around the day&apos;s weather so you get the most comfortable version of the trip.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {destination.highlights.map((item) => (
              <div key={item} className="rounded-md border border-ink/10 bg-limestone p-5">
                <p className="text-base font-semibold text-ink">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-limestone py-16 md:py-24">
        <div className="site-band">
          <GalleryGrid limit={6} />
        </div>
      </section>

      <section className="bg-pearl py-16 md:py-24">
        <div className="site-band">
          <h2 className="font-serif text-4xl font-medium text-ink">Best tours for {destination.title}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {relatedTours.map((tour) => (
              <a
                key={tour.id}
                className="rounded-md border border-ink/10 bg-limestone p-6 transition hover:-translate-y-1 hover:shadow-soft"
                href={tour.href}
              >
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-bronze">{tour.price}</p>
                <h3 className="mt-2 font-serif text-3xl font-medium text-ink">{tour.shortTitle}</h3>
                <p className="mt-3 text-sm leading-7 text-ink-soft">{tour.subtitle}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <BookingCTA title={`Plan a ${destination.title} boat trip`} />
    </>
  );
}

