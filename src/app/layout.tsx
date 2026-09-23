import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Base for every absolute URL Next generates (canonical, og:url, sitemap…)
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Portfolio`,
    template: "%s | Arun Wakekar",
  },
  description: SITE_DESCRIPTION,
  applicationName: "Arun Wakekar Portfolio",
  authors: [{ name: "Arun Wakekar", url: SITE_URL }],
  creator: "Arun Wakekar",
  publisher: "Arun Wakekar",
  category: "technology",
  keywords: [
    "Arun Wakekar",
    "Arun Wakekar QA",
    "QA Engineer",
    "Quality Analyst",
    "Test Automation Engineer",
    "SDET",
    "QA Automation Portfolio",
    "Selenium",
    "Playwright",
    "Appium",
    "TestSigma",
    "Postman",
    "API Testing",
    "Mobile Testing",
    "ISTQB",
    "ISTQB CTFL v4.0",
    "Software Testing India",
    "Chhatrapati Sambhajinagar",
  ],
  // ── Canonical URL (the "chronical") ────────────────────────────
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Arun Wakekar Portfolio",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Optional: set these env vars after registering with the
  // search consoles, then redeploy — the meta tags appear only if set.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
};

export const viewport: Viewport = {
  themeColor: "#070b09",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
