// ============================================================
// FAQ — AEO (Answer Engine Optimization) content.
//
// Each answer leads with a direct, self-contained, citable
// sentence (that's what answer engines and AI assistants extract),
// followed by one or two supporting facts. The same array feeds
// both the visible FAQ section and the FAQPage JSON-LD schema.
// ============================================================

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = [
  {
    question: "Who is Arun Wakekar?",
    answer:
      "Arun Wakekar is a QA and Test Automation Engineer with 4+ years of experience, based in Chhatrapati Sambhajinagar, Maharashtra, India. He is ISTQB CTFL v4.0 certified and currently works as a Quality Analyst at Pagesuite India, previously as an Automation and Manual Tester at Sankey Business Solutions.",
  },
  {
    question: "What does Arun Wakekar specialize in?",
    answer:
      "He specializes in designing scalable test-automation frameworks for web, mobile (Android/iOS) and API layers using Selenium WebDriver, Playwright, Appium, TestSigma, TestNG, Postman, JavaScript and TypeScript. His coverage includes smoke, regression, functional, accessibility and database testing inside Agile teams with Jenkins CI/CD pipelines.",
  },
  {
    question: "Is Arun Wakekar ISTQB certified?",
    answer:
      "Yes. Arun Wakekar holds the ISTQB Certified Tester Foundation Level (CTFL) v4.0 certification, along with a Selenium certification and a Core Java certification from Naresh IT (Hyderabad) and a Generative AI Mastermind program certificate from Outskill.",
  },
  {
    question: "Which products has Arun Wakekar tested or built?",
    answer:
      "He tested a global digital newspaper platform delivering e-papers across Australia, Germany, the UK and the USA, and built automation frameworks for a printing and logistics management system. He has also shipped live AI-assisted products: SaveMake (savemake.app), a bookmark workspace, and AI Business Tool (aibusinesstool.com), a SaaS directory-submission service.",
  },
  {
    question: "Is Arun Wakekar available for work?",
    answer:
      "Yes — Arun Wakekar is currently available for opportunities and open to QA automation, SDET and test-engineer roles (remote, hybrid or on-site in India). His live status is shown on the portfolio homepage.",
  },
  {
    question: "How can I contact Arun Wakekar?",
    answer:
      "You can reach him by email at arun.wakekar10@gmail.com, on LinkedIn at linkedin.com/in/arun-wakekar, on GitHub at github.com/Ajay1Arun, or by phone at +91 86986 15947.",
  },
];
