import type { Metadata } from "next";
import { BookingCTA } from "@/components/BookingCTA";
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
    description: tour.subtitle,
    url: canonical(tour.href)
  }))
};

export default function ToursPage() {
  return (
    <>
      <SEOJsonLd data={schema} />
      <PageHero title="Boat tours from Dhërmi" image={tours[1].image} label="Tours">
        <p>
          Choose the quick Gjipe escape, the longer Grama Bay route, or a private boat trip built around your group.
          Every booking starts with a simple WhatsApp message.
        </p>
      </PageHero>

      <section className="bg-pearl py-16 md:py-24">
        <div className="site-band">
          <SectionHeading title="Compare the routes" label="Clear choices">
            <p>
              Prices and duration are visible before you book. Final departure time and meeting point are confirmed on WhatsApp.
            </p>
          </SectionHeading>
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
              Practical comparison
            </caption>
            <thead className="bg-ink text-pearl">
              <tr>
                <th className="px-5 py-4 font-semibold">Tour</th>
                <th className="px-5 py-4 font-semibold">Duration</th>
                <th className="px-5 py-4 font-semibold">Price</th>
                <th className="px-5 py-4 font-semibold">Best for</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/10">
              {tours.map((tour) => (
                <tr key={tour.id}>
                  <td className="px-5 py-4 font-semibold text-ink">{tour.shortTitle}</td>
                  <td className="px-5 py-4 text-ink-soft">{tour.duration}</td>
                  <td className="px-5 py-4 text-ink-soft">{tour.price}</td>
                  <td className="px-5 py-4 text-ink-soft">{tour.highlights.slice(0, 3).join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <BookingCTA title="Book the right tour for your day" />
    </>
  );
}
