"use client";

import SkillsRadar from "@/components/d3/SkillsRadar";
import CareerTimeline from "@/components/d3/CareerTimeline";
import SkillNetwork from "@/components/d3/SkillNetwork";
import TestingDomainsDonut from "@/components/d3/TestingDomainsDonut";
import SectionHeading from "@/components/sections/SectionHeading";

function ChartCard({
  title,
  hint,
  className = "",
  children,
  testId,
}: {
  title: string;
  hint: string;
  className?: string;
  children: React.ReactNode;
  testId: string;
}) {
  return (
    <div
      data-testid={testId}
      className={`rounded-2xl border border-[#1c2b24] bg-[#0d1411]/80 p-5 backdrop-blur-sm transition hover:border-emerald-400/25 sm:p-6 ${className}`}
    >
      <div className="mb-2 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-[15px] font-semibold text-[#e8f0ec]">{title}</h3>
          <p className="mt-0.5 text-xs text-[#8ba39a]">{hint}</p>
        </div>
        <span className="mt-1 flex h-2 w-2 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
      </div>
      {children}
    </div>
  );
}

export default function Dashboard() {
  return (
    <section id="analytics" className="relative bg-[#0a0f0d] py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          micro="LIVE QA ANALYTICS"
          title="Skills & Career, Visualized"
          subtitle="Interactive D3.js visualisations of my QA toolkit, career progression and testing focus — hover, drag and explore."
        />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {/* Row 1: radar + network */}
          <ChartCard
            testId="card-radar"
            title="Skill Proficiency Radar"
            hint="Hover the vertices for exact scores"
            className="lg:col-span-1"
          >
            <SkillsRadar />
          </ChartCard>

          <ChartCard
            testId="card-network"
            title="QA Toolkit Network"
            hint="Drag nodes · scroll to zoom · click-free hover to focus a category"
            className="lg:col-span-2"
          >
            <SkillNetwork />
          </ChartCard>

          {/* Row 2: timeline + donut */}
          <ChartCard
            testId="card-timeline"
            title="Career Timeline"
            hint="Roles from Nov 2022 to present"
            className="lg:col-span-2"
          >
            <CareerTimeline />
          </ChartCard>

          <ChartCard
            testId="card-donut"
            title="Testing Effort Mix"
            hint="Hover slices or legend to explore"
            className="lg:col-span-1"
          >
            <TestingDomainsDonut />
          </ChartCard>
        </div>
      </div>
    </section>
  );
}
