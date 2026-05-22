"use client";

import { useMemo, useState } from "react";
import { CalendarDays, Mail, MessageCircle, Minus, Plus, Send, ShieldCheck, UserRound } from "lucide-react";
import { LocalizedText } from "@/components/LocalizedText";
import { tours } from "@/data/content";
import { bookingFormEndpoint, emailAddress, siteUrl, whatsappUrl } from "@/lib/site";

const selectableTours = tours.slice(0, 5);

type FormLocale = "en" | "fr" | "al";

const messageIntro: Record<FormLocale, string> = {
  en: "Hello Dhermi Boat, I would like to book a boat tour.",
  fr: "Bonjour Dhermi Boat, je voudrais réserver un tour en bateau.",
  al: "Pershendetje Dhermi Boat, dua te rezervoj nje tur me varke."
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
    notes: "Notes",
    flexible: "Flexible"
  },
  fr: {
    tour: "Tour",
    date: "Date",
    time: "Heure",
    adults: "Adultes",
    children: "Enfants",
    name: "Nom",
    phone: "Téléphone",
    notes: "Notes",
    flexible: "Flexible"
  },
  al: {
    tour: "Turi",
    date: "Data",
    time: "Ora",
    adults: "Te rritur",
    children: "Femije",
    name: "Emri",
    phone: "Telefoni",
    notes: "Shenime",
    flexible: "Fleksibel"
  }
};

function cleanValue(value: string) {
  return value.trim() || "-";
}

function readLocale(): FormLocale {
  if (typeof window === "undefined") return "en";
  const urlLocale = new URL(window.location.href).searchParams.get("dlang");
  if (urlLocale === "fr" || urlLocale === "al" || urlLocale === "en") return urlLocale;
  try {
    const stored = window.localStorage.getItem("dhermi-language");
    if (stored === "fr" || stored === "al" || stored === "en") return stored;
  } catch {
    return "en";
  }
  return "en";
}

export function OneMinuteBooking() {
  const [locale] = useState<FormLocale>(() => readLocale());
  const [tourId, setTourId] = useState(selectableTours[0]?.id ?? "gjipe");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("Flexible");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const activeTour = selectableTours.find((tour) => tour.id === tourId) ?? selectableTours[0]!;
  const labels = fieldLabels[locale];

  const bookingMessage = useMemo(() => {
    const lines = [
      messageIntro[locale],
      `${labels.tour}: ${activeTour.shortTitle}`,
      `${labels.date}: ${cleanValue(date)}`,
      `${labels.time}: ${cleanValue(time || labels.flexible)}`,
      `${labels.adults}: ${adults}`,
      `${labels.children}: ${children}`,
      `${labels.name}: ${cleanValue(name)}`,
      `${labels.phone}: ${cleanValue(phone)}`,
      `${labels.notes}: ${cleanValue(notes)}`
    ];

    return lines.join("\n");
  }, [activeTour.shortTitle, adults, children, date, labels, locale, name, notes, phone, time]);

  const emailHref = `mailto:${emailAddress}?subject=${encodeURIComponent(`Dhermi Boat booking: ${activeTour.shortTitle}`)}&body=${encodeURIComponent(bookingMessage)}`;

  function changePeople(kind: "adults" | "children", direction: 1 | -1) {
    if (kind === "adults") {
      setAdults((value) => Math.min(15, Math.max(1, value + direction)));
      return;
    }
    setChildren((value) => Math.min(14, Math.max(0, value + direction)));
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
          <p className="mt-5 text-base leading-8 text-pearl/76 md:text-lg">
            <LocalizedText id="quick.text">
              Choose a tour, add date and people, then send the ready message on WhatsApp.
            </LocalizedText>
          </p>
          <div className="mt-8 grid gap-3 text-sm text-pearl/80 sm:grid-cols-3">
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
          method="POST"
        >
          <input type="hidden" name="_subject" value={`Dhermi Boat booking: ${activeTour.shortTitle}`} />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_next" value={`${siteUrl}/contact/?booking=sent`} />
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
                      onClick={() => setTourId(tour.id)}
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
                name="Tour"
                value={activeTour.shortTitle}
                onChange={(event) => {
                  const option = selectableTours.find((tour) => tour.shortTitle === event.target.value);
                  if (option) setTourId(option.id);
                }}
              >
                {selectableTours.map((tour) => (
                  <option key={tour.id} value={tour.shortTitle}>
                    {tour.shortTitle}
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
                    className="h-12 w-full rounded-md border border-ink/12 bg-white pl-11 pr-4 text-base font-semibold text-ink outline-none transition focus:border-ink"
                    name="Date"
                    type="date"
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <label className="text-xs font-bold uppercase tracking-[0.18em] text-bronze" htmlFor="quick-time">
                  <LocalizedText id="quick.time">Preferred time</LocalizedText>
                </label>
                <select
                  id="quick-time"
                  className="h-12 w-full rounded-md border border-ink/12 bg-white px-4 text-base font-semibold text-ink outline-none transition focus:border-ink"
                  name="Preferred time"
                  value={time}
                  onChange={(event) => setTime(event.target.value)}
                >
                  <option value="Flexible">
                    <LocalizedText id="quick.time.flexible">Flexible</LocalizedText>
                  </option>
                  <option value="Morning">
                    <LocalizedText id="quick.time.morning">Morning</LocalizedText>
                  </option>
                  <option value="Afternoon">
                    <LocalizedText id="quick.time.afternoon">Afternoon</LocalizedText>
                  </option>
                  <option value="Sunset">
                    <LocalizedText id="quick.time.sunset">Sunset</LocalizedText>
                  </option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  ["adults", "quick.adults", "Adults", adults],
                  ["children", "quick.children", "Children", children]
                ].map(([kind, id, fallback, value]) => (
                  <div key={String(kind)} className="grid gap-2">
                    <label className="text-xs font-bold uppercase tracking-[0.18em] text-bronze">
                      <LocalizedText id={String(id)}>{fallback}</LocalizedText>
                    </label>
                    <div className="grid h-12 grid-cols-[2.5rem_1fr_2.5rem] overflow-hidden rounded-md border border-ink/12 bg-white">
                      <button className="grid place-items-center text-ink-soft transition hover:bg-limestone active:bg-sand/50" type="button" onClick={() => changePeople(kind as "adults" | "children", -1)}>
                        <Minus className="h-4 w-4" aria-hidden strokeWidth={1.75} />
                      </button>
                      <input className="min-w-0 bg-white text-center text-base font-bold text-ink outline-none" name={String(fallback)} readOnly value={Number(value)} />
                      <button className="grid place-items-center text-ink-soft transition hover:bg-limestone active:bg-sand/50" type="button" onClick={() => changePeople(kind as "adults" | "children", 1)}>
                        <Plus className="h-4 w-4" aria-hidden strokeWidth={1.75} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid gap-2">
                <label className="text-xs font-bold uppercase tracking-[0.18em] text-bronze" htmlFor="quick-name">
                  <LocalizedText id="quick.name">Name</LocalizedText>
                </label>
                <div className="relative">
                  <UserRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" aria-hidden strokeWidth={1.75} />
                  <input
                    id="quick-name"
                    autoComplete="name"
                    className="h-12 w-full rounded-md border border-ink/12 bg-white pl-11 pr-4 text-base font-semibold text-ink outline-none transition focus:border-ink"
                    name="Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>
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

          <div className="mt-5 grid gap-3 sm:grid-cols-[1.2fr_0.8fr_0.8fr]">
            <a
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-ink px-5 text-sm font-semibold text-pearl shadow-soft transition hover:bg-navy active:translate-y-px"
              href={whatsappUrl(bookingMessage)}
              rel="noreferrer"
              target="_blank"
            >
              <MessageCircle className="h-4 w-4" aria-hidden strokeWidth={1.75} />
              <LocalizedText id="quick.whatsapp">Send on WhatsApp</LocalizedText>
            </a>
            <button
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-ink/12 bg-white px-5 text-sm font-semibold text-ink transition hover:border-ink/28 hover:bg-pearl active:translate-y-px"
              type="submit"
            >
              <Send className="h-4 w-4" aria-hidden strokeWidth={1.75} />
              <LocalizedText id="quick.email">Send email</LocalizedText>
            </button>
            <a
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-ink/12 bg-white px-5 text-sm font-semibold text-ink transition hover:border-ink/28 hover:bg-pearl active:translate-y-px"
              href={emailHref}
            >
              <Mail className="h-4 w-4" aria-hidden strokeWidth={1.75} />
              <LocalizedText id="quick.mailto">Email app</LocalizedText>
            </a>
          </div>
        </form>
      </div>
    </section>
  );
}
