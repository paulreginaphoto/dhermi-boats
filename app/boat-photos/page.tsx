import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { GalleryGrid } from "@/components/GalleryGrid";
import { SocialFeed } from "@/components/SocialFeed";
import { VideoFeature } from "@/components/VideoFeature";
import { SectionHeading } from "@/components/SectionHeading";
import { LocalizedText } from "@/components/LocalizedText";
import { canonical, googleMapsUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Dhermi boat photos",
  description:
    "Photos of Dhermi boat tours on the Albanian Riviera, with clear-water coves, rocky cliffs and sunset moments.",
  alternates: { canonical: canonical("/boat-photos/") }
};

export default function BoatPhotosLegacyPage() {
  return (
    <>
      <section className="bg-limestone py-12 md:py-16">
        <div className="site-band">
          <SectionHeading
            label={<LocalizedText id="section.social.label">Our latest photos</LocalizedText>}
            title={<LocalizedText id="section.social.title">Our latest photos</LocalizedText>}
          />
          <div className="mt-8 grid gap-8 md:grid-cols-[1fr_0.5fr] md:items-end">
            <VideoFeature />
            <a
              href={googleMapsUrl}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-ink/15 bg-pearl px-5 text-sm font-semibold text-ink transition hover:border-ink/35 hover:bg-white"
              rel="noreferrer"
              target="_blank"
            >
              <MapPin className="h-4 w-4" aria-hidden />
              View on Google Maps
            </a>
          </div>
          <div className="mt-10">
            <GalleryGrid />
          </div>
        </div>
      </section>

      <div className="bg-pearl">
        <div className="site-band">
          <SocialFeed />
        </div>
      </div>
    </>
  );
}
