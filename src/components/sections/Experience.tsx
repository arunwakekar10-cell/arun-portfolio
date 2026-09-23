"use client";

import { experience } from "@/lib/portfolio-data";
import SectionHeading from "@/components/sections/SectionHeading";
import { MapPin, CalendarDays, Building2 } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="relative bg-[#070b09] py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          micro="CAREER"
          title="Professional Experience"
          subtitle="Building expertise in quality assurance across diverse domains"
        />

        <div className="relative">
          {/* vertical rail */}
          <div className="absolute left-[19px] top-2 hidden h-[calc(100%-16px)] w-px bg-gradient-to-b from-emerald-400/50 via-[#1c2b24] to-transparent sm:block" />

          <div className="space-y-8">
            {experience.map((job, idx) => (
              <div key={job.company} className="relative sm:pl-16">
                {/* timeline node */}
                <span className="absolute left-0 top-6 hidden sm:block">
                  <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-emerald-400/40 bg-[#0d1411]">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${idx === 0 ? "bg-emerald-400" : "bg-amber-400"}`}
                    />
                    {idx === 0 && (
                      <span className="absolute inset-0 animate-ping rounded-full border border-emerald-400/40" />
                    )}
                  </span>
                </span>

                <article className="rounded-2xl border border-[#1c2b24] bg-[#0d1411]/80 p-6 transition hover:border-emerald-400/30 sm:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold text-[#e8f0ec] sm:text-xl">
                        {job.role}
                      </h3>
                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-[#a7bfb4]">
                        <span className="flex items-center gap-1.5">
                          <Building2 className="h-3.5 w-3.5 text-emerald-400" />
                          {job.company}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-emerald-400" />
                          {job.location}
                        </span>
                      </div>
                    </div>
                    <span className="flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/8 px-3.5 py-1.5 text-xs font-semibold text-emerald-300">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {job.period}
                    </span>
                  </div>

                  <ul className="mt-5 space-y-2.5">
                    {job.bullets.map((b, i) => (
                      <li key={i} className="flex gap-3 text-[13.5px] leading-relaxed text-[#a7bfb4]">
                        <span
                          className={`mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full ${idx === 0 ? "bg-emerald-400/80" : "bg-amber-400/80"}`}
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
