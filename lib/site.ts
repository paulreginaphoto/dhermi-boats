export const siteUrl = "https://dhermi.boats";
export const brandName = "Dhermi Boat";
export const whatsappNumber = "355693921356";
export const phoneDisplay = "+355 69 392 1356";
export const emailAddress = "dhermi.boats1@gmail.com";
export const instagramHandle = "@dhermi.boat";
export const instagramUrl = "https://www.instagram.com/dhermi.boat/";

const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const basePath = rawBasePath === "/" ? "" : rawBasePath.replace(/\/$/, "");

export function assetPath(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalized}`;
}

export function canonical(path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${normalized}`;
}

export function whatsappUrl(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const defaultBookingMessage =
  "Hello Dhermi Boat, I would like to book a boat tour. Date: __ / People: __ / Preferred tour: __";

