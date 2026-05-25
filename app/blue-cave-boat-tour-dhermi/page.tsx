import { HotIntentLandingPage, hotIntentMetadata } from "@/components/HotIntentLandingPage";
import { destinations } from "@/data/content";

const blueCave = destinations.find((destination) => destination.id === "blue-cave") ?? destinations[2];

export const metadata = hotIntentMetadata({
  slug: "blue-cave-boat-tour-dhermi",
  title: "Blue Cave Boat Tour from Dhërmi | Grama Bay & Karaburun Route",
  description: "Visit Blue Cave from Dhërmi as part of the Grama Bay and Karaburun boat route. Check availability by WhatsApp with Dhermi Boat."
});

export default function BlueCaveBoatTourDhermiPage() {
  return (
    <HotIntentLandingPage
      slug="blue-cave-boat-tour-dhermi"
      title="Blue Cave Boat Tour from Dhërmi"
      label="Blue Cave and Karaburun"
      heroTitle="Blue Cave is the dream stop. Grama Bay is the full route."
      heroText="The Blue Cave is usually paired with the longer Grama Bay route, depending on safe sea conditions and availability."
      image={blueCave.image}
      primaryTourId="grama"
      bullets={[
        "Best matched with the Grama Bay tour for the most complete coast experience.",
        "Cave access depends on sea conditions and the skipper's safety decision.",
        "Great choice for photos, bright water and a more premium shared route.",
        "Ask on WhatsApp if Blue Cave is realistic for your date."
      ]}
    />
  );
}
