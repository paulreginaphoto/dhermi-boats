import type { Metadata } from "next";
import { TourDetailPage } from "@/components/TourDetailPage";
import { tours } from "@/data/content";
import { canonical, languageAlternates } from "@/lib/site";

const tour = tours.find((item) => item.id === "gjipe")!;

export const metadata: Metadata = {
  title: "Gjipe Boat Tour from Dhërmi",
  description:
    "Book the 1h30 Gjipe boat tour from Dhërmi with Pirates Cave, Pigeon Cave, nearby coves and a 30-minute swim stop from 35 EUR.",
  alternates: { canonical: canonical("/gjipe-boat-tour/"), languages: languageAlternates("/gjipe-boat-tour/") },
  openGraph: {
    title: "Gjipe Boat Tour from Dhërmi",
    description: "Book the 1h30 Gjipe boat tour from Dhërmi with Pirates Cave, Pigeon Cave, nearby coves and a 30-minute swim stop from 35 EUR.",
    url: canonical("/gjipe-boat-tour/"),
    type: "website",
    images: [{ url: canonical("/images/tour-gjipe.webp"), width: 900, height: 675, alt: tour.imageAlt }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Gjipe Boat Tour from Dhërmi",
    description: "Book the 1h30 Gjipe boat tour from Dhërmi with Pirates Cave, Pigeon Cave, nearby coves and a 30-minute swim stop from 35 EUR.",
    images: [canonical("/images/tour-gjipe.webp")]
  }
};

export default function GjipeLegacyPage() {
  return <TourDetailPage tour={tour} />;
}
