import type { Metadata } from "next";
import { OneMinuteBooking } from "@/components/OneMinuteBooking";
import { canonical, languageAlternates } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Dhermi Boat | Booking form",
  description:
    "Send tour, date, group size and name to Dhermi Boat by WhatsApp or email from the booking form.",
  alternates: { canonical: canonical("/contact/"), languages: languageAlternates("/contact/") }
};

export default function ContactPage() {
  return <OneMinuteBooking mode="contact" />;
}
