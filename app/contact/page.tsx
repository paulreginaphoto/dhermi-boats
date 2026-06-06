import Image from "next/image";
import type { Metadata } from "next";
import { Anchor, Camera, CheckCircle2, Clock, Euro, Mail, MapPin, MessageCircle, Phone, ShieldCheck, Ticket, Video } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { HeroWhatsappText } from "@/components/MicroCopy";
import { LocalizedText } from "@/components/LocalizedText";
import { OneMinuteBooking } from "@/components/OneMinuteBooking";
import { IconFrame, type OutlineIconComponent } from "@/components/OutlineIcon";
import { primaryWhatsappHref, tours } from "@/data/content";
import { conversionAttrs } from "@/lib/conversion";
import { translations } from "@/lib/i18n";
import { canonical, emailAddress, getYourGuideUrl, googleMapsUrl, instagramHandle, instagramUrl, languageAlternates, phoneDisplay, tiktokHandle, tiktokUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Dhermi Boat | WhatsApp Booking",
  description:
    "Contact Dhermi Boat on WhatsApp with date, group size and preferred tour. Compare five tours: Gjipe, Grama, private, sunset and fishing.",
  alternates: { canonical: canonical("/contact/"), languages: languageAlternates("/contact/") }
};

const enText = (key: string) => translations.en[key] ?? "";
const phoneHref = `tel:${phoneDisplay.split(" ").join("")}`;
const heroTour = tours.find((tour) => tour.id === "private") ?? tours[0];

const heroBadges = [
  { id: "contact.badge.reply", icon: Clock },
  { id: "contact.badge.route", icon: Euro },
  { id: "contact.badge.price", icon: CheckCircle2 }
] satisfies Array<{ id: string; icon: OutlineIconComponent }>;

const planningNotes = [
  { titleKey: "contact.departure.title", textKey: "contact.departure.text", icon: MapPin },
  { titleKey: "trust.local.title", textKey: "trust.local.text", icon: Anchor },
  { titleKey: "trust.reviews.title", textKey: "trust.reviews.text", icon: ShieldCheck }
] satisfies Array<{ titleKey: string; textKey: string; icon: OutlineIconComponent }>;

const contacts = [
  { labelKey: "contact.whatsapp.label", valueKey: "contact.whatsapp.value", href: primaryWhatsappHref, icon: MessageCircle, whatsappKey: "default", isWhatsapp: true },
  { labelKey: "contact.phone.label", value: phoneDisplay, href: phoneHref, icon: Phone, analyticsEvent: "call_click" },
  { labelKey: "contact.email.label", value: emailAddress, href: `mailto:${emailAddress}`, icon: Mail, analyticsEvent: "email_click" },
  { labelKey: "contact.google.label", valueKey: "contact.google.value", href: googleMapsUrl, icon: MapPin, analyticsEvent: "maps_click" },
  { labelKey: "contact.instagram.label", value: instagramHandle, href: instagramUrl, icon: Camera, analyticsEvent: "instagram_click" },
  { labelKey: "contact.tiktok.label", value: tiktokHandle, href: tiktokUrl, icon: Video, analyticsEvent: "tiktok_click" },
  { labelKey: "contact.getyourguide.label", valueKey: "contact.getyourguide.value", href: getYourGuideUrl, icon: Ticket, analyticsEvent: "getyourguide_click" }
] satisfies Array<{
  labelKey: string;
  value?: string;
  valueKey?: string;
  href: string;
  icon: OutlineIconComponent;
  whatsappKey?: string;
  isWhatsapp?: boolean;
  analyticsEvent?: string;
}>;

export default function ContactPage() {
  return (
    <>
      <section className="bg-pearl">
        <div className="site-band grid gap-7 py-8 md:gap-9 md:py-14 lg:min-h-[calc(100svh-5rem)] lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-bronze">
              <LocalizedText id="contact.hero.label">{enText("contact.hero.label")}</LocalizedText>
            </p>
            <h1 className="mt-4 font-serif text-[clamp(2.45rem,6.2vw,4.95rem)] font-medium leading-[0.98] text-ink text-balance">
              <LocalizedText id="page.contact.title">{enText("page.contact.title")}</LocalizedText>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-ink-soft md:text-lg">
              <LocalizedText id="contact.hero.text">{enText("contact.hero.text")}</LocalizedText>
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={primaryWhatsappHref} icon={MessageCircle} whatsappKey="default" analyticsPlacement="contact_hero" className="min-h-14 px-6 text-base">
                <HeroWhatsappText />
              </ButtonLink>
              <ButtonLink href={phoneHref} icon={Phone} variant="secondary" analyticsEvent="call_click" className="min-h-14 px-6 text-base">
                <LocalizedText id="cta.call">{enText("cta.call")}</LocalizedText>
              </ButtonLink>
            </div>
            <div className="mt-7 grid grid-cols-3 gap-2">
              {heroBadges.map((item) => (
                <div key={item.id} className="flex min-h-[5.75rem] min-w-0 flex-col gap-2 rounded-lg border border-ink/8 bg-limestone/80 px-3 py-3 text-xs font-bold leading-snug text-ink sm:min-h-14 sm:flex-row sm:items-center sm:gap-3 sm:px-4 sm:text-sm">
                  <IconFrame icon={item.icon} variant="soft" size="sm" />
                  <span className="min-w-0">
                    <LocalizedText id={item.id}>{enText(item.id)}</LocalizedText>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[18rem] overflow-hidden rounded-lg border border-ink/10 bg-ink shadow-image md:min-h-[34rem]">
            <Image
              src={heroTour.image}
              alt={heroTour.imageAlt ?? heroTour.title}
              fill
              priority
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,27,38,0.04),rgba(7,27,38,0.78))]" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-pearl md:p-7">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-sand">
                <LocalizedText id="contact.photo.meta">{enText("contact.photo.meta")}</LocalizedText>
              </p>
              <p className="mt-3 max-w-md font-serif text-3xl font-medium leading-tight md:text-4xl">
                <LocalizedText id="contact.photo.caption">{enText("contact.photo.caption")}</LocalizedText>
              </p>
            </div>
          </div>
        </div>
      </section>

      <OneMinuteBooking />

      <section className="bg-limestone py-14 md:py-20">
        <div className="site-band grid gap-10 lg:grid-cols-[0.86fr_1.14fr]">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-bronze">
              <LocalizedText id="contact.info.label">{enText("contact.info.label")}</LocalizedText>
            </p>
            <h2 className="mt-4 max-w-xl font-serif text-4xl font-medium leading-tight text-ink md:text-5xl">
              <LocalizedText id="contact.info.title">{enText("contact.info.title")}</LocalizedText>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-ink-soft">
              <LocalizedText id="contact.info.text">{enText("contact.info.text")}</LocalizedText>
            </p>
            <div className="mt-8 grid gap-3">
              {planningNotes.map((item) => (
                <div key={item.titleKey} className="flex gap-4 border-t border-ink/10 py-4">
                  <IconFrame icon={item.icon} variant="sand" size="md" />
                  <div className="min-w-0">
                    <p className="font-semibold text-ink">
                      <LocalizedText id={item.titleKey}>{enText(item.titleKey)}</LocalizedText>
                    </p>
                    <p className="mt-1 text-sm leading-6 text-ink-soft">
                      <LocalizedText id={item.textKey}>{enText(item.textKey)}</LocalizedText>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid min-w-0 gap-3 sm:grid-cols-2">
            {contacts.map((contact) => {
              const isWhatsapp = contact.isWhatsapp === true;
              const analyticsData = contact.whatsappKey
                ? conversionAttrs({ tourId: contact.whatsappKey, placement: "contact_card" })
                : { "data-analytics-event": contact.analyticsEvent };

              return (
                <a
                  key={contact.labelKey}
                  className={[
                    "flex min-h-24 items-center gap-4 rounded-lg border p-4 transition duration-300 hover:-translate-y-0.5 hover:shadow-soft active:translate-y-px",
                    isWhatsapp
                      ? "border-ink bg-ink text-pearl sm:col-span-2 hover:bg-navy"
                      : "border-ink/8 bg-pearl text-ink hover:border-ink/18 hover:bg-white"
                  ].join(" ")}
                  data-whatsapp-key={contact.whatsappKey}
                  href={contact.href}
                  rel={contact.href.startsWith("http") ? "noreferrer" : undefined}
                  target={contact.href.startsWith("http") ? "_blank" : undefined}
                  {...analyticsData}
                >
                  <IconFrame icon={contact.icon} variant={isWhatsapp ? "dark" : "soft"} size="lg" />
                  <span className="min-w-0">
                    <span className={isWhatsapp ? "block text-xs font-bold uppercase tracking-[0.18em] text-sand" : "block text-xs font-bold uppercase tracking-[0.18em] text-bronze"}>
                      <LocalizedText id={contact.labelKey}>{enText(contact.labelKey)}</LocalizedText>
                    </span>
                    <span className={isWhatsapp ? "mt-1 block min-w-0 break-words text-lg font-semibold leading-snug text-pearl" : "mt-1 block min-w-0 break-words text-base font-semibold leading-snug text-ink"}>
                      {contact.valueKey ? <LocalizedText id={contact.valueKey}>{contact.value ?? ""}</LocalizedText> : contact.value}
                    </span>
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
