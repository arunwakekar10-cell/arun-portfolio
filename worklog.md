# Worklog

---
Task ID: 1
Agent: Main agent (Super Z)
Task: Navigate https://www.arunwakekar.in/, extract portfolio content, and rebuild it as an interactive portfolio website with D3.js visualisations (d3-viz skill + fullstack-dev skill).

Work Log:
- Scraped https://www.arunwakekar.in/ via agent-browser: full accessibility snapshot + innerText extraction + full-page reference screenshot (/home/z/my-project/reference-portfolio.png).
- Extracted content: profile (Arun Wakekar, Quality Analyst), 2 jobs with bullets, 6 skill categories, education + 4 certifications, 6 role cards, 2 featured projects, AI-dev process/projects, contact info.
- Initialized fullstack-dev environment (Next.js 16 + TS + Tailwind 4 + shadcn/ui), installed d3 + @types/d3.
- Built data layer: src/lib/portfolio-data.ts (all scraped content, typed).
- Built D3 components (Pattern A: direct DOM, ResizeObserver responsive, tooltips, cleanup):
  - ParticleNetwork.tsx — canvas ambient network w/ mouse repulsion (hero bg)
  - SkillsRadar.tsx — radar chart, auto-shrinking radius via canvas measureText, mount scale/fade, breathing glow
  - CareerTimeline.tsx — Gantt-style time axis, animated bars, TODAY marker, adaptive label/duration placement
  - SkillNetwork.tsx — force-directed graph, 5 category hubs, drag + zoom + hover category focus, pre-warmed simulation
  - TestingDomainsDonut.tsx — donut with sweep-in attrTween, hover expand/dim, live center label, compact 2-col legend
  - AnimatedNumber.tsx — IntersectionObserver count-up stat counters
- Built sections: Navbar (scroll-aware, mobile burger), Hero (particles + stats + marquee), Dashboard (4-chart grid), Experience, Skills, Education, Roles, Projects, AiDev, Contact, Footer + SectionHeading.
- Updated layout.tsx metadata (title/OG for Arun Wakekar QA portfolio), appended custom CSS (marquee, scrollbars, selection) to globals.css.
- Bug fixes found via browser verification:
  1. selection.attrTween not a function → moved sweep-in to transition().attrTween
  2. Nested transitions on same element (radar mount) → merged into single opacity+scale transition
  3. Donut initial full-arc flash → render collapsed startAngle arc before sweep
  4. Donut compact legend overlap → 2-col grid below donut, pct double-offset fix (x relative to row group)
  5. Timeline bar label overflow → fallback variant chain (full → role → company), duration inside-right only when bar reaches right edge
  6. Radar axis label clipping → measured text widths, radius auto-shrink loop
  7. ESLint no-empty-object-type → type alias instead of empty interface
- Verified via agent-browser: desktop full-page render, radar/network/timeline/donut rendering, donut hover interaction (slice expand + center label), mobile 390px layout, footer stick, no runtime errors in dev.log, ESLint clean.

Stage Summary:
- Deliverable: Next.js 16 portfolio at /home/z/my-project (src/app/page.tsx renders all sections).
- 4 interactive D3 visualisations + ambient particle hero + count-up stats.
- All content faithfully ported from arunwakekar.in; dark emerald/amber "QA analytics" theme.
- Verified: lint clean, dev server 200s, browser-verified interactivity on desktop + mobile.

---
Task ID: 2
Agent: Main agent (Super Z)
Task: Feature round on portfolio per user feedback — resume download, scroll-zoom on QA Toolkit Network, 2 live AI projects, professional preloader.

Work Log:
- Generated ATS-friendly 2-page resume PDF via scripts/generate_resume.py (reportlab) -> public/Arun_Wakekar_Resume.pdf; verified 200/application-pdf.
- Resume download buttons: Hero (amber "Download Resume"), Navbar desktop (amber "Resume"), mobile menu (full-width entry). Fixed navbar crowding at 1280px (whitespace-nowrap + availability pill moved md:flex -> xl:flex).
- SkillNetwork scroll-zoom: dedicated d3-owned inner div (d3Ref) so d3's selectAll(*).remove() no longer wipes React-rendered controls (bug found via browser check: btnCount was 0). Zoom filter: wheel always zooms, 2-finger pinch zooms on touch, 1-finger scrolls page; scaleExtent [0.4,4]. Added on-screen +/−/reset controls (d3.transition scaleBy/transform) and hint chip "Scroll to zoom in / out · Drag to pan · Pinch on touch". Height 420 -> 440px.
- Zoom verification: agent-browser mouse wheel was a CLI quirk (bypasses hit-testing); wrote scripts/test-wheel-zoom.js with global Playwright for TRUSTED wheel events — PASS: wheel-down zooms out (scale .64), wheel-up zooms in (scale 1.56), window.scrollY unchanged (d3 preventDefault OK).
- AI Dev section: added typed AiProject interface + 2 LIVE projects with urls — SaveMake (savemake.app, bookmark workspace) and AI Business Tool (aibusinesstool.com, 300+ directory submission; titles/descriptions scraped live). Cards render pulsing "Visit Live Site" external-link buttons; hrefs verified in DOM.
- Preloader: new client component Preloader.tsx (mounted in page.tsx) — QA-themed: AW monogram progress ring w/ glow + orbiting dot, count-up %, 5 rotating terminal status lines ("Running smoke tests"...), step dots, ease-out cubic over 1.9s, body scroll lock, prefers-reduced-motion shortcut, fade+scale exit. Verified frame captures.
- Browser QA: desktop 1280 (hero/navbar/network zoom state/AI Dev cards), mobile 390 (hero buttons, mobile menu download, network controls + hint, SaveMake LIVE card), no console/page errors, ESLint clean (scripts/** added to eslint ignores for require()-based test script).

Stage Summary:
- All 4 requested features shipped and browser-verified on desktop + mobile.
- public/Arun_Wakekar_Resume.pdf is the downloadable resume asset; regenerate via scripts/generate_resume.py if content changes.
- SkillNetwork d3/React ownership split (d3Ref) is the pattern to keep for future overlay controls.

---
Task ID: 3
Agent: Main agent (Super Z)
Task: Replace the duplicated tools marquee with a half-circle arc animation — tool cards travel along the arc from both ends to the top-center and vanish into a glowing apex.

Work Log:
- User feedback: tools strip showed every tool twice (marquee list was doubled). Requested: half-circle arc with small cards travelling on the line, both sides converging to center and vanishing.
- Built src/components/d3/ToolsArc.tsx (D3 + rAF): two dashed quarter-arc guide paths (left end -> apex, right end -> apex); SVG chips (rounded rect + emerald dot + tool name, width measured via getComputedTextLength) positioned per-frame with path.getPointAtLength; opacity fade-in 5%, shrink + fade-out over the last 24% so cards dissolve into a pulsing glowing apex circle; right side staggered by half a spawn period so cards reach the apex alternately (no collisions); chip population derived from arc length / min gap to prevent overlap; prefill so arc is populated on first paint; heroTools cycled with random start offset.
- Responsive: mobile (W<520) uses smaller font/padding, deeper end inset (M=56), min-gap 96px; desktop min-gap 150px, M=52; K clamped 2..8 per side. ResizeObserver + document.fonts.ready rebuild; prefers-reduced-motion renders a static evenly-spaced composition; full cleanup on unmount.
- Replaced the marquee block in Hero.tsx with <ToolsArc /> (heroTools import removed from Hero; marquee CSS left in globals.css unused/harmless).
- Browser verification: desktop 1280 two frames 1.9s apart show cards advancing, unique tools (no doubles), single card mid-vanish at apex per moment; mobile 390 no clipping/no overlap; final check 0 clipped chips, 8 chips; ESLint clean; no page errors.

Stage Summary:
- Hero tools strip is now the "converging arc" animation per user spec; duplicates gone.
- Reusable pattern: ToolsArc (getPointAtLength chip travel + apex vanish) in src/components/d3/ToolsArc.tsx; constants DURATION/GAP/M/H at top of file for tuning.

---
Task ID: 4
Agent: Main agent (Super Z)
Task: Polish pass from user screenshots — smooth/expected arc animation + broken wrapping header.

Work Log:
- Header fix: logo text was squeezed into 4 wrapped lines at ~1345px (nav row overflowed). Changes: logo button shrink-0 + whitespace-nowrap; desktop ul lg:flex -> xl:flex with gap-0.5/px-2.5 + shrink-0; burger + mobile menu lg:hidden -> xl:hidden; removed the "Available for Opportunities" pill from the navbar and moved it into the Hero above "HI, I'M" (keeps badge visible without crowding). Verified 0px overflow and one-line logo at 1536/1440/1280/1150/1024/768/390; burger below xl, 9 links at xl+.
- ToolsArc rebuilt (v2): geometry is now baseline + half-circle dome (domeR capped at ry*1.55, TAIL flat entry run, inset 44) instead of the old flat 3.5:1 ellipse; continuous gradient baseline (fades at outer ends) + solid dome quarters replace the faint dashed guide.
- Smoothness: smoothstep-eased travel along getPointAtLength (glide off baseline, settle into apex), gentle 12% fade-in, long dissolve over last 30% with scale to 0.55 into the glow; apex now has 2 radiating ripple rings (1.7s loop) + pulsing core; chips never overlap (GAP-based K clamp) and respawn keeps the L/R half-period stagger (future-born handled via negative-t hide).
- Anti-duplicate: chip spawn now skips tool names already visible on the line (user screenshot showed "Cucumber" twice; original complaint was doubled tools).
- Perf: IntersectionObserver pauses the rAF loop when the strip is offscreen; ResizeObserver/fonts.ready rebuild retained; prefers-reduced-motion static composition retained.
- Fixed TS errors: ToolsArc recursive rAF via named function expression; SkillNetwork observe() null guard.
- Verification (scripts/verify-arc-header.js, Playwright): 22/22 PASS — header no-wrap at 7 widths, links/burger visibility per breakpoint, pill only in hero, arc max move 45.8px/280ms with 0 jumps, 9 chips all unique names, 0 clipped, 4+4 both sides, dome+baseline geometry, no console/page errors. tsc + eslint clean; dev server 200.

Stage Summary:
- Header renders as a single clean row at every width; availability badge lives in the hero.
- Arc is a true half-circle dome: cards glide from both outer ends along the line and dissolve into the rippling apex glow; no duplicates, no clipping, measured-smooth motion.

---
Task ID: 5
Agent: Main agent (Super Z)
Task: "used orbital thing for that" — replace the dome arc with an orbital animation for the hero tools strip.

Work Log:
- Created src/components/d3/ToolsOrbit.tsx (replaces ToolsArc.tsx, deleted): glowing emerald core (radial halo, pulsing dot, 2 radiating ripple rings) with tilted elliptical orbit rings; tool chips ride the rings like planets.
- Depth model: front half of each ellipse renders chips bright (opacity 1) and full scale in gFront (above core); back half renders dim (0.58) and 0.82 scale in gBehind (below the core glow); chips are reparented between the two layers when crossing the ring's horizontal extremes.
- Motion: analytic positions (cx + rx·cosθ, cy + ry·sinθ), rings turn at 26s/38s/52s per lap (desktop) — measured smooth (12.5px per 280ms, 0 jumps). rAF paused offscreen via IntersectionObserver; ResizeObserver + fonts.ready rebuild; prefers-reduced-motion static composition; aria-label lists all tools.
- Anti-overlap geometry: desktop rings rx 118/226/334 (ry 53/101/149) — side gaps 108px vs worst chip half-sum ~107; width-balanced tool assignment (widest chips "Allure Report"/"Extent Report" spread across non-adjacent rings); chip font 11 (10.5 below 1100px). Mobile (W<520): one labeled ring with 5 headline tools (rx capped (W-105)/2) + 2 fast unlabeled satellite dots on an inner orbit (26s) — removes the Playwright/Appium overlap seen in the first orbital screenshot.
- Hero.tsx: import swapped ToolsArc -> ToolsOrbit; strip comment updated.
- Verification (scripts/verify-orbit-header.js, Playwright): 22/22 PASS — header no-wrap at 7 widths (regression), orbit motion smooth, 12 chips all unique, depth cue 0.58..1.00, 0 clipped, 3 ellipses, no console/page errors; tsc + eslint clean; desktop + mobile screenshots reviewed (no overlaps).

Stage Summary:
- Hero tools strip is now an orbital system: chips orbit a glowing core on tilted rings with front/back depth; mobile uses a single labeled ring + satellite dots.
- ToolsArc.tsx removed; ToolsOrbit.tsx is the component; data-testid="tools-orbit".

---
Task ID: 6
Agent: Main agent (Super Z)
Task: User reported flickering/not-smooth orbital animation; requested a single-page resume with 4 years of experience and GitHub/Email/LinkedIn as icon-only clickable links.

Work Log:
- Root-caused the flicker in ToolsOrbit v1: chips were reparented between gBack/gFront SVG groups twice per lap (appendChild = raster flash), plus per-frame SVG attribute writes (transform/opacity on every chip, ripple radius + drop-shadow filter on the core re-rasterized every frame).
- Rebuilt ToolsOrbit (flicker-free pipeline, same file/testid/geometry): static SVG (rings + halo) is never mutated after build; tool chips are HTML divs positioned with GPU-composited translate3d + will-change, living in ONE layer for their whole life — depth is done with a z-index band flip (back 20 / core 30 / front 40) at the ellipse's horizontal extremes where no overlap is visible, replacing DOM reparenting; the core (glow dot pulse + 2 radiating ripples) is pure CSS keyframes (transform/opacity only), no per-frame JS writes; opacity (0.58-1.0) and scale (0.82-1.0) stay continuous functions of sin(theta).
- Kept all previous behaviour: 12 tools on 3 tilted rings (26s/38s/52s laps), mobile single ring with 5 labeled chips + 2 satellite dots, no-duplicate-names, IntersectionObserver pause, ResizeObserver/fonts.ready rebuild, prefers-reduced-motion static composition.
- Single-page resume: scripts/render_brand_icons.js rasterizes GitHub/LinkedIn/Mail brand SVGs to transparent PNGs via Playwright (deviceScaleFactor 3); scripts/generate_resume_onepage.py (ReportLab, FreeSerif per pdf-skill resume brief) rebuilds the resume as ONE A4 page — 94% fill, 9pt font floor, "4 years of experience" bolded in the summary, and a custom IconLinks flowable drawing the 3 icons centred under the contact line wrapped in canvas.linkURL annotations (https://github.com/Ajay1Arun, https://www.linkedin.com/in/arun-wakekar, mailto:arun.wakekar10@gmail.com) — no URL text, icon-only as requested; replaced public/Arun_Wakekar_Resume.pdf in place (Hero/Navbar download buttons keep working, verified 200 application/pdf).
- Consistency: hero stat "Years Experience" bumped 3+ -> 4+ in portfolio-data.ts (experience Nov 2022 - present = 4 years).
- Verification (scripts/verify-orbit-header.js, Playwright): 27/27 PASS — header no-wrap at 7 widths (regression), 4+ stat in hero, orbit max move 12.0px/280ms with 0 jumps, ZERO childList mutations in the container (no reparent flicker), ZERO mutations in the SVG subtree (no per-frame attr writes), 12 unique chips, depth opacity 0.58..1.00, z-bands 20/40 active, 0 clipped chips, 3 ellipses, CSS core present (2 ripples + glow), no console/page errors; desktop + mobile screenshots reviewed. Resume self-check: pages=1, fill=94%, links=[github, linkedin, mailto]. tsc (src) + eslint clean; dev server 200.

Stage Summary:
- Orbit flicker eliminated by construction: no DOM churn, no per-frame SVG writes, GPU-composited chips, CSS-only core; measured smooth (12px/280ms, 0 jumps).
- Resume is now a single page with 4 years of experience and icon-only clickable GitHub/LinkedIn/Email links; regenerate via scripts/render_brand_icons.js + scripts/generate_resume_onepage.py if content changes.
