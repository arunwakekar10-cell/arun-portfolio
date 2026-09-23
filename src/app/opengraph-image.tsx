import { ImageResponse } from "next/og";
import { SITE_URL } from "@/lib/site";

export const alt =
  "Arun Wakekar — QA & Test Automation Engineer, ISTQB certified. Interactive portfolio featuring Selenium, Playwright and Appium skill visualisations.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const pills = ["Selenium", "Playwright", "Appium", "API Testing", "ISTQB CTFL"];
  const domain = SITE_URL.replace(/^https?:\/\//, "");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          padding: "72px 84px",
          background:
            "linear-gradient(135deg, #070b09 0%, #0a1712 55%, #0b241b 100%)",
          color: "#e8f0ec",
          fontFamily: "sans-serif",
        }}
      >
        {/* decorative orbit rings */}
        <div
          style={{
            position: "absolute",
            top: -190,
            right: -150,
            width: 540,
            height: 540,
            borderRadius: 540,
            border: "2px solid rgba(52,211,153,0.16)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -260,
            right: -120,
            width: 720,
            height: 720,
            borderRadius: 720,
            border: "1px solid rgba(52,211,153,0.10)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 96,
            right: 120,
            width: 22,
            height: 22,
            borderRadius: 22,
            background: "rgba(52,211,153,0.85)",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            fontSize: 24,
            fontWeight: 600,
            letterSpacing: 6,
            color: "#34d399",
            textTransform: "uppercase",
          }}
        >
          QA · Test Automation · ISTQB Certified
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 92,
            fontWeight: 800,
            marginTop: 18,
            color: "#e8f0ec",
          }}
        >
          Arun Wakekar
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "#8ba39a",
            marginTop: 10,
          }}
        >
          Quality Analyst · 4+ years · Web / Mobile / API testing
        </div>

        <div style={{ display: "flex", marginTop: 40 }}>
          {pills.map((p) => (
            <div
              key={p}
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid rgba(52,211,153,0.45)",
                borderRadius: 999,
                padding: "10px 24px",
                fontSize: 24,
                color: "#34d399",
                marginRight: 16,
              }}
            >
              {p}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginTop: 52,
            fontSize: 24,
            color: "#5f7a6f",
          }}
        >
          <div style={{ display: "flex" }}>{domain}</div>
          <div style={{ display: "flex", color: "#34d399" }}>
            Available for Opportunities
          </div>
        </div>
      </div>
    ),
    size,
  );
}
