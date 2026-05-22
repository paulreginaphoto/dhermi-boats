import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
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
import { destinations, faqs, primaryWhatsappHref, reviews, tours } from "@/data/content";
import { canonical, emailAddress, instagramUrl, phoneDisplay, siteUrl, tiktokUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Dhermi Boat Tours | Private & Group Boat Trips in Dhërmi",
  description:
    "Book friendly boat tours from Dhërmi, Albania to Gjipe, Grama Bay, Blue Cave and the Albanian Riviera. Clear prices, shared trips, private boats and WhatsApp booking.",
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
  sameAs: [instagramUrl, tiktokUrl],
  priceRange: "35 € - 200 € / hour"
};

const touristTripSchema = tours.slice(0, 3).map((tour) => ({
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  name: tour.title,
  description: tour.subtitle,
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
              title={<LocalizedText id="section.tours.title">Fast booking, clear routes, real coastline.</LocalizedText>}
            >
              <p>
                <LocalizedText id="section.tours.text">
                  Pick a shared route for the essentials, or reserve the boat privately and shape the day around your group.
                </LocalizedText>
              </p>
            </SectionHeading>
            <ButtonLink href="/tours/" variant="secondary">
              All tours
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
            <SectionHeading label="Private boats" title="Your own boat, your own timing.">
              <p>
                Choose the duration, swimming stops and destinations. Private tours work well for families,
                couples, groups of friends and anyone who wants a quieter day on the water.
              </p>
            </SectionHeading>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/tours/private/" variant="primary">
                Private tour details
              </ButtonLink>
              <ButtonLink href={primaryWhatsappHref} icon={MessageCircle} variant="secondary">
                Request a private tour
              </ButtonLink>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {tours.slice(3).map((tour) => (
              <article key={tour.id} className="rounded-md border border-ink/10 bg-pearl p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-bronze">{tour.price}</p>
                <h3 className="mt-3 font-serif text-3xl font-medium text-ink">{tour.shortTitle}</h3>
                <p className="mt-3 text-sm leading-7 text-ink-soft">{tour.subtitle}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-16 text-pearl md:py-24">
        <div className="site-band">
          <div className="max-w-3xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-sand">Destinations</p>
            <h2 className="font-serif text-4xl font-medium leading-[1.04] md:text-5xl">
              The Riviera from the angle that matters: the water.
            </h2>
            <p className="mt-5 text-base leading-8 text-pearl/72 md:text-lg">
              Gjipe, Grama Bay and Blue Cave are not checklist stops. They are the reason the boat is worth booking.
            </p>
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
            <SectionHeading label="On the water" title="Photos that show the actual route.">
              <p>
                Real beaches, real caves and real boat views from recent Dhermi Boat trips. The site keeps the media
                light so it still feels fast on mobile.
              </p>
            </SectionHeading>
          </div>
          <VideoFeature />
        </div>
        <div className="site-band mt-10">
          <GalleryGrid />
        </div>
      </section>

      <SocialFeed />

      <section className="bg-limestone py-16 md:py-24">
        <div className="site-band">
          <SectionHeading label="Guest reviews" title="Local skipper, relaxed atmosphere, coastline worth remembering." />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {reviews.slice(0, 3).map((review) => (
              <ReviewCard key={review.name} review={review} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-pearl py-16 md:py-24">
        <div className="site-band grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeading label="Before booking" title="Simple answers before you message." />
          <FAQAccordion items={faqs.slice(0, 4)} />
        </div>
      </section>

      <BookingCTA />
    </>
  );
}
