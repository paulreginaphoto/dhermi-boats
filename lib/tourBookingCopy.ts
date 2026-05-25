import { translations } from "@/lib/i18n";

const bookingKeyByTourId: Record<string, string> = {
  gjipe: "tour.gjipe.book",
  grama: "tour.grama.book",
  private: "tour.private.book",
  sunset: "tour.sunset.book",
  fishing: "tour.fishing.book"
};

export function tourBookKey(tourId: string) {
  return bookingKeyByTourId[tourId] ?? "tour.book";
}

export function tourBookFallback(tourId: string) {
  const key = tourBookKey(tourId);
  return translations.en[key] ?? translations.en["tour.book"] ?? "Book this tour";
}
