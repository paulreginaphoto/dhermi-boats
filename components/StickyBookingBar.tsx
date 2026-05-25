import { Euro, ListChecks, MessageCircle, Phone } from "lucide-react";
import { primaryWhatsappHref } from "@/data/content";
import { conversionAttrs } from "@/lib/conversion";
import { phoneDisplay, sitePath } from "@/lib/site";
import { LocalizedText } from "@/components/LocalizedText";
import { translations } from "@/lib/i18n";

const enText = (key: string) => translations.en[key] ?? "";

export function StickyBookingBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-ink/10 bg-pearl/95 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-12px_30px_rgba(7,25,35,0.12)] backdrop-blur md:hidden"
      data-sticky-booking-bar
    >
      <div className="mx-auto grid max-w-md grid-cols-4 items-center gap-2">
        <a
          className="inline-flex min-h-12 flex-col items-center justify-center gap-1 rounded-md bg-ink px-2 text-[0.68rem] font-bold leading-none text-pearl"
          data-whatsapp-key="default"
          href={primaryWhatsappHref}
          rel="noreferrer"
          target="_blank"
          {...conversionAttrs({ tourId: "default", placement: "sticky_mobile" })}
        >
          <MessageCircle className="h-4 w-4" aria-hidden />
          <LocalizedText id="sticky.whatsapp">{enText("sticky.whatsapp")}</LocalizedText>
        </a>
        <a
          className="inline-flex min-h-12 flex-col items-center justify-center gap-1 rounded-md border border-ink/12 bg-white px-2 text-[0.68rem] font-bold leading-none text-ink"
          data-analytics-event="sticky_tours_click"
          href={sitePath("/tours/")}
        >
          <ListChecks className="h-4 w-4" aria-hidden />
          <LocalizedText id="sticky.tours">{enText("sticky.tours")}</LocalizedText>
        </a>
        <a
          className="inline-flex min-h-12 flex-col items-center justify-center gap-1 rounded-md border border-ink/12 bg-white px-2 text-[0.68rem] font-bold leading-none text-ink"
          data-analytics-event="sticky_prices_click"
          href={sitePath("/tours/#compare-tours")}
        >
          <Euro className="h-4 w-4" aria-hidden />
          <LocalizedText id="sticky.prices">{enText("sticky.prices")}</LocalizedText>
        </a>
        <a
          aria-labelledby="sticky-call-action-label"
          className="inline-flex min-h-12 flex-col items-center justify-center gap-1 rounded-md border border-ink/12 bg-white px-2 text-[0.68rem] font-bold leading-none text-ink"
          data-analytics-event="call_click"
          href={`tel:${phoneDisplay.replace(/\s/g, "")}`}
        >
          <span id="sticky-call-action-label" className="sr-only">
            <LocalizedText id="a11y.callAction">{enText("a11y.callAction")}</LocalizedText>
          </span>
          <Phone className="h-4 w-4" aria-hidden />
          <LocalizedText id="sticky.call">{enText("sticky.call")}</LocalizedText>
        </a>
      </div>
    </div>
  );
}
