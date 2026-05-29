import type { MetadataRoute } from "next";
import { canonical, isStagingDeployment } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  if (isStagingDeployment) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/"
      }
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/"
      },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" }
    ],
    sitemap: `${canonical("/sitemap.xml")}`
  };
}
