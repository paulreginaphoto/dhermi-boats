"use client";

import { useEffect, useState } from "react";
import { MessageCircle, Phone } from "lucide-react";
import { primaryWhatsappHref } from "@/data/content";
import { phoneDisplay } from "@/lib/site";
import { LocalizedText } from "@/components/LocalizedText";

export function StickyBookingBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function updateVisibility() {
      const footer = document.querySelector("footer");
      const footerTop = footer?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY;
      const pastHero = window.scrollY > Math.min(window.innerHeight * 0.75, 640);
      const nearFooter = footerTop < window.innerHeight + 24;
      setIsVisible(pastHero && !nearFooter);
    }

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  return (
    <div
      className={[
        "fixed inset-x-0 bottom-0 z-50 border-t border-ink/10 bg-pearl/95 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-12px_30px_rgba(7,25,35,0.12)] backdrop-blur transition-transform duration-300 md:hidden",
        isVisible ? "translate-y-0" : "translate-y-full"
      ].join(" ")}
      data-sticky-booking-bar
    >
      <div className="mx-auto grid max-w-md grid-cols-[1fr_auto] items-center gap-3 min-[390px]:grid-cols-[1fr_auto_auto]">
        <p className="hidden text-sm font-bold text-ink min-[390px]:block">
          <LocalizedText id="sticky.text">Booking Dhërmi today?</LocalizedText>
        </p>
        <a
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-ink px-4 text-sm font-semibold text-pearl min-[390px]:col-start-2"
          data-analytics-event="sticky_mobile_cta_click"
          data-whatsapp-key="default"
          href={primaryWhatsappHref}
          rel="noreferrer"
          target="_blank"
        >
          <MessageCircle className="h-4 w-4" aria-hidden />
          <LocalizedText id="sticky.book">Book on WhatsApp</LocalizedText>
        </a>
        <a
          aria-label="Call Dhermi Boat"
          className="inline-flex h-12 w-12 items-center justify-center rounded-md border border-ink/15 bg-white text-ink"
          data-analytics-event="call_click"
          href={`tel:${phoneDisplay.replace(/\s/g, "")}`}
        >
          <Phone className="h-4 w-4" aria-hidden />
        </a>
      </div>
    </div>
  );
}
