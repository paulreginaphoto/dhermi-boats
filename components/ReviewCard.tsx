import { Star } from "lucide-react";
import { LocalizedText } from "@/components/LocalizedText";
import type { Review } from "@/data/content";
import { googleMapsUrl } from "@/lib/site";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="flex h-full flex-col rounded-md border border-ink/10 bg-pearl p-6 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="flex gap-1 text-bronze" aria-label={`${review.rating} star Google review`}>
          {Array.from({ length: review.rating }).map((_, index) => (
            <Star key={index} className="h-4 w-4 fill-current" aria-hidden />
          ))}
        </div>
        <a
          className="text-xs font-bold uppercase tracking-[0.16em] text-bronze transition hover:text-ink"
          href={googleMapsUrl}
          rel="noreferrer"
          target="_blank"
        >
          Google
        </a>
      </div>
      <blockquote className="mt-5 flex-1 text-base leading-8 text-ink">
        <span aria-hidden>&quot;</span>
        {review.text}
        <span aria-hidden>&quot;</span>
      </blockquote>
      <figcaption className="mt-6">
        <p className="font-semibold text-ink">{review.name}</p>
        <p className="mt-1 text-sm text-ink-soft">
          <LocalizedText id={review.detailKey}>{review.detail}</LocalizedText>
        </p>
      </figcaption>
    </article>
  );
}
