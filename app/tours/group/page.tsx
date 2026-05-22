import type { Metadata } from "next";
import { BookingCTA } from "@/components/BookingCTA";
import { LocalizedText } from "@/components/LocalizedText";
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
      <PageHero
        title={<LocalizedText id="section.tours.title">Choose your tour</LocalizedText>}
        image={groupTours[0].image}
        label={<LocalizedText id="page.group.label">Shared tours</LocalizedText>}
      />
      <section className="bg-pearl py-16 md:py-24">
        <div className="site-band grid gap-6 md:grid-cols-2">
          {groupTours.map((tour, index) => (
            <TourCard key={tour.id} tour={tour} priority={index === 0} />
          ))}
        </div>
      </section>
      <BookingCTA title={<LocalizedText id="booking.title">Book your boat tour in Dhërmi</LocalizedText>} />
    </>
  );
}
