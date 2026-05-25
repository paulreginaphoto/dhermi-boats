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
  { titleKey: "photos.group.caves", title: "Caves", indexes: [1, 2, 4, 7] },
  { titleKey: "photos.group.beaches", title: "Beaches", indexes: [5, 6] },
  { titleKey: "photos.group.onboard", title: "On board", indexes: [0, 3] },
  { titleKey: "photos.group.sunset", title: "Sunset", indexes: [6] },
  { titleKey: "photos.group.clearWater", title: "Clear water", indexes: [0, 2, 3, 7] }
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
            </div>
          </div>
          <div className="mt-8 grid gap-8 md:grid-cols-[1fr_0.5fr] md:items-end">
            <VideoFeature />
            <a
              href={googleMapsUrl}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-ink/15 bg-pearl px-5 text-sm font-semibold text-ink transition hover:border-ink/35 hover:bg-white"
              rel="noreferrer"
              target="_blank"
            >
              <MapPin className="h-4 w-4" aria-hidden />
              <LocalizedText id="section.reviews.cta">Google Maps</LocalizedText>
            </a>
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
