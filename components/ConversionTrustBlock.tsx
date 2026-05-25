import { Anchor, Languages, MapPin, Star, TicketCheck } from "lucide-react";
import { IconFrame } from "@/components/OutlineIcon";
import { getYourGuideUrl, googleMapsUrl } from "@/lib/site";

const trustItems = [
  {
    icon: Anchor,
    titleKey: "Local skipper",
    textKey: "Routes are confirmed by Isuf depending on real sea conditions.",
  },
  {
    icon: Languages,
    titleKey: "French-friendly",
    textKey: "Albanian, French and English communication before departure.",
  },
  {
    icon: Star,
    titleKey: "Proof before payment",
    textKey: "Google, GetYourGuide and real guest reviews support the decision.",
  }
];

export function ConversionTrustBlock({ className = "" }: { className?: string }) {
  return (
    <section className={["bg-pearl py-8 md:py-12", className].join(" ")}>
      <div className="site-band">
        <div className="grid gap-5 rounded-2xl border border-ink/8 bg-limestone/80 p-4 shadow-sm md:grid-cols-[1fr_auto] md:items-center md:p-6">
          <div className="grid gap-3 sm:grid-cols-3">
            {trustItems.map((item) => (
                <div key={item.titleKey} className="flex gap-3">
                  <IconFrame icon={item.icon} variant="soft" size="sm" />
                  <div>
                    <p className="text-sm font-bold text-ink">
                      {item.titleKey}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-ink-soft">
                      {item.textKey}
                    </p>
                  </div>
                </div>
            ))}
          </div>
          <div className="flex flex-col gap-2 sm:flex-row md:flex-col">
            <a className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-ink/12 bg-white px-4 text-sm font-semibold text-ink transition hover:border-ink/28 hover:bg-pearl" data-analytics-event="maps_click" href={googleMapsUrl} rel="noreferrer" target="_blank">
              <MapPin className="h-4 w-4 text-turquoise" aria-hidden strokeWidth={1.75} />
              Google reviews
            </a>
            <a className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-ink/12 bg-white px-4 text-sm font-semibold text-ink transition hover:border-ink/28 hover:bg-pearl" data-analytics-event="getyourguide_click" href={getYourGuideUrl} rel="noreferrer" target="_blank">
              <TicketCheck className="h-4 w-4 text-turquoise" aria-hidden strokeWidth={1.75} />
              GetYourGuide proof
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
