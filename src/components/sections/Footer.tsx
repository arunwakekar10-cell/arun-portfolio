"use client";

import { profile } from "@/lib/portfolio-data";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[#1c2b24] bg-[#050807]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-400/10 text-xs font-bold text-emerald-400">
            {profile.initials}
          </span>
          <span className="text-[13px] text-[#8ba39a]">
            {profile.name} · {profile.title}
          </span>
        </div>
        <p className="text-xs text-[#5f7269]">
          © 2024 All rights reserved. Built with 💚 · Reimagined with D3.js
        </p>
      </div>
    </footer>
  );
}
