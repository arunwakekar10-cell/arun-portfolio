// ============================================================
// Portfolio data — sourced from https://www.arunwakekar.in/
// ============================================================

export const profile = {
  initials: "AW",
  name: "Arun Wakekar",
  title: "Quality Analyst",
  tagline:
    "Engineering quality through intelligent automation. I design scalable test frameworks, automate complex business workflows, and deliver reliable web, mobile, and API testing solutions using Playwright, Selenium, Appium, JavaScript, and TypeScript — helping teams release faster with confidence.",
  phone: "+91 8698615947",
  phoneHref: "tel:+918698615947",
  email: "arun.wakekar10@gmail.com",
  linkedin: "https://www.linkedin.com/in/arun-wakekar",
  github: "https://github.com/Ajay1Arun",
  location: "Chhatrapati Sambhajinagar, Maharashtra, India",
  availability: "Available for Opportunities",
};

export const stats = [
  { value: 4, suffix: "+", label: "Years Experience" },
  { value: 14, suffix: "+", label: "Testing Tools" },
  { value: 4, suffix: "+", label: "Certifications" },
  { value: 5, suffix: "+", label: "Major Projects" },
];

export const heroTools = [
  "Selenium",
  "Playwright",
  "TypeScript",
  "JavaScript",
  "Appium",
  "Postman",
  "JIRA",
  "Cucumber",
  "Allure Report",
  "Extent Report",
  "TestNG",
  "Jenkins",
];

// ---------------- Experience ----------------

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  start: string; // ISO-ish for the timeline chart
  end: string;
  location: string;
  bullets: string[];
}

export const experience: ExperienceItem[] = [
  {
    role: "Quality Analyst",
    company: "Pagesuite India Pvt Ltd",
    period: "Sep 2024 – Present",
    start: "2024-09-01",
    end: "2026-09-19",
    location: "India",
    bullets: [
      "Conducted extensive functional and regression testing on the e-paper, magazine, and article modules.",
      "Ensured seamless user experience by validating core functionalities such as bookmarking articles, sharing articles, and managing editions.",
      "Developed and executed automation scripts using TestSigma, Selenium, and Appium to streamline testing processes.",
      "Performed smoke testing to validate builds and ensure application stability for daily releases.",
      "Used Google Analytics and Charles Proxy to monitor user behavior and debug issues related to user interactions and API calls.",
      "Tested iOS applications using TestFlight builds and provided detailed reports on app performance and compatibility.",
      "Utilized BrowserStack to perform manual testing across different browsers and ensure consistent application behavior.",
      "Played a key role in identifying and reporting critical issues in daily newspaper apps and web portals.",
    ],
  },
  {
    role: "Automation and Manual Tester",
    company: "Sankey Business Solutions Pvt Ltd",
    period: "Nov 2022 – Sep 2024",
    start: "2022-11-01",
    end: "2024-09-01",
    location: "India",
    bullets: [
      "Designed and implemented automation testing frameworks for the Printing and Logistics Domain.",
      "Functional testing on Web-Application.",
      "Monitored operating environment, applied performance tuning, and developed capacity plans for testing.",
      "Actively participated in all phases of product testing, including planning and delivery recommendations on mobile applications & web.",
      "Led testing efforts for print management software, ensuring accurate and efficient document processing.",
      "Collaborated with logistics teams to validate software solutions that optimize supply chain processes.",
    ],
  },
];

// ---------------- Skills ----------------

export interface SkillCategory {
  emoji: string;
  title: string;
  items: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    emoji: "🧪",
    title: "Testing Expertise",
    items: [
      "Android Testing",
      "Accessibility",
      "iOS Testing",
      "Web Portal Testing",
      "Smoke Testing",
      "Regression Testing",
      "Test Case Design & Execution",
      "API Testing",
      "Functional Testing",
    ],
  },
  {
    emoji: "🤖",
    title: "Automation Tools",
    items: [
      "Selenium WebDriver",
      "Appium",
      "Playwright",
      "TestSigma",
      "TestNG",
      "Maven",
      "JUnit",
      "Selenium Grid",
    ],
  },
  {
    emoji: "⌨️",
    title: "Programming & Frameworks",
    items: [
      "Java",
      "BDD (Cucumber)",
      "TypeScript",
      "JavaScript",
      "Python (Basic)",
      "Data-Driven Framework",
      "Modular Framework",
      "Hybrid Framework",
    ],
  },
  {
    emoji: "🛠️",
    title: "Tools & Platforms",
    items: [
      "Jira",
      "Google Analytics",
      "Confluence",
      "JMeter",
      "Charles Proxy",
      "TestFlight",
      "BrowserStack",
      "Postman",
    ],
  },
  {
    emoji: "🗄️",
    title: "Database & CI/CD",
    items: [
      "SQL Queries",
      "Database Testing",
      "PostgreSQL",
      "MySQL",
      "CI/CD Pipelines",
      "Jenkins Integration",
      "Git",
    ],
  },
  {
    emoji: "🧭",
    title: "Methodologies",
    items: [
      "Agile Methodology",
      "Functional",
      "Non-functional",
      "Integration",
      "Acceptance",
      "Performance",
      "Cross-Functional Collaboration",
      "Team Leadership",
      "Mentoring",
    ],
  },
];

// ---------------- D3: Radar ----------------

export const radarSkills = [
  { axis: "Test Automation", value: 92 },
  { axis: "Web Testing", value: 90 },
  { axis: "QA Strategy", value: 88 },
  { axis: "API Testing", value: 85 },
  { axis: "Mobile Testing", value: 82 },
  { axis: "Database", value: 78 },
  { axis: "CI/CD", value: 74 },
  { axis: "Performance", value: 66 },
];

// ---------------- D3: Skill Network ----------------

export interface NetworkDatum {
  categories: {
    name: string;
    color: string;
    skills: string[];
  }[];
}

export const networkData: NetworkDatum = {
  categories: [
    {
      name: "Automation",
      color: "#34d399",
      skills: [
        "Selenium WebDriver",
        "Appium",
        "Playwright",
        "TestSigma",
        "TestNG",
        "Maven",
        "JUnit",
        "Selenium Grid",
      ],
    },
    {
      name: "Programming",
      color: "#fbbf24",
      skills: ["Java", "JavaScript", "TypeScript", "Python", "Cucumber BDD"],
    },
    {
      name: "Tools & Platforms",
      color: "#5eead4",
      skills: [
        "Jira",
        "Postman",
        "JMeter",
        "Charles Proxy",
        "BrowserStack",
        "TestFlight",
        "Confluence",
        "Google Analytics",
      ],
    },
    {
      name: "Data & CI/CD",
      color: "#fb923c",
      skills: ["SQL", "PostgreSQL", "MySQL", "Jenkins", "Git"],
    },
    {
      name: "Testing Types",
      color: "#fb7185",
      skills: [
        "Functional",
        "Regression",
        "Smoke",
        "Accessibility",
        "Performance",
        "Integration",
      ],
    },
  ],
};

// ---------------- D3: Testing effort donut ----------------

export const domainDistribution = [
  { label: "Web Automation", value: 30 },
  { label: "Mobile Automation", value: 20 },
  { label: "Smoke & Regression", value: 18 },
  { label: "API Testing", value: 14 },
  { label: "Database Testing", value: 10 },
  { label: "Accessibility", value: 8 },
];

// ---------------- Education & Certifications ----------------

export const education = {
  degree: "Bachelor of Engineering (B.E)",
  university: "Savitribai Phule Pune University",
  institute: "Sir Visvesvaraya Institute of Technology, Nashik",
  year: "Class of 2020",
};

export const certifications = [
  {
    name: "Certified Tester Foundation Level (CTFL) v4.0",
    issuer: "ISTQB®",
    desc: "ISTQB — the leading global certification scheme in the field of software testing.",
  },
  {
    name: "Selenium Certification",
    issuer: "Naresh IT (Hyderabad)",
    desc: "Professional certification in Selenium test automation.",
  },
  {
    name: "Core Java Certification",
    issuer: "Naresh IT (Hyderabad)",
    desc: "Core Java programming certification.",
  },
  {
    name: "Generative AI Mastermind",
    issuer: "Outskill",
    desc: "Hands-on program covering Generative AI fundamentals, practical applications, and AI-powered automation for real-world use cases.",
  },
];

// ---------------- Roles & Responsibilities ----------------

export const roles = [
  {
    emoji: "📝",
    title: "Test Documentation",
    bullets: [
      "Writing, reviewing, and executing test cases as per functional specifications",
      "Devising all artifacts of testing such as Test Scenarios, Test Cases, Defect Reports, and Test Summary reports",
    ],
  },
  {
    emoji: "🗃️",
    title: "Database Testing",
    bullets: [
      "Used/created SQL queries to perform database testing of the application",
      "Validating data integrity and consistency across systems",
    ],
  },
  {
    emoji: "⚙️",
    title: "Functional Testing",
    bullets: [
      "Performed functional testing, integrity testing, retesting, and regression testing",
      "Responsible for performing Smoke & Sanity, and Exploratory Testing",
    ],
  },
  {
    emoji: "🤖",
    title: "Selenium Automation",
    bullets: [
      "Strong experience in automating web application testing using Selenium WebDriver with TestNG framework",
      "Writing test cases using element locators, WebDriver methods, Java programming features, and TestNG annotations",
      "Experience in data-driven testing, cross-browser testing, and parallel test execution",
    ],
  },
  {
    emoji: "🔌",
    title: "API Testing",
    bullets: [
      "Performed API testing to validate functional requirements",
      "Validating RESTful APIs using Postman",
    ],
  },
  {
    emoji: "📊",
    title: "Test Execution & Reporting",
    bullets: [
      "Sending test execution reports on a daily and weekly basis",
      "Executing Selenium test cases and reporting defects",
      "Performed regression testing to validate resolved defects on every build",
    ],
  },
];

// ---------------- Projects ----------------

export interface ProjectModule {
  name: string;
  desc: string;
}

export interface Project {
  domain: string;
  title: string;
  platforms: string[];
  desc: string;
  highlightsTitle: string;
  highlights: { name: string; desc: string }[];
  tech: string[];
}

export const projects: Project[] = [
  {
    domain: "NEWS & MEDIA DOMAIN",
    title: "Global Digital Newspaper Platform",
    platforms: ["Android", "iOS", "Web"],
    desc: "Worked on a global digital newspaper platform encompassing regional newspapers from Australia, Germany, UK, and USA, delivering e-papers, magazines, and articles to a diverse user base.",
    highlightsTitle: "KEY HIGHLIGHTS",
    highlights: [
      {
        name: "Core Feature Validation",
        desc: "Validated essential features such as bookmarking articles, sharing content, and managing multiple editions",
      },
      {
        name: "Accessibility Coverage",
        desc: "Conducted extensive accessibility testing for compatibility with different devices, browsers, and versions",
      },
      {
        name: "Environment Simulation",
        desc: "Utilized BrowserStack to simulate various environments and user scenarios",
      },
      {
        name: "Automation Scripts",
        desc: "Implemented automation scripts using Selenium, Appium, and TestSigma",
      },
      {
        name: "Real-Time Monitoring",
        desc: "Used Google Analytics and Charles Proxy to debug and monitor real-time user interactions",
      },
      {
        name: "Pre-Release Validation",
        desc: "Tested iOS TestFlight builds for pre-release validation",
      },
      {
        name: "Agile + CI/CD",
        desc: "Performed smoke and regression testing under Agile methodologies with CI/CD integration",
      },
    ],
    tech: [
      "Selenium",
      "Appium",
      "TestSigma",
      "BrowserStack",
      "Google Analytics",
      "Charles Proxy",
      "TestFlight",
    ],
  },
  {
    domain: "PRINTING & LOGISTICS DOMAIN",
    title: "Printing & Fleet Management System",
    platforms: ["Web"],
    desc: "Designed and implemented automation testing frameworks for a comprehensive Printing and Logistics management solution.",
    highlightsTitle: "TESTED MODULES",
    highlights: [
      {
        name: "Order Processing",
        desc: "Order entry validation, status tracking, and order accuracy verification",
      },
      {
        name: "Print Job Management",
        desc: "Print job specifications, completeness of print data, and workflow validation",
      },
      {
        name: "Inventory Management",
        desc: "Inventory levels accuracy, stock replenishment, and reporting",
      },
      {
        name: "Shipping & Distribution",
        desc: "Shipping order accuracy, label generation, and distribution routes",
      },
      {
        name: "Quality Control",
        desc: "Print inspection, color accuracy, and adherence to industry standards",
      },
      {
        name: "Supplier Management",
        desc: "Supplier data, contracts, and procurement coordination",
      },
      {
        name: "Customer Communication",
        desc: "Order updates, delivery notifications, and customer data validation",
      },
      {
        name: "Regulatory Compliance",
        desc: "Compliance with printing regulations and environmental standards",
      },
    ],
    tech: ["Selenium", "Appium", "Cucumber BDD", "Jenkins", "Jira", "Postman"],
  },
];

// ---------------- AI-Powered Development ----------------

export const aiProcess = [
  {
    num: "01",
    emoji: "💡",
    title: "Ideate",
    desc: "Define the problem and prompt-engineer the solution architecture with AI",
  },
  {
    num: "02",
    emoji: "⚡",
    title: "Build",
    desc: "AI pair-programming for rapid development — code generation, refactoring, debugging",
  },
  {
    num: "03",
    emoji: "🧪",
    title: "Test",
    desc: "QA discipline applied: automation scripts, edge cases, and AI-generated test suites",
  },
  {
    num: "04",
    emoji: "🚀",
    title: "Ship",
    desc: "CI/CD deployment with AI-assisted code review and documentation",
  },
];

export interface AiProject {
  status: "LIVE" | "IN PROGRESS" | "CONCEPT";
  emoji: string;
  title: string;
  subtitle: string;
  desc: string;
  url?: string;
  builtWith: string[];
  stack: string[];
}

export const aiProjects: AiProject[] = [
  {
    status: "LIVE",
    emoji: "🔖",
    title: "SaveMake",
    subtitle: "savemake.app — all your bookmarks, one board",
    desc: "A single-pane bookmark workspace: organise links into boards, columns, and cards, import from Chrome, Safari, or Firefox, star favourites, and pin speed dials — all behind your own password.",
    url: "https://savemake.app/",
    builtWith: ["AI Pair Programming"],
    stack: ["Bookmark Manager", "Boards & Cards", "Browser Import", "Password Auth"],
  },
  {
    status: "LIVE",
    emoji: "🚀",
    title: "AI Business Tool",
    subtitle: "aibusinesstool.com — submit your SaaS on 300+ directories",
    desc: "A one-time submission service that lists your SaaS or AI tool on 300+ high-authority directories — built end-to-end with AI pair-programming, from landing page to checkout.",
    url: "https://aibusinesstool.com/",
    builtWith: ["AI Pair Programming"],
    stack: ["SaaS Growth", "300+ Directories", "Marketing Site", "SEO"],
  },
  {
    status: "LIVE",
    emoji: "🧊",
    title: "3D Interactive Portfolio Website",
    subtitle: "This very website — built with AI assistance",
    desc: "A horizontally-scrolling portfolio with a real-time 3D AI cube, holographic rings, orbiting tech cards, and neon connection lines — designed, coded, and refined through AI pair-programming.",
    builtWith: ["Claude", "ChatGPT"],
    stack: ["React", "TypeScript", "Three.js", "React Three Fiber", "Framer Motion", "GSAP"],
  },
  {
    status: "IN PROGRESS",
    emoji: "🔧",
    title: "Self-Healing Automation Scripts",
    subtitle: "AI-assisted locator recovery for Selenium suites",
    desc: "Experimenting with AI-driven element-locator healing: when the DOM changes and locators break, the framework suggests and validates replacement locators automatically.",
    builtWith: ["Claude", "GitHub Copilot"],
    stack: ["Java", "Selenium WebDriver", "TestNG"],
  },
  {
    status: "CONCEPT",
    emoji: "✨",
    title: "My Next AI Project",
    subtitle: "Coming soon — currently in the lab",
    desc: "A new AI-assisted development project is in the works. This space will soon feature an app, bot, or automation tool built end-to-end with an AI pair programmer — stay tuned.",
    builtWith: ["AI Pair Programming"],
    stack: ["Coming Soon"],
  },
];

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "analytics", label: "Analytics" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "roles", label: "Roles" },
  { id: "projects", label: "Projects" },
  { id: "aidev", label: "AI Dev" },
  { id: "contact", label: "Contact" },
];
