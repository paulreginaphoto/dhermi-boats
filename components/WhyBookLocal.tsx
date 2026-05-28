import { Anchor, CheckCircle2, Languages, MessageCircle, ShieldCheck, Star } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { LocalizedText } from "@/components/LocalizedText";
import { primaryWhatsappHref, reviews } from "@/data/content";
import { googleMapsUrl } from "@/lib/site";
import { translations } from "@/lib/i18n";

const reasons = [
  "why.reason.0",
  "why.reason.1",
  "why.reason.2",
  "why.reason.3",
  "why.reason.4",
  "why.reason.5"
];

const proofCards = [
  {
    icon: Anchor,
    titleKey: "why.card.local.title",
    textKey: "why.card.local.text"
  },
  {
    icon: ShieldCheck,
    titleKey: "why.card.safety.title",
    textKey: "why.card.safety.text"
  },
  {
    icon: Languages,
    titleKey: "why.card.languages.title",
    textKey: "why.card.languages.text"
  }
];

const enText = (key: string) => translations.en[key] ?? "";

export function WhyBookLocal() {
  const review = reviews[0];

  return (
    <section className="below-fold bg-navy py-16 text-pearl md:py-28">
      <div className="site-band grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-sand">
            <LocalizedText id="why.label">{enText("why.label")}</LocalizedText>
          </p>
          <h2 className="mt-4 max-w-3xl font-serif text-4xl font-medium leading-[1.02] text-white md:text-6xl">
            <LocalizedText id="why.title">{enText("why.title")}</LocalizedText>
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-pearl/82">
            <LocalizedText id="why.text">{enText("why.text")}</LocalizedText>
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink
              href={primaryWhatsappHref}
              icon={MessageCircle}
              variant="dark"
              whatsappKey="default"
              analyticsPlacement="why_book_local"
            >
              <LocalizedText id="cta.askWhatsapp">{enText("cta.askWhatsapp")}</LocalizedText>
            </ButtonLink>
            <ButtonLink href={googleMapsUrl} icon={Star} variant="ghost" className="border border-white/15 text-pearl hover:bg-white/10" analyticsEvent="maps_click">
              <LocalizedText id="section.reviews.cta">{enText("section.reviews.cta")}</LocalizedText>
            </ButtonLink>
          </div>
        </div>

        <div className="grid gap-5">
          <div className="grid gap-3 rounded-lg border border-white/10 bg-white/[0.055] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur sm:grid-cols-3">
            {proofCards.map((card) => {
              const Icon = card.icon;

              return (
                <div key={card.titleKey} className="rounded-md bg-white/8 p-4">
                  <Icon className="h-6 w-6 text-sand" aria-hidden strokeWidth={1.75} />
                  <p className="mt-4 text-sm font-extrabold text-white">
                    <LocalizedText id={card.titleKey}>{enText(card.titleKey)}</LocalizedText>
                  </p>
                  <p className="mt-1 text-sm leading-6 text-pearl/76">
                    <LocalizedText id={card.textKey}>{enText(card.textKey)}</LocalizedText>
                  </p>
                </div>
              );
            })}
          </div>

          <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <blockquote className="rounded-lg border border-white/10 bg-pearl p-6 text-ink shadow-image">
              <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-bronze">
                <LocalizedText id="why.review.label">{enText("why.review.label")}</LocalizedText>
              </p>
              <p className="mt-4 font-serif text-2xl leading-[1.2] text-ink">“{review.text}”</p>
              <p className="mt-4 text-sm font-bold text-ink-soft">{review.name}</p>
            </blockquote>
            <ul className="grid gap-3 rounded-lg border border-white/10 bg-white/[0.055] p-5">
              {reasons.map((reason) => (
                <li key={reason} className="flex gap-3 text-sm font-semibold leading-6 text-pearl/86">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sand" aria-hidden strokeWidth={1.75} />
                  <span>
                    <LocalizedText id={reason}>{enText(reason)}</LocalizedText>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
