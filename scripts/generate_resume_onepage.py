# -*- coding: utf-8 -*-
"""Single-page ATS resume PDF for Arun Wakekar (2026 update).

Changes vs the old 2-page generate_resume.py (user request):
  * exactly ONE A4 page
  * "4 years of experience" in the summary
  * GitHub / LinkedIn / Email are ICON-ONLY clickable links
    (no URL text clutter) — clicking the icon opens the link
Output: /home/z/my-project/public/Arun_Wakekar_Resume.pdf
"""
import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable,
    KeepTogether, Flowable,
)

OUT_DIR = "/home/z/my-project/public"
OUT = os.path.join(OUT_DIR, "Arun_Wakekar_Resume.pdf")
ICON_DIR = "/home/z/my-project/scripts/icons"
os.makedirs(OUT_DIR, exist_ok=True)

# ---- palette (print-friendly, matches site accent) ----
INK = HexColor("#1c2622")
MUTED = HexColor("#4d5c55")
ACCENT = HexColor("#047857")   # emerald-700

PAGE_W, PAGE_H = A4
MARGIN = 14 * mm

# ---- fonts (per pdf skill resume brief: FreeSerif family for English) ----
FDIR = "/usr/share/fonts/truetype/freefont"
pdfmetrics.registerFont(TTFont("FreeSerif", f"{FDIR}/FreeSerif.ttf"))
pdfmetrics.registerFont(TTFont("FreeSerif-Bold", f"{FDIR}/FreeSerifBold.ttf"))
pdfmetrics.registerFont(TTFont("FreeSerif-Italic", f"{FDIR}/FreeSerifItalic.ttf"))
registerFontFamily("FreeSerif", normal="FreeSerif", bold="FreeSerif-Bold",
                   italic="FreeSerif-Italic", boldItalic="FreeSerif-Italic")
F, FB = "FreeSerif", "FreeSerif-Bold"

# ---- tunable spacing knobs (fit-to-one-page) ----
SEC_SPACE = 4.5      # spacer before each section header
LEAD_BODY = 12.8     # body line height
LEAD_BULLET = 12.2   # bullet line height

# ---- styles ----
name_st = ParagraphStyle("name", fontName=FB, fontSize=22, leading=25,
                         textColor=INK, alignment=TA_CENTER)
title_st = ParagraphStyle("jobtitle", fontName=FB, fontSize=10.5, leading=14,
                          textColor=ACCENT, alignment=TA_CENTER)
contact_st = ParagraphStyle("contact", fontName=F, fontSize=9.5, leading=13,
                            textColor=MUTED, alignment=TA_CENTER)
sec_st = ParagraphStyle("sec", fontName=FB, fontSize=11, leading=14,
                        textColor=ACCENT, spaceBefore=0, spaceAfter=3)
body_st = ParagraphStyle("body", fontName=F, fontSize=9.5, leading=LEAD_BODY,
                         textColor=INK, alignment=TA_LEFT)
bullet_st = ParagraphStyle("bullet", fontName=F, fontSize=9.5, leading=LEAD_BULLET,
                           textColor=INK, leftIndent=10, bulletIndent=2,
                           spaceAfter=1.5)
role_st = ParagraphStyle("role", fontName=FB, fontSize=10.5, leading=13.5,
                         textColor=INK)
role_meta_st = ParagraphStyle("rolemeta", fontName=F, fontSize=9, leading=12,
                              textColor=MUTED)


class IconLinks(Flowable):
    """Centred row of icon images, each wrapped in a clickable URL annotation."""

    def __init__(self, icons, size=13, gap=16, pad=3):
        super().__init__()
        self.icons = icons          # list of (png_path, url)
        self.size = size            # icon side in points
        self.gap = gap              # gap between icons
        self.pad = pad              # vertical padding around the row

    def wrap(self, availWidth, availHeight):
        self.aw = availWidth
        self.total = len(self.icons) * self.size + (len(self.icons) - 1) * self.gap
        return (availWidth, self.size + 2 * self.pad)

    def draw(self):
        c = self.canv
        x = (self.aw - self.total) / 2.0
        y = self.pad
        for png, url in self.icons:
            c.drawImage(png, x, y, self.size, self.size, mask="auto")
            # slightly larger hit area than the visual icon
            c.linkURL(url, (x - 3, y - 3, x + self.size + 3, y + self.size + 3),
                      relative=1)
            x += self.size + self.gap


def section(title):
    return [
        Spacer(1, SEC_SPACE),
        Paragraph(title.upper(), sec_st),
        HRFlowable(width="100%", thickness=0.8, color=ACCENT, spaceAfter=5),
    ]


def bullets(items):
    return [Paragraph(t, bullet_st, bulletText="\u2022") for t in items]


story = []

# ================= HEADER =================
story.append(Paragraph("ARUN WAKEKAR", name_st))
story.append(Spacer(1, 2))
story.append(Paragraph(
    "QUALITY ANALYST  |  TEST AUTOMATION ENGINEER  |  ISTQB CTFL v4.0 CERTIFIED",
    title_st))
story.append(Spacer(1, 3))
story.append(Paragraph(
    "+91 8698615947&nbsp;&nbsp;\u00b7&nbsp;&nbsp;"
    "Chhatrapati Sambhajinagar, Maharashtra, India", contact_st))
story.append(Spacer(1, 4))
story.append(IconLinks([
    (f"{ICON_DIR}/github.png", "https://github.com/Ajay1Arun"),
    (f"{ICON_DIR}/linkedin.png", "https://www.linkedin.com/in/arun-wakekar"),
    (f"{ICON_DIR}/mail.png", "mailto:arun.wakekar10@gmail.com"),
]))
story.append(Spacer(1, 2))
story.append(HRFlowable(width="100%", thickness=1.2, color=ACCENT))

# ================= SUMMARY =================
story += section("Professional Summary")
story.append(Paragraph(
    "Quality Analyst with <b>4 years of experience</b> engineering quality through "
    "intelligent automation across web, mobile, and API layers. Designs scalable test "
    "frameworks and automates complex business workflows using Selenium, Playwright, "
    "Appium, TestSigma, JavaScript, and TypeScript. ISTQB CTFL v4.0 certified with "
    "hands-on smoke, regression, functional, accessibility, and database testing inside "
    "Agile teams with CI/CD pipelines. Also ships live AI-assisted products with a "
    "tester's eye for quality.", body_st))

# ================= CORE SKILLS =================
story += section("Core Skills")

def skill_cell(head, items):
    return Paragraph(
        f'<font color="#047857"><b>{head}</b></font><br/>' + "<br/>".join(items),
        ParagraphStyle("skcell", fontName=F, fontSize=9, leading=12.2, textColor=INK))

skills_grid = Table(
    [
        [
            skill_cell("TESTING TYPES", [
                "Functional, Regression, Smoke, Sanity",
                "API, Accessibility, Exploratory",
            ]),
            skill_cell("AUTOMATION", [
                "Selenium WebDriver, Playwright, Appium",
                "TestSigma, TestNG, Maven, JUnit, Grid",
            ]),
            skill_cell("LANGUAGES", [
                "Java, JavaScript, TypeScript",
                "Cucumber BDD, Python (Basic)",
            ]),
        ],
        [
            skill_cell("TOOLS & PLATFORMS", [
                "Jira, Postman, JMeter, Charles Proxy",
                "BrowserStack, TestFlight, GA, Confluence",
            ]),
            skill_cell("DATABASE & CI/CD", [
                "SQL, Database Testing, PostgreSQL, MySQL",
                "Jenkins, Git, CI/CD Pipelines",
            ]),
            skill_cell("METHODOLOGIES", [
                "Agile, Integration, Acceptance, Performance",
                "Team Leadership, Mentoring",
            ]),
        ],
    ],
    colWidths=[(PAGE_W - 2 * MARGIN) / 3.0] * 3,
)
skills_grid.setStyle(TableStyle([
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("TOPPADDING", (0, 0), (-1, -1), 2),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
    ("LEFTPADDING", (0, 0), (0, -1), 0),
]))
story.append(skills_grid)

# ================= EXPERIENCE =================
story += section("Professional Experience")

job1 = [
    Paragraph("Quality Analyst \u2014 Pagesuite India Pvt Ltd", role_st),
    Paragraph("Sep 2024 \u2013 Present &nbsp;\u00b7&nbsp; India", role_meta_st),
    Spacer(1, 1.5),
]
job1 += bullets([
    "Conduct functional and regression testing on e-paper, magazine, and article modules "
    "of a global digital newspaper platform serving publishers across Australia, Germany, "
    "UK, and USA.",
    "Develop and execute automation scripts using TestSigma, Selenium, and Appium to "
    "streamline testing across web and mobile releases.",
    "Validate core user journeys \u2014 bookmarking, article sharing, edition management \u2014 "
    "and run smoke tests certifying build stability for daily releases.",
    "Debug API interactions with Charles Proxy, monitor user behaviour with Google "
    "Analytics, test iOS TestFlight builds, and run cross-browser checks via BrowserStack.",
])
story.append(KeepTogether(job1))

story.append(Spacer(1, 4))
job2 = [
    Paragraph("Automation and Manual Tester \u2014 Sankey Business Solutions Pvt Ltd", role_st),
    Paragraph("Nov 2022 \u2013 Sep 2024 &nbsp;\u00b7&nbsp; India", role_meta_st),
    Spacer(1, 1.5),
]
job2 += bullets([
    "Designed and implemented automation testing frameworks for the Printing and Logistics "
    "domain, leading testing of print management software for accurate document processing.",
    "Validated order processing, print job management, inventory, shipping, quality control, "
    "and supplier modules; optimised supply-chain workflows with logistics teams.",
    "Performed functional, integrity, retesting, and regression testing across web and "
    "mobile applications through all product testing phases.",
])
story.append(KeepTogether(job2))

# ================= AI PROJECTS =================
story += section("AI-Powered Development Projects")
story.append(Paragraph(
    "Uses AI assistants as pair programmers to design, build, test, and ship real "
    "products \u2014 with QA discipline applied to every release.", body_st))
story.append(Spacer(1, 2))
story += bullets([
    "<b>SaveMake \u2014 savemake.app (LIVE):</b> single-pane bookmark workspace \u2014 boards, "
    "columns, and cards, import from Chrome/Safari/Firefox, password-protected speed dials.",
    "<b>AI Business Tool \u2014 aibusinesstool.com (LIVE):</b> lists SaaS and AI tools on 300+ "
    "high-authority directories; built end-to-end with AI pair programming.",
])

# ================= EDUCATION =================
story += section("Education")
story.append(Paragraph(
    "<b>Bachelor of Engineering (B.E)</b> \u2014 Savitribai Phule Pune University", body_st))
story.append(Paragraph(
    "Sir Visvesvaraya Institute of Technology, Nashik \u00b7 Class of 2020", role_meta_st))

# ================= CERTIFICATIONS =================
story += section("Certifications")

def cert_cell(txt):
    return Paragraph(txt, ParagraphStyle("cert", fontName=F, fontSize=9.5,
                                         leading=12.5, textColor=INK,
                                         leftIndent=10, bulletIndent=2))

cert_grid = Table(
    [[
        cert_cell("\u2022 <b>Certified Tester Foundation Level (CTFL) v4.0</b> \u2014 ISTQB"),
        cert_cell("\u2022 <b>Selenium Certification</b> \u2014 Naresh IT, Hyderabad"),
    ], [
        cert_cell("\u2022 <b>Core Java Certification</b> \u2014 Naresh IT, Hyderabad"),
        cert_cell("\u2022 <b>Generative AI Mastermind</b> \u2014 Outskill"),
    ]],
    colWidths=[(PAGE_W - 2 * MARGIN) / 2.0] * 2,
)
cert_grid.setStyle(TableStyle([
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("TOPPADDING", (0, 0), (-1, -1), 1),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
    ("LEFTPADDING", (0, 0), (0, -1), 0),
]))
story.append(cert_grid)

# ================= BUILD =================
doc = SimpleDocTemplate(
    OUT, pagesize=A4,
    leftMargin=MARGIN, rightMargin=MARGIN, topMargin=11 * mm, bottomMargin=11 * mm,
    title="Arun Wakekar - Quality Analyst Resume",
    author="Arun Wakekar",
    creator="Arun Wakekar",
    subject="QA / Test Automation Engineer Resume - 4 years experience",
)
doc.build(story)
print("OK ->", OUT)

# ---- quick self-check: page count + content fill ----
try:
    import fitz  # PyMuPDF
    d = fitz.open(OUT)
    page = d[0]
    r = page.rect
    blocks = page.get_text("blocks")
    lowest = max((b[3] for b in blocks), default=0)
    lowest = max(lowest, max((img["bbox"][3] for img in page.get_image_info()), default=0))
    print(f"pages={len(d)}  contentBottom={lowest:.0f}/{r.height:.0f}  "
          f"fill={lowest / r.height * 100:.0f}%")
    for i, p in enumerate(d):
        links = [l.get("uri") for l in p.get_links() if l.get("uri")]
        print(f"  page{i+1} links: {links}")
    d.close()
except ImportError:
    print("PyMuPDF not available for self-check")
