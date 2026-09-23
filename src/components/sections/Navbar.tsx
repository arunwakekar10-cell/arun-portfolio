"use client";

import { useEffect, useState } from "react";
import { navLinks, profile } from "@/lib/portfolio-data";
import { FileDown, Download } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-emerald-400/10 bg-[#070b09]/85 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <button
          onClick={() => go("home")}
          className="flex shrink-0 items-center gap-3"
          aria-label="Go to home"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-400/10 text-sm font-bold text-emerald-400">
            {profile.initials}
          </span>
          <span className="hidden flex-col whitespace-nowrap leading-tight sm:flex">
            <span className="text-sm font-semibold text-[#e8f0ec]">{profile.name}</span>
            <span className="text-[11px] text-[#8ba39a]">{profile.title}</span>
          </span>
        </button>

        {/* desktop nav */}
        <ul className="hidden shrink-0 items-center gap-0.5 xl:flex">
          {navLinks.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => go(l.id)}
                className="whitespace-nowrap rounded-md px-2.5 py-2 text-[13px] text-[#a7bfb4] transition-colors hover:bg-emerald-400/10 hover:text-emerald-300"
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-3">
          <a
            href="/Arun_Wakekar_Resume.pdf"
            download="Arun_Wakekar_Resume.pdf"
            className="hidden items-center gap-1.5 whitespace-nowrap rounded-lg border border-amber-400/35 bg-amber-400/5 px-3.5 py-2 text-[13px] font-semibold text-amber-300 transition hover:border-amber-400/60 hover:bg-amber-400/15 sm:flex"
          >
            <FileDown className="h-4 w-4" />
            Resume
          </a>

          <button
            onClick={() => go("contact")}
            className="hidden whitespace-nowrap rounded-lg bg-emerald-400 px-4 py-2 text-[13px] font-semibold text-[#06251a] transition hover:bg-emerald-300 sm:block"
          >
            Hire Me
          </button>

          {/* burger — shown below xl, where the full link row would crowd */}
          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-400/20 text-emerald-300 xl:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <div className="space-y-1.5">
              <span className={`block h-0.5 w-5 bg-current transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-5 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-5 bg-current transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* mobile menu */}
      {open && (
        <div className="border-t border-emerald-400/10 bg-[#070b09]/95 backdrop-blur-md xl:hidden">
          <div className="mx-auto max-w-6xl px-4 pt-3">
            <a
              href="/Arun_Wakekar_Resume.pdf"
              download="Arun_Wakekar_Resume.pdf"
              className="flex items-center justify-center gap-2 rounded-lg border border-amber-400/35 bg-amber-400/10 px-3 py-2.5 text-sm font-semibold text-amber-300"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </a>
          </div>
          <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-1 px-4 py-4">
            {navLinks.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => go(l.id)}
                  className="w-full rounded-lg px-3 py-2.5 text-left text-sm text-[#c7d6cf] transition hover:bg-emerald-400/10 hover:text-emerald-300"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
