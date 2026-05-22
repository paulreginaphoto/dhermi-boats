import { MessageCircle } from "lucide-react";
import { BookingCTA } from "@/components/BookingCTA";
import { ButtonLink } from "@/components/ButtonLink";
import { GalleryGrid } from "@/components/GalleryGrid";
import { Icon3D, type Icon3DName } from "@/components/Icon3D";
import { LocalizedText } from "@/components/LocalizedText";
import { PageHero } from "@/components/PageHero";
import type { Tour } from "@/data/content";
import { whatsappUrl } from "@/lib/site";

export function TourDetailPage({ tour }: { tour: Tour }) {
  const translationBase = `tour.${tour.id}`;
  const bookKey =
    tour.id === "private" ? "tour.private.book" : tour.id === "sunset" ? "tour.sunset.book" : tour.id === "fishing" ? "tour.fishing.book" : "tour.book";
  const facts = ([
    { label: "Duration", labelKey: "tour.durationLabel", value: tour.duration, valueKey: `${translationBase}.duration`, icon: "clock" },
    { label: "Price", labelKey: "tour.priceLabel", value: tour.price, valueKey: `${translationBase}.price`, icon: "euro" },
    { label: "Capacity", labelKey: "tour.capacityLabel", value: tour.capacity, valueKey: `${translationBase}.capacity`, icon: "group" },
    { label: "Departure", labelKey: "tour.departureLabel", value: tour.departure, valueKey: `${translationBase}.departure`, icon: "pin" }
  ] satisfies Array<{ label: string; labelKey: string; value: string; valueKey: string; icon: Icon3DName }>).filter((fact) => fact.value);

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
          <ButtonLink href={whatsappUrl(tour.whatsappText)} icon={MessageCircle} variant="dark">
            <LocalizedText id={bookKey}>BOOK THIS TOUR</LocalizedText>
          </ButtonLink>
        </div>
      </PageHero>

      <section className="bg-limestone py-14">
        <div className="site-band">
          <div className="grid gap-3 md:grid-cols-4">
            {facts.map((fact) => (
              <div key={fact.label} className="rounded-md border border-ink/10 bg-pearl p-5">
                <Icon3D name={fact.icon} alt="" size={48} />
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
        <div className="site-band grid gap-10 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-md border border-ink/10 bg-limestone p-6 md:p-8">
            <h2 className="font-serif text-3xl font-medium text-ink">
              <LocalizedText id="tour.detailsLabel">Tour details</LocalizedText>
            </h2>
            <ul className="mt-6 grid gap-3 text-base leading-7 text-ink-soft">
              {tour.included.map((item, index) => (
                <li key={item} className="flex gap-3">
                  <Icon3D name="check" alt="" size={28} />
                  <span>
                    <LocalizedText id={`${translationBase}.included.${index}`}>{item}</LocalizedText>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <GalleryGrid limit={6} />
        </div>
      </section>

      <BookingCTA title={<LocalizedText id="booking.title">Book your boat tour in Dhërmi</LocalizedText>} />
    </>
  );
}
