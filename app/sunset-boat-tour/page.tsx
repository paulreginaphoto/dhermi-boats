import type { Metadata } from "next";
import { TourDetailPage } from "@/components/TourDetailPage";
import { tours } from "@/data/content";
import { canonical, languageAlternates } from "@/lib/site";

const tour = tours.find((item) => item.id === "sunset")!;

export const metadata: Metadata = {
  title: "Sunset Private Boat Tour from Dhërmi",
  description: "Private sunset boat tour around Dhërmi from 120 € for two people.",
  alternates: { canonical: canonical("/sunset-boat-tour/"), languages: languageAlternates("/sunset-boat-tour/") },
  openGraph: {
    title: "Sunset Private Boat Tour from Dhërmi",
    description: "Private sunset boat tour around Dhërmi from 120 € for two people.",
    url: canonical("/sunset-boat-tour/"),
    type: "website",
    images: [{ url: canonical("/images/tour-sunset.webp"), width: 900, height: 675, alt: tour.imageAlt }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Sunset Private Boat Tour from Dhërmi",
    description: "Private sunset boat tour around Dhërmi from 120 € for two people.",
    images: [canonical("/images/tour-sunset.webp")]
  }
};

export default function SunsetLegacyPage() {
  return <TourDetailPage tour={tour} />;
}
