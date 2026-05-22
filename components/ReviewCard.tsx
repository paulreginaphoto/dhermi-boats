import { Star } from "lucide-react";
import type { Review } from "@/data/content";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="flex h-full flex-col rounded-md border border-ink/10 bg-pearl p-6 shadow-sm">
      <div className="flex gap-1 text-bronze" aria-label={`${review.rating} star review`}>
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
      </figcaption>
    </article>
  );
}
