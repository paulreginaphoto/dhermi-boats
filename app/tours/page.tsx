import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import { BookingCTA } from "@/components/BookingCTA";
import { ButtonLink } from "@/components/ButtonLink";
import { ConversionTrustBlock } from "@/components/ConversionTrustBlock";
import { LocalizedText } from "@/components/LocalizedText";
import { CompareToursText, BookingTitleText, TourDetailsText } from "@/components/MicroCopy";
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
import { translations } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Compare Dhermi Boat Tours",
  description:
    "Compare Dhermi boat tours by price, duration, capacity, stops and best fit before booking Gjipe, Grama Bay, private, sunset or fishing by WhatsApp.",
  alternates: { canonical: canonical("/tours/"), languages: languageAlternates("/tours/") }
};

export default function ToursPage() {
  const tiers = ["bestSeller", "premiumRoute", "private", "experience"] as const;
  const toursByTier = tiers.map((tier) => ({
    tier,
    label: `tour.tier.${tier}`,
    tours: tours.filter((tour) => tour.offerTier === tier)
  }));
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
          <ButtonLink href={whatsappHrefForKey("default")} icon={MessageCircle} variant="secondary" className="border-white/25 bg-white/10 text-white hover:bg-white/18" whatsappKey="default" analyticsPlacement="tours_hero">
            <LocalizedText id="contact.message.title">{enText("contact.message.title")}</LocalizedText>
          </ButtonLink>
        </div>
      </PageHero>

      <ConversionTrustBlock />

      <TourComparison />

      <span id="tours-section-label" className="sr-only">
        <LocalizedText id="a11y.toursSection">{enText("a11y.toursSection")}</LocalizedText>
      </span>
      <section aria-labelledby="tours-section-label" className="bg-pearl py-10 md:py-16">
        <div className="site-band">
            <div className="mb-8 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-bronze">
              <LocalizedText id="page.tours.cardsLabel">{enText("page.tours.cardsLabel")}</LocalizedText>
            </p>
            <h2 className="mt-3 font-serif text-4xl font-medium leading-tight text-ink md:text-5xl">
              <LocalizedText id="page.tours.cardsTitle">{enText("page.tours.cardsTitle")}</LocalizedText>
            </h2>
          </div>
          <div className="space-y-12">
            {toursByTier.map((group) => (
              <div key={group.tier}>
                <div className="mb-4 flex items-center justify-between gap-4 border-b border-ink/10 pb-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-bronze">
                      <LocalizedText id="tour.tier.label">{enText("tour.tier.label")}</LocalizedText>
                    </p>
                    <h3 className="mt-2 font-serif text-2xl font-medium leading-tight text-ink md:text-3xl">
                      <LocalizedText id={group.label}>{enText(group.label)}</LocalizedText>
                    </h3>
                  </div>
                </div>
                <div className="grid gap-6 lg:grid-cols-3">
                  {group.tours.map((tour) => (
                    <TourCard key={tour.id} tour={tour} imagePriority />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-16 text-pearl md:py-24">
        <div className="site-band">
            <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-sand">
              <LocalizedText id="decision.label">{enText("decision.label")}</LocalizedText>
            </p>
            <h2 className="mt-3 font-serif text-4xl font-medium leading-tight md:text-5xl">
              <LocalizedText id="decision.title">{enText("decision.title")}</LocalizedText>
            </h2>
          </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {[
              ["decision.gjipe.title", "decision.gjipe.text", "gjipe"],
              ["decision.grama.title", "decision.grama.text", "grama"],
              ["decision.private.title", "decision.private.text", "private"],
              ["decision.sunset.title", "decision.sunset.text", "sunset"],
              ["decision.fishing.title", "decision.fishing.text", "fishing"]
            ].map(([titleKey, textKey, tourId]) => {
              const tour = tours.find((item) => item.id === tourId) ?? tours[0];
              return (
                <article key={String(titleKey)} className="rounded-lg border border-white/12 bg-white/8 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                  <h3 className="font-serif text-2xl font-medium">
                    <LocalizedText id={String(titleKey)}>{enText(String(titleKey))}</LocalizedText>
                  </h3>
                    <p className="mt-3 text-sm leading-7 text-pearl/86">
                    <LocalizedText id={String(textKey)}>{enText(String(textKey))}</LocalizedText>
                  </p>
                  <ButtonLink href={tour.href} variant="ghost" className="mt-5 border border-white/15 text-pearl hover:bg-white/10">
                    <TourDetailsText />
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
        title={<BookingTitleText />}
        text={<LocalizedText id="booking.text">{enText("booking.text")}</LocalizedText>}
      />
    </>
  );
}
