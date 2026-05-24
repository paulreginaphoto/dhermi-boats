import type { Metadata } from "next";
import { TourDetailPage } from "@/components/TourDetailPage";
import { tours } from "@/data/content";
import { canonical, languageAlternates } from "@/lib/site";

const tour = tours.find((item) => item.id === "fishing")!;

export const metadata: Metadata = {
  title: "Morning Fishing Dhermi Boat Tour",
  description: "Morning fishing Dhermi boat tour around Dhërmi from 5 AM to 8 AM with two fishing rods included.",
  alternates: { canonical: canonical("/morning-fishing-tour/"), languages: languageAlternates("/morning-fishing-tour/") },
  openGraph: {
    title: "Morning Fishing Dhermi Boat Tour",
    description: "Morning fishing Dhermi boat tour around Dhërmi from 5 AM to 8 AM with two fishing rods included.",
    url: canonical("/morning-fishing-tour/"),
    type: "website",
    images: [{ url: canonical("/images/tour-fishing.webp"), width: 900, height: 675, alt: tour.imageAlt }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Morning Fishing Dhermi Boat Tour",
    description: "Morning fishing Dhermi boat tour around Dhërmi from 5 AM to 8 AM with two fishing rods included.",
    images: [canonical("/images/tour-fishing.webp")]
  }
};

export default function FishingLegacyPage() {
  return <TourDetailPage tour={tour} />;
}
