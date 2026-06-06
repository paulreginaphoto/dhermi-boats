import { sitePath } from "@/lib/site";

export type BookingFormKey = "default" | "gjipe" | "grama" | "private" | "sunset" | "fishing";

export function bookingFormHrefForKey(key: BookingFormKey | string = "default") {
  const tourParam = key && key !== "default" ? `?tour=${encodeURIComponent(key)}` : "";
  return sitePath(`/contact/${tourParam}#book`);
}
