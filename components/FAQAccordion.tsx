"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { LocalizedText } from "@/components/LocalizedText";

export function FAQAccordion({ items }: { items: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="divide-y divide-ink/10 rounded-md border border-ink/10 bg-pearl">
      {items.map((item, index) => {
        const open = openIndex === index;
        return (
          <div key={item.question}>
            <button
              aria-expanded={open}
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-base font-semibold text-ink md:px-7"
              type="button"
              onClick={() => setOpenIndex(open ? -1 : index)}
            >
              <span>
                <LocalizedText id={`faq.${index}.question`}>{item.question}</LocalizedText>
              </span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-turquoise transition ${open ? "rotate-180" : ""}`}
                aria-hidden
              />
            </button>
            {open ? (
              <div className="px-5 pb-6 text-sm leading-7 text-ink-soft md:px-7 md:text-base">
                <LocalizedText id={`faq.${index}.answer`}>{item.answer}</LocalizedText>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
