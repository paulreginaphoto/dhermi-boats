import { ArrowLeft, CheckCircle2, Clock3, CloudSun, Euro, ListChecks, Luggage, MapPin, MessageCircle, Sparkles, Users } from "lucide-react";
import { BookingCTA } from "@/components/BookingCTA";
import { ButtonLink } from "@/components/ButtonLink";
import { FAQAccordion } from "@/components/FAQAccordion";
import { GalleryGrid } from "@/components/GalleryGrid";
import { LocalizedText } from "@/components/LocalizedText";
import { IconFrame, type OutlineIconComponent } from "@/components/OutlineIcon";
import { PageHero } from "@/components/PageHero";
import { SEOJsonLd } from "@/components/SEOJsonLd";
import type { Tour } from "@/data/content";
import { canonical, phoneDisplay, whatsappUrl } from "@/lib/site";

function imageCanonical(image: string) {
  const imagePath = image.includes("/images/") ? `/images/${image.split("/images/").pop()}` : image;
  return canonical(imagePath);
}

export function TourDetailPage({ tour }: { tour: Tour }) {
  const translationBase = `tour.${tour.id}`;
  const bookKey =
    tour.id === "private" ? "tour.private.book" : tour.id === "sunset" ? "tour.sunset.book" : tour.id === "fishing" ? "tour.fishing.book" : "tour.book";
  const facts = ([
    { label: "Duration", labelKey: "tour.durationLabel", value: tour.duration, valueKey: `${translationBase}.duration`, icon: Clock3 },
    { label: "Price", labelKey: "tour.priceLabel", value: tour.price, valueKey: `${translationBase}.price`, icon: Euro },
    { label: "Capacity", labelKey: "tour.capacityLabel", value: tour.capacity, valueKey: `${translationBase}.capacity`, icon: Users },
    { label: "Best for", labelKey: "tour.bestForLabel", value: tour.bestFor, valueKey: `${translationBase}.bestFor`, icon: Sparkles },
    { label: "Departure", labelKey: "tour.departureLabel", value: tour.departure, valueKey: `${translationBase}.departure`, icon: MapPin }
  ] satisfies Array<{ label: string; labelKey: string; value: string; valueKey: string; icon: OutlineIconComponent }>).filter((fact) => fact.value);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      name: tour.title,
      description: tour.subtitle || tour.included.join(", "),
      image: imageCanonical(tour.image),
      touristType: tour.type === "private" ? "Private boat tour" : "Small-group boat tour",
      itinerary: tour.itinerary.join(", "),
      offers: {
        "@type": "Offer",
        priceCurrency: "EUR",
        description: tour.price,
        availability: "https://schema.org/InStock",
        url: canonical(tour.href)
      },
      provider: {
        "@type": "LocalBusiness",
        name: "Dhermi Boat",
        telephone: phoneDisplay
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Boat tours in Dhërmi",
          item: canonical("/")
        },
        {
          "@type": "ListItem",
          position: 2,
          name: tour.shortTitle,
          item: canonical(tour.href)
        }
      ]
    }
  ];

  return (
    <>
      <SEOJsonLd data={schema} />
      <PageHero
        title={<LocalizedText id={`${translationBase}.title`}>{tour.title}</LocalizedText>}
        image={tour.image}
        label={<LocalizedText id="tour.detailsLabel">Tour details</LocalizedText>}
      >
        <p>
          <LocalizedText id={`${translationBase}.subtitle`}>{tour.subtitle}</LocalizedText>
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={whatsappUrl(tour.whatsappText)} icon={MessageCircle} variant="dark" whatsappKey={tour.id} analyticsEvent="whatsapp_click">
            <LocalizedText id={bookKey}>Book this tour</LocalizedText>
          </ButtonLink>
          <ButtonLink href="/tours/" icon={ArrowLeft} variant="secondary" className="border-white/25 bg-white/10 text-white hover:bg-white/18">
            <LocalizedText id="tour.backAll">All tours</LocalizedText>
          </ButtonLink>
        </div>
      </PageHero>

      <section className="bg-limestone py-8 md:py-14">
        <div className="site-band">
          <div className="grid gap-3 md:grid-cols-5">
            {facts.map((fact) => (
              <div key={fact.label} className="rounded-lg border border-ink/8 bg-pearl/90 p-4 shadow-sm md:p-5">
                <div className="flex items-center gap-4 md:block">
                  <IconFrame icon={fact.icon} variant="soft" size="lg" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-bronze md:mt-4 md:tracking-[0.2em]">
                      <LocalizedText id={fact.labelKey}>{fact.label}</LocalizedText>
                    </p>
                    <p className="mt-1 text-base font-semibold leading-6 text-ink md:mt-2">
                      <LocalizedText id={fact.valueKey}>{fact.value}</LocalizedText>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-pearl py-12 md:py-24">
        <div className="site-band grid gap-8 lg:grid-cols-[0.92fr_0.56fr] lg:items-start">
          <div className="grid gap-6">
            <article className="rounded-lg border border-ink/8 bg-limestone/70 p-6 md:p-8">
              <h2 className="font-serif text-3xl font-medium text-ink">
                <LocalizedText id="tour.itineraryTitle">Itinerary</LocalizedText>
              </h2>
              <ol className="mt-6 grid gap-4 text-base leading-7 text-ink-soft">
                {tour.itinerary.map((item, index) => (
                  <li key={item} className="grid grid-cols-[2rem_1fr] gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-sm font-bold text-pearl">{index + 1}</span>
                    <span>
                      <LocalizedText id={`${translationBase}.itinerary.${index}`}>{item}</LocalizedText>
                    </span>
                  </li>
                ))}
              </ol>
            </article>

            <div className="grid gap-6 md:grid-cols-2">
              <article className="rounded-lg border border-ink/8 bg-limestone/70 p-6 md:p-8">
                <IconFrame icon={ListChecks} variant="soft" size="lg" />
                <h2 className="mt-4 font-serif text-3xl font-medium text-ink">
                  <LocalizedText id="tour.includedTitle">What’s included</LocalizedText>
                </h2>
                <ul className="mt-5 grid gap-3 text-base leading-7 text-ink-soft">
                  {tour.included.map((item, index) => (
                    <li key={item} className="flex gap-3">
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-turquoise" aria-hidden strokeWidth={1.75} />
                      <span>
                        <LocalizedText id={`${translationBase}.included.${index}`}>{item}</LocalizedText>
                      </span>
                    </li>
                  ))}
                </ul>
              </article>

              <article className="rounded-lg border border-ink/8 bg-limestone/70 p-6 md:p-8">
                <IconFrame icon={Luggage} variant="soft" size="lg" />
                <h2 className="mt-4 font-serif text-3xl font-medium text-ink">
                  <LocalizedText id="tour.bringTitle">What to bring</LocalizedText>
                </h2>
                <ul className="mt-5 grid gap-3 text-base leading-7 text-ink-soft">
                  {tour.bring.map((item, index) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-bronze" />
                      <span>
                        <LocalizedText id={`${translationBase}.bring.${index}`}>{item}</LocalizedText>
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>

            <article className="rounded-lg border border-ink/8 bg-limestone/70 p-6 md:p-8">
              <IconFrame icon={CloudSun} variant="soft" size="lg" />
              <h2 className="mt-4 font-serif text-3xl font-medium text-ink">
                <LocalizedText id="tour.safetyTitle">Safety and weather</LocalizedText>
              </h2>
              <p className="mt-4 text-base leading-8 text-ink-soft">
                <LocalizedText id={`${translationBase}.safetyNote`}>{tour.safetyNote}</LocalizedText>
              </p>
            </article>
          </div>

          <aside className="rounded-lg border border-white/10 bg-ink p-6 text-pearl shadow-image lg:sticky lg:top-28">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-sand">
              <LocalizedText id="booking.panel.label">WhatsApp booking</LocalizedText>
            </p>
            <h2 className="mt-3 font-serif text-3xl font-medium">
              <LocalizedText id="booking.panel.title">Ready to book?</LocalizedText>
            </h2>
            <dl className="mt-6 grid gap-4 border-y border-white/10 py-5">
              {facts.slice(0, 4).map((fact) => (
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
            <ButtonLink href={whatsappUrl(tour.whatsappText)} icon={MessageCircle} variant="dark" className="mt-6 w-full" whatsappKey={tour.id} analyticsEvent="whatsapp_click">
              <LocalizedText id={bookKey}>Book this tour</LocalizedText>
            </ButtonLink>
            <p className="mt-4 text-sm leading-7 text-pearl/88">
              <LocalizedText id="booking.panel.text">
                Send your date, number of people and preferred tour. We confirm availability together.
              </LocalizedText>
            </p>
          </aside>
        </div>
      </section>

      <section className="bg-limestone py-12 md:py-20">
        <div className="site-band grid gap-10 lg:grid-cols-[0.7fr_1fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-bronze">
              <LocalizedText id={`${translationBase}.bestFor`}>{tour.bestFor}</LocalizedText>
            </p>
            <h2 className="mt-3 font-serif text-4xl font-medium leading-tight text-ink md:text-5xl">
              <LocalizedText id="tour.bestForTitle">Who it’s best for</LocalizedText>
            </h2>
          </div>
          <FAQAccordion items={tour.detailFaqs} translationPrefix={`${translationBase}.faq`} />
        </div>
      </section>

      <section className="bg-pearl py-12 md:py-20">
        <div className="site-band">
          <GalleryGrid limit={6} />
        </div>
      </section>

      <BookingCTA title={<LocalizedText id="booking.title">Book your boat tour in Dhërmi</LocalizedText>} />
    </>
  );
}
