export type BookingDateLocale = "en" | "fr" | "sq";

type ParsedInputDate = {
  day: number;
  month: number;
  year: number;
};

const monthNames: Record<BookingDateLocale, readonly string[]> = {
  en: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ],
  fr: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre"
  ],
  sq: [
    "Janar",
    "Shkurt",
    "Mars",
    "Prill",
    "Maj",
    "Qershor",
    "Korrik",
    "Gusht",
    "Shtator",
    "Tetor",
    "Nëntor",
    "Dhjetor"
  ]
};

function parseInputDate(value: string): ParsedInputDate | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null;
  }

  return { day, month, year };
}

export function formatDateShort(value: string) {
  const parsed = parseInputDate(value);
  if (!parsed) return value;

  const day = String(parsed.day).padStart(2, "0");
  const month = String(parsed.month).padStart(2, "0");

  return `${day} - ${month} - ${parsed.year}`;
}

export function formatDateLong(value: string, locale: BookingDateLocale = "fr") {
  const parsed = parseInputDate(value);
  if (!parsed) return value;

  return `${parsed.day} ${monthNames[locale][parsed.month - 1]} ${parsed.year}`;
}

export function formatBookingDate(value: string, locale: BookingDateLocale = "fr") {
  return formatDateLong(value, locale);
}
