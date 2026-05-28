import { Compass, Euro, MessageCircle, Phone } from "lucide-react";
import { conversionAttrs } from "@/lib/conversion";
import { phoneDisplay, sitePath } from "@/lib/site";
import { whatsappHrefForKey } from "@/lib/whatsappMessages";
import { LocalizedText } from "@/components/LocalizedText";
import { translations } from "@/lib/i18n";

const enText = (key: string) => translations.en[key] ?? "";
const phoneHref = `tel:${phoneDisplay.replace(/\s/g, "")}`;

export function StickyBookingBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-ink/10 bg-pearl/96 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-12px_30px_rgba(7,25,35,0.12)] backdrop-blur md:hidden"
      data-sticky-booking-bar
    >
      <nav className="mx-auto grid max-w-sm grid-cols-4 gap-2" aria-label={enText("a11y.mobileNavigation")}>
        <a
          className="inline-flex min-h-14 flex-col items-center justify-center gap-1 rounded-lg bg-ink px-2 text-[0.68rem] font-bold leading-none text-pearl shadow-sm"
          data-whatsapp-key="default"
          href={whatsappHrefForKey("default")}
          rel="noreferrer"
          target="_blank"
          {...conversionAttrs({ tourId: "default", placement: "sticky_mobile" })}
        >
          <MessageCircle className="h-4 w-4" aria-hidden />
          <LocalizedText id="sticky.whatsapp">{enText("sticky.whatsapp")}</LocalizedText>
          <span className="sr-only">
            <LocalizedText id="minimal.cta.whatsapp">{enText("minimal.cta.whatsapp")}</LocalizedText>
            <LocalizedText id="minimal.reassurance">{enText("minimal.reassurance")}</LocalizedText>
          </span>
        </a>
        <a
          className="inline-flex min-h-14 flex-col items-center justify-center gap-1 rounded-lg border border-ink/10 bg-white px-2 text-[0.68rem] font-bold leading-none text-ink"
          data-analytics-event="sticky_nav_tours_click"
          data-analytics-placement="sticky_mobile_tours"
          href={sitePath("/#tours")}
        >
          <Compass className="h-4 w-4 text-turquoise" aria-hidden />
          <LocalizedText id="sticky.tours">{enText("sticky.tours")}</LocalizedText>
        </a>
        <a
          className="inline-flex min-h-14 flex-col items-center justify-center gap-1 rounded-lg border border-ink/10 bg-white px-2 text-[0.68rem] font-bold leading-none text-ink"
          data-analytics-event="sticky_nav_prices_click"
          data-analytics-placement="sticky_mobile_prices"
          href={sitePath("/tours/#prices")}
        >
          <Euro className="h-4 w-4 text-turquoise" aria-hidden />
          <LocalizedText id="sticky.prices">{enText("sticky.prices")}</LocalizedText>
        </a>
        <a
          className="inline-flex min-h-14 flex-col items-center justify-center gap-1 rounded-lg border border-ink/10 bg-white px-2 text-[0.68rem] font-bold leading-none text-ink"
          data-analytics-event="call_click_mobile_sticky"
          data-analytics-placement="sticky_mobile_call"
          href={phoneHref}
        >
          <Phone className="h-4 w-4 text-turquoise" aria-hidden />
          <LocalizedText id="sticky.call">{enText("sticky.call")}</LocalizedText>
        </a>
      </nav>
    </div>
  );
}
