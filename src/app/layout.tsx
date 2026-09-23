import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arun Wakekar — Quality Analyst | QA Automation Portfolio",
  description:
    "Portfolio of Arun Wakekar, Quality Analyst specializing in test automation with Selenium, Appium, Playwright, JavaScript and TypeScript. Featuring interactive D3.js visualizations of skills, career timeline and testing focus.",
  keywords: [
    "Arun Wakekar",
    "Quality Analyst",
    "QA Automation",
    "Selenium",
    "Appium",
    "Playwright",
    "D3.js",
    "Software Testing",
    "Portfolio",
  ],
  authors: [{ name: "Arun Wakekar" }],
  icons: {
    icon: "employee.svg",
  },
  openGraph: {
    title: "Arun Wakekar — Quality Analyst",
    description:
      "Engineering quality through intelligent automation. Interactive D3.js portfolio.",
    siteName: "Arun Wakekar Portfolio",
    type: "website",
  },
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
