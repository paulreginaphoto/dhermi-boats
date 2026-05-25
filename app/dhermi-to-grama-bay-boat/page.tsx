import { HotIntentLandingPage, hotIntentMetadata } from "@/components/HotIntentLandingPage";
import { tours } from "@/data/content";

const gramaTour = tours.find((tour) => tour.id === "grama") ?? tours[1];

export const metadata = hotIntentMetadata({
  slug: "dhermi-to-grama-bay-boat",
  title: "Dhërmi to Grama Bay by Boat | Blue Cave & Karaburun Tour",
  description: "Book the Dhërmi to Grama Bay boat tour with Blue Cave, San Andrea Beach and Karaburun coast stops. Check availability on WhatsApp."
});

export default function DhermiToGramaBayBoatPage() {
  return (
    <HotIntentLandingPage
      slug="dhermi-to-grama-bay-boat"
      title="Dhërmi to Grama Bay by Boat"
      label="Most complete shared route"
      heroTitle="Dhërmi to Grama Bay is the route to sell when guests want the full coast."
      heroText="Grama Bay is the longer, higher-value shared trip with Karaburun, Blue Cave, San Andrea Beach and a stronger sense of adventure."
      image={gramaTour.image}
      primaryTourId="grama"
      bullets={[
        "Best for guests who want more than a short swim stop.",
        "Includes the strongest destination mix: Karaburun, Blue Cave and Grama Bay.",
        "Availability and cave access depend on the sea, so WhatsApp confirmation matters.",
        "A strong upgrade from the 35 € Gjipe route for guests with more time."
      ]}
    />
  );
}
