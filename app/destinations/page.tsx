import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, MessageCircle } from "lucide-react";
import { BookingCTA } from "@/components/BookingCTA";
import { ButtonLink } from "@/components/ButtonLink";
import { ConversionTrustBlock } from "@/components/ConversionTrustBlock";
import { CompareToursText, TourDetailsText, BookingTitleText } from "@/components/MicroCopy";
import { LocalizedText } from "@/components/LocalizedText";
import { PageHero } from "@/components/PageHero";
import { SeaRouteMap } from "@/components/SeaRouteMap";
import { SectionHeading } from "@/components/SectionHeading";
import { destinations, tours } from "@/data/content";
import { canonical, languageAlternates } from "@/lib/site";
import { translations } from "@/lib/i18n";
import { whatsappHrefForKey, type WhatsappMessageKey } from "@/lib/whatsappMessages";

export const metadata: Metadata = {
  title: "Dhermi Boat Tour Destinations",
  description:
    "Choose the right Dhermi boat tour destination: Gjipe Beach, Grama Bay or Blue Cave, with routes, best fit, included tour and WhatsApp booking.",
  alternates: { canonical: canonical("/destinations/"), languages: languageAlternates("/destinations/") }
};

const destinationInsights = [
  {
    destinationId: "gjipe",
    tourId: "gjipe",
    oneLinerKey: "destinations.card.gjipe.oneLiner",
    practicalKey: "destinations.card.gjipe.practical",
    bestForKey: "destinations.card.gjipe.bestFor",
    ctaKey: "tour.gjipe.book",
  },
  {
    destinationId: "grama",
    tourId: "grama",
    oneLinerKey: "destinations.card.grama.oneLiner",
    practicalKey: "destinations.card.grama.practical",
    bestForKey: "destinations.card.grama.bestFor",
    ctaKey: "tour.grama.book",
  },
  {
    destinationId: "blue-cave",
    tourId: "grama",
    oneLinerKey: "destinations.card.blue.oneLiner",
    practicalKey: "destinations.card.blue.practical",
    bestForKey: "destinations.card.blue.bestFor",
    ctaKey: "tour.grama.book",
  }
];
const enText = (key: string) => translations.en[key] ?? "";

export default function DestinationsPage() {
  return (
    <>
        <PageHero
        title={<LocalizedText id="page.destinations.title">{enText("page.destinations.title")}</LocalizedText>}
        image={tours[1].image}
        imageAlt={tours[1].imageAlt}
        label={<LocalizedText id="section.destinations.label">{enText("section.destinations.label")}</LocalizedText>}
      >
        <p>
          <LocalizedText id="destinations.hero.text">{enText("destinations.hero.text")}</LocalizedText>
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="#choose-destination" variant="dark">
            <LocalizedText id="destinations.choose.title">{enText("destinations.choose.title")}</LocalizedText>
          </ButtonLink>
          <ButtonLink href="/tours/" icon={ArrowRight} variant="secondary" className="border-white/0 bg-pearl text-ink shadow-sm hover:bg-white">
            <CompareToursText />
          </ButtonLink>
        </div>
      </PageHero>
      <ConversionTrustBlock />
      <section className="destination-section py-8 text-pearl md:py-16" id="choose-destination">
        <div className="site-band">
          <div className="mb-8 grid gap-5 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-sand">
                <LocalizedText id="destinations.choose.label">{enText("destinations.choose.label")}</LocalizedText>
              </p>
              <h2 className="mt-3 max-w-xl font-serif text-3xl font-medium leading-tight md:text-5xl">
                <LocalizedText id="destinations.choose.title">{enText("destinations.choose.title")}</LocalizedText>
              </h2>
            </div>
            <p className="max-w-2xl text-base font-semibold leading-8 text-pearl/88 lg:justify-self-end">
              <LocalizedText id="destinations.choose.text">{enText("destinations.choose.text")}</LocalizedText>
            </p>
          </div>
          <div className="mb-8 grid gap-3 text-sm font-semibold text-ink md:grid-cols-3">
            {["gjipe", "grama", "blue"].map((item) => (
              <p key={item} className="rounded-md bg-pearl/95 p-4 shadow-sm">
                <LocalizedText id={`destinations.choose.${item}`}>{enText(`destinations.choose.${item}`)}</LocalizedText>
              </p>
            ))}
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
          {destinationInsights.map((insight, index) => {
            const destination = destinations.find((item) => item.id === insight.destinationId);
            const tour = tours.find((item) => item.id === insight.tourId);

            if (!destination || !tour) return null;
            const translationBase = `destination.${destination.id}`;

            return (
              <article key={destination.id} className="group flex h-full flex-col overflow-hidden rounded-lg border border-white/14 bg-pearl text-ink shadow-image transition duration-300 hover:-translate-y-1">
                <div className="relative aspect-[4/3] bg-sand">
                  <Image
                    src={destination.cardImage ?? destination.image}
                    alt={destination.imageAlt ?? `${destination.title} boat tour destination in Albania`}
                    fill
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : "low"}
                    decoding="async"
                    quality={52}
                    sizes="(min-width: 1024px) 31vw, 92vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute left-4 top-4 rounded-full bg-pearl px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-ink shadow-sm">
                    <LocalizedText id={insight.bestForKey}>{enText(insight.bestForKey)}</LocalizedText>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-bronze">
                    <LocalizedText id={`${translationBase}.eyebrow`}>{enText(`${translationBase}.eyebrow`)}</LocalizedText>
                  </p>
                  <h2 className="mt-3 font-serif text-3xl font-medium text-ink">
                    <LocalizedText id={`${translationBase}.title`}>{enText(`${translationBase}.title`)}</LocalizedText>
                  </h2>
                  <p className="mt-3 text-base font-semibold leading-7 text-ink">
                    <LocalizedText id={insight.oneLinerKey}>{enText(insight.oneLinerKey)}</LocalizedText>
                  </p>
                  <p className="mt-3 text-sm leading-7 text-ink-soft">
                    <LocalizedText id={insight.practicalKey}>{enText(insight.practicalKey)}</LocalizedText>
                  </p>
                  <dl className="mt-5 grid gap-2 rounded-md bg-limestone/75 p-4 text-sm">
                    <div>
                    <dt className="text-xs font-bold uppercase tracking-[0.16em] text-bronze">
                        <LocalizedText id="destinations.card.includedTour">{enText("destinations.card.includedTour")}</LocalizedText>
                      </dt>
                      <dd className="mt-1 font-semibold text-ink">
                        <LocalizedText id={`tour.${tour.id}.shortTitle`}>{enText(`tour.${tour.id}.shortTitle`)}</LocalizedText>
                      </dd>
                    </div>
                  </dl>
                  <div className="mt-auto flex flex-col gap-3 pt-6 sm:flex-row">
                    <ButtonLink href={whatsappHrefForKey(tour.id as WhatsappMessageKey)} icon={MessageCircle} className="flex-1" whatsappKey={tour.id} analyticsTour={tour.id} analyticsPlacement="destination_card">
                      <LocalizedText id={insight.ctaKey}>{enText(insight.ctaKey)}</LocalizedText>
                    </ButtonLink>
                    <ButtonLink href={tour.href} variant="secondary" className="flex-1">
                      <TourDetailsText />
                    </ButtonLink>
                  </div>
                </div>
              </article>
            );
          })}
          </div>
        </div>
      </section>
      <section id="routes" className="scroll-mt-24 bg-limestone py-16 md:scroll-mt-28 md:py-24">
        <div className="site-band">
                <SectionHeading
            label={<LocalizedText id="map.label">{enText("map.label")}</LocalizedText>}
            title={<LocalizedText id="map.overviewTitle">{enText("map.overviewTitle")}</LocalizedText>}
          >
            <p>
              <LocalizedText id="map.safety.note">{enText("map.safety.note")}</LocalizedText>
            </p>
          </SectionHeading>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {destinations.map((destination) => (
              <SeaRouteMap key={destination.id} destination={destination} compact />
            ))}
          </div>
        </div>
      </section>
      <BookingCTA title={<BookingTitleText />} />
    </>
  );
}
