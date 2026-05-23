import { assetPath, defaultBookingMessage, sitePath, whatsappUrl } from "@/lib/site";

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
  imageAlt?: string;
  href: string;
  legacyHref?: string;
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
  { label: "Private", href: sitePath("/tours/private/") },
  { label: "Destinations", href: sitePath("/destinations/") },
  { label: "FAQ", href: sitePath("/faq/") },
  { label: "Contact", href: sitePath("/contact/") }
];

export const heroImage = assetPath("/images/hero-riviera.webp");

export const tours: Tour[] = [
  {
    id: "gjipe",
    title: "Gjipe Boat Tour from Dhërmi",
    shortTitle: "Gjipe Tour",
    subtitle: "A quick coastal boat trip for caves, clear water and a swim stop at Gjipe.",
    type: "shared",
    duration: "1h30",
    price: "35 € / adult • 20 € / child (5-10 years)",
    capacity: "MAX 15 GUESTS",
    departure: "Dhërmi area",
    image: assetPath("/images/tour-gjipe.webp"),
    imageAlt: "Gjipe Beach seen from above with turquoise water and limestone cliffs",
    href: sitePath("/gjipe-boat-tour/"),
    legacyHref: sitePath("/destinations/gjipe/"),
    whatsappText: "Hello Dhermi Boat, I would like to book the Gjipe Tour. Date: __ / Adults: __ / Children: __",
    bestFor: "Quick swim & caves",
    highlights: ["Pirates Cave", "Gjipe Beach", "Pigeon Cave", "2 coves", "30-minute swimming stop on a beach", "Beach drop-off option: +15 € / person (drop-off for the day or a few hours, depending on what you want)"],
    cardHighlights: ["Pirates Cave", "Gjipe Beach", "Pigeon Cave", "30-minute swim stop"],
    included: ["Pirates Cave", "Gjipe Beach", "Pigeon Cave", "2 coves", "30-minute swimming stop on a beach", "Beach drop-off option: +15 € / person (drop-off for the day or a few hours, depending on what you want)"],
    itinerary: ["Depart from the Dhërmi area", "Cruise to Pirates Cave and nearby coves", "Visit Gjipe Beach and Pigeon Cave", "Stop for around 30 minutes of swimming", "Return to Dhërmi or arrange the beach drop-off option"],
    bring: ["Swimwear and towel", "Sun protection", "Water", "A charged phone for photos"],
    safetyNote: "Routes and timing may change depending on sea conditions. The meeting point is confirmed on WhatsApp.",
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
    subtitle: "A longer Riviera route with Karaburun, Blue Cave and Grama Beach.",
    type: "shared",
    duration: "3h30",
    price: "75 € / adult • 50 € / child (5-10 years)",
    capacity: "MAX 15 GUESTS",
    departure: "Dhërmi area",
    image: assetPath("/images/tour-grama.webp"),
    imageAlt: "Grama Bay seen from above with clear blue water and rocky coastline",
    href: sitePath("/grama-bay-boat-tour/"),
    legacyHref: sitePath("/destinations/grama-bay/"),
    whatsappText: "Hello Dhermi Boat, I would like to book the Grama Bay Tour. Date: __ / Adults: __ / Children: __",
    bestFor: "Full Riviera experience",
    highlights: ["Sailing along Karaburun Natural Park", "San Andrea Beach", "Blue Cave", "Grama Beach", "Secret Cave Karaburun option: +20 € / person (from 3 people)"],
    cardHighlights: ["Karaburun Natural Park", "San Andrea Beach", "Blue Cave", "Grama Beach"],
    included: ["Sailing along Karaburun Natural Park", "San Andrea Beach", "Blue Cave", "Grama Beach", "Secret Cave Karaburun option: +20 € / person (from 3 people)"],
    itinerary: ["Depart from the Dhërmi area", "Sail along Karaburun Natural Park", "Stop near San Andrea Beach and Blue Cave", "Spend time at Grama Beach", "Return to Dhërmi with route adjusted to sea conditions"],
    bring: ["Swimwear and towel", "Sun protection", "Water", "Light snacks if you want extra comfort"],
    safetyNote: "The skipper adapts cave access, stops and timing to the sea and weather on the day.",
    detailFaqs: [
      {
        question: "Is Grama Tour the best full trip?",
        answer: "Yes. It is the longer shared route and includes the Karaburun coast, Blue Cave and Grama Beach."
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
    shortTitle: "Tailor-made private tour",
    subtitle: "Choose the route, timing and swimming stops for your group.",
    type: "private",
    duration: "Custom, minimum 2 hours",
    price: "200 € / hour per group (minimum 2 hours)",
    capacity: "MAX 15 GUESTS",
    departure: "Dhërmi area",
    image: assetPath("/images/tour-private.webp"),
    imageAlt: "Dhermi Boat beside a sea cave with clear turquoise water",
    href: sitePath("/private-boat-tour-albania/"),
    legacyHref: sitePath("/tours/private/"),
    whatsappText: "Hello Dhermi Boat, I would like a private boat tour. Date: __ / People: __ / Hours: __ / Places: __",
    bestFor: "Families & groups",
    highlights: ["You choose everything: duration - itinerary - swimming stops - destinations", "1 drink included / person", "Ideal for families, groups of friends or special occasions"],
    cardHighlights: ["Custom duration", "Custom itinerary", "Swimming stops", "1 drink included / person"],
    included: ["You choose everything: duration - itinerary - swimming stops - destinations", "1 drink included / person", "Ideal for families, groups of friends or special occasions"],
    itinerary: ["Share your preferred date, group size and ideas on WhatsApp", "Choose a duration of at least 2 hours", "Agree the route, coves and swimming stops with the skipper", "Enjoy the private tour from Dhërmi", "Adjust the plan if sea conditions require it"],
    bring: ["Swimwear and towel", "Sun protection", "Water or personal snacks", "Your preferred route ideas"],
    safetyNote: "Custom routes are confirmed by the skipper and may change depending on wind, waves and sea conditions.",
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
    title: "Sunset Private Tour from Dhërmi",
    shortTitle: "Sunset Private Tour",
    subtitle: "Romantic sunset cruise",
    type: "experience",
    duration: "Sunset timing",
    price: "From 120 € for 2 people",
    capacity: "MAX 15 GUESTS",
    departure: "Dhërmi area",
    image: assetPath("/images/tour-sunset.webp"),
    imageAlt: "Sunset over the Albanian Riviera from the front of the boat",
    href: sitePath("/sunset-boat-tour/"),
    legacyHref: sitePath("/tours/private/#sunset"),
    whatsappText: "Hello Dhermi Boat, I would like to ask about the Sunset Private Tour. Date: __ / People: __",
    bestFor: "Couples",
    highlights: ["Around Dhërmi"],
    cardHighlights: ["Romantic sunset cruise", "Around Dhërmi", "Private experience"],
    included: ["Around Dhërmi", "Romantic sunset cruise around Dhërmi", "Private timing confirmed on WhatsApp"],
    itinerary: ["Confirm sunset availability on WhatsApp", "Meet in the Dhërmi area before sunset", "Cruise around the coast near Dhërmi", "Enjoy the sunset from the sea", "Return after the sunset cruise"],
    bring: ["Light jacket for the evening", "Phone or camera", "Water", "Comfortable beach shoes"],
    safetyNote: "Sunset timing and route are confirmed on WhatsApp and may change depending on sea conditions.",
    detailFaqs: [
      {
        question: "Is the Sunset Private Tour for couples?",
        answer: "Yes. It is designed as a romantic private sunset cruise around Dhërmi."
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
    subtitle: "An authentic and peaceful sunrise experience",
    type: "experience",
    duration: "5 AM to 8 AM",
    price: "100 € / hour per group (max 5 people)",
    capacity: "MAX 5 GUESTS",
    departure: "Dhërmi area",
    image: assetPath("/images/tour-fishing.webp"),
    imageAlt: "Fishing rods on Dhermi Boat at sunrise near the Riviera mountains",
    href: sitePath("/morning-fishing-tour/"),
    legacyHref: sitePath("/tours/private/#fishing"),
    whatsappText: "Hello Dhermi Boat, I would like to ask about the Morning Fishing Tour. Date: __ / People: __",
    bestFor: "Calm sunrise experience",
    highlights: ["Around Dhërmi", "2 fishing rods included", "5 AM to 8 AM"],
    cardHighlights: ["5 AM to 8 AM", "2 fishing rods included", "Around Dhërmi", "Max 5 people"],
    included: ["Around Dhërmi", "2 fishing rods included", "5 AM to 8 AM"],
    itinerary: ["Meet early in the Dhërmi area", "Depart around 5 AM", "Fish around the Dhërmi coast with 2 rods included", "Enjoy the calm sunrise at sea", "Return around 8 AM"],
    bring: ["Warm layer for early morning", "Water", "Sun protection for the return", "A phone or camera"],
    safetyNote: "Morning fishing depends on sea conditions. The meeting point and exact timing are confirmed on WhatsApp.",
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

export const destinations: Destination[] = [
  {
    id: "gjipe",
    title: "Gjipe",
    eyebrow: "Gjipe Tour",
    summary: "Pirates Cave, Gjipe Beach, Pigeon Cave, 2 coves, 30-minute swimming stop on a beach.",
    image: assetPath("/images/tour-gjipe.webp"),
    imageAlt: "Gjipe Beach seen from above with turquoise water and cliffs",
    href: sitePath("/destinations/gjipe/"),
    highlights: ["Pirates Cave", "Gjipe Beach", "Pigeon Cave", "2 coves", "30-minute swimming stop on a beach"]
  },
  {
    id: "grama",
    title: "Grama Bay",
    eyebrow: "Grama Tour",
    summary: "Sailing along Karaburun Natural Park, San Andrea Beach, Blue Cave, Grama Beach, Secret Cave.",
    image: assetPath("/images/tour-grama.webp"),
    imageAlt: "Grama Bay and clear blue water seen from above",
    href: sitePath("/destinations/grama-bay/"),
    highlights: ["Sailing along Karaburun Natural Park", "San Andrea Beach", "Blue Cave", "Grama Beach", "Secret Cave"]
  },
  {
    id: "blue-cave",
    title: "Blue Cave",
    eyebrow: "Blue Cave",
    summary: "Blue Cave.",
    image: assetPath("/images/gallery-blue-cave.webp"),
    imageAlt: "Blue Cave water and rock opening on the Albanian Riviera",
    href: sitePath("/destinations/blue-cave/"),
    highlights: ["Blue Cave"]
  }
];

export const tourComparison: TourComparisonItem[] = [
  { angle: "Quick adventure", tourId: "gjipe", duration: "1h30", price: "from €35" },
  { angle: "Best full trip", tourId: "grama", duration: "3h30", price: "from €75" },
  { angle: "Best for groups", tourId: "private", duration: "custom", price: "€200/hour" },
  { angle: "Best for couples", tourId: "sunset", duration: "sunset", price: "from €120" },
  { angle: "Best unique experience", tourId: "fishing", duration: "5 AM to 8 AM", price: "€100/hour" }
];

export const gallery = [
  { src: assetPath("/images/gallery-blue-cove-boat.webp"), alt: "Dhermi Boat entering a clear cove near Dhërmi" },
  { src: assetPath("/images/gallery-canyon-water.webp"), alt: "Boat approaching a cave between limestone cliffs" },
  { src: assetPath("/images/gallery-blue-cave.webp"), alt: "Blue Cave water and rock opening on the Albanian Riviera" },
  { src: assetPath("/images/gallery-clear-water.webp"), alt: "Clear turquoise water beside the boat" },
  { src: assetPath("/images/gallery-cave-entrance.webp"), alt: "Boat bow facing a sea cave entrance" },
  { src: assetPath("/images/gallery-boat-beach.webp"), alt: "Quiet beach cove reached by boat" },
  { src: assetPath("/images/gallery-sunset-bow.webp"), alt: "Sunset from the bow of Dhermi Boat" },
  { src: assetPath("/images/gallery-blue-wall.webp"), alt: "Blue water below a rocky cave wall" }
];

export const reviews = [
  {
    name: "Julie Dw",
    detail: "Local Guide • 21 avis • 4 photos · Il y a 11 semaines",
    rating: 5,
    text: "Super expérience en bateau en Albanie ! Isuf est une personne passionnée, très sympa et bienveillante, il met tout de suite en confiance et l'ambiance à bord est juste top."
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
  "Friendly atmosphere"
];

export const skipper = {
  name: "Isuf",
  image: assetPath("/images/gallery-blue-cove-boat.webp"),
  imageAlt: "Dhermi Boat in a turquoise cove near Dhërmi",
  text: "Isuf is a local skipper who loves sharing Albanian history, culture and landscapes. He speaks Albanian and French, with good English for guest communication."
};

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
  },
  {
    question: "Are children allowed?",
    answer: "Yes. Children are welcome, and child prices apply on the Gjipe and Grama shared tours for ages 5-10."
  },
  {
    question: "Can we choose swimming stops?",
    answer: "On private tours, you can request swimming stops and destinations. Routes and timing may change depending on sea conditions."
  },
  {
    question: "How do we pay?",
    answer: "Payment details are confirmed on WhatsApp when availability is checked."
  },
  {
    question: "Is the meeting point confirmed by WhatsApp?",
    answer: "Yes. The exact meeting point in the Dhërmi area is confirmed by WhatsApp after availability is checked."
  }
];

export const trustBadges = [
  "From €35",
  "Daily departures",
  "Max 15 guests",
  "Local skipper",
  "English • French • Albanian"
];

export const primaryWhatsappHref = whatsappUrl(defaultBookingMessage);
