import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import CubeScene, { PointerState } from "./components/CubeScene";
import {
  HomePanel, ExperiencePanel, SkillsPanel, EducationPanel,
  RolesPanel, ProjectsPanel, AIDevPanel, ContactPanel
} from "./components/Sections";
import { PROFILE, SECTIONS } from "./data";
import { RESUME_DATA_URI, RESUME_FILENAME } from "./resumePdf";
import { downloadResume } from "./downloadResume";

export default function App() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const pointer = useRef<PointerState>({ x: 0, y: 0 });
  const scroll = useRef(0); // 0..1 page progress, read by the 3D scene
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  /* ---- global mouse → normalized -1..1, smoothed ---- */
  useEffect(() => {
    const target = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const tick = () => {
      pointer.current.x += (target.x - pointer.current.x) * 0.06;
      pointer.current.y += (target.y - pointer.current.y) * 0.06;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    gsap.ticker.add(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      gsap.ticker.remove(tick);
    };
  }, []);

  /* ---- horizontal scroll engine ----
     mouse wheel (vertical) → smooth horizontal scroll; trackpads and
     touch swipes work natively via overflow-x. */
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const pos = { x: el.scrollLeft };
    let targetX = el.scrollLeft;
    let animating = false;

    const clamp = (v: number) => Math.max(0, Math.min(el.scrollWidth - el.clientWidth, v));

    const glide = () => {
      pos.x += (targetX - pos.x) * 0.11;
      if (Math.abs(targetX - pos.x) < 0.6) {
        pos.x = targetX;
        animating = false;
        gsap.ticker.remove(glide);
      }
      el.scrollLeft = pos.x;
    };

    const startGlide = () => {
      if (!animating) {
        animating = true;
        pos.x = el.scrollLeft;
        gsap.ticker.add(glide);
      }
    };

    const onWheel = (e: WheelEvent) => {
      // Defer to inner vertical scrolling ONLY for elements that are truly
      // scrollable (overflow auto/scroll) AND can still move in the wheel
      // direction. Elements with overflow:visible can report a larger
      // scrollHeight but never scroll — treating them as scrollable used to
      // freeze the page (e.g. on the Roles section).
      let node = e.target as HTMLElement | null;
      while (node && node !== el) {
        if (node.scrollHeight > node.clientHeight + 10) {
          const oy = getComputedStyle(node).overflowY;
          if (oy === "auto" || oy === "scroll") {
            const canDown = node.scrollTop + node.clientHeight < node.scrollHeight - 2;
            const canUp = node.scrollTop > 2;
            if ((e.deltaY > 0 && canDown) || (e.deltaY < 0 && canUp)) return;
          }
        }
        node = node.parentElement;
      }

      // Use the dominant axis so BOTH mouse wheels (deltaY) and laptop
      // trackpads (two-finger vertical OR horizontal swipes) drive the page.
      let delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      // normalize deltaMode: 1 = lines (Firefox), 2 = pages
      if (e.deltaMode === 1) delta *= 16;
      else if (e.deltaMode === 2) delta *= el.clientWidth;

      e.preventDefault();
      // trackpads emit many small deltas; mice emit few large ones —
      // scale small deltas up a bit so trackpad swipes feel responsive
      const boost = Math.abs(delta) < 40 ? 2.4 : 1.6;
      targetX = clamp(targetX + delta * boost);
      startGlide();
    };

    const onKey = (e: KeyboardEvent) => {
      const page = el.clientWidth * 0.85;
      const map: Record<string, number> = {
        ArrowRight: 120, ArrowDown: 120, PageDown: page,
        ArrowLeft: -120, ArrowUp: -120, PageUp: -page
      };
      if (e.key === "Home") { targetX = 0; startGlide(); return; }
      if (e.key === "End") { targetX = clamp(el.scrollWidth); startGlide(); return; }
      if (map[e.key] != null) {
        e.preventDefault();
        targetX = clamp(targetX + map[e.key]);
        startGlide();
      }
    };

    /* progress + active section + 3D scroll uniform */
    const onScroll = () => {
      const max = Math.max(1, el.scrollWidth - el.clientWidth);
      const p = el.scrollLeft / max;
      scroll.current = p;
      if (progressRef.current) progressRef.current.style.width = `${p * 100}%`;
      if (!animating) targetX = el.scrollLeft; // keep in sync with native drags

      const center = el.scrollLeft + el.clientWidth * 0.45;
      const panels = Array.from(el.querySelectorAll<HTMLElement>("[data-section]"));
      let current = "home";
      for (const panel of panels) {
        if (panel.offsetLeft <= center) current = panel.dataset.section || current;
      }
      setActive((prev) => (prev === current ? prev : current));
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    onScroll();

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
      gsap.ticker.remove(glide);
    };
  }, []);

  /* ---- navigate to a section (GSAP smooth) ---- */
  const goTo = (id: string) => {
    const el = scrollerRef.current;
    if (!el) return;
    const panel = el.querySelector<HTMLElement>(`[data-section="${id}"]`);
    if (!panel) return;
    setMenuOpen(false);
    gsap.to(el, { scrollLeft: panel.offsetLeft, duration: 1.1, ease: "power3.inOut" });
  };

  /* close mobile menu on resize up + lock while open */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 1180) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      {/* ---------- FIXED 3D BACKGROUND (the cube behind everything) ---------- */}
      <div className="bg-layer">
        <div className="bg-glow" />
        <CubeScene pointer={pointer} scroll={scroll} />
      </div>

      {/* ---------- TOP NAV ---------- */}
      <header className="nav">
        <div className="nav-brand" onClick={() => goTo("home")}>
          <div className="nav-avatar">{PROFILE.initials}</div>
          <div className="who">
            <div className="nm">{PROFILE.name}</div>
            <div className="rl">{PROFILE.role}</div>
          </div>
        </div>
        <nav className="nav-links">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              className={`nav-link${active === s.id ? " active" : ""}`}
              onClick={() => goTo(s.id)}
            >
              {s.label}
            </button>
          ))}
        </nav>
        <a className="nav-resume" href={RESUME_DATA_URI} download={RESUME_FILENAME} onClick={downloadResume}>
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <span className="nav-resume-txt">Resume</span>
        </a>
        <span className="nav-avail"><span className="dot" /> {PROFILE.availability}</span>
        <button
          className={`nav-burger${menuOpen ? " open" : ""}`}
          aria-label="Menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </header>
      <div className="progress"><div className="bar" ref={progressRef} /></div>

      {/* mobile / tablet dropdown menu */}
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            className={`mm-link${active === s.id ? " active" : ""}`}
            onClick={() => goTo(s.id)}
          >
            {s.label}
          </button>
        ))}
        <a
          className="mm-resume"
          href={RESUME_DATA_URI}
          download={RESUME_FILENAME}
          onClick={(e) => { downloadResume(e); setMenuOpen(false); }}
        >
          ⬇ Download Resume
        </a>
      </div>
      {menuOpen && <div className="mm-backdrop" onClick={() => setMenuOpen(false)} />}

      {/* ---------- HORIZONTAL SCROLLER ---------- */}
      <main className="hscroll" ref={scrollerRef}>
        <HomePanel goTo={goTo} />
        <ExperiencePanel />
        <SkillsPanel />
        <EducationPanel />
        <RolesPanel />
        <ProjectsPanel />
        <AIDevPanel />
        <ContactPanel />
      </main>
    </>
  );
}
