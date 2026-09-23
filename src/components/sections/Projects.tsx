"use client";

import { projects } from "@/lib/portfolio-data";
import SectionHeading from "@/components/sections/SectionHeading";
import { Smartphone, Globe, Monitor } from "lucide-react";

const platformIcon = (p: string) => {
  if (p === "Android" || p === "iOS") return <Smartphone className="h-3 w-3" />;
  if (p === "Web") return <Globe className="h-3 w-3" />;
  return <Monitor className="h-3 w-3" />;
};

export default function Projects() {
  return (
    <section id="projects" className="relative bg-[#070b09] py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          micro="PORTFOLIO"
          title="Featured Projects"
          subtitle="Key projects showcasing testing expertise across diverse domains"
        />

        <div className="space-y-8">
          {projects.map((proj, idx) => (
            <article
              key={proj.title}
              className={`overflow-hidden rounded-2xl border border-[#1c2b24] bg-[#0d1411]/80 transition hover:border-emerald-400/30 ${
                idx % 2 === 0 ? "lg:border-l-4 lg:border-l-emerald-400/60" : "lg:border-l-4 lg:border-l-amber-400/60"
              }`}
            >
              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span
                    className={`text-[11px] font-bold tracking-[0.25em] ${
                      idx === 0 ? "text-emerald-400" : "text-amber-400"
                    }`}
                  >
                    {proj.domain}
                  </span>
                  <div className="flex gap-2">
                    {proj.platforms.map((p) => (
                      <span
                        key={p}
                        className="flex items-center gap-1.5 rounded-full border border-[#1c2b24] bg-[#111a16] px-3 py-1 text-[11px] font-medium text-[#a7bfb4]"
                      >
                        {platformIcon(p)}
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                <h3 className="mt-3 text-xl font-bold text-[#e8f0ec] sm:text-2xl">
                  {proj.title}
                </h3>
                <p className="mt-3 max-w-4xl text-sm leading-relaxed text-[#a7bfb4]">
                  {proj.desc}
                </p>

                <h4 className="mt-7 text-[11px] font-bold tracking-[0.25em] text-[#8ba39a]">
                  {proj.highlightsTitle}
                </h4>
                <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {proj.highlights.map((h) => (
                    <div
                      key={h.name}
                      className="rounded-xl border border-[#1c2b24] bg-[#111a16] p-3.5 transition hover:border-emerald-400/25"
                    >
                      <div className="flex items-center gap-2 text-[13px] font-semibold text-[#e8f0ec]">
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${idx === 0 ? "bg-emerald-400" : "bg-amber-400"}`}
                        />
                        {h.name}
                      </div>
                      <p className="mt-1 pl-3.5 text-xs leading-relaxed text-[#8ba39a]">
                        {h.desc}
                      </p>
                    </div>
                  ))}
                </div>

                <h4 className="mt-7 text-[11px] font-bold tracking-[0.25em] text-[#8ba39a]">
                  TECHNOLOGIES USED
                </h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {proj.tech.map((t) => (
                    <span
                      key={t}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                        idx === 0
                          ? "border-emerald-400/25 bg-emerald-400/8 text-emerald-300 hover:bg-emerald-400/15"
                          : "border-amber-400/25 bg-amber-400/8 text-amber-300 hover:bg-amber-400/15"
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
