import type { Metadata } from "next";
import { BookingCTA } from "@/components/BookingCTA";
import { ButtonLink } from "@/components/ButtonLink";
import { DestinationCard } from "@/components/DestinationCard";
import { GalleryGrid } from "@/components/GalleryGrid";
import { LocalizedText } from "@/components/LocalizedText";
import { PageHero } from "@/components/PageHero";
import { SeaRouteMap } from "@/components/SeaRouteMap";
import { SectionHeading } from "@/components/SectionHeading";
import { destinations, tours } from "@/data/content";
import { canonical, languageAlternates } from "@/lib/site";

export const metadata: Metadata = {
  title: "Dhermi Boat Tour Destinations",
  description:
    "Explore Dhermi boat tour destinations from Dhërmi: Gjipe Beach, Grama Bay, Blue Cave and the Karaburun coastline on the Albanian Riviera.",
  alternates: { canonical: canonical("/destinations/"), languages: languageAlternates("/destinations/") }
};

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
      </PageHero>
      <section className="destination-section py-8 text-pearl md:py-16">
        <div className="site-band grid gap-4 md:gap-5 lg:grid-cols-3">
          {destinations.map((destination, index) => (
            <DestinationCard key={destination.id} destination={destination} imagePriority={index < 3} />
          ))}
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
