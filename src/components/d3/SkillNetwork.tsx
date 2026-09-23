"use client";

import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { networkData } from "@/lib/portfolio-data";
import { Plus, Minus, RotateCcw } from "lucide-react";

interface NetNode extends d3.SimulationNodeDatum {
  id: string;
  type: "hub" | "leaf";
  category: string;
  color: string;
}
type NetLink = d3.SimulationLinkDatum<NetNode>;

/**
 * D3 force-directed skill network — category hubs with orbiting
 * skill nodes. Scroll (wheel) zooms in/out, background drag pans,
 * pinch zooms on touch, drag moves nodes, hover highlights a
 * category, on-screen controls zoom in/out/reset. Re-simulates on
 * container resize.
 */
export default function SkillNetwork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const d3Ref = useRef<HTMLDivElement>(null); // d3 owns this node only
  const simulationRef = useRef<d3.Simulation<NetNode, undefined> | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const zoomRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);

  const zoomBy = (factor: number) => {
    if (!svgRef.current || !zoomRef.current) return;
    d3.select(svgRef.current)
      .transition()
      .duration(320)
      .call(zoomRef.current.scaleBy, factor);
  };

  const resetZoom = () => {
    if (!svgRef.current || !zoomRef.current) return;
    d3.select(svgRef.current)
      .transition()
      .duration(450)
      .call(zoomRef.current.transform, d3.zoomIdentity);
  };

  useEffect(() => {
    const container = d3Ref.current;
    if (!container) return;

    let stopped = false;
    let tooltip: d3.Selection<HTMLDivElement, unknown, null, unknown>;

    const render = () => {
      const width = container.getBoundingClientRect().width;
      const height = container.getBoundingClientRect().height;
      if (width < 10 || height < 10) return;

      // tear down previous simulation & svg
      simulationRef.current?.stop();
      d3.select(container).selectAll("*").remove();

      const svg = d3
        .select(container)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("role", "img")
        .attr("aria-label", "Force-directed network of QA skills grouped by category");

      tooltip = d3
        .select(container)
        .append("div")
        .style("position", "absolute")
        .style("visibility", "hidden")
        .style("background", "rgba(13, 20, 17, 0.95)")
        .style("border", "1px solid rgba(52, 211, 153, 0.35)")
        .style("color", "#e8f0ec")
        .style("padding", "6px 10px")
        .style("border-radius", "8px")
        .style("font-size", "12px")
        .style("pointer-events", "none")
        .style("z-index", "20")
        .style("white-space", "nowrap");

      // ---- build nodes & links ----
      const nodes: NetNode[] = [];
      const links: NetLink[] = [];

      networkData.categories.forEach((cat) => {
        nodes.push({
          id: cat.name,
          type: "hub",
          category: cat.name,
          color: cat.color,
        });
        cat.skills.forEach((s) => {
          nodes.push({
            id: `${cat.name}::${s}`,
            type: "leaf",
            category: cat.name,
            color: cat.color,
          });
          links.push({ source: cat.name, target: `${cat.name}::${s}` });
        });
      });

      // cross-links between adjacent hubs for organic structure
      const hubNames = networkData.categories.map((c) => c.name);
      for (let i = 0; i < hubNames.length - 1; i++) {
        links.push({ source: hubNames[i], target: hubNames[i + 1] });
      }

      const g = svg.append("g");
      const linkSel = g
        .append("g")
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("stroke", "rgba(148,180,165,0.16)")
        .attr("stroke-width", 1);

      const nodeSel = g
        .append("g")
        .selectAll<SVGGElement, NetNode>("g")
        .data(nodes)
        .join("g")
        .style("cursor", "pointer");

      nodeSel
        .append("circle")
        .attr("r", (d) => (d.type === "hub" ? 20 : 7))
        .attr("fill", (d) =>
          d.type === "hub" ? d3.color(d.color)!.copy({ opacity: 0.18 }).toString() : d3.color(d.color)!.copy({ opacity: 0.85 }).toString()
        )
        .attr("stroke", (d) => d.color)
        .attr("stroke-width", (d) => (d.type === "hub" ? 2 : 1.4));

      nodeSel
        .filter((d) => d.type === "hub")
        .append("text")
        .text((d) => d.id)
        .attr("text-anchor", "middle")
        .attr("dy", (d) => (d.id === "Tools & Platforms" || d.id === "Data & CI/CD" ? "2.6em" : "0.35em"))
        .attr("fill", (d) => d.color)
        .style("font-size", "11.5px")
        .style("font-weight", 700)
        .style("pointer-events", "none");

      // ---- tooltip & focus highlight ----
      const highlight = (cat: string | null) => {
        nodeSel
          .transition()
          .duration(220)
          .attr("opacity", (d) => (!cat || d.category === cat ? 1 : 0.14));
        linkSel
          .transition()
          .duration(220)
          .attr("stroke", (l) => {
            const s = l.source as NetNode;
            return !cat || s.category === cat
              ? "rgba(148,180,165,0.16)"
              : "rgba(148,180,165,0.04)";
          });
      };

      nodeSel
        .on("mouseover", (event: MouseEvent, d) => {
          const label = d.type === "leaf" ? d.id.split("::")[1] : d.id;
          tooltip
            .style("visibility", "visible")
            .html(
              `<strong style="color:${d.color}">${label}</strong><br/><span style="color:#8ba39a">${d.category}</span>`
            );
          highlight(d.category);
        })
        .on("mousemove", (event: MouseEvent) => {
          const [px, py] = d3.pointer(event, container);
          tooltip.style("top", py - 10 + "px").style("left", px + 14 + "px");
        })
        .on("mouseout", () => {
          tooltip.style("visibility", "hidden");
          highlight(null);
        });

      // ---- drag behaviour ----
      const drag = d3
        .drag<SVGGElement, NetNode>()
        .on("start", (event, d) => {
          if (!event.active) sim.alphaTarget(0.25).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on("drag", (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on("end", (event, d) => {
          if (!event.active) sim.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        });
      nodeSel.call(drag);

      // ---- zoom / pan ----
      // Wheel over the network zooms in/out (scroll = zoom, as requested).
      // On touch devices one finger scrolls the page normally while a
      // two-finger pinch zooms the graph.
      const zoom = d3
        .zoom<SVGSVGElement, unknown>()
        .scaleExtent([0.4, 4])
        .filter((event) => {
          if (event.type === "wheel") return true;
          if (
            event.type === "touchstart" ||
            event.type === "touchmove" ||
            event.type === "touchend"
          ) {
            return event.touches.length >= 2;
          }
          // mouse: background drag pans; keep node drags passing through
          return !event.ctrlKey || event.type === "wheel";
        })
        .on("zoom", (event) => {
          g.attr("transform", event.transform.toString());
        });
      svg.call(zoom).on("dblclick.zoom", null);
      svgRef.current = svg.node();
      zoomRef.current = zoom;

      // ---- simulation ----
      const sim = d3
        .forceSimulation<NetNode>(nodes)
        .force(
          "link",
          d3
            .forceLink<NetNode, NetLink>(links)
            .id((d) => d.id)
            .distance((l) => {
              const s = l.source as NetNode;
              return s.type === "hub" ? 86 : 64;
            })
            .strength(0.6)
        )
        .force("charge", d3.forceManyBody().strength(-190))
        .force(
          "collide",
          d3.forceCollide<NetNode>((d) => (d.type === "hub" ? 38 : 17))
        )
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("x", d3.forceX(width / 2).strength(0.04))
        .force("y", d3.forceY(height / 2).strength(0.06));

      simulationRef.current = sim;

      sim.on("tick", () => {
        // keep nodes inside the viewport
        nodes.forEach((d) => {
          const pad = d.type === "hub" ? 46 : 20;
          if (d.x) d.x = Math.max(pad, Math.min(width - pad, d.x));
          if (d.y) d.y = Math.max(pad, Math.min(height - pad, d.y));
        });
        linkSel
          .attr("x1", (d) => (d.source as NetNode).x ?? 0)
          .attr("y1", (d) => (d.source as NetNode).y ?? 0)
          .attr("x2", (d) => (d.target as NetNode).x ?? 0)
          .attr("y2", (d) => (d.target as NetNode).y ?? 0);
        nodeSel.attr("transform", (d) => `translate(${d.x ?? 0},${d.y ?? 0})`);
      });

      // pre-warm so the layout appears mostly settled
      sim.stop();
      for (let i = 0; i < 180; ++i) sim.tick();
      // gentle live relaxation
      sim.alpha(0.35).restart();
    };

    render();

    let t: ReturnType<typeof setTimeout>;
    const observer = new ResizeObserver(() => {
      clearTimeout(t);
      t = setTimeout(() => {
        if (!stopped) render();
      }, 250);
    });
    if (d3Ref.current) observer.observe(d3Ref.current);

    return () => {
      stopped = true;
      clearTimeout(t);
      observer.disconnect();
      simulationRef.current?.stop();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[440px] w-full overflow-hidden rounded-xl"
      data-testid="skill-network"
    >
      {/* d3 render target (wiped/rebuilt by d3 on resize) */}
      <div ref={d3Ref} className="absolute inset-0" />

      {/* zoom controls */}
      <div className="absolute right-3 top-3 z-10 flex flex-col gap-1.5">
        <button
          onClick={() => zoomBy(1.4)}
          aria-label="Zoom in"
          title="Zoom in"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-400/30 bg-[#0d1411]/90 text-emerald-300 backdrop-blur-sm transition hover:border-emerald-400/60 hover:bg-emerald-400/15"
        >
          <Plus className="h-4 w-4" />
        </button>
        <button
          onClick={() => zoomBy(1 / 1.4)}
          aria-label="Zoom out"
          title="Zoom out"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-400/30 bg-[#0d1411]/90 text-emerald-300 backdrop-blur-sm transition hover:border-emerald-400/60 hover:bg-emerald-400/15"
        >
          <Minus className="h-4 w-4" />
        </button>
        <button
          onClick={resetZoom}
          aria-label="Reset zoom"
          title="Reset view"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-400/30 bg-[#0d1411]/90 text-emerald-300 backdrop-blur-sm transition hover:border-emerald-400/60 hover:bg-emerald-400/15"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* interaction hint */}
      <div className="pointer-events-none absolute bottom-3 left-3 z-10 flex items-center gap-2 rounded-full border border-emerald-400/20 bg-[#0d1411]/90 px-3 py-1.5 text-[10.5px] font-medium tracking-wide text-[#8ba39a] backdrop-blur-sm">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
        Scroll to zoom in / out&nbsp;&nbsp;·&nbsp;&nbsp;Drag to pan&nbsp;&nbsp;·&nbsp;&nbsp;Pinch on touch
      </div>
    </div>
  );
}
