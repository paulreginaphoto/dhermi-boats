import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import { BookingCTA } from "@/components/BookingCTA";
import { ButtonLink } from "@/components/ButtonLink";
import { Icon3D, type Icon3DName } from "@/components/Icon3D";
import { LocalizedText } from "@/components/LocalizedText";
import { PageHero } from "@/components/PageHero";
import { primaryWhatsappHref, tours } from "@/data/content";
import { canonical, emailAddress, googleMapsUrl, instagramHandle, instagramUrl, phoneDisplay, tiktokHandle, tiktokUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact and Booking",
  description:
    "Contact Dhermi Boat to book a boat tour from Dhërmi, Albania. WhatsApp booking, phone, email, Google Maps, Instagram and TikTok.",
  alternates: { canonical: canonical("/contact/") }
};

const contacts = [
  { label: "WhatsApp", labelKey: "contact.whatsapp.label", value: "Book or ask availability", valueKey: "contact.whatsapp.value", href: primaryWhatsappHref, icon: "chat" },
  { label: "Phone", labelKey: "contact.phone.label", value: phoneDisplay, href: `tel:${phoneDisplay.replace(/\s/g, "")}`, icon: "phone" },
  { label: "Email", labelKey: "contact.email.label", value: emailAddress, href: `mailto:${emailAddress}`, icon: "email" },
  { label: "Google Maps", labelKey: "contact.google.label", value: "Google Maps", valueKey: "contact.google.value", href: googleMapsUrl, icon: "pin" },
  { label: "Instagram", labelKey: "contact.instagram.label", value: instagramHandle, href: instagramUrl, icon: "camera" },
  { label: "TikTok", labelKey: "contact.tiktok.label", value: tiktokHandle, href: tiktokUrl, icon: "video" }
] satisfies Array<{ label: string; labelKey: string; value: string; valueKey?: string; href: string; icon: Icon3DName }>;

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact Dhermi Boat" image={tours[2].image} label={<LocalizedText id="contact.hero.label">Booking</LocalizedText>}>
        <p>
          <LocalizedText id="contact.hero.text">
            Send a WhatsApp message with your date, number of people and preferred tour. We confirm availability together.
          </LocalizedText>
        </p>
        <div className="mt-8">
          <ButtonLink href={primaryWhatsappHref} icon={MessageCircle} variant="dark">
            <LocalizedText id="cta.book">BOOK YOUR TOUR NOW</LocalizedText>
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
            <div className="mt-8 rounded-md border border-ink/10 bg-limestone p-6">
              <p className="flex items-center gap-3 text-base font-semibold text-ink">
                <Icon3D name="pin" alt="" size={34} />
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
                className="flex items-center gap-5 rounded-md border border-ink/10 bg-limestone p-5 transition hover:-translate-y-1 hover:shadow-soft"
                href={contact.href}
                rel={contact.href.startsWith("http") ? "noreferrer" : undefined}
                target={contact.href.startsWith("http") ? "_blank" : undefined}
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-pearl">
                  <Icon3D name={contact.icon} alt="" size={46} />
                </span>
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
