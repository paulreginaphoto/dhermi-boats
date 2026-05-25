import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, MessageCircle } from "lucide-react";
import { BookingCTA } from "@/components/BookingCTA";
import { ButtonLink } from "@/components/ButtonLink";
import { GalleryGrid } from "@/components/GalleryGrid";
import { SocialFeed } from "@/components/SocialFeed";
import { VideoFeature } from "@/components/VideoFeature";
import { LocalizedText } from "@/components/LocalizedText";
import { gallery, primaryWhatsappHref } from "@/data/content";
import { canonical, googleMapsUrl, languageAlternates } from "@/lib/site";

export const metadata: Metadata = {
  title: "Dhermi Boat Tour Photos",
  description:
    "See real Dhermi boat tour photos grouped by caves, beaches, onboard views, sunset and clear water before booking by WhatsApp.",
  alternates: { canonical: canonical("/boat-photos/"), languages: languageAlternates("/boat-photos/") }
};

const photoGroups = [
  { titleKey: "photos.group.caves", title: "Caves", indexes: [0, 1, 3, 7] },
  { titleKey: "photos.group.beaches", title: "Beaches", indexes: [4, 5, 9, 10] },
  { titleKey: "photos.group.onboard", title: "On board", indexes: [0, 3, 5, 11] },
  { titleKey: "photos.group.sunset", title: "Sunset", indexes: [6] },
  { titleKey: "photos.group.clearWater", title: "Clear water", indexes: [1, 2, 8, 9] }
];

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
              <ButtonLink href={primaryWhatsappHref} icon={MessageCircle} whatsappKey="default" analyticsEvent="photos_whatsapp_click">
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
            {photoGroups.map((group) => (
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
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SocialFeed />
      <BookingCTA title={<LocalizedText id="booking.title">Book your boat tour in Dhërmi</LocalizedText>} />
    </>
  );
}
