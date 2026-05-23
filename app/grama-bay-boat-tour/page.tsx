import type { Metadata } from "next";
import { TourDetailPage } from "@/components/TourDetailPage";
import { tours } from "@/data/content";
import { canonical, languageAlternates } from "@/lib/site";

const tour = tours.find((item) => item.id === "grama")!;

export const metadata: Metadata = {
  title: "Grama Bay Boat Tour from Dhërmi",
  description:
    "Grama Bay boat tour from Dhërmi with Karaburun Natural Park, San Andrea Beach, Blue Cave, Grama Beach and Secret Cave.",
  alternates: { canonical: canonical("/grama-bay-boat-tour/"), languages: languageAlternates("/grama-bay-boat-tour/") },
  openGraph: {
    title: "Grama Bay Boat Tour from Dhërmi",
    description: "Grama Bay boat tour from Dhërmi with Karaburun Natural Park, San Andrea Beach, Blue Cave, Grama Beach and Secret Cave.",
    url: canonical("/grama-bay-boat-tour/"),
    type: "website",
    images: [{ url: canonical("/images/tour-grama.webp"), width: 900, height: 675, alt: tour.imageAlt }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Grama Bay Boat Tour from Dhërmi",
    description: "Grama Bay boat tour from Dhërmi with Karaburun Natural Park, San Andrea Beach, Blue Cave, Grama Beach and Secret Cave.",
    images: [canonical("/images/tour-grama.webp")]
  }
};

export default function GramaLegacyPage() {
  return <TourDetailPage tour={tour} />;
}
