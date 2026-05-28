import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import { BookingCTA } from "@/components/BookingCTA";
import { ButtonLink } from "@/components/ButtonLink";
import { ConversionTrustBlock } from "@/components/ConversionTrustBlock";
import { LocalizedText } from "@/components/LocalizedText";
import { CompareToursText, BookingTitleText } from "@/components/MicroCopy";
import { PageHero } from "@/components/PageHero";
import { SEOJsonLd } from "@/components/SEOJsonLd";
import { TourComparison } from "@/components/TourComparison";
import { tours } from "@/data/content";
import { conversionAttrs } from "@/lib/conversion";
import { canonical, languageAlternates } from "@/lib/site";
import { breadcrumbSchema, tourCollectionSchema, touristTripSchema } from "@/lib/seo";
import { tourBookFallback, tourBookKey } from "@/lib/tourBookingCopy";
import { whatsappHrefForKey, type WhatsappMessageKey } from "@/lib/whatsappMessages";
import { translations } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Compare Dhermi Boat Tours",
  description:
    "Compare Dhermi boat tours by price, duration, capacity, stops and best fit before booking Gjipe, Grama Bay, private, sunset or fishing by WhatsApp.",
  alternates: { canonical: canonical("/tours/"), languages: languageAlternates("/tours/") }
};

export default function ToursPage() {
  const enText = (key: string) => translations.en[key] ?? "";

  return (
    <>
      <SEOJsonLd
        data={[
          tourCollectionSchema(),
          ...tours.map((tour) => touristTripSchema(tour)),
          breadcrumbSchema([
            { name: enText("page.tours.label"), url: "/" },
            { name: enText("comparison.title"), url: "/tours/" }
          ])
        ]}
      />
      <PageHero
        title={<LocalizedText id="comparison.title">{enText("comparison.title")}</LocalizedText>}
        image={tours[1].image}
        imageAlt={tours[1].imageAlt}
        label={<LocalizedText id="page.tours.label">{enText("page.tours.label")}</LocalizedText>}
      >
        <p>
          <LocalizedText id="page.tours.heroText">
            {enText("page.tours.heroText")}
          </LocalizedText>
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="#compare-tours" variant="dark">
            <CompareToursText />
          </ButtonLink>
          <ButtonLink href={whatsappHrefForKey("default")} icon={MessageCircle} variant="secondary" className="border-white/0 bg-pearl text-ink shadow-sm hover:bg-white" whatsappKey="default" analyticsPlacement="tours_hero">
            <LocalizedText id="contact.message.title">{enText("contact.message.title")}</LocalizedText>
          </ButtonLink>
        </div>
      </PageHero>

      <ConversionTrustBlock />

      <TourComparison />

      <section id="prices" className="scroll-mt-24 bg-limestone py-12 md:py-20">
        <div className="site-band">
          <h2 className="mb-6 max-w-2xl font-serif text-3xl font-medium leading-tight text-ink md:text-4xl">
            <LocalizedText id="page.tours.matrixTitle">{enText("page.tours.matrixTitle")}</LocalizedText>
          </h2>
          <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse overflow-hidden rounded-lg bg-pearl text-left text-sm shadow-sm">
            <caption className="sr-only">
              <LocalizedText id="page.tours.matrixTitle">{enText("page.tours.matrixTitle")}</LocalizedText>
            </caption>
            <thead className="bg-ink text-pearl">
              <tr>
                <th className="px-5 py-4 font-semibold">
                  <LocalizedText id="table.tour">{enText("table.tour")}</LocalizedText>
                </th>
                <th className="px-5 py-4 font-semibold">
                  <LocalizedText id="tour.bestForLabel">{enText("tour.bestForLabel")}</LocalizedText>
                </th>
                <th className="px-5 py-4 font-semibold">
                  <LocalizedText id="tour.durationLabel">{enText("tour.durationLabel")}</LocalizedText>
                </th>
                <th className="px-5 py-4 font-semibold">
                  <LocalizedText id="tour.priceLabel">{enText("tour.priceLabel")}</LocalizedText>
                </th>
                <th className="px-5 py-4 font-semibold">
                  <LocalizedText id="tour.capacityLabel">{enText("tour.capacityLabel")}</LocalizedText>
                </th>
                <th className="px-5 py-4 font-semibold">
                  <LocalizedText id="comparison.stops">{enText("comparison.stops")}</LocalizedText>
                </th>
                <th className="px-5 py-4 font-semibold">
                  <LocalizedText id="booking.panel.label">{enText("booking.panel.label")}</LocalizedText>
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
                      href={whatsappHrefForKey(tour.id as WhatsappMessageKey)}
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
        </div>
      </section>

      <BookingCTA
        title={<BookingTitleText />}
        text={<LocalizedText id="booking.text">{enText("booking.text")}</LocalizedText>}
      />
    </>
  );
}
