import type { Metadata } from "next";
import { BookingCTA } from "@/components/BookingCTA";
import { PageHero } from "@/components/PageHero";
import { TourCard } from "@/components/TourCard";
import { tours } from "@/data/content";
import { canonical } from "@/lib/site";

const groupTours = tours.filter((tour) => tour.type === "shared");

export const metadata: Metadata = {
  title: "Group and Shared Boat Tours",
  description:
    "Small-group shared boat tours from Dhërmi to Gjipe and Grama Bay, with clear prices and WhatsApp booking.",
  alternates: { canonical: canonical("/tours/group/") }
};

export default function GroupToursPage() {
  return (
    <>
      <PageHero title="Small-group boat tours" image={groupTours[0].image} label="Shared tours">
        <p>
          Shared tours are the easiest way to see Gjipe or Grama Bay with a local skipper, clear timing and simple per-person pricing.
        </p>
      </PageHero>
      <section className="bg-pearl py-16 md:py-24">
        <div className="site-band grid gap-6 md:grid-cols-2">
          {groupTours.map((tour, index) => (
            <TourCard key={tour.id} tour={tour} priority={index === 0} />
          ))}
        </div>
      </section>
      <BookingCTA title="Reserve seats on a shared tour" />
    </>
  );
}

