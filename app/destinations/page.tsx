import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, MessageCircle } from "lucide-react";
import { BookingCTA } from "@/components/BookingCTA";
import { ButtonLink } from "@/components/ButtonLink";
import { GalleryGrid } from "@/components/GalleryGrid";
import { LocalizedText } from "@/components/LocalizedText";
import { PageHero } from "@/components/PageHero";
import { SeaRouteMap } from "@/components/SeaRouteMap";
import { SectionHeading } from "@/components/SectionHeading";
import { destinations, tours } from "@/data/content";
import { canonical, languageAlternates, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Dhermi Boat Tour Destinations",
  description:
    "Choose the right Dhermi boat tour destination: Gjipe Beach, Grama Bay or Blue Cave, with routes, best fit, included tour and WhatsApp booking.",
  alternates: { canonical: canonical("/destinations/"), languages: languageAlternates("/destinations/") }
};

const destinationInsights = [
  {
    destinationId: "gjipe",
    tourId: "gjipe",
    oneLinerKey: "destinations.card.gjipe.oneLiner",
    oneLiner: "Caves, cliffs and a beach swim without spending the whole day at sea.",
    practicalKey: "destinations.card.gjipe.practical",
    practical: "Best when you want a shorter route with a 30-minute swimming stop.",
    bestForKey: "destinations.card.gjipe.bestFor",
    bestFor: "Best value / shorter route",
    ctaKey: "tour.gjipe.book",
    cta: "Book Gjipe Tour"
  },
  {
    destinationId: "grama",
    tourId: "grama",
    oneLinerKey: "destinations.card.grama.oneLiner",
    oneLiner: "The fuller Karaburun route with Grama Beach, Blue Cave and San Andrea Beach.",
    practicalKey: "destinations.card.grama.practical",
    practical: "Best when you want the longest shared route and more coastline.",
    bestForKey: "destinations.card.grama.bestFor",
    bestFor: "Most complete shared route",
    ctaKey: "tour.grama.book",
    cta: "Ask about Grama availability"
  },
  {
    destinationId: "blue-cave",
    tourId: "grama",
    oneLinerKey: "destinations.card.blue.oneLiner",
    oneLiner: "Bright cave water on the Grama Bay route, when the sea allows safe access.",
    practicalKey: "destinations.card.blue.practical",
    practical: "Usually paired with Grama Bay, with access adjusted to wind and waves.",
    bestForKey: "destinations.card.blue.bestFor",
    bestFor: "Turquoise cave water",
    ctaKey: "tour.grama.book",
    cta: "Ask about Grama availability"
  }
];

export default function DestinationsPage() {
  return (
    <>
      <PageHero
        title={<LocalizedText id="page.destinations.title">Dhermi boat tour destinations</LocalizedText>}
        image={tours[1].image}
        imageAlt={tours[1].imageAlt}
        label={<LocalizedText id="section.destinations.label">Route highlights</LocalizedText>}
      >
        <p>
          <LocalizedText id="destinations.hero.text">
            Choose between quick caves and Gjipe Beach, the longer Grama Bay route, or Blue Cave as part of the Grama tour.
          </LocalizedText>
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="#choose-destination" variant="dark">
            <LocalizedText id="destinations.choose.title">Which destination should I choose?</LocalizedText>
          </ButtonLink>
          <ButtonLink href="/tours/" icon={ArrowRight} variant="secondary" className="border-white/25 bg-white/10 text-white hover:bg-white/18">
            <LocalizedText id="cta.compareTours">Compare tours</LocalizedText>
          </ButtonLink>
        </div>
      </PageHero>
      <section className="destination-section py-8 text-pearl md:py-16" id="choose-destination">
        <div className="site-band grid gap-5 lg:grid-cols-3">
          {destinationInsights.map((insight, index) => {
            const destination = destinations.find((item) => item.id === insight.destinationId);
            const tour = tours.find((item) => item.id === insight.tourId);

            if (!destination || !tour) return null;
            const translationBase = `destination.${destination.id}`;

            return (
              <article key={destination.id} className="group flex h-full flex-col overflow-hidden rounded-lg border border-white/14 bg-pearl text-ink shadow-image transition duration-300 hover:-translate-y-1">
                <div className="relative aspect-[4/3] bg-sand">
                  <Image
                    src={destination.cardImage ?? destination.image}
                    alt={destination.imageAlt ?? `${destination.title} boat tour destination in Albania`}
                    fill
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : "low"}
                    decoding="async"
                    quality={52}
                    sizes="(min-width: 1024px) 31vw, 92vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute left-4 top-4 rounded-full bg-pearl px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-ink shadow-sm">
                    <LocalizedText id={insight.bestForKey}>{insight.bestFor}</LocalizedText>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-bronze">
                    <LocalizedText id={`${translationBase}.eyebrow`}>{destination.eyebrow}</LocalizedText>
                  </p>
                  <h2 className="mt-3 font-serif text-3xl font-medium text-ink">
                    <LocalizedText id={`${translationBase}.title`}>{destination.title}</LocalizedText>
                  </h2>
                  <p className="mt-3 text-base font-semibold leading-7 text-ink">
                    <LocalizedText id={insight.oneLinerKey}>{insight.oneLiner}</LocalizedText>
                  </p>
                  <p className="mt-3 text-sm leading-7 text-ink-soft">
                    <LocalizedText id={insight.practicalKey}>{insight.practical}</LocalizedText>
                  </p>
                  <dl className="mt-5 grid gap-2 rounded-md bg-limestone/75 p-4 text-sm">
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-[0.16em] text-bronze">
                        <LocalizedText id="destinations.card.includedTour">Included tour</LocalizedText>
                      </dt>
                      <dd className="mt-1 font-semibold text-ink">
                        <LocalizedText id={`tour.${tour.id}.shortTitle`}>{tour.shortTitle}</LocalizedText>
                      </dd>
                    </div>
                  </dl>
                  <div className="mt-auto flex flex-col gap-3 pt-6 sm:flex-row">
                    <ButtonLink href={whatsappUrl(tour.whatsappText)} icon={MessageCircle} className="flex-1" whatsappKey={tour.id} analyticsEvent="destination_whatsapp_click">
                      <LocalizedText id={insight.ctaKey}>{insight.cta}</LocalizedText>
                    </ButtonLink>
                    <ButtonLink href={destination.href} variant="secondary" className="flex-1">
                      <LocalizedText id="tour.details">See route and price</LocalizedText>
                    </ButtonLink>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <section className="bg-pearl py-16 md:py-24">
        <div className="site-band grid gap-10 lg:grid-cols-[0.76fr_1.24fr] lg:items-start">
          <SectionHeading
            label={<LocalizedText id="destinations.choose.label">Choose your destination</LocalizedText>}
            title={<LocalizedText id="destinations.choose.title">Which destination should I choose?</LocalizedText>}
          >
            <p>
              <LocalizedText id="destinations.choose.text">
                Start with the feeling you want: quick swim, longer coastline, or cave-blue water. The skipper confirms the safest route on WhatsApp.
              </LocalizedText>
            </p>
          </SectionHeading>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["destination.gjipe.title", "Gjipe", "destinations.choose.gjipe", "Short Dhërmi trip with caves, beach time and a 30-minute swim stop.", tours[0].href],
              ["destination.grama.title", "Grama Bay", "destinations.choose.grama", "The most complete shared route along Karaburun with Grama Beach.", tours[1].href],
              ["destination.blue-cave.title", "Blue Cave", "destinations.choose.blue", "Choose Blue Cave if you want bright cave water, usually as part of the Grama Bay route.", tours[1].href]
            ].map(([titleKey, title, textKey, text, href]) => (
              <article key={String(titleKey)} className="rounded-lg border border-ink/8 bg-limestone/70 p-6 shadow-sm">
                <h3 className="font-serif text-3xl font-medium text-ink">
                  <LocalizedText id={String(titleKey)}>{title}</LocalizedText>
                </h3>
                <p className="mt-3 text-sm leading-7 text-ink-soft">
                  <LocalizedText id={String(textKey)}>{text}</LocalizedText>
                </p>
                <ButtonLink href={String(href)} variant="secondary" className="mt-5">
                  <LocalizedText id="tour.details">See route and price</LocalizedText>
                </ButtonLink>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section id="routes" className="scroll-mt-24 bg-limestone py-16 md:scroll-mt-28 md:py-24">
        <div className="site-band">
          <SectionHeading
            label={<LocalizedText id="map.label">Sea route</LocalizedText>}
            title={<LocalizedText id="map.overviewTitle">Routes from Dhërmi</LocalizedText>}
          >
            <p>
              <LocalizedText id="map.safety.note">
                Approximate sea route. Exact stops depend on wind, waves and skipper safety decisions.
              </LocalizedText>
            </p>
          </SectionHeading>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {destinations.map((destination) => (
              <SeaRouteMap key={destination.id} destination={destination} compact />
            ))}
          </div>
        </div>
      </section>
      <section className="bg-pearl py-16 md:py-24">
        <div className="site-band">
          <SectionHeading
            label={<LocalizedText id="section.social.label">Recent sea photos</LocalizedText>}
            title={<LocalizedText id="section.social.title">Real moments from the boat</LocalizedText>}
          />
          <div className="mt-10">
            <GalleryGrid />
          </div>
        </div>
      </section>
      <BookingCTA title={<LocalizedText id="booking.title">Book your boat tour in Dhërmi</LocalizedText>} />
    </>
  );
}
