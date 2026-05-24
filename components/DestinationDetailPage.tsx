import { MessageCircle } from "lucide-react";
import { BookingCTA } from "@/components/BookingCTA";
import { ButtonLink } from "@/components/ButtonLink";
import { GalleryGrid } from "@/components/GalleryGrid";
import { LocalizedText } from "@/components/LocalizedText";
import { PageHero } from "@/components/PageHero";
import { SeaRouteMap } from "@/components/SeaRouteMap";
import { tours, type Destination } from "@/data/content";
import { primaryWhatsappHref } from "@/data/content";
import { whatsappUrl } from "@/lib/site";

export function DestinationDetailPage({ destination }: { destination: Destination }) {
  const translationBase = `destination.${destination.id}`;
  const heroImageAlt = destination.imageAlt ?? `${destination.title} on the Albanian Riviera`;
  const relatedTours = tours.filter((tour) =>
    destination.id === "gjipe"
      ? tour.id === "gjipe"
      : destination.id === "grama" || destination.id === "blue-cave"
        ? tour.id === "grama" || tour.id === "private"
        : tour.id === "private"
  );

  return (
    <>
      <PageHero
        title={<LocalizedText id={`${translationBase}.eyebrow`}>{destination.eyebrow}</LocalizedText>}
        image={destination.image}
        imageAlt={heroImageAlt}
        label={<LocalizedText id={`${translationBase}.title`}>{destination.title}</LocalizedText>}
      >
        <p>
          <LocalizedText id={`${translationBase}.summary`}>{destination.summary}</LocalizedText>
        </p>
        <div className="mt-8">
          <ButtonLink href={primaryWhatsappHref} icon={MessageCircle} variant="dark" whatsappKey="default" analyticsEvent="whatsapp_click">
            <LocalizedText id="cta.askAvailability">Ask availability</LocalizedText>
          </ButtonLink>
        </div>
      </PageHero>

      <section className="bg-pearl py-16 md:py-24">
        <div className="site-band grid gap-8 lg:grid-cols-[0.7fr_1.1fr]">
          <div>
            <h2 className="font-serif text-4xl font-medium leading-tight text-ink md:text-5xl">
              <LocalizedText id="tour.detailsLabel">Route facts</LocalizedText>
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {destination.highlights.map((item, index) => (
              <div key={item} className="rounded-md border border-ink/10 bg-limestone p-5">
                <p className="text-base font-semibold text-ink">
                  <LocalizedText id={`${translationBase}.highlight.${index}`}>{item}</LocalizedText>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="route" className="scroll-mt-24 bg-navy py-16 text-pearl md:scroll-mt-28 md:py-24">
        <div className="site-band">
          <div className="mb-8 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-sand">
              <LocalizedText id="map.label">Sea route</LocalizedText>
            </p>
            <h2 className="mt-3 font-serif text-4xl font-medium leading-tight md:text-5xl">
              <LocalizedText id="map.title">Route from Dhërmi by boat</LocalizedText>
            </h2>
          </div>
          <SeaRouteMap destination={destination} />
        </div>
      </section>

      <section className="bg-limestone py-16 md:py-24">
        <div className="site-band">
          <GalleryGrid limit={6} />
        </div>
      </section>

      <section className="bg-pearl py-16 md:py-24">
        <div className="site-band">
          <h2 className="font-serif text-4xl font-medium text-ink">
            <LocalizedText id="section.tours.title">Choose your tour</LocalizedText>
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {relatedTours.map((tour) => (
              <article
                key={tour.id}
                className="flex h-full flex-col rounded-md border border-ink/10 bg-limestone p-6 transition hover:-translate-y-1 hover:shadow-soft"
              >
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-bronze">
                  <LocalizedText id={`tour.${tour.id}.price`}>{tour.price}</LocalizedText>
                </p>
                <h3 className="mt-2 font-serif text-3xl font-medium text-ink">
                  <LocalizedText id={`tour.${tour.id}.shortTitle`}>{tour.shortTitle}</LocalizedText>
                </h3>
                {tour.subtitle ? (
                  <p className="mt-3 text-sm leading-7 text-ink-soft">
                    <LocalizedText id={`tour.${tour.id}.subtitle`}>{tour.subtitle}</LocalizedText>
                  </p>
                ) : null}
                <div className="mt-6 flex flex-1 flex-col justify-end gap-3 sm:flex-row">
                  <ButtonLink href={whatsappUrl(tour.whatsappText)} icon={MessageCircle} className="flex-1" whatsappKey={tour.id} analyticsEvent="whatsapp_click">
                    <LocalizedText id={tour.id === "private" ? "tour.private.book" : "tour.book"}>Book this tour</LocalizedText>
                  </ButtonLink>
                  <ButtonLink href={tour.href} variant="secondary" className="flex-1">
                    <LocalizedText id="tour.details">View details</LocalizedText>
                  </ButtonLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <BookingCTA title={<LocalizedText id="booking.title">Book your boat tour in Dhërmi</LocalizedText>} />
    </>
  );
}
