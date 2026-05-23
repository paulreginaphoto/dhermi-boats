import { CheckCircle2, Clock3, Euro, MapPin, MessageCircle, Users } from "lucide-react";
import { BookingCTA } from "@/components/BookingCTA";
import { ButtonLink } from "@/components/ButtonLink";
import { GalleryGrid } from "@/components/GalleryGrid";
import { LocalizedText } from "@/components/LocalizedText";
import { IconFrame, type OutlineIconComponent } from "@/components/OutlineIcon";
import { PageHero } from "@/components/PageHero";
import type { Tour } from "@/data/content";
import { whatsappUrl } from "@/lib/site";

export function TourDetailPage({ tour }: { tour: Tour }) {
  const translationBase = `tour.${tour.id}`;
  const bookKey =
    tour.id === "private" ? "tour.private.book" : tour.id === "sunset" ? "tour.sunset.book" : tour.id === "fishing" ? "tour.fishing.book" : "tour.book";
  const facts = ([
    { label: "Duration", labelKey: "tour.durationLabel", value: tour.duration, valueKey: `${translationBase}.duration`, icon: Clock3 },
    { label: "Price", labelKey: "tour.priceLabel", value: tour.price, valueKey: `${translationBase}.price`, icon: Euro },
    { label: "Capacity", labelKey: "tour.capacityLabel", value: tour.capacity, valueKey: `${translationBase}.capacity`, icon: Users },
    { label: "Departure", labelKey: "tour.departureLabel", value: tour.departure, valueKey: `${translationBase}.departure`, icon: MapPin }
  ] satisfies Array<{ label: string; labelKey: string; value: string; valueKey: string; icon: OutlineIconComponent }>).filter((fact) => fact.value);

  return (
    <>
      <PageHero
        title={<LocalizedText id={`${translationBase}.title`}>{tour.title}</LocalizedText>}
        image={tour.image}
        label={<LocalizedText id="tour.detailsLabel">Tour details</LocalizedText>}
      >
        {tour.subtitle ? (
          <p>
            <LocalizedText id={`${translationBase}.subtitle`}>{tour.subtitle}</LocalizedText>
          </p>
        ) : null}
        <div className="mt-8">
          <ButtonLink href={whatsappUrl(tour.whatsappText)} icon={MessageCircle} variant="dark" whatsappKey={tour.id}>
            <LocalizedText id={bookKey}>BOOK THIS TOUR</LocalizedText>
          </ButtonLink>
        </div>
      </PageHero>

      <section className="bg-limestone py-16">
        <div className="site-band">
          <div className="grid gap-3 md:grid-cols-4">
            {facts.map((fact) => (
              <div key={fact.label} className="rounded-lg border border-ink/8 bg-pearl/88 p-5 shadow-sm">
                <IconFrame icon={fact.icon} variant="soft" size="lg" />
                <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-bronze">
                  <LocalizedText id={fact.labelKey}>{fact.label}</LocalizedText>
                </p>
                <p className="mt-2 text-base font-semibold text-ink">
                  <LocalizedText id={fact.valueKey}>{fact.value}</LocalizedText>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-pearl py-16 md:py-24">
        <div className="site-band grid gap-8 lg:grid-cols-[0.92fr_0.56fr] lg:items-start">
          <div className="rounded-lg border border-ink/8 bg-limestone/70 p-6 md:p-8">
            <h2 className="font-serif text-3xl font-medium text-ink">
              <LocalizedText id="tour.detailsLabel">Tour details</LocalizedText>
            </h2>
            <ul className="mt-6 grid gap-3 text-base leading-7 text-ink-soft">
              {tour.included.map((item, index) => (
                <li key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-turquoise" aria-hidden strokeWidth={1.75} />
                  <span>
                    <LocalizedText id={`${translationBase}.included.${index}`}>{item}</LocalizedText>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <aside className="rounded-lg border border-white/10 bg-ink p-6 text-pearl shadow-image lg:sticky lg:top-28">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-sand">
              <LocalizedText id="booking.panel.label">WhatsApp booking</LocalizedText>
            </p>
            <h2 className="mt-3 font-serif text-3xl font-medium">
              <LocalizedText id="booking.panel.title">Ready to book?</LocalizedText>
            </h2>
            <dl className="mt-6 grid gap-4 border-y border-white/10 py-5">
              {facts.map((fact) => (
                <div key={fact.label} className="grid grid-cols-[0.42fr_1fr] gap-4">
                  <dt className="text-xs font-bold uppercase tracking-[0.18em] text-sand">
                    <LocalizedText id={fact.labelKey}>{fact.label}</LocalizedText>
                  </dt>
                  <dd className="text-sm font-semibold leading-6 text-pearl">
                    <LocalizedText id={fact.valueKey}>{fact.value}</LocalizedText>
                  </dd>
                </div>
              ))}
            </dl>
            <ButtonLink href={whatsappUrl(tour.whatsappText)} icon={MessageCircle} variant="dark" className="mt-6 w-full" whatsappKey={tour.id}>
              <LocalizedText id={bookKey}>Book this tour</LocalizedText>
            </ButtonLink>
            <p className="mt-4 text-sm leading-7 text-pearl/88">
              <LocalizedText id="booking.panel.text">
                Send your date, number of people and preferred tour. We confirm availability together.
              </LocalizedText>
            </p>
          </aside>
        </div>
        <div className="site-band mt-10">
          <GalleryGrid limit={6} />
        </div>
      </section>

      <BookingCTA title={<LocalizedText id="booking.title">Book your boat tour in Dhërmi</LocalizedText>} />
    </>
  );
}
