import { Euro, ListChecks, MessageCircle, Phone } from "lucide-react";
import { primaryWhatsappHref } from "@/data/content";
import { phoneDisplay, sitePath } from "@/lib/site";
import { LocalizedText } from "@/components/LocalizedText";

export function StickyBookingBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-ink/10 bg-pearl/95 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-12px_30px_rgba(7,25,35,0.12)] backdrop-blur md:hidden"
      data-sticky-booking-bar
    >
      <div className="mx-auto grid max-w-md grid-cols-4 items-center gap-2">
        <a
          className="inline-flex min-h-12 flex-col items-center justify-center gap-1 rounded-md bg-ink px-2 text-[0.68rem] font-bold leading-none text-pearl"
          data-analytics-event="sticky_mobile_cta_click"
          data-whatsapp-key="default"
          href={primaryWhatsappHref}
          rel="noreferrer"
          target="_blank"
        >
          <MessageCircle className="h-4 w-4" aria-hidden />
          <LocalizedText id="sticky.whatsapp">WhatsApp</LocalizedText>
        </a>
        <a
          className="inline-flex min-h-12 flex-col items-center justify-center gap-1 rounded-md border border-ink/12 bg-white px-2 text-[0.68rem] font-bold leading-none text-ink"
          data-analytics-event="sticky_tours_click"
          href={sitePath("/tours/")}
        >
          <ListChecks className="h-4 w-4" aria-hidden />
          <LocalizedText id="sticky.tours">Tours</LocalizedText>
        </a>
        <a
          className="inline-flex min-h-12 flex-col items-center justify-center gap-1 rounded-md border border-ink/12 bg-white px-2 text-[0.68rem] font-bold leading-none text-ink"
          data-analytics-event="sticky_prices_click"
          href={sitePath("/tours/#compare-tours")}
        >
          <Euro className="h-4 w-4" aria-hidden />
          <LocalizedText id="sticky.prices">Prices</LocalizedText>
        </a>
        <a
          aria-label="Call Dhermi Boat"
          className="inline-flex min-h-12 flex-col items-center justify-center gap-1 rounded-md border border-ink/12 bg-white px-2 text-[0.68rem] font-bold leading-none text-ink"
          data-analytics-event="call_click"
          href={`tel:${phoneDisplay.replace(/\s/g, "")}`}
        >
          <Phone className="h-4 w-4" aria-hidden />
          <LocalizedText id="sticky.call">Call</LocalizedText>
        </a>
      </div>
    </div>
  );
}
