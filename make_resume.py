"""Generate Arun Wakekar's ONE-PAGE resume -> public/Arun_Wakekar_Resume.pdf
Links are shown as labels (Email / LinkedIn / GitHub / Portfolio) and are clickable."""
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER
from reportlab.platypus import (
    BaseDocTemplate, Frame, PageTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
)
import os

NAVY = HexColor("#0d1230")
BLUE = HexColor("#2563eb")
PURPLE = HexColor("#7c3aed")
CYAN = HexColor("#0891b2")
GRAY = HexColor("#3f4a63")
LIGHT = HexColor("#eef2ff")

os.makedirs("public", exist_ok=True)
doc = BaseDocTemplate(
    "public/Arun_Wakekar_Resume.pdf", pagesize=A4,
    leftMargin=14*mm, rightMargin=14*mm, topMargin=10*mm, bottomMargin=8*mm,
    title="Arun Wakekar - Quality Analyst Resume", author="Arun Wakekar"
)
frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="main",
              topPadding=0, bottomPadding=0, leftPadding=0, rightPadding=0)

def deco(canvas, doc_):
    canvas.saveState()
    canvas.setFillColor(BLUE); canvas.rect(0, A4[1]-5, A4[0], 5, stroke=0, fill=1)
    canvas.setFillColor(PURPLE); canvas.rect(0, 0, A4[0], 3.5, stroke=0, fill=1)
    canvas.restoreState()

doc.addPageTemplates([PageTemplate(id="all", frames=frame, onPage=deco)])

name_st = ParagraphStyle("name", fontName="Helvetica-Bold", fontSize=20, textColor=NAVY,
                         alignment=TA_CENTER, spaceAfter=3, leading=23)
role_st = ParagraphStyle("role", fontName="Helvetica-Bold", fontSize=11, textColor=BLUE,
                         alignment=TA_CENTER, spaceAfter=4)
contact_st = ParagraphStyle("contact", fontName="Helvetica", fontSize=9, textColor=GRAY,
                            alignment=TA_CENTER, spaceAfter=2, leading=13)
h_st = ParagraphStyle("h", fontName="Helvetica-Bold", fontSize=10.3, textColor=PURPLE,
                      spaceBefore=8.5, spaceAfter=2.5)
sub_st = ParagraphStyle("sub", fontName="Helvetica-Bold", fontSize=9.7, textColor=NAVY, spaceAfter=1.8, leading=12.4)
meta_st = ParagraphStyle("meta", fontName="Helvetica-Oblique", fontSize=8.5, textColor=CYAN, spaceAfter=2.5)
body_st = ParagraphStyle("body", fontName="Helvetica", fontSize=8.8, textColor=GRAY, leading=11.9)
bullet_st = ParagraphStyle("bullet", parent=body_st, leftIndent=9, bulletIndent=1, spaceAfter=1.1)

LINK = '<link href="%s"><font color="#2563eb"><u>%s</u></font></link>'

def H(txt):
    return [Paragraph(txt.upper(), h_st),
            HRFlowable(width="100%", thickness=0.9, color=BLUE, spaceAfter=4.5)]

story = []
story.append(Paragraph("ARUN WAKEKAR", name_st))
story.append(Paragraph("QUALITY ANALYST", role_st))
story.append(Paragraph(
    "Chhatrapati Sambhajinagar, Maharashtra, India &nbsp;•&nbsp; +91 8698615947", contact_st))
story.append(Paragraph(
    "&nbsp;•&nbsp;".join([
        LINK % ("mailto:arun.wakekar10@gmail.com", "Email"),
        LINK % ("https://www.linkedin.com/in/arun-wakekar-168a3b326/", "LinkedIn"),
        LINK % ("https://github.com/arunwakekar10-cell", "GitHub"),
        LINK % ("https://www.arunwakekar.in", "Portfolio"),
    ]), contact_st))

story += H("Professional Summary")
story.append(Paragraph(
    "QA professional with 3+ years of experience in automation and manual testing. Specialized in <b>Selenium</b>, "
    "<b>Appium</b>, <b>Playwright</b>, and <b>TestSigma</b> with a proven track record of delivering high-quality "
    "software across web and mobile platforms. Skilled in API testing, database testing, CI/CD, and AI-assisted workflows.",
    body_st))

story += H("Professional Experience")
jobs = [
    ("Quality Analyst", "Pagesuite India Pvt Ltd", "Sep 2024 – Present | India", [
        "Functional and regression testing of e-paper, magazine, and article modules; validated bookmarking, sharing, and edition management.",
        "Developed and executed automation scripts using TestSigma, Selenium, and Appium; smoke-tested daily release builds.",
        "Monitored user behavior and debugged API issues with Google Analytics and Charles Proxy.",
        "Tested iOS apps via TestFlight and ran manual cross-browser testing on BrowserStack.",
        "Identified and reported critical issues in daily newspaper apps and web portals.",
    ]),
    ("Automation and Manual Tester", "Sankey Business Solutions Pvt Ltd", "Nov 2022 – Sep 2024 | India", [
        "Designed and implemented automation testing frameworks for the Printing and Logistics domain.",
        "Performed functional web-application testing; tuned performance and built capacity plans for testing.",
        "Led testing of print management software and validated supply-chain optimization solutions with logistics teams.",
        "Participated in all product testing phases across mobile applications and web.",
    ]),
]
for title, comp, meta, pts in jobs:
    story.append(Paragraph(f"{title} — <font color='#2563eb'>{comp}</font>", sub_st))
    story.append(Paragraph(meta, meta_st))
    for p in pts:
        story.append(Paragraph(p, bullet_st, bulletText="•"))
    story.append(Spacer(1, 4))

story += H("Key Skills & Tools")
skills = [
    ("Testing", "Android, iOS, Web Portal, Accessibility, Smoke, Regression, Functional, API, Test Case Design"),
    ("Automation", "Selenium WebDriver, Appium, Playwright, TestSigma, TestNG, Maven, JUnit, Selenium Grid"),
    ("Programming", "Java, TypeScript, JavaScript, Python (Basic), Cucumber BDD, Data-Driven / Modular / Hybrid Frameworks"),
    ("Tools", "Jira, Google Analytics, Confluence, JMeter, Charles Proxy, TestFlight, BrowserStack, Postman"),
    ("DB & CI/CD", "SQL, Database Testing, PostgreSQL, MySQL, CI/CD Pipelines, Jenkins, Git"),
]
rows = [[Paragraph(f"<b>{k}</b>", body_st), Paragraph(v, body_st)] for k, v in skills]
tbl = Table(rows, colWidths=[24*mm, doc.width-24*mm])
tbl.setStyle(TableStyle([
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("ROWBACKGROUNDS", (0, 0), (-1, -1), [LIGHT, None]),
    ("TOPPADDING", (0, 0), (-1, -1), 3.4),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 3.4),
    ("LEFTPADDING", (0, 0), (-1, -1), 4),
]))
story.append(tbl)

story += H("Featured Projects")
projects = [
    ("Global Digital Newspaper Platform", "News & Media | Android, iOS, Web", [
        "Worked on a global digital newspaper platform encompassing regional newspapers from Australia, Germany, UK, and USA, delivering e-papers, magazines, and articles to a diverse user base.",
        "Validated bookmarking, content sharing, and multi-edition management; performed extensive accessibility and cross-device/browser compatibility testing using BrowserStack simulations.",
        "Implemented automation scripts with Selenium, Appium, and TestSigma; debugged real-time user interactions via Google Analytics and Charles Proxy; ran smoke/regression cycles under Agile with CI/CD and validated iOS TestFlight builds.",
    ]),
    ("Printing & Fleet Management System", "Printing & Logistics | Web", [
        "Designed and implemented automation testing frameworks for a comprehensive Printing and Logistics management solution used across the print supply chain.",
        "Tested end-to-end modules: Order Processing, Print Job Management, Inventory, Shipping & Distribution, Quality Control, Supplier Management, Customer Communication, and Regulatory Compliance.",
        "Built the automation stack on Selenium, Appium, and Cucumber BDD with Jenkins CI pipelines, Jira for defect tracking, and Postman for RESTful API validation.",
    ]),
]
for t, m, pts in projects:
    story.append(Paragraph(f"{t} &nbsp;<font color='#0891b2' size='8'><i>({m})</i></font>", sub_st))
    for p in pts:
        story.append(Paragraph(p, bullet_st, bulletText="•"))
    story.append(Spacer(1, 2.5))

story += H("Education & Certifications")
story.append(Paragraph(
    "Bachelor of Engineering (B.E) — Savitribai Phule Pune University, "
    "<font color='#0891b2'><i>Sir Visvesvaraya Institute of Technology, Nashik (2020)</i></font>", sub_st))
story.append(Spacer(1, 2.5))
story.append(Paragraph(
    "Certified Tester Foundation Level (CTFL) v4.0 — <font color='#2563eb'>ISTQB®</font>", bullet_st, bulletText="•"))
story.append(Paragraph(
    "Selenium Certification — <font color='#2563eb'>Naresh IT (Hyderabad)</font> &nbsp;&nbsp;|&nbsp;&nbsp; "
    "Core Java Certification — <font color='#2563eb'>Naresh IT (Hyderabad)</font>", bullet_st, bulletText="•"))
story.append(Paragraph(
    "Generative AI Mastermind — <font color='#2563eb'>Outskill</font> "
    "<i>(GenAI fundamentals, practical applications, and AI-powered automation)</i>", bullet_st, bulletText="•"))

doc.build(story)

# verify page count
from pypdf import PdfReader
n = len(PdfReader("public/Arun_Wakekar_Resume.pdf").pages)
print("pages:", n, "| size:", os.path.getsize("public/Arun_Wakekar_Resume.pdf"), "bytes")
assert n == 1, "RESUME IS NOT ONE PAGE!"
