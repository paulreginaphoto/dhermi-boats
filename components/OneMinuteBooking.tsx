"use client";

import { useEffect, useMemo, useState, type FormEvent, type MouseEvent } from "react";
import { CalendarDays, Mail, MessageCircle, Minus, Phone, Plus, Send, ShieldCheck, UserRound } from "lucide-react";
import { LocalizedText } from "@/components/LocalizedText";
import { tours } from "@/data/content";
import { bookingFormEndpoint, emailAddress, phoneDisplay, siteUrl, whatsappUrl } from "@/lib/site";

const selectableTours = tours.slice(0, 5);
const flexibleTimeOptions = ["Flexible", "Morning", "Afternoon", "Sunset"] as const;
const fixedOnlyTimeOptions = ["FishingMorning"] as const;
const timeOptions = [...flexibleTimeOptions, ...fixedOnlyTimeOptions] as const;
type TimeOption = (typeof timeOptions)[number];

const fixedTimeByTourId = {
  sunset: "Sunset",
  fishing: "FishingMorning"
} as const satisfies Record<string, TimeOption>;

type FormLocale = "en" | "fr" | "sq";
const bookingDraftStorageKey = "dhermi-booking-draft-v1";

type BookingDraft = {
  tourId: string;
  date: string;
  time: TimeOption;
  adults: number;
  children: number;
};

const messageIntro: Record<FormLocale, string> = {
  en: "Hello Dhermi Boat, I would like to book a boat tour.",
  fr: "Bonjour Dhermi Boat, je voudrais réserver un tour en bateau.",
  sq: "Pershendetje Dhermi Boat, dua te rezervoj nje tur me varke."
};

const fieldLabels: Record<FormLocale, Record<string, string>> = {
  en: {
    tour: "Tour",
    date: "Date",
    time: "Time",
    adults: "Adults",
    children: "Children",
    name: "Name",
    phone: "Phone",
    notes: "Notes"
  },
  fr: {
    tour: "Tour",
    date: "Date",
    time: "Heure",
    adults: "Adultes",
    children: "Enfants",
    name: "Nom",
    phone: "Téléphone",
    notes: "Notes"
  },
  sq: {
    tour: "Turi",
    date: "Data",
    time: "Ora",
    adults: "Te rritur",
    children: "Femije",
    name: "Emri",
    phone: "Telefoni",
    notes: "Shenime"
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
    sunset: "Sunset Tour privé",
    fishing: "Morning Fishing Tour"
  },
  sq: {
    gjipe: "Turi i Gjipesë",
    grama: "Turi i Gramës",
    private: "Tur privat sipas dëshirës",
    sunset: "Tur privat në perëndim",
    fishing: "Morning Fishing Tour"
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
    Morning: "Mengjes",
    Afternoon: "Pasdite",
    Sunset: "Perendim dielli",
    FishingMorning: "5:00 - 8:00"
  }
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

function cleanValue(value: string) {
  return value.trim() || "-";
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
  const urlLocale = new URL(window.location.href).searchParams.get("dlang");
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

  return {
    tourId: savedTourId,
    date: savedDate,
    time: savedTime,
    adults: clampPeople(source.adults, 1, 15, 2),
    children: clampPeople(source.children, 0, 14, 0)
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

  const activeTour = selectableTours.find((tour) => tour.id === tourId) ?? selectableTours[0]!;
  const labels = fieldLabels[locale];
  const activeTourTitle = tourOptionLabels[locale][activeTour.id] ?? activeTour.shortTitle;
  const availableTimeOptions = useMemo(() => timeOptionsForTour(tourId), [tourId]);
  const selectedTime = availableTimeOptions.includes(time) ? time : availableTimeOptions[0];
  const activeTimeLabel = timeOptionLabels[locale][selectedTime] ?? selectedTime;
  const messages = validationMessages[locale];

  useEffect(() => {
    const timer = window.setTimeout(() => setLocale(readLocale()), 0);
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

    const draft = { tourId, date, time: selectedTime, adults, children };
    // name, phone and notes are intentionally not saved because they are personal details.
    try {
      window.localStorage.setItem(bookingDraftStorageKey, JSON.stringify(draft));
    } catch {}
  }, [adults, bookingDraftReady, children, date, selectedTime, tourId]);

  const bookingMessage = useMemo(() => {
    const lines = [
      messageIntro[locale],
      `${labels.tour}: ${activeTourTitle}`,
      `${labels.date}: ${cleanValue(date)}`,
      `${labels.time}: ${cleanValue(activeTimeLabel)}`,
      `${labels.adults}: ${adults}`,
      `${labels.children}: ${children}`,
      `${labels.name}: ${cleanValue(name)}`,
      `${labels.phone}: ${cleanValue(phone)}`,
      `${labels.notes}: ${cleanValue(notes)}`
    ];

    return lines.join("\n");
  }, [activeTimeLabel, activeTourTitle, adults, children, date, labels, locale, name, notes, phone]);

  const emailHref = `mailto:${emailAddress}?subject=${encodeURIComponent(`Dhermi Boat booking: ${activeTourTitle}`)}&body=${encodeURIComponent(bookingMessage)}`;
  const whatsappHref = whatsappUrl(bookingMessage);
  const phoneHref = `tel:${phoneDisplay.replace(/\s/g, "")}`;

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
    }
  }

  function handleEmailSubmit(event: FormEvent<HTMLFormElement>) {
    if (!validateRequiredFields()) {
      event.preventDefault();
    }
  }

  function changePeople(kind: "adults" | "children", direction: 1 | -1) {
    if (kind === "adults") {
      setAdults((value) => Math.min(15, Math.max(1, value + direction)));
      return;
    }
    setChildren((value) => Math.min(14, Math.max(0, value + direction)));
  }

  function selectTour(nextTourId: string) {
    const nextTimeOptions = timeOptionsForTour(nextTourId);

    setTourId(nextTourId);
    setTime((currentTime) => (nextTimeOptions.includes(currentTime) ? currentTime : nextTimeOptions[0]));
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
            <LocalizedText id="quick.label">Fast booking</LocalizedText>
          </p>
          <h2 className="mt-4 font-serif text-4xl font-medium leading-[1.02] md:text-6xl">
            <LocalizedText id="quick.title">Reserve in one minute</LocalizedText>
          </h2>
          <p className="mt-5 text-base leading-8 text-pearl/88 md:text-lg">
            <LocalizedText id="quick.text">
              Choose a tour, add date and people, then send the ready message on WhatsApp.
            </LocalizedText>
          </p>
          <div className="mt-8 grid gap-3 text-sm text-pearl/90 sm:grid-cols-3">
            {[
              ["quick.promise.whatsapp", "WhatsApp first"],
              ["quick.promise.reply", "Fast reply"],
              ["quick.promise.email", "Email backup"]
            ].map(([id, fallback]) => (
              <div key={id} className="flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                <ShieldCheck className="h-4 w-4 shrink-0 text-sand" aria-hidden strokeWidth={1.75} />
                <span className="font-semibold">
                  <LocalizedText id={id}>{fallback}</LocalizedText>
                </span>
              </div>
            ))}
          </div>
        </div>

        <form
          action={bookingFormEndpoint}
          className="rounded-lg border border-white/14 bg-pearl p-4 text-ink shadow-[0_30px_80px_rgba(0,0,0,0.22)] md:p-6"
          data-analytics-event="booking_form_submit"
          method="POST"
          onSubmit={handleEmailSubmit}
        >
          <input type="hidden" name="_subject" value={`Dhermi Boat booking: ${activeTourTitle}`} />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_next" value={`${siteUrl}/contact/?booking=sent`} />
          <input type="hidden" name="Tour selected" value={activeTourTitle} />
          <input type="hidden" name="Preferred time label" value={activeTimeLabel} />
          <input type="hidden" name="Booking message" value={bookingMessage} />

          <div className="grid gap-5 lg:grid-cols-[1fr_0.88fr]">
            <div>
              <label className="text-xs font-bold uppercase tracking-[0.18em] text-bronze" htmlFor="quick-tour">
                <LocalizedText id="quick.tour">Tour</LocalizedText>
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
                      type="button"
                      onClick={() => selectTour(tour.id)}
                    >
                      <span>
                        <span className="block font-serif text-xl font-medium">
                          <LocalizedText id={`tour.${tour.id}.shortTitle`}>{tour.shortTitle}</LocalizedText>
                        </span>
                        <span className={selected ? "mt-1 block text-xs font-semibold uppercase tracking-[0.14em] text-sand" : "mt-1 block text-xs font-semibold uppercase tracking-[0.14em] text-bronze"}>
                          <LocalizedText id={`tour.${tour.id}.price`}>{tour.price}</LocalizedText>
                        </span>
                      </span>
                      <span className={selected ? "h-3 w-3 rounded-full bg-sand" : "h-3 w-3 rounded-full border border-ink/25 bg-white group-hover:bg-turquoise-soft"} />
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
                  <LocalizedText id="quick.date">Date</LocalizedText>
                </label>
                <div className="relative">
                  <CalendarDays className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" aria-hidden strokeWidth={1.75} />
                  <input
                    id="quick-date"
                    aria-describedby={errors.date ? "quick-date-error" : undefined}
                    aria-invalid={errors.date || undefined}
                    className={[
                      "h-12 w-full rounded-md border bg-white pl-11 pr-4 text-base font-semibold text-ink outline-none transition focus:border-ink",
                      errors.date ? "border-bronze" : "border-ink/12"
                    ].join(" ")}
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
              </div>

              <div className="grid gap-2">
                <label className="text-xs font-bold uppercase tracking-[0.18em] text-bronze" htmlFor="quick-time">
                  <LocalizedText id="quick.time">Preferred time</LocalizedText>
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
                  ["adults", "quick.adults", "Adults", adults],
                  ["children", "quick.children", "Children", children]
                ].map(([kind, id, fallback, value]) => {
                  const field = kind as "adults" | "children";
                  const counterName = labels[field].toLocaleLowerCase(locale === "fr" ? "fr" : "en");
                  const actionLabel = counterActionLabels[locale];

                  return (
                    <div key={String(kind)} className="grid gap-2">
                      <label className="text-xs font-bold uppercase tracking-[0.18em] text-bronze" htmlFor={`quick-${field}`}>
                        <LocalizedText id={String(id)}>{fallback}</LocalizedText>
                      </label>
                      <div className="grid h-12 grid-cols-[2.5rem_1fr_2.5rem] overflow-hidden rounded-md border border-ink/12 bg-white">
                        <button
                          aria-label={`${actionLabel.decrease} ${counterName}`}
                          className="grid place-items-center text-ink-soft transition hover:bg-limestone active:bg-sand/50"
                          type="button"
                          onClick={() => changePeople(field, -1)}
                        >
                          <Minus className="h-4 w-4" aria-hidden strokeWidth={1.75} />
                        </button>
                        <input
                          id={`quick-${field}`}
                          aria-label={labels[field]}
                          className="min-w-0 bg-white text-center text-base font-bold text-ink outline-none"
                          name={String(fallback)}
                          readOnly
                          value={Number(value)}
                        />
                        <button
                          aria-label={`${actionLabel.increase} ${counterName}`}
                          className="grid place-items-center text-ink-soft transition hover:bg-limestone active:bg-sand/50"
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

              <div className="grid gap-2">
                <label className="text-xs font-bold uppercase tracking-[0.18em] text-bronze" htmlFor="quick-name">
                  <LocalizedText id="quick.name">Name</LocalizedText>
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
                  <LocalizedText id="quick.phone">WhatsApp or phone</LocalizedText>
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
              <LocalizedText id="quick.notes">Notes</LocalizedText>
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
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-bronze">
              <LocalizedText id="quick.summary">Message ready</LocalizedText>
            </p>
            <p className="mt-2 whitespace-pre-line text-sm leading-6 text-ink-soft">{bookingMessage}</p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.7fr]">
            <a
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-ink px-5 text-sm font-semibold text-pearl shadow-soft transition hover:bg-navy active:translate-y-px"
              data-analytics-event="whatsapp_click"
              data-tour-id={activeTour.id}
              href={whatsappHref}
              rel="noreferrer"
              target="_blank"
              onClick={handleMessageLinkClick}
            >
              <MessageCircle className="h-4 w-4" aria-hidden strokeWidth={1.75} />
              <LocalizedText id="quick.whatsapp">Send on WhatsApp</LocalizedText>
            </a>
            <button
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-ink/12 bg-white px-5 text-sm font-semibold text-ink transition hover:border-ink/28 hover:bg-pearl active:translate-y-px"
              data-analytics-event="booking_form_submit"
              type="submit"
            >
              <Send className="h-4 w-4" aria-hidden strokeWidth={1.75} />
              <LocalizedText id="quick.email">Send email</LocalizedText>
            </button>
            <a
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-ink/12 bg-white px-5 text-sm font-semibold text-ink transition hover:border-ink/28 hover:bg-pearl active:translate-y-px"
              data-analytics-event="email_click"
              href={emailHref}
              onClick={handleMessageLinkClick}
            >
              <Mail className="h-4 w-4" aria-hidden strokeWidth={1.75} />
              <LocalizedText id="quick.mailto">Email app</LocalizedText>
            </a>
            <a
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-ink/12 bg-white px-5 text-sm font-semibold text-ink transition hover:border-ink/28 hover:bg-pearl active:translate-y-px"
              data-analytics-event="call_click"
              href={phoneHref}
            >
              <Phone className="h-4 w-4" aria-hidden strokeWidth={1.75} />
              <LocalizedText id="cta.call">Call now</LocalizedText>
            </a>
          </div>
        </form>
      </div>
    </section>
  );
}
