import { ChevronDown, HelpCircle } from "lucide-react";
import { LocalizedText } from "@/components/LocalizedText";

export function FAQAccordion({
  items,
  translationPrefix = "faq"
}: {
  items: { question: string; answer: string; translationIndex?: number }[];
  translationPrefix?: string;
}) {
  return (
    <div className="divide-y divide-ink/10 rounded-md border border-ink/10 bg-pearl">
      {items.map((item, index) => {
        const translationIndex = item.translationIndex ?? index;
        return (
          <details key={item.question} className="group">
            <summary className="flex w-full cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-left text-base font-semibold text-ink md:px-7 [&::-webkit-details-marker]:hidden">
              <span className="flex items-start gap-3">
                <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-turquoise" aria-hidden />
                <LocalizedText id={`${translationPrefix}.${translationIndex}.question`}>{item.question}</LocalizedText>
              </span>
              <ChevronDown className="h-5 w-5 shrink-0 text-turquoise transition group-open:rotate-180" aria-hidden />
            </summary>
            <div className="px-5 pb-6 text-sm leading-7 text-ink-soft md:px-7 md:text-base">
              <LocalizedText id={`${translationPrefix}.${translationIndex}.answer`}>{item.answer}</LocalizedText>
            </div>
          </details>
        );
      })}
    </div>
  );
}
