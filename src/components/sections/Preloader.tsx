"use client";

import { useEffect, useState } from "react";

const PHASES = [
  "Initializing test suites",
  "Loading D3 visualisations",
  "Running smoke tests",
  "Validating build artifacts",
  "Deploying portfolio",
];

const RING_R = 46;
const RING_C = 2 * Math.PI * RING_R;

/**
 * Professional QA-themed preloader: animated progress ring with AW
 * monogram, count-up percentage, and rotating terminal-style status
 * lines. Fades out smoothly once the "deployment" completes.
 */
export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);
  const [fading, setFading] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const DURATION = reduced ? 350 : 1900;
    const start = performance.now();
    let raf = 0;

    document.body.style.overflow = "hidden";

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      const pct = Math.round(eased * 100);
      setProgress(pct);
      setPhase(Math.min(PHASES.length - 1, Math.floor(eased * PHASES.length)));

      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        window.setTimeout(() => setFading(true), 280);
        window.setTimeout(() => {
          setGone(true);
          document.body.style.overflow = "";
        }, 950);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, []);

  if (gone) return null;

  return (
    <div
      aria-hidden={fading}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#070b09] transition-all duration-700 ${
        fading ? "pointer-events-none scale-[1.04] opacity-0" : "opacity-100"
      }`}
    >
      {/* ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[100px]" />

      {/* progress ring + monogram */}
      <div className="relative">
        <svg width="120" height="120" viewBox="0 0 120 120" className="-rotate-90">
          <circle
            cx="60"
            cy="60"
            r={RING_R}
            fill="none"
            stroke="#1c2b24"
            strokeWidth="3"
          />
          <circle
            cx="60"
            cy="60"
            r={RING_R}
            fill="none"
            stroke="#34d399"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={RING_C}
            strokeDashoffset={RING_C * (1 - progress / 100)}
            style={{ filter: "drop-shadow(0 0 6px rgba(52,211,153,0.55))" }}
          />
          {/* orbiting dot */}
          <circle
            cx="60"
            cy="14"
            r="3.5"
            fill="#34d399"
            className="animate-spin"
            style={{
              transformOrigin: "60px 60px",
              animationDuration: "3s",
              filter: "drop-shadow(0 0 5px rgba(52,211,153,0.9))",
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-extrabold tracking-tight text-[#e8f0ec]">
            AW
          </span>
          <span className="mt-0.5 text-[9px] font-semibold tracking-[0.3em] text-emerald-400">
            QA
          </span>
        </div>
      </div>

      {/* name */}
      <p className="mt-6 text-sm font-semibold tracking-[0.35em] text-[#c7d6cf]">
        ARUN WAKEKAR
      </p>
      <p className="mt-1.5 text-[10px] tracking-[0.3em] text-[#8ba39a]">
        QUALITY ANALYST
      </p>

      {/* progress bar */}
      <div className="mt-7 h-1 w-56 overflow-hidden rounded-full bg-[#1c2b24]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-300 transition-[width] duration-100 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* percent + terminal status */}
      <div className="mt-4 flex items-center gap-3">
        <span className="text-xl font-bold tabular-nums text-emerald-400">
          {progress}%
        </span>
        <span className="h-4 w-px bg-[#1c2b24]" />
        <span className="font-mono text-xs text-[#8ba39a]">
          <span className="text-emerald-400">&gt;</span> {PHASES[phase]}
          <span className="animate-pulse">_</span>
        </span>
      </div>

      {/* step dots */}
      <div className="mt-6 flex items-center gap-2">
        {PHASES.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i < phase
                ? "w-4 bg-emerald-400/80"
                : i === phase
                  ? "w-6 bg-emerald-400"
                  : "w-1.5 bg-[#1c2b24]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
