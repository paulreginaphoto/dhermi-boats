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

  const legacyWordPressDisallow = [
    "/wp-content/uploads/wc-logs/",
    "/wp-content/uploads/woocommerce_transient_files/",
    "/wp-content/uploads/woocommerce_uploads/",
    "/*?add-to-cart=",
    "/*?*add-to-cart=",
    "/wp-admin/"
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/wp-admin/admin-ajax.php"],
        disallow: legacyWordPressDisallow
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
