import React, { useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import {
  SeleniumLogo, PlaywrightLogo, TypeScriptLogo, JavaScriptLogo, AppiumLogo,
  PostmanLogo, JiraLogo, CucumberLogo, AllureLogo, ExtentLogo, HtmlLogo
} from "./logos";

interface Tech {
  name: string;
  Logo: React.FC;
  glow: string;
}

const TECHS: Tech[] = [
  { name: "Selenium",      Logo: SeleniumLogo,   glow: "#59B943" },
  { name: "Playwright",    Logo: PlaywrightLogo, glow: "#E2574C" },
  { name: "TypeScript",    Logo: TypeScriptLogo, glow: "#3178C6" },
  { name: "JavaScript",    Logo: JavaScriptLogo, glow: "#F7DF1E" },
  { name: "Appium",        Logo: AppiumLogo,     glow: "#9B5DE5" },
  { name: "Postman",       Logo: PostmanLogo,    glow: "#FF6C37" },
  { name: "JIRA",          Logo: JiraLogo,       glow: "#2684FF" },
  { name: "Cucumber",      Logo: CucumberLogo,   glow: "#23D96C" },
  { name: "Allure Report", Logo: AllureLogo,     glow: "#FA5C7C" },
  { name: "Extent Report", Logo: ExtentLogo,     glow: "#00B0AD" },
  { name: "HTML Report",   Logo: HtmlLogo,       glow: "#F16529" }
];

const SWAP_EVERY = 5; // seconds between position changes

function hexToRgba(hex: string, a: number) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}

/**
 * Tech cards rest at fixed slots on an ellipse around the cube.
 * Every 5 seconds each card glides (GSAP) to a new slot on the ellipse.
 * Between swaps they only float gently in place — calm and readable.
 */
export default function TechOrbit({ stageRef }: { stageRef: React.RefObject<HTMLDivElement> }) {
  const holderRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRefs = useRef<(SVGPathElement | null)[]>([]);
  const flowRefs = useRef<(SVGPathElement | null)[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);

  const techs = useMemo(() => TECHS, []);
  const N = techs.length;

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const dims = { w: 0, h: 0 };
    /* animated per-card position state (tweened by GSAP on swaps) */
    const cards = techs.map((_, i) => ({ slot: i, x: 0, y: 0 }));
    let firstLayout = true;

    /* ellipse slot -> pixel coords (slot 0 at top, evenly spaced) */
    const slotPos = (slot: number) => {
      const { w, h } = dims;
      const cx = w / 2;
      const cy = h / 2;
      const rx = Math.min(w * 0.44, 420);
      const ry = Math.min(h * 0.40, 330);
      const a = -Math.PI / 2 + (slot / N) * Math.PI * 2;
      return { x: cx + Math.cos(a) * rx, y: cy + Math.sin(a) * ry };
    };

    const layout = (animate: boolean) => {
      cards.forEach((c, i) => {
        const p = slotPos(c.slot);
        if (!animate) {
          c.x = p.x;
          c.y = p.y;
        } else {
          gsap.to(c, {
            x: p.x,
            y: p.y,
            duration: 1.6,
            ease: "power3.inOut",
            delay: (i % 4) * 0.1 // slight stagger, feels organic
          });
        }
      });
    };

    const measure = () => {
      const r = stage.getBoundingClientRect();
      dims.w = r.width;
      dims.h = r.height;
      if (svgRef.current) svgRef.current.setAttribute("viewBox", `0 0 ${r.width} ${r.height}`);
      layout(!firstLayout);
      firstLayout = false;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(stage);

    /* every 10 s: rotate every card 3 slots around the ellipse
       (occasionally reverse) and glide there */
    let swapCount = 0;
    const swapTimer = window.setInterval(() => {
      swapCount++;
      const step = swapCount % 3 === 0 ? -4 : 3; // vary the pattern
      cards.forEach((c) => { c.slot = ((c.slot + step) % N + N) % N; });
      layout(true);
    }, SWAP_EVERY * 1000);

    /* per-frame: gentle float + write transforms + connection lines */
    const tick = () => {
      const t = gsap.ticker.time;
      const { w, h } = dims;
      if (!w || !h) return;
      const cx = w / 2;
      const cy = h / 2;
      const isMobile = w < 560;

      cards.forEach((c, i) => {
        const el = holderRefs.current[i];
        if (!el) return;

        const fx = Math.sin(t * 0.7 + i * 1.9) * 7;   // gentle drift
        const fy = Math.sin(t * 0.9 + i * 1.3) * 9;   // gentle bob
        const x = c.x + fx;
        const y = c.y + fy;
        const rot = Math.sin(t * 0.5 + i * 1.1) * 3;  // subtle self-rotation
        const scale = isMobile ? 0.78 : 1;

        el.style.transform =
          `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${rot}deg) scale(${scale})`;

        const line = lineRefs.current[i];
        const flow = flowRefs.current[i];
        if (line && flow) {
          const mx = (x + cx) / 2 + Math.sin(t * 0.4 + i) * 18;
          const my = (y + cy) / 2 + Math.cos(t * 0.35 + i) * 18;
          const d = `M ${x} ${y} Q ${mx} ${my} ${cx} ${cy}`;
          line.setAttribute("d", d);
          flow.setAttribute("d", d);
        }
      });
    };

    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      window.clearInterval(swapTimer);
      ro.disconnect();
      cards.forEach((c) => gsap.killTweensOf(c));
    };
  }, [stageRef, techs, N]);

  return (
    <>
      {/* animated neon connection lines */}
      <svg ref={svgRef} className="lines-svg" aria-hidden="true">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
        {techs.map((tech, i) => (
          <g key={tech.name}>
            <path
              ref={(el) => { lineRefs.current[i] = el; }}
              className="neon-line"
              stroke="url(#lineGrad)"
              style={{ opacity: 0.3 }}
            />
            <path
              ref={(el) => { flowRefs.current[i] = el; }}
              className="neon-line-flow"
              stroke={tech.glow}
              style={{ color: tech.glow, opacity: 0.55, animationDelay: `${i * -0.35}s` }}
            />
          </g>
        ))}
      </svg>

      {/* cards at ellipse slots */}
      <div className="cards-layer">
        {techs.map((tech, i) => (
          <div
            key={tech.name}
            ref={(el) => { holderRefs.current[i] = el; }}
            className="tech-card-holder"
          >
            <motion.div
              className="tech-card"
              style={
                {
                  "--card-glow": tech.glow,
                  "--card-glow-soft": hexToRgba(tech.glow, 0.45)
                } as React.CSSProperties
              }
              initial={{ opacity: 0, scale: 0.4, y: 26 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.65 + i * 0.09, duration: 0.7, type: "spring", bounce: 0.45 }}
              whileHover={{ scale: 1.14, y: -7, transition: { duration: 0.25 } }}
              whileTap={{ scale: 0.96 }}
            >
              <span className="logo"><tech.Logo /></span>
              <span className="name">{tech.name}</span>
            </motion.div>
          </div>
        ))}
      </div>
    </>
  );
}
