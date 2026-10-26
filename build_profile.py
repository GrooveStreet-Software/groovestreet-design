"""Generate GROOVESTREET-Company-Profile.docx and .pdf from the brand-aligned content."""
import os
from datetime import date

PROJECT = "D:/GROOVESTREET/WEB/GROOVESTREET"
PROFILE_DIR = os.path.join(PROJECT, "profile")
os.makedirs(PROFILE_DIR, exist_ok=True)

DOCX_OUT = os.path.join(PROFILE_DIR, "GROOVESTREET-Company-Profile.docx")
PDF_OUT = os.path.join(PROFILE_DIR, "GROOVESTREET-Company-Profile.pdf")

# ---- Brand tokens ---------------------------------------------------------
GREEN = (0x1B, 0x4D, 0x3E)
ORANGE = (0xFF, 0x5A, 0x1F)
PAPER = (0xF6, 0xF4, 0xEF)
INK = (0x0E, 0x11, 0x13)
MUTED = (0x4A, 0x52, 0x57)
WHITE = (0xFF, 0xFF, 0xFF)
LIGHT_GREEN = (0xE6, 0xEF, 0xEA)

VERSION = "Version 1.1"
DATE = "October 2026"

# ---- Document copy ---------------------------------------------------------
FONT = "Sentient"   # display serif (brand) — PDF falls back to Helvetica
FONT_BODY = "Inter"  # UI/sans (brand) — PDF falls back to Helvetica

title = "GROOVESTREET DESIGN"
tagline = "Digitizing Your Business"
doc_title = "Company Profile"

meta = f"{VERSION} · {DATE} · Kampala, Uganda · Serving East Africa and worldwide"

# ---- SECTION CONTENT -------------------------------------------------------
sections = [
    ("1. Who We Are", [
        ("p", "GROOVESTREET DESIGN is a design and build studio in Kampala, Uganda. We design and build premium websites, brands and graphics for growing businesses across East Africa and beyond."),
        ("p", "We do not do \"pretty pages.\" Every build is engineered to bring calls and messages to your business — then proven on real devices before it reaches you."),
        ("p", "Our promise:"),
        ("bold", "Premium design and build that earns your customer's attention. We stand behind every build, from the first sketch to the day it goes live."),
        ("p", "We are a focused team that uses AI as a tool, not a replacement for craft. That combination lets us move faster, keep costs down, and deliver a level of polish a traditional agency structure would struggle to match."),
    ]),
    ("2. Why Clients Choose Us", [
        ("li", "A focused team that uses AI as a tool, not a replacement for craft — senior craft, machine speed."),
        ("li", "Every project passes a 60-point checklist before launch — covering links, forms, phone numbers, WhatsApp buttons, accessibility (WCAG 2.2 AA), performance budgets, and real-device testing."),
        ("li", "Performance is a design decision — a hard budget your build cannot miss."),
        ("li", "WCAG 2.2 AA accessibility — non-negotiable on every build."),
        ("li", "Post-launch support — 30 days included on every build."),
        ("li", "Proof over claims — 30+ websites, 200+ designs, 50+ clients, and 90% 5-star rated."),
    ]),
    ("3. Services & Pricing", [
        ("table", [
            ("Landing Page", "One page, one offer, one clear next step.", "200,000 UGX", "3–5 days"),
            ("Custom Website", "5–10 pages, contact form, basic SEO.", "500,000 UGX", "2–3 weeks"),
            ("Signature / E-commerce", "Custom design, CMS, online store with payments.", "1,300,000 UGX", "3–6 weeks"),
            ("Graphic Design", "Logos, flyers, posters, social graphics.", "20,000 UGX", "48 hours"),
            ("SEO Optimization", "Get found on Google, Maps and search.", "100,000 / month", "Per month"),
        ]),
    ]),
    ("4. How We Work", [
        ("li", ("b", "Discovery — "), "You tell us about your business, goals, and audience."),
        ("li", ("b", "Quote — "), "We give you a fixed UGX quote with a written timeline."),
        ("li", ("b", "Design — "), "We present the visual direction; three revision rounds included."),
        ("li", ("b", "Build — "), "We build and test on real devices (Android and iPhone)."),
        ("li", ("b", "Launch — "), "You go live, take full ownership, and get two weeks free support."),
    ]),
    ("5. Quality & Trust", [
        ("p", "Every project passes a 60-point checklist before launch — covering links, forms, phone numbers, WhatsApp buttons, accessibility (WCAG 2.2 AA), performance budgets, and real-device testing. What clients see is what they get: no broken links, no unanswered forms, no surprises."),
        ("p", "Performance is a design decision. A fast website keeps visitors, and a fast build shows respect for their time."),
        ("li", "LCP ≤ 2.0s on mobile 4G — the build feels instant."),
        ("li", "CLS ≤ 0.05 — the layout stays stable, nothing jumps around."),
        ("li", "INP ≤ 200ms — buttons and menus respond instantly."),
        ("li", "First-visit JavaScript ≤ 140KB gzipped — pages load quickly even on slow connections."),
    ]),
    ("6. Proof — What Clients Say", [
        ("quote", "They built my restaurant website in two weeks. I get booking calls every day now. Best money I've spent on my business."),
        ("quote", "Professional, fast, and the WhatsApp bot saves me hours every day. My customers love it."),
        ("quote", "Fixed price, clear timeline, and they delivered exactly what they said. No stress at all."),
        ("quote", "My flyer looks like it came out of a print catalogue — but it took 48 hours, not two weeks."),
        ("quote", "Finally an agency that explains what they are doing. And the result speaks for itself."),
        ("quote", "The Google Maps listing alone brought me more customers than my old web designer did in two years."),
        ("meta", "Sarah Nakato, Owner, Kampala Restaurant   ·   Michael Okello, Founder, Okello Designs   ·   Emily Ashaba, Director, Ashaba Academy   ·   David Ssemwanga, Manager, Ssemwanga Motors   ·   Grace Mukasa, Marketing, Mukasa Events   ·   Peter Kigozi, Owner, Kigozi Pharmacy"),
        ("meta", "Stats: 30+ websites · 200+ designs · 50+ clients · 90% 5-star rated   ·   Live sample: hotel-groovestreet-live.netlify.app"),
    ]),
    ("7. Who We Serve", [
        ("p", "Growing businesses across East Africa — startups, SMEs, and established brands — that need a digital presence that brings calls and messages, not just a pretty page. Worldwide, from East Africa."),
    ]),
    ("8. The Team", [
        ("p", "A focused, human-led studio. When you work with GROOVESTREET, you work directly with the people who build your site."),
        ("li", ("b", "Founder & Project Lead — "), "owns the client relationship from first conversation to handover."),
        ("li", ("b", "Design Lead — "), "directs visual direction, brand identity, and revision feedback."),
        ("li", ("b", "Development Lead — "), "builds and tests every site against the performance and accessibility budget."),
        ("li", ("b", "Production & AI — "), "handles deployment, post-launch support, and the AI-assisted tooling that keeps delivery fast."),
        ("p", "Member bios and photos are on the website's About page."),
    ]),
    ("9. Brand", [
        ("li", ("b", "Colors — "), "Brand Green #1B4D3E (primary), Accent Orange #FF5A1F (accent), Paper #F6F4EF (background), Ink #0E1113 (body)."),
        ("li", ("b", "Voice — "), "Plain, second-person, outcome-led. We use \"you\" more than \"we.\" Hero and CTA copy stays within ~20 words. Banned words: solutions, synergy, leverage, elevate, unleash, game-changer, world-class, cutting-edge."),
        ("li", ("b", "Type — "), "Sentient for display, Inter for body and UI — self-hosted, no external requests."),
    ]),
    ("10. Get Started", [
        ("p", "1. Tell us about your project — email groovestreetsoftware@gmail.com, call or WhatsApp +256 774 778 164, or visit us in Kampala."),
        ("p", "2. We reply within 24 hours with a fixed quote and a written timeline."),
        ("p", "3. We build, test, and launch on your approved timeline."),
        ("p", ("b", "Contact — "), "Email: groovestreetsoftware@gmail.com · Phone / WhatsApp: +256 774 778 164 · Location: Kampala, Uganda · Hours: Mon–Fri, 9:00–18:00 (EAT)"),
    ]),
]

# ===========================================================================
# DOCX generation (python-docx)
# ===========================================================================
from docx import Document
from docx.shared import Pt, RGBColor, Cm
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml.ns import qn
from docx.oxml import OxmlElement


def rgb(hx):
    return RGBColor(int(hx[0]), int(hx[1]), int(hx[2]))


def shade(cell, hx):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = OxmlElement("w:shd")
    shd.set(qn("w:val"), "clear")
    shd.set(qn("w:color"), "auto")
    shd.set(qn("w:fill"), "%02X%02X%02X" % hx)
    tcPr.append(shd)


def set_cell_margins(cell, top=80, bottom=80, left=120, right=120):
    tcPr = cell._tc.get_or_add_tcPr()
    m = OxmlElement("w:tcMar")
    for tag, val in (("top", top), ("bottom", bottom), ("start", left), ("end", right)):
        e = OxmlElement("w:" + tag)
        e.set(qn("w:w"), str(val))
        e.set(qn("w:type"), "dxa")
        m.append(e)
    tcPr.append(m)


doc = Document()

# Base style
normal = doc.styles["Normal"]
normal.font.name = "Inter"
normal.font.size = Pt(11)
normal.paragraph_format.space_after = Pt(6)
normal.paragraph_format.line_spacing = 1.3

# Margins
for sec in doc.sections:
    sec.top_margin = Cm(2.0)
    sec.bottom_margin = Cm(2.0)
    sec.left_margin = Cm(2.2)
    sec.right_margin = Cm(2.2)

# Title block
p = doc.add_paragraph()
p.alignment = WD_ALIGN_PARAGRAPH.CENTER
r = p.add_run(title)
r.font.name = FONT
r.font.size = Pt(30)
r.font.color.rgb = rgb(GREEN)
r.bold = True

p = doc.add_paragraph()
p.alignment = WD_ALIGN_PARAGRAPH.CENTER
r = p.add_run(tagline)
r.font.name = FONT
r.font.size = Pt(14)
r.font.color.rgb = rgb(ORANGE)
r.italic = True

p = doc.add_paragraph()
p.alignment = WD_ALIGN_PARAGRAPH.CENTER
r = p.add_run(doc_title)
r.font.name = FONT
r.font.size = Pt(18)
r.font.color.rgb = rgb(INK)
r.bold = True

p = doc.add_paragraph()
p.alignment = WD_ALIGN_PARAGRAPH.CENTER
r = p.add_run(meta)
r.font.size = Pt(9.5)
r.font.color.rgb = rgb(MUTED)

# Horizontal rule (bottom border on the meta paragraph)
pPr = p._p.get_or_add_pPr()
pbdr = OxmlElement("w:pBdr")
bottom = OxmlElement("w:bottom")
bottom.set(qn("w:val"), "single")
bottom.set(qn("w:sz"), "12")
bottom.set(qn("w:space"), "4")
bottom.set(qn("w:color"), "%02X%02X%02X" % GREEN)
pbdr.append(bottom)
pPr.append(pbdr)

# Body intro line (promise band)
p = doc.add_paragraph()
r = p.add_run("Our promise:  ")
r.font.color.rgb = rgb(GREEN)
r.bold = True
r.font.size = Pt(11.5)
r2 = p.add_run("Premium design and build that earns your customer's attention. We stand behind every build, from the first sketch to the day it goes live.")
r2.font.size = Pt(11.5)

for sec_head, items in sections:
    # Section heading
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(14)
    p.paragraph_format.space_after = Pt(6)
    r = p.add_run(sec_head)
    r.font.name = FONT
    r.font.size = Pt(15)
    r.font.color.rgb = rgb(GREEN)
    r.bold = True

    for it in items:
        kind = it[0]
        if kind == "p":
            p = doc.add_paragraph()
            p.paragraph_format.space_after = Pt(6)
            if len(it) > 1 and isinstance(it[1], tuple):
                r = p.add_run(it[1][0])
                r.bold = True
                r.font.size = Pt(11)
                r.font.name = FONT_BODY
                r2 = p.add_run(it[1][1])
                r2.font.size = Pt(11)
                r2.font.name = FONT_BODY
            else:
                run = p.add_run(it[1])
                run.font.size = Pt(11)
                run.font.name = FONT_BODY
        elif kind == "bold":
            p = doc.add_paragraph()
            p.paragraph_format.space_after = Pt(6)
            p.paragraph_format.left_indent = Cm(0.6)
            r = p.add_run(it[1])
            r.bold = True
            r.font.size = Pt(11)
            r.font.name = FONT_BODY
        elif kind == "li":
            # it is: ("li", ("b", "Lead — "), "rest")  OR  ("li", "plain text")
            if len(it) > 1 and isinstance(it[1], tuple) and len(it) > 2:
                lead_text = it[1][1]
                rest = it[2]
                rr = p.add_run(lead_text)
                rr.bold = True
                rr.font.size = Pt(11)
                rr.font.name = FONT_BODY
                rr2 = p.add_run(rest)
                rr2.font.size = Pt(11)
                rr2.font.name = FONT_BODY
            else:
                r = p.add_run("•  " + it[1])
                r.font.size = Pt(11)
                r.font.name = FONT_BODY
        elif kind == "quote":
            p = doc.add_paragraph()
            p.paragraph_format.left_indent = Cm(0.8)
            p.paragraph_format.right_indent = Cm(0.6)
            p.paragraph_format.space_after = Pt(4)
            r = p.add_run("“ " + it[1] + " ”")
            r.italic = True
            r.font.size = Pt(10.5)
            r.font.color.rgb = rgb(INK)
        elif kind == "meta":
            p = doc.add_paragraph()
            p.paragraph_format.space_after = Pt(2)
            r = p.add_run(it[1])
            r.font.size = Pt(9.5)
            r.font.color.rgb = rgb(MUTED)

    # Pricing table
    if sec_head == "3. Services & Pricing":
        table = doc.add_table(rows=1, cols=4)
        table.style = "Table Grid"
        table.alignment = WD_TABLE_ALIGNMENT.CENTER
        headers = ["Service", "Description", "Price (UGX)", "Timeline"]
        widths = [Cm(4.6), Cm(6.0), Cm(3.6), Cm(3.0)]
        hdr = table.rows[0].cells
        for i, h in enumerate(headers):
            hdr[i].text = ""
            pp = hdr[i].paragraphs[0]
            run = pp.add_run(h)
            run.bold = True
            run.font.size = Pt(10.5)
            run.font.color.rgb = rgb(WHITE)
            run.font.name = FONT_BODY
            shade(hdr[i], GREEN)
            set_cell_margins(hdr[i])
            hdr[i].width = widths[i]
        for row_data in items[0][1]:
            cells = table.add_row().cells
            for i, val in enumerate(row_data):
                cells[i].text = ""
                pp = cells[i].paragraphs[0]
                run = pp.add_run(val)
                run.font.size = Pt(10)
                run.font.name = FONT_BODY
                if i == 0:
                    run.bold = True
                if i == 2:
                    run.font.color.rgb = rgb(GREEN)
                    run.bold = True
                set_cell_margins(cells[i])
                cells[i].width = widths[i]
        # spacer after table
        sp = doc.add_paragraph()
        sp.paragraph_format.space_after = Pt(2)

# Footer note
p = doc.add_paragraph()
p.alignment = WD_ALIGN_PARAGRAPH.CENTER
r = p.add_run("GROOVESTREET DESIGN · Digitizing Your Business · Kampala, Uganda")
r.font.size = Pt(9)
r.font.color.rgb = rgb(MUTED)

doc.save(DOCX_OUT)
print("Wrote", DOCX_OUT)


# ===========================================================================
# PDF generation (reportlab)
# ===========================================================================
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.lib import colors
from reportlab.pdfgen import canvas as _canvas
from reportlab.platypus import (SimpleDocTemplate, Paragraph, Spacer, Table,
                                TableStyle, HRFlowable)

class PDFCanvas(_canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved = []
    def showPage(self):
        self._saved.append(dict(self.__dict__))
        self._startPage()
    def save(self):
        # merge onto first page (the content pages are all the same size)
        super().showPage()
        for state in self._saved:
            self.__dict__.update(state)
            self.draw_footer()
            super().showPage()
        super().save()
    def draw_footer(self):
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#4A5257"))
        self.drawCentredString(A4[0] / 2, 1.2 * cm, "GROOVESTREET DESIGN · Digitizing Your Business · Kampala, Uganda")

doc = SimpleDocTemplate(
    PDF_OUT, pagesize=A4,
    leftMargin=1.8 * cm, rightMargin=1.8 * cm,
    topMargin=1.8 * cm, bottomMargin=2.2 * cm,
    title="GROOVESTREET DESIGN — Company Profile",
)

story = []
from reportlab.lib.styles import ParagraphStyle

styles = {}
styles["title"] = ParagraphStyle(name="Title", fontName="Helvetica-Bold", fontSize=24,
    textColor=colors.HexColor("#1B4D3E"), alignment=1)
styles["tagline"] = ParagraphStyle(name="Tagline", fontName="Helvetica-Oblique", fontSize=13,
    textColor=colors.HexColor("#FF5A1F"), alignment=1)
styles["subtitle"] = ParagraphStyle(name="Subtitle", fontName="Helvetica-Bold", fontSize=17,
    textColor=colors.HexColor("#0E1113"), alignment=1)
styles["meta"] = ParagraphStyle(name="Meta", fontName="Helvetica", fontSize=9,
    textColor=colors.HexColor("#4A5257"), alignment=1)
styles["h2"] = ParagraphStyle(name="H2", fontName="Helvetica-Bold", fontSize=14,
    textColor=colors.HexColor("#1B4D3E"), spaceBefore=14, spaceAfter=6)
styles["body"] = ParagraphStyle(name="Body", fontName="Helvetica", fontSize=10.5,
    textColor=colors.HexColor("#0E1113"), leading=15)
styles["lead"] = ParagraphStyle(name="Lead", fontName="Helvetica", fontSize=11,
    textColor=colors.HexColor("#0E1113"), leading=15, spaceAfter=8)
styles["bullet"] = ParagraphStyle(name="Bullet", fontName="Helvetica", fontSize=10.5,
    textColor=colors.HexColor("#0E1113"), leading=15, leftIndent=14, bulletIndent=4)
styles["quote"] = ParagraphStyle(name="Quote", fontName="Helvetica-Oblique", fontSize=10.5,
    textColor=colors.HexColor("#0E1113"), leading=15, leftIndent=16, rightIndent=10)
styles["promise"] = ParagraphStyle(name="Promise", fontName="Helvetica", fontSize=11,
    textColor=colors.HexColor("#0E1113"), leading=15, spaceAfter=10)

# Title block
story.append(Paragraph(title, styles["title"]))
story.append(Spacer(1, 4))
story.append(Paragraph(tagline, styles["tagline"]))
story.append(Spacer(1, 2))
story.append(Paragraph(doc_title, styles["subtitle"]))
story.append(Spacer(1, 2))
story.append(Paragraph(meta, styles["meta"]))
story.append(Spacer(1, 8))
story.append(HRFlowable(width="100%", thickness=1.2, color=colors.HexColor("#1B4D3E"), spaceAfter=10))

# Promise band
p = Paragraph('<font color="#1B4D3E"><b>Our promise: </b></font>Premium design and build at rates that fit a growing business. Fixed quotes written in UGX. Launch dates written in stone.', styles["promise"])
story.append(p)

for sec_head, items in sections:
    story.append(Paragraph(sec_head, styles["h2"]))
    for it in items:
        kind = it[0]
        if kind == "p":
            if len(it) > 1 and isinstance(it[1], tuple):
                story.append(Paragraph('<font color="#1B4D3E"><b>' + it[1][0] + '</b></font>' + it[1][1], styles["body"]))
            else:
                story.append(Paragraph(it[1], styles["body"]))
        elif kind == "bold":
            story.append(Paragraph('<font color="#1B4D3E"><b>' + it[1] + '</b></font>', styles["bullet"]))
        elif kind == "li":
            # it is: ("li", ("b", "Lead — "), "rest")  OR  ("li", "plain text")
            if len(it) > 1 and isinstance(it[1], tuple) and len(it) > 2:
                lead_text = it[1][1]
                rest = it[2]
                story.append(Paragraph('<font color="#1B4D3E"><b>' + lead_text + '</b></font>' + rest, styles["bullet"]))
            else:
                story.append(Paragraph("•  " + it[1], styles["bullet"]))
        elif kind == "quote":
            story.append(Paragraph("“ " + it[1] + " ”", styles["quote"]))
        elif kind == "meta":
            story.append(Paragraph(it[1], styles["meta"]))
        elif kind == "table":
            table_data = [list(row) for row in it[1]]
            tc = Table(table_data, colWidths=[4.6 * cm, 6.0 * cm, 3.6 * cm, 3.0 * cm], repeatRows=1)
            tc.setStyle(TableStyle([
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#1B4D3E")),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#1B4D3E")),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("FONTSIZE", (0, 0), (-1, -1), 9),
                ("FONTNAME", (0, 1), (0, -1), "Helvetica-Bold"),
                ("FONTNAME", (2, 1), (2, -1), "Helvetica-Bold"),
                ("TEXTCOLOR", (2, 1), (2, -1), colors.HexColor("#1B4D3E")),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#E6EFEA")]),
            ]))
            story.append(tc)
            story.append(Spacer(1, 8))

# Closing
story.append(Spacer(1, 4))
story.append(Paragraph("GROOVESTREET DESIGN · Digitizing Your Business · Kampala, Uganda", styles["meta"]))

doc.build(story, canvasmaker=PDFCanvas)
print("Wrote", PDF_OUT)
