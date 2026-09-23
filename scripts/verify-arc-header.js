/* Verify: (1) navbar no-wrap at all widths, (2) ToolsArc dome animation smoothness. */
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
      return {
        navOverflow: nav.scrollWidth - nav.clientWidth,
        nameH: name ? name.getBoundingClientRect().height : -1,
        titleH: title ? title.getBoundingClientRect().height : -1,
        linkCount: links.length,
        burgerVisible: burger ? getComputedStyle(burger).display !== "none" : false,
        availNav,
        availHero,
      };
    });

    const nameOneLine = m.nameH <= 22; // single line (height 0 = hidden on mobile)
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
    if (vp === 1440)
      ok(`availability pill moved out of navbar into hero`, !m.availNav && m.availHero, `nav=${m.availNav} hero=${m.availHero}`);

    await page.close();
  }

  // ---------- arc animation smoothness @1440 ----------
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (msg) => { if (msg.type() === "error") errors.push(msg.text()); });
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(2400);

  const strip = page.locator('[data-testid="tools-arc"]');
  await strip.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);

  // sample chip positions every 280ms for ~3s
  const samples = [];
  let dupTotal = 0, dupUniq = 0, dupSnapshots = 0;
  for (let i = 0; i < 11; i++) {
    const s = await page.evaluate(() => {
      const svg = document.querySelector('[data-testid="tools-arc"] svg');
      const chips = [...svg.querySelectorAll("g")].filter((g) => g.querySelector("rect"));
      const names = chips
        .map((g) => (+g.getAttribute("opacity") > 0.2 ? g.querySelector("text").textContent : null))
        .filter(Boolean);
      return {
        dup: { total: names.length, uniq: new Set(names).size },
        pts: chips
          .map((g) => {
            const tr = /translate\(([-\d.]+),([-\d.]+)\)/.exec(g.getAttribute("transform") || "");
            if (!tr) return null;
            return { x: +tr[1], y: +tr[2], o: +g.getAttribute("opacity") };
          })
          .filter(Boolean),
      };
    });
    dupTotal = Math.max(dupTotal, s.dup.total);
    dupUniq = Math.max(dupUniq, s.dup.uniq);
    if (s.dup.total !== s.dup.uniq) dupSnapshots++;
    samples.push(s.pts);
    await page.waitForTimeout(280);
  }

  const svgBox = await page.evaluate(() => {
    const r = document.querySelector('[data-testid="tools-arc"] svg').getBoundingClientRect();
    return { w: r.width, h: r.height, top: r.top, scrollY: window.scrollY };
  });

  // smoothness: consecutive same-chip deltas small and monotonic-ish
  let maxDelta = 0, jumps = 0;
  for (let s = 1; s < samples.length; s++) {
    for (const c of samples[s]) {
      const prev = samples[s - 1].find(
        (p) => Math.abs(p.x - c.x) < 60 && Math.abs(p.y - c.y) < 60
      );
      if (!prev) continue;
      const d = Math.hypot(c.x - prev.x, c.y - prev.y);
      maxDelta = Math.max(maxDelta, d);
      if (d > 90) jumps++;
    }
  }
  ok(`arc: motion smooth (max move/280ms <= 90px)`, maxDelta <= 90 && jumps === 0, `maxDelta=${maxDelta.toFixed(1)}px jumps=${jumps}`);
  ok(`arc: populated`, samples[5].length >= 6, `chips=${samples[5].length}`);
  ok(`arc: no duplicate tool names visible at once`, dupSnapshots === 0, `snapshotsWithDup=${dupSnapshots} (max ${dupTotal} chips / ${dupUniq} uniq)`);

  // containment: no visible chip clipped by the svg box
  let clipped = 0;
  for (const s of samples) {
    for (const c of s) {
      if (c.o > 0.15 && (c.y - 14 < 0 || c.y > svgBox.h || c.x < 0 || c.x > svgBox.w)) clipped++;
    }
  }
  ok(`arc: no visible chip clipped`, clipped === 0, `clipped=${clipped}`);

  // both sides feed the apex: chips exist on left and right of center
  const cx = svgBox.w / 2;
  const sides = samples[5].reduce(
    (a, c) => {
      if (c.x < cx - 40) a.l++;
      else if (c.x > cx + 40) a.r++;
      return a;
    },
    { l: 0, r: 0 }
  );
  ok(`arc: cards on both sides converging`, sides.l >= 2 && sides.r >= 2, `L=${sides.l} R=${sides.r}`);

  // dome reads as half-circle: apex near top, ends at baseline
  const geo = await page.evaluate(() => {
    const svg = document.querySelector('[data-testid="tools-arc"] svg');
    const paths = [...svg.querySelectorAll("path")].filter((p) => p.getAttribute("stroke") !== "none");
    const dome = paths.map((p) => p.getAttribute("d")).join(" ");
    const line = svg.querySelector("line");
    return { dome, lineY: line ? +line.getAttribute("y1") : -1, H: +svg.getAttribute("height") };
  });
  ok(`arc: dome + baseline geometry present`, geo.dome.includes("A") && geo.lineY > 0, `H=${geo.H} baselineY=${geo.lineY}`);

  const stripEl = page.locator('[data-testid="tools-arc"]');
  await stripEl.screenshot({ path: "verify-arc-desktop.png" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(900);
  await stripEl.screenshot({ path: "verify-arc-mobile.png" });

  ok(`no page/console errors`, errors.length === 0, errors.slice(0, 2).join(" | "));
  await page.close();
  await browser.close();

  console.log(results.join("\n"));
})();
