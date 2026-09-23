# -*- coding: utf-8 -*-
"""Generate a professional ATS-friendly resume PDF for Arun Wakekar.
Output: /home/z/my-project/public/Arun_Wakekar_Resume.pdf
"""
import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.platypus import (
    BaseDocTemplate, Frame, PageTemplate, Paragraph, Spacer, Table,
    TableStyle, HRFlowable, KeepTogether,
)
from reportlab.lib.styles import ParagraphStyle

OUT_DIR = "/home/z/my-project/public"
OUT = os.path.join(OUT_DIR, "Arun_Wakekar_Resume.pdf")
os.makedirs(OUT_DIR, exist_ok=True)

# ---- palette (print-friendly) ----
INK = HexColor("#1c2622")
MUTED = HexColor("#4d5c55")
ACCENT = HexColor("#047857")   # emerald-700
LIGHT_RULE = HexColor("#d7e2dc")

PAGE_W, PAGE_H = A4
MARGIN = 14 * mm

# ---- styles ----
name_st = ParagraphStyle("name", fontName="Helvetica-Bold", fontSize=23,
                         leading=26, textColor=INK, alignment=TA_CENTER)
title_st = ParagraphStyle("jobtitle", fontName="Helvetica-Bold", fontSize=11.5,
                          leading=15, textColor=ACCENT, alignment=TA_CENTER)
contact_st = ParagraphStyle("contact", fontName="Helvetica", fontSize=9,
                            leading=13, textColor=MUTED, alignment=TA_CENTER)
sec_st = ParagraphStyle("sec", fontName="Helvetica-Bold", fontSize=11,
                        leading=14, textColor=ACCENT, spaceBefore=0, spaceAfter=3)
body_st = ParagraphStyle("body", fontName="Helvetica", fontSize=9.5,
                         leading=13.5, textColor=INK, alignment=TA_LEFT)
bullet_st = ParagraphStyle("bullet", fontName="Helvetica", fontSize=9.5,
                           leading=13.2, textColor=INK, leftIndent=10,
                           bulletIndent=2, spaceAfter=1.5)
role_st = ParagraphStyle("role", fontName="Helvetica-Bold", fontSize=10.5,
                         leading=14, textColor=INK)
role_meta_st = ParagraphStyle("rolemeta", fontName="Helvetica", fontSize=9,
                              leading=12.5, textColor=MUTED)


def section(title):
    return [
        Spacer(1, 7),
        Paragraph(title.upper(), sec_st),
        HRFlowable(width="100%", thickness=0.8, color=ACCENT, spaceAfter=5),
    ]


def bullets(items):
    return [Paragraph(t, bullet_st, bulletText="\u2022") for t in items]


story = []

# ================= HEADER =================
story.append(Paragraph("ARUN WAKEKAR", name_st))
story.append(Spacer(1, 2))
story.append(Paragraph("QUALITY ANALYST  |  TEST AUTOMATION ENGINEER", title_st))
story.append(Spacer(1, 4))
story.append(Paragraph(
    "+91 8698615947&nbsp;&nbsp;|&nbsp;&nbsp;arun.wakekar10@gmail.com&nbsp;&nbsp;|&nbsp;&nbsp;"
    "Chhatrapati Sambhajinagar, Maharashtra, India", contact_st))
story.append(Paragraph(
    "linkedin.com/in/arun-wakekar&nbsp;&nbsp;|&nbsp;&nbsp;github.com/Ajay1Arun", contact_st))
story.append(Spacer(1, 4))
story.append(HRFlowable(width="100%", thickness=1.2, color=ACCENT))

# ================= SUMMARY =================
story += section("Professional Summary")
story.append(Paragraph(
    "Quality Analyst with 3+ years of experience engineering quality through intelligent "
    "automation across web, mobile, and API layers. Designs scalable test frameworks and "
    "automates complex business workflows using Selenium, Playwright, Appium, TestSigma, "
    "JavaScript, and TypeScript. ISTQB CTFL v4.0 certified with hands-on expertise in smoke, "
    "regression, functional, accessibility, and database testing inside Agile teams with "
    "CI/CD pipelines. Also builds and ships live AI-assisted products, bringing a tester's "
    "eye for quality to everything released.", body_st))

# ================= CORE SKILLS =================
story += section("Core Skills")

def skill_cell(head, items):
    return Paragraph(
        f'<font color="#047857"><b>{head}</b></font><br/>' + "<br/>".join(items),
        ParagraphStyle("skcell", fontName="Helvetica", fontSize=9,
                       leading=12.8, textColor=INK))

skills_grid = Table(
    [
        [
            skill_cell("TESTING TYPES", [
                "Functional, Regression, Smoke, Sanity",
                "API, Accessibility, Exploratory",
                "Cross-Browser, Web / Mobile / Portal",
            ]),
            skill_cell("AUTOMATION", [
                "Selenium WebDriver, Playwright, Appium",
                "TestSigma, TestNG, Maven, JUnit",
                "Selenium Grid, Data-Driven / Hybrid",
            ]),
            skill_cell("LANGUAGES", [
                "Java, JavaScript, TypeScript",
                "Cucumber BDD, Python (Basic)",
            ]),
        ],
        [
            skill_cell("TOOLS & PLATFORMS", [
                "Jira, Postman, JMeter, Charles Proxy",
                "BrowserStack, TestFlight",
                "Google Analytics, Confluence",
            ]),
            skill_cell("DATABASE & CI/CD", [
                "SQL Queries, Database Testing",
                "PostgreSQL, MySQL",
                "Jenkins, Git, CI/CD Pipelines",
            ]),
            skill_cell("METHODOLOGIES", [
                "Agile, Integration, Acceptance",
                "Non-Functional, Performance",
                "Team Leadership, Mentoring",
            ]),
        ],
    ],
    colWidths=[(PAGE_W - 2 * MARGIN) / 3.0] * 3,
)
skills_grid.setStyle(TableStyle([
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("TOPPADDING", (0, 0), (-1, -1), 3),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
    ("LEFTPADDING", (0, 0), (0, -1), 0),
]))
story.append(skills_grid)

# ================= EXPERIENCE =================
story += section("Professional Experience")

job1 = [
    Paragraph("Quality Analyst &nbsp;\u2014&nbsp; Pagesuite India Pvt Ltd", role_st),
    Paragraph("Sep 2024 \u2013 Present &nbsp;&nbsp;\u00b7&nbsp;&nbsp; India", role_meta_st),
    Spacer(1, 2),
]
job1 += bullets([
    "Conduct functional and regression testing on e-paper, magazine, and article modules of a global "
    "digital newspaper platform serving regional publishers across Australia, Germany, UK, and USA.",
    "Develop and execute automation scripts using TestSigma, Selenium, and Appium to streamline "
    "testing across web and mobile releases.",
    "Validate core user journeys \u2014 bookmarking, article sharing, and edition management \u2014 and run "
    "smoke tests to certify build stability for daily releases.",
    "Monitor user behaviour and debug API interactions with Google Analytics and Charles Proxy; "
    "test iOS TestFlight builds and report performance and compatibility findings.",
    "Perform cross-browser manual testing via BrowserStack and report critical defects in daily "
    "newspaper apps and web portals.",
])
story.append(KeepTogether(job1))

story.append(Spacer(1, 6))
job2 = [
    Paragraph("Automation and Manual Tester &nbsp;\u2014&nbsp; Sankey Business Solutions Pvt Ltd", role_st),
    Paragraph("Nov 2022 \u2013 Sep 2024 &nbsp;&nbsp;\u00b7&nbsp;&nbsp; India", role_meta_st),
    Spacer(1, 2),
]
job2 += bullets([
    "Designed and implemented automation testing frameworks for the Printing and Logistics domain, "
    "leading testing of print management software for accurate document processing.",
    "Validated order processing, print job management, inventory, shipping, quality control, and "
    "supplier modules; collaborated with logistics teams to optimise supply-chain workflows.",
    "Performed functional, integrity, retesting, and regression testing on web applications and "
    "mobile applications across all product testing phases.",
    "Monitored the operating environment, applied performance tuning, and developed capacity "
    "plans for testing activities.",
])
story.append(KeepTogether(job2))

# ================= AI PROJECTS =================
story += section("AI-Powered Development Projects")
ai_intro = Paragraph(
    "Certified in Generative AI (Outskill); uses AI assistants as pair programmers to design, "
    "build, test, and ship real products \u2014 with QA discipline applied to every release.",
    body_st)
story.append(ai_intro)
story.append(Spacer(1, 3))
story += bullets([
    "<b>SaveMake \u2014 savemake.app (LIVE):</b> single-pane bookmark workspace; organise links into "
    "boards, columns, and cards; import from Chrome, Safari, or Firefox; star favourites and pin "
    "speed dials behind password protection.",
    "<b>AI Business Tool \u2014 aibusinesstool.com (LIVE):</b> one-time service that lists SaaS and AI "
    "tools on 300+ high-authority directories, built end-to-end with AI pair programming.",
    "<b>Self-Healing Automation Scripts (IN PROGRESS):</b> AI-driven element-locator recovery for "
    "Selenium suites \u2014 when the DOM changes, the framework suggests and validates replacement "
    "locators automatically.",
])

# ================= EDUCATION =================
story += section("Education")
story.append(Paragraph(
    "<b>Bachelor of Engineering (B.E)</b> \u2014 Savitribai Phule Pune University", body_st))
story.append(Paragraph(
    "Sir Visvesvaraya Institute of Technology, Nashik \u00b7 Class of 2020", role_meta_st))

# ================= CERTIFICATIONS =================
story += section("Certifications")
story += bullets([
    "<b>Certified Tester Foundation Level (CTFL) v4.0</b> \u2014 ISTQB",
    "<b>Selenium Certification</b> \u2014 Naresh IT, Hyderabad",
    "<b>Core Java Certification</b> \u2014 Naresh IT, Hyderabad",
    "<b>Generative AI Mastermind</b> \u2014 Outskill",
])

# ================= BUILD =================
doc = BaseDocTemplate(
    OUT, pagesize=A4,
    leftMargin=MARGIN, rightMargin=MARGIN, topMargin=13 * mm, bottomMargin=13 * mm,
    title="Arun Wakekar - Quality Analyst Resume",
    author="Arun Wakekar",
)
frame = Frame(MARGIN, 13 * mm, PAGE_W - 2 * MARGIN, PAGE_H - 26 * mm, id="main")
doc.addPageTemplates([PageTemplate(id="page", frames=[frame])])
doc.build(story)
print("OK ->", OUT)
