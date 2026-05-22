import type { Metadata } from "next";
import { AtSign, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { BookingCTA } from "@/components/BookingCTA";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHero } from "@/components/PageHero";
import { primaryWhatsappHref, tours } from "@/data/content";
import { canonical, emailAddress, instagramHandle, instagramUrl, phoneDisplay } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact and Booking",
  description:
    "Contact Dhermi Boat to book a boat tour from Dhërmi, Albania. WhatsApp booking, phone, email and Instagram.",
  alternates: { canonical: canonical("/contact/") }
};

const contacts = [
  { label: "WhatsApp", value: "Book or ask availability", href: primaryWhatsappHref, icon: MessageCircle },
  { label: "Phone", value: phoneDisplay, href: `tel:${phoneDisplay.replace(/\s/g, "")}`, icon: Phone },
  { label: "Email", value: emailAddress, href: `mailto:${emailAddress}`, icon: Mail },
  { label: "Instagram", value: instagramHandle, href: instagramUrl, icon: AtSign }
];

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact Dhermi Boat" image={tours[2].image} label="Booking">
        <p>
          Send your date, number of guests and preferred route. Booking is confirmed directly on WhatsApp, including the exact meeting point.
        </p>
        <div className="mt-8">
          <ButtonLink href={primaryWhatsappHref} icon={MessageCircle} variant="dark">
            Book on WhatsApp
          </ButtonLink>
        </div>
      </PageHero>

      <section className="bg-pearl py-16 md:py-24">
        <div className="site-band grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-bronze">Practical info</p>
            <h2 className="mt-4 font-serif text-4xl font-medium leading-tight text-ink md:text-5xl">
              A fast booking flow built around WhatsApp.
            </h2>
            <p className="mt-5 text-base leading-8 text-ink-soft">
              Mention the tour you want, your date and the number of adults and children. Routes may change depending
              on sea conditions; safety and comfort come first.
            </p>
            <div className="mt-8 rounded-md border border-ink/10 bg-limestone p-6">
              <p className="flex items-center gap-3 text-base font-semibold text-ink">
                <MapPin className="h-5 w-5 text-turquoise" aria-hidden />
                Departure from the Dhërmi area
              </p>
              <p className="mt-3 text-sm leading-7 text-ink-soft">
                The exact meeting point is sent after availability is confirmed.
              </p>
            </div>
          </div>
          <div className="grid gap-4">
            {contacts.map((contact) => {
              const Icon = contact.icon;
              return (
                <a
                  key={contact.label}
                  className="flex items-center gap-5 rounded-md border border-ink/10 bg-limestone p-5 transition hover:-translate-y-1 hover:shadow-soft"
                  href={contact.href}
                  rel={contact.href.startsWith("http") ? "noreferrer" : undefined}
                  target={contact.href.startsWith("http") ? "_blank" : undefined}
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-pearl text-turquoise">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-[0.2em] text-bronze">{contact.label}</span>
                    <span className="mt-1 block text-base font-semibold text-ink">{contact.value}</span>
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <BookingCTA />
    </>
  );
}
