import type { Tour } from "@/data/content";
import { orderedTours } from "@/data/content";
import { brandName, canonical, emailAddress, getYourGuideUrl, googleMapsUrl, instagramUrl, phoneDisplay, tiktokUrl } from "@/lib/site";

const businessId = `${canonical("/")}#business`;
const websiteId = `${canonical("/")}#website`;

const tourPriceFrom: Record<string, string> = {
  gjipe: "35",
  grama: "75",
  private: "200",
  sunset: "120",
  fishing: "100"
};

function imageCanonical(image: string) {
  const imagePath = image.includes("/images/") ? `/images/${image.split("/images/").pop()}` : image;
  return canonical(imagePath);
}

function tourSchemaId(tour: Tour) {
  return `${canonical(tour.href)}#tour`;
}

function tourOffer(tour: Tour) {
  return {
    "@type": "Offer",
    name: `Book ${tour.shortTitle}`,
    price: tourPriceFrom[tour.id],
    priceCurrency: "EUR",
    description: tour.price,
    url: canonical(tour.href),
    seller: { "@id": businessId }
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": businessId,
    name: brandName,
    alternateName: ["Dhermi Boat Tours", "Dhermi boat tour operator"],
    description:
      "Local Dhërmi boat tour operator for Gjipe Beach, Grama Bay, Blue Cave, private boat trips, sunset cruises and morning fishing tours from the Dhërmi area.",
    url: canonical("/"),
    telephone: phoneDisplay,
    email: emailAddress,
    image: canonical("/images/hero-riviera.webp"),
    logo: canonical("/images/brand-logo.webp"),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dhërmi",
      addressRegion: "Vlorë",
      addressCountry: "AL"
    },
    areaServed: ["Dhërmi", "Dhermi", "Gjipe", "Grama Bay", "Blue Cave", "Karaburun", "Albanian Riviera"],
    knowsAbout: [
      "Dhermi boat tour",
      "Dhërmi boat tours",
      "Gjipe boat tour",
      "Grama Bay boat tour",
      "Blue Cave Albania",
      "private boat tour Albania"
    ],
    sameAs: [instagramUrl, tiktokUrl, googleMapsUrl, getYourGuideUrl],
    hasMap: googleMapsUrl,
    priceRange: "35 EUR - 200 EUR per hour",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Dhermi boat tours",
      itemListElement: orderedTours.map((tour) => tourOffer(tour))
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: phoneDisplay,
      contactType: "reservations",
      availableLanguage: ["French", "English", "Albanian"]
    }
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: "Dhermi Boat Tours",
    alternateName: brandName,
    url: canonical("/"),
    description: "Dhermi boat tour booking site for Gjipe, Grama Bay, Blue Cave, private boat trips, Sunset tour and morning fishing.",
    publisher: { "@id": businessId },
    inLanguage: ["en", "fr", "sq"]
  };
}

export function homePageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonical("/")}#webpage`,
    url: canonical("/"),
    name: "Dhermi Boat Tours to Gjipe, Grama Bay and Blue Cave",
    description: "Compare Dhermi boat tours from Dhërmi: Gjipe from 35 €, Grama Bay from 75 €, Blue Cave routes, private boat tours and Sunset tour.",
    isPartOf: { "@id": websiteId },
    about: { "@id": businessId },
    mainEntity: { "@id": businessId }
  };
}

export function touristTripSchema(tour: Tour) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "@id": tourSchemaId(tour),
    name: tour.title,
    alternateName: `${tour.shortTitle} Dhermi boat tour`,
    description: tour.subtitle || tour.included.join(", "),
    url: canonical(tour.href),
    image: imageCanonical(tour.image),
    provider: { "@id": businessId },
    touristType: tour.type === "private" ? "Private boat tour" : tour.type === "shared" ? "Small-group boat tour" : "Boat tour experience",
    itinerary: {
      "@type": "ItemList",
      itemListElement: tour.itinerary.map((step, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: step
      }))
    },
    offers: tourOffer(tour)
  };
}

export function tourCollectionSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${canonical("/tours/")}#collection`,
    name: "Dhermi boat tours",
    url: canonical("/tours/"),
    description: "Compare Dhermi boat tours by route, duration, price and group size.",
    isPartOf: { "@id": websiteId },
    about: { "@id": businessId },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: orderedTours.map((tour, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: tour.title,
        url: canonical(tour.href),
        item: { "@id": tourSchemaId(tour) }
      }))
    }
  };
}

export function serviceLandingPageSchema({
  path,
  name,
  description,
  serviceType,
  keywords = []
}: {
  path: string;
  name: string;
  description: string;
  serviceType: string;
  keywords?: string[];
}) {
  const pageId = `${canonical(path)}#webpage`;
  const serviceId = `${canonical(path)}#service`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": pageId,
      url: canonical(path),
      name,
      description,
      isPartOf: { "@id": websiteId },
      about: { "@id": serviceId },
      mainEntity: { "@id": serviceId },
      keywords
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": serviceId,
      name,
      description,
      serviceType,
      provider: { "@id": businessId },
      areaServed: ["Dhërmi", "Dhermi", "Gjipe", "Grama Bay", "Blue Cave", "Karaburun", "Albanian Riviera"],
      availableChannel: {
        "@type": "ServiceChannel",
        serviceUrl: canonical("/contact/"),
        availableLanguage: ["French", "English", "Albanian"]
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Dhermi boat tours",
        itemListElement: orderedTours.map((tour) => tourOffer(tour))
      }
    }
  ];
}

export function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: canonical(item.url)
    }))
  };
}

export function faqSchema(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}
