import type { Metadata } from "next";
import { DestinationDetailPage } from "@/components/DestinationDetailPage";
import { destinations } from "@/data/content";
import { canonical, languageAlternates } from "@/lib/site";

const destination = destinations.find((item) => item.id === "grama")!;

export const metadata: Metadata = {
  title: "Grama Bay Tour",
  description:
    "Explore Grama Bay by boat from Dhërmi with Karaburun Natural Park, San Andrea Beach, Blue Cave and Secret Cave.",
  alternates: { canonical: canonical("/destinations/grama-bay/"), languages: languageAlternates("/destinations/grama-bay/") }
};

export default function GramaDestinationPage() {
  return <DestinationDetailPage destination={destination} />;
}
