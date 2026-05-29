export const brandName = "Dhermi Boat";
export const whatsappNumber = "355693921356";
export const phoneDisplay = "+355 69 392 1356";
export const emailAddress = "dhermi.boats1@gmail.com";
export const instagramHandle = "@dhermi.boat";
export const instagramUrl = "https://www.instagram.com/dhermi.boat/";
export const tiktokHandle = "@dhermi.boat";
export const tiktokUrl = "https://www.tiktok.com/@dhermi.boat";
export const googleMapsUrl = "https://maps.app.goo.gl/NRsVPEKAqkKfoHmn6";
export const getYourGuideUrl = "https://www.getyourguide.com/dhermi-boat-s720012/";

const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const basePath = rawBasePath === "/" ? "" : rawBasePath.replace(/\/$/, "");
export const siteOrigin = (process.env.NEXT_PUBLIC_SITE_ORIGIN || "https://dhermi.boats").replace(/\/$/, "");
export const siteUrl = `${siteOrigin}${basePath}`;
export const canonicalOrigin = (process.env.NEXT_PUBLIC_CANONICAL_ORIGIN || siteUrl).replace(/\/$/, "");
export const isStagingDeployment = siteOrigin.includes("regina.photo") || basePath.includes("dhermi-boats");

export function assetPath(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalized}`;
}

export function sitePath(path: string) {
  if (/^(https?:|tel:|mailto:|#)/.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const pathIsBase = Boolean(basePath && normalized === basePath);
  const pathHasPrefix = Boolean(basePath && normalized.startsWith(`${basePath}/`));
  if (pathIsBase || pathHasPrefix) return normalized;
  return `${basePath}${normalized}`;
}

export function canonical(path = "/") {
  const withoutBasePath = basePath && path.startsWith(`${basePath}/`) ? path.slice(basePath.length) : path;
  const normalized = withoutBasePath.startsWith("/") ? withoutBasePath : `/${withoutBasePath}`;
  return `${canonicalOrigin}${normalized}`;
}

export function languageAlternates(path = "/") {
  return {
    "x-default": canonical(path)
  };
}

const unsafeWhatsappSymbols = /[\u{1F1E6}-\u{1F1FF}\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\uFFFD]/gu;

export function cleanWhatsappMessage(message: string) {
  return message
    .replace(unsafeWhatsappSymbols, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function whatsappUrl(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(cleanWhatsappMessage(message))}`;
}

export const defaultBookingMessage = [
  "Hello Dhermi Boat :) I'd like to book a boat tour.",
  "",
  "*Tour:* __",
  "*Date:* __",
  "*Adults:* __",
  "*Children:* __",
  "*Preferred time:* __",
  "*Language:* __",
  "*Questions:* __"
].join("\n");
