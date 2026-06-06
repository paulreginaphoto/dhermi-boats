import { ArrowRight, CheckCircle2, Clock3, MessageCircle, Route, Users } from "lucide-react";
import { BrandProofStrip } from "@/components/BrandProofStrip";
import { ButtonLink } from "@/components/ButtonLink";
import { ConversionTrustBlock } from "@/components/ConversionTrustBlock";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import type { Tour } from "@/data/content";
import { bookingFormHrefForKey } from "@/lib/bookingLinks";

type LandingFact = {
  label: string;
  value: string;
};

type LandingStep = {
  title: string;
  text: string;
};

type LandingFAQ = {
  question: string;
  answer: string;
};

export function SEOLandingPage({
  eyebrow,
  title,
  summary,
  image,
  imageAlt,
  primaryTourId,
  facts,
  introTitle,
  intro,
  steps,
  tours,
  faqs,
  finalTitle,
  finalText
}: {
  eyebrow: string;
  title: string;
  summary: string;
  image: string;
  imageAlt: string;
  primaryTourId: string;
  facts: LandingFact[];
  introTitle: string;
  intro: string;
  steps: LandingStep[];
  tours: Tour[];
  faqs: LandingFAQ[];
  finalTitle: string;
  finalText: string;
}) {
  return (
    <>
      <PageHero title={title} image={image} imageAlt={imageAlt} label={eyebrow}>
        <p>{summary}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={bookingFormHrefForKey(primaryTourId)} icon={MessageCircle} variant="dark" whatsappKey={primaryTourId} analyticsTour={primaryTourId} analyticsPlacement="seo_landing_hero">
            Check availability
          </ButtonLink>
          <ButtonLink href="/tours/" icon={ArrowRight} variant="secondary" className="border-white/0 bg-pearl text-ink shadow-sm hover:bg-white">
            Compare tours
          </ButtonLink>
        </div>
      </PageHero>

      <ConversionTrustBlock />

      <section className="bg-limestone py-6 md:py-10">
        <div className="site-band">
          <div className="grid gap-3 md:grid-cols-3">
            {facts.map((fact) => (
              <div key={fact.label} className="rounded-lg border border-ink/8 bg-pearl p-4 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-bronze">{fact.label}</p>
                <p className="mt-2 text-base font-semibold leading-6 text-ink">{fact.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-pearl py-12 md:py-20">
        <div className="site-band grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <SectionHeading label="Local boat tours" title={introTitle}>
              <p>{intro}</p>
            </SectionHeading>
            <BrandProofStrip className="mt-6" />
          </div>
          <div className="grid gap-4">
            {steps.map((step, index) => (
              <article key={step.title} className="grid gap-4 rounded-lg border border-ink/8 bg-limestone/70 p-5 shadow-sm sm:grid-cols-[3rem_1fr]">
                <span className="flex h-11 w-11 items-center justify-center rounded-md bg-ink text-sm font-bold text-pearl">
                  {index + 1}
                </span>
                <div>
                  <h2 className="font-serif text-2xl font-medium leading-tight text-ink">{step.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-ink-soft md:text-base">{step.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-limestone py-12 md:py-20">
        <div className="site-band">
          <SectionHeading label="Choose the right route" title="Dhermi boat tour options for this search">
            <p>Start with the route that matches your day. Every button opens the same simple booking form with the tour already selected.</p>
          </SectionHeading>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {tours.map((tour) => (
              <article key={tour.id} className="flex h-full flex-col rounded-lg border border-ink/8 bg-pearl p-5 shadow-sm">
                <h2 className="font-serif text-2xl font-medium leading-tight text-ink">{tour.shortTitle}</h2>
                <p className="mt-2 text-sm font-semibold leading-6 text-turquoise">{tour.bestFor}</p>
                <dl className="mt-5 grid gap-3 text-sm">
                  <div className="flex gap-3 rounded-md bg-limestone/70 p-3">
                    <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-turquoise" aria-hidden />
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-[0.14em] text-bronze">Duration</dt>
                      <dd className="mt-1 font-semibold text-ink">{tour.duration}</dd>
                    </div>
                  </div>
                  <div className="flex gap-3 rounded-md bg-limestone/70 p-3">
                    <Users className="mt-0.5 h-4 w-4 shrink-0 text-turquoise" aria-hidden />
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-[0.14em] text-bronze">Group</dt>
                      <dd className="mt-1 font-semibold text-ink">{tour.capacity}</dd>
                    </div>
                  </div>
                  <div className="flex gap-3 rounded-md bg-limestone/70 p-3">
                    <Route className="mt-0.5 h-4 w-4 shrink-0 text-turquoise" aria-hidden />
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-[0.14em] text-bronze">Price</dt>
                      <dd className="mt-1 font-semibold text-ink">{tour.price}</dd>
                    </div>
                  </div>
                </dl>
                <ul className="mt-5 grid flex-1 gap-2 text-sm leading-6 text-ink-soft">
                  {tour.cardHighlights.slice(0, 4).map((highlight) => (
                    <li key={highlight} className="flex gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-turquoise" aria-hidden />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <a
                    className="inline-flex min-h-11 items-center justify-center rounded-md bg-ink px-4 text-sm font-semibold text-pearl transition hover:bg-navy"
                    data-tour-id={tour.id}
                    data-whatsapp-key={tour.id}
                    href={bookingFormHrefForKey(tour.id)}
                  >
                    Book this tour
                  </a>
                  <a className="inline-flex min-h-11 items-center justify-center rounded-md border border-ink/12 px-4 text-sm font-semibold text-ink transition hover:bg-white" href={tour.href}>
                    Details
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-pearl py-12 md:py-20">
        <div className="site-band grid gap-10 lg:grid-cols-[0.72fr_1fr]">
          <SectionHeading label="Fast answers" title="Before you book">
            <p>Short answers for people comparing boat tours in Dhërmi right now.</p>
          </SectionHeading>
          <div className="divide-y divide-ink/10 rounded-md border border-ink/10 bg-limestone/70">
            {faqs.map((faq) => (
              <details key={faq.question} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-base font-semibold text-ink [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span className="text-turquoise transition group-open:rotate-45">+</span>
                </summary>
                <p className="px-5 pb-6 text-sm leading-7 text-ink-soft md:text-base">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink text-pearl">
        <div className="mx-auto grid max-w-site gap-8 px-5 py-14 md:grid-cols-[1fr_auto] md:items-center md:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-sand">Direct booking</p>
            <h2 className="mt-3 font-serif text-4xl font-medium leading-tight md:text-5xl">{finalTitle}</h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-pearl/88">{finalText}</p>
          </div>
          <ButtonLink href={bookingFormHrefForKey(primaryTourId)} icon={MessageCircle} variant="dark" whatsappKey={primaryTourId} analyticsTour={primaryTourId} analyticsPlacement="seo_landing_final">
            Open booking form
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
