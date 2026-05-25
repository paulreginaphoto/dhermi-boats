import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, MapPin, MessageCircle } from "lucide-react";
import { BookingCTA } from "@/components/BookingCTA";
import { ButtonLink } from "@/components/ButtonLink";
import { ConversionTrustBlock } from "@/components/ConversionTrustBlock";
import { GalleryGrid } from "@/components/GalleryGrid";
import { SocialFeed } from "@/components/SocialFeed";
import { VideoFeature } from "@/components/VideoFeature";
import { LocalizedText } from "@/components/LocalizedText";
import { gallery, primaryWhatsappHref, tours } from "@/data/content";
import { canonical, googleMapsUrl, languageAlternates } from "@/lib/site";
import { whatsappHrefForKey } from "@/lib/whatsappMessages";

export const metadata: Metadata = {
  title: "Dhermi Boat Tour Photos",
  description:
    "See real Dhermi boat tour photos grouped by caves, beaches, onboard views, sunset and clear water before booking by WhatsApp.",
  alternates: { canonical: canonical("/boat-photos/"), languages: languageAlternates("/boat-photos/") }
};

const photoConversionGroups = [
  {
    tourId: "gjipe",
    titleKey: "photos.conversion.gjipe.title",
    title: "Gjipe caves and beach",
    textKey: "photos.conversion.gjipe.text",
    text: "Use these photos to judge the shorter cave-and-beach route with a swim stop.",
    indexes: [0, 3, 4, 2]
  },
  {
    tourId: "grama",
    titleKey: "photos.conversion.grama.title",
    title: "Grama Bay and Blue Cave",
    textKey: "photos.conversion.grama.text",
    text: "Choose this set if you want the longer Karaburun route and bright cave water.",
    indexes: [1, 7, 8, 10]
  },
  {
    tourId: "private",
    titleKey: "photos.conversion.private.title",
    title: "Private route ideas",
    textKey: "photos.conversion.private.text",
    text: "Useful when your group wants to choose timing, coves and swimming stops with the skipper.",
    indexes: [0, 5, 9, 11]
  },
  {
    tourId: "sunset",
    titleKey: "photos.conversion.sunset.title",
    title: "Sunset from the boat",
    textKey: "photos.conversion.sunset.text",
    text: "A simple preview for the private sunset tour around the Dhërmi coast.",
    indexes: [6, 11, 9, 2]
  },
  {
    tourId: "fishing",
    titleKey: "photos.conversion.fishing.title",
    title: "Quiet morning at sea",
    textKey: "photos.conversion.fishing.text",
    text: "Use the calm-water photos to decide if the early fishing tour fits your morning.",
    indexes: [11, 9, 2, 5]
  }
] as const;

export default function BoatPhotosLegacyPage() {
  return (
    <>
      <section className="bg-limestone py-12 md:py-16">
        <div className="site-band">
          <div className="max-w-3xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-bronze">
              <LocalizedText id="section.social.label">Recent sea photos</LocalizedText>
            </p>
            <h1 className="font-serif text-4xl font-medium leading-[1.04] text-ink md:text-5xl">
              <LocalizedText id="page.photos.title">Boat tour photos in Dhërmi</LocalizedText>
            </h1>
            <p>
              <span className="mt-5 block text-base leading-8 text-ink-soft md:text-lg">
                <LocalizedText id="page.photos.text">
                  Browse real Dhermi boat tour photos from Gjipe, Grama Bay, Blue Cave, Karaburun coves and onboard sea clips.
                </LocalizedText>
              </span>
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={primaryWhatsappHref} icon={MessageCircle} whatsappKey="default" analyticsPlacement="photos_hero">
                <LocalizedText id="cta.heroWhatsapp">Check availability on WhatsApp</LocalizedText>
              </ButtonLink>
              <ButtonLink href="/tours/" variant="secondary">
                <LocalizedText id="cta.compareTours">Compare tours</LocalizedText>
              </ButtonLink>
              <ButtonLink href={googleMapsUrl} icon={MapPin} variant="secondary">
                <LocalizedText id="section.reviews.cta">Google Maps</LocalizedText>
              </ButtonLink>
            </div>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-[minmax(260px,390px)_1fr] md:items-stretch">
            <VideoFeature />
            <div className="grid grid-cols-2 gap-3">
              {gallery.slice(0, 4).map((item, index) => (
                <figure key={`photos-preview-${item.src}`} className="relative min-h-40 overflow-hidden rounded-lg bg-sand shadow-sm sm:min-h-56 md:min-h-0">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : "low"}
                    decoding="async"
                    quality={52}
                    sizes="(min-width: 768px) 24vw, 50vw"
                    className="object-cover"
                  />
                </figure>
              ))}
            </div>
          </div>
          <div className="mt-10">
            <GalleryGrid priorityFirst />
          </div>
        </div>
      </section>

      <ConversionTrustBlock />

      <section className="bg-pearl py-16 md:py-24">
        <div className="site-band">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-bronze">
              <LocalizedText id="photos.group.label">Photo guide</LocalizedText>
            </p>
            <h2 className="mt-3 font-serif text-4xl font-medium leading-tight text-ink md:text-5xl">
              <LocalizedText id="photos.group.title">See the water, caves and boat before you choose</LocalizedText>
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {photoConversionGroups.map((group) => {
              const tour = tours.find((item) => item.id === group.tourId);
              if (!tour) return null;

              return (
              <article key={group.titleKey} className="overflow-hidden rounded-lg border border-ink/8 bg-limestone shadow-sm">
                <div className="grid grid-cols-2 gap-1 p-1">
                  {group.indexes.slice(0, 4).map((itemIndex) => {
                    const item = gallery[itemIndex];
                    if (!item) return null;

                    return (
                      <div key={`${group.titleKey}-${item.src}`} className="relative aspect-square overflow-hidden rounded-md bg-sand">
                        <Image
                          src={item.src}
                          alt={item.alt}
                          fill
                          loading="lazy"
                          decoding="async"
                          quality={50}
                          sizes="(min-width: 1280px) 15vw, (min-width: 768px) 25vw, 50vw"
                          className="object-cover"
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-2xl font-medium text-ink">
                    <LocalizedText id={group.titleKey}>{group.title}</LocalizedText>
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-ink-soft">
                    <LocalizedText id={group.textKey}>{group.text}</LocalizedText>
                  </p>
                  <div className="mt-5 grid gap-2">
                    <ButtonLink href={tour.href} icon={ArrowRight} variant="secondary" className="w-full">
                      <LocalizedText id="tour.details">See route and price</LocalizedText>
                    </ButtonLink>
                    <ButtonLink href={whatsappHrefForKey(group.tourId)} icon={MessageCircle} className="w-full" whatsappKey={group.tourId} analyticsTour={group.tourId} analyticsPlacement="photos_card">
                      <LocalizedText id={`tour.${group.tourId}.book`}>Ask about this tour</LocalizedText>
                    </ButtonLink>
                  </div>
                </div>
              </article>
              );
            })}
          </div>
        </div>
      </section>

      <SocialFeed />
      <BookingCTA title={<LocalizedText id="booking.title">Book your boat tour in Dhërmi</LocalizedText>} />
    </>
  );
}
