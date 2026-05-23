import type { Metadata } from "next";
import { BookingCTA } from "@/components/BookingCTA";
import { DestinationCard } from "@/components/DestinationCard";
import { GalleryGrid } from "@/components/GalleryGrid";
import { LocalizedText } from "@/components/LocalizedText";
import { PageHero } from "@/components/PageHero";
import { SeaRouteMap } from "@/components/SeaRouteMap";
import { SectionHeading } from "@/components/SectionHeading";
import { destinations, tours } from "@/data/content";
import { canonical, languageAlternates } from "@/lib/site";

export const metadata: Metadata = {
  title: "Boat Tour Destinations",
  description:
    "Explore Dhermi Boat destinations: Gjipe, Grama Bay, Blue Cave and the Karaburun coastline on the Albanian Riviera.",
  alternates: { canonical: canonical("/destinations/"), languages: languageAlternates("/destinations/") }
};

export default function DestinationsPage() {
  return (
    <>
      <PageHero
        title={<LocalizedText id="page.destinations.title">Destinations</LocalizedText>}
        image={tours[1].image}
        imageAlt={tours[1].imageAlt}
        label={<LocalizedText id="section.destinations.label">Destinations</LocalizedText>}
      />
      <section className="destination-section py-8 text-pearl md:py-16">
        <div className="site-band grid gap-4 md:gap-5 lg:grid-cols-3">
          {destinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </section>
      <section id="routes" className="scroll-mt-24 bg-limestone py-16 md:scroll-mt-28 md:py-24">
        <div className="site-band">
          <SectionHeading
            label={<LocalizedText id="map.label">Sea route</LocalizedText>}
            title={<LocalizedText id="map.overviewTitle">Routes from Dhërmi</LocalizedText>}
          />
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
            label={<LocalizedText id="section.social.label">Our latest photos</LocalizedText>}
            title={<LocalizedText id="section.social.title">Our latest photos</LocalizedText>}
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
