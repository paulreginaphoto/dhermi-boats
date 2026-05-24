import { ArrowRight, Clock3, Euro, HelpCircle, MessageCircle, Users } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { LocalizedText } from "@/components/LocalizedText";
import { primaryWhatsappHref, tourComparison, tours } from "@/data/content";
import { whatsappUrl } from "@/lib/site";
import { tourBookFallback, tourBookKey } from "@/lib/tourBookingCopy";

export function TourComparison() {
  return (
    <section id="compare-tours" className="bg-pearl py-14 md:py-20">
      <div className="site-band">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-bronze">
              <LocalizedText id="comparison.label">Compare tours</LocalizedText>
            </p>
            <h2 className="mt-3 font-serif text-4xl font-medium leading-tight text-ink md:text-5xl">
              <LocalizedText id="comparison.title">Pick by route length, budget and group size</LocalizedText>
            </h2>
          </div>
          <ButtonLink href={primaryWhatsappHref} icon={MessageCircle} variant="primary" whatsappKey="default" analyticsEvent="whatsapp_click">
            <LocalizedText id="comparison.cta">Not sure? Ask us on WhatsApp</LocalizedText>
          </ButtonLink>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-5">
          {tourComparison.map((item, index) => {
            const tour = tours.find((tourItem) => tourItem.id === item.tourId);

            if (!tour) return null;

            return (
              <article
                key={item.tourId}
                className="group flex min-h-[18rem] flex-col rounded-lg border border-ink/10 bg-limestone/80 p-5 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-soft"
              >
                <HelpCircle className="h-5 w-5 text-turquoise" aria-hidden strokeWidth={1.75} />
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-bronze">
                  <LocalizedText id={`comparison.${index}.angle`}>{item.angle}</LocalizedText>
                </p>
                <h3 className="mt-2 font-serif text-2xl font-medium leading-tight text-ink">
                  <LocalizedText id={`tour.${tour.id}.shortTitle`}>{tour.shortTitle}</LocalizedText>
                </h3>
                <dl className="mt-5 grid gap-2 text-sm font-semibold text-ink-soft">
                  <div className="flex items-center gap-2">
                    <Clock3 className="h-4 w-4 text-turquoise" aria-hidden strokeWidth={1.75} />
                    <dt className="sr-only">
                      <LocalizedText id="tour.durationLabel">Duration</LocalizedText>
                    </dt>
                    <dd>
                      <LocalizedText id={`tour.${tour.id}.duration`}>{tour.duration}</LocalizedText>
                    </dd>
                  </div>
                  <div className="flex items-center gap-2">
                    <Euro className="h-4 w-4 text-turquoise" aria-hidden strokeWidth={1.75} />
                    <dt className="sr-only">
                      <LocalizedText id="tour.priceLabel">Price</LocalizedText>
                    </dt>
                    <dd>
                      <LocalizedText id={`tour.${tour.id}.price`}>{tour.price}</LocalizedText>
                    </dd>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-turquoise" aria-hidden strokeWidth={1.75} />
                    <dt className="sr-only">
                      <LocalizedText id="tour.capacityLabel">Capacity</LocalizedText>
                    </dt>
                    <dd>
                      <LocalizedText id={`tour.${tour.id}.capacity`}>{tour.capacity}</LocalizedText>
                    </dd>
                  </div>
                </dl>
                <p className="mt-4 text-sm leading-6 text-ink-soft">
                  <LocalizedText id={`tour.${tour.id}.bestFor`}>{tour.bestFor}</LocalizedText>
                </p>
                <div className="mt-auto grid gap-2 pt-5">
                  <a
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-ink px-3 text-sm font-semibold text-pearl transition hover:bg-navy"
                    data-analytics-event="comparison_book_click"
                    data-tour-id={tour.id}
                    data-whatsapp-key={tour.id}
                    href={whatsappUrl(tour.whatsappText)}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden strokeWidth={1.75} />
                    <LocalizedText id={tourBookKey(tour.id)}>{tourBookFallback(tour.id)}</LocalizedText>
                  </a>
                  <a className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-ink/15 px-3 text-sm font-semibold text-ink transition hover:border-ink/35 hover:bg-white" href={tour.href}>
                    <LocalizedText id="tour.details">See route and price</LocalizedText>
                    <ArrowRight className="h-4 w-4" aria-hidden strokeWidth={1.75} />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
