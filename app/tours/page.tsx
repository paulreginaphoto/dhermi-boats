import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import { BookingCTA } from "@/components/BookingCTA";
import { ButtonLink } from "@/components/ButtonLink";
import { ConversionTrustBlock } from "@/components/ConversionTrustBlock";
import { LocalizedText } from "@/components/LocalizedText";
import { PageHero } from "@/components/PageHero";
import { SEOJsonLd } from "@/components/SEOJsonLd";
import { TourCard } from "@/components/TourCard";
import { TourComparison } from "@/components/TourComparison";
import { tours } from "@/data/content";
import { conversionAttrs } from "@/lib/conversion";
import { canonical, languageAlternates, whatsappUrl } from "@/lib/site";
import { breadcrumbSchema, tourCollectionSchema, touristTripSchema } from "@/lib/seo";
import { tourBookFallback, tourBookKey } from "@/lib/tourBookingCopy";
import { whatsappHrefForKey } from "@/lib/whatsappMessages";

export const metadata: Metadata = {
  title: "Compare Dhermi Boat Tours",
  description:
    "Compare Dhermi boat tours by price, duration, capacity, stops and best fit before booking Gjipe, Grama Bay, private, sunset or fishing by WhatsApp.",
  alternates: { canonical: canonical("/tours/"), languages: languageAlternates("/tours/") }
};

export default function ToursPage() {
  return (
    <>
      <SEOJsonLd
        data={[
          tourCollectionSchema(),
          ...tours.map((tour) => touristTripSchema(tour)),
          breadcrumbSchema([
            { name: "Dhermi boat tours", url: "/" },
            { name: "Compare tours", url: "/tours/" }
          ])
        ]}
      />
      <PageHero
        title={<LocalizedText id="comparison.title">Choose your tour in 30 seconds</LocalizedText>}
        image={tours[1].image}
        imageAlt={tours[1].imageAlt}
        label={<LocalizedText id="page.tours.label">Tours</LocalizedText>}
      >
        <p>
          <LocalizedText id="page.tours.heroText">
            Compare every real Dhermi Boat route by time, price, capacity and swim stops. When you know your date and group size, WhatsApp is the fastest way to confirm availability.
          </LocalizedText>
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="#compare-tours" variant="dark">
            <LocalizedText id="cta.compareTours">Compare tours</LocalizedText>
          </ButtonLink>
          <ButtonLink href={whatsappHrefForKey("default")} icon={MessageCircle} variant="secondary" className="border-white/25 bg-white/10 text-white hover:bg-white/18" whatsappKey="default" analyticsPlacement="tours_hero">
            <LocalizedText id="contact.message.title">Send date, group size and preferred tour</LocalizedText>
          </ButtonLink>
        </div>
      </PageHero>

      <ConversionTrustBlock />

      <TourComparison />

      <section aria-label="Tours" className="bg-pearl py-10 md:py-16">
        <div className="site-band">
          <div className="mb-8 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-bronze">
              <LocalizedText id="page.tours.cardsLabel">All offers</LocalizedText>
            </p>
            <h2 className="mt-3 font-serif text-4xl font-medium leading-tight text-ink md:text-5xl">
              <LocalizedText id="page.tours.cardsTitle">Choose the tour that matches your day</LocalizedText>
            </h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {tours.map((tour, index) => (
              <TourCard key={tour.id} tour={tour} imagePriority={index < 3} />
            ))}
          </div>
        </div>
      </section>

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
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {[
              ["decision.gjipe.title", "Best value: Gjipe", "decision.gjipe.text", "Choose Gjipe for caves, Gjipe Beach and a 30-minute swim stop when you want a clear, easy sea trip.", "gjipe"],
              ["decision.grama.title", "Most complete: Grama", "decision.grama.text", "Choose Grama when you want Karaburun, Blue Cave, San Andrea Beach and Grama Beach in one longer tour.", "grama"],
              ["decision.private.title", "Private/family", "decision.private.text", "Choose private when your group wants custom timing, destinations and swimming stops with the skipper.", "private"],
              ["decision.sunset.title", "Sunset/couple", "decision.sunset.text", "Choose sunset for a private evening cruise around the Dhërmi coast.", "sunset"],
              ["decision.fishing.title", "Fishing/morning", "decision.fishing.text", "Choose fishing for a quiet early route from 5 AM to 8 AM with 2 fishing rods included.", "fishing"]
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
              <LocalizedText id="page.tours.matrixTitle">Choose your tour in 30 seconds</LocalizedText>
            </caption>
            <thead className="bg-ink text-pearl">
              <tr>
                <th className="px-5 py-4 font-semibold">
                  <LocalizedText id="table.tour">Tour</LocalizedText>
                </th>
                <th className="px-5 py-4 font-semibold">
                  <LocalizedText id="tour.bestForLabel">Good fit</LocalizedText>
                </th>
                <th className="px-5 py-4 font-semibold">
                  <LocalizedText id="tour.durationLabel">Duration</LocalizedText>
                </th>
                <th className="px-5 py-4 font-semibold">
                  <LocalizedText id="tour.priceLabel">Price</LocalizedText>
                </th>
                <th className="px-5 py-4 font-semibold">
                  <LocalizedText id="tour.capacityLabel">Capacity</LocalizedText>
                </th>
                <th className="px-5 py-4 font-semibold">
                  <LocalizedText id="comparison.stops">Main stops</LocalizedText>
                </th>
                <th className="px-5 py-4 font-semibold">
                  <LocalizedText id="booking.panel.label">WhatsApp booking</LocalizedText>
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
                    <LocalizedText id={`tour.${tour.id}.bestFor`}>{tour.bestFor}</LocalizedText>
                  </td>
                  <td className="px-5 py-4 text-ink-soft">
                    {tour.duration ? <LocalizedText id={`tour.${tour.id}.duration`}>{tour.duration}</LocalizedText> : "-"}
                  </td>
                  <td className="px-5 py-4 text-ink-soft">
                    <LocalizedText id={`tour.${tour.id}.price`}>{tour.price}</LocalizedText>
                  </td>
                  <td className="px-5 py-4 text-ink-soft">
                    <LocalizedText id={`tour.${tour.id}.capacity`}>{tour.capacity}</LocalizedText>
                  </td>
                  <td className="px-5 py-4 text-ink-soft">
                    {tour.cardHighlights.slice(0, 3).map((item, index) => (
                      <span key={item}>
                        {index > 0 ? ", " : null}
                        <LocalizedText id={`tour.${tour.id}.cardHighlight.${index}`}>{item}</LocalizedText>
                      </span>
                    ))}
                  </td>
                  <td className="px-5 py-4">
                    <a
                      className="inline-flex min-h-10 items-center justify-center rounded-md bg-ink px-4 text-xs font-bold text-pearl transition hover:bg-navy"
                      data-tour-id={tour.id}
                      data-whatsapp-key={tour.id}
                      href={whatsappUrl(tour.whatsappText)}
                      rel="noreferrer"
                      target="_blank"
                      {...conversionAttrs({ tourId: tour.id, placement: "tour_matrix" })}
                    >
                      <LocalizedText id={tourBookKey(tour.id)}>{tourBookFallback(tour.id)}</LocalizedText>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <BookingCTA
        title={<LocalizedText id="booking.title">Book your boat tour in Dhërmi</LocalizedText>}
        text={<LocalizedText id="booking.text">Send a WhatsApp message with the tour, date, adults, children, preferred time and questions. We confirm availability together.</LocalizedText>}
      />
    </>
  );
}
