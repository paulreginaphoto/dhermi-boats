import { sitePath } from "@/lib/site";

export type BookingFormKey = "default" | "gjipe" | "grama" | "private" | "sunset" | "fishing";

export const centralizedBookingHref = sitePath("/contact/#book");

export function bookingFormHrefForKey(key: BookingFormKey | string = "default") {
  void key;
  return centralizedBookingHref;
}
