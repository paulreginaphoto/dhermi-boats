import type { Metadata } from "next";
import { ArrowRight, MessageCircle } from "lucide-react";
import { BookingCTA } from "@/components/BookingCTA";
import { ButtonLink } from "@/components/ButtonLink";
import { LocalizedText } from "@/components/LocalizedText";
import { TourDetailPage } from "@/components/TourDetailPage";
import { tours } from "@/data/content";
import { canonical, languageAlternates, whatsappUrl } from "@/lib/site";
import { tourBookFallback, tourBookKey } from "@/lib/tourBookingCopy";

const privateTour = tours.find((tour) => tour.id === "private")!;

export const metadata: Metadata = {
  title: "Private Boat Tour Albania",
  description:
    "Private boat tour from Dhërmi, Albania. Choose your route, swimming stops and timing for families, couples, friends or small celebrations.",
  alternates: { canonical: canonical("/tours/private/"), languages: languageAlternates("/tours/private/") }
};

export default function PrivateTourPage() {
  return (
    <>
      <TourDetailPage tour={privateTour} />
      <section id="sunset" className="bg-pearl py-16 md:py-24">
        <div className="site-band grid gap-6 md:grid-cols-2">
          {tours.filter((tour) => tour.id === "sunset" || tour.id === "fishing").map((tour) => (
            <article key={tour.id} className="flex h-full flex-col rounded-lg border border-ink/10 bg-limestone/70 p-6 shadow-sm md:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-bronze">
                <LocalizedText id={`tour.${tour.id}.price`}>{tour.price}</LocalizedText>
              </p>
              <h2 className="mt-3 font-serif text-4xl font-medium text-ink">
                <LocalizedText id={`tour.${tour.id}.title`}>{tour.title}</LocalizedText>
              </h2>
              <p className="mt-4 text-base leading-8 text-ink-soft">
                <LocalizedText id={`tour.${tour.id}.subtitle`}>{tour.subtitle}</LocalizedText>
              </p>
              <div className="mt-5 grid gap-2 text-sm font-semibold text-ink-soft sm:grid-cols-2">
                <p>
                  <LocalizedText id="tour.durationLabel">Duration</LocalizedText>
                  {" • "}
                  <LocalizedText id={`tour.${tour.id}.duration`}>{tour.duration}</LocalizedText>
                </p>
                <p>
                  <LocalizedText id="tour.capacityLabel">Capacity</LocalizedText>
                  {" • "}
                  <LocalizedText id={`tour.${tour.id}.capacity`}>{tour.capacity}</LocalizedText>
                </p>
              </div>
              <ul className="mt-6 grid flex-1 gap-2 text-sm font-semibold text-ink">
                {tour.cardHighlights.map((item, index) => (
                  <li key={item}>
                    <LocalizedText id={`tour.${tour.id}.cardHighlight.${index}`}>{item}</LocalizedText>
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={whatsappUrl(tour.whatsappText)} icon={MessageCircle} className="flex-1" whatsappKey={tour.id} analyticsEvent="whatsapp_click">
                  <LocalizedText id={tourBookKey(tour.id)}>{tourBookFallback(tour.id)}</LocalizedText>
                </ButtonLink>
                <ButtonLink href={tour.href} icon={ArrowRight} variant="secondary" className="flex-1">
                  <LocalizedText id="tour.details">View details</LocalizedText>
                </ButtonLink>
              </div>
            </article>
          ))}
        </div>
      </section>
      <BookingCTA title={<LocalizedText id="booking.title">Book your boat tour in Dhërmi</LocalizedText>} />
    </>
  );
}
