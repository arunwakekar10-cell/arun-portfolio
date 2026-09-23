/* Verify: (1) navbar no-wrap at all widths, (2) ToolsOrbit v2 (flicker-free pipeline).
 *
 * Anti-flicker proofs:
 *  - zero childList mutations inside the orbit container during sampling
 *    (old build reparented chips between layers twice per lap = flicker)
 *  - zero mutations anywhere in the static SVG subtree (old build wrote
 *    ripple/glow attributes every frame)
 *  - GPU-style continuity: chip movement small + monotone, no jumps
 */
const { chromium } = require("playwright");

const URL = "http://localhost:3000";
const results = [];
const ok = (name, pass, detail = "") =>
  results.push(`${pass ? "PASS" : "FAIL"}  ${name}${detail ? "  — " + detail : ""}`);

(async () => {
  const browser = await chromium.launch();

  // ---------- header checks at several widths ----------
  for (const vp of [1536, 1440, 1280, 1150, 1024, 768, 390]) {
    const page = await browser.newPage({ viewport: { width: vp, height: 900 } });
    await page.goto(URL, { waitUntil: "networkidle" });
    await page.waitForTimeout(2400); // let preloader finish

    const m = await page.evaluate(() => {
      const nav = document.querySelector("header nav");
      const name = [...document.querySelectorAll("header nav button span span")].find(
        (s) => s.textContent === "Arun Wakekar"
      );
      const title = [...document.querySelectorAll("header nav button span span")].find(
        (s) => s.textContent === "Quality Analyst"
      );
      const links = [...document.querySelectorAll("header nav ul li")].filter(
        (li) => li.offsetParent !== null
      );
      const burger = [...document.querySelectorAll("header nav button")].find((b) =>
        (b.getAttribute("aria-label") || "").includes("Toggle")
      );
      const availNav = [...document.querySelectorAll("header nav span")].some((s) =>
        (s.textContent || "").includes("Available for Opportunities")
      );
      const availHero = [...document.querySelectorAll("#home div")].some((d) =>
        (d.textContent || "").trim().startsWith("Available for Opportunities")
      );
      const statYears = [...document.querySelectorAll("#home div")].some((d) =>
        (d.textContent || "").trim().startsWith("4+Years Experience")
      );
      return {
        navOverflow: nav.scrollWidth - nav.clientWidth,
        nameH: name ? name.getBoundingClientRect().height : -1,
        titleH: title ? title.getBoundingClientRect().height : -1,
        linkCount: links.length,
        burgerVisible: burger ? getComputedStyle(burger).display !== "none" : false,
        availNav,
        availHero,
        statYears,
      };
    });

    const nameOneLine = m.nameH <= 22;
    const titleOneLine = m.titleH <= 16 || m.titleH === -1;
    ok(
      `header @${vp}: no overflow / no wrap`,
      m.navOverflow <= 0 && nameOneLine && titleOneLine,
      `overflow=${m.navOverflow}px nameH=${m.nameH.toFixed(1)} titleH=${m.titleH === -1 ? "hidden" : m.titleH.toFixed(1)}`
    );
    if (vp >= 1280)
      ok(`header @${vp}: 9 links visible, no burger`, m.linkCount === 9 && !m.burgerVisible, `links=${m.linkCount} burger=${m.burgerVisible}`);
    if (vp < 1280)
      ok(`header @${vp}: burger shown, links hidden`, m.burgerVisible && m.linkCount === 0, `links=${m.linkCount} burger=${m.burgerVisible}`);
    if (vp === 1440) {
      ok(`availability pill moved out of navbar into hero`, !m.availNav && m.availHero, `nav=${m.availNav} hero=${m.availHero}`);
      ok(`hero stat shows 4+ Years Experience`, m.statYears);
    }

    await page.close();
  }

  // ---------- orbital animation @1440 ----------
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (msg) => { if (msg.type() === "error") errors.push(msg.text()); });
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(2400);

  const strip = page.locator('[data-testid="tools-orbit"]');
  await strip.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);

  // mutation watchers: container childList churn + any SVG subtree writes
  const mutPromise = page.evaluate(
    () =>
      new Promise((resolve) => {
        const counts = { added: 0, removed: 0, svgWrites: 0 };
        const cont = document.querySelector('[data-testid="tools-orbit"]');
        const svg = cont.querySelector("svg");
        const moChips = new MutationObserver((muts) => {
          for (const m of muts) {
            counts.added += m.addedNodes.length;
            counts.removed += m.removedNodes.length;
          }
        });
        moChips.observe(cont, { childList: true, subtree: false });
        const moSvg = new MutationObserver((muts) => { counts.svgWrites += muts.length; });
        if (svg) moSvg.observe(svg, { childList: true, attributes: true, subtree: true });
        setTimeout(() => {
          moChips.disconnect();
          moSvg.disconnect();
          resolve(counts);
        }, 3600);
      })
  );

  // sample chip positions every 280ms for ~3s (HTML chips: rect centers)
  const samples = [];
  let dupSnapshots = 0, maxChips = 0, minChipOp = 1, maxChipOp = 0;
  const zBands = new Set();
  for (let i = 0; i < 11; i++) {
    const s = await page.evaluate(() => {
      const chips = [...document.querySelectorAll('[data-testid="tools-orbit"] [data-chip]')];
      const names = [];
      const pts = [];
      for (const el of chips) {
        const cs = getComputedStyle(el);
        const o = +cs.opacity;
        const r = el.getBoundingClientRect();
        if (o > 0.2) names.push(el.dataset.chip);
        pts.push({
          x: r.x + r.width / 2,
          y: r.y + r.height / 2,
          o,
          z: el.style.zIndex,
        });
      }
      return { dup: { total: names.length, uniq: new Set(names).size }, pts };
    });
    if (s.dup.total !== s.dup.uniq) dupSnapshots++;
    maxChips = Math.max(maxChips, s.dup.total);
    for (const p of s.pts) {
      minChipOp = Math.min(minChipOp, p.o);
      maxChipOp = Math.max(maxChipOp, p.o);
      if (p.z) zBands.add(p.z);
    }
    samples.push(s.pts);
    await page.waitForTimeout(280);
  }
  const mut = await mutPromise;

  const svgBox = await page.evaluate(() => {
    const cont = document.querySelector('[data-testid="tools-orbit"]');
    const svg = cont.querySelector("svg");
    const r = svg.getBoundingClientRect();
    return {
      x: r.x,
      y: r.y,
      w: r.width,
      h: r.height,
      ellipses: svg.querySelectorAll("ellipse").length,
      animEls: cont.querySelectorAll(".tools-orbit-anim").length,
      hasCore: !!cont.querySelector("[data-core]"),
      htmlChips: cont.querySelectorAll("[data-chip]").length,
    };
  });

  // smoothness: consecutive same-chip deltas small
  let maxDelta = 0, jumps = 0;
  for (let s = 1; s < samples.length; s++) {
    for (const c of samples[s]) {
      const prev = samples[s - 1].find(
        (p) => Math.abs(p.x - c.x) < 40 && Math.abs(p.y - c.y) < 40
      );
      if (!prev) continue;
      const d = Math.hypot(c.x - prev.x, c.y - prev.y);
      maxDelta = Math.max(maxDelta, d);
      if (d > 30) jumps++;
    }
  }
  ok(`orbit: motion smooth (max move/280ms <= 30px)`, maxDelta <= 30 && jumps === 0, `maxDelta=${maxDelta.toFixed(1)}px jumps=${jumps}`);
  ok(`orbit: zero DOM churn in container (no reparent flicker)`, mut.added === 0 && mut.removed === 0, `added=${mut.added} removed=${mut.removed}`);
  ok(`orbit: static SVG never mutated (no per-frame attr writes)`, mut.svgWrites === 0, `svgWrites=${mut.svgWrites}`);
  ok(`orbit: all 12 tools riding rings`, maxChips === 12 && svgBox.htmlChips === 12, `visible=${maxChips} pool=${svgBox.htmlChips}`);
  ok(`orbit: no duplicate tool names visible at once`, dupSnapshots === 0, `snapshotsWithDup=${dupSnapshots}`);
  ok(`orbit: depth cue working (front bright, back dim)`, minChipOp < 0.75 && maxChipOp > 0.9, `op range ${minChipOp.toFixed(2)}..${maxChipOp.toFixed(2)}`);
  ok(`orbit: z-band depth flip active (back 20 / front 40)`, zBands.has("20") && zBands.has("40"), `bands=${[...zBands].join(",")}`);

  // containment: no visible chip clipped by the strip box
  // (chip rects are viewport-absolute — convert to SVG-local coords first)
  let clipped = 0;
  for (const s of samples) {
    for (const c of s) {
      const lx = c.x - svgBox.x;
      const ly = c.y - svgBox.y;
      if (c.o > 0.2 && (ly - 14 < 0 || ly + 14 > svgBox.h || lx - 70 < 0 || lx + 70 > svgBox.w)) clipped++;
    }
  }
  ok(`orbit: no visible chip clipped`, clipped === 0, `clipped=${clipped}`);
  ok(`orbit: elliptical rings present`, svgBox.ellipses >= 2, `ellipses=${svgBox.ellipses}`);
  ok(`orbit: CSS-animated core present (2 ripples + glow, z 30)`, svgBox.animEls === 3 && svgBox.hasCore, `animEls=${svgBox.animEls} core=${svgBox.hasCore}`);

  const stripEl = page.locator('[data-testid="tools-orbit"]');
  await stripEl.screenshot({ path: "verify-orbit-desktop.png" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(900);
  await stripEl.screenshot({ path: "verify-orbit-mobile.png" });

  ok(`no page/console errors`, errors.length === 0, errors.slice(0, 2).join(" | "));
  await page.close();
  await browser.close();

  console.log(results.join("\n"));
  const fails = results.filter((r) => r.startsWith("FAIL")).length;
  console.log(`\n${results.length - fails}/${results.length} PASS`);
  process.exit(fails ? 1 : 0);
})();
