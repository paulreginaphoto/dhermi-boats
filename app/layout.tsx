import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { StickyBookingBar } from "@/components/StickyBookingBar";
import { WhatsAppFloatingButton } from "@/components/WhatsAppFloatingButton";
import { LocaleBootstrap } from "@/components/LocaleBootstrap";
import { LocalizedText } from "@/components/LocalizedText";
import { assetPath, brandName, canonical, canonicalOrigin, isStagingDeployment, languageAlternates } from "@/lib/site";

const socialImageUrl = canonical("/images/hero-riviera.webp");

export const metadata: Metadata = {
  metadataBase: new URL(canonicalOrigin),
  title: {
    default: "Boat Tours in Dhërmi | Gjipe, Grama Bay & Private Trips",
    template: "%s | Dhermi Boat"
  },
  description:
    "Book small-group and private boat tours from Dhërmi to Gjipe Beach, Grama Bay, Blue Cave and hidden coves. Fast WhatsApp booking with a local skipper.",
  keywords: [
    "Dhermi boat tours",
    "Dhërmi boat tours",
    "Albania boat tours",
    "Riviera Albania tours",
    "Gjipe boat tour",
    "Blue Cave Albania",
    "Grama Bay tour",
    "private boat Albania"
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
    title: "Boat Tours in Dhërmi",
    description:
      "Book small-group and private boat tours from Dhërmi to Gjipe Beach, Grama Bay, Blue Cave and hidden coves.",
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
    title: "Boat Tours in Dhërmi",
    description: "Book small-group and private boat tours from Dhërmi to Gjipe Beach, Grama Bay, Blue Cave and hidden coves.",
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
    <html lang="en">
      <body className="pb-20 md:pb-0">
        <a className="skip-link" href="#main-content">
          <LocalizedText id="a11y.skip">Skip to content</LocalizedText>
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <WhatsAppFloatingButton />
        <StickyBookingBar />
        <LocaleBootstrap />
      </body>
    </html>
  );
}
