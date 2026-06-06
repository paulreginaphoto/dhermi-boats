import { sitePath } from "@/lib/site";

export type BookingFormKey = "default" | "gjipe" | "grama" | "private" | "sunset" | "fishing";

export const centralizedBookingHref = sitePath("/contact/#book");

export function bookingFormHrefForKey(key: BookingFormKey | string = "default") {
  if (key && key !== "default") return sitePath(`/contact/?tour=${encodeURIComponent(key)}#book`);
  return centralizedBookingHref;
}
