"use client";

import { skillCategories } from "@/lib/portfolio-data";
import SectionHeading from "@/components/sections/SectionHeading";

export default function Skills() {
  return (
    <section id="skills" className="relative bg-[#0a0f0d] py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          micro="COMPREHENSIVE TOOLKIT"
          title="Key Skills & Tools"
          subtitle="End-to-end quality assurance expertise with modern tools and frameworks"
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((cat) => (
            <div
              key={cat.title}
              className="group rounded-2xl border border-[#1c2b24] bg-[#0d1411]/80 p-6 transition hover:-translate-y-1 hover:border-emerald-400/30"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/8 text-xl transition group-hover:scale-110">
                  {cat.emoji}
                </span>
                <h3 className="text-[15px] font-semibold text-[#e8f0ec]">
                  {cat.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-[#1c2b24] bg-[#111a16] px-2.5 py-1.5 text-xs text-[#a7bfb4] transition hover:border-emerald-400/35 hover:text-emerald-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
