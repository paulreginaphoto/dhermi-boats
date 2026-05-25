import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, MessageCircle } from "lucide-react";
import { BookingCTA } from "@/components/BookingCTA";
import { ButtonLink } from "@/components/ButtonLink";
import { ArrivalComfortBar } from "@/components/ArrivalComfortBar";
import { ConversionTrustBlock } from "@/components/ConversionTrustBlock";
import { DestinationCard } from "@/components/DestinationCard";
import { FAQAccordion } from "@/components/FAQAccordion";
import { GalleryGrid } from "@/components/GalleryGrid";
import { HeroCinematic } from "@/components/HeroCinematic";
import { MotionReveal } from "@/components/MotionReveal";
import { LazyOneMinuteBooking } from "@/components/LazyOneMinuteBooking";
import { ReviewCard } from "@/components/ReviewCard";
import { SectionHeading } from "@/components/SectionHeading";
import { SEOJsonLd } from "@/components/SEOJsonLd";
import { SocialFeed } from "@/components/SocialFeed";
import { TourCard } from "@/components/TourCard";
import { TourComparison } from "@/components/TourComparison";
import { VideoFeature } from "@/components/VideoFeature";
import { LocalizedText } from "@/components/LocalizedText";
import { destinations, faqs, reviews, skipper, tours, usefulInformation, whyChooseUs } from "@/data/content";
import { canonical, googleMapsUrl, languageAlternates } from "@/lib/site";
import { faqSchema, homePageSchema, localBusinessSchema, touristTripSchema, websiteSchema } from "@/lib/seo";
import { whatsappHrefForKey } from "@/lib/whatsappMessages";

export const metadata: Metadata = {
  title: {
    absolute: "Dhermi Boat Tour | Boat Tours from Dhërmi to Gjipe & Grama Bay"
  },
  description:
    "Book a Dhermi boat tour from Dhërmi to Gjipe Beach, Grama Bay, Blue Cave and Karaburun. Small-group and private boat trips by WhatsApp.",
  alternates: { canonical: canonical("/"), languages: languageAlternates("/") }
};

export default function HomePage() {
  return (
    <>
      <SEOJsonLd data={[localBusinessSchema(), websiteSchema(), homePageSchema(), ...tours.map((tour) => touristTripSchema(tour)), faqSchema(faqs)]} />
      <HeroCinematic />

      <ArrivalComfortBar />

      <ConversionTrustBlock />

      <TourComparison />

      <LazyOneMinuteBooking />

      <section className="bg-pearl py-16 md:py-24" id="tours">
        <div className="site-band">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              label={<LocalizedText id="section.tours.label">Tours from Dhërmi</LocalizedText>}
              title={<LocalizedText id="section.tours.title">Compare Dhermi boat tours by route and price</LocalizedText>}
            >
              <p>
                <LocalizedText id="section.tours.text">
                  Choose a Dhermi boat tour for Gjipe, Grama Bay, Blue Cave, a private route, sunset cruise or morning fishing, then confirm the date with the local skipper on WhatsApp.
                </LocalizedText>
              </p>
            </SectionHeading>
            <ButtonLink href="/tours/" variant="secondary">
              <LocalizedText id="cta.viewTours">VIEW TOURS</LocalizedText>
            </ButtonLink>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {tours.map((tour, index) => (
              <MotionReveal key={tour.id} delay={index * 80}>
                <TourCard tour={tour} />
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="below-fold bg-limestone py-16 md:py-24">
        <div className="site-band grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <SectionHeading
              label={<LocalizedText id="section.experiences.label">Private and early tours</LocalizedText>}
              title={<LocalizedText id="section.experiences.title">Sunset, fishing and custom routes</LocalizedText>}
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/private-boat-tour-albania/" variant="primary">
                <LocalizedText id="tour.details">See route and price</LocalizedText>
              </ButtonLink>
              <ButtonLink href={whatsappHrefForKey("private")} icon={MessageCircle} variant="secondary" whatsappKey="private" analyticsTour="private" analyticsPlacement="home_private">
                <LocalizedText id="tour.private.book">Plan a private tour</LocalizedText>
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
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-sand">
              <LocalizedText id="section.destinations.label">Route highlights</LocalizedText>
            </p>
            <h2 className="font-serif text-4xl font-medium leading-[1.04] md:text-5xl">
              <LocalizedText id="section.destinations.title">Caves, beaches and bays</LocalizedText>
            </h2>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {destinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        </div>
      </section>

      <section className="below-fold bg-pearl py-16 md:py-24">
        <div className="site-band grid gap-12 lg:grid-cols-[1fr_0.82fr] lg:items-center">
          <div>
            <SectionHeading
              label={<LocalizedText id="section.social.label">Recent sea photos</LocalizedText>}
              title={<LocalizedText id="section.social.title">Real moments from the boat</LocalizedText>}
            />
          </div>
          <VideoFeature />
        </div>
        <div className="site-band mt-10">
          <GalleryGrid />
        </div>
      </section>

      <SocialFeed />

      <section className="below-fold bg-pearl py-16 md:py-24">
        <div className="site-band grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-sand shadow-image">
            <Image
              src={skipper.image}
              alt={skipper.imageAlt}
              fill
              loading="lazy"
              quality={58}
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-bronze">
              <LocalizedText id="section.skipper.label">Meet your skipper</LocalizedText>
            </p>
            <h2 className="mt-3 font-serif text-4xl font-medium leading-tight text-ink md:text-5xl">
              <LocalizedText id="section.skipper.title">Meet Isuf, your local skipper</LocalizedText>
            </h2>
            <p className="mt-5 text-base leading-8 text-ink-soft">
              <LocalizedText id="section.skipper.text">{skipper.text}</LocalizedText>
            </p>
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
        </div>
      </section>

      <section id="reviews" className="below-fold scroll-mt-24 bg-limestone py-16 md:scroll-mt-28 md:py-24">
        <div className="site-band">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              label={<LocalizedText id="section.reviews.label">Guest reviews</LocalizedText>}
              title={<LocalizedText id="section.reviews.title">Loved by French, Albanian and international guests</LocalizedText>}
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

      <section className="below-fold bg-pearl py-16 md:py-20">
        <div className="site-band">
          <h2 className="font-serif text-4xl font-medium text-ink">
            <LocalizedText id="section.info.title">Departure, weather and payment</LocalizedText>
          </h2>
          <ul className="mt-6 grid gap-3 text-base leading-7 text-ink-soft md:grid-cols-3">
            {usefulInformation.map((item, index) => (
              <li key={item} className="rounded-lg border border-ink/8 bg-limestone/70 p-5">
                <LocalizedText id={`useful.${index}`}>{item}</LocalizedText>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="below-fold bg-pearl py-16 md:py-24">
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
          <FAQAccordion items={faqs} />
        </div>
      </section>

      <BookingCTA />
    </>
  );
}
