"use client";

import { education, certifications } from "@/lib/portfolio-data";
import SectionHeading from "@/components/sections/SectionHeading";
import { GraduationCap, BadgeCheck } from "lucide-react";

export default function Education() {
  return (
    <section id="education" className="relative bg-[#070b09] py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          micro="FOUNDATION"
          title="Education & Certifications"
          subtitle="Academic foundation and professional certifications"
        />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
          {/* degree card */}
          <div className="rounded-2xl border border-emerald-400/25 bg-gradient-to-br from-emerald-400/10 to-transparent p-7 lg:col-span-2">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-400/30 bg-emerald-400/10">
              <GraduationCap className="h-6 w-6 text-emerald-400" />
            </span>
            <h3 className="mt-5 text-xl font-bold text-[#e8f0ec]">
              {education.degree}
            </h3>
            <p className="mt-2 text-sm font-medium text-emerald-300">
              {education.university}
            </p>
            <p className="mt-1 text-[13px] leading-relaxed text-[#8ba39a]">
              {education.institute}
            </p>
            <span className="mt-5 inline-block rounded-full border border-emerald-400/25 bg-emerald-400/8 px-3.5 py-1.5 text-xs font-semibold text-emerald-300">
              {education.year}
            </span>
          </div>

          {/* certifications grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-3">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="flex flex-col rounded-2xl border border-[#1c2b24] bg-[#0d1411]/80 p-5 transition hover:border-emerald-400/30"
              >
                <div className="flex items-start gap-3">
                  <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
                  <div>
                    <h4 className="text-[14px] font-semibold leading-snug text-[#e8f0ec]">
                      {cert.name}
                    </h4>
                    <p className="mt-0.5 text-xs font-medium text-amber-400/90">
                      {cert.issuer}
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-[#8ba39a]">
                  {cert.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
