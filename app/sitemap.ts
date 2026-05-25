import type { MetadataRoute } from "next";
import { canonical } from "@/lib/site";

export const dynamic = "force-static";

const pages: Array<{ path: string; priority: number; changefreq: MetadataRoute.Sitemap[number]["changeFrequency"] }> = [
  { path: "/", priority: 1, changefreq: "weekly" },
  { path: "/boat-photos/", priority: 0.75, changefreq: "weekly" },
  { path: "/tours/", priority: 0.9, changefreq: "weekly" },
  { path: "/destinations/", priority: 0.85, changefreq: "weekly" },
  { path: "/destinations/blue-cave/", priority: 0.8, changefreq: "weekly" },
  { path: "/faq/", priority: 0.75, changefreq: "monthly" },
  { path: "/contact/", priority: 0.75, changefreq: "monthly" },
  { path: "/boat-tour-dhermi-today/", priority: 0.86, changefreq: "weekly" },
  { path: "/blue-cave-boat-tour-dhermi/", priority: 0.84, changefreq: "weekly" },
  { path: "/french-speaking-boat-tour-dhermi/", priority: 0.82, changefreq: "weekly" },
  { path: "/family-boat-tour-dhermi/", priority: 0.82, changefreq: "weekly" },
  { path: "/dhermi-to-grama-bay-boat/", priority: 0.84, changefreq: "weekly" },
  { path: "/gjipe-boat-tour/", priority: 0.7, changefreq: "monthly" },
  { path: "/grama-bay-boat-tour/", priority: 0.7, changefreq: "monthly" },
  { path: "/private-boat-tour-albania/", priority: 0.7, changefreq: "monthly" },
  { path: "/sunset-boat-tour/", priority: 0.65, changefreq: "monthly" },
  { path: "/morning-fishing-tour/", priority: 0.65, changefreq: "monthly" }
];

const buildDate = () => new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((page) => ({
    url: canonical(page.path),
    lastModified: buildDate(),
    changeFrequency: page.changefreq,
    priority: page.priority
  }));
}
