"use client";

import { roles } from "@/lib/portfolio-data";
import SectionHeading from "@/components/sections/SectionHeading";

export default function Roles() {
  return (
    <section id="roles" className="relative bg-[#0a0f0d] py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          micro="WHAT I DO"
          title="Roles & Responsibilities"
          subtitle="Core testing responsibilities and expertise areas"
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {roles.map((role) => (
            <div
              key={role.title}
              className="rounded-2xl border border-[#1c2b24] bg-[#0d1411]/80 p-6 transition hover:-translate-y-1 hover:border-emerald-400/30"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/8 text-xl">
                {role.emoji}
              </span>
              <h3 className="mt-4 text-[15px] font-semibold text-[#e8f0ec]">
                {role.title}
              </h3>
              <ul className="mt-3 space-y-2">
                {role.bullets.map((b, i) => (
                  <li
                    key={i}
                    className="flex gap-2.5 text-[13px] leading-relaxed text-[#a7bfb4]"
                  >
                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-emerald-400/70" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
