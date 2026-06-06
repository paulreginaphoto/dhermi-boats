export type BookingDateLocale = "en" | "fr" | "sq";

type ParsedInputDate = {
  day: number;
  month: number;
  year: number;
};

export const englishBookingMonthNames = [
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
];

export const frenchBookingMonthNames = [
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
];

export const albanianBookingMonthNames = [
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
];

export const bookingMonthNamesByLocale: Record<BookingDateLocale, string[]> = {
  en: englishBookingMonthNames,
  fr: frenchBookingMonthNames,
  sq: albanianBookingMonthNames
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

export function formatDateShort(value: string, locale: BookingDateLocale = "fr") {
  const parsed = parseInputDate(value);
  if (!parsed) return value;

  const monthNames = bookingMonthNamesByLocale[locale] ?? bookingMonthNamesByLocale.fr;
  const monthName = monthNames[parsed.month - 1];

  return `${parsed.day} ${monthName} ${parsed.year}`;
}

export function formatDateLong(value: string, locale: BookingDateLocale = "fr") {
  return formatDateShort(value, locale);
}

export function formatBookingDate(value: string, locale: BookingDateLocale = "fr") {
  return formatDateLong(value, locale);
}
