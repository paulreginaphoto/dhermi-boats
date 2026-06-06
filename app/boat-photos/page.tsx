import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, MessageCircle } from "lucide-react";
import { BookingCTA } from "@/components/BookingCTA";
import { ButtonLink } from "@/components/ButtonLink";
import { ConversionTrustBlock } from "@/components/ConversionTrustBlock";
import { GalleryGrid } from "@/components/GalleryGrid";
import { SocialFeed } from "@/components/SocialFeed";
import { VideoFeature } from "@/components/VideoFeature";
import { BookingTitleText, CompareToursText, HeroWhatsappText } from "@/components/MicroCopy";
import { LocalizedText } from "@/components/LocalizedText";
import { gallery, primaryWhatsappHref } from "@/data/content";
import { canonical, googleMapsUrl, languageAlternates } from "@/lib/site";
import { translations } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Dhermi Boat Tour Photos",
  description:
    "See Dhermi Boat photos from Gjipe, Grama Bay, Blue Cave routes, sunset trips and Dhërmi swim stops before booking by WhatsApp.",
  alternates: { canonical: canonical("/boat-photos/"), languages: languageAlternates("/boat-photos/") }
};

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

      <SocialFeed />
      <BookingCTA title={<BookingTitleText />} />
    </>
  );
}
