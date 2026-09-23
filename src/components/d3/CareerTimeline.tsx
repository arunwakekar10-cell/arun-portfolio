"use client";

import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { experience } from "@/lib/portfolio-data";

interface TimelineRow {
  role: string;
  company: string;
  start: Date;
  end: Date;
  color: string;
  fill: string;
}

/**
 * D3 Gantt-style career timeline — horizontal time axis, animated
 * duration bars, "today" marker and hover tooltips.
 */
export default function CareerTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let tooltip: d3.Selection<HTMLDivElement, unknown, null, unknown>;

    const render = () => {
      const width = container.getBoundingClientRect().width;
      if (width < 10) return;
      const height = 300;
      const margin = { top: 26, right: 24, bottom: 40, left: 24 };
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      d3.select(container).selectAll("*").remove();

      const svg = d3
        .select(container)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("role", "img")
        .attr("aria-label", "Career timeline showing roles from 2022 to present");

      tooltip = d3
        .select(container)
        .append("div")
        .style("position", "absolute")
        .style("visibility", "hidden")
        .style("background", "rgba(13, 20, 17, 0.95)")
        .style("border", "1px solid rgba(52, 211, 153, 0.35)")
        .style("color", "#e8f0ec")
        .style("padding", "8px 12px")
        .style("border-radius", "8px")
        .style("font-size", "12px")
        .style("pointer-events", "none")
        .style("z-index", "20")
        .style("white-space", "nowrap");

      const rows: TimelineRow[] = experience
        .map((e, i) => ({
          role: e.role,
          company: e.company,
          start: new Date(e.start),
          end: new Date(e.end),
          color: i === 0 ? "#34d399" : "#fbbf24",
          fill: i === 0 ? "rgba(52,211,153,0.22)" : "rgba(251,191,36,0.18)",
        }))
        .sort((a, b) => a.start.getTime() - b.start.getTime());

      const xScale = d3
        .scaleTime()
        .domain(d3.extent(rows.flatMap((r) => [r.start, r.end])) as [Date, Date])
        .range([0, innerWidth])
        .nice();

      const g = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // ---- horizontal grid + time axis ----
      g.append("g")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(
          d3
            .axisBottom<Date>(xScale)
            .ticks(width < 560 ? d3.timeYear.every(1) : d3.timeYear.every(1))
            .tickFormat((d) => d3.timeFormat("%Y")(d as Date))
            .tickSize(-innerHeight)
        )
        .call((sel) => {
          sel.select(".domain").attr("stroke", "rgba(148,180,165,0.25)");
          sel
            .selectAll("line")
            .attr("stroke", "rgba(148,180,165,0.12)")
            .attr("stroke-dasharray", "3,4");
          sel
            .selectAll("text")
            .attr("fill", "#8ba39a")
            .style("font-size", "11px");
        });

      // ---- today marker ----
      const today = new Date();
      g.append("line")
        .attr("x1", xScale(today))
        .attr("x2", xScale(today))
        .attr("y1", 0)
        .attr("y2", innerHeight)
        .attr("stroke", "#fb7185")
        .attr("stroke-width", 1.5)
        .attr("stroke-dasharray", "4,3");

      g.append("text")
        .attr("x", xScale(today))
        .attr("y", -8)
        .attr("text-anchor", "middle")
        .attr("fill", "#fb7185")
        .style("font-size", "10px")
        .style("font-weight", 700)
        .style("letter-spacing", "0.08em")
        .text("TODAY");

      // ---- rows ----
      const rowH = 64;
      const barH = 40;

      rows.forEach((r, i) => {
        const y = i * rowH + rowH / 2 - barH / 2;
        const bx = xScale(r.start);
        const bw = Math.max(xScale(r.end) - xScale(r.start), 4);

        const row = g.append("g").style("cursor", "pointer");

        row
          .append("rect")
          .attr("x", bx)
          .attr("y", y)
          .attr("width", bw)
          .attr("height", barH)
          .attr("rx", 10)
          .attr("fill", r.fill)
          .attr("stroke", r.color)
          .attr("stroke-width", 1.2)
          .attr("width", 0) // animate from 0
          .transition()
          .duration(900)
          .delay(i * 180)
          .ease(d3.easeCubicOut)
          .attr("width", bw);

        // duration: inside the bar's right end when the bar reaches the
        // chart's right edge (avoids clipping), otherwise just outside
        const months =
          (r.end.getFullYear() - r.start.getFullYear()) * 12 +
          (r.end.getMonth() - r.start.getMonth());
        const yrs = Math.floor(months / 12);
        const mos = months % 12;
        const dur = yrs > 0 ? `${yrs} yr ${mos} mo` : `${mos} mo`;
        const nearRightEdge = bx + bw > innerWidth - 78;
        const insideOk = nearRightEdge && bw >= 110;
        const durW = dur.length * 6.4;

        // pick the longest label variant that fits, leaving room for the
        // duration when it is rendered inside the bar
        const variants = [`${r.role} · ${r.company}`, r.role, r.company];
        const labelRoom = bw - 30 - (insideOk ? durW + 14 : 0);
        const fitted = variants.find((v) => v.length * 7.2 <= labelRoom) ?? null;

        if (fitted) {
          row
            .append("text")
            .attr("x", bx + 14)
            .attr("y", y + barH / 2 + 1)
            .attr("dy", "0.35em")
            .attr("fill", "#e8f0ec")
            .style("font-size", "12.5px")
            .style("font-weight", 600)
            .style("pointer-events", "none")
            .attr("opacity", 0)
            .text(fitted)
            .transition()
            .duration(500)
            .delay(500 + i * 180)
            .attr("opacity", 1);
        }

        row
          .append("text")
          .attr("x", insideOk ? bx + bw - 12 : bx + bw + 10)
          .attr("y", y + barH / 2)
          .attr("dy", "0.35em")
          .attr("text-anchor", insideOk ? "end" : "start")
          .attr("fill", r.color)
          .style("font-size", "11px")
          .style("font-weight", 600)
          .style("pointer-events", "none")
          .attr("opacity", 0)
          .text(dur)
          .transition()
          .duration(500)
          .delay(700 + i * 180)
          .attr("opacity", 1);

        row
          .on("mouseover", () => {
            tooltip
              .style("visibility", "visible")
              .html(
                `<strong style="color:${r.color}">${r.role}</strong><br/>${r.company}<br/>${d3.timeFormat("%b %Y")(r.start)} → ${d3.timeFormat("%b %Y")(r.end)}`
              );
          })
          .on("mousemove", (event: MouseEvent) => {
            const [px, py] = d3.pointer(event, container);
            tooltip
              .style("top", py - 10 + "px")
              .style("left", px + 16 + "px");
          })
          .on("mouseout", () => tooltip.style("visibility", "hidden"));
      });
    };

    render();
    let t: ReturnType<typeof setTimeout>;
    const observer = new ResizeObserver(() => {
      clearTimeout(t);
      t = setTimeout(render, 150);
    });
    observer.observe(container);
    return () => {
      clearTimeout(t);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[300px] w-full"
      data-testid="career-timeline"
    />
  );
}
