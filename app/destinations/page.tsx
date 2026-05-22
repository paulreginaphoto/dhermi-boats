import type { Metadata } from "next";
import { BookingCTA } from "@/components/BookingCTA";
import { DestinationCard } from "@/components/DestinationCard";
import { GalleryGrid } from "@/components/GalleryGrid";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { destinations, tours } from "@/data/content";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Boat Tour Destinations",
  description:
    "Explore Dhermi Boat destinations: Gjipe, Grama Bay, Blue Cave and the Karaburun coastline on the Albanian Riviera.",
  alternates: { canonical: canonical("/destinations/") }
};

export default function DestinationsPage() {
  return (
    <>
      <PageHero title="Destinations on the Albanian Riviera" image={tours[1].image} label="Destinations">
        <p>
          Caves, canyon beaches, turquoise bays and limestone walls. These are the stops that make the Dhërmi coastline worth seeing from the water.
        </p>
      </PageHero>
      <section className="bg-navy py-16 text-pearl md:py-24">
        <div className="site-band grid gap-5 lg:grid-cols-3">
          {destinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </section>
      <section className="bg-pearl py-16 md:py-24">
        <div className="site-band">
          <SectionHeading label="Gallery" title="Real views from the route." />
          <div className="mt-10">
            <GalleryGrid />
          </div>
        </div>
      </section>
      <BookingCTA title="Ask which destination fits your day" />
    </>
  );
}

