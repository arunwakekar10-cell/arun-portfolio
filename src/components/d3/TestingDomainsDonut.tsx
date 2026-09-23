"use client";

import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { domainDistribution } from "@/lib/portfolio-data";

const COLORS = ["#34d399", "#fbbf24", "#5eead4", "#fb923c", "#fb7185", "#a3e635"];

/**
 * D3 donut chart — QA effort distribution across testing domains.
 * Animated sweep on mount, hover-expand arcs, live center label,
 * and an interactive legend.
 */
export default function TestingDomainsDonut() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const render = () => {
      const width = container.getBoundingClientRect().width;
      if (width < 10) return;
      const height = 300;

      d3.select(container).selectAll("*").remove();

      const svg = d3
        .select(container)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("role", "img")
        .attr("aria-label", "Donut chart of QA effort distribution across testing domains");

      const data = domainDistribution;
      const total = d3.sum(data, (d) => d.value);

      const compact = width < 560;
      const chartW = compact ? width : width * 0.52;
      const chartCenterY = compact ? height * 0.36 : height / 2;
      const R = compact
        ? Math.min(chartW / 2 - 14, height * 0.34)
        : Math.min(chartW, height) / 2 - 26;
      const innerR = R * 0.62;

      const color = d3.scaleOrdinal<string>(COLORS);

      const pie = d3
        .pie<(typeof data)[number]>()
        .value((d) => d.value)
        .sort(null)
        .padAngle(0.03);

      const arcGen = d3
        .arc<d3.PieArcDatum<(typeof data)[number]>>()
        .innerRadius(innerR)
        .outerRadius(R);

      const arcHover = d3
        .arc<d3.PieArcDatum<(typeof data)[number]>>()
        .innerRadius(innerR + 3)
        .outerRadius(R + 10);

      const arcDim = d3
        .arc<d3.PieArcDatum<(typeof data)[number]>>()
        .innerRadius(innerR)
        .outerRadius(R - 4);

      const g = svg
        .append("g")
        .attr("transform", `translate(${chartW / 2},${chartCenterY})`);

      const arcs = pie(data);

      const centerTitle = g
        .append("text")
        .attr("text-anchor", "middle")
        .attr("dy", "-0.2em")
        .attr("fill", "#e8f0ec")
        .style("font-size", "17px")
        .style("font-weight", 700)
        .text("QA Effort");

      const centerSub = g
        .append("text")
        .attr("text-anchor", "middle")
        .attr("dy", "1.35em")
        .attr("fill", "#8ba39a")
        .style("font-size", "11px")
        .text("across domains");

      const paths = g
        .selectAll("path")
        .data(arcs)
        .join("path")
        .attr("fill", (d, i) => color(i.toString()))
        .attr("stroke", "#0d1411")
        .attr("stroke-width", 1.5)
        .style("cursor", "pointer")
        .attr("d", (d) => arcGen({ ...d, endAngle: d.startAngle }) ?? ""); // start collapsed, sweep in below

      // sweep-in animation (attrTween is a transition-only method)
      paths
        .transition()
        .duration(900)
        .delay((d, i) => i * 70)
        .attrTween("d", function (d) {
          const interp = d3.interpolate(
            { startAngle: d.startAngle, endAngle: d.startAngle },
            { startAngle: d.startAngle, endAngle: d.endAngle }
          );
          return (t) => arcGen({ ...d, ...interp(t) }) ?? "";
        });

      const showSlice = (d: d3.PieArcDatum<(typeof data)[number]> | null, i: number | null) => {
        paths
          .transition()
          .duration(200)
          .attr("d", (pd, pi) => {
            if (d && pi === i) return arcHover(pd) ?? "";
            if (d && pi !== i) return arcDim(pd) ?? "";
            return arcGen(pd) ?? "";
          });

        if (d && i !== null) {
          const pct = Math.round((d.data.value / total) * 100);
          centerTitle.text(`${pct}%`).attr("fill", color(i.toString()));
          centerSub.text(d.data.label);
        } else {
          centerTitle.text("QA Effort").attr("fill", "#e8f0ec");
          centerSub.text("across domains");
        }
      };

      paths
        .on("mouseover", (event: MouseEvent, d) => showSlice(d, arcs.indexOf(d)))
        .on("mouseout", () => showSlice(null, null));

      // ---- legend ----
      const legend = svg.append("g");

      const legendRows = legend
        .selectAll("g")
        .data(data)
        .join("g")
        .style("cursor", "pointer")
        .attr("transform", (_, i) => {
          if (compact) {
            // 2-column × 3-row grid below the donut
            const col = i % 2;
            const row = Math.floor(i / 2);
            const colW = width / 2;
            const y = height * 0.72 + row * 28;
            return `translate(${col * colW + 10},${y})`;
          }
          const rowH = Math.min(34, height / (data.length + 1));
          const blockH = rowH * data.length;
          const startY = height / 2 - blockH / 2 + rowH / 2;
          return `translate(${chartW + 8},${startY + i * rowH})`;
        });

      legendRows
        .append("rect")
        .attr("width", 10)
        .attr("height", 10)
        .attr("rx", 3)
        .attr("y", -5)
        .attr("fill", (_, i) => color(i.toString()));

      legendRows
        .append("text")
        .attr("x", 16)
        .attr("dy", "0.32em")
        .attr("fill", "#c7d6cf")
        .style("font-size", compact ? "10.5px" : "12px")
        .text((d) => {
          const max = compact ? 13 : 24;
          return d.label.length > max ? d.label.slice(0, max - 1) + "…" : d.label;
        });

      legendRows
        .append("text")
        // row group already carries the column offset; keep pct at the
        // right edge of each half-width column (compact) / legend area (wide)
        .attr("x", compact ? width / 2 - 24 : Math.min(190, width - chartW - 38))
        .attr("dy", "0.32em")
        .attr("text-anchor", "end")
        .attr("fill", "#8ba39a")
        .style("font-size", compact ? "10.5px" : "12px")
        .style("font-weight", 600)
        .text((d) => `${Math.round((d.value / total) * 100)}%`);

      legendRows
        .on("mouseover", (_, d) => showSlice(arcs[data.indexOf(d)], data.indexOf(d)))
        .on("mouseout", () => showSlice(null, null));
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
      data-testid="testing-donut"
    />
  );
}
