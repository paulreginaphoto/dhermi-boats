import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, CalendarDays, CheckCircle2, ChevronLeft, ChevronRight, Clock3, Euro, HelpCircle, Mail, MapPin, Maximize2, MessageCircle, Phone, ShieldCheck, Star, Users, Waves, X } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { FAQAccordion } from "@/components/FAQAccordion";
import { GalleryViewerRuntime } from "@/components/GalleryViewerRuntime";
import { InlineRuntimeScript } from "@/components/InlineRuntimeScript";
import { LocalizedText } from "@/components/LocalizedText";
import { SEOJsonLd } from "@/components/SEOJsonLd";
import { faqs, gallery, orderedTours, reviews, tourComparison } from "@/data/content";
import { canonical, emailAddress, googleMapsUrl, languageAlternates, phoneDisplay, whatsappNumber } from "@/lib/site";
import { faqSchema, homePageSchema, touristTripSchema } from "@/lib/seo";
import { translations } from "@/lib/i18n";
import { whatsappHrefForKey, type WhatsappMessageKey } from "@/lib/whatsappMessages";

const enText = (key: string) => translations.en[key] ?? "";
const featuredTours = orderedTours;
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
const featuredTourLabelIndexes = new Map([
  ["sunset", 0],
  ["gjipe", 1],
  ["grama", 2],
  ["private", 3],
  ["fishing", 4]
]);
const featuredGallery = gallery.slice(0, 8);
const featuredReviews = reviews.slice(0, 4);
const homepageFaqs = [0, 1, 4, 6, 13, 17].map((index) => ({ ...faqs[index], translationIndex: index }));
const heroBadges = [
  { key: "minimal.hero.badge.local", icon: Euro },
  { key: "minimal.hero.badge.capacity", icon: Users },
  { key: "minimal.hero.badge.daily", icon: Waves }
];
const railIconByTourId = {
  sunset: Star,
  gjipe: MapPin,
  grama: Waves,
  private: Users,
  fishing: Clock3
};

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
        missingTour: "Not sure yet",
        missingName: "Add your name",
        missingDate: "Choose a date",
        missingPeople: "Add people"
      },
      fr: {
        intro: "Bonjour Dhermi Boat :) je voudrais vérifier la disponibilité.",
        tour: "Tour souhaité",
        name: "Nom",
        date: "Date",
        people: "Personnes",
        missingTour: "Pas encore sûr",
        missingName: "Ajoutez votre nom",
        missingDate: "Choisissez une date",
        missingPeople: "Ajoutez le nombre de personnes"
      },
      sq: {
        intro: "Pershendetje Dhermi Boat :) dua te kontrolloj disponueshmerine.",
        tour: "Turi i preferuar",
        name: "Emri",
        date: "Data",
        people: "Persona",
        missingTour: "Ende nuk jam i sigurt",
        missingName: "Shtoni emrin",
        missingDate: "Zgjidhni daten",
        missingPeople: "Shtoni numrin e personave"
      }
    },
    tourLabels: minimalTourLabels
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

  function formatBookingDate(value) {
    var parts = String(value || "").split("-");
    return parts.length === 3 ? parts[2] + "/" + parts[1] + "/" + parts[0] : value || "";
  }

  function initForm(form) {
    var locale = readLocale();
    var labels = config.labels[locale] || config.labels.en;
    var tourLabels = config.tourLabels[locale] || config.tourLabels.en;
    var tourInput = form.querySelector("[name='tour']");
    var nameInput = form.querySelector("[name='name']");
    var dateInput = form.querySelector("[name='date']");
    var peopleInput = form.querySelector("[name='people']");
    var action = form.querySelector("[data-minimal-booking-action]");
    var summary = form.querySelector("[data-minimal-booking-summary]");
    if (!tourInput || !nameInput || !dateInput || !peopleInput || !action || !summary) return;

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
        labels.date + ": " + (formatBookingDate(dateInput.value) || labels.missingDate),
        labels.people + ": " + (peopleInput.value || labels.missingPeople)
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

    [tourInput, nameInput, dateInput, peopleInput].forEach(function (input) {
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

const tourRailScrollScript = String.raw`
(function () {
  var rails = Array.prototype.slice.call(document.querySelectorAll("[data-tour-rail]"));
  var reliefTargets = Array.prototype.slice.call(document.querySelectorAll("[data-sticky-relief-target]"));
  if (!rails.length && !reliefTargets.length) return;
  var reduceMotion = false;
  try {
    reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch (error) {}

  function clamp(value) {
    return Math.max(0, Math.min(1, value));
  }

  function headerOffset() {
    var header = document.querySelector("header");
    return header ? Math.ceil(header.getBoundingClientRect().height) : 80;
  }

  function railGeometry(rail) {
    var track = rail.querySelector("[data-tour-track]");
    var windowEl = rail.querySelector("[data-tour-window]");
    var cards = track ? Array.prototype.slice.call(track.querySelectorAll(".tour-rail-card")) : [];
    if (!track || !windowEl || !cards.length) return null;
    var trackStyle = window.getComputedStyle(track);
    var windowStyle = window.getComputedStyle(windowEl);
    var gap = parseFloat(trackStyle.columnGap || trackStyle.gap || "0") || 0;
    var padding = (parseFloat(windowStyle.paddingLeft || "0") || 0) + (parseFloat(windowStyle.paddingRight || "0") || 0);
    var visibleWidth = Math.max(1, windowEl.clientWidth - padding);
    var cardWidth = cards[0].getBoundingClientRect().width || cards[0].offsetWidth || visibleWidth;
    var visibleCount = Math.max(1, Math.min(cards.length, Math.round((visibleWidth + gap) / (cardWidth + gap))));
    var steps = Math.max(0, cards.length - visibleCount);
    var stepSize = cardWidth + gap;
    return {
      track: track,
      windowEl: windowEl,
      maxTranslate: steps * stepSize,
      steps: steps,
      stepSize: stepSize
    };
  }

  function setNativeRailOffset(windowEl, value) {
    if (typeof windowEl.scrollTo === "function") windowEl.scrollTo(value, 0);
    else windowEl.scrollLeft = value;
  }

  function measureRail(rail) {
    var geometry = railGeometry(rail);
    if (!geometry) return;

    if (reduceMotion) {
      rail.style.height = "";
      rail.removeAttribute("data-tour-rail-enhanced");
      rail.style.removeProperty("--tour-rail-shift");
      return;
    }

    rail.setAttribute("data-tour-rail-enhanced", "true");
    var viewport = Math.max(1, window.innerHeight - headerOffset());
    var breathingRoom = window.innerWidth < 768 ? 220 : 300;
    var minScreens = window.innerWidth < 768 ? 3.8 : 2.7;
    var sectionHeight = Math.max(viewport * minScreens, viewport + geometry.maxTranslate + breathingRoom);
    rail.style.height = Math.ceil(sectionHeight) + "px";
    rail.style.setProperty("--tour-rail-shift", geometry.maxTranslate.toFixed(2) + "px");
  }

  function updateRail(rail) {
    var geometry = railGeometry(rail);
    var progress = rail.querySelector("[data-tour-progress]");
    if (!geometry) return;

    if (reduceMotion) {
      geometry.track.style.transform = "";
      if (progress) progress.style.transform = "scaleX(0)";
      return;
    }

    var stickyTop = headerOffset();
    var scrollRange = Math.max(1, rail.offsetHeight - window.innerHeight + stickyTop);
    var rect = rail.getBoundingClientRect();
    var amount = clamp((stickyTop - rect.top) / scrollRange);
    var snappedStep = geometry.steps ? Math.round(amount * geometry.steps) : 0;
    var translate = Math.min(geometry.maxTranslate, snappedStep * geometry.stepSize);
    if (window.innerWidth < 768) {
      geometry.track.style.transform = "";
      setNativeRailOffset(geometry.windowEl, Math.round(translate));
    } else {
      setNativeRailOffset(geometry.windowEl, 0);
      geometry.track.style.transform = "translate3d(" + Math.round(translate * -1) + "px,0,0)";
    }
    if (progress) progress.style.transform = "scaleX(" + amount.toFixed(3) + ")";
  }

  function measureAll() {
    rails.forEach(measureRail);
  }

  function update() {
    rails.forEach(updateRail);
  }

  function refresh() {
    measureAll();
    update();
  }

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", refresh);
  window.addEventListener("load", refresh, { once: true });
  requestAnimationFrame(refresh);

  function initStickyRelief() {
    if (!reliefTargets.length || !("IntersectionObserver" in window)) return;
    var active = new Set();
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && entry.intersectionRatio > 0.18) active.add(entry.target);
        else active.delete(entry.target);
      });
      if (window.innerWidth < 768 && active.size) document.body.setAttribute("data-sticky-booking-relief", "true");
      else document.body.removeAttribute("data-sticky-booking-relief");
    }, { threshold: [0, 0.18, 0.42] });
    reliefTargets.forEach(function (target) { observer.observe(target); });
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 768) document.body.removeAttribute("data-sticky-booking-relief");
    });
  }

  initStickyRelief();
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
    absolute: "Dhërmi Boat Tours to Gjipe, Grama Bay & Blue Cave"
  },
  description:
    "Book small-group and private boat tours from Dhërmi. Gjipe from 35 €, Grama Bay from 75 €, sunset and private trips confirmed on WhatsApp.",
  alternates: { canonical: canonical("/"), languages: languageAlternates("/") }
};

export default function HomePage() {
  return (
    <>
      <SEOJsonLd data={[homePageSchema(), ...featuredTours.map((tour) => touristTripSchema(tour)), faqSchema(homepageFaqs)]} />

      <section data-home-section="hero" data-sticky-relief-target className="relative min-h-[calc(84svh-5rem)] overflow-hidden bg-navy text-pearl md:min-h-[calc(80svh-5rem)]">
        <Image
          src="/images/hero-riviera-tablet-lcp.avif"
          alt="Dhermi Boat on turquoise water below cliffs near Dhërmi"
          fill
          priority
          quality={72}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/20 via-navy/38 to-navy/88" />
        <div className="relative mx-auto flex min-h-[calc(84svh-5rem)] max-w-site flex-col justify-end px-5 pb-8 pt-12 md:min-h-[calc(80svh-5rem)] md:px-8 md:pb-12 md:pt-24">
          <div className="max-w-5xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-sand">
              <LocalizedText id="minimal.hero.label">{enText("minimal.hero.label")}</LocalizedText>
            </p>
            <h1 className="mt-4 max-w-5xl font-serif text-4xl font-medium leading-[0.98] text-pearl max-[360px]:text-[2rem] sm:text-5xl md:text-7xl">
              <LocalizedText id="minimal.hero.title">{enText("minimal.hero.title")}</LocalizedText>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-pearl/92 md:text-xl">
              <LocalizedText id="minimal.hero.text">{enText("minimal.hero.text")}</LocalizedText>
            </p>
            <div className="mt-7 grid grid-cols-3 gap-1.5 text-[0.68rem] font-bold text-pearl sm:flex sm:flex-wrap sm:gap-2 sm:text-xs">
              {heroBadges.map((item) => {
                const Icon = item.icon;

                return (
                  <span key={item.key} className="inline-flex min-w-0 items-center justify-center gap-1.5 rounded-md border border-white/15 bg-ink/80 px-2 py-2 text-pearl shadow-sm backdrop-blur sm:gap-2 sm:px-3">
                    <Icon className="h-3.5 w-3.5 text-sand" aria-hidden />
                    <LocalizedText id={item.key}>{enText(item.key)}</LocalizedText>
                  </span>
                );
              })}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href={whatsappHrefForKey("default")} icon={MessageCircle} variant="dark" whatsappKey="default" analyticsPlacement="minimal_hero">
                <LocalizedText id="minimal.cta.whatsapp">{enText("minimal.cta.whatsapp")}</LocalizedText>
              </ButtonLink>
              <ButtonLink href="#tours" icon={ArrowRight} variant="secondary" className="border-white/0 bg-pearl text-ink shadow-sm hover:bg-white focus-visible:ring-pearl">
                <LocalizedText id="cta.compareTours">{enText("cta.compareTours")}</LocalizedText>
              </ButtonLink>
            </div>
            <p className="mt-4 inline-flex max-w-xl items-start gap-2 rounded-md border border-white/15 bg-ink/90 px-3.5 py-2.5 text-sm font-semibold leading-6 text-pearl shadow-sm backdrop-blur-md max-[360px]:hidden">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-sand" aria-hidden />
              <LocalizedText id="minimal.reassurance">{enText("minimal.reassurance")}</LocalizedText>
            </p>
          </div>
        </div>
      </section>

      <section data-home-section="tours" id="tours" data-tour-rail data-sticky-relief-target className="tour-rail-section bg-pearl pb-16 pt-8 md:py-0">
        <div className="tour-rail-sticky">
          <div className="site-band w-full">
            <div className="grid gap-6 md:grid-cols-[0.95fr_1.05fr] md:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-bronze">
                  <LocalizedText id="minimal.tours.label">{enText("minimal.tours.label")}</LocalizedText>
                </p>
                <h2 className="mt-3 max-w-xl font-serif text-3xl font-medium leading-[1.05] text-ink sm:text-4xl md:text-5xl">
                  <LocalizedText id="minimal.tours.title">{enText("minimal.tours.title")}</LocalizedText>
                </h2>
              </div>
              <div className="md:justify-self-end md:text-right">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-turquoise">
                  <LocalizedText id="minimal.tours.kicker">{enText("minimal.tours.kicker")}</LocalizedText>
                </p>
                <p className="mt-2 hidden max-w-sm text-sm leading-6 text-ink-soft md:ml-auto md:block md:leading-7">
                  <LocalizedText id="minimal.tours.hint">{enText("minimal.tours.hint")}</LocalizedText>
                </p>
                <div className="mt-4 h-1 overflow-hidden rounded-full bg-ink/10 md:mt-5" aria-hidden>
                  <span data-tour-progress className="block h-full origin-left scale-x-0 rounded-full bg-turquoise" />
                </div>
              </div>
            </div>

            <div data-tour-window className="tour-rail-window mt-6 md:mt-10">
              <div data-tour-track className="tour-rail-track">
                {featuredTours.map((tour) => {
                  const labelIndex = featuredTourLabelIndexes.get(tour.id);
                  const comparisonLabel = labelIndex === undefined ? null : tourComparison[labelIndex];
                  const RailIcon = railIconByTourId[tour.id as keyof typeof railIconByTourId] ?? CheckCircle2;

                  return (
                    <article key={tour.id} data-tour-id={tour.id} className="tour-rail-card grid overflow-hidden rounded-lg bg-limestone shadow-sm">
                      <div className="tour-rail-image relative">
                        <Image
                          src={tour.cardImage ?? tour.image}
                          alt={tour.imageAlt ?? tour.title}
                          fill
                          loading="lazy"
                          quality={58}
                          sizes="(min-width: 1280px) 31rem, (min-width: 768px) 42vw, 82vw"
                          className="object-cover"
                        />
                        {comparisonLabel ? (
                          <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-md bg-pearl px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-ink shadow-sm">
                            <RailIcon className="h-3.5 w-3.5 text-turquoise" aria-hidden />
                            <LocalizedText id={`comparison.${labelIndex}.angle`}>{comparisonLabel.angle}</LocalizedText>
                          </span>
                        ) : null}
                      </div>
                      <div className="tour-rail-body grid gap-4 p-4 md:gap-5 md:p-6">
                        <div>
                          <h3 className="font-serif text-2xl font-medium leading-tight text-ink sm:text-3xl">
                            <LocalizedText id={`tour.${tour.id}.shortTitle`}>{tour.shortTitle}</LocalizedText>
                          </h3>
                          <p className="mt-2 text-sm font-semibold leading-5 text-ink-soft md:leading-6">
                            <LocalizedText id={`tour.${tour.id}.bestFor`}>{tour.bestFor}</LocalizedText>
                          </p>
                        </div>
                        <div className="grid grid-cols-[1fr_auto] gap-2 text-xs font-semibold text-ink md:text-sm">
                          <p className="flex min-w-0 gap-2 rounded-md bg-pearl/70 px-3 py-2">
                            <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-turquoise" aria-hidden />
                            <span className="min-w-0">
                              {comparisonLabel && labelIndex !== undefined ? (
                                <LocalizedText id={`comparison.${labelIndex}.meta`}>{`${comparisonLabel.duration} • ${comparisonLabel.price}`}</LocalizedText>
                              ) : (
                                <LocalizedText id={`tour.${tour.id}.duration`}>{tour.duration}</LocalizedText>
                              )}
                            </span>
                          </p>
                          <p className="flex gap-2 rounded-md bg-pearl/70 px-3 py-2">
                            <Users className="mt-0.5 h-4 w-4 shrink-0 text-turquoise" aria-hidden />
                            <LocalizedText id={`tour.${tour.id}.capacity`}>{tour.capacity}</LocalizedText>
                          </p>
                        </div>
                        <ul className="grid grid-cols-2 gap-2 text-xs leading-5 text-ink-soft md:text-sm md:leading-6">
                          {tour.cardHighlights.slice(0, 3).map((item, index) => (
                            <li key={item} className="flex gap-2">
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-turquoise" aria-hidden />
                              <span>
                                <LocalizedText id={`tour.${tour.id}.cardHighlight.${index}`}>{item}</LocalizedText>
                              </span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-auto grid grid-cols-2 gap-2">
                          <a className="inline-flex min-h-11 items-center justify-center rounded-md border border-ink/12 bg-pearl px-4 text-sm font-semibold text-ink transition hover:bg-white" data-analytics-event="tour_card_click" data-tour-id={tour.id} href={tour.href}>
                            <LocalizedText id="minimal.tours.detail">{enText("minimal.tours.detail")}</LocalizedText>
                          </a>
                          <a
                            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-ink px-4 text-sm font-semibold text-pearl transition hover:bg-navy"
                            data-tour-id={tour.id}
                            data-whatsapp-key={tour.id}
                            href={whatsappHrefForKey(tour.id as WhatsappMessageKey)}
                            rel="noreferrer"
                            target="_blank"
                            data-analytics-event={`whatsapp_click_${tour.id}_en_minimal_tour_card`}
                            data-analytics-event-template="whatsapp_click_{tour}_{language}_{placement}"
                            data-analytics-tour={tour.id}
                            data-analytics-placement="minimal_tour_card"
                          >
                            <MessageCircle className="h-4 w-4" aria-hidden />
                            <LocalizedText id="minimal.tours.book">{enText("minimal.tours.book")}</LocalizedText>
                          </a>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section data-home-section="gallery" id="gallery" className="bg-limestone py-14 md:py-20">
        <div className="site-band">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-bronze">
                <LocalizedText id="minimal.gallery.label">{enText("minimal.gallery.label")}</LocalizedText>
              </p>
              <h2 className="mt-3 font-serif text-4xl font-medium leading-tight text-ink md:text-5xl">
                <LocalizedText id="minimal.gallery.title">{enText("minimal.gallery.title")}</LocalizedText>
              </h2>
            </div>
            <p className="max-w-xs text-sm font-semibold leading-6 text-ink-soft">
              <LocalizedText id="minimal.gallery.text">{enText("minimal.gallery.text")}</LocalizedText>
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

      <section data-home-section="reviews" id="reviews" className="bg-pearl py-16 md:py-24">
        <div className="site-band">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-bronze">
                <LocalizedText id="minimal.reviews.label">{enText("minimal.reviews.label")}</LocalizedText>
              </p>
              <h2 className="mt-3 font-serif text-4xl font-medium leading-tight text-ink md:text-6xl">
                <LocalizedText id="minimal.reviews.title">{enText("minimal.reviews.title")}</LocalizedText>
              </h2>
              <a className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-ink/12 px-4 text-sm font-semibold text-ink transition hover:bg-limestone" href={googleMapsUrl} rel="noreferrer" target="_blank" data-analytics-event="maps_click">
                <MapPin className="h-4 w-4" aria-hidden />
                <LocalizedText id="minimal.reviews.more">{enText("minimal.reviews.more")}</LocalizedText>
              </a>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {featuredReviews.map((review) => (
                <article key={review.name} className="rounded-lg bg-limestone p-5">
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

      <section data-home-section="contact" id="contact" data-sticky-relief-target className="bg-navy py-16 text-pearl md:py-24">
        <div className="site-band grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-sand">
              <LocalizedText id="minimal.contact.label">{enText("minimal.contact.label")}</LocalizedText>
            </p>
            <h2 className="mt-3 font-serif text-4xl font-medium leading-tight md:text-6xl">
              <LocalizedText id="minimal.contact.title">{enText("minimal.contact.title")}</LocalizedText>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-pearl/86">
              <LocalizedText id="minimal.contact.text">{enText("minimal.contact.text")}</LocalizedText>
            </p>
            <div className="mt-7 grid gap-3 text-sm text-pearl/90">
              <a className="flex items-center gap-3 rounded-md border border-white/12 bg-white/8 p-3 transition hover:bg-white/12" href={whatsappHrefForKey("default")} target="_blank" rel="noreferrer" data-whatsapp-key="default" data-analytics-event="whatsapp_click_default_en_minimal_contact_info" data-analytics-event-template="whatsapp_click_{tour}_{language}_{placement}" data-analytics-tour="default" data-analytics-placement="minimal_contact_info">
                <MessageCircle className="h-4 w-4 text-sand" aria-hidden />
                <LocalizedText id="minimal.contact.whatsapp">{enText("minimal.contact.whatsapp")}</LocalizedText>
              </a>
              <a className="flex items-center gap-3 rounded-md border border-white/12 bg-white/8 p-3 transition hover:bg-white/12" href={`tel:${phoneDisplay.replace(/\s/g, "")}`} data-analytics-event="call_click">
                <Phone className="h-4 w-4 text-sand" aria-hidden />
                {phoneDisplay}
              </a>
              <a className="flex items-center gap-3 rounded-md border border-white/12 bg-white/8 p-3 transition hover:bg-white/12" href={`mailto:${emailAddress}`} data-analytics-event="email_click">
                <Mail className="h-4 w-4 text-sand" aria-hidden />
                {emailAddress}
              </a>
              <a className="flex items-center gap-3 rounded-md border border-white/12 bg-white/8 p-3 transition hover:bg-white/12" href={googleMapsUrl} target="_blank" rel="noreferrer" data-analytics-event="maps_click">
                <MapPin className="h-4 w-4 text-sand" aria-hidden />
                <LocalizedText id="minimal.contact.location">{enText("minimal.contact.location")}</LocalizedText>
              </a>
            </div>
          </div>
          <div className="grid gap-5">
            <form id="minimal-booking-form" data-minimal-booking-form="true" className="rounded-lg bg-pearl p-5 text-ink shadow-image md:p-6">
              <div className="grid gap-4">
                <label className="grid gap-2 text-sm font-semibold">
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-bronze">
                    <LocalizedText id="minimal.contact.form.tour">{enText("minimal.contact.form.tour")}</LocalizedText>
                  </span>
                  <select className="h-12 rounded-md border border-ink/12 bg-white px-4 text-ink outline-none focus:border-turquoise" name="tour" autoComplete="off" defaultValue="not-sure">
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
                  <input className="h-12 rounded-md border border-ink/12 bg-white px-4 outline-none focus:border-turquoise" name="name" autoComplete="name" required />
                </label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm font-semibold">
                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-bronze">
                      <LocalizedText id="minimal.contact.form.date">{enText("minimal.contact.form.date")}</LocalizedText>
                    </span>
                    <span className="relative">
                      <CalendarDays className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" aria-hidden />
                      <input className="h-12 w-full rounded-md border border-ink/12 bg-white px-4 pl-11 outline-none focus:border-turquoise" lang="en-GB" name="date" type="date" required />
                    </span>
                  </label>
                  <label className="grid gap-2 text-sm font-semibold">
                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-bronze">
                      <LocalizedText id="minimal.contact.form.people">{enText("minimal.contact.form.people")}</LocalizedText>
                    </span>
                    <input className="h-12 rounded-md border border-ink/12 bg-white px-4 outline-none focus:border-turquoise" name="people" type="number" min="1" max="15" defaultValue="2" required />
                  </label>
                </div>
              </div>
              <div className="mt-5 rounded-md bg-limestone p-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-bronze">
                  <LocalizedText id="minimal.contact.form.preview">{enText("minimal.contact.form.preview")}</LocalizedText>
                </p>
                <p className="mt-2 whitespace-pre-line text-sm leading-6 text-ink-soft" data-minimal-booking-summary />
              </div>
              <a className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-ink px-5 text-sm font-semibold text-pearl transition hover:bg-navy" href="#minimal-booking-form" data-minimal-booking-action data-analytics-event="whatsapp_click_default_en_minimal_form" data-analytics-event-template="whatsapp_click_{tour}_{language}_{placement}" data-analytics-tour="default" data-analytics-placement="minimal_form">
                <MessageCircle className="h-4 w-4" aria-hidden />
                <LocalizedText id="minimal.contact.form.send">{enText("minimal.contact.form.send")}</LocalizedText>
              </a>
              <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-ink-soft">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-turquoise" aria-hidden />
                <LocalizedText id="minimal.reassurance">{enText("minimal.reassurance")}</LocalizedText>
              </p>
            </form>
            <details className="rounded-lg border border-white/12 bg-white/8 p-4">
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
      <InlineRuntimeScript id="tour-rail-scroll" code={tourRailScrollScript} />
      <GalleryViewerRuntime code={galleryViewerScript} />
    </>
  );
}
