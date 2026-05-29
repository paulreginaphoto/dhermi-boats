import type { Metadata } from "next";
import { CalendarDays, Camera, Compass, Mail, MapPin, MessageCircle, MessageSquareText, Phone, Ticket, UserRound, Users, Video } from "lucide-react";
import { BookingCTA } from "@/components/BookingCTA";
import { ButtonLink } from "@/components/ButtonLink";
import { ConversionTrustBlock } from "@/components/ConversionTrustBlock";
import { HeroWhatsappText } from "@/components/MicroCopy";
import { LocalizedText } from "@/components/LocalizedText";
import { OneMinuteBooking } from "@/components/OneMinuteBooking";
import { IconFrame, type OutlineIconComponent } from "@/components/OutlineIcon";
import { PageHero } from "@/components/PageHero";
import { primaryWhatsappHref, tours } from "@/data/content";
import { conversionAttrs } from "@/lib/conversion";
import { translations } from "@/lib/i18n";
import { canonical, emailAddress, getYourGuideUrl, googleMapsUrl, instagramHandle, instagramUrl, languageAlternates, phoneDisplay, tiktokHandle, tiktokUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Dhermi Boat Tours",
  description:
    "Contact Dhermi Boat on WhatsApp with date, group size, preferred tour, name and question. Phone, email, Google Maps and social links are secondary.",
  alternates: { canonical: canonical("/contact/"), languages: languageAlternates("/contact/") }
};

const enText = (key: string) => translations.en[key] ?? "";

const contacts = [
  { labelKey: "contact.whatsapp.label", value: "", valueKey: "contact.whatsapp.value", href: primaryWhatsappHref, icon: MessageCircle, whatsappKey: "default", isWhatsapp: true },
  { labelKey: "contact.phone.label", value: phoneDisplay, href: `tel:${phoneDisplay.split(" ").join("")}`, icon: Phone, analyticsEvent: "call_click" },
  { labelKey: "contact.email.label", value: emailAddress, href: `mailto:${emailAddress}`, icon: Mail, analyticsEvent: "email_click" },
  { labelKey: "contact.google.label", value: "", valueKey: "contact.google.value", href: googleMapsUrl, icon: MapPin, analyticsEvent: "maps_click" },
  { labelKey: "contact.instagram.label", value: instagramHandle, href: instagramUrl, icon: Camera, analyticsEvent: "instagram_click" },
  { labelKey: "contact.tiktok.label", value: tiktokHandle, href: tiktokUrl, icon: Video, analyticsEvent: "tiktok_click" },
  { labelKey: "contact.getyourguide.label", value: "", valueKey: "contact.getyourguide.value", href: getYourGuideUrl, icon: Ticket, analyticsEvent: "getyourguide_click" }
] satisfies Array<{
  labelKey: string;
  value: string;
  valueKey?: string;
  href: string;
  icon: OutlineIconComponent;
  whatsappKey?: string;
  isWhatsapp?: boolean;
  analyticsEvent?: string;
}>;

const bookingDetailItems = [
  { id: "contact.message.date", icon: CalendarDays },
  { id: "contact.message.group", icon: Users },
  { id: "contact.message.tour", icon: Compass },
  { id: "contact.message.name", icon: UserRound },
  { id: "contact.message.question", icon: MessageSquareText }
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        title={<LocalizedText id="page.contact.title">{enText("page.contact.title")}</LocalizedText>}
        image={tours[2].image}
        imageAlt={tours[2].imageAlt}
        label={<LocalizedText id="contact.hero.label">{enText("contact.hero.label")}</LocalizedText>}
      >
        <p>
          <LocalizedText id="contact.hero.text">{enText("contact.hero.text")}</LocalizedText>
        </p>
        <div className="mt-8">
          <ButtonLink href={primaryWhatsappHref} icon={MessageCircle} variant="dark" whatsappKey="default" analyticsPlacement="contact_hero">
            <HeroWhatsappText />
          </ButtonLink>
        </div>
      </PageHero>

      <OneMinuteBooking />

      <ConversionTrustBlock />

      <section className="bg-limestone py-12 md:py-16">
        <div className="site-band">
          <div className="rounded-lg border border-ink/8 bg-pearl p-6 shadow-sm md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-bronze">
              <LocalizedText id="contact.message.label">{enText("contact.message.label")}</LocalizedText>
            </p>
            <h2 className="mt-3 font-serif text-4xl font-medium leading-tight text-ink md:text-5xl">
              <LocalizedText id="contact.message.title">{enText("contact.message.title")}</LocalizedText>
            </h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {bookingDetailItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.id} className="flex items-center gap-3 rounded-md border border-ink/8 bg-limestone/70 p-4 text-sm font-semibold text-ink">
                    <Icon className="h-4 w-4 shrink-0 text-turquoise" aria-hidden />
                    <LocalizedText id={item.id}>{translations.en[item.id] ?? ""}</LocalizedText>
                  </div>
                );
              })}
            </div>
            <div className="mt-8">
              <ButtonLink href={primaryWhatsappHref} icon={MessageCircle} whatsappKey="default" analyticsPlacement="contact_panel">
                <HeroWhatsappText />
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-pearl py-16 md:py-24">
        <div className="site-band grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-bronze">
              <LocalizedText id="contact.info.label">{enText("contact.info.label")}</LocalizedText>
            </p>
            <h2 className="mt-4 font-serif text-4xl font-medium leading-tight text-ink md:text-5xl">
              <LocalizedText id="contact.info.title">{enText("contact.info.title")}</LocalizedText>
            </h2>
            <p className="mt-5 text-base leading-8 text-ink-soft">
              <LocalizedText id="contact.info.text">{enText("contact.info.text")}</LocalizedText>
            </p>
            <div className="mt-8 rounded-lg border border-ink/8 bg-limestone/70 p-6">
              <p className="flex items-center gap-3 text-base font-semibold text-ink">
                <IconFrame icon={MapPin} variant="soft" size="sm" />
                <LocalizedText id="contact.departure.title">{enText("contact.departure.title")}</LocalizedText>
              </p>
              <p className="mt-3 text-sm leading-7 text-ink-soft">
                <LocalizedText id="contact.departure.text">{enText("contact.departure.text")}</LocalizedText>
              </p>
            </div>
          </div>
          <div className="grid gap-4">
            {contacts.map((contact) => {
              const isWhatsapp = contact.isWhatsapp === true;
              const analyticsData = contact.whatsappKey
                ? conversionAttrs({ tourId: contact.whatsappKey, placement: "contact_card" })
                : { "data-analytics-event": contact.analyticsEvent };

              return (
              <a
                key={contact.labelKey}
                className={[
                  "flex items-center gap-5 rounded-lg border p-5 transition duration-300 hover:-translate-y-1 hover:shadow-soft",
                  isWhatsapp
                    ? "border-ink bg-ink text-pearl hover:bg-navy"
                    : "border-ink/8 bg-limestone/70 text-ink hover:bg-pearl"
                ].join(" ")}
                data-whatsapp-key={contact.whatsappKey}
                href={contact.href}
                rel={contact.href.startsWith("http") ? "noreferrer" : undefined}
                target={contact.href.startsWith("http") ? "_blank" : undefined}
                {...analyticsData}
              >
                <IconFrame icon={contact.icon} variant={isWhatsapp ? "dark" : "soft"} size="lg" />
                <span>
                  <span className={isWhatsapp ? "block text-xs font-bold uppercase tracking-[0.2em] text-sand" : "block text-xs font-bold uppercase tracking-[0.2em] text-bronze"}>
                    <LocalizedText id={contact.labelKey}>{translations.en[contact.labelKey] ?? ""}</LocalizedText>
                  </span>
                  <span className={isWhatsapp ? "mt-1 block text-base font-semibold text-pearl" : "mt-1 block text-base font-semibold text-ink"}>
                    {contact.valueKey ? <LocalizedText id={contact.valueKey}>{contact.value}</LocalizedText> : contact.value}
                  </span>
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
