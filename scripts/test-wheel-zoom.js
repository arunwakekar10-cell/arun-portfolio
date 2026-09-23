/* Trusted (real) wheel-event zoom test for the QA Toolkit Network.
 * Uses global playwright + cached chromium against localhost:3000. */
const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await page.waitForTimeout(3200); // let preloader finish

  const container = page.locator('[data-testid="skill-network"]');
  await container.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);

  const box = await container.boundingBox();
  const cx = box.x + box.width / 2;
  const cy = box.y + box.height / 2;
  await page.mouse.move(cx, cy);

  const getTransform = () =>
    page.evaluate(() => {
      const g = document.querySelector('[data-testid="skill-network"] svg > g');
      return g ? g.getAttribute("transform") : null;
    });
  const getScrollY = () => page.evaluate(() => window.scrollY);

  const t0 = await getTransform();
  const s0 = await getScrollY();

  // wheel DOWN (trusted) => expect zoom OUT
  await page.mouse.wheel(0, 320);
  await page.waitForTimeout(700);
  const t1 = await getTransform();
  const s1 = await getScrollY();

  // wheel UP (trusted) => expect zoom IN
  await page.mouse.wheel(0, -640);
  await page.waitForTimeout(700);
  const t2 = await getTransform();
  const s2 = await getScrollY();

  console.log(JSON.stringify({ t0, t1, t2, s0, s1, s2 }, null, 2));

  const changed1 = t0 !== t1;
  const changed2 = t1 !== t2;
  console.log("wheel-down zoomed:", changed1);
  console.log("wheel-up zoomed:", changed2);
  console.log("page-scroll after wheel-down:", s1 - s0, "(should be ~0 if d3 preventDefault worked)");

  await page.screenshot({ path: "/home/z/my-project/verify-wheel-zoom.png" });
  await browser.close();

  if (!changed1 || !changed2) {
    console.error("FAIL: trusted wheel did not zoom");
    process.exit(1);
  }
  console.log("PASS: trusted wheel zoom in/out works");
})();
