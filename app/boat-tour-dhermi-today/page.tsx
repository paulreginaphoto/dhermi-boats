import type { Metadata } from "next";
import { SEOLandingPage } from "@/components/SEOLandingPage";
import { SEOJsonLd } from "@/components/SEOJsonLd";
import { orderedTours } from "@/data/content";
import { canonical, languageAlternates } from "@/lib/site";
import { breadcrumbSchema, faqSchema, serviceLandingPageSchema, touristTripSchema } from "@/lib/seo";

const routePath = "/boat-tour-dhermi-today/";
const selectedTours = orderedTours.filter((tour) => ["gjipe", "grama", "private"].includes(tour.id));
const heroTour = selectedTours[0] ?? orderedTours[0]!;
const faqs = [
  {
    question: "Can I book a Dhermi boat tour today?",
    answer: "Yes. Same-day seats depend on the sea, route and group size. Use the booking form with your date and preferred tour so we can reply with the available options."
  },
  {
    question: "Which Dhermi boat tour is easiest for today?",
    answer: "Gjipe is usually the easiest same-day choice because it is shorter. Grama is longer, and private tours work well when your group needs a custom time."
  },
  {
    question: "Do I need to choose the route before messaging?",
    answer: "No. Send your date and group size first. We help you choose between Gjipe, Grama, private, sunset and fishing."
  }
];

export const metadata: Metadata = {
  title: "Boat Tour Dhermi Today | Same-Day Availability",
  description:
    "Check same-day Dhermi boat tour availability for Gjipe, Grama Bay, private routes, sunset and fishing. Clear prices, local skipper and fast booking form.",
  alternates: { canonical: canonical(routePath), languages: languageAlternates(routePath) }
};

export default function BoatTourDhermiTodayPage() {
  return (
    <>
      <SEOJsonLd
        data={[
          ...serviceLandingPageSchema({
            path: routePath,
            name: "Boat tour Dhermi today",
            description: "Same-day Dhermi boat tour availability for Gjipe, Grama Bay, private routes, sunset tours and fishing.",
            serviceType: "Same-day boat tour booking",
            keywords: ["boat tour Dhermi today", "Dhermi boat tour today", "same day Dhermi boat tour"]
          }),
          ...selectedTours.map((tour) => touristTripSchema(tour)),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Dhermi boat tours", url: "/" },
            { name: "Boat tour Dhermi today", url: routePath }
          ])
        ]}
      />
      <SEOLandingPage
        eyebrow="Same-day availability"
        title="Boat tour Dhermi today"
        summary="Need a boat from Dhërmi today? Choose a route, send the form, and get the realistic available options before you commit."
        image={heroTour.image}
        imageAlt={heroTour.imageAlt ?? "Dhermi boat tour on clear Albanian Riviera water"}
        primaryTourId="gjipe"
        facts={[
          { label: "Fastest route", value: "Gjipe: 1h30 from 35 € / adult" },
          { label: "Full route", value: "Grama Bay: 3h30 from 75 € / adult" },
          { label: "Custom timing", value: "Private boat from 200 € / hour" }
        ]}
        introTitle="Same-day booking works best when the message is complete."
        intro="The form asks for the exact details that matter: tour, date, time, adults, children and name. That keeps WhatsApp clean and helps us answer with real availability instead of asking five questions."
        steps={[
          { title: "Pick the closest match", text: "Choose Gjipe for a shorter trip, Grama for the longer Karaburun route, or private if your group needs a custom time." },
          { title: "Send one complete request", text: "The booking form builds the WhatsApp message for you. No empty template, no manual editing inside WhatsApp." },
          { title: "Confirm what is actually available", text: "We reply with the route and time that fits the sea conditions and remaining places." }
        ]}
        tours={selectedTours}
        faqs={faqs}
        finalTitle="Check today before the good slots disappear."
        finalText="Send the form with your group size and preferred route. If today is full, we will point you to the next best option."
      />
    </>
  );
}
