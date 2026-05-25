import { Anchor, Languages, MapPin, Star, TicketCheck } from "lucide-react";
import { LocalizedText } from "@/components/LocalizedText";
import { IconFrame, type OutlineIconComponent } from "@/components/OutlineIcon";
import { getYourGuideUrl, googleMapsUrl } from "@/lib/site";
import { translations } from "@/lib/i18n";

const enText = (key: string) => translations.en[key] ?? "";

const trustItems = [
  {
    icon: Anchor,
    titleKey: "trust.local.title",
    textKey: "trust.local.text",
  },
  {
    icon: Languages,
    titleKey: "trust.languages.title",
    textKey: "trust.languages.text",
  },
  {
    icon: Star,
    titleKey: "trust.reviews.title",
    textKey: "trust.reviews.text",
  }
];

export function ConversionTrustBlock({ className = "" }: { className?: string }) {
  return (
    <section className={["bg-pearl py-8 md:py-10", className].join(" ")}>
      <div className="site-band">
        <div className="grid gap-4 rounded-lg border border-ink/8 bg-limestone/70 p-4 md:grid-cols-[1fr_auto] md:items-center md:p-5">
          <div className="grid gap-3 sm:grid-cols-3">
            {trustItems.map((item) => (
                <div key={item.titleKey} className="flex gap-3">
                  <IconFrame icon={item.icon} variant="soft" size="sm" />
                  <div>
                    <p className="text-sm font-bold text-ink">
                      <LocalizedText id={item.titleKey}>{enText(item.titleKey)}</LocalizedText>
                    </p>
                    <p className="mt-1 text-sm leading-6 text-ink-soft">
                      <LocalizedText id={item.textKey}>{enText(item.textKey)}</LocalizedText>
                    </p>
                  </div>
                </div>
            ))}
          </div>
          <div className="flex flex-col gap-2 sm:flex-row md:flex-col">
            <a className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-ink/12 bg-white px-4 text-sm font-semibold text-ink transition hover:border-ink/28 hover:bg-pearl" data-analytics-event="maps_click" href={googleMapsUrl} rel="noreferrer" target="_blank">
              <MapPin className="h-4 w-4 text-turquoise" aria-hidden strokeWidth={1.75} />
              <LocalizedText id="trust.google">{enText("trust.google")}</LocalizedText>
            </a>
            <a className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-ink/12 bg-white px-4 text-sm font-semibold text-ink transition hover:border-ink/28 hover:bg-pearl" data-analytics-event="getyourguide_click" href={getYourGuideUrl} rel="noreferrer" target="_blank">
              <TicketCheck className="h-4 w-4 text-turquoise" aria-hidden strokeWidth={1.75} />
              <LocalizedText id="trust.getyourguide">{enText("trust.getyourguide")}</LocalizedText>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
