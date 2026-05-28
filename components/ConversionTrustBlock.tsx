import { Anchor, Languages, MapPin, Star, TicketCheck } from "lucide-react";
import { IconFrame } from "@/components/OutlineIcon";
import { getYourGuideUrl, googleMapsUrl } from "@/lib/site";
import { LocalizedText } from "@/components/LocalizedText";
import { translations } from "@/lib/i18n";

const trustItems = [
  {
    icon: Anchor,
    titleKey: "trust.local.title",
  },
  {
    icon: Languages,
    titleKey: "trust.languages.title",
  },
  {
    icon: Star,
    titleKey: "trust.reviews.title",
  }
];

const enText = (key: string) => translations.en[key] ?? "";

export function ConversionTrustBlock({ className = "" }: { className?: string }) {
  return (
    <section className={["bg-pearl py-6 md:py-8", className].join(" ")}>
      <div className="site-band">
        <div className="flex flex-col gap-4 border-y border-ink/10 py-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-3 md:gap-5">
            {trustItems.map((item) => (
              <div key={item.titleKey} className="flex items-center gap-2">
                <IconFrame icon={item.icon} variant="soft" size="sm" />
                <p className="text-sm font-bold text-ink">
                  <LocalizedText id={item.titleKey}>{enText(item.titleKey)}</LocalizedText>
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <a className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-ink/12 bg-white px-4 text-sm font-semibold text-ink transition hover:border-ink/28 hover:bg-limestone" data-analytics-event="maps_click" href={googleMapsUrl} rel="noreferrer" target="_blank">
              <MapPin className="h-4 w-4 text-turquoise" aria-hidden strokeWidth={1.75} />
              <LocalizedText id="trust.google">{enText("trust.google")}</LocalizedText>
            </a>
            <a className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-ink/12 bg-white px-4 text-sm font-semibold text-ink transition hover:border-ink/28 hover:bg-limestone" data-analytics-event="getyourguide_click" href={getYourGuideUrl} rel="noreferrer" target="_blank">
              <TicketCheck className="h-4 w-4 text-turquoise" aria-hidden strokeWidth={1.75} />
              <LocalizedText id="trust.getyourguide">{enText("trust.getyourguide")}</LocalizedText>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
