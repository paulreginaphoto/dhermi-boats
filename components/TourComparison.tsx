import { HelpCircle, MessageCircle } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { LocalizedText } from "@/components/LocalizedText";
import { primaryWhatsappHref, tourComparison, tours } from "@/data/content";

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

        <div className="mt-10 grid gap-3 lg:grid-cols-5">
          {tourComparison.map((item, index) => {
            const tour = tours.find((tourItem) => tourItem.id === item.tourId);

            if (!tour) return null;

            return (
              <a
                key={item.tourId}
                className="group flex min-h-[12rem] flex-col rounded-lg border border-ink/10 bg-limestone/80 p-5 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-soft"
                href={tour.href}
              >
                <HelpCircle className="h-5 w-5 text-turquoise" aria-hidden strokeWidth={1.75} />
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-bronze">
                  <LocalizedText id={`comparison.${index}.angle`}>{item.angle}</LocalizedText>
                </p>
                <h3 className="mt-2 font-serif text-2xl font-medium leading-tight text-ink">
                  <LocalizedText id={`tour.${tour.id}.shortTitle`}>{tour.shortTitle}</LocalizedText>
                </h3>
                <p className="mt-auto pt-5 text-sm font-semibold text-ink-soft">
                  <LocalizedText id={`comparison.${index}.meta`}>
                    {item.duration} • {item.price}
                  </LocalizedText>
                </p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
