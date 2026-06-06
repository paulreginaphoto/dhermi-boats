import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import { BookingCTA } from "@/components/BookingCTA";
import { ButtonLink } from "@/components/ButtonLink";
import { LocalizedText } from "@/components/LocalizedText";
import { CompareToursText, BookingTitleText } from "@/components/MicroCopy";
import { PageHero } from "@/components/PageHero";
import { SEOJsonLd } from "@/components/SEOJsonLd";
import { TourComparison } from "@/components/TourComparison";
import { orderedTours } from "@/data/content";
import { canonical, languageAlternates } from "@/lib/site";
import { breadcrumbSchema, tourCollectionSchema, touristTripSchema } from "@/lib/seo";
import { bookingFormHrefForKey } from "@/lib/bookingLinks";
import { translations } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Compare Dhermi Boat Tours",
  description:
    "Compare Dhermi boat tours by price, duration, capacity, stops and best fit before booking Gjipe, Grama Bay, private, sunset or fishing by WhatsApp.",
  alternates: { canonical: canonical("/tours/"), languages: languageAlternates("/tours/") }
};

export default function ToursPage() {
  const enText = (key: string) => translations.en[key] ?? "";
  const heroTour = orderedTours.find((tour) => tour.id === "grama") ?? orderedTours[0]!;

  return (
    <>
      <SEOJsonLd
        data={[
          tourCollectionSchema(),
          ...orderedTours.map((tour) => touristTripSchema(tour)),
          breadcrumbSchema([
            { name: enText("page.tours.label"), url: "/" },
            { name: enText("comparison.title"), url: "/tours/" }
          ])
        ]}
      />
      <PageHero
        title={<LocalizedText id="comparison.title">{enText("comparison.title")}</LocalizedText>}
        image={heroTour.image}
        imageAlt={heroTour.imageAlt}
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
          <ButtonLink href={bookingFormHrefForKey("default")} icon={MessageCircle} variant="secondary" className="border-white/0 bg-pearl text-ink shadow-sm hover:bg-white" whatsappKey="default" analyticsPlacement="tours_hero">
            <LocalizedText id="contact.message.title">{enText("contact.message.title")}</LocalizedText>
          </ButtonLink>
        </div>
      </PageHero>

      <div data-analytics-placement="tour_matrix" data-content-guard="page.tours.matrixTitle">
        <TourComparison />
      </div>

      <BookingCTA
        title={<BookingTitleText />}
        text={<LocalizedText id="booking.text">{enText("booking.text")}</LocalizedText>}
      />
    </>
  );
}
