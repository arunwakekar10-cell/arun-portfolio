import { Plus } from "lucide-react";
import SectionHeading from "@/components/sections/SectionHeading";
import { faqs } from "@/lib/faq-data";

// ============================================================
// FAQ section — the human-visible half of the AEO work.
// Native <details>/<summary> so the answers are real crawlable
// HTML with zero client JS; the same content ships as FAQPage
// JSON-LD via StructuredData.
// ============================================================

export default function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative mx-auto w-full max-w-4xl px-4 py-20 sm:px-6"
    >
      <div id="faq-heading">
        <SectionHeading
          micro="QUICK ANSWERS"
          title="Frequently Asked Questions"
          subtitle="Short, factual answers about Arun Wakekar's QA automation experience, certifications, projects and availability."
        />
      </div>

      <div className="grid gap-3">
        {faqs.map((faq, index) => (
          <details
            key={faq.question}
            className="group rounded-xl border border-emerald-400/15 bg-white/[0.02] px-5 py-4 transition-colors duration-300 open:border-emerald-400/30 open:bg-emerald-400/[0.04]"
          >
            <summary className="flex cursor-pointer list-none select-none items-center gap-4 [&::-webkit-details-marker]:hidden">
              <span className="font-mono text-xs font-semibold text-emerald-400/70">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 text-[15px] font-semibold text-[#e8f0ec] sm:text-base">
                {faq.question}
              </span>
              <Plus
                className="h-4 w-4 shrink-0 text-emerald-400 transition-transform duration-300 group-open:rotate-45"
                aria-hidden="true"
              />
            </summary>
            <p className="mt-3 pl-9 text-sm leading-relaxed text-[#8ba39a] sm:text-[15px]">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
