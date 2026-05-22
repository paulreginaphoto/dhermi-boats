import type { MetadataRoute } from "next";
import { canonical } from "@/lib/site";

const pages: Array<{ path: string; priority: number; changefreq: MetadataRoute.Sitemap[number]["changeFrequency"] }> = [
  { path: "/", priority: 1, changefreq: "weekly" },
  { path: "/tours/", priority: 0.9, changefreq: "weekly" },
  { path: "/tours/private/", priority: 0.9, changefreq: "weekly" },
  { path: "/tours/group/", priority: 0.85, changefreq: "weekly" },
  { path: "/destinations/", priority: 0.85, changefreq: "weekly" },
  { path: "/destinations/gjipe/", priority: 0.85, changefreq: "weekly" },
  { path: "/destinations/grama-bay/", priority: 0.85, changefreq: "weekly" },
  { path: "/destinations/blue-cave/", priority: 0.8, changefreq: "weekly" },
  { path: "/faq/", priority: 0.75, changefreq: "monthly" },
  { path: "/contact/", priority: 0.75, changefreq: "monthly" },
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

