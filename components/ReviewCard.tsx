import { Star } from "lucide-react";
import type { Review } from "@/data/content";
import { googleMapsUrl } from "@/lib/site";
import { LocalizedText } from "@/components/LocalizedText";
import { translations } from "@/lib/i18n";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-ink/8 bg-pearl/88 p-6 shadow-sm">
      <div className="flex gap-1 text-bronze">
        <span className="sr-only">{review.rating} star review</span>
        {Array.from({ length: review.rating }).map((_, index) => (
          <Star key={index} className="h-4 w-4 fill-current" aria-hidden />
        ))}
      </div>
      <blockquote className="mt-5 flex-1 text-base leading-8 text-ink">
        <span aria-hidden>&quot;</span>
        {review.text}
        <span aria-hidden>&quot;</span>
      </blockquote>
      <figcaption className="mt-6">
        <p className="font-semibold text-ink">{review.name}</p>
        <p className="mt-1 text-sm text-ink-soft">{review.detail}</p>
        <a
          className="mt-4 inline-flex min-h-10 items-center text-sm font-semibold text-ink transition hover:text-turquoise"
          href={googleMapsUrl}
          rel="noreferrer"
          target="_blank"
        >
          <LocalizedText id="review.source">{translations.en["review.source"] ?? ""}</LocalizedText>
        </a>
      </figcaption>
    </article>
  );
}
