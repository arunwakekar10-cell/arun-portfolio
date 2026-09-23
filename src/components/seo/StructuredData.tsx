import { SITE_URL, SITE_DESCRIPTION } from "@/lib/site";
import {
  profile,
  certifications,
  skillCategories,
  education,
} from "@/lib/portfolio-data";
import { faqs } from "@/lib/faq-data";

// ============================================================
// JSON-LD structured data (schema.org @graph).
// Emits Person + WebSite + ProfilePage + FAQPage so Google rich
// results, answer engines (AEO) and generative engines (GEO) can
// understand the entity "Arun Wakekar" and cite it confidently.
// Server-rendered — always present in the raw HTML.
// ============================================================

export default function StructuredData() {
  const personId = `${SITE_URL}/#person`;
  const knowsAbout = Array.from(
    new Set(skillCategories.flatMap((category) => category.items)),
  );

  const graph = [
    {
      "@type": "Person",
      "@id": personId,
      name: profile.name,
      jobTitle: "QA & Test Automation Engineer",
      description: profile.tagline,
      url: `${SITE_URL}/`,
      image: `${SITE_URL}/opengraph-image`,
      email: `mailto:${profile.email}`,
      telephone: profile.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Chhatrapati Sambhajinagar",
        addressRegion: "Maharashtra",
        addressCountry: "IN",
      },
      sameAs: [profile.linkedin, profile.github],
      knowsAbout,
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: education.university,
      },
      hasCredential: certifications.map((certification) => ({
        "@type": "EducationalOccupationalCredential",
        name: certification.name,
        recognizedBy: {
          "@type": "Organization",
          name: certification.issuer,
        },
      })),
      worksFor: {
        "@type": "Organization",
        name: "Pagesuite India Pvt Ltd",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: "Arun Wakekar Portfolio",
      description: SITE_DESCRIPTION,
      inLanguage: "en",
      publisher: { "@id": personId },
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profilepage`,
      url: `${SITE_URL}/`,
      inLanguage: "en",
      mainEntity: { "@id": personId },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": graph,
        }),
      }}
    />
  );
}
