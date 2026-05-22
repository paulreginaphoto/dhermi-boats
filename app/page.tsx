import type { Metadata } from "next";
import { MapPin, MessageCircle } from "lucide-react";
import { BookingCTA } from "@/components/BookingCTA";
import { ButtonLink } from "@/components/ButtonLink";
import { DestinationCard } from "@/components/DestinationCard";
import { FAQAccordion } from "@/components/FAQAccordion";
import { GalleryGrid } from "@/components/GalleryGrid";
import { HeroCinematic } from "@/components/HeroCinematic";
import { MotionReveal } from "@/components/MotionReveal";
import { ReviewCard } from "@/components/ReviewCard";
import { SectionHeading } from "@/components/SectionHeading";
import { SEOJsonLd } from "@/components/SEOJsonLd";
import { SocialFeed } from "@/components/SocialFeed";
import { TourCard } from "@/components/TourCard";
import { TrustBadges } from "@/components/TrustBadges";
import { VideoFeature } from "@/components/VideoFeature";
import { LocalizedText } from "@/components/LocalizedText";
import { destinations, faqs, primaryWhatsappHref, reviews, tours, usefulInformation, whyChooseUs } from "@/data/content";
import { canonical, emailAddress, googleMapsUrl, instagramUrl, phoneDisplay, siteUrl, tiktokUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Dhermi Boat Tours | Private & Group Boat Trips in Dhërmi",
  description:
    "Discover the Albanian Riviera from the sea with boat tours departing from Dhërmi.",
  alternates: { canonical: canonical("/") }
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Dhermi Boat",
  url: siteUrl,
  telephone: phoneDisplay,
  email: emailAddress,
  image: canonical("/images/hero-riviera.webp"),
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dhërmi",
    addressCountry: "AL"
  },
  areaServed: ["Dhërmi", "Albanian Riviera", "Gjipe", "Grama Bay", "Karaburun"],
  sameAs: [instagramUrl, tiktokUrl, googleMapsUrl],
  hasMap: googleMapsUrl,
  priceRange: "35 € - 200 € / hour"
};

const touristTripSchema = tours.slice(0, 3).map((tour) => ({
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  name: tour.title,
  description: tour.subtitle || tour.included.join(", "),
  image: canonical(tour.image.replace(/^.*\/images\//, "/images/")),
  touristType: tour.type === "private" ? "Private boat tour" : "Small-group boat tour",
  itinerary: tour.highlights.join(", "),
  offers: {
    "@type": "Offer",
    priceCurrency: "EUR",
    description: tour.price,
    availability: "https://schema.org/InStock",
    url: canonical(tour.href)
  },
  provider: {
    "@type": "LocalBusiness",
    name: "Dhermi Boat",
    telephone: phoneDisplay
  }
}));

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer
    }
  }))
};

export default function HomePage() {
  return (
    <>
      <SEOJsonLd data={[localBusinessSchema, ...touristTripSchema, faqSchema]} />
      <HeroCinematic />

      <section className="bg-limestone py-8 md:py-10">
        <div className="site-band">
          <TrustBadges />
        </div>
      </section>

      <section className="bg-pearl py-16 md:py-24" id="tours">
        <div className="site-band">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              label={<LocalizedText id="section.tours.label">Choose your tour</LocalizedText>}
              title={<LocalizedText id="section.tours.title">Choose your tour</LocalizedText>}
            />
            <ButtonLink href="/tours/" variant="secondary">
              <LocalizedText id="cta.viewTours">VIEW TOURS</LocalizedText>
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {tours.slice(0, 3).map((tour, index) => (
              <MotionReveal key={tour.id} delay={index * 90}>
                <TourCard tour={tour} priority={index === 0} />
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-limestone py-16 md:py-24">
        <div className="site-band grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <SectionHeading label="Exclusive Experiences" title="Exclusive Experiences" />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/tours/private/" variant="primary">
                <LocalizedText id="tour.details">VIEW DETAILS</LocalizedText>
              </ButtonLink>
              <ButtonLink href={primaryWhatsappHref} icon={MessageCircle} variant="secondary">
                <LocalizedText id="tour.private.book">REQUEST A PRIVATE TOUR</LocalizedText>
              </ButtonLink>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {tours.slice(3).map((tour) => (
              <article key={tour.id} className="rounded-md border border-ink/10 bg-pearl p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-bronze">
                  <LocalizedText id={`tour.${tour.id}.price`}>{tour.price}</LocalizedText>
                </p>
                <h3 className="mt-3 font-serif text-3xl font-medium text-ink">
                  <LocalizedText id={`tour.${tour.id}.shortTitle`}>{tour.shortTitle}</LocalizedText>
                </h3>
                {tour.subtitle ? (
                  <p className="mt-3 text-sm leading-7 text-ink-soft">
                    <LocalizedText id={`tour.${tour.id}.subtitle`}>{tour.subtitle}</LocalizedText>
                  </p>
                ) : null}
                <ul className="mt-5 grid gap-2 text-sm leading-6 text-ink-soft">
                  {tour.included.map((item, index) => (
                    <li key={item} className="flex gap-2">
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-bronze" />
                      <span>
                        <LocalizedText id={`tour.${tour.id}.included.${index}`}>{item}</LocalizedText>
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-16 text-pearl md:py-24">
        <div className="site-band">
          <div className="max-w-3xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-sand">Destinations</p>
            <h2 className="font-serif text-4xl font-medium leading-[1.04] md:text-5xl">Destinations</h2>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {destinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-pearl py-16 md:py-24">
        <div className="site-band grid gap-12 lg:grid-cols-[1fr_0.82fr] lg:items-center">
          <div>
            <SectionHeading label="Our latest photos" title="Our latest photos" />
          </div>
          <VideoFeature />
        </div>
        <div className="site-band mt-10">
          <GalleryGrid />
        </div>
      </section>

      <SocialFeed />

      <section className="bg-pearl py-16 md:py-24">
        <div className="site-band grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-4xl font-medium text-ink">
              <LocalizedText id="section.why.title">Why choose us?</LocalizedText>
            </h2>
            <ul className="mt-6 grid gap-3 text-base leading-7 text-ink-soft">
              {whyChooseUs.map((item, index) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-bronze" />
                  <span>
                    <LocalizedText id={`why.${index}`}>{item}</LocalizedText>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-serif text-4xl font-medium text-ink">
              <LocalizedText id="section.info.title">Useful information</LocalizedText>
            </h2>
            <ul className="mt-6 grid gap-3 text-base leading-7 text-ink-soft">
              {usefulInformation.map((item, index) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-bronze" />
                  <span>
                    <LocalizedText id={`useful.${index}`}>{item}</LocalizedText>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="reviews" className="scroll-mt-24 bg-limestone py-16 md:scroll-mt-28 md:py-24">
        <div className="site-band">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              label={<LocalizedText id="section.reviews.label">Guest reviews</LocalizedText>}
              title={<LocalizedText id="section.reviews.title">Guest reviews</LocalizedText>}
            />
            <a
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-ink/15 bg-pearl px-5 text-sm font-semibold text-ink transition hover:border-ink/35 hover:bg-white"
              href={googleMapsUrl}
              rel="noreferrer"
              target="_blank"
            >
              <MapPin className="h-4 w-4" aria-hidden />
              <LocalizedText id="section.reviews.cta">Google Maps</LocalizedText>
            </a>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <ReviewCard key={review.name} review={review} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-pearl py-16 md:py-24">
        <div className="site-band grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeading
            label={<LocalizedText id="section.faq.label">Before booking</LocalizedText>}
            title={<LocalizedText id="section.faq.title">Frequently asked questions</LocalizedText>}
          >
            <p>
              <LocalizedText id="section.faq.text">
                Quick answers to prepare your boat tour in Dhërmi without making the booking complicated.
              </LocalizedText>
            </p>
          </SectionHeading>
          <FAQAccordion items={faqs.slice(0, 4)} />
        </div>
      </section>

      <BookingCTA />
    </>
  );
}
