"use client";

import { aiProcess, aiProjects } from "@/lib/portfolio-data";
import SectionHeading from "@/components/sections/SectionHeading";
import { Bot, ExternalLink } from "lucide-react";

const statusStyle: Record<string, string> = {
  LIVE: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300",
  "IN PROGRESS": "border-amber-400/40 bg-amber-400/10 text-amber-300",
  CONCEPT: "border-rose-400/40 bg-rose-400/10 text-rose-300",
};

export default function AiDev() {
  return (
    <section id="aidev" className="relative bg-[#0a0f0d] py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          micro="BEYOND TESTING"
          title="✦ AI-Powered Development"
          subtitle="QA expertise meets Generative AI — building real tools and apps with AI pair-programming assistants."
        />

        <p className="mx-auto -mt-6 mb-12 max-w-3xl text-center text-sm leading-relaxed text-[#a7bfb4]">
          Certified in Generative AI (Outskill), I use AI assistants as pair
          programmers to design, build, and ship development projects — bringing
          a tester&apos;s eye for quality into everything I create.
        </p>

        {/* process */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {aiProcess.map((step) => (
            <div
              key={step.num}
              className="group relative overflow-hidden rounded-2xl border border-[#1c2b24] bg-[#0d1411]/80 p-6 transition hover:-translate-y-1 hover:border-emerald-400/30"
            >
              <span className="absolute right-4 top-3 text-4xl font-extrabold text-[#1c2b24] transition group-hover:text-emerald-400/25">
                {step.num}
              </span>
              <span className="text-2xl">{step.emoji}</span>
              <h3 className="mt-3 text-[15px] font-bold text-[#e8f0ec]">
                {step.title}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-[#8ba39a]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* AI projects */}
        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {aiProjects.map((p) => (
            <div
              key={p.title}
              className="flex flex-col rounded-2xl border border-[#1c2b24] bg-[#0d1411]/80 p-6 transition hover:border-emerald-400/30"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{p.emoji}</span>
                <span
                  className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold tracking-wider ${statusStyle[p.status] ?? statusStyle.CONCEPT}`}
                >
                  {p.status === "LIVE" && (
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                      <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    </span>
                  )}
                  <Bot className="h-3 w-3" />
                  {p.status}
                </span>
              </div>

              <h3 className="mt-4 text-[16px] font-bold leading-snug text-[#e8f0ec]">
                {p.title}
              </h3>
              <p className="mt-1 text-xs text-emerald-300/90">{p.subtitle}</p>
              <p className="mt-3 flex-1 text-[13px] leading-relaxed text-[#8ba39a]">
                {p.desc}
              </p>

              <div className="mt-5">
                <h4 className="text-[10px] font-bold tracking-[0.22em] text-[#8ba39a]">
                  BUILT WITH AI
                </h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {p.builtWith.map((b) => (
                    <span
                      key={b}
                      className="rounded-lg border border-[#1c2b24] bg-[#111a16] px-2.5 py-1 text-[11px] text-[#c7d6cf]"
                    >
                      🤖 {b}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-[10px] font-bold tracking-[0.22em] text-[#8ba39a]">
                  TECH STACK
                </h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-lg border border-emerald-400/20 bg-emerald-400/6 px-2.5 py-1 text-[11px] font-medium text-emerald-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {p.url && (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link mt-5 flex items-center justify-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/5 px-4 py-2.5 text-[13px] font-semibold text-emerald-300 transition hover:border-emerald-400/60 hover:bg-emerald-400/15 hover:text-emerald-200"
                >
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                    <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  Visit Live Site
                  <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
