import type { Metadata } from "next";
import { Camera, Mail, MapPin, MessageCircle, Phone, Ticket, Video } from "lucide-react";
import { BookingCTA } from "@/components/BookingCTA";
import { ButtonLink } from "@/components/ButtonLink";
import { LocalizedText } from "@/components/LocalizedText";
import { IconFrame, type OutlineIconComponent } from "@/components/OutlineIcon";
import { PageHero } from "@/components/PageHero";
import { primaryWhatsappHref, tours } from "@/data/content";
import { canonical, emailAddress, getYourGuideUrl, googleMapsUrl, instagramHandle, instagramUrl, phoneDisplay, tiktokHandle, tiktokUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact and Booking",
  description:
    "Contact Dhermi Boat to book a boat tour from Dhërmi, Albania. WhatsApp booking, phone, email, Google Maps, Instagram, TikTok and GetYourGuide.",
  alternates: { canonical: canonical("/contact/") }
};

const contacts = [
  { label: "WhatsApp", labelKey: "contact.whatsapp.label", value: "Book or ask availability", valueKey: "contact.whatsapp.value", href: primaryWhatsappHref, icon: MessageCircle },
  { label: "Phone", labelKey: "contact.phone.label", value: phoneDisplay, href: `tel:${phoneDisplay.replace(/\s/g, "")}`, icon: Phone },
  { label: "Email", labelKey: "contact.email.label", value: emailAddress, href: `mailto:${emailAddress}`, icon: Mail },
  { label: "Google Maps", labelKey: "contact.google.label", value: "Google Maps", valueKey: "contact.google.value", href: googleMapsUrl, icon: MapPin },
  { label: "Instagram", labelKey: "contact.instagram.label", value: instagramHandle, href: instagramUrl, icon: Camera },
  { label: "TikTok", labelKey: "contact.tiktok.label", value: tiktokHandle, href: tiktokUrl, icon: Video },
  { label: "GetYourGuide", labelKey: "contact.getyourguide.label", value: "GetYourGuide", valueKey: "contact.getyourguide.value", href: getYourGuideUrl, icon: Ticket }
] satisfies Array<{ label: string; labelKey: string; value: string; valueKey?: string; href: string; icon: OutlineIconComponent }>;

export default function ContactPage() {
  return (
    <>
      <PageHero
        title={<LocalizedText id="page.contact.title">Contact Dhermi Boat</LocalizedText>}
        image={tours[2].image}
        label={<LocalizedText id="contact.hero.label">Booking</LocalizedText>}
      >
        <p>
          <LocalizedText id="contact.hero.text">
            Send a WhatsApp message with your date, number of people and preferred tour. We confirm availability together.
          </LocalizedText>
        </p>
        <div className="mt-8">
          <ButtonLink href={primaryWhatsappHref} icon={MessageCircle} variant="dark">
            <LocalizedText id="cta.book">Book now</LocalizedText>
          </ButtonLink>
        </div>
      </PageHero>

      <section className="bg-pearl py-16 md:py-24">
        <div className="site-band grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-bronze">
              <LocalizedText id="contact.info.label">Practical info</LocalizedText>
            </p>
            <h2 className="mt-4 font-serif text-4xl font-medium leading-tight text-ink md:text-5xl">
              <LocalizedText id="contact.info.title">Useful information</LocalizedText>
            </h2>
            <p className="mt-5 text-base leading-8 text-ink-soft">
              <LocalizedText id="contact.info.text">
                Departure from the Dhërmi area. Booking recommended in high season. Routes may change depending on sea conditions.
              </LocalizedText>
            </p>
            <div className="mt-8 rounded-lg border border-ink/8 bg-limestone/70 p-6">
              <p className="flex items-center gap-3 text-base font-semibold text-ink">
                <IconFrame icon={MapPin} variant="soft" size="sm" />
                <LocalizedText id="contact.departure.title">Departure from the Dhërmi area</LocalizedText>
              </p>
              <p className="mt-3 text-sm leading-7 text-ink-soft">
                <LocalizedText id="contact.departure.text">Routes may change depending on sea conditions.</LocalizedText>
              </p>
            </div>
          </div>
          <div className="grid gap-4">
            {contacts.map((contact) => (
              <a
                key={contact.label}
                className="flex items-center gap-5 rounded-lg border border-ink/8 bg-limestone/70 p-5 transition duration-300 hover:-translate-y-1 hover:bg-pearl hover:shadow-soft"
                href={contact.href}
                rel={contact.href.startsWith("http") ? "noreferrer" : undefined}
                target={contact.href.startsWith("http") ? "_blank" : undefined}
              >
                <IconFrame icon={contact.icon} variant="soft" size="lg" />
                <span>
                  <span className="block text-xs font-bold uppercase tracking-[0.2em] text-bronze">
                    <LocalizedText id={contact.labelKey}>{contact.label}</LocalizedText>
                  </span>
                  <span className="mt-1 block text-base font-semibold text-ink">
                    {contact.valueKey ? <LocalizedText id={contact.valueKey}>{contact.value}</LocalizedText> : contact.value}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <BookingCTA />
    </>
  );
}
