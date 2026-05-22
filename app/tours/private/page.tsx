import type { Metadata } from "next";
import { BookingCTA } from "@/components/BookingCTA";
import { LocalizedText } from "@/components/LocalizedText";
import { TourDetailPage } from "@/components/TourDetailPage";
import { tours } from "@/data/content";
import { canonical } from "@/lib/site";

const privateTour = tours.find((tour) => tour.id === "private")!;

export const metadata: Metadata = {
  title: "Private Boat Tour Albania",
  description:
    "Private boat tour from Dhërmi, Albania. Choose your route, swimming stops and timing for families, couples, friends or small celebrations.",
  alternates: { canonical: canonical("/tours/private/") }
};

export default function PrivateTourPage() {
  return (
    <>
      <TourDetailPage tour={privateTour} />
      <section id="sunset" className="bg-pearl py-16 md:py-24">
        <div className="site-band grid gap-6 md:grid-cols-2">
          {tours.filter((tour) => tour.id === "sunset" || tour.id === "fishing").map((tour) => (
            <article key={tour.id} className="rounded-lg border border-ink/10 bg-limestone/70 p-6 shadow-sm md:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-bronze">
                <LocalizedText id={`tour.${tour.id}.price`}>{tour.price}</LocalizedText>
              </p>
              <h2 className="mt-3 font-serif text-4xl font-medium text-ink">
                <LocalizedText id={`tour.${tour.id}.title`}>{tour.title}</LocalizedText>
              </h2>
              <p className="mt-4 text-base leading-8 text-ink-soft">
                <LocalizedText id={`tour.${tour.id}.subtitle`}>{tour.subtitle}</LocalizedText>
              </p>
              <ul className="mt-6 grid gap-2 text-sm font-semibold text-ink">
                {tour.highlights.map((item, index) => (
                  <li key={item}>
                    <LocalizedText id={`tour.${tour.id}.included.${index}`}>{item}</LocalizedText>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
      <BookingCTA title={<LocalizedText id="booking.title">Book your boat tour in Dhërmi</LocalizedText>} />
    </>
  );
}
