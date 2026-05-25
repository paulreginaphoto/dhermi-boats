import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import { BookingCTA } from "@/components/BookingCTA";
import { ButtonLink } from "@/components/ButtonLink";
import { LocalizedText } from "@/components/LocalizedText";
import { PageHero } from "@/components/PageHero";
import { TourCard } from "@/components/TourCard";
import { tours } from "@/data/content";
import { canonical } from "@/lib/site";
import { whatsappHrefForKey } from "@/lib/whatsappMessages";

const groupTours = tours.filter((tour) => tour.type === "shared");

export const metadata: Metadata = {
  title: "Shared Dhermi Boat Tours",
  description:
    "Small-group Dhermi boat tours from Dhërmi to Gjipe, Grama Bay and Blue Cave, with clear prices and WhatsApp booking.",
  alternates: { canonical: canonical("/tours/") },
  robots: { index: false, follow: true }
};

export default function GroupToursPage() {
  return (
    <>
      <PageHero
        title={<LocalizedText id="page.group.label">Shared Dhermi boat tours</LocalizedText>}
        image={groupTours[0].image}
        imageAlt={groupTours[0].imageAlt}
        label={<LocalizedText id="section.tours.label">Tours from Dhërmi</LocalizedText>}
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/tours/" variant="dark">
            <LocalizedText id="cta.compareTours">Compare tours</LocalizedText>
          </ButtonLink>
          <ButtonLink href={whatsappHrefForKey("default")} icon={MessageCircle} variant="secondary" className="border-white/25 bg-white/10 text-white hover:bg-white/18" whatsappKey="default" analyticsPlacement="group_hero">
            <LocalizedText id="cta.heroWhatsapp">Check availability on WhatsApp</LocalizedText>
          </ButtonLink>
        </div>
      </PageHero>
      <section className="bg-pearl py-16 md:py-24">
        <div className="site-band grid gap-6 md:grid-cols-2">
          {groupTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} imagePriority />
          ))}
        </div>
      </section>
      <BookingCTA title={<LocalizedText id="booking.title">Book your boat tour in Dhërmi</LocalizedText>} />
    </>
  );
}
