import type { Metadata } from "next";
import { OneMinuteBooking } from "@/components/OneMinuteBooking";
import { canonical, languageAlternates } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Dhermi Boat | Booking form",
  description:
    "Fill one simple Dhermi Boat booking form, then send the completed request by WhatsApp or email.",
  alternates: { canonical: canonical("/contact/"), languages: languageAlternates("/contact/") }
};

export default function ContactPage() {
  return <OneMinuteBooking mode="contact" />;
}
