/* ------------------------------------------------------------------ */
/* Real portfolio data — Arun Wakekar, Quality Analyst                 */
/* ------------------------------------------------------------------ */

export const PROFILE = {
  initials: "AW",
  name: "Arun Wakekar",
  role: "Quality Analyst",
  availability: "Available for Opportunities",
  location: "Chhatrapati Sambhajinagar, Maharashtra, India",
  phone: "+91 8698615947",
  phoneHref: "tel:8698615947",
  email: "arun.wakekar10@gmail.com",
  emailHref: "mailto:arun.wakekar10@gmail.com",
  linkedin: "https://www.linkedin.com/in/arun-wakekar-168a3b326/",
  linkedinLabel: "Arun Wakekar",
  github: "https://github.com/arunwakekar10-cell",
  githubLabel: "Ajay1Arun",
  intro:
    "Experienced QA professional with expertise in automation and manual testing. Specialized in Selenium, Appium, Playwright, and TestSigma with a proven track record of delivering high-quality software across web and mobile platforms."
};

export const STATS = [
  { value: "3+", label: "Years Experience" },
  { value: "14+", label: "Testing Tools" },
  { value: "4+", label: "Certifications" },
  { value: "5+", label: "Major Projects" }
];

export interface Job {
  title: string;
  company: string;
  period: string;
  location: string;
  points: string[];
}

export const EXPERIENCE: Job[] = [
  {
    title: "Quality Analyst",
    company: "Pagesuite India Pvt Ltd",
    period: "Sep 2024 – Present",
    location: "India",
    points: [
      "Conducted extensive functional and regression testing on the e-paper, magazine, and article modules.",
      "Ensured seamless user experience by validating core functionalities such as bookmarking articles, sharing articles, and managing editions.",
      "Developed and executed automation scripts using TestSigma, Selenium, and Appium to streamline testing processes.",
      "Performed smoke testing to validate builds and ensure application stability for daily releases.",
      "Used Google Analytics and Charles Proxy to monitor user behavior and debug issues related to user interactions and API calls.",
      "Tested iOS applications using TestFlight builds and provided detailed reports on app performance and compatibility.",
      "Utilized BrowserStack to perform manual testing across different browsers and ensure consistent application behavior.",
      "Played a key role in identifying and reporting critical issues in daily newspaper apps and web portals."
    ]
  },
  {
    title: "Automation and Manual Tester",
    company: "Sankey Business Solutions Pvt Ltd",
    period: "Nov 2022 – Sep 2024",
    location: "India",
    points: [
      "Designed and implemented automation testing frameworks for the Printing and Logistics Domain.",
      "Functional testing on Web-Application.",
      "Monitored operating environment, applied performance tuning, and developed capacity plans for testing.",
      "Actively participated in all phases of product testing, including planning and delivery recommendations on mobile applications & web.",
      "Led testing efforts for print management software, ensuring accurate and efficient document processing.",
      "Collaborated with logistics teams to validate software solutions that optimize supply chain processes."
    ]
  }
];

export const MARQUEE_SKILLS = [
  "Selenium", "Appium", "Playwright", "PostgreSQL", "MySQL", "Java",
  "TypeScript", "Python (Basic)", "JavaScript", "Cucumber", "Jira",
  "Postman", "Jenkins", "Git", "TestNG"
];

export interface SkillGroup {
  title: string;
  icon: string;
  color: string;
  items: string[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Testing Expertise",
    icon: "🧪",
    color: "#22d3ee",
    items: [
      "Android Testing", "Accessibility", "iOS Testing", "Web Portal Testing",
      "Smoke Testing", "Regression Testing", "Test Case Design & Execution",
      "API Testing", "Functional Testing"
    ]
  },
  {
    title: "Automation Tools",
    icon: "🤖",
    color: "#a855f7",
    items: [
      "Selenium WebDriver", "Appium", "Playwright", "TestSigma",
      "TestNG", "Maven", "JUnit", "Selenium Grid"
    ]
  },
  {
    title: "Programming & Frameworks",
    icon: "⌨️",
    color: "#3b82f6",
    items: [
      "Java", "BDD (Cucumber)", "TypeScript", "JavaScript", "Python (Basic)",
      "Data-Driven Framework", "Modular Framework", "Hybrid Framework"
    ]
  },
  {
    title: "Tools & Platforms",
    icon: "🛠️",
    color: "#f59e0b",
    items: [
      "Jira", "Google Analytics", "Confluence", "JMeter",
      "Charles Proxy", "TestFlight", "BrowserStack", "Postman"
    ]
  },
  {
    title: "Database & CI/CD",
    icon: "🗄️",
    color: "#10b981",
    items: [
      "SQL Queries", "Database Testing", "PostgreSQL", "MySQL",
      "CI/CD Pipelines", "Jenkins Integration", "Git"
    ]
  },
  {
    title: "Methodologies",
    icon: "🧭",
    color: "#f472b6",
    items: [
      "Agile Methodology", "Functional", "Non-functional", "Integration",
      "Acceptance", "Performance", "Cross-Functional Collaboration",
      "Team Leadership", "Mentoring"
    ]
  }
];

export const EDUCATION = {
  degree: "Bachelor of Engineering (B.E)",
  university: "Savitribai Phule Pune University",
  college: "Sir Visvesvaraya Institute of Technology, Nashik",
  year: "Class of 2020"
};

export interface Cert {
  title: string;
  issuer: string;
  note?: string;
  color: string;
}

export const CERTIFICATIONS: Cert[] = [
  {
    title: "Certified Tester Foundation Level (CTFL) v4.0",
    issuer: "ISTQB®",
    note: "ISTQB — the leading global certification scheme in the field of software testing.",
    color: "#22d3ee"
  },
  {
    title: "Selenium Certification",
    issuer: "Naresh IT (Hyderabad)",
    color: "#59B943"
  },
  {
    title: "Core Java Certification",
    issuer: "Naresh IT (Hyderabad)",
    color: "#f59e0b"
  },
  {
    title: "Generative AI Mastermind",
    issuer: "Outskill",
    note: "Hands-on program covering Generative AI fundamentals, practical applications, and AI-powered automation for real-world use cases.",
    color: "#a855f7"
  }
];

export interface RoleCard {
  title: string;
  icon: string;
  color: string;
  points: string[];
}

export const ROLES: RoleCard[] = [
  {
    title: "Test Documentation",
    icon: "📝",
    color: "#22d3ee",
    points: [
      "Writing, reviewing, and executing test cases as per functional specifications",
      "Devising all artifacts of testing such as Test Scenarios, Test Cases, Defect Reports, and Test Summary reports"
    ]
  },
  {
    title: "Database Testing",
    icon: "🗃️",
    color: "#10b981",
    points: [
      "Used/created SQL queries to perform database testing of the application",
      "Validating data integrity and consistency across systems"
    ]
  },
  {
    title: "Functional Testing",
    icon: "⚙️",
    color: "#3b82f6",
    points: [
      "Performed functional testing, integrity testing, retesting, and regression testing",
      "Responsible for performing Smoke & Sanity, and Exploratory Testing"
    ]
  },
  {
    title: "Selenium Automation",
    icon: "🤖",
    color: "#59B943",
    points: [
      "Strong experience in automating web application testing using Selenium WebDriver with TestNG framework",
      "Writing test cases using element locators, WebDriver methods, Java programming features, and TestNG annotations",
      "Experience in data-driven testing, cross-browser testing, and parallel test execution"
    ]
  },
  {
    title: "API Testing",
    icon: "🔌",
    color: "#FF6C37",
    points: [
      "Performed API testing to validate functional requirements",
      "Validating RESTful APIs using Postman"
    ]
  },
  {
    title: "Test Execution & Reporting",
    icon: "📊",
    color: "#f472b6",
    points: [
      "Sending test execution reports on a daily and weekly basis",
      "Executing Selenium test cases and reporting defects",
      "Performed regression testing to validate resolved defects on every build"
    ]
  }
];

export interface Project {
  title: string;
  domain: string;
  platforms: string[];
  description: string;
  highlightsTitle: string;
  highlights: string[];
  modules?: { name: string; desc: string }[];
  tech: string[];
  accent: string;
}

export const PROJECTS: Project[] = [
  {
    title: "Global Digital Newspaper Platform",
    domain: "News & Media Domain",
    platforms: ["Android", "iOS", "Web"],
    description:
      "Worked on a global digital newspaper platform encompassing regional newspapers from Australia, Germany, UK, and USA, delivering e-papers, magazines, and articles to a diverse user base.",
    highlightsTitle: "Key Highlights",
    highlights: [
      "Validated essential features such as bookmarking articles, sharing content, and managing multiple editions",
      "Conducted extensive accessibility testing for compatibility with different devices, browsers, and versions",
      "Utilized BrowserStack to simulate various environments and user scenarios",
      "Implemented automation scripts using Selenium, Appium, and TestSigma",
      "Used Google Analytics and Charles Proxy to debug and monitor real-time user interactions",
      "Tested iOS TestFlight builds for pre-release validation",
      "Performed smoke and regression testing under Agile methodologies with CI/CD integration"
    ],
    tech: ["Selenium", "Appium", "TestSigma", "BrowserStack", "Google Analytics", "Charles Proxy", "TestFlight"],
    accent: "#22d3ee"
  },
  {
    title: "Printing & Fleet Management System",
    domain: "Printing & Logistics Domain",
    platforms: ["Web"],
    description:
      "Designed and implemented automation testing frameworks for a comprehensive Printing and Logistics management solution.",
    highlightsTitle: "Tested Modules",
    highlights: [],
    modules: [
      { name: "Order Processing", desc: "Order entry validation, status tracking, and order accuracy verification" },
      { name: "Print Job Management", desc: "Print job specifications, completeness of print data, and workflow validation" },
      { name: "Inventory Management", desc: "Inventory levels accuracy, stock replenishment, and reporting" },
      { name: "Shipping & Distribution", desc: "Shipping order accuracy, label generation, and distribution routes" },
      { name: "Quality Control", desc: "Print inspection, color accuracy, and adherence to industry standards" },
      { name: "Supplier Management", desc: "Supplier data, contracts, and procurement coordination" },
      { name: "Customer Communication", desc: "Order updates, delivery notifications, and customer data validation" },
      { name: "Regulatory Compliance", desc: "Compliance with printing regulations and environmental standards" }
    ],
    tech: ["Selenium", "Appium", "Cucumber BDD", "Jenkins", "Jira", "Postman"],
    accent: "#a855f7"
  }
];

/* ------------------------------------------------------------------ */
/* AI-Powered Development — projects built with AI assistance          */
/* ------------------------------------------------------------------ */

export interface AIProject {
  title: string;
  tagline: string;
  status: "Live" | "In Progress" | "Concept";
  description: string;
  aiTools: string[];   // AI assistants used
  stack: string[];     // tech stack
  link?: string;       // demo / repo url (optional)
  icon: string;
  accent: string;
}

export const AI_DEV_INTRO = {
  kicker: "Beyond Testing",
  title: "AI-Powered Development",
  sub: "QA expertise meets Generative AI — building real tools and apps with AI pair-programming assistants.",
  pitch:
    "Certified in Generative AI (Outskill), I use AI assistants as pair programmers to design, build, and ship development projects — bringing a tester's eye for quality into everything I create."
};

export const AI_WORKFLOW = [
  { step: "01", title: "Ideate", desc: "Define the problem and prompt-engineer the solution architecture with AI", icon: "💡" },
  { step: "02", title: "Build", desc: "AI pair-programming for rapid development — code generation, refactoring, debugging", icon: "⚡" },
  { step: "03", title: "Test", desc: "QA discipline applied: automation scripts, edge cases, and AI-generated test suites", icon: "🧪" },
  { step: "04", title: "Ship", desc: "CI/CD deployment with AI-assisted code review and documentation", icon: "🚀" }
];

export const AI_PROJECTS: AIProject[] = [
  {
    title: "3D Interactive Portfolio Website",
    tagline: "This very website — built with AI assistance",
    status: "Live",
    description:
      "A horizontally-scrolling portfolio with a real-time 3D AI cube, holographic rings, orbiting tech cards, and neon connection lines — designed, coded, and refined through AI pair-programming.",
    aiTools: ["Claude", "ChatGPT"],
    stack: ["React", "TypeScript", "Three.js", "React Three Fiber", "Framer Motion", "GSAP"],
    icon: "🧊",
    accent: "#22d3ee"
  },
  {
    title: "Self-Healing Automation Scripts",
    tagline: "AI-assisted locator recovery for Selenium suites",
    status: "In Progress",
    description:
      "Experimenting with AI-driven element-locator healing: when the DOM changes and locators break, the framework suggests and validates replacement locators automatically.",
    aiTools: ["Claude", "GitHub Copilot"],
    stack: ["Java", "Selenium WebDriver", "TestNG"],
    icon: "🔧",
    accent: "#10b981"
  },
  {
    title: "My Next AI Project",
    tagline: "Coming soon — currently in the lab",
    status: "Concept",
    description:
      "A new AI-assisted development project is in the works. This space will soon feature an app, bot, or automation tool built end-to-end with an AI pair programmer — stay tuned.",
    aiTools: ["AI Pair Programming"],
    stack: ["Coming Soon"],
    icon: "✨",
    accent: "#f59e0b"
  }
];

export const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "roles", label: "Roles" },
  { id: "projects", label: "Projects" },
  { id: "aidev", label: "AI Dev" },
  { id: "contact", label: "Contact" }
];
