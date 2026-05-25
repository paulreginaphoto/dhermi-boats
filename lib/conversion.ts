import type { Locale } from "@/lib/i18n";

export const whatsappEventTemplate = "whatsapp_click_{tour}_{language}_{placement}";

export function analyticsSegment(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "") || "default";
}

export function conversionEvent(tourId: string, locale: Locale = "en", placement: string) {
  return whatsappEventTemplate
    .replace("{tour}", analyticsSegment(tourId))
    .replace("{language}", analyticsSegment(locale))
    .replace("{placement}", analyticsSegment(placement));
}

export function conversionAttrs({
  tourId,
  locale = "en",
  placement
}: {
  tourId: string;
  locale?: Locale;
  placement: string;
}) {
  const analyticsTour = analyticsSegment(tourId);
  const analyticsPlacement = analyticsSegment(placement);

  return {
    "data-analytics-event": conversionEvent(analyticsTour, locale, analyticsPlacement),
    "data-analytics-event-template": whatsappEventTemplate,
    "data-analytics-tour": analyticsTour,
    "data-analytics-placement": analyticsPlacement
  };
}
