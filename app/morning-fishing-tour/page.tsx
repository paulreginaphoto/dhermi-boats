import type { Metadata } from "next";
import { TourDetailPage } from "@/components/TourDetailPage";
import { tours } from "@/data/content";
import { canonical } from "@/lib/site";

const tour = tours.find((item) => item.id === "fishing")!;

export const metadata: Metadata = {
  title: "Morning Fishing Tour",
  description: "Morning fishing tour around Dhërmi from 5 AM to 8 AM with two fishing rods included.",
  alternates: { canonical: canonical("/tours/private/#fishing") }
};

export default function FishingLegacyPage() {
  return <TourDetailPage tour={tour} />;
}

