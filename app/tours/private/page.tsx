import type { Metadata } from "next";
import { ArrowRight, MessageCircle } from "lucide-react";
import { BookingCTA } from "@/components/BookingCTA";
import { ButtonLink } from "@/components/ButtonLink";
import { LocalizedText } from "@/components/LocalizedText";
import { TourDetailPage } from "@/components/TourDetailPage";
import { tours } from "@/data/content";
import { canonical, languageAlternates, whatsappUrl } from "@/lib/site";
import { tourBookFallback, tourBookKey } from "@/lib/tourBookingCopy";

const privateTour = tours.find((tour) => tour.id === "private")!;

export const metadata: Metadata = {
  title: "Private Dhermi Boat Tour Albania",
  description:
    "Book a private Dhermi boat tour from Dhërmi, Albania. Choose your route, swimming stops and timing for families, couples and small groups.",
  alternates: { canonical: canonical("/tours/private/"), languages: languageAlternates("/tours/private/") }
};

export default function PrivateTourPage() {
  return (
    <>
      <TourDetailPage tour={privateTour} />
      <section className="bg-navy py-16 text-pearl md:py-24">
        <div className="site-band grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-sand">
              <LocalizedText id="private.plan.label">Private planning</LocalizedText>
            </p>
            <h2 className="mt-3 font-serif text-4xl font-medium leading-tight md:text-5xl">
              <LocalizedText id="private.plan.title">Plan a private tour in three steps</LocalizedText>
            </h2>
            <p className="mt-5 text-base leading-8 text-pearl/86">
              <LocalizedText id="private.plan.text">
                Send your date, group size and route ideas. The skipper confirms the safest timing and stops according to sea conditions.
              </LocalizedText>
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["1", "private.step.1.title", "Send date and group size", "private.step.1.text", "Tell us your date, number of people and preferred places on WhatsApp."],
              ["2", "private.step.2.title", "Choose route and duration", "private.step.2.text", "Pick at least 2 hours, then agree the route, coves and swim stops with the skipper."],
              ["3", "private.step.3.title", "Confirm with the skipper", "private.step.3.text", "The skipper confirms meeting point, timing and any weather-safe route adjustments."]
            ].map(([number, titleKey, title, textKey, text]) => (
              <article key={String(number)} className="rounded-lg border border-white/12 bg-white/8 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sand text-sm font-bold text-ink">{number}</span>
                <h3 className="mt-5 font-serif text-2xl font-medium">
                  <LocalizedText id={String(titleKey)}>{title}</LocalizedText>
                </h3>
                <p className="mt-3 text-sm leading-7 text-pearl/86">
                  <LocalizedText id={String(textKey)}>{text}</LocalizedText>
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section id="sunset" className="bg-pearl py-16 md:py-24">
        <div className="site-band grid gap-6 md:grid-cols-2">
          {tours.filter((tour) => tour.id === "sunset" || tour.id === "fishing").map((tour) => (
            <article key={tour.id} className="flex h-full flex-col rounded-lg border border-ink/10 bg-limestone/70 p-6 shadow-sm md:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-bronze">
                <LocalizedText id={`tour.${tour.id}.price`}>{tour.price}</LocalizedText>
              </p>
              <h2 className="mt-3 font-serif text-4xl font-medium text-ink">
                <LocalizedText id={`tour.${tour.id}.title`}>{tour.title}</LocalizedText>
              </h2>
              <p className="mt-4 text-base leading-8 text-ink-soft">
                <LocalizedText id={`tour.${tour.id}.subtitle`}>{tour.subtitle}</LocalizedText>
              </p>
              <div className="mt-5 grid gap-2 text-sm font-semibold text-ink-soft sm:grid-cols-2">
                <p>
                  <LocalizedText id="tour.durationLabel">Duration</LocalizedText>
                  {" • "}
                  <LocalizedText id={`tour.${tour.id}.duration`}>{tour.duration}</LocalizedText>
                </p>
                <p>
                  <LocalizedText id="tour.capacityLabel">Capacity</LocalizedText>
                  {" • "}
                  <LocalizedText id={`tour.${tour.id}.capacity`}>{tour.capacity}</LocalizedText>
                </p>
              </div>
              <ul className="mt-6 grid flex-1 gap-2 text-sm font-semibold text-ink">
                {tour.cardHighlights.map((item, index) => (
                  <li key={item}>
                    <LocalizedText id={`tour.${tour.id}.cardHighlight.${index}`}>{item}</LocalizedText>
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={whatsappUrl(tour.whatsappText)} icon={MessageCircle} className="flex-1" whatsappKey={tour.id} analyticsEvent="whatsapp_click">
                  <LocalizedText id={tourBookKey(tour.id)}>{tourBookFallback(tour.id)}</LocalizedText>
                </ButtonLink>
                <ButtonLink href={tour.href} icon={ArrowRight} variant="secondary" className="flex-1">
                  <LocalizedText id="tour.details">See route and price</LocalizedText>
                </ButtonLink>
              </div>
            </article>
          ))}
        </div>
      </section>
      <BookingCTA title={<LocalizedText id="booking.title">Book your boat tour in Dhërmi</LocalizedText>} />
    </>
  );
}
