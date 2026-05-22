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
    subtitle: "A compact coastal escape with caves, coves and a swim stop at one of Albania's most dramatic beaches.",
    type: "shared",
    duration: "1h30",
    price: "35 € adult / 20 € child",
    capacity: "Up to 15 guests",
    departure: "Dhërmi area",
    image: assetPath("/images/tour-gjipe.webp"),
    href: "/destinations/gjipe/",
    legacyHref: "/gjipe-boat-tour/",
    whatsappText: "Hello Dhermi Boat, I would like to book the Gjipe Tour. Date: __ / Adults: __ / Children: __",
    highlights: ["Pirates Cave", "Gjipe Beach", "Pigeon Cave", "Two hidden coves", "30-minute swim stop"],
    included: ["Local skipper", "Small-group boat experience", "Swimming stop", "WhatsApp confirmation"],
    notes: ["Beach drop-off option: +15 € / person for the day or a few hours."]
  },
  {
    id: "grama",
    title: "Grama Bay Boat Tour",
    shortTitle: "Grama Bay Tour",
    subtitle: "A longer Riviera route through Karaburun scenery, blue water caves and the iconic Grama Bay.",
    type: "shared",
    duration: "3h30",
    price: "75 € adult / 50 € child",
    capacity: "Up to 15 guests",
    departure: "Dhërmi area",
    image: assetPath("/images/tour-grama.webp"),
    href: "/destinations/grama-bay/",
    legacyHref: "/grama-bay-boat-tour/",
    whatsappText: "Hello Dhermi Boat, I would like to book the Grama Bay Tour. Date: __ / Adults: __ / Children: __",
    highlights: ["Karaburun Natural Park", "San Andrea Beach", "Blue Cave", "Grama Beach", "Secret Cave"],
    included: ["Local skipper", "Scenic coastline route", "Swimming stops", "WhatsApp confirmation"],
    notes: ["Karaburun extension: +20 € / person from 3 people."]
  },
  {
    id: "private",
    title: "Private Boat Tour Albania",
    shortTitle: "Private Tour",
    subtitle: "A flexible private charter where your group chooses the timing, stops and atmosphere.",
    type: "private",
    duration: "Minimum 2 hours",
    price: "200 € / hour per group",
    capacity: "Up to 15 guests",
    departure: "Dhërmi area",
    image: assetPath("/images/tour-private.webp"),
    href: "/tours/private/",
    legacyHref: "/private-boat-tour-albania/",
    whatsappText: "Hello Dhermi Boat, I would like a private boat tour. Date: __ / People: __ / Hours: __ / Places: __",
    highlights: ["Custom duration", "Custom itinerary", "Swimming stops", "One drink included per person", "Ideal for families and special occasions"],
    included: ["Private skipper", "Flexible route", "One drink per guest", "WhatsApp planning"]
  },
  {
    id: "sunset",
    title: "Sunset Private Tour",
    shortTitle: "Sunset Tour",
    subtitle: "A quiet golden-hour cruise around Dhërmi for couples, proposals or a softer end to the day.",
    type: "experience",
    duration: "Evening cruise",
    price: "From 120 € for 2 people",
    capacity: "Private experience",
    departure: "Dhërmi area",
    image: assetPath("/images/tour-sunset.webp"),
    href: "/tours/private/#sunset",
    legacyHref: "/sunset-boat-tour/",
    whatsappText: "Hello Dhermi Boat, I would like to ask about the Sunset Private Tour. Date: __ / People: __",
    highlights: ["Romantic sunset cruise", "Dhërmi coastline", "Private boat", "Golden-hour photos"],
    included: ["Private skipper", "Flexible timing", "WhatsApp confirmation"]
  },
  {
    id: "fishing",
    title: "Morning Fishing Tour",
    shortTitle: "Fishing Tour",
    subtitle: "A calm sunrise experience around Dhërmi with rods included and a small private group.",
    type: "experience",
    duration: "5 AM to 8 AM",
    price: "100 € / hour per group",
    capacity: "Max 5 guests",
    departure: "Dhërmi area",
    image: assetPath("/images/tour-fishing.webp"),
    href: "/tours/private/#fishing",
    legacyHref: "/morning-fishing-tour/",
    whatsappText: "Hello Dhermi Boat, I would like to ask about the Morning Fishing Tour. Date: __ / People: __",
    highlights: ["Sunrise departure", "Two fishing rods included", "Peaceful local experience", "Small private group"],
    included: ["Private skipper", "Two rods", "Early morning route", "WhatsApp confirmation"]
  }
];

export const destinations: Destination[] = [
  {
    id: "gjipe",
    title: "Gjipe",
    eyebrow: "Canyon beach",
    summary: "A limestone canyon opening into clear water, with caves and coves that feel made for a short sea escape.",
    image: assetPath("/images/tour-gjipe.webp"),
    href: "/destinations/gjipe/",
    highlights: ["Canyon cliffs", "Beach swim stop", "Pirates Cave", "Pigeon Cave"]
  },
  {
    id: "grama",
    title: "Grama Bay",
    eyebrow: "Karaburun route",
    summary: "A cinematic bay inside the Karaburun coastline, reached by a longer route through cliffs, caves and turquoise water.",
    image: assetPath("/images/tour-grama.webp"),
    href: "/destinations/grama-bay/",
    highlights: ["Grama Beach", "San Andrea Beach", "Secret Cave", "Karaburun Natural Park"]
  },
  {
    id: "blue-cave",
    title: "Blue Cave",
    eyebrow: "Clear water cave",
    summary: "A luminous cave stop where the sea turns bright blue beneath the rocks, often included on the Grama route.",
    image: assetPath("/images/gallery-blue-cave.webp"),
    href: "/destinations/blue-cave/",
    highlights: ["Blue light", "Rock formations", "Photo stop", "Grama route highlight"]
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
    detail: "Local Guide",
    text: "Super expérience en bateau en Albanie ! Isuf est passionné, très sympa et bienveillant. Il met tout de suite en confiance et l'ambiance à bord est top."
  },
  {
    name: "Marianne Vayson",
    detail: "Guest review",
    text: "Super expérience, très à l'écoute. Je recommande à 200%. Merci encore pour cette belle sortie."
  },
  {
    name: "Vanessa Cariou",
    detail: "Family trip",
    text: "Très belle excursion en mer, une escapade intimiste pour une famille qui recherche la tranquillité. Le plus: maîtrise de la langue française."
  },
  {
    name: "Madisson",
    detail: "Guest review",
    text: "Super moment, capitaine très gentil et très drôle qui m'a fait découvrir des paysages magnifiques. N'hésitez pas !"
  },
  {
    name: "EROUNY KK",
    detail: "Guest review",
    text: "Super Weiterempfehlung für Bootstouren in Dhermi. Pünktlich, sympathisch und offen."
  }
];

export const faqs = [
  {
    question: "How do I book a tour?",
    answer: "Send a WhatsApp message with your date, number of people and preferred tour. We confirm availability together before the trip."
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
    answer: "Yes. Private tours are available on request and are ideal for couples, families, friends and special occasions."
  },
  {
    question: "What should I bring?",
    answer: "Bring swimwear, a towel, sun protection, water and a charged phone for photos."
  },
  {
    question: "How many people can join?",
    answer: "Tours are designed for small groups, up to 15 people depending on the tour. For special requests, contact us on WhatsApp."
  }
];

export const trustBadges = [
  "Daily departures",
  "Up to 15 guests",
  "Local skipper",
  "WhatsApp booking",
  "Albanian, French and English"
];

export const primaryWhatsappHref = whatsappUrl(defaultBookingMessage);

