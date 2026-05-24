import type { Metadata } from "next";
import { BookingCTA } from "@/components/BookingCTA";
import { ButtonLink } from "@/components/ButtonLink";
import { LocalizedText } from "@/components/LocalizedText";
import { PageHero } from "@/components/PageHero";
import { SEOJsonLd } from "@/components/SEOJsonLd";
import { TourCard } from "@/components/TourCard";
import { TourComparison } from "@/components/TourComparison";
import { tours } from "@/data/content";
import { canonical, languageAlternates } from "@/lib/site";
import { breadcrumbSchema, localBusinessSchema, tourCollectionSchema, touristTripSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Dhermi Boat Tours",
  description:
    "Compare Dhermi boat tours from Dhërmi to Gjipe, Grama Bay, Blue Cave, private routes, sunset trips and morning fishing tours.",
  alternates: { canonical: canonical("/tours/"), languages: languageAlternates("/tours/") }
};

export default function ToursPage() {
  return (
    <>
      <SEOJsonLd
        data={[
          localBusinessSchema(),
          tourCollectionSchema(),
          ...tours.map((tour) => touristTripSchema(tour)),
          breadcrumbSchema([
            { name: "Dhermi boat tours", url: "/" },
            { name: "Compare tours", url: "/tours/" }
          ])
        ]}
      />
      <PageHero
        title={<LocalizedText id="section.tours.title">Compare Dhermi boat tours by route and price</LocalizedText>}
        image={tours[1].image}
        imageAlt={tours[1].imageAlt}
        label={<LocalizedText id="page.tours.label">Tours</LocalizedText>}
      >
        <p>
          <LocalizedText id="section.tours.text">
            Choose a Dhermi boat tour for Gjipe, Grama Bay, Blue Cave, a private route, sunset cruise or morning fishing, then confirm the date with the local skipper on WhatsApp.
          </LocalizedText>
        </p>
      </PageHero>

      <section aria-label="Tours" className="bg-pearl py-10 md:py-16">
        <div className="site-band">
          <div className="grid gap-6 lg:grid-cols-3">
            {tours.map((tour, index) => (
              <TourCard key={tour.id} tour={tour} imagePriority={index < 3} />
            ))}
          </div>
        </div>
      </section>

      <TourComparison />

      <section className="bg-navy py-16 text-pearl md:py-24">
        <div className="site-band">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-sand">
              <LocalizedText id="decision.label">Which tour should I choose?</LocalizedText>
            </p>
            <h2 className="mt-3 font-serif text-4xl font-medium leading-tight md:text-5xl">
              <LocalizedText id="decision.title">Choose by time, swim stops and group style</LocalizedText>
            </h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              ["decision.gjipe.title", "Gjipe: value and shorter route", "decision.gjipe.text", "Choose Gjipe for caves, Gjipe Beach and a 30-minute swim stop when you want a clear, easy sea trip.", "gjipe"],
              ["decision.grama.title", "Grama: most complete shared route", "decision.grama.text", "Choose Grama when you want Karaburun, Blue Cave, San Andrea Beach and Grama Beach in one longer tour.", "grama"],
              ["decision.private.title", "Private: families and groups", "decision.private.text", "Choose private when your group wants custom timing, destinations and swimming stops with the skipper.", "private"],
              ["decision.weather.title", "Sea-safe planning", "decision.weather.text", "Choose WhatsApp if you are unsure: routes and cave access depend on wind, waves and skipper safety decisions.", "default"]
            ].map(([titleKey, title, textKey, text, tourId]) => {
              const tour = tours.find((item) => item.id === tourId) ?? tours[0];
              return (
                <article key={String(titleKey)} className="rounded-lg border border-white/12 bg-white/8 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                  <h3 className="font-serif text-2xl font-medium">
                    <LocalizedText id={String(titleKey)}>{title}</LocalizedText>
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-pearl/86">
                    <LocalizedText id={String(textKey)}>{text}</LocalizedText>
                  </p>
                  <ButtonLink href={tour.href} variant="ghost" className="mt-5 border border-white/15 text-pearl hover:bg-white/10">
                    <LocalizedText id="tour.details">See route and price</LocalizedText>
                  </ButtonLink>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-limestone py-16 md:py-24">
        <div className="site-band overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse overflow-hidden rounded-lg bg-pearl text-left text-sm shadow-sm">
            <caption className="mb-6 text-left font-serif text-4xl font-medium text-ink">
              <LocalizedText id="tour.detailsLabel">Route facts</LocalizedText>
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
                  <LocalizedText id="tour.detailsLabel">Route facts</LocalizedText>
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

      <BookingCTA
        title={<LocalizedText id="booking.title">Book your boat tour in Dhërmi</LocalizedText>}
        text={<LocalizedText id="booking.text">Send a WhatsApp message with your date, number of people and preferred tour. We confirm availability together.</LocalizedText>}
      />
    </>
  );
}
