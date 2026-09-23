"use client";

import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { radarSkills } from "@/lib/portfolio-data";

/**
 * D3 Radar (spider) chart — QA skill proficiency across 8 dimensions.
 * Follows Pattern A (direct DOM manipulation) with ResizeObserver
 * responsiveness, mount transition, and hover tooltips.
 */
export default function SkillsRadar() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let tooltip: d3.Selection<HTMLDivElement, unknown, null, unknown>;

    const render = () => {
      const width = container.getBoundingClientRect().width;
      if (width < 10) return;
      const height = 400;

      d3.select(container).selectAll("*").remove();

      const svg = d3
        .select(container)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("role", "img")
        .attr(
          "aria-label",
          "Radar chart of QA skill proficiency across eight dimensions"
        );

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

      const data = radarSkills;
      const n = data.length;
      const cx = width / 2;
      const cy = height / 2 + 6;

      const angleFor = (i: number) => (i / n) * 2 * Math.PI;
      const pointAt = (i: number, r: number): [number, number] => [
        Math.sin(angleFor(i)) * r,
        -Math.cos(angleFor(i)) * r,
      ];

      // measure axis-label widths so the radius can shrink to fit them
      const fontSize = Math.min(12, Math.max(10, width / 34));
      const meas = document.createElement("canvas").getContext("2d")!;
      meas.font = `500 ${fontSize}px system-ui, sans-serif`;
      const labelWs = data.map((d) => meas.measureText(d.axis).width);

      let R = Math.min(width, height) / 2 - 52;
      const maxHalfExtent = () =>
        Math.max(
          ...data.map((_, i) => {
            const s = Math.abs(Math.sin(angleFor(i)));
            return s * (R + 20) + (s > 0.18 ? labelWs[i] : labelWs[i] / 2);
          })
        );
      while (maxHalfExtent() > width / 2 - 6 && R > 50) R -= 4;

      const g = svg
        .append("g")
        .attr("transform", `translate(${cx},${cy})`)
        .attr("opacity", 0);

      // ---- grid rings ----
      const ringLevels = [0.25, 0.5, 0.75, 1];
      ringLevels.forEach((lvl) => {
        const pts = data
          .map((_, i) => pointAt(i, R * lvl).join(","))
          .join(" ");
        g.append("polygon")
          .attr("points", pts)
          .attr("fill", lvl === 1 ? "rgba(52,211,153,0.04)" : "none")
          .attr("stroke", "rgba(148,180,165,0.18)")
          .attr("stroke-width", 1);
      });

      // ---- axis spokes ----
      data.forEach((d, i) => {
        const [x, y] = pointAt(i, R);
        g.append("line")
          .attr("x1", 0)
          .attr("y1", 0)
          .attr("x2", x)
          .attr("y2", y)
          .attr("stroke", "rgba(148,180,165,0.18)")
          .attr("stroke-width", 1);
      });

      // ---- axis labels ----
      data.forEach((d, i) => {
        const [x, y] = pointAt(i, R + 20);
        const sin = Math.sin(angleFor(i));
        const anchor: "start" | "middle" | "end" =
          Math.abs(sin) < 0.18 ? "middle" : sin > 0 ? "start" : "end";
        g.append("text")
          .attr("x", x)
          .attr("y", y)
          .attr("dy", Math.cos(angleFor(i)) > 0.6 ? "0.2em" : "0.35em")
          .attr("text-anchor", anchor)
          .attr("fill", "#a7bfb4")
          .style("font-size", Math.min(12, Math.max(9.5, width / 34)) + "px")
          .style("font-weight", 500)
          .text(d.axis);
      });

      // ---- radial tick labels ----
      [25, 50, 75, 100].forEach((v, idx) => {
        g.append("text")
          .attr("x", 6)
          .attr("y", -R * ((idx + 1) / 4) + 3)
          .attr("fill", "rgba(148,180,165,0.5)")
          .style("font-size", "9px")
          .text(v);
      });

      // ---- data polygon ----
      const lineGen = d3
        .lineRadial<(typeof data)[number]>()
        .angle((_, i) => angleFor(i))
        .radius((d) => (d.value / 100) * R)
        .curve(d3.curveCardinalClosed.tension(0.82));

      const path = g
        .append("path")
        .datum(data)
        .attr("d", lineGen)
        .attr("fill", "rgba(52,211,153,0.18)")
        .attr("stroke", "#34d399")
        .attr("stroke-width", 2)
        .attr("stroke-linejoin", "round");

      // ---- vertex dots + tooltip ----
      data.forEach((d, i) => {
        const [x, y] = pointAt(i, (d.value / 100) * R);
        g.append("circle")
          .attr("cx", x)
          .attr("cy", y)
          .attr("r", 4.5)
          .attr("fill", "#0d1411")
          .attr("stroke", "#34d399")
          .attr("stroke-width", 2)
          .style("cursor", "pointer")
          .on("mouseover", function () {
            d3.select(this)
              .transition()
              .duration(150)
              .attr("r", 6.5)
              .attr("fill", "#34d399");
            tooltip
              .style("visibility", "visible")
              .html(
                `<strong style="color:#34d399">${d.axis}</strong><br/>Proficiency: ${d.value}/100`
              );
          })
          .on("mousemove", (event: MouseEvent) => {
            const [px, py] = d3.pointer(event, container);
            tooltip
              .style("top", py - 14 + "px")
              .style("left", px + 14 + "px");
          })
          .on("mouseout", function () {
            d3.select(this)
              .transition()
              .duration(150)
              .attr("r", 4.5)
              .attr("fill", "#0d1411");
            tooltip.style("visibility", "hidden");
          });
      });

      // ---- mount animation (single transition: opacity + scale) ----
      g.attr("opacity", 0)
        .attr("transform", `translate(${cx},${cy}) scale(0.55)`)
        .transition()
        .duration(700)
        .ease(d3.easeCubicOut)
        .attr("opacity", 1)
        .attr("transform", `translate(${cx},${cy}) scale(1)`);

      // subtle breathing glow on the polygon
      path
        .transition()
        .delay(800)
        .duration(2200)
        .attr("fill", "rgba(52,211,153,0.26)")
        .transition()
        .duration(2200)
        .attr("fill", "rgba(52,211,153,0.18)")
        .on("end", function repeat() {
          d3.select(this)
            .transition()
            .duration(2200)
            .attr("fill", "rgba(52,211,153,0.26)")
            .transition()
            .duration(2200)
            .attr("fill", "rgba(52,211,153,0.18)")
            .on("end", repeat);
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
      className="relative h-[400px] w-full"
      data-testid="skills-radar"
    />
  );
}
