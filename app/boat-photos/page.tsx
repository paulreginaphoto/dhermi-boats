import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { BookingCTA } from "@/components/BookingCTA";
import { GalleryGrid } from "@/components/GalleryGrid";
import { SocialFeed } from "@/components/SocialFeed";
import { VideoFeature } from "@/components/VideoFeature";
import { LocalizedText } from "@/components/LocalizedText";
import { canonical, googleMapsUrl, languageAlternates } from "@/lib/site";

export const metadata: Metadata = {
  title: "Boat Tour Photos in Dhërmi",
  description:
    "Browse recent Dhermi Boat photos from Gjipe, Grama Bay, Blue Cave and onboard sea clips.",
  alternates: { canonical: canonical("/boat-photos/"), languages: languageAlternates("/boat-photos/") }
};

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
                  Browse recent Dhermi Boat photos from Gjipe, Grama Bay, Blue Cave and onboard sea clips.
                </LocalizedText>
              </span>
            </p>
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

      <SocialFeed />
      <BookingCTA title={<LocalizedText id="booking.title">Book your boat tour in Dhërmi</LocalizedText>} />
    </>
  );
}
