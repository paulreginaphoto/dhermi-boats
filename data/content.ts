import { assetPath, defaultBookingMessage, whatsappUrl } from "@/lib/site";

export type Tour = {
  id: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  type: "shared" | "private" | "experience";
  duration: string;
  price: string;
  capacity: string;
  departure: string;
  image: string;
  href: string;
  legacyHref?: string;
  whatsappText: string;
  highlights: string[];
  included: string[];
  notes?: string[];
};

export type Destination = {
  id: string;
  title: string;
  eyebrow: string;
  summary: string;
  image: string;
  href: string;
  highlights: string[];
};

export type Review = {
  name: string;
  detail: string;
  text: string;
  rating: 5;
};

export const navItems = [
  { label: "Tours", href: "/tours/" },
  { label: "Private", href: "/tours/private/" },
  { label: "Destinations", href: "/destinations/" },
  { label: "FAQ", href: "/faq/" },
  { label: "Contact", href: "/contact/" }
];

export const heroImage = assetPath("/images/hero-riviera.webp");

export const tours: Tour[] = [
  {
    id: "gjipe",
    title: "Gjipe Boat Tour",
    shortTitle: "Gjipe Tour",
    subtitle: "",
    type: "shared",
    duration: "1h30",
    price: "35 € / adult • 20 € / child (5-10 years)",
    capacity: "MAX 15 GUESTS",
    departure: "Dhërmi area",
    image: assetPath("/images/tour-gjipe.webp"),
    href: "/destinations/gjipe/",
    legacyHref: "/gjipe-boat-tour/",
    whatsappText: "Hello Dhermi Boat, I would like to book the Gjipe Tour. Date: __ / Adults: __ / Children: __",
    highlights: ["Pirates Cave", "Gjipe Beach", "Pigeon Cave", "2 coves", "30-minute swimming stop on a beach", "Beach drop-off option: +15 € / person (drop-off for the day or a few hours, depending on what you want)"],
    included: ["Pirates Cave", "Gjipe Beach", "Pigeon Cave", "2 coves", "30-minute swimming stop on a beach", "Beach drop-off option: +15 € / person (drop-off for the day or a few hours, depending on what you want)"]
  },
  {
    id: "grama",
    title: "Grama Bay Boat Tour",
    shortTitle: "Grama Tour",
    subtitle: "",
    type: "shared",
    duration: "3h30",
    price: "75 € / adult • 50 € / child (5-10 years)",
    capacity: "MAX 15 GUESTS",
    departure: "Dhërmi area",
    image: assetPath("/images/tour-grama.webp"),
    href: "/destinations/grama-bay/",
    legacyHref: "/grama-bay-boat-tour/",
    whatsappText: "Hello Dhermi Boat, I would like to book the Grama Bay Tour. Date: __ / Adults: __ / Children: __",
    highlights: ["Sailing along Karaburun Natural Park", "San Andrea Beach", "Blue Cave", "Grama Beach", "Secret Cave Karaburun option: +20 € / person (from 3 people)"],
    included: ["Sailing along Karaburun Natural Park", "San Andrea Beach", "Blue Cave", "Grama Beach", "Secret Cave Karaburun option: +20 € / person (from 3 people)"]
  },
  {
    id: "private",
    title: "Private Boat Tour Albania",
    shortTitle: "Tailor-made private tour",
    subtitle: "",
    type: "private",
    duration: "",
    price: "200 € / hour per group (minimum 2 hours)",
    capacity: "MAX 15 GUESTS",
    departure: "Dhërmi area",
    image: assetPath("/images/tour-private.webp"),
    href: "/tours/private/",
    legacyHref: "/private-boat-tour-albania/",
    whatsappText: "Hello Dhermi Boat, I would like a private boat tour. Date: __ / People: __ / Hours: __ / Places: __",
    highlights: ["You choose everything: duration – itinerary – swimming stops – destinations", "1 drink included / person", "Ideal for VIPs, families, groups of friends or special occasions ✨"],
    included: ["You choose everything: duration – itinerary – swimming stops – destinations", "1 drink included / person", "Ideal for VIPs, families, groups of friends or special occasions ✨"]
  },
  {
    id: "sunset",
    title: "Sunset Private Tour",
    shortTitle: "Sunset Private Tour",
    subtitle: "Romantic sunset cruise",
    type: "experience",
    duration: "",
    price: "From 120 € for 2 people",
    capacity: "",
    departure: "Dhërmi area",
    image: assetPath("/images/tour-sunset.webp"),
    href: "/tours/private/#sunset",
    legacyHref: "/sunset-boat-tour/",
    whatsappText: "Hello Dhermi Boat, I would like to ask about the Sunset Private Tour. Date: __ / People: __",
    highlights: ["Around Dhërmi"],
    included: ["Around Dhërmi"]
  },
  {
    id: "fishing",
    title: "Morning Fishing Tour",
    shortTitle: "Morning Fishing Tour",
    subtitle: "An authentic and peaceful sunrise experience",
    type: "experience",
    duration: "5 AM to 8 AM",
    price: "100 € / hour per group (max 5 people)",
    capacity: "",
    departure: "Dhërmi area",
    image: assetPath("/images/tour-fishing.webp"),
    href: "/tours/private/#fishing",
    legacyHref: "/morning-fishing-tour/",
    whatsappText: "Hello Dhermi Boat, I would like to ask about the Morning Fishing Tour. Date: __ / People: __",
    highlights: ["Around Dhërmi", "2 fishing rods included", "5 AM to 8 AM"],
    included: ["Around Dhërmi", "2 fishing rods included", "5 AM to 8 AM"]
  }
];

export const destinations: Destination[] = [
  {
    id: "gjipe",
    title: "Gjipe",
    eyebrow: "Gjipe Tour",
    summary: "Pirates Cave, Gjipe Beach, Pigeon Cave, 2 coves, 30-minute swimming stop on a beach.",
    image: assetPath("/images/tour-gjipe.webp"),
    href: "/destinations/gjipe/",
    highlights: ["Pirates Cave", "Gjipe Beach", "Pigeon Cave", "2 coves", "30-minute swimming stop on a beach"]
  },
  {
    id: "grama",
    title: "Grama Bay",
    eyebrow: "Grama Tour",
    summary: "Sailing along Karaburun Natural Park, San Andrea Beach, Blue Cave, Grama Beach, Secret Cave.",
    image: assetPath("/images/tour-grama.webp"),
    href: "/destinations/grama-bay/",
    highlights: ["Sailing along Karaburun Natural Park", "San Andrea Beach", "Blue Cave", "Grama Beach", "Secret Cave"]
  },
  {
    id: "blue-cave",
    title: "Blue Cave",
    eyebrow: "Blue Cave",
    summary: "Blue Cave.",
    image: assetPath("/images/gallery-blue-cave.webp"),
    href: "/destinations/blue-cave/",
    highlights: ["Blue Cave"]
  }
];

export const gallery = [
  { src: assetPath("/images/gallery-blue-cove-boat.webp"), alt: "Boat bow entering a clear turquoise cove on the Albanian Riviera" },
  { src: assetPath("/images/gallery-canyon-water.webp"), alt: "Deep blue water between limestone cliffs near Dhërmi" },
  { src: assetPath("/images/gallery-clear-water.webp"), alt: "Transparent turquoise water beside the boat in Albania" },
  { src: assetPath("/images/gallery-cave-entrance.webp"), alt: "Small boat approaching a sea cave near Dhërmi" },
  { src: assetPath("/images/gallery-limestone-cliff.webp"), alt: "Limestone cliffs and clear water on the Albanian Riviera" },
  { src: assetPath("/images/gallery-sunset-bow.webp"), alt: "Sunset over the sea from the bow of a private boat" },
  { src: assetPath("/images/gallery-boat-view.webp"), alt: "View from the boat toward bright cliffs and blue water" },
  { src: assetPath("/images/gallery-boat-beach.webp"), alt: "Dhermi Boat on a beach before departure" }
];

export const reviews = [
  {
    name: "Julie Dw",
    detail: "Local Guide • 21 avis • 4 photos · Il y a 11 semaines",
    rating: 5,
    text: "⭐️⭐️⭐️⭐️⭐️ Super expérience en bateau en Albanie ! Isuf est une personne passionnée, très sympa et bienveillante, il met tout de suite en confiance et l'ambiance à bord est juste top."
  },
  {
    name: "Marianne Vayson",
    detail: "11 avis • 0 photo · Il y a 38 semaines",
    rating: 5,
    text: "Super expérience très à l écoute je recommande à 200% merci encore pour cette belle sortie."
  },
  {
    name: "Vanessa Cariou",
    detail: "3 avis • 3 photos · Il y a 39 semaines",
    rating: 5,
    text: "Très belle excursion en mer une escapade intimiste pour une famille qui recherche la tranquilité. Le plus pour le tourisme français, maîtrise de la langue."
  },
  {
    name: "Madisson _nails",
    detail: "8 avis • 3 photos · Il y a 13 semaines",
    rating: 5,
    text: "Super moment, capitaine très gentil et très drôle qui m’a fait découvrir des paysages magnifiques. N’hésitez pas!"
  },
  {
    name: "EROUNY KK",
    detail: "6 avis • 2 photos · Il y a 39 semaines",
    rating: 5,
    text: "Super Weiterempfehlung für Bootstouren in Dhermi. Pünktlich, sympathisch und offen."
  }
] satisfies Review[];

export const whyChooseUs = [
  "Experienced local skipper, passionate about Albanian history, culture and landscapes",
  "Fluent in Albanian and French, with good knowledge of English",
  "Customizable experiences",
  "Friendly & premium atmosphere"
];

export const usefulInformation = [
  "Departure from the Dhërmi area",
  "Booking recommended in high season",
  "Routes may change depending on sea conditions"
];

export const faqs = [
  {
    question: "How do I book a tour?",
    answer: "Send a WhatsApp message with your date, number of people and preferred tour. We confirm availability together."
  },
  {
    question: "Where is the departure point?",
    answer: "Departure is from the Dhërmi area. The exact meeting point is confirmed on WhatsApp after booking."
  },
  {
    question: "Do tours depend on the weather?",
    answer: "Yes. Safety comes first, so the itinerary may change depending on wind, waves and sea conditions."
  },
  {
    question: "Can I choose a private tour?",
    answer: "Yes, private tours are available on request and are ideal for couples, families, friends or special occasions."
  },
  {
    question: "What should I bring?",
    answer: "Bring swimwear, a towel, sun protection, water and a charged phone for photos."
  },
  {
    question: "How many people can join?",
    answer: "Tours are made for small groups, up to 15 people depending on the tour. For special requests, contact us on WhatsApp."
  }
];

export const trustBadges = [
  "Daily departures",
  "Up to 15 guests",
  "WhatsApp booking",
  "Private charter available"
];

export const primaryWhatsappHref = whatsappUrl(defaultBookingMessage);
