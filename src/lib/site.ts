// ============================================================
// Site identity — single source of truth for SEO URLs.
//
// Every canonical URL, the sitemap, robots.txt and the Open Graph
// tags are derived from SITE_URL.
//
// HOW TO SET IT:
//   - Local (VS Code): create .env.local with
//       NEXT_PUBLIC_SITE_URL=https://www.arunwakekar.in
//   - Production (Vercel / host): add the same env var in
//     Settings → Environment Variables, then redeploy.
//
// The value must match EXACTLY what visitors see in the address
// bar (https, www or non-www — pick one and stick to it).
// ============================================================

function normalize(url: string): string {
  return url.trim().replace(/\/+$/, "");
}

const raw =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.VERCEL_PROJECT_PRODUCTION_URL ??
  "https://www.arunwakekar.in";

export const SITE_URL = normalize(
  raw.startsWith("http") ? raw : `https://${raw}`,
);

export const SITE_NAME = "Arun Wakekar — QA & Test Automation Engineer";

export const SITE_DESCRIPTION =
  "ISTQB-certified QA & Test Automation Engineer with 4+ years of experience in Selenium, Playwright, Appium and API testing. Open to opportunities — India.";

export const RESUME_PATH = "/Arun_Wakekar_Resume.pdf";
