import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Traditional search engines are covered by the "*" rule.
// The explicit list below is for GEO (Generative Engine Optimization):
// it Welcomes the AI / answer-engine crawlers (ChatGPT, Claude,
// Perplexity, Gemini, Apple Intelligence, Meta AI, ...) so the site can
// be quoted and cited by AI answers.
const AI_CRAWLERS = [
  "GPTBot", // OpenAI (model training)
  "OAI-SearchBot", // ChatGPT Search
  "ChatGPT-User", // ChatGPT user-initiated browsing
  "ClaudeBot", // Anthropic
  "PerplexityBot", // Perplexity
  "Perplexity-User", // Perplexity user-initiated
  "Google-Extended", // Gemini / AI Overviews grounding
  "Applebot-Extended", // Apple Intelligence
  "CCBot", // Common Crawl (feeds many LLMs)
  "Bytespider", // ByteDance
  "meta-externalagent", // Meta AI
  "Amazonbot", // Alexa
  "YouBot", // You.com
  "Diffbot", // Diffbot
  "cohere-ai", // Cohere
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_CRAWLERS, allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
