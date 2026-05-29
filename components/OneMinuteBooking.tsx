"use client";

import { useEffect, useMemo, useState, type MouseEvent } from "react";
import { CalendarDays, Mail, MessageCircle, Minus, Phone, Plus, ShieldCheck, UserRound } from "lucide-react";
import { InlineRuntimeScript } from "@/components/InlineRuntimeScript";
import { LocalizedText } from "@/components/LocalizedText";
import { orderedTours } from "@/data/content";
import { analyticsSegment, conversionEvent, whatsappEventTemplate } from "@/lib/conversion";
import { translations } from "@/lib/i18n";
import { formatBookingDate, formatDateShort } from "@/lib/dateFormats";
import { emailAddress, phoneDisplay, whatsappNumber, whatsappUrl } from "@/lib/site";

const selectableTours = orderedTours;
const flexibleTimeOptions = ["Flexible", "Morning", "Afternoon", "Sunset"] as const;
const fixedOnlyTimeOptions = ["FishingMorning"] as const;
const timeOptions = [...flexibleTimeOptions, ...fixedOnlyTimeOptions] as const;
type TimeOption = (typeof timeOptions)[number];
const dateDisplayFormat = "DD MM YYYY";

const capacityByTourId = {
  gjipe: 15,
  grama: 15,
  private: 15,
  sunset: 15,
  fishing: 5
} as const satisfies Record<string, number>;

const fixedTimeByTourId = {
  sunset: "Sunset",
  fishing: "FishingMorning"
} as const satisfies Record<string, TimeOption>;

type FormLocale = "en" | "fr" | "sq";
const bookingDraftStorageKey = "dhermi-booking-draft-v1";
const enText = (key: string) => translations.en[key] ?? "";

type BookingDraft = {
  tourId: string;
  date: string;
  time: TimeOption;
  adults: number;
  children: number;
};

const messageIntro: Record<FormLocale, string> = {
  en: "Hello Dhermi Boat :) I would like to book a boat tour.",
  fr: "Bonjour Dhermi Boat :) je voudrais réserver un tour en bateau.",
  sq: "Pershendetje Dhermi Boat :) dua te rezervoj nje tur me varke."
};

const fieldLabels: Record<FormLocale, Record<string, string>> = {
  en: {
    tour: "Tour",
    date: "Date",
    time: "Preferred time",
    adults: "Adults",
    children: "Children",
    language: "Language",
    name: "Name",
    phone: "Phone",
    notes: "Questions"
  },
  fr: {
    tour: "Tour",
    date: "Date",
    time: "Horaire souhaité",
    adults: "Adultes",
    children: "Enfants",
    language: "Langue",
    name: "Nom",
    phone: "Téléphone",
    notes: "Questions"
  },
  sq: {
    tour: "Turi",
    date: "Data",
    time: "Ora e preferuar",
    adults: "Të rritur",
    children: "Fëmijë",
    language: "Gjuha",
    name: "Emri",
    phone: "Telefoni",
    notes: "Pyetje"
  }
};

const tourOptionLabels: Record<FormLocale, Record<string, string>> = {
  en: {
    gjipe: "Gjipe Tour",
    grama: "Grama Tour",
    private: "Tailor-made private tour",
    sunset: "Sunset Private Tour",
    fishing: "Morning Fishing Tour"
  },
  fr: {
    gjipe: "Tour de Gjipe",
    grama: "Tour de Grama",
    private: "Tour privé sur mesure",
    sunset: "Tour privé au coucher du soleil",
    fishing: "Tour pêche du matin"
  },
  sq: {
    gjipe: "Turi i Gjipesë",
    grama: "Turi i Gramës",
    private: "Tur privat sipas dëshirës",
    sunset: "Tur privat në perëndim",
    fishing: "Tur peshkimi në mëngjes"
  }
};

const timeOptionLabels: Record<FormLocale, Record<TimeOption, string>> = {
  en: {
    Flexible: "Flexible",
    Morning: "Morning",
    Afternoon: "Afternoon",
    Sunset: "Sunset",
    FishingMorning: "5 AM to 8 AM"
  },
  fr: {
    Flexible: "Flexible",
    Morning: "Matin",
    Afternoon: "Après-midi",
    Sunset: "Coucher du soleil",
    FishingMorning: "5 H À 8 H"
  },
  sq: {
    Flexible: "Fleksibel",
    Morning: "Mëngjes",
    Afternoon: "Pasdite",
    Sunset: "Perëndim dielli",
    FishingMorning: "5:00 - 8:00"
  }
};

const localeMessageLabels: Record<FormLocale, string> = {
  en: "English",
  fr: "French",
  sq: "Albanian"
};

const counterActionLabels: Record<FormLocale, { decrease: string; increase: string }> = {
  en: {
    decrease: "Decrease",
    increase: "Increase"
  },
  fr: {
    decrease: "Diminuer",
    increase: "Augmenter"
  },
  sq: {
    decrease: "Ule",
    increase: "Rrit"
  }
};

const validationMessages: Record<FormLocale, { date: string; name: string; phoneHint: string }> = {
  en: {
    date: "Choose a date before sending WhatsApp.",
    name: "Add your name before sending WhatsApp.",
    phoneHint: "Phone is helpful, but WhatsApp can be used without it."
  },
  fr: {
    date: "Choisissez une date avant d’envoyer WhatsApp.",
    name: "Ajoutez votre nom avant d’envoyer WhatsApp.",
    phoneHint: "Le téléphone aide, mais WhatsApp peut suffire."
  },
  sq: {
    date: "Zgjidhni daten para se te dergoni WhatsApp.",
    name: "Shtoni emrin para se te dergoni WhatsApp.",
    phoneHint: "Telefoni ndihmon, por WhatsApp mund te mjaftoje."
  }
};

const requiredFieldPrompts: Record<FormLocale, { date: string; name: string }> = {
  en: {
    date: "choose date",
    name: "add name"
  },
  fr: {
    date: "choisir la date",
    name: "ajouter le nom"
  },
  sq: {
    date: "zgjidhni daten",
    name: "shtoni emrin"
  }
};

function scriptJson(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

const staticBookingEnhancerConfig = {
  whatsappNumber,
  emailAddress,
  storageKey: bookingDraftStorageKey,
  messageIntro,
  fieldLabels,
  requiredFieldPrompts,
  tourOptionLabels,
  timeOptionLabels,
  localeMessageLabels,
  summaryLabels: {
    en: {
      pending: translations.en["quick.summary.pending"] ?? "Ready after date and name",
      ready: translations.en["quick.summary.ready"] ?? "Ready to send"
    },
    fr: {
      pending: translations.fr["quick.summary.pending"] ?? "Prêt après la date et le nom",
      ready: translations.fr["quick.summary.ready"] ?? "Prêt à envoyer"
    },
    sq: {
      pending: translations.sq["quick.summary.pending"] ?? "Gati pas dates dhe emrit",
      ready: translations.sq["quick.summary.ready"] ?? "Gati per dergim"
    }
  },
  counterLabels: counterActionLabels,
  flexibleTimeOptions,
  fixedTimeByTourId,
  capacityByTourId,
  defaultTourId: selectableTours[0]?.id ?? "gjipe"
};

const staticBookingEnhancerScript = String.raw`
(function () {
  var config = ${scriptJson(staticBookingEnhancerConfig)};

  function normalizeLocale(value) {
    if (!value) return "";
    var normalized = String(value).toLowerCase().replace("_", "-");
    if (normalized === "al" || normalized === "sq-al") return "sq";
    var primary = normalized.split("-")[0];
    return primary === "al" ? "sq" : primary;
  }

  function isSupportedLocale(value) {
    return value === "fr" || value === "sq" || value === "en";
  }

  function readLocale() {
    try {
      var params = new URL(window.location.href).searchParams;
      var fromUrl = normalizeLocale(params.get("dlang") || params.get("lang"));
      if (isSupportedLocale(fromUrl)) return fromUrl;
      var localStorageRef = window.localStorage;
      var storageValue = localStorageRef ? localStorageRef.getItem("dhermi-language") : "";
      var fromStorage = normalizeLocale(storageValue);
      if (isSupportedLocale(fromStorage)) return fromStorage;
      var fromHtml = normalizeLocale(document.documentElement.lang);
      if (isSupportedLocale(fromHtml)) return fromHtml;
      var navLanguages = navigator.languages;
      var languages = navLanguages && navLanguages.length ? navLanguages : [navigator.language || "en"];
      for (var index = 0; index < languages.length; index += 1) {
        var browserLocale = normalizeLocale(languages[index]);
        if (isSupportedLocale(browserLocale)) return browserLocale;
      }
    } catch (error) {}
    return "en";
  }

  function localeCode(locale) {
    if (locale === "fr") return "fr-FR";
    if (locale === "sq") return "sq-AL";
    return "en-GB";
  }

  function todayInputValue() {
    var today = new Date();
    var year = today.getFullYear();
    var month = String(today.getMonth() + 1).padStart(2, "0");
    var day = String(today.getDate()).padStart(2, "0");
    return year + "-" + month + "-" + day;
  }

  function formatBookingDate(value, locale) {
    var parts = String(value || "").split("-");
    if (parts.length !== 3) return value || "";
    var date = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    if (Number.isNaN(date.getTime())) return value || "";
    try {
      return new Intl.DateTimeFormat(localeCode(locale), { day: "numeric", month: "long", year: "numeric" }).format(date);
    } catch (error) {
      return parts[2] + " " + parts[1] + " " + parts[0];
    }
  }

  function formatDateShort(value) {
    var parts = String(value || "").split("-");
    return parts.length === 3 ? parts[2] + " " + parts[1] + " " + parts[0] : "DD MM YYYY";
  }

  function cleanValue(value) {
    var clean = String(value || "").trim();
    return clean || "-";
  }

  function requiredValue(value, fallback) {
    var clean = String(value || "").trim();
    return clean || fallback;
  }

  function analyticsSegment(value) {
    return String(value || "default").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || "default";
  }

  var unsafeWhatsappSymbols = /[\uD83C-\uDBFF][\uDC00-\uDFFF]|[\u2600-\u27BF]|\uFFFD/g;

  function cleanWhatsappMessage(message) {
    return String(message || "")
      .replace(unsafeWhatsappSymbols, "")
      .replace(/[ \t]+\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }

  function whatsappUrl(message) {
    return "https://wa.me/" + config.whatsappNumber + "?text=" + encodeURIComponent(cleanWhatsappMessage(message));
  }

  function mailtoUrl(title, message) {
    return "mailto:" + config.emailAddress + "?subject=" + encodeURIComponent("Dhermi Boat booking: " + title) + "&body=" + encodeURIComponent(cleanWhatsappMessage(message));
  }

  function initBookingForm(root) {
    var locale = readLocale();
    var labels = config.fieldLabels[locale] || config.fieldLabels.en;
    var prompts = config.requiredFieldPrompts[locale] || config.requiredFieldPrompts.en;
    var summaryLabels = config.summaryLabels[locale] || config.summaryLabels.en;
    var selectedTourId = config.defaultTourId;
    var selectedTime = "Flexible";
    var adults = 2;
    var children = 0;

    var tourSelect = root.querySelector("#quick-tour");
    var dateInput = root.querySelector("#quick-date");
    var timeSelect = root.querySelector("#quick-time");
    var nameInput = root.querySelector("#quick-name");
    var phoneInput = root.querySelector("#quick-phone");
    var notesInput = root.querySelector("#quick-notes");
    var adultInput = root.querySelector("[data-booking-counter-value='adults']");
    var childInput = root.querySelector("[data-booking-counter-value='children']");
    var capacityText = root.querySelector("[data-booking-capacity]");
    var summaryTitle = root.querySelector("[data-booking-summary-title]");
    var summaryMessage = root.querySelector("[data-booking-summary-message]");
    var dateHint = root.querySelector("[data-booking-date-short]");
    var whatsappAction = root.querySelector("[data-booking-action='whatsapp']");
    var emailAction = root.querySelector("[data-booking-action='email']");

    if (!dateInput || !nameInput || !timeSelect || !whatsappAction || !emailAction) return;

    var minimumDate = todayInputValue();
    if (!dateInput.getAttribute("min")) dateInput.setAttribute("min", minimumDate);

    try {
      var saved = JSON.parse(window.localStorage.getItem(config.storageKey) || "null");
      if (saved && config.capacityByTourId[saved.tourId]) {
        selectedTourId = saved.tourId;
        if (typeof saved.date === "string" && saved.date >= minimumDate) dateInput.value = saved.date;
        if (typeof saved.time === "string") selectedTime = saved.time;
        if (typeof saved.adults === "number") adults = saved.adults;
        if (typeof saved.children === "number") children = saved.children;
      }
    } catch (error) {}

    function capacity() {
      return config.capacityByTourId[selectedTourId] || 15;
    }

    function availableTimes() {
      var fixedTime = config.fixedTimeByTourId[selectedTourId];
      return fixedTime ? [fixedTime] : config.flexibleTimeOptions.slice();
    }

    function clampPeople() {
      var max = capacity();
      adults = Math.min(max, Math.max(1, Math.round(Number(adults) || 1)));
      children = Math.min(Math.max(0, max - adults), Math.max(0, Math.round(Number(children) || 0)));
    }

    function updateTourButtons() {
      root.querySelectorAll("[data-booking-tour-option]").forEach(function (button) {
        var selected = button.getAttribute("data-tour-id") === selectedTourId;
        button.setAttribute("aria-pressed", selected ? "true" : "false");
      });
      if (tourSelect) tourSelect.value = selectedTourId;
    }

    function updateTimeOptions() {
      var times = availableTimes();
      if (times.indexOf(selectedTime) === -1) selectedTime = times[0] || "Flexible";
      while (timeSelect.firstChild) timeSelect.removeChild(timeSelect.firstChild);
      times.forEach(function (option) {
        var node = document.createElement("option");
        var localizedTimes = config.timeOptionLabels[locale] || {};
        node.value = option;
        node.textContent = localizedTimes[option] || option;
        timeSelect.appendChild(node);
      });
      timeSelect.value = selectedTime;
    }

    function updateCounters() {
      clampPeople();
      if (adultInput) adultInput.value = String(adults);
      if (childInput) childInput.value = String(children);
      if (capacityText) capacityText.textContent = String(capacity());
      root.querySelectorAll("[data-booking-counter]").forEach(function (button) {
        var field = button.getAttribute("data-booking-counter");
        var delta = Number(button.getAttribute("data-booking-counter-delta") || 0);
        var disabled = false;
        if (field === "adults") disabled = delta < 0 ? adults <= 1 : adults >= capacity();
        if (field === "children") disabled = delta < 0 ? children <= 0 : children >= capacity() - adults;
        button.disabled = disabled;
      });
    }

    function bookingMessage() {
      var tourLabels = config.tourOptionLabels[locale] || config.tourOptionLabels.en;
      var timeLabels = config.timeOptionLabels[locale] || config.timeOptionLabels.en;
      var languageLabels = config.localeMessageLabels || {};
      return [
        (config.messageIntro[locale] || config.messageIntro.en),
        "",
        "*" + labels.tour + ":* " + (tourLabels[selectedTourId] || selectedTourId),
        "*" + labels.date + ":* " + requiredValue(formatBookingDate(dateInput.value, locale), prompts.date),
        "*" + labels.time + ":* " + cleanValue(timeLabels[selectedTime] || selectedTime),
        "*" + labels.language + ":* " + (languageLabels[locale] || locale),
        "*" + labels.adults + ":* " + adults,
        "*" + labels.children + ":* " + children,
        "*" + labels.name + ":* " + requiredValue(nameInput.value, prompts.name),
        "*" + labels.phone + ":* " + cleanValue(phoneInput ? phoneInput.value : ""),
        "*" + labels.notes + ":* " + cleanValue(notesInput ? notesInput.value : "")
      ].join("\n");
    }

    function updateLinks() {
      updateTourButtons();
      updateTimeOptions();
      updateCounters();

      var ready = Boolean(dateInput.value && nameInput.value.trim());
      var missingTarget = !dateInput.value ? "#quick-date" : !nameInput.value.trim() ? "#quick-name" : "#book";
      var message = bookingMessage();
      var tourLabels = config.tourOptionLabels[locale] || config.tourOptionLabels.en;
      var tourTitle = tourLabels[selectedTourId] || selectedTourId;
      var analyticsTour = analyticsSegment(selectedTourId);
      var analyticsLocale = analyticsSegment(locale);
      var whatsappPlacement = analyticsSegment(whatsappAction.getAttribute("data-analytics-placement") || "quick_form");

      var nextSummaryLabel = summaryLabels.pending;
      if (ready) nextSummaryLabel = summaryLabels.ready;
      if (summaryTitle) summaryTitle.textContent = nextSummaryLabel;
      if (summaryMessage) summaryMessage.textContent = message;
      if (dateHint) dateHint.textContent = dateInput.value ? formatDateShort(dateInput.value) : "DD MM YYYY";

      whatsappAction.setAttribute("href", ready ? whatsappUrl(message) : missingTarget);
      whatsappAction.setAttribute("aria-disabled", ready ? "false" : "true");
      whatsappAction.setAttribute("data-tour-id", selectedTourId);
      whatsappAction.setAttribute("data-analytics-tour", analyticsTour);
      whatsappAction.setAttribute("data-analytics-event", "whatsapp_click_" + analyticsTour + "_" + analyticsLocale + "_" + whatsappPlacement);
      if (ready) {
        whatsappAction.setAttribute("target", "_blank");
        whatsappAction.setAttribute("rel", "noreferrer");
      } else {
        whatsappAction.removeAttribute("target");
        whatsappAction.removeAttribute("rel");
      }

      emailAction.setAttribute("href", ready ? mailtoUrl(tourTitle, message) : missingTarget);
      emailAction.setAttribute("aria-disabled", ready ? "false" : "true");

      try {
        window.localStorage.setItem(config.storageKey, JSON.stringify({
          tourId: selectedTourId,
          date: dateInput.value,
          time: selectedTime,
          adults: adults,
          children: children
        }));
      } catch (error) {}
    }

    root.querySelectorAll("[data-booking-tour-option]").forEach(function (button) {
      button.addEventListener("click", function () {
        selectedTourId = button.getAttribute("data-tour-id") || selectedTourId;
        selectedTime = availableTimes()[0] || "Flexible";
        clampPeople();
        updateLinks();
      });
    });

    root.querySelectorAll("[data-booking-counter]").forEach(function (button) {
      button.addEventListener("click", function () {
        var field = button.getAttribute("data-booking-counter");
        var delta = Number(button.getAttribute("data-booking-counter-delta") || 0);
        if (field === "adults") adults += delta;
        if (field === "children") children += delta;
        updateLinks();
      });
    });

    timeSelect.addEventListener("change", function () {
      selectedTime = timeSelect.value;
      updateLinks();
    });

    [dateInput, nameInput, phoneInput, notesInput].forEach(function (input) {
      if (!input) return;
      input.addEventListener("input", updateLinks);
      input.addEventListener("change", updateLinks);
    });

    [whatsappAction, emailAction].forEach(function (link) {
      link.addEventListener("click", function (event) {
        if (dateInput.value && nameInput.value.trim()) return;
        event.preventDefault();
        var target = !dateInput.value ? dateInput : nameInput;
        target.scrollIntoView({ block: "center", behavior: "smooth" });
        target.focus({ preventScroll: true });
      });
    });

    updateLinks();
  }

  function init() {
    document.querySelectorAll("[data-booking-form='true']").forEach(initBookingForm);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
`;

function cleanValue(value: string) {
  return value.trim() || "-";
}

function requiredValue(value: string, fallback: string) {
  return value.trim() || fallback;
}

function todayInputValue() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function normalizeLocale(value: string | null | undefined) {
  if (!value) return value;
  if (value === "sq-AL") return "sq";

  const normalized = value.toLowerCase().replace("_", "-");
  if (normalized === "al" || normalized === "sq-al") return "sq";

  const primaryLocale = normalized.split("-")[0];
  return primaryLocale === "al" ? "sq" : primaryLocale;
}

function browserLocale(): FormLocale {
  const preferredLocales = navigator.languages.length ? navigator.languages : [navigator.language || "en"];

  for (const preferredLocale of preferredLocales) {
    const normalized = normalizeLocale(preferredLocale);
    if (normalized === "fr" || normalized === "sq" || normalized === "en") return normalized;
  }

  return "en";
}

function readLocale(): FormLocale {
  if (typeof window === "undefined") return "en";
  const params = new URL(window.location.href).searchParams;
  const urlLocale = params.get("dlang") || params.get("lang");
  const normalizedUrlLocale = normalizeLocale(urlLocale);
  if (normalizedUrlLocale === "fr" || normalizedUrlLocale === "sq" || normalizedUrlLocale === "en") return normalizedUrlLocale;
  try {
    const stored = window.localStorage.getItem("dhermi-language");
    const normalizedStoredLocale = normalizeLocale(stored);
    if (normalizedStoredLocale === "fr" || normalizedStoredLocale === "sq" || normalizedStoredLocale === "en") return normalizedStoredLocale;
    const htmlLocale = normalizeLocale(document.documentElement.lang);
    if (htmlLocale === "fr" || htmlLocale === "sq" || htmlLocale === "en") return htmlLocale;
  } catch {
    return "en";
  }
  return browserLocale();
}

function isTimeOption(value: string): value is TimeOption {
  return timeOptions.includes(value as TimeOption);
}

function timeOptionsForTour(tourId: string): TimeOption[] {
  const fixedTime = fixedTimeByTourId[tourId as keyof typeof fixedTimeByTourId];
  return fixedTime ? [fixedTime] : [...flexibleTimeOptions];
}

function capacityForTour(tourId: string) {
  return capacityByTourId[tourId as keyof typeof capacityByTourId] ?? 15;
}

function clampPeople(value: unknown, min: number, max: number, fallback: number) {
  return typeof value === "number" && Number.isFinite(value)
    ? Math.min(max, Math.max(min, Math.round(value)))
    : fallback;
}

function safeBookingDraft(rawDraft: unknown, minimumDate: string): BookingDraft {
  const source = typeof rawDraft === "object" && rawDraft !== null ? (rawDraft as Record<string, unknown>) : {};
  const savedTourId = typeof source.tourId === "string" && selectableTours.some((tour) => tour.id === source.tourId)
    ? source.tourId
    : selectableTours[0]?.id ?? "gjipe";
  const savedDate = typeof source.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(source.date) && source.date >= minimumDate
    ? source.date
    : "";
  const availableDraftTimes = timeOptionsForTour(savedTourId);
  const savedTime = typeof source.time === "string" && isTimeOption(source.time) && availableDraftTimes.includes(source.time)
    ? source.time
    : availableDraftTimes[0];
  const tourCapacity = capacityForTour(savedTourId);
  const savedAdults = clampPeople(source.adults, 1, tourCapacity, Math.min(2, tourCapacity));
  const savedChildren = clampPeople(source.children, 0, Math.max(0, tourCapacity - savedAdults), 0);

  return {
    tourId: savedTourId,
    date: savedDate,
    time: savedTime,
    adults: savedAdults,
    children: savedChildren
  };
}

function readStoredBookingDraft(minimumDate: string) {
  try {
    const rawDraft = window.localStorage.getItem(bookingDraftStorageKey);
    return safeBookingDraft(rawDraft ? JSON.parse(rawDraft) : null, minimumDate);
  } catch {
    return safeBookingDraft(null, minimumDate);
  }
}

export function OneMinuteBooking() {
  const [locale, setLocale] = useState<FormLocale>("en");
  const [tourId, setTourId] = useState(selectableTours[0]?.id ?? "gjipe");
  const [date, setDate] = useState("");
  const [minimumDate, setMinimumDate] = useState("");
  const [time, setTime] = useState<TimeOption>("Flexible");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<{ date?: boolean; name?: boolean }>({});
  const [bookingDraftReady, setBookingDraftReady] = useState(false);
  const [dateDisplayEnhanced, setDateDisplayEnhanced] = useState(false);

  const activeTour = selectableTours.find((tour) => tour.id === tourId) ?? selectableTours[0]!;
  const labels = fieldLabels[locale];
  const activeTourTitle = tourOptionLabels[locale][activeTour.id] ?? activeTour.shortTitle;
  const activeTourCapacity = capacityForTour(activeTour.id);
  const availableTimeOptions = useMemo(() => timeOptionsForTour(tourId), [tourId]);
  const selectedTime = availableTimeOptions.includes(time) ? time : availableTimeOptions[0];
  const activeTimeLabel = timeOptionLabels[locale][selectedTime] ?? selectedTime;
  const safeAdults = Math.min(activeTourCapacity, Math.max(1, adults));
  const maxChildrenForTour = Math.max(0, activeTourCapacity - safeAdults);
  const safeChildren = Math.min(Math.max(0, children), maxChildrenForTour);
  const messages = validationMessages[locale];
  const requiredPrompts = requiredFieldPrompts[locale];
  const formattedBookingDate = date ? formatBookingDate(date, locale) : "";
  const shortBookingDate = date ? formatDateShort(date) : "";

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDateDisplayEnhanced(true);
      setLocale(readLocale());
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const currentMinimumDate = todayInputValue();
      const bookingDraft = readStoredBookingDraft(currentMinimumDate);

      setMinimumDate(currentMinimumDate);
      setTourId(bookingDraft.tourId);
      setTime(bookingDraft.time);
      setAdults(bookingDraft.adults);
      setChildren(bookingDraft.children);
      setDate(bookingDraft.date);
      setBookingDraftReady(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!bookingDraftReady) return;

    const draft = { tourId, date, time: selectedTime, adults: safeAdults, children: safeChildren };
    // name, phone and notes are intentionally not saved because they are personal details.
    try {
      window.localStorage.setItem(bookingDraftStorageKey, JSON.stringify(draft));
    } catch {}
  }, [bookingDraftReady, date, safeAdults, safeChildren, selectedTime, tourId]);

  const bookingMessage = [
    messageIntro[locale],
    "",
    `*${labels.tour}:* ${activeTourTitle}`,
    `*${labels.date}:* ${requiredValue(formattedBookingDate, requiredPrompts.date)}`,
    `*${labels.time}:* ${cleanValue(activeTimeLabel)}`,
    `*${labels.language}:* ${localeMessageLabels[locale]}`,
    `*${labels.adults}:* ${safeAdults}`,
    `*${labels.children}:* ${safeChildren}`,
    `*${labels.name}:* ${requiredValue(name, requiredPrompts.name)}`,
    `*${labels.phone}:* ${cleanValue(phone)}`,
    `*${labels.notes}:* ${cleanValue(notes)}`
  ].join("\n");

  const emailHref = `mailto:${emailAddress}?subject=${encodeURIComponent(`Dhermi Boat booking: ${activeTourTitle}`)}&body=${encodeURIComponent(bookingMessage)}`;
  const whatsappHref = whatsappUrl(bookingMessage);
  const phoneHref = `tel:${phoneDisplay.replace(/\s/g, "")}`;
  const whatsappAnalyticsPlacement = "quick_form";
  const whatsappAnalyticsTour = analyticsSegment(activeTour.id);
  const firstMissingRequiredFieldId = !date ? "quick-date" : !name.trim() ? "quick-name" : null;
  const bookingLinksReady = firstMissingRequiredFieldId === null;
  const bookingFallbackHref = firstMissingRequiredFieldId ? `#${firstMissingRequiredFieldId}` : "#book";
  const whatsappActionHref = bookingLinksReady ? whatsappHref : bookingFallbackHref;
  const emailActionHref = bookingLinksReady ? emailHref : bookingFallbackHref;
  const bookingSummaryKey = bookingLinksReady ? "quick.summary.ready" : "quick.summary.pending";

  function validateRequiredFields() {
    const nextErrors = {
      date: !date,
      name: !name.trim()
    };

    setErrors(nextErrors);

    return !nextErrors.date && !nextErrors.name;
  }

  function handleMessageLinkClick(event: MouseEvent<HTMLAnchorElement>) {
    if (!validateRequiredFields()) {
      event.preventDefault();
      const targetId = !date ? "quick-date" : "quick-name";
      window.setTimeout(() => {
        const target = document.getElementById(targetId);
        target?.scrollIntoView({ block: "center", behavior: "smooth" });
        target?.focus({ preventScroll: true });
      }, 0);
    }
  }

  function changePeople(kind: "adults" | "children", direction: 1 | -1) {
    if (kind === "adults") {
      setAdults((currentAdults) => {
        const nextAdults = Math.min(activeTourCapacity, Math.max(1, currentAdults + direction));
        setChildren((currentChildren) => Math.min(currentChildren, Math.max(0, activeTourCapacity - nextAdults)));
        return nextAdults;
      });
      return;
    }
    setChildren((currentChildren) => Math.min(Math.max(0, activeTourCapacity - safeAdults), Math.max(0, currentChildren + direction)));
  }

  function selectTour(nextTourId: string) {
    const nextTimeOptions = timeOptionsForTour(nextTourId);
    const nextCapacity = capacityForTour(nextTourId);
    const nextAdults = Math.min(nextCapacity, Math.max(1, safeAdults));

    setTourId(nextTourId);
    setTime((currentTime) => (nextTimeOptions.includes(currentTime) ? currentTime : nextTimeOptions[0]));
    setAdults(nextAdults);
    setChildren((value) => Math.min(Math.max(0, value), Math.max(0, nextCapacity - nextAdults)));
  }

  function selectDate(nextDate: string) {
    setDate(minimumDate && nextDate && nextDate < minimumDate ? minimumDate : nextDate);
    setErrors((currentErrors) => ({ ...currentErrors, date: false }));
  }

  return (
    <section id="book" className="overflow-hidden bg-ink text-pearl">
      <div className="site-band grid gap-10 py-14 md:py-20 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <div className="max-w-xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-sand">
            <LocalizedText id="quick.label">{enText("quick.label")}</LocalizedText>
          </p>
          <h2 className="mt-4 font-serif text-4xl font-medium leading-[1.02] md:text-6xl">
            <LocalizedText id="quick.title">{enText("quick.title")}</LocalizedText>
          </h2>
          <p className="mt-5 text-base leading-8 text-pearl/88 md:text-lg">
            <LocalizedText id="quick.text">{enText("quick.text")}</LocalizedText>
          </p>
          <div className="mt-8 grid gap-3 text-sm text-pearl/90 sm:grid-cols-3">
            {[
              "quick.promise.whatsapp",
              "quick.promise.reply",
              "quick.promise.email"
            ].map((id) => (
              <div key={id} className="flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                <ShieldCheck className="h-4 w-4 shrink-0 text-sand" aria-hidden strokeWidth={1.75} />
                <span className="font-semibold">
                  <LocalizedText id={id}>{translations.en[id] ?? ""}</LocalizedText>
                </span>
              </div>
            ))}
          </div>
        </div>

        <form
          className="rounded-lg border border-white/14 bg-pearl p-4 text-ink shadow-[0_30px_80px_rgba(0,0,0,0.22)] md:p-6"
          data-booking-form="true"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="grid gap-5 lg:grid-cols-[1fr_0.88fr]">
            <div>
              <label className="text-xs font-bold uppercase tracking-[0.18em] text-bronze" htmlFor="quick-tour">
                <LocalizedText id="quick.tour">{enText("quick.tour")}</LocalizedText>
              </label>
              <div className="mt-3 grid gap-2">
                {selectableTours.map((tour) => {
                  const selected = tour.id === tourId;
                  return (
                    <button
                      key={tour.id}
                      aria-pressed={selected}
                      className={[
                        "group flex w-full items-center justify-between gap-4 rounded-md border px-4 py-3 text-left transition duration-300 active:translate-y-px",
                        selected ? "border-ink bg-ink text-pearl" : "border-ink/10 bg-limestone/70 text-ink hover:border-ink/25 hover:bg-white"
                      ].join(" ")}
                      data-booking-tour-option="true"
                      data-tour-id={tour.id}
                      type="button"
                      onClick={() => selectTour(tour.id)}
                    >
                      <span>
                        <span className="block font-serif text-xl font-medium">
                          <LocalizedText id={`tour.${tour.id}.shortTitle`}>{tour.shortTitle}</LocalizedText>
                        </span>
                        <span
                          className={selected ? "mt-1 block text-xs font-semibold uppercase tracking-[0.14em] text-sand" : "mt-1 block text-xs font-semibold uppercase tracking-[0.14em] text-bronze"}
                          data-booking-tour-price="true"
                        >
                          <LocalizedText id={`tour.${tour.id}.price`}>{tour.price}</LocalizedText>
                        </span>
                      </span>
                      <span
                        className={selected ? "h-3 w-3 rounded-full bg-sand" : "h-3 w-3 rounded-full border border-ink/25 bg-white group-hover:bg-turquoise-soft"}
                        data-booking-tour-dot="true"
                      />
                    </button>
                  );
                })}
              </div>
              <select
                id="quick-tour"
                className="sr-only"
                name="Tour id"
                value={activeTour.id}
                onChange={(event) => {
                  const option = selectableTours.find((tour) => tour.id === event.target.value);
                  if (option) selectTour(option.id);
                }}
              >
                {selectableTours.map((tour) => (
                  <option key={tour.id} value={tour.id}>
                    {tourOptionLabels[locale][tour.id] ?? tour.shortTitle}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-4">
              <div className="grid gap-2">
                <label className="text-xs font-bold uppercase tracking-[0.18em] text-bronze" htmlFor="quick-date">
                  <LocalizedText id="quick.date">{enText("quick.date")}</LocalizedText>
                </label>
                <div
                  className={
                    dateDisplayEnhanced
                      ? [
                          "relative h-12 rounded-md border bg-white transition focus-within:border-ink",
                          errors.date ? "border-bronze" : "border-ink/12"
                        ].join(" ")
                      : "relative"
                  }
                >
                  <CalendarDays className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" aria-hidden strokeWidth={1.75} />
                  {dateDisplayEnhanced ? (
                    <span
                      aria-hidden
                      className={[
                        "pointer-events-none absolute left-11 top-1/2 -translate-y-1/2 text-base font-semibold",
                        shortBookingDate ? "text-ink" : "text-ink-soft"
                      ].join(" ")}
                    >
                      {shortBookingDate || dateDisplayFormat}
                    </span>
                  ) : null}
                  <input
                    id="quick-date"
                    aria-label={`${labels.date} ${dateDisplayFormat}`}
                    aria-describedby={errors.date ? "quick-date-error" : undefined}
                    aria-invalid={errors.date || undefined}
                    className={
                      dateDisplayEnhanced
                        ? "absolute inset-0 h-full w-full cursor-pointer opacity-0"
                        : [
                            "h-12 w-full rounded-md border bg-white pl-11 pr-4 text-base font-semibold text-ink outline-none transition focus:border-ink",
                            errors.date ? "border-bronze" : "border-ink/12"
                          ].join(" ")
                    }
                    lang="en-GB"
                    name="Date"
                    type="date"
                    min={minimumDate || undefined}
                    required
                    value={date}
                    onInput={(event) => selectDate(event.currentTarget.value)}
                    onChange={(event) => selectDate(event.target.value)}
                    onBlur={(event) => selectDate(event.currentTarget.value)}
                  />
                </div>
                {errors.date ? (
                  <p id="quick-date-error" className="text-sm font-semibold text-bronze">
                    {messages.date}
                  </p>
                ) : null}
                <p className="text-xs font-semibold text-ink-soft" aria-live="polite" data-booking-date-short="true">
                  {shortBookingDate || dateDisplayFormat}
                </p>
              </div>

              <div className="grid gap-2">
                <label className="text-xs font-bold uppercase tracking-[0.18em] text-bronze" htmlFor="quick-time">
                  <LocalizedText id="quick.time">{enText("quick.time")}</LocalizedText>
                </label>
                <select
                  id="quick-time"
                  className="h-12 w-full rounded-md border border-ink/12 bg-white px-4 text-base font-semibold text-ink outline-none transition focus:border-ink"
                  name="Preferred time"
                  value={selectedTime}
                  onChange={(event) => {
                    const nextTime = event.target.value;
                    if (isTimeOption(nextTime)) setTime(nextTime);
                  }}
                >
                  {availableTimeOptions.map((option) => (
                    <option key={option} value={option}>
                      {timeOptionLabels[locale][option]}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  ["adults", "quick.adults", safeAdults],
                  ["children", "quick.children", safeChildren]
                ].map(([kind, id, value]) => {
                  const field = kind as "adults" | "children";
                  const counterName = labels[field].toLocaleLowerCase(locale === "fr" ? "fr" : "en");
                  const actionLabel = counterActionLabels[locale];
                  const numericValue = Number(value);
                  const minValue = field === "adults" ? 1 : 0;
                  const maxValue = field === "adults" ? activeTourCapacity : maxChildrenForTour;
                  const canDecrease = numericValue > minValue;
                  const canIncrease = numericValue < maxValue;

                  return (
                    <div key={String(kind)} className="grid gap-2">
                    <label className="text-xs font-bold uppercase tracking-[0.18em] text-bronze" htmlFor={`quick-${field}`}>
                        <LocalizedText id={String(id)}>{translations.en[String(id)] ?? ""}</LocalizedText>
                      </label>
                      <div className="grid h-12 grid-cols-[2.5rem_1fr_2.5rem] overflow-hidden rounded-md border border-ink/12 bg-white">
                        <button
                          aria-label={`${actionLabel.decrease} ${counterName}`}
                          className="grid place-items-center text-ink-soft transition hover:bg-limestone active:bg-sand/50 disabled:cursor-not-allowed disabled:opacity-35"
                          data-booking-counter={field}
                          data-booking-counter-delta="-1"
                          disabled={!canDecrease}
                          type="button"
                          onClick={() => changePeople(field, -1)}
                        >
                          <Minus className="h-4 w-4" aria-hidden strokeWidth={1.75} />
                        </button>
                        <input
                          id={`quick-${field}`}
                          aria-label={labels[field]}
                          className="min-w-0 bg-white text-center text-base font-bold text-ink outline-none"
                          data-booking-counter-value={field}
                          max={maxValue}
                          min={minValue}
                          name={String(translations.en[String(id)] ?? String(id))}
                          readOnly
                          value={Number(value)}
                        />
                        <button
                          aria-label={`${actionLabel.increase} ${counterName}`}
                          className="grid place-items-center text-ink-soft transition hover:bg-limestone active:bg-sand/50 disabled:cursor-not-allowed disabled:opacity-35"
                          data-booking-counter={field}
                          data-booking-counter-delta="1"
                          disabled={!canIncrease}
                          type="button"
                          onClick={() => changePeople(field, 1)}
                        >
                          <Plus className="h-4 w-4" aria-hidden strokeWidth={1.75} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="text-xs font-semibold text-ink-soft">
                <LocalizedText id="quick.capacity">{enText("quick.capacity")}</LocalizedText>: <span data-booking-capacity="true">{activeTourCapacity}</span>
              </p>

              <div className="grid gap-2">
                <label className="text-xs font-bold uppercase tracking-[0.18em] text-bronze" htmlFor="quick-name">
                  <LocalizedText id="quick.name">{enText("quick.name")}</LocalizedText>
                </label>
                <div className="relative">
                  <UserRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" aria-hidden strokeWidth={1.75} />
                  <input
                    id="quick-name"
                    aria-describedby={errors.name ? "quick-name-error" : undefined}
                    aria-invalid={errors.name || undefined}
                    autoComplete="name"
                    className={[
                      "h-12 w-full rounded-md border bg-white pl-11 pr-4 text-base font-semibold text-ink outline-none transition focus:border-ink",
                      errors.name ? "border-bronze" : "border-ink/12"
                    ].join(" ")}
                    name="Name"
                    required
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                      setErrors((currentErrors) => ({ ...currentErrors, name: false }));
                    }}
                  />
                </div>
                {errors.name ? (
                  <p id="quick-name-error" className="text-sm font-semibold text-bronze">
                    {messages.name}
                  </p>
                ) : null}
              </div>

              <div className="grid gap-2">
                <label className="text-xs font-bold uppercase tracking-[0.18em] text-bronze" htmlFor="quick-phone">
                  <LocalizedText id="quick.phone">{enText("quick.phone")}</LocalizedText>
                </label>
                <input
                  id="quick-phone"
                  autoComplete="tel"
                  className="h-12 w-full rounded-md border border-ink/12 bg-white px-4 text-base font-semibold text-ink outline-none transition focus:border-ink"
                  name="Phone"
                  inputMode="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                />
                <p className="text-xs font-semibold text-ink-soft">{messages.phoneHint}</p>
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-2">
            <label className="text-xs font-bold uppercase tracking-[0.18em] text-bronze" htmlFor="quick-notes">
              <LocalizedText id="quick.notes">{enText("quick.notes")}</LocalizedText>
            </label>
            <textarea
              id="quick-notes"
              className="min-h-24 w-full resize-y rounded-md border border-ink/12 bg-white px-4 py-3 text-base leading-7 text-ink outline-none transition focus:border-ink"
              name="Notes"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
            />
          </div>

          <div className="mt-5 rounded-md border border-ink/10 bg-limestone/75 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-bronze" data-booking-summary-title="true">
              <LocalizedText id={bookingSummaryKey}>{translations.en[bookingSummaryKey] ?? ""}</LocalizedText>
            </p>
            <p className="mt-2 whitespace-pre-line text-sm leading-6 text-ink-soft" data-booking-summary-message="true">{bookingMessage}</p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.9fr_0.7fr]">
            <a
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-ink px-5 text-sm font-semibold text-pearl shadow-soft transition hover:bg-navy active:translate-y-px"
              aria-disabled={!bookingLinksReady}
              data-booking-action="whatsapp"
              data-analytics-event={conversionEvent(activeTour.id, locale, whatsappAnalyticsPlacement)}
              data-analytics-event-template={whatsappEventTemplate}
              data-analytics-tour={whatsappAnalyticsTour}
              data-analytics-placement={whatsappAnalyticsPlacement}
              data-tour-id={activeTour.id}
              href={whatsappActionHref}
              rel={bookingLinksReady ? "noreferrer" : undefined}
              target={bookingLinksReady ? "_blank" : undefined}
              onClick={handleMessageLinkClick}
            >
              <MessageCircle className="h-4 w-4" aria-hidden strokeWidth={1.75} />
              <LocalizedText id="quick.whatsapp">{enText("quick.whatsapp")}</LocalizedText>
            </a>
            <a
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-ink/12 bg-white px-5 text-sm font-semibold text-ink transition hover:border-ink/28 hover:bg-pearl active:translate-y-px"
              aria-disabled={!bookingLinksReady}
              data-booking-action="email"
              data-analytics-event="email_click"
              href={emailActionHref}
              onClick={handleMessageLinkClick}
            >
              <Mail className="h-4 w-4" aria-hidden strokeWidth={1.75} />
              <LocalizedText id="quick.email">{enText("quick.email")}</LocalizedText>
            </a>
            <a
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-ink/12 bg-white px-5 text-sm font-semibold text-ink transition hover:border-ink/28 hover:bg-pearl active:translate-y-px"
              data-analytics-event="call_click"
              href={phoneHref}
            >
              <Phone className="h-4 w-4" aria-hidden strokeWidth={1.75} />
              <LocalizedText id="cta.call">{enText("cta.call")}</LocalizedText>
            </a>
          </div>
        </form>
        <InlineRuntimeScript id="static-booking-enhancer" code={staticBookingEnhancerScript} />
      </div>
    </section>
  );
}
