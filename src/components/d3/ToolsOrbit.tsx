"use client";

import { useEffect, useRef } from "react";
import { heroTools } from "@/lib/portfolio-data";

interface Ring {
  rx: number;
  ry: number;
  lap: number; // ms per revolution
  phase: number; // angular offset so rings start staggered
  tools: string[];
}

interface Orbiter {
  ring: number;
  theta0: number;
  el: HTMLDivElement;
  w: number;
  h: number;
  lastZ: number;
}

// width-balanced assignment: the widest chips sit on rings whose gap to
// their neighbour still fits both half-widths at the horizontal extremes
const OUTER = [0, 1, 2, 4, 9]; // Selenium, Playwright, TypeScript, Appium, Extent Report
const MID = [5, 6, 7, 11]; // Postman, JIRA, Cucumber, Jenkins
const INNER = [3, 8, 10]; // JavaScript, Allure Report, TestNG
const MOBILE = [0, 1, 2, 3, 4]; // Selenium, Playwright, TypeScript, JavaScript, Appium

// depth bands: back chips (z 20) pass behind the core (z 30), front chips (z 40)
// ride above it. The band flips at the ellipse's horizontal extremes where the
// chip is far from the core, so the switch is never visible.
const Z_BACK = 20;
const Z_FRONT = 40;

/**
 * Tools "orbital" — a glowing core with tilted elliptical orbits.
 * Tool cards ride the rings like planets: they sweep across the front,
 * dip behind the glowing core on the far side (smaller + dimmer), and
 * keep cycling forever at different speeds.
 *
 * Flicker-free render pipeline:
 *  - SVG (rings + ambient halo) is STATIC after build — never mutated.
 *  - Chips are HTML divs positioned with translate3d (GPU-composited layers,
 *    will-change: transform) and live in ONE layer for their whole life —
 *    depth is done with a z-index band flip at the horizontal extremes
 *    instead of reparenting DOM nodes (the old flash/flicker source).
 *  - The core (glow dot + ripples) is pure CSS keyframe animation — no
 *    per-frame JS writes, no per-frame drop-shadow re-rasterisation.
 */
export default function ToolsOrbit() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    let stopped = true;
    let visible = true;
    let raf = 0;
    let resizeTimer: ReturnType<typeof setTimeout>;
    let frame: ((now: number) => void) | null = null;

    const stopLoop = () => {
      stopped = true;
      cancelAnimationFrame(raf);
    };

    const startLoop = () => {
      if (!stopped || !frame) return;
      stopped = false;
      raf = requestAnimationFrame(frame);
    };

    let rebuild: () => void;

    rebuild = () => {
      const W = container.getBoundingClientRect().width;
      if (W < 10) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const small = W < 520;
      const mid = !small && W < 1100;
      const cx = W / 2;

      // ---- ring sizing (gaps tuned so neighbouring chips never overlap) ----
      let rings: Ring[];
      let H: number;
      if (small) {
        const rxO = Math.min(150, (W - 105) / 2);
        H = Math.round(rxO * 0.9) + 50;
        rings = [
          {
            rx: rxO,
            ry: rxO * 0.45,
            lap: 48000,
            phase: 0,
            tools: MOBILE.map((i) => heroTools[i]),
          },
        ];
      } else {
        const rxO = Math.min(334, (W - 180) / 2);
        const s = rxO / 334;
        H = Math.max(210, Math.round(298 * s) + 46);
        rings = [
          { rx: 118 * s, ry: 53 * s, lap: 26000, phase: Math.PI / 2, tools: INNER.map((i) => heroTools[i]) },
          { rx: 226 * s, ry: 101 * s, lap: 38000, phase: Math.PI / 6, tools: MID.map((i) => heroTools[i]) },
          { rx: rxO, ry: 149 * s, lap: 52000, phase: 0, tools: OUTER.map((i) => heroTools[i]) },
        ];
      }
      const cy = H / 2;

      // ---- wipe previous build ----
      while (container.firstChild) container.removeChild(container.firstChild);
      frame = null;
      container.style.height = `${H}px`;

      // ---- static SVG: orbit rings + ambient halo (never mutated again) ----
      const NS = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(NS, "svg");
      svg.setAttribute("width", String(W));
      svg.setAttribute("height", String(H));
      svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
      svg.style.cssText = "position:absolute;inset:0;display:block;";
      const defs = document.createElementNS(NS, "defs");
      const rg = document.createElementNS(NS, "radialGradient");
      rg.setAttribute("id", "tools-orbit-halo");
      for (const [off, op] of [
        ["0%", "0.2"],
        ["55%", "0.06"],
        ["100%", "0"],
      ]) {
        const st = document.createElementNS(NS, "stop");
        st.setAttribute("offset", off);
        st.setAttribute("stop-color", "#34d399");
        st.setAttribute("stop-opacity", op);
        rg.appendChild(st);
      }
      defs.appendChild(rg);
      svg.appendChild(defs);
      const haloC = document.createElementNS(NS, "circle");
      haloC.setAttribute("cx", String(cx));
      haloC.setAttribute("cy", String(cy));
      haloC.setAttribute("r", "76");
      haloC.setAttribute("fill", "url(#tools-orbit-halo)");
      svg.appendChild(haloC);
      for (const r of rings) {
        const el = document.createElementNS(NS, "ellipse");
        el.setAttribute("cx", String(cx));
        el.setAttribute("cy", String(cy));
        el.setAttribute("rx", String(r.rx));
        el.setAttribute("ry", String(r.ry));
        el.setAttribute("fill", "none");
        el.setAttribute("stroke", "rgba(52,211,153,0.22)");
        el.setAttribute("stroke-width", "1.25");
        svg.appendChild(el);
      }
      container.appendChild(svg);

      // ---- chip layer (no stacking context of its own, so chip z-indexes
      //      interleave with the core below) ----
      const layer = document.createElement("div");
      layer.style.cssText = "position:absolute;inset:0;pointer-events:none;";
      container.appendChild(layer);

      const chipFont = small ? 10.5 : mid ? 10.5 : 11;
      const padX = small ? 13 : mid ? 14 : 15;
      const padY = small ? 6 : 7;

      const makeChip = (name: string, ringIdx: number, theta: number) => {
        const el = document.createElement("div");
        el.dataset.chip = name;
        el.style.cssText = [
          "position:absolute",
          "left:0",
          "top:0",
          "display:flex",
          "align-items:center",
          "gap:6px",
          `padding:${padY}px ${padX}px`,
          "border-radius:9999px",
          "background:rgba(13,20,17,0.94)",
          "border:1px solid rgba(52,211,153,0.3)",
          "color:#c7d6cf",
          `font-size:${chipFont}px`,
          "font-weight:600",
          "letter-spacing:0.02em",
          "line-height:1",
          "white-space:nowrap",
          "pointer-events:none",
          "will-change:transform,opacity",
          "backface-visibility:hidden",
        ].join(";");
        const dot = document.createElement("span");
        dot.style.cssText =
          "flex:none;width:6px;height:6px;border-radius:9999px;background:#34d399;";
        const label = document.createElement("span");
        label.textContent = name;
        el.appendChild(dot);
        el.appendChild(label);
        layer.appendChild(el);
        const o: Orbiter = {
          ring: ringIdx,
          theta0: theta,
          el,
          w: el.offsetWidth,
          h: el.offsetHeight,
          lastZ: -1,
        };
        return o;
      };

      const orbiters: Orbiter[] = [];
      rings.forEach((r, ri) => {
        r.tools.forEach((name, j) => {
          orbiters.push(makeChip(name, ri, r.phase + (2 * Math.PI * j) / r.tools.length));
        });
      });

      // mobile: unlabeled satellite dots on an inner orbit for depth
      const dotPhases = small ? [0, Math.PI] : [];
      const rxSmall = rings[0].rx * 0.55;
      const rySmall = rings[0].ry * 0.55;
      const dotEls: HTMLDivElement[] = dotPhases.map(() => {
        const d = document.createElement("div");
        d.style.cssText =
          "position:absolute;left:-2.5px;top:-2.5px;width:5px;height:5px;border-radius:9999px;background:#34d399;opacity:0.7;box-shadow:0 0 6px rgba(52,211,153,0.8);will-change:transform;pointer-events:none;";
        layer.appendChild(d);
        return d;
      });

      // ---- glowing core: pure CSS animation, never touched by JS ----
      const core = document.createElement("div");
      core.dataset.core = "1";
      core.style.cssText = `position:absolute;left:${cx}px;top:${cy}px;width:0;height:0;z-index:30;pointer-events:none;`;
      const ripple = (delay: string) => {
        const el = document.createElement("span");
        el.className = "tools-orbit-anim";
        el.style.cssText = `position:absolute;left:-34px;top:-34px;width:68px;height:68px;border-radius:9999px;border:1px solid rgba(52,211,153,0.5);opacity:0.18;animation:toolsOrbitRipple 1.7s linear infinite;animation-delay:${delay};`;
        core.appendChild(el);
      };
      ripple("0s");
      ripple("-0.85s");
      const haloRing = document.createElement("span");
      haloRing.style.cssText =
        "position:absolute;left:-15px;top:-15px;width:30px;height:30px;border-radius:9999px;border:1px solid rgba(52,211,153,0.3);";
      core.appendChild(haloRing);
      const glow = document.createElement("span");
      glow.className = "tools-orbit-anim";
      glow.style.cssText =
        "position:absolute;left:-7px;top:-7px;width:14px;height:14px;border-radius:9999px;background:#34d399;box-shadow:0 0 12px rgba(52,211,153,0.95),0 0 26px rgba(52,211,153,0.4);animation:toolsOrbitPulse 1.6s ease-in-out infinite;";
      core.appendChild(glow);
      container.appendChild(core);

      const place = (o: Orbiter, theta: number) => {
        const r = rings[o.ring];
        const sin = Math.sin(theta);
        const x = cx + r.rx * Math.cos(theta);
        const y = cy + r.ry * sin;
        const depth = (sin + 1) / 2; // 0 = far side, 1 = near side
        const s = 0.82 + 0.18 * depth;
        o.el.style.transform = `translate3d(${(x - o.w / 2).toFixed(2)}px,${(
          y -
          o.h / 2
        ).toFixed(2)}px,0) scale(${s.toFixed(3)})`;
        o.el.style.opacity = (0.58 + 0.42 * depth).toFixed(3);
        const z = depth > 0.5 ? Z_FRONT : Z_BACK;
        if (z !== o.lastZ) {
          o.el.style.zIndex = String(z);
          o.lastZ = z;
        }
      };

      if (reduced) {
        for (const o of orbiters) place(o, o.theta0);
        dotPhases.forEach((ph, i) => {
          dotEls[i].style.transform = `translate3d(${(
            cx +
            rxSmall * Math.cos(ph)
          ).toFixed(2)}px,${(cy + rySmall * Math.sin(ph)).toFixed(2)}px,0)`;
        });
        return;
      }

      frame = function tick(now: number) {
        if (stopped) return;
        for (const o of orbiters) {
          place(o, o.theta0 + (2 * Math.PI * now) / rings[o.ring].lap);
        }
        for (let i = 0; i < dotEls.length; i++) {
          const th = dotPhases[i] + (2 * Math.PI * now) / 26000;
          dotEls[i].style.transform = `translate3d(${(
            cx +
            rxSmall * Math.cos(th)
          ).toFixed(2)}px,${(cy + rySmall * Math.sin(th)).toFixed(2)}px,0)`;
        }
        raf = requestAnimationFrame(tick);
      };

      if (visible) startLoop();
    };

    rebuild();

    const observer = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        stopLoop();
        rebuild();
      }, 250);
    });
    observer.observe(container);

    // re-measure chip widths once webfonts finish loading
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!container.isConnected) return;
        stopLoop();
        rebuild();
      });
    }

    // only animate while the system is on screen
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) startLoop();
        else stopLoop();
      },
      { threshold: 0.05 }
    );
    io.observe(container);

    return () => {
      stopLoop();
      clearTimeout(resizeTimer);
      observer.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes toolsOrbitRipple {
          0% { transform: scale(0.4); opacity: 0.4; }
          70% { opacity: 0.12; }
          100% { transform: scale(1); opacity: 0; }
        }
        @keyframes toolsOrbitPulse {
          0%, 100% { transform: scale(1); opacity: 0.85; }
          50% { transform: scale(1.22); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .tools-orbit-anim { animation: none !important; }
        }
      `}</style>
      <div
        ref={ref}
        className="relative w-full"
        data-testid="tools-orbit"
        role="img"
        aria-label={`Tools I work with: ${heroTools.join(", ")}`}
      />
    </>
  );
}
