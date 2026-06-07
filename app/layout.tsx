import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Analytics } from "@/components/Analytics";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SEOJsonLd } from "@/components/SEOJsonLd";
import { StickyBookingBar } from "@/components/StickyBookingBar";
import { WhatsAppFloatingButton } from "@/components/WhatsAppFloatingButton";
import { LocaleBootstrap } from "@/components/LocaleBootstrap";
import { LocalizedText } from "@/components/LocalizedText";
import { LanguageProvider } from "@/components/LanguageProvider";
import { assetPath, brandName, canonical, canonicalOrigin, isStagingDeployment, languageAlternates } from "@/lib/site";
import { translations } from "@/lib/i18n";
import { localBusinessSchema, websiteSchema } from "@/lib/seo";

const socialImageUrl = canonical("/images/hero-riviera.webp");

export const metadata: Metadata = {
  metadataBase: new URL(canonicalOrigin),
  title: {
    default: "Dhermi Boat Tours to Gjipe, Grama Bay & Blue Cave",
    template: "%s | Dhermi Boat"
  },
  description:
    "Book Dhermi boat tours from Dhërmi to Gjipe, Grama Bay and Blue Cave routes. Compare Gjipe from 35 €, Grama from 75 €, private boat tours and Sunset tour.",
  keywords: [
    "Dhermi boat tour",
    "Dhermi boat tours",
    "boat tour Dhermi",
    "Dhërmi boat tours",
    "Albania boat tours",
    "Riviera Albania tours",
    "Gjipe boat tour",
    "Blue Cave Albania",
    "Grama Bay tour",
    "private boat Albania",
    "Albanian Riviera boat tour"
  ],
  alternates: {
    canonical: canonical("/"),
    languages: languageAlternates("/")
  },
  robots: isStagingDeployment ? { index: false, follow: false } : { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonical("/"),
    siteName: brandName,
    title: "Dhermi Boat Tours to Gjipe, Grama Bay & Blue Cave",
    description:
      "Dhermi boat tours from Dhërmi to Gjipe, Grama Bay, Blue Cave, private routes, Sunset tour and fishing.",
    images: [
      {
        url: socialImageUrl,
        width: 2400,
        height: 1500,
        alt: "Dhermi Boat on the Albanian Riviera coast"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Dhermi Boat Tours",
    description: "Boat tours from Dhërmi to Gjipe, Grama Bay and Blue Cave with a local skipper.",
    images: [socialImageUrl]
  },
  icons: {
    icon: [
      { url: assetPath("/favicon-32.png"), sizes: "32x32", type: "image/png" },
      { url: assetPath("/icon-192.png"), sizes: "192x192", type: "image/png" }
    ],
    apple: [{ url: assetPath("/icon-192.png"), sizes: "192x192", type: "image/png" }]
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="pb-24 md:pb-0">
        <LanguageProvider>
          <a className="skip-link" href="#main-content">
            <LocalizedText id="a11y.skip">{translations.en["a11y.skip"] ?? "Skip to content"}</LocalizedText>
          </a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <WhatsAppFloatingButton />
          <StickyBookingBar />
          <SEOJsonLd data={[localBusinessSchema(), websiteSchema()]} />
          <Analytics />
          <LocaleBootstrap />
        </LanguageProvider>
      </body>
    </html>
  );
}
