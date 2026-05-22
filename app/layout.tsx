import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { StickyBookingBar } from "@/components/StickyBookingBar";
import { WhatsAppFloatingButton } from "@/components/WhatsAppFloatingButton";
import { LocaleBootstrap } from "@/components/LocaleBootstrap";
import { assetPath, brandName, canonical, siteOrigin, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: {
    default: "Dhermi Boat Tours | Private & Group Boat Trips in Dhërmi, Albania",
    template: "%s | Dhermi Boat"
  },
  description:
    "Discover the Albanian Riviera from the sea with boat tours departing from Dhërmi.",
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
    canonical: canonical("/")
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: brandName,
    title: "Dhermi Boat Tours",
    description:
      "Discover the Albanian Riviera from the sea with boat tours departing from Dhërmi.",
    images: [
      {
        url: assetPath("/images/hero-riviera.webp"),
        width: 2400,
        height: 1500,
        alt: "Dhermi Boat on the Albanian Riviera coast"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Dhermi Boat Tours",
    description: "Discover the Albanian Riviera from the sea with boat tours departing from Dhërmi."
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
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloatingButton />
        <StickyBookingBar />
        <LocaleBootstrap />
      </body>
    </html>
  );
}
