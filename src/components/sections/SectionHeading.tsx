"use client";

export default function SectionHeading({
  micro,
  title,
  subtitle,
  align = "center",
}: {
  micro: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  const alignCls = align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <div className={`mb-12 flex flex-col ${alignCls}`}>
      <span className="mb-3 text-[11px] font-semibold tracking-[0.35em] text-emerald-400">
        {micro}
      </span>
      <h2 className="text-3xl font-bold tracking-tight text-[#e8f0ec] sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#8ba39a] sm:text-[15px]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
