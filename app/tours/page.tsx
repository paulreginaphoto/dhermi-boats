import type { Metadata } from "next";
import { BookingCTA } from "@/components/BookingCTA";
import { LocalizedText } from "@/components/LocalizedText";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { SEOJsonLd } from "@/components/SEOJsonLd";
import { TourCard } from "@/components/TourCard";
import { tours } from "@/data/content";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Boat Tours in Dhërmi",
  description:
    "Compare Dhermi Boat tours: Gjipe, Grama Bay, private boat trips, sunset trips and morning fishing tours.",
  alternates: { canonical: canonical("/tours/") }
};

const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Dhermi Boat tours",
  url: canonical("/tours/"),
  hasPart: tours.map((tour) => ({
    "@type": "TouristTrip",
    name: tour.title,
    description: tour.subtitle || tour.included.join(", "),
    url: canonical(tour.href)
  }))
};

export default function ToursPage() {
  return (
    <>
      <SEOJsonLd data={schema} />
      <PageHero
        title={<LocalizedText id="section.tours.title">Choose your tour</LocalizedText>}
        image={tours[1].image}
        label={<LocalizedText id="page.tours.label">Tours</LocalizedText>}
      />

      <section className="bg-pearl py-16 md:py-24">
        <div className="site-band">
          <SectionHeading
            title={<LocalizedText id="section.tours.title">Choose your tour</LocalizedText>}
            label={<LocalizedText id="page.tours.label">Tours</LocalizedText>}
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {tours.map((tour, index) => (
              <TourCard key={tour.id} tour={tour} priority={index === 0} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-limestone py-16 md:py-24">
        <div className="site-band overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse overflow-hidden rounded-md bg-pearl text-left text-sm shadow-sm">
            <caption className="mb-6 text-left font-serif text-4xl font-medium text-ink">
              <LocalizedText id="tour.detailsLabel">Tour details</LocalizedText>
            </caption>
            <thead className="bg-ink text-pearl">
              <tr>
                <th className="px-5 py-4 font-semibold">
                  <LocalizedText id="table.tour">Tour</LocalizedText>
                </th>
                <th className="px-5 py-4 font-semibold">
                  <LocalizedText id="tour.durationLabel">Duration</LocalizedText>
                </th>
                <th className="px-5 py-4 font-semibold">
                  <LocalizedText id="tour.priceLabel">Price</LocalizedText>
                </th>
                <th className="px-5 py-4 font-semibold">
                  <LocalizedText id="tour.detailsLabel">Tour details</LocalizedText>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/10">
              {tours.map((tour) => (
                <tr key={tour.id}>
                  <td className="px-5 py-4 font-semibold text-ink">
                    <LocalizedText id={`tour.${tour.id}.shortTitle`}>{tour.shortTitle}</LocalizedText>
                  </td>
                  <td className="px-5 py-4 text-ink-soft">
                    {tour.duration ? <LocalizedText id={`tour.${tour.id}.duration`}>{tour.duration}</LocalizedText> : "-"}
                  </td>
                  <td className="px-5 py-4 text-ink-soft">
                    <LocalizedText id={`tour.${tour.id}.price`}>{tour.price}</LocalizedText>
                  </td>
                  <td className="px-5 py-4 text-ink-soft">
                    {tour.highlights.slice(0, 3).map((item, index) => (
                      <span key={item}>
                        {index > 0 ? ", " : null}
                        <LocalizedText id={`tour.${tour.id}.included.${index}`}>{item}</LocalizedText>
                      </span>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <BookingCTA title={<LocalizedText id="booking.title">Book your boat tour in Dhërmi</LocalizedText>} />
    </>
  );
}
