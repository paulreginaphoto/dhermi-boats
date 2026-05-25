import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, MapPin, MessageCircle } from "lucide-react";
import { BookingCTA } from "@/components/BookingCTA";
import { ButtonLink } from "@/components/ButtonLink";
import { ConversionTrustBlock } from "@/components/ConversionTrustBlock";
import { GalleryGrid } from "@/components/GalleryGrid";
import { SocialFeed } from "@/components/SocialFeed";
import { VideoFeature } from "@/components/VideoFeature";
import { BookingTitleText, CompareToursText, HeroWhatsappText, TourDetailsText } from "@/components/MicroCopy";
import { LocalizedText } from "@/components/LocalizedText";
import { gallery, primaryWhatsappHref, tours } from "@/data/content";
import { canonical, googleMapsUrl, languageAlternates } from "@/lib/site";
import { whatsappHrefForKey } from "@/lib/whatsappMessages";
import { translations } from "@/lib/i18n";

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
    textKey: "photos.conversion.gjipe.text",
    indexes: [0, 3, 4, 2]
  },
  {
    tourId: "grama",
    titleKey: "photos.conversion.grama.title",
    textKey: "photos.conversion.grama.text",
    indexes: [1, 7, 8, 10]
  },
  {
    tourId: "private",
    titleKey: "photos.conversion.private.title",
    textKey: "photos.conversion.private.text",
    indexes: [0, 5, 9, 11]
  },
  {
    tourId: "sunset",
    titleKey: "photos.conversion.sunset.title",
    textKey: "photos.conversion.sunset.text",
    indexes: [6, 11, 9, 2]
  },
  {
    tourId: "fishing",
    titleKey: "photos.conversion.fishing.title",
    textKey: "photos.conversion.fishing.text",
    indexes: [11, 9, 2, 5]
  }
] as const;

const enText = (key: string) => translations.en[key] ?? "";

export default function BoatPhotosLegacyPage() {
  return (
    <>
      <section className="bg-limestone py-12 md:py-16">
        <div className="site-band">
          <div className="max-w-3xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-bronze">
              <LocalizedText id="section.social.label">{enText("section.social.label")}</LocalizedText>
            </p>
            <h1 className="font-serif text-4xl font-medium leading-[1.04] text-ink md:text-5xl">
              <LocalizedText id="page.photos.title">{enText("page.photos.title")}</LocalizedText>
            </h1>
            <p>
              <span className="mt-5 block text-base leading-8 text-ink-soft md:text-lg">
                <LocalizedText id="page.photos.text">{enText("page.photos.text")}</LocalizedText>
              </span>
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={primaryWhatsappHref} icon={MessageCircle} whatsappKey="default" analyticsPlacement="photos_hero">
                <HeroWhatsappText />
              </ButtonLink>
              <ButtonLink href="/tours/" variant="secondary">
                <CompareToursText />
              </ButtonLink>
              <ButtonLink href={googleMapsUrl} icon={MapPin} variant="secondary" analyticsEvent="maps_click">
                <LocalizedText id="section.reviews.cta">{enText("section.reviews.cta")}</LocalizedText>
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
              <LocalizedText id="photos.group.label">{enText("photos.group.label")}</LocalizedText>
            </p>
            <h2 className="mt-3 font-serif text-4xl font-medium leading-tight text-ink md:text-5xl">
              <LocalizedText id="photos.group.title">{enText("photos.group.title")}</LocalizedText>
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
                    <LocalizedText id={group.titleKey}>{enText(group.titleKey)}</LocalizedText>
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-ink-soft">
                    <LocalizedText id={group.textKey}>{enText(group.textKey)}</LocalizedText>
                  </p>
                  <div className="mt-5 grid gap-2">
                    <ButtonLink href={tour.href} icon={ArrowRight} variant="secondary" className="w-full">
                      <TourDetailsText />
                    </ButtonLink>
                    <ButtonLink href={whatsappHrefForKey(group.tourId)} icon={MessageCircle} className="w-full" whatsappKey={group.tourId} analyticsTour={group.tourId} analyticsPlacement="photos_card">
                      <LocalizedText id={`tour.${group.tourId}.book`}>{translations.en[`tour.${group.tourId}.book`] ?? "Ask about this tour"}</LocalizedText>
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
      <BookingCTA title={<BookingTitleText />} />
    </>
  );
}
