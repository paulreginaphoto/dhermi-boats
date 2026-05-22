import type { Metadata } from "next";
import { TourDetailPage } from "@/components/TourDetailPage";
import { tours } from "@/data/content";
import { canonical } from "@/lib/site";

const tour = tours.find((item) => item.id === "grama")!;

export const metadata: Metadata = {
  title: "Grama Bay Boat Tour",
  description:
    "Grama Bay boat tour from Dhërmi with Karaburun Natural Park, San Andrea Beach, Blue Cave, Grama Beach and Secret Cave.",
  alternates: { canonical: canonical("/destinations/grama-bay/") }
};

export default function GramaLegacyPage() {
  return <TourDetailPage tour={tour} />;
}

