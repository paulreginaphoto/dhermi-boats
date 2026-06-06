import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, CalendarDays, CheckCircle2, ChevronLeft, ChevronRight, Clock3, Euro, HelpCircle, Mail, MapPin, Maximize2, MessageCircle, Phone, ShieldCheck, Star, Users, Waves, X } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { FAQAccordion } from "@/components/FAQAccordion";
import { GalleryViewerRuntime } from "@/components/GalleryViewerRuntime";
import { InlineRuntimeScript } from "@/components/InlineRuntimeScript";
import { LocalizedText } from "@/components/LocalizedText";
import { SEOJsonLd } from "@/components/SEOJsonLd";
import { faqs, gallery, orderedTours, reviews, tourComparison, type Tour } from "@/data/content";
import { canonical, emailAddress, googleMapsUrl, languageAlternates, phoneDisplay, whatsappNumber } from "@/lib/site";
import { faqSchema, homePageSchema, touristTripSchema } from "@/lib/seo";
import { translations } from "@/lib/i18n";
import { whatsappHrefForKey, type WhatsappMessageKey } from "@/lib/whatsappMessages";

const enText = (key: string) => translations.en[key] ?? "";
const homepageTourOrder = ["sunset", "private", "gjipe", "grama", "fishing"] as const;
const tourById = new Map(orderedTours.map((tour) => [tour.id, tour]));
const featuredTours = homepageTourOrder
  .map((id) => tourById.get(id))
  .filter((tour): tour is Tour => Boolean(tour));
const comparisonByTourId = new Map(tourComparison.map((item) => [item.tourId, item]));
const minimalBookingLocales = ["en", "fr", "sq"] as const;
const minimalTourLabels = Object.fromEntries(
  minimalBookingLocales.map((locale) => [
    locale,
    Object.fromEntries([
      ["not-sure", translations[locale]["minimal.contact.form.tourUnsure"] ?? translations.en["minimal.contact.form.tourUnsure"] ?? "Not sure yet"],
      ...featuredTours.map((tour) => [
        tour.id,
        translations[locale][`tour.${tour.id}.shortTitle`] ?? tour.shortTitle
      ])
    ])
  ])
);
const featuredGallery = gallery.slice(0, 8);
const featuredReviews = reviews.slice(0, 3);
const homepageFaqs = [0, 1, 4, 6, 13, 17].map((index) => ({ ...faqs[index], translationIndex: index }));

const heroTrust = [
  { key: "v2.hero.trust.reviews", icon: Star },
  { key: "v2.hero.trust.language", icon: MessageCircle },
  { key: "v2.hero.trust.capacity", icon: Users },
  { key: "v2.hero.trust.price", icon: Euro }
];

const skipperProof = [
  { key: "v2.skipper.proof.local", icon: MapPin },
  { key: "v2.skipper.proof.languages", icon: MessageCircle },
  { key: "v2.skipper.proof.weather", icon: ShieldCheck }
];

const tourIcons = {
  gjipe: MapPin,
  grama: Waves,
  private: Users,
  sunset: Star,
  fishing: Clock3
};

const galleryCaptions = [
  "v2.gallery.caption.0",
  "v2.gallery.caption.1",
  "v2.gallery.caption.2",
  "v2.gallery.caption.3",
  "v2.gallery.caption.4",
  "v2.gallery.caption.5",
  "v2.gallery.caption.6",
  "v2.gallery.caption.7"
];

const skipperActivityImages = [
  {
    tourId: "gjipe",
    src: "/images/tour-gjipe-card.avif",
    alt: "Clear water and cave route on the Gjipe boat tour"
  },
  {
    tourId: "grama",
    src: "/images/tour-grama-card.avif",
    alt: "Karaburun coastline on the Grama Bay boat tour"
  },
  {
    tourId: "sunset",
    src: "/images/tour-sunset-card.avif",
    alt: "Sunset light from a private Dhërmi boat tour"
  },
  {
    tourId: "fishing",
    src: "/images/tour-fishing-card.avif",
    alt: "Morning fishing setup from Dhermi Boat"
  }
];

function scriptJson(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

const minimalAvailabilityFormScript = String.raw`
(function () {
  var config = ${scriptJson({
    whatsappNumber,
    labels: {
      en: {
        intro: "Hello Dhermi Boat :) I would like to check availability.",
        tour: "Preferred tour",
        name: "Name",
        date: "Date",
        people: "People",
        message: "Message",
        missingTour: "Not sure yet",
        missingName: "Add your name",
        missingDate: "Choose a date",
        missingPeople: "Add people",
        missingMessage: "No extra note"
      },
      fr: {
        intro: "Bonjour Dhermi Boat :) je voudrais verifier la disponibilite.",
        tour: "Tour souhaite",
        name: "Nom",
        date: "Date",
        people: "Personnes",
        message: "Message",
        missingTour: "Pas encore sur",
        missingName: "Ajoutez votre nom",
        missingDate: "Choisissez une date",
        missingPeople: "Ajoutez le nombre de personnes",
        missingMessage: "Pas de note en plus"
      },
      sq: {
        intro: "Pershendetje Dhermi Boat :) dua te kontrolloj disponueshmerine.",
        tour: "Turi i preferuar",
        name: "Emri",
        date: "Data",
        people: "Persona",
        message: "Mesazh",
        missingTour: "Ende nuk jam i sigurt",
        missingName: "Shtoni emrin",
        missingDate: "Zgjidhni daten",
        missingPeople: "Shtoni numrin e personave",
        missingMessage: "Pa shenim shtese"
      }
    },
    tourLabels: minimalTourLabels,
    monthNames: {
      en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      fr: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
      sq: ["Janar", "Shkurt", "Mars", "Prill", "Maj", "Qershor", "Korrik", "Gusht", "Shtator", "Tetor", "Nëntor", "Dhjetor"]
    }
  })};

  function normalizeLocale(value) {
    if (!value) return "en";
    var normalized = String(value).toLowerCase().replace("_", "-");
    if (normalized === "al" || normalized === "sq-al") return "sq";
    var primary = normalized.split("-")[0];
    return primary === "fr" || primary === "sq" || primary === "en" ? primary : "en";
  }

  function readLocale() {
    try {
      var params = new URL(window.location.href).searchParams;
      return normalizeLocale(params.get("dlang") || params.get("lang") || window.localStorage.getItem("dhermi-language") || document.documentElement.lang);
    } catch (error) {
      return "en";
    }
  }

  var unsafeWhatsappSymbols = /[\uD83C-\uDBFF][\uDC00-\uDFFF]|[\u2600-\u27BF]|\uFFFD/g;

  function cleanWhatsappMessage(message) {
    return String(message || "")
      .replace(unsafeWhatsappSymbols, "")
      .replace(/[ \t]+\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }

  function encodeMessage(message) {
    return "https://wa.me/" + config.whatsappNumber + "?text=" + encodeURIComponent(cleanWhatsappMessage(message));
  }

  function formatBookingDate(value, locale) {
    var parts = String(value || "").split("-");
    if (parts.length !== 3) return value || "";
    var day = Number(parts[2]);
    var month = Number(parts[1]);
    var year = parts[0];
    var configuredMonths = config.monthNames || {};
    var monthNames = configuredMonths[locale] || configuredMonths.fr || [];
    var monthName = monthNames[month - 1];
    var readableDate = day + " " + monthName + " " + year;
    return day && monthName ? readableDate : value || "";
  }

  function initForm(form) {
    var locale = readLocale();
    var labels = config.labels[locale] || config.labels.en;
    var tourLabels = config.tourLabels[locale] || config.tourLabels.en;
    var tourInput = form.querySelector("[name='tour']");
    var nameInput = form.querySelector("[name='name']");
    var dateInput = form.querySelector("[name='date']");
    var peopleInput = form.querySelector("[name='people']");
    var messageInput = form.querySelector("[name='message']");
    var action = form.querySelector("[data-minimal-booking-action]");
    var summary = form.querySelector("[data-minimal-booking-summary]");
    if (!tourInput || !nameInput || !dateInput || !peopleInput || !messageInput || !action || !summary) return;

    function selectedTourText() {
      var label = tourLabels[tourInput.value];
      var selected = typeof tourInput.item === "function" ? tourInput.item(tourInput.selectedIndex) : null;
      if (label) return label;
      if (!selected || !selected.textContent) return "";
      return selected.textContent.trim();
    }

    function buildMessage() {
      return [
        labels.intro,
        "",
        labels.tour + ": " + (selectedTourText() || labels.missingTour),
        labels.name + ": " + (nameInput.value.trim() || labels.missingName),
        labels.date + ": " + (formatBookingDate(dateInput.value, locale) || labels.missingDate),
        labels.people + ": " + (peopleInput.value || labels.missingPeople),
        labels.message + ": " + (messageInput.value.trim() || labels.missingMessage)
      ].join("\n");
    }

    function update() {
      var ready = Boolean(nameInput.value.trim() && dateInput.value && peopleInput.value);
      var message = buildMessage();
      summary.textContent = message;
      action.href = ready ? encodeMessage(message) : "#minimal-booking-form";
      action.setAttribute("aria-disabled", ready ? "false" : "true");
      if (ready) {
        action.setAttribute("target", "_blank");
        action.setAttribute("rel", "noreferrer");
      } else {
        action.removeAttribute("target");
        action.removeAttribute("rel");
      }
    }

    action.addEventListener("click", function (event) {
      if (nameInput.value.trim() && dateInput.value && peopleInput.value) return;
      event.preventDefault();
      var target = !nameInput.value.trim() ? nameInput : !dateInput.value ? dateInput : peopleInput;
      target.focus({ preventScroll: true });
      target.scrollIntoView({ block: "center", behavior: "smooth" });
    });

    [tourInput, nameInput, dateInput, peopleInput, messageInput].forEach(function (input) {
      input.addEventListener("input", update);
      input.addEventListener("change", update);
    });

    update();
  }

  function init() {
    document.querySelectorAll("[data-minimal-booking-form]").forEach(initForm);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
`;

const galleryViewerScript = String.raw`
(function () {
  var root = document.querySelector("[data-gallery-viewer]");
  if (!root) return;
  if (root.getAttribute("data-gallery-bound") === "true") return;

  var links = Array.prototype.slice.call(root.querySelectorAll("[data-gallery-open]"));
  var modal = root.querySelector("[data-gallery-modal]");
  var image = root.querySelector("[data-gallery-modal-image]");
  var counter = root.querySelector("[data-gallery-counter]");
  var thumbs = Array.prototype.slice.call(root.querySelectorAll("[data-gallery-thumb]"));
  var lastFocus = null;
  var currentIndex = 0;

  if (!links.length || !modal || !image || !counter) return;
  root.setAttribute("data-gallery-bound", "true");

  var items = links.map(function (link, index) {
    return {
      src: link.getAttribute("data-gallery-src") || link.getAttribute("href") || "",
      alt: link.getAttribute("data-gallery-alt") || "",
      index: index
    };
  });
  var totalItems = items.length;

  function setBodyLock(locked) {
    document.body.toggleAttribute("data-gallery-open", locked);
  }

  function update(index) {
    currentIndex = (index + totalItems) % totalItems;
    var item = items[currentIndex];
    image.src = item.src;
    image.alt = item.alt;
    counter.textContent = String(currentIndex + 1) + " / " + String(totalItems);
    thumbs.forEach(function (thumb, thumbIndex) {
      var active = thumbIndex === currentIndex;
      thumb.toggleAttribute("data-active", active);
      if (active) thumb.setAttribute("aria-current", "true");
      else thumb.removeAttribute("aria-current");
    });
  }

  function open(index, focusTarget) {
    lastFocus = focusTarget || document.activeElement;
    update(index);
    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
    setBodyLock(true);
    var closeButton = modal.querySelector("[data-gallery-close]");
    if (closeButton && typeof closeButton.focus === "function") closeButton.focus({ preventScroll: true });
  }

  function close() {
    modal.hidden = true;
    modal.setAttribute("aria-hidden", "true");
    setBodyLock(false);
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus({ preventScroll: true });
  }

  function closestTarget(event, selector) {
    var source = event.target;
    if (!source || !source.closest) return null;
    return source.closest(selector);
  }

  root.addEventListener("click", function (event) {
    var openLink = closestTarget(event, "[data-gallery-open]");
    if (openLink && root.contains(openLink)) {
      event.preventDefault();
      open(Number(openLink.getAttribute("data-gallery-index") || "0"), openLink);
      return;
    }

    var thumbButton = closestTarget(event, "[data-gallery-thumb]");
    if (thumbButton && root.contains(thumbButton)) {
      var thumbIndex = thumbs.indexOf(thumbButton);
      if (thumbIndex >= 0) update(thumbIndex);
      return;
    }

    if (closestTarget(event, "[data-gallery-close]")) {
      close();
      return;
    }

    if (closestTarget(event, "[data-gallery-next]")) {
      update(currentIndex + 1);
      return;
    }

    if (closestTarget(event, "[data-gallery-prev]")) {
      update(currentIndex - 1);
      return;
    }

    var clickTarget = event.target;
    if (clickTarget && clickTarget.hasAttribute("data-gallery-backdrop")) close();
  });

  document.addEventListener("keydown", function (event) {
    if (modal.hidden) return;
    if (event.key === "Escape") close();
    if (event.key === "ArrowRight") update(currentIndex + 1);
    if (event.key === "ArrowLeft") update(currentIndex - 1);
  });
})();
`;

export const metadata: Metadata = {
  title: {
    absolute: "Dhërmi Boat Tours with Local Skipper | Dhermi Boat"
  },
  description:
    "Book premium small-group and private boat tours from Dhërmi with a local skipper. Gjipe, Grama Bay, Blue Cave, sunset tours and WhatsApp availability.",
  alternates: { canonical: canonical("/"), languages: languageAlternates("/") }
};

export default function HomePage() {
  return (
    <>
      <SEOJsonLd data={[homePageSchema(), ...featuredTours.map((tour) => touristTripSchema(tour)), faqSchema(homepageFaqs)]} />

      <section data-home-section="hero" data-sticky-relief-target className="relative isolate overflow-hidden bg-navy text-pearl">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-riviera-tablet-lcp.avif"
            alt="Dhermi Boat crossing turquoise water below the Albanian Riviera cliffs"
            fill
            priority
            quality={75}
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/18 via-navy/38 to-navy/92" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(31,124,134,0.28),transparent_34%),linear-gradient(90deg,rgba(7,27,38,0.84),rgba(7,27,38,0.38)_55%,rgba(7,27,38,0.1))]" />
        </div>

        <div className="relative mx-auto grid min-h-[calc(70svh-5rem)] max-w-site items-end gap-8 px-5 pb-5 pt-8 md:min-h-[calc(86svh-5rem)] md:grid-cols-[1fr_22rem] md:px-8 md:pb-12 md:pt-24 lg:grid-cols-[1fr_25rem]">
          <div className="max-w-5xl">
            <h1 className="photo-title max-w-5xl font-serif text-[2.18rem] font-medium leading-[0.98] text-pearl max-[360px]:text-[2rem] sm:text-6xl md:text-7xl">
              <LocalizedText id="v2.hero.title">{enText("v2.hero.title")}</LocalizedText>
            </h1>
            <p className="photo-copy mt-4 max-w-2xl text-base leading-7 text-pearl/94 md:mt-6 md:text-xl md:leading-8">
              <LocalizedText id="v2.hero.text">{enText("v2.hero.text")}</LocalizedText>
            </p>

            <div className="mt-5 grid grid-cols-2 gap-1.5 text-[0.68rem] font-bold text-pearl sm:flex sm:flex-wrap sm:gap-2 sm:text-xs md:mt-7">
              {heroTrust.map((item) => {
                const Icon = item.icon;

                return (
                  <span key={item.key} className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg border border-white/16 bg-ink/78 px-2 py-2 text-center shadow-sm backdrop-blur sm:gap-2 sm:px-3">
                    <Icon className="h-4 w-4 shrink-0 text-sand" aria-hidden />
                    <LocalizedText id={item.key}>{enText(item.key)}</LocalizedText>
                  </span>
                );
              })}
            </div>

            <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:items-center md:mt-8 md:gap-3">
              <ButtonLink href={whatsappHrefForKey("default")} icon={MessageCircle} variant="dark" whatsappKey="default" analyticsPlacement="v2_hero">
                <LocalizedText id="cta.heroWhatsapp">{enText("cta.heroWhatsapp")}</LocalizedText>
              </ButtonLink>
              <ButtonLink href="#tours" icon={ArrowRight} variant="secondary" className="border-white/0 bg-pearl text-ink shadow-sm hover:bg-white focus-visible:ring-pearl">
                <LocalizedText id="cta.compareTours">{enText("cta.compareTours")}</LocalizedText>
              </ButtonLink>
            </div>
            <p className="mt-3 inline-flex max-w-xl items-start gap-2 rounded-lg border border-white/15 bg-ink/82 px-3 py-2 text-xs font-semibold leading-5 text-pearl shadow-sm backdrop-blur-md md:mt-4 md:px-3.5 md:py-2.5 md:text-sm md:leading-6">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-sand" aria-hidden />
              <LocalizedText id="minimal.reassurance">{enText("minimal.reassurance")}</LocalizedText>
            </p>
          </div>

          <aside className="hidden rounded-xl border border-white/18 bg-white/12 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_30px_90px_rgba(7,27,38,0.3)] backdrop-blur-xl md:block">
            <div className="flex items-center gap-2 text-sand">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="h-4 w-4 fill-current" aria-hidden />
              ))}
            </div>
            <p className="mt-4 text-sm font-semibold leading-7 text-pearl/92">
              <LocalizedText id="v2.hero.side.text">{enText("v2.hero.side.text")}</LocalizedText>
            </p>
            <div className="mt-5 grid gap-2 text-sm font-bold text-pearl">
              <span className="rounded-lg bg-ink/70 px-3 py-2">
                <LocalizedText id="v2.hero.side.point.0">{enText("v2.hero.side.point.0")}</LocalizedText>
              </span>
              <span className="rounded-lg bg-ink/70 px-3 py-2">
                <LocalizedText id="v2.hero.side.point.1">{enText("v2.hero.side.point.1")}</LocalizedText>
              </span>
            </div>
          </aside>
        </div>
      </section>

      <section data-home-section="social-proof" id="reviews" className="bg-pearl py-8 md:py-16">
        <div className="site-band">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-bronze">
                <LocalizedText id="v2.social.label">{enText("v2.social.label")}</LocalizedText>
              </p>
              <h2 className="mt-3 max-w-lg font-serif text-4xl font-medium leading-tight text-ink md:text-5xl">
                <LocalizedText id="v2.social.title">{enText("v2.social.title")}</LocalizedText>
              </h2>
              <a className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-ink/12 bg-white px-4 text-sm font-semibold text-ink transition hover:bg-limestone" href={googleMapsUrl} rel="noreferrer" target="_blank" data-analytics-event="maps_click">
                <MapPin className="h-4 w-4 text-turquoise" aria-hidden />
                <LocalizedText id="minimal.reviews.more">{enText("minimal.reviews.more")}</LocalizedText>
              </a>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {featuredReviews.map((review) => (
                <article key={review.name} className="rounded-xl bg-limestone p-5 shadow-sm">
                  <div className="flex gap-1 text-bronze">
                    {Array.from({ length: review.rating }).map((_, index) => (
                      <Star key={index} className="h-4 w-4 fill-current" aria-hidden />
                    ))}
                  </div>
                  <blockquote className="mt-4 text-sm leading-7 text-ink">&quot;{review.text}&quot;</blockquote>
                  <p className="mt-4 text-sm font-semibold text-ink">{review.name}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section data-home-section="skipper" id="skipper" className="bg-limestone py-14 md:py-20">
        <div className="site-band grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="relative min-h-[24rem] overflow-hidden rounded-2xl bg-ink p-3 shadow-image">
            <div className="grid h-full min-h-[24rem] gap-3 sm:grid-cols-2">
              {skipperActivityImages.map((item, index) => (
                <figure key={item.tourId} className={`relative overflow-hidden rounded-xl bg-navy ${index === 0 ? "min-h-[15rem] sm:row-span-2" : "min-h-[10rem]"}`}>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    loading="lazy"
                    quality={58}
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 43vw, 86vw"
                    className="object-cover transition duration-500 hover:scale-[1.035]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/72 via-navy/8 to-transparent" />
                  <figcaption className="absolute left-3 top-3 rounded-lg bg-ink/78 px-3 py-2 text-xs font-bold text-pearl backdrop-blur">
                    <LocalizedText id={`tour.${item.tourId}.shortTitle`}>{tourById.get(item.tourId)?.shortTitle ?? item.tourId}</LocalizedText>
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-5 text-pearl md:p-7">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-sand">
                <LocalizedText id="v2.skipper.imageLabel">{enText("v2.skipper.imageLabel")}</LocalizedText>
              </p>
              <p className="mt-2 max-w-md font-serif text-3xl leading-tight">
                <LocalizedText id="v2.skipper.imageText">{enText("v2.skipper.imageText")}</LocalizedText>
              </p>
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-bronze">
              <LocalizedText id="v2.skipper.label">{enText("v2.skipper.label")}</LocalizedText>
            </p>
            <h2 className="mt-3 max-w-2xl font-serif text-4xl font-medium leading-tight text-ink md:text-6xl">
              <LocalizedText id="v2.skipper.title">{enText("v2.skipper.title")}</LocalizedText>
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-ink-soft md:text-lg">
              <LocalizedText id="v2.skipper.text">{enText("v2.skipper.text")}</LocalizedText>
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {skipperProof.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.key} className="rounded-xl bg-pearl p-4 shadow-sm">
                    <Icon className="h-5 w-5 text-turquoise" aria-hidden />
                    <p className="mt-3 text-sm font-bold leading-6 text-ink">
                      <LocalizedText id={item.key}>{enText(item.key)}</LocalizedText>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section data-home-section="tours" id="tours" className="bg-pearl py-14 md:py-20">
        <div className="site-band">
          <div className="grid gap-5 md:grid-cols-[0.9fr_1.1fr] md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-bronze">
                <LocalizedText id="v2.tours.label">{enText("v2.tours.label")}</LocalizedText>
              </p>
              <h2 className="mt-3 max-w-2xl font-serif text-4xl font-medium leading-tight text-ink md:text-6xl">
                <LocalizedText id="v2.tours.title">{enText("v2.tours.title")}</LocalizedText>
              </h2>
            </div>
            <p className="max-w-lg text-base font-semibold leading-7 text-ink-soft md:justify-self-end md:text-right">
              <LocalizedText id="v2.tours.text">{enText("v2.tours.text")}</LocalizedText>
            </p>
          </div>

          <div data-tour-comparison className="mt-8 grid gap-4 lg:grid-cols-5">
            {featuredTours.map((tour) => {
              const TourIcon = tourIcons[tour.id as keyof typeof tourIcons] ?? Waves;
              const comparison = comparisonByTourId.get(tour.id);

              return (
                <article key={tour.id} data-tour-card data-tour-id={tour.id} className="group grid overflow-hidden rounded-xl bg-limestone shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-soft">
                  <a className="relative block aspect-[4/3] overflow-hidden" data-analytics-event="tour_card_click" data-tour-id={tour.id} href={tour.href}>
                    <Image
                      src={tour.cardImage ?? tour.image}
                      alt={tour.imageAlt ?? tour.title}
                      fill
                      loading="lazy"
                      quality={58}
                      sizes="(min-width: 1024px) 19vw, (min-width: 640px) 45vw, 92vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.035]"
                    />
                    <span className="absolute left-3 top-3 inline-flex max-w-[calc(100%-1.5rem)] items-center gap-1.5 rounded-lg bg-pearl px-2.5 py-1.5 text-[0.68rem] font-bold uppercase leading-none tracking-[0.12em] text-ink shadow-sm" aria-label={enText("v2.tours.badge")}>
                      <TourIcon className="h-3.5 w-3.5 shrink-0 text-turquoise" aria-hidden />
                      <LocalizedText id={`v2.tour.${tour.id}.badge`}>{comparison?.angle ?? tour.shortTitle}</LocalizedText>
                    </span>
                  </a>
                  <div className="grid gap-4 p-4">
                    <div>
                      <h3 className="font-serif text-2xl font-medium leading-tight text-ink">
                        <LocalizedText id={`tour.${tour.id}.shortTitle`}>{tour.shortTitle}</LocalizedText>
                      </h3>
                      <p className="mt-2 text-sm font-semibold leading-6 text-ink-soft">
                        <LocalizedText id={`v2.tour.${tour.id}.bestFor`}>{tour.bestFor}</LocalizedText>
                      </p>
                    </div>
                    <dl className="grid gap-2 text-sm">
                      <div className="rounded-lg bg-pearl/78 p-3">
                        <dt className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-bronze">
                          <LocalizedText id="v2.tours.price">{enText("v2.tours.price")}</LocalizedText>
                        </dt>
                        <dd className="mt-1 font-bold text-ink">
                          <LocalizedText id={`v2.tour.${tour.id}.price`}>{comparison?.price ?? tour.price}</LocalizedText>
                        </dd>
                      </div>
                      <div className="rounded-lg bg-pearl/78 p-3">
                        <dt className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-bronze">
                          <LocalizedText id="v2.tours.duration">{enText("v2.tours.duration")}</LocalizedText>
                        </dt>
                        <dd className="mt-1 font-bold text-ink">
                          <LocalizedText id={`v2.tour.${tour.id}.duration`}>{comparison?.duration ?? tour.duration}</LocalizedText>
                        </dd>
                      </div>
                      <div className="rounded-lg bg-pearl/78 p-3">
                        <dt className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-bronze">
                          <LocalizedText id="v2.tours.bestFor">{enText("v2.tours.bestFor")}</LocalizedText>
                        </dt>
                        <dd className="mt-1 font-bold text-ink">
                          <LocalizedText id={`v2.tour.${tour.id}.fit`}>{tour.bestFor}</LocalizedText>
                        </dd>
                      </div>
                    </dl>
                    <ul className="grid gap-2 text-sm leading-6 text-ink-soft">
                      {tour.cardHighlights.slice(0, 2).map((item, index) => (
                        <li key={item} className="flex gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-turquoise" aria-hidden />
                          <span>
                            <LocalizedText id={`tour.${tour.id}.cardHighlight.${index}`}>{item}</LocalizedText>
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto grid gap-2">
                      <a className="inline-flex min-h-11 items-center justify-center rounded-lg border border-ink/12 bg-pearl px-4 text-sm font-semibold text-ink transition hover:bg-white" data-analytics-event="tour_card_click" data-tour-id={tour.id} href={tour.href}>
                        <LocalizedText id="v2.tours.viewRoute">{enText("v2.tours.viewRoute")}</LocalizedText>
                      </a>
                      <a
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-ink px-4 text-sm font-semibold text-pearl transition hover:bg-navy"
                        data-tour-id={tour.id}
                        data-whatsapp-key={tour.id}
                        href={whatsappHrefForKey(tour.id as WhatsappMessageKey)}
                        rel="noreferrer"
                        target="_blank"
                        data-analytics-event={`whatsapp_click_${tour.id}_en_v2_tour_card`}
                        data-analytics-event-template="whatsapp_click_{tour}_{language}_{placement}"
                        data-analytics-tour={tour.id}
                        data-analytics-placement="v2_tour_card"
                      >
                        <MessageCircle className="h-4 w-4" aria-hidden />
                        <LocalizedText id="v2.tours.book">{enText("v2.tours.book")}</LocalizedText>
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section data-home-section="gallery" id="gallery" className="bg-limestone py-14 md:py-20">
        <div className="site-band">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-bronze">
                <LocalizedText id="v2.gallery.label">{enText("v2.gallery.label")}</LocalizedText>
              </p>
              <h2 className="mt-3 font-serif text-4xl font-medium leading-tight text-ink md:text-5xl">
                <LocalizedText id="v2.gallery.title">{enText("v2.gallery.title")}</LocalizedText>
              </h2>
            </div>
            <p className="max-w-sm text-sm font-semibold leading-6 text-ink-soft">
              <LocalizedText id="v2.gallery.text">{enText("v2.gallery.text")}</LocalizedText>
            </p>
          </div>

          <div className="gallery-viewer mt-8" data-gallery-viewer>
            <div className="gallery-feed" aria-label="Sea photo gallery">
              {featuredGallery.map((item, index) => (
                <a
                  key={item.src}
                  href={item.src}
                  target="_blank"
                  rel="noreferrer"
                  data-gallery-open
                  data-gallery-zoom="true"
                  data-gallery-src={item.src}
                  data-gallery-alt={item.alt}
                  data-gallery-index={index}
                  data-analytics-event="gallery_open_click"
                  className="gallery-feed-item group"
                  aria-label={`Open gallery photo ${index + 1}`}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    loading="lazy"
                    quality={52}
                    sizes={index === 0 ? "(min-width: 768px) 48vw, 78vw" : "(min-width: 1024px) 24vw, (min-width: 768px) 25vw, 78vw"}
                    className="object-cover transition duration-500 group-hover:scale-[1.035]"
                  />
                  <span className="gallery-feed-shade" aria-hidden />
                  <span className="gallery-feed-count">{index + 1}/{featuredGallery.length}</span>
                  <span className="gallery-feed-expand">
                    <Maximize2 className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="absolute bottom-3 left-3 right-3 z-[1] rounded-lg bg-ink/78 px-3 py-2 text-sm font-semibold leading-5 text-pearl backdrop-blur">
                    <LocalizedText id={galleryCaptions[index]}>{enText(galleryCaptions[index])}</LocalizedText>
                  </span>
                </a>
              ))}
            </div>

            <div className="gallery-modal" data-gallery-modal data-gallery-backdrop hidden aria-hidden="true" role="dialog" aria-modal="true" aria-label="Sea photo viewer">
              <div className="gallery-modal-top">
                <span className="gallery-modal-counter" data-gallery-counter>1 / {featuredGallery.length}</span>
                <button className="gallery-modal-icon" type="button" data-gallery-close aria-label="Close gallery">
                  <X className="h-5 w-5" aria-hidden />
                </button>
              </div>

              <div className="gallery-modal-stage" data-gallery-backdrop>
                <button className="gallery-modal-arrow gallery-modal-arrow-left" type="button" data-gallery-prev aria-label="Previous photo">
                  <ChevronLeft className="h-6 w-6" aria-hidden />
                </button>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="gallery-modal-image" data-gallery-modal-image src={featuredGallery[0]?.src} alt={featuredGallery[0]?.alt ?? ""} />
                <button className="gallery-modal-arrow gallery-modal-arrow-right" type="button" data-gallery-next aria-label="Next photo">
                  <ChevronRight className="h-6 w-6" aria-hidden />
                </button>
              </div>

              <div className="gallery-modal-thumbs" aria-label="Gallery thumbnails">
                {featuredGallery.map((item, index) => (
                  <button key={`gallery-thumb-${item.src}`} className="gallery-modal-thumb" type="button" data-gallery-thumb aria-label={`Show photo ${index + 1}`}>
                    <Image src={item.src} alt="" fill loading="lazy" quality={50} sizes="5rem" className="object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section data-home-section="contact" id="contact" data-sticky-relief-target className="bg-navy py-16 text-pearl md:py-24">
        <div className="site-band grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-sand">
              <LocalizedText id="v2.contact.label">{enText("v2.contact.label")}</LocalizedText>
            </p>
            <h2 className="mt-3 font-serif text-4xl font-medium leading-tight md:text-6xl">
              <LocalizedText id="v2.contact.title">{enText("v2.contact.title")}</LocalizedText>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-pearl/86">
              <LocalizedText id="v2.contact.text">{enText("v2.contact.text")}</LocalizedText>
            </p>
            <div className="mt-7 grid gap-3 text-sm text-pearl/90">
              <a className="flex items-center gap-3 rounded-lg border border-white/12 bg-white/8 p-3 transition hover:bg-white/12" href={whatsappHrefForKey("default")} target="_blank" rel="noreferrer" data-whatsapp-key="default" data-analytics-event="whatsapp_click_default_en_v2_contact_info" data-analytics-event-template="whatsapp_click_{tour}_{language}_{placement}" data-analytics-tour="default" data-analytics-placement="v2_contact_info">
                <MessageCircle className="h-4 w-4 text-sand" aria-hidden />
                <LocalizedText id="minimal.contact.whatsapp">{enText("minimal.contact.whatsapp")}</LocalizedText>
              </a>
              <a className="flex items-center gap-3 rounded-lg border border-white/12 bg-white/8 p-3 transition hover:bg-white/12" href={`tel:${phoneDisplay.replace(/\s/g, "")}`} data-analytics-event="call_click">
                <Phone className="h-4 w-4 text-sand" aria-hidden />
                {phoneDisplay}
              </a>
              <a className="flex items-center gap-3 rounded-lg border border-white/12 bg-white/8 p-3 transition hover:bg-white/12" href={`mailto:${emailAddress}`} data-analytics-event="email_click">
                <Mail className="h-4 w-4 text-sand" aria-hidden />
                {emailAddress}
              </a>
              <a className="flex items-center gap-3 rounded-lg border border-white/12 bg-white/8 p-3 transition hover:bg-white/12" href={googleMapsUrl} target="_blank" rel="noreferrer" data-analytics-event="maps_click">
                <MapPin className="h-4 w-4 text-sand" aria-hidden />
                <LocalizedText id="minimal.contact.location">{enText("minimal.contact.location")}</LocalizedText>
              </a>
            </div>
          </div>
          <div className="grid gap-5">
            <form id="minimal-booking-form" data-minimal-booking-form="true" className="rounded-xl bg-pearl p-5 text-ink shadow-image md:p-6">
              <div className="grid gap-4">
                <label className="grid gap-2 text-sm font-semibold">
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-bronze">
                    <LocalizedText id="minimal.contact.form.tour">{enText("minimal.contact.form.tour")}</LocalizedText>
                  </span>
                  <select className="h-12 rounded-lg border border-ink/12 bg-white px-4 text-ink outline-none focus:border-turquoise focus-visible:ring-2 focus-visible:ring-turquoise focus-visible:ring-offset-2" name="tour" autoComplete="off" defaultValue="not-sure">
                    <option value="not-sure" data-i18n="minimal.contact.form.tourUnsure">
                      {enText("minimal.contact.form.tourUnsure")}
                    </option>
                    {featuredTours.map((tour) => (
                      <option key={`minimal-tour-${tour.id}`} value={tour.id} data-i18n={`tour.${tour.id}.shortTitle`}>
                        {tour.shortTitle}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-2 text-sm font-semibold">
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-bronze">
                    <LocalizedText id="minimal.contact.form.name">{enText("minimal.contact.form.name")}</LocalizedText>
                  </span>
                  <input className="h-12 rounded-lg border border-ink/12 bg-white px-4 outline-none focus:border-turquoise focus-visible:ring-2 focus-visible:ring-turquoise focus-visible:ring-offset-2" name="name" autoComplete="name" required />
                </label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm font-semibold">
                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-bronze">
                      <LocalizedText id="minimal.contact.form.date">{enText("minimal.contact.form.date")}</LocalizedText>
                    </span>
                    <span className="relative">
                      <CalendarDays className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" aria-hidden />
                      <input className="h-12 w-full rounded-lg border border-ink/12 bg-white px-4 pl-11 outline-none focus:border-turquoise focus-visible:ring-2 focus-visible:ring-turquoise focus-visible:ring-offset-2" lang="en-GB" name="date" type="date" required />
                    </span>
                  </label>
                  <label className="grid gap-2 text-sm font-semibold">
                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-bronze">
                      <LocalizedText id="minimal.contact.form.people">{enText("minimal.contact.form.people")}</LocalizedText>
                    </span>
                    <input className="h-12 rounded-lg border border-ink/12 bg-white px-4 outline-none focus:border-turquoise focus-visible:ring-2 focus-visible:ring-turquoise focus-visible:ring-offset-2" name="people" type="number" min="1" max="15" defaultValue="2" required />
                  </label>
                </div>
                <label className="grid gap-2 text-sm font-semibold">
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-bronze">
                    <LocalizedText id="v2.contact.form.message">{enText("v2.contact.form.message")}</LocalizedText>
                  </span>
                  <textarea className="min-h-20 rounded-lg border border-ink/12 bg-white px-4 py-3 outline-none focus:border-turquoise focus-visible:ring-2 focus-visible:ring-turquoise focus-visible:ring-offset-2" name="message" rows={3} placeholder={enText("v2.contact.form.messagePlaceholder")} />
                </label>
              </div>
              <div className="sr-only">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-bronze">
                  <LocalizedText id="minimal.contact.form.preview">{enText("minimal.contact.form.preview")}</LocalizedText>
                </p>
                <p className="mt-2 whitespace-pre-line text-sm leading-6 text-ink-soft" data-minimal-booking-summary />
              </div>
              <a className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-ink px-5 text-sm font-semibold text-pearl transition hover:bg-navy" href="#minimal-booking-form" data-minimal-booking-action data-analytics-event="whatsapp_click_default_en_v2_form" data-analytics-event-template="whatsapp_click_{tour}_{language}_{placement}" data-analytics-tour="default" data-analytics-placement="v2_form">
                <MessageCircle className="h-4 w-4" aria-hidden />
                <LocalizedText id="v2.contact.form.send">{enText("v2.contact.form.send")}</LocalizedText>
              </a>
              <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-ink-soft">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-turquoise" aria-hidden />
                <LocalizedText id="minimal.reassurance">{enText("minimal.reassurance")}</LocalizedText>
              </p>
            </form>
            <details className="rounded-xl border border-white/12 bg-white/8 p-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold [&::-webkit-details-marker]:hidden">
                <span className="flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-sand" aria-hidden />
                  <LocalizedText id="minimal.faq.trigger">{enText("minimal.faq.trigger")}</LocalizedText>
                </span>
                <span aria-hidden>+</span>
              </summary>
              <div className="mt-4 text-ink">
                <FAQAccordion items={homepageFaqs} />
              </div>
            </details>
          </div>
        </div>
      </section>

      <InlineRuntimeScript id="minimal-availability-form" code={minimalAvailabilityFormScript} />
      <GalleryViewerRuntime code={galleryViewerScript} />
    </>
  );
}
