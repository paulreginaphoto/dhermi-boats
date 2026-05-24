import type { Metadata } from "next";
import { DestinationDetailPage } from "@/components/DestinationDetailPage";
import { destinations } from "@/data/content";
import { canonical, languageAlternates } from "@/lib/site";

const destination = destinations.find((item) => item.id === "gjipe")!;

export const metadata: Metadata = {
  title: "Gjipe Boat Tour",
  description:
    "Visit Gjipe by boat from Dhërmi with Pirates Cave, Pigeon Cave, 2 nearby coves and a swim stop at Gjipe Beach.",
  alternates: { canonical: canonical("/destinations/gjipe/"), languages: languageAlternates("/destinations/gjipe/") }
};

export default function GjipeDestinationPage() {
  return <DestinationDetailPage destination={destination} />;
}
