import type { Metadata } from "next";
import { TourDetailPage } from "@/components/TourDetailPage";
import { tours } from "@/data/content";
import { canonical, languageAlternates } from "@/lib/site";

const tour = tours.find((item) => item.id === "private")!;

export const metadata: Metadata = {
  title: "Private Boat Tour from Dhërmi Albania",
  description:
    "Book a private Dhermi boat tour from Dhërmi, Albania. Choose your duration, route, swimming stops and destinations from 200 EUR per hour.",
  alternates: { canonical: canonical("/private-boat-tour-albania/"), languages: languageAlternates("/private-boat-tour-albania/") },
  openGraph: {
    title: "Private Boat Tour from Dhërmi Albania",
    description: "Book a private Dhermi boat tour from Dhërmi, Albania. Choose your duration, route, swimming stops and destinations from 200 EUR per hour.",
    url: canonical("/private-boat-tour-albania/"),
    type: "website",
    images: [{ url: canonical("/images/tour-private.webp"), width: 900, height: 675, alt: tour.imageAlt }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Private Boat Tour from Dhërmi Albania",
    description: "Book a private Dhermi boat tour from Dhërmi, Albania. Choose your duration, route, swimming stops and destinations from 200 EUR per hour.",
    images: [canonical("/images/tour-private.webp")]
  }
};

export default function PrivateLegacyPage() {
  return <TourDetailPage tour={tour} />;
}
