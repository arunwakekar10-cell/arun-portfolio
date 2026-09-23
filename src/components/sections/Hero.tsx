"use client";

import { profile, stats } from "@/lib/portfolio-data";
import ParticleNetwork from "@/components/d3/ParticleNetwork";
import AnimatedNumber from "@/components/d3/AnimatedNumber";
import ToolsOrbit from "@/components/d3/ToolsOrbit";
import { Phone, Linkedin, Github, ArrowDown, Download } from "lucide-react";

export default function Hero() {
  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col overflow-hidden bg-[#070b09]"
    >
      {/* ambient D3 particle network */}
      <ParticleNetwork />

      {/* glow orbs */}
      <div className="pointer-events-none absolute -left-32 top-24 h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 bottom-40 h-80 w-80 rounded-full bg-amber-500/8 blur-[110px]" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-4 pb-16 pt-28 text-center sm:px-6">
        <div className="mb-6 flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/5 px-4 py-1.5 text-xs text-emerald-300">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          {profile.availability}
        </div>

        <p className="mb-4 text-sm tracking-[0.3em] text-emerald-400/90">HI, I&apos;M</p>
        <h1 className="bg-gradient-to-br from-[#e8f0ec] via-[#c7d6cf] to-emerald-400 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-6xl md:text-7xl">
          {profile.name}
        </h1>
        <p className="mt-4 text-sm font-semibold tracking-[0.45em] text-amber-400/90 sm:text-base">
          {profile.title.toUpperCase()}
        </p>

        <p className="mt-8 max-w-2xl text-balance text-[15px] leading-relaxed text-[#a7bfb4] sm:text-base">
          {profile.tagline}
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => go("contact")}
            className="rounded-xl bg-emerald-400 px-6 py-3 text-sm font-semibold text-[#06251a] shadow-lg shadow-emerald-400/20 transition hover:-translate-y-0.5 hover:bg-emerald-300"
          >
            Contact Me
          </button>
          <a
            href="/Arun_Wakekar_Resume.pdf"
            download="Arun_Wakekar_Resume.pdf"
            className="flex items-center gap-2 rounded-xl border border-amber-400/40 bg-amber-400/10 px-6 py-3 text-sm font-semibold text-amber-300 shadow-lg shadow-amber-400/10 transition hover:-translate-y-0.5 hover:border-amber-400/60 hover:bg-amber-400/20"
          >
            <Download className="h-4 w-4" />
            Download Resume
          </a>
          <button
            onClick={() => go("analytics")}
            className="flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/5 px-6 py-3 text-sm font-semibold text-emerald-300 transition hover:-translate-y-0.5 hover:bg-emerald-400/15"
          >
            View Analytics <ArrowDown className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 text-[13px]">
          <a
            href={profile.phoneHref}
            className="flex items-center gap-2 rounded-full border border-[#1c2b24] bg-[#0d1411]/80 px-4 py-2 text-[#c7d6cf] transition hover:border-emerald-400/40 hover:text-emerald-300"
          >
            <Phone className="h-3.5 w-3.5 text-emerald-400" /> {profile.phone}
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-[#1c2b24] bg-[#0d1411]/80 px-4 py-2 text-[#c7d6cf] transition hover:border-emerald-400/40 hover:text-emerald-300"
          >
            <Linkedin className="h-3.5 w-3.5 text-emerald-400" /> LinkedIn
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-[#1c2b24] bg-[#0d1411]/80 px-4 py-2 text-[#c7d6cf] transition hover:border-emerald-400/40 hover:text-emerald-300"
          >
            <Github className="h-3.5 w-3.5 text-emerald-400" /> GitHub
          </a>
        </div>

        {/* stats */}
        <div className="mt-14 grid w-full max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-[#1c2b24] bg-[#0d1411]/70 px-4 py-5 backdrop-blur-sm transition hover:border-emerald-400/35"
            >
              <div className="text-3xl font-extrabold text-emerald-400 sm:text-4xl">
                <AnimatedNumber value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1.5 text-[11px] uppercase tracking-wider text-[#8ba39a] sm:text-xs">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* tools orbital system — cards ride tilted rings around a glowing core */}
      <div className="relative z-10 border-t border-[#1c2b24] bg-[#0d1411]/60 backdrop-blur-sm">
        <ToolsOrbit />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-1.5 py-5 text-[10px] tracking-[0.3em] text-[#8ba39a]">
        SCROLL TO EXPLORE
        <ArrowDown className="h-4 w-4 animate-bounce text-emerald-400" />
      </div>
    </section>
  );
}
