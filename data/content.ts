import { assetPath, defaultBookingMessage, sitePath, whatsappUrl } from "@/lib/site";

export type Tour = {
  id: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  type: "shared" | "private" | "experience";
  offerTier: "bestSeller" | "premiumRoute" | "private" | "experience";
  duration: string;
  price: string;
  capacity: string;
  departure: string;
  image: string;
  cardImage?: string;
  imageAlt?: string;
  href: string;
  whatsappText: string;
  bestFor: string;
  highlights: string[];
  cardHighlights: string[];
  included: string[];
  itinerary: string[];
  bring: string[];
  safetyNote: string;
  detailFaqs: Array<{ question: string; answer: string }>;
  notes?: string[];
};

export type Destination = {
  id: string;
  title: string;
  eyebrow: string;
  summary: string;
  image: string;
  cardImage?: string;
  imageAlt?: string;
  href: string;
  highlights: string[];
};

export type Review = {
  name: string;
  detail: string;
  text: string;
  rating: 5;
};

export type TourComparisonItem = {
  angle: string;
  tourId: string;
  duration: string;
  price: string;
};

export const navItems = [
  { label: "Tours", href: sitePath("/tours/") },
  { label: "Photos", href: sitePath("/boat-photos/") },
  { label: "FAQ", href: sitePath("/faq/") },
  { label: "Contact", href: sitePath("/contact/") }
];

export const heroImage = assetPath("/images/hero-riviera.webp");

function whatsappMessage(lines: string[]) {
  return lines.join("\n");
}

export const tours: Tour[] = [
  {
    id: "gjipe",
    title: "Gjipe Boat Tour from Dhërmi",
    shortTitle: "Gjipe Tour",
    subtitle: "1h30: Pirates Cave, Gjipe Beach, Pigeon Cave, swim stop.",
    type: "shared",
    offerTier: "bestSeller",
    duration: "1h30",
    price: "35 € / adult • 20 € / child (5-10 years)",
    capacity: "Max 15 guests",
    departure: "Dhërmi area",
    image: assetPath("/images/tour-gjipe.webp"),
    cardImage: assetPath("/images/tour-gjipe-card.avif"),
    imageAlt: "Boat approaching a clear beach cove with turquoise water near Dhërmi",
    href: sitePath("/gjipe-boat-tour/"),
    whatsappText: whatsappMessage([
      "👋 Hello Dhermi Boat, I'd like to book the Gjipe Tour.",
      "",
      "🚤 Tour: Gjipe Tour",
      "📅 Date: __",
      "👥 Adults: __",
      "🧒 Children: __",
      "🕒 Preferred time: __",
      "🌍 Language: __",
      "💬 Questions: __"
    ]),
    bestFor: "Short caves + swim",
    highlights: ["Pirates Cave", "Gjipe Beach", "Pigeon Cave", "2 coves", "30-minute swimming stop on a beach", "Beach drop-off option: +15 € / person (drop-off for the day or a few hours, depending on what you want)"],
    cardHighlights: ["Pirates Cave", "Gjipe Beach", "Pigeon Cave", "30-minute swim stop"],
    included: ["Pirates Cave", "Gjipe Beach", "Pigeon Cave", "2 coves", "30-minute swimming stop on a beach", "Beach drop-off option: +15 € / person (drop-off for the day or a few hours, depending on what you want)"],
    itinerary: ["Depart from the Dhërmi area", "Cruise to Pirates Cave and nearby coves", "Visit Gjipe Beach and Pigeon Cave", "Stop for around 30 minutes of swimming", "Return to Dhërmi or arrange the beach drop-off option"],
    bring: ["Swimwear and towel", "Sun protection", "Water", "A charged phone for photos"],
    safetyNote: "Timing and swim stops depend on the sea. Meeting point comes by WhatsApp.",
    detailFaqs: [
      {
        question: "Is the Gjipe Tour good if I only have a short time?",
        answer: "Yes. It is the quickest shared tour and focuses on caves, Gjipe Beach and a swim stop."
      },
      {
        question: "Can I stay longer on the beach?",
        answer: "A beach drop-off option is available for +15 € / person, depending on timing and sea conditions."
      },
      {
        question: "Are children allowed on the Gjipe Tour?",
        answer: "Yes. Children aged 5-10 have a child price, and availability is confirmed on WhatsApp."
      }
    ]
  },
  {
    id: "grama",
    title: "Grama Bay Boat Tour from Dhërmi",
    shortTitle: "Grama Tour",
    subtitle: "3h30 Karaburun route with Blue Cave, San Andrea and Grama Bay.",
    type: "shared",
    offerTier: "premiumRoute",
    duration: "3h30",
    price: "75 € / adult • 50 € / child (5-10 years)",
    capacity: "Max 15 guests",
    departure: "Dhërmi area",
    image: assetPath("/images/tour-grama.webp"),
    cardImage: assetPath("/images/tour-grama-card.avif"),
    imageAlt: "Wide blue bay and rocky Karaburun coastline on a Dhermi boat tour",
    href: sitePath("/grama-bay-boat-tour/"),
    whatsappText: whatsappMessage([
      "👋 Hello Dhermi Boat, I'd like to ask about Grama Bay availability.",
      "",
      "🚤 Tour: Grama Bay Tour",
      "📅 Date: __",
      "👥 Adults: __",
      "🧒 Children: __",
      "🕒 Preferred time: __",
      "🌍 Language: __",
      "💬 Questions: __"
    ]),
    bestFor: "Full Karaburun route",
    highlights: ["Sailing along Karaburun Natural Park", "San Andrea Beach", "Blue Cave", "Grama Beach", "Secret Cave Karaburun option: +20 € / person (from 3 people)"],
    cardHighlights: ["Karaburun Natural Park", "San Andrea Beach", "Blue Cave", "Grama Beach"],
    included: ["Sailing along Karaburun Natural Park", "San Andrea Beach", "Blue Cave", "Grama Beach", "Secret Cave Karaburun option: +20 € / person (from 3 people)"],
    itinerary: ["Depart from the Dhërmi area", "Sail along Karaburun Natural Park", "Stop near San Andrea Beach and Blue Cave", "Spend time at Grama Beach", "Return to Dhërmi with route adjusted to sea conditions"],
    bring: ["Swimwear and towel", "Sun protection", "Water", "Light snacks if you want extra comfort"],
    safetyNote: "Cave access, stops and timing depend on sea and weather.",
    detailFaqs: [
      {
        question: "Is Grama Tour the longest shared route?",
        answer: "Yes. It is the longest shared route and includes the Karaburun coast, Blue Cave and Grama Beach."
      },
      {
        question: "Can we add Secret Cave?",
        answer: "The Secret Cave Karaburun option is +20 € / person from 3 people, depending on conditions and availability."
      },
      {
        question: "How do I know the exact departure time?",
        answer: "Preferred time and meeting point are confirmed on WhatsApp when availability is checked."
      }
    ]
  },
  {
    id: "private",
    title: "Private Boat Tour from Dhërmi, Albania",
    shortTitle: "Private tour",
    subtitle: "Custom timing, coves and swim stops.",
    type: "private",
    offerTier: "private",
    duration: "Custom, minimum 2 hours",
    price: "200 € / hour per group (minimum 2 hours)",
    capacity: "Max 15 guests",
    departure: "Dhërmi area",
    image: assetPath("/images/tour-private.webp"),
    cardImage: assetPath("/images/tour-private-card.avif"),
    imageAlt: "Dhermi Boat entering a sea cave with bright turquoise water",
    href: sitePath("/private-boat-tour-albania/"),
    whatsappText: whatsappMessage([
      "👋 Hello Dhermi Boat, I'd like to plan a private boat tour.",
      "",
      "🚤 Tour: Private Boat Tour",
      "📅 Date: __",
      "👥 Adults: __",
      "🧒 Children: __",
      "🕒 Preferred time: __",
      "🌍 Language: __",
      "💬 Questions: __"
    ]),
    bestFor: "Families, friends, custom stops",
    highlights: ["You choose everything: duration - itinerary - swimming stops - destinations", "1 drink included / person", "Ideal for families, groups of friends or special occasions"],
    cardHighlights: ["Custom duration", "Custom itinerary", "Swimming stops", "1 drink included / person"],
    included: ["You choose everything: duration - itinerary - swimming stops - destinations", "1 drink included / person", "Ideal for families, groups of friends or special occasions"],
    itinerary: ["Share date, group size and route ideas on WhatsApp", "Choose at least 2 hours", "Agree the route, coves and swimming stops", "Enjoy the private tour from Dhërmi", "Adjust the plan if sea conditions require it"],
    bring: ["Swimwear and towel", "Sun protection", "Water or personal snacks", "Your preferred route ideas"],
    safetyNote: "Private routes stay flexible when wind or waves change.",
    detailFaqs: [
      {
        question: "Can we choose the route?",
        answer: "Yes. The private tour is made for custom duration, itinerary, destinations and swimming stops."
      },
      {
        question: "What is the minimum private tour length?",
        answer: "The private tour price is 200 € / hour per group with a minimum of 2 hours."
      },
      {
        question: "How many people can join?",
        answer: "The boat is for groups up to 15 guests. Special requests are confirmed on WhatsApp."
      }
    ]
  },
  {
    id: "sunset",
    title: "Sunset Lovers Tour from Dhërmi",
    shortTitle: "Sunset Lovers Tour",
    subtitle: "Private sunset cruise for couples.",
    type: "experience",
    offerTier: "experience",
    duration: "Sunset timing",
    price: "From 120 € for 2 people",
    capacity: "Max 15 guests",
    departure: "Dhërmi area",
    image: assetPath("/images/tour-sunset.webp"),
    cardImage: assetPath("/images/tour-sunset-card.avif"),
    imageAlt: "Sunset over the Dhërmi coast from the bow of the boat",
    href: sitePath("/sunset-boat-tour/"),
    whatsappText: whatsappMessage([
      "👋 Hello Dhermi Boat, I'd like to ask about the sunset lovers tour.",
      "",
      "🚤 Tour: Sunset Lovers Tour",
      "📅 Date: __",
      "👥 Adults: __",
      "🧒 Children: __",
      "🕒 Preferred time: sunset",
      "🌍 Language: __",
      "💬 Questions: __"
    ]),
    bestFor: "Couples, proposals and quiet evenings",
    highlights: ["Golden-hour cruise", "Around Dhërmi", "Private for your group"],
    cardHighlights: ["Golden-hour cruise", "Private for your group", "Around Dhërmi", "Soft evening route"],
    included: ["Around Dhërmi", "Golden-hour cruise on the Dhërmi coast", "Private timing confirmed on WhatsApp"],
    itinerary: ["Confirm sunset availability on WhatsApp", "Meet in the Dhërmi area before sunset", "Cruise around the coast near Dhërmi", "Enjoy the sunset from the sea", "Return after the sunset cruise"],
    bring: ["Light jacket for the evening", "Phone or camera", "Water", "Comfortable beach shoes"],
    safetyNote: "Sunset timing depends on daylight and sea conditions.",
    detailFaqs: [
      {
        question: "Is the Sunset Lovers Tour for couples?",
        answer: "Yes. It is a private sunset cruise for couples, proposals and quiet evenings around Dhërmi."
      },
      {
        question: "What time does it start?",
        answer: "The exact time depends on sunset and is confirmed on WhatsApp when availability is checked."
      },
      {
        question: "Can more than two people join?",
        answer: "The starting price is for 2 people. Group details are confirmed directly on WhatsApp."
      }
    ]
  },
  {
    id: "fishing",
    title: "Morning Fishing Tour from Dhërmi",
    shortTitle: "Morning Fishing Tour",
    subtitle: "Early fishing near Dhërmi, 5 AM to 8 AM.",
    type: "experience",
    offerTier: "experience",
    duration: "5 AM to 8 AM",
    price: "100 € / hour per group (max 5 people)",
    capacity: "Max 5 guests",
    departure: "Dhërmi area",
    image: assetPath("/images/tour-fishing.webp"),
    cardImage: assetPath("/images/tour-fishing-card.avif"),
    imageAlt: "Boat helm facing the Dhërmi coastline on calm water",
    href: sitePath("/morning-fishing-tour/"),
    whatsappText: whatsappMessage([
      "👋 Hello Dhermi Boat, I'd like to ask about the morning fishing tour.",
      "",
      "🚤 Tour: Morning Fishing Tour",
      "📅 Date: __",
      "👥 Adults: __",
      "🧒 Children: __",
      "🕒 Preferred time: 5 AM to 8 AM",
      "🌍 Language: __",
      "💬 Questions: __"
    ]),
    bestFor: "Quiet sunrise fishing",
    highlights: ["Around Dhërmi", "2 fishing rods included", "5 AM to 8 AM"],
    cardHighlights: ["5 AM to 8 AM", "2 fishing rods included", "Around Dhërmi", "Max 5 people"],
    included: ["Around Dhërmi", "2 fishing rods included", "5 AM to 8 AM"],
    itinerary: ["Meet early in the Dhërmi area", "Depart around 5 AM", "Fish around the Dhërmi coast with 2 rods included", "Enjoy the calm sunrise at sea", "Return around 8 AM"],
    bring: ["Warm layer for early morning", "Water", "Sun protection for the return", "A phone or camera"],
    safetyNote: "Morning fishing runs only when the sea is suitable.",
    detailFaqs: [
      {
        question: "What time is the fishing tour?",
        answer: "The Morning Fishing Tour is planned from 5 AM to 8 AM."
      },
      {
        question: "Are fishing rods included?",
        answer: "Yes. Two fishing rods are included for the group."
      },
      {
        question: "How many people can join?",
        answer: "The fishing tour is for a maximum of 5 people."
      }
    ]
  }
];

export const tourDisplayOrder = ["sunset", "gjipe", "grama", "private", "fishing"] as const;

export const orderedTours = tourDisplayOrder
  .map((id) => tours.find((tour) => tour.id === id))
  .filter((tour): tour is Tour => Boolean(tour));

export const destinations: Destination[] = [
  {
    id: "gjipe",
    title: "Gjipe",
    eyebrow: "Gjipe Tour",
    summary: "A short Dhermi boat tour route with Pirates Cave, Gjipe Beach, Pigeon Cave, 2 coves and a 30-minute swimming stop.",
    image: assetPath("/images/tour-gjipe.webp"),
    cardImage: assetPath("/images/tour-gjipe-card.avif"),
    imageAlt: "Clear-water beach cove on the Gjipe route near Dhërmi",
    href: sitePath("/gjipe-boat-tour/"),
    highlights: ["Pirates Cave", "Gjipe Beach", "Pigeon Cave", "2 coves", "30-minute swimming stop on a beach"]
  },
  {
    id: "grama",
    title: "Grama Bay",
    eyebrow: "Grama Tour",
    summary: "A longer Dhermi boat tour route along Karaburun Natural Park, San Andrea Beach, Blue Cave, Grama Beach and Secret Cave.",
    image: assetPath("/images/tour-grama.webp"),
    cardImage: assetPath("/images/tour-grama-card.avif"),
    imageAlt: "Blue bay and rocky coastline on the longer Karaburun route",
    href: sitePath("/grama-bay-boat-tour/"),
    highlights: ["Sailing along Karaburun Natural Park", "San Andrea Beach", "Blue Cave", "Grama Beach", "Secret Cave"]
  },
  {
    id: "blue-cave",
    title: "Blue Cave",
    eyebrow: "Blue Cave",
    summary: "Karaburun cave stop with bright blue water, usually paired with the Dhermi boat tour route to Grama Bay.",
    image: assetPath("/images/gallery-blue-cave.webp"),
    cardImage: assetPath("/images/gallery-blue-cave-card.avif"),
    imageAlt: "Rock arch and bright blue water at a Karaburun cave stop",
    href: sitePath("/destinations/blue-cave/"),
    highlights: ["Blue Cave"]
  }
];

export const tourComparison: TourComparisonItem[] = [
  { angle: "Lovers sunset", tourId: "sunset", duration: "sunset", price: "from €120" },
  { angle: "Best value", tourId: "gjipe", duration: "1h30", price: "from €35" },
  { angle: "Most complete route", tourId: "grama", duration: "3h30", price: "from €75" },
  { angle: "Private option", tourId: "private", duration: "custom", price: "€200/hour" },
  { angle: "Morning fishing", tourId: "fishing", duration: "5 AM to 8 AM", price: "€100/hour" }
];

export const gallery = [
  { src: assetPath("/images/gallery-blue-cove-boat.webp"), alt: "Dhermi Boat entering a sea cave with turquoise water" },
  { src: assetPath("/images/gallery-blue-cave.webp"), alt: "Rock arch and bright blue water at a Karaburun cave stop" },
  { src: assetPath("/images/gallery-clear-water.webp"), alt: "Clear turquoise water beside the boat on the Albanian Riviera" },
  { src: assetPath("/images/gallery-cave-entrance.webp"), alt: "Boat bow facing a sea cave entrance near Dhërmi" },
  { src: assetPath("/images/tour-gjipe.webp"), alt: "Clear-water beach cove on the Gjipe route near Dhërmi" },
  { src: assetPath("/images/gallery-boat-beach.webp"), alt: "Dhermi Boat on the beach before a sea tour" },
  { src: assetPath("/images/gallery-sunset-bow.webp"), alt: "Sunset from the bow of Dhermi Boat" },
  { src: assetPath("/images/gallery-canyon-water.webp"), alt: "Limestone cave wall above bright turquoise water" },
  { src: assetPath("/images/gallery-blue-wall.webp"), alt: "Blue water below a rocky cave wall on the coast" },
  { src: assetPath("/images/gallery-coastline.webp"), alt: "Calm sea and rocky coastline near Dhërmi" },
  { src: assetPath("/images/gallery-limestone-cliff.webp"), alt: "Karaburun cliffs and blue water seen from the boat" },
  { src: assetPath("/images/gallery-boat-view.webp"), alt: "Onboard view from Dhermi Boat toward the coast" }
];

export const reviews = [
  {
    name: "Julie Dw",
    detail: "Local Guide • 21 avis • 4 photos · Il y a 11 semaines",
    rating: 5,
    text: "Super expérience en bateau en Albanie ! Le capitaine est une personne passionnée, très sympa et bienveillante, il met tout de suite en confiance et l'ambiance à bord est juste top."
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
  "Local route advice",
  "EN / FR / AL",
  "Routes follow sea conditions",
  "Meeting point on WhatsApp"
];

export const skipper = {
  name: "Local route",
  image: assetPath("/images/gallery-blue-cove-boat.webp"),
  imageAlt: "Dhermi Boat in a turquoise cove near Dhërmi",
  text: "Direct booking, clear meeting point and routes adjusted to the sea."
};

export const usefulInformation = [
  "Departure from the Dhërmi area",
  "Small groups, up to 15 guests depending on the tour",
  "Routes confirmed after checking sea conditions"
];

export const faqs = [
  {
    question: "How do I book a tour?",
    answer: "Send date, guests and tour on WhatsApp. We reply with availability."
  },
  {
    question: "Where is the departure point?",
    answer: "Departure is around Dhërmi. Exact point comes on WhatsApp."
  },
  {
    question: "Is parking possible near departure?",
    answer: "Parking options depend on the exact meeting point and season. We confirm the easiest arrival instructions on WhatsApp before departure."
  },
  {
    question: "Can I pay cash or card?",
    answer: "Payment details come after availability is checked."
  },
  {
    question: "Do tours depend on the weather?",
    answer: "Yes. Wind and waves can change the route or timing."
  },
  {
    question: "What happens if the sea is not safe?",
    answer: "If the route is not safe, timing or route changes."
  },
  {
    question: "Can I choose a private tour?",
    answer: "Yes. Private trips are best when you want your own timing and stops."
  },
  {
    question: "What should I bring?",
    answer: "Bring swimwear, towel, sun protection, water and a charged phone."
  },
  {
    question: "Are life jackets included?",
    answer: "Yes. Safety equipment is part of the boat setup."
  },
  {
    question: "Can I bring bags and towels?",
    answer: "Yes, bring compact bags, towels and beach essentials. Keep valuables protected from water during swim stops."
  },
  {
    question: "How many people can join?",
    answer: "Most tours are up to 15 guests. Fishing is up to 5."
  },
  {
    question: "How long is the swim stop?",
    answer: "Gjipe includes about 30 minutes. Private routes are flexible."
  },
  {
    question: "Is the tour private or shared?",
    answer: "Gjipe and Grama are shared small-group tours. Private, sunset and some custom requests are planned for your group only."
  },
  {
    question: "Are children allowed?",
    answer: "Yes. Child prices apply on Gjipe and Grama for ages 5-10."
  },
  {
    question: "Can we choose swimming stops?",
    answer: "Yes on private tours. Sea conditions still decide the final route."
  },
  {
    question: "Is the meeting point confirmed by WhatsApp?",
    answer: "Yes. Exact point is sent on WhatsApp after availability."
  },
  {
    question: "Can I be dropped off at Gjipe?",
    answer: "A Gjipe beach drop-off option can be arranged for +15 € / person, depending on timing, availability and sea conditions."
  },
  {
    question: "Which languages does the skipper speak?",
    answer: "Albanian, French and English."
  }
];

export const trustBadges = [
  "5-star guest reviews",
  "Small groups, max 15 guests",
  "Local route",
  "Daily departures",
  "Sea-condition routes"
];

export const primaryWhatsappHref = whatsappUrl(defaultBookingMessage);
