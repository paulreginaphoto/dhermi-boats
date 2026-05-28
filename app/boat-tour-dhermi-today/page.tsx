import { HotIntentLandingPage, hotIntentMetadata } from "@/components/HotIntentLandingPage";
import { heroImage } from "@/data/content";

export const metadata = hotIntentMetadata({
  slug: "boat-tour-dhermi-today",
  title: "Boat Tour Dhërmi Today | Last-Minute WhatsApp Availability",
  description: "Check today or tomorrow boat tour availability from Dhërmi to Gjipe, Grama Bay and the Blue Cave route. Fast WhatsApp booking with a local skipper."
});

export default function BoatTourDhermiTodayPage() {
  return (
    <HotIntentLandingPage
      slug="boat-tour-dhermi-today"
      title="Boat Tour Dhërmi Today"
      label="Last-minute Dhërmi boat tour"
      heroTitle="Looking for a boat tour from Dhërmi today?"
      heroText="Send your date, group size and preferred route on WhatsApp. The local skipper confirms what is available and safe according to the sea."
      image={heroImage}
      primaryTourId="gjipe"
      bullets={[
        "Choose this if you are already in Dhërmi, Himarë or the Albanian Riviera.",
        "Routes can change depending on wind, waves and cave access.",
        "Choose Gjipe for a shorter trip or Grama Bay for the most complete route.",
        "Private tours are best when your group wants custom timing."
      ]}
    />
  );
}
