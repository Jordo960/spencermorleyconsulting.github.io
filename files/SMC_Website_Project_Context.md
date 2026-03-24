# SMC Website Project — Claude Context Doc
*Upload to Project Knowledge. Do not paste index.html directly — use the Style Reference instead.*

---

## Project Overview

Building and maintaining the **SpencerMorleyConsulting.ca** website — a multi-page HTML/CSS/JS site for a dual-practice consulting firm. No frameworks, no build tools — pure HTML files deployed via GitHub Pages.

**Live sandbox:** `https://jordo960.github.io/spencermorleyconsulting.github.io/`
**Production:** SpencerMorleyConsulting.ca (WordPress — separate from this static site project)
**Repo:** github.com/Jordo960/spencermorleyconsulting.github.io

---

## Files

| File | Purpose | Status |
|---|---|---|
| `index.html` | Homepage — all sections | Built, ~430KB due to two embedded base64 headshots |
| `municipal.html` | AI Consulting: Municipal Track | Built, ~120KB |
| `small-business.html` | AI Consulting: Small Business Track | Built, ~82KB |

**Important:** `index.html` is large because both Cheryl and Jordan's headshots are embedded as base64. Do not try to load the full file into context — use the Style Reference doc instead. For `municipal.html` and `small-business.html`, uploading is fine when needed.

---

## The Business

**Spencer Morley Consulting (SMC)** — dual practice:
- **AI Consulting** — municipal track (small & rural municipalities, Canada-wide) + small business track (Alberta)
- **Crisis Communications** — Alberta only

**Principals:**
- **Cheryl Spencer-Morley** — Crisis Communications Lead (25+ years public sector)
- **Jordan Morley** — AI Practice Lead

**Tagline:** "Helping You Navigate the Chaos"

---

## Site Sections (index.html)

| Section | ID | Background | Notes |
|---|---|---|---|
| Nav | — | charcoal, semi-transparent | Fixed top, compresses on scroll |
| Hero | `#top` | charcoal | Split grid, stats bar, gold watermark SVG |
| Practices | `#practices` | charcoal | Two practice cards linking to sub-pages |
| Crisis Services | `#crisis` | cream (light) | 3-tile grid: Crisis Mgmt, Media Relations, On-Demand |
| AI Consulting | `#ai-section` | charcoal-mid | 2 gateway cards → municipal.html + small-business.html |
| About | `#about` | charcoal | Dual principal layout: Cheryl left / Jordan right |
| Contact | `#contact` | gold | Contact form, 2-col layout |
| Footer | — | #111111 | Links, copyright © 2026 |

---

## About Section — Current State

The about section in `index.html` shows **both principals side by side**:
- **Left column:** Cheryl Spencer-Morley, Crisis Communications Lead, her headshot (base64 JPEG), "25+ Years Experience" gold badge
- **Right column:** Jordan Morley, AI Practice Lead, his headshot (base64 JPEG converted from Jordan_Headshot.webp)
- Both use `aspect-ratio: 4/5; object-fit: cover; object-position: top`
- Layout uses `grid-template-columns: 1fr 1fr; gap: 5rem`

The About section in `municipal.html` and `small-business.html` shows **Jordan only** with his bio and 6 credentials (see Jordan's Credentials below).

---

## Jordan's Credentials (current — both sub-pages)

1. **AI Practice Lead, Spencer Morley Consulting** — Leading SMC's AI consulting practice for Alberta small businesses and municipalities across Canada.
2. **Google AI Professional Certificate** — 7-course program via Coursera · Brainstorming, research, communication, content creation, data analysis & app building · March 2026
3. **Effective Prompt Engineering for Public Servants** — Apolitical / Google.org & The Rockefeller Foundation · February 2026
4. **AI Fundamentals for Public Servants: Opportunities, Risks and Strategies** — Apolitical / Stanford Online · February 2026
5. **WebMCP & AI Visibility Specialist** — Expert in Model Context Protocol implementation and AI platform discoverability.
6. **Workflow Automation & Prompt Engineering** — Designing practical AI workflows for small business and public sector clients.

---

## Key Messaging (for copy continuity)

### Municipal Track
- **Core angle:** Shadow AI compliance urgency
- 48% of Canadian public servants already use AI; only 22% of organizations have formal policy (KPMG Canada 2025)
- **Alberta deadline:** ATIA/POPA Privacy Management Program — June 11, 2026
- Provincial equivalents: MFIPPA (ON), FOIPPA (BC), FIPPA (MB/SK)
- **SMC Municipal Readiness Stack:** AI Readiness Assessment → AI Policy Development → Staff AI Training → Private LLM Deployment → Agentic Workflows → WebMCP Readiness
- Staff AI Training includes: prompt engineering as a governance skill, chain-of-thought prompting, bias mitigation, hallucination reduction, human-in-the-loop practices

### Small Business Track
- **Core angle:** WebMCP / Model Context Protocol = "the next stage of SEO"
- MCP released February 2026 — enables AI platforms (ChatGPT, Gemini) to find and recommend businesses
- AI recommendations carry greater perceived authenticity than paid advertising
- Target audience: Alberta small businesses from complete AI beginners to casual ChatGPT users
- Decision-maker: owner/founder or office manager depending on business size

---

## Small Business Service Model (confirmed pricing)

| Service | Type | Price |
|---|---|---|
| AI Blind Spot Audit | One-time entry point | $597 (credited toward any service within 30 days) |
| AI Presence & Reputation | Monthly retainer | $1,200–$2,000/mo |
| WebMCP Readiness | Project | $3,000–$4,500 (default quote $3,750) |
| Staff AI Training & Prompt Engineering | Project | Pricing on request |
| Workflow Automation | Project | Pricing on request |
| AI Readiness Maintenance | Monthly add-on | $400–$600/mo |

**Pricing philosophy:** Always quote single numbers to clients — never ranges. Use internal scoping to determine price, then present one confident number.

**Go-to-market:** Phase 1 promotes AI Blind Spot Audit only. All services listed on site from day one.

---

## Technical Notes

- All images are embedded as base64 (no external image hosting)
- Jordan's headshot: originally uploaded as `Jordan_Headshot.webp`, converted to JPEG for embedding
- Cheryl's headshot: `Cheryl_Sharpened_image_1.jpg` embedded as base64
- The SMC logo symbol is an inline SVG path (circle with 8 directional arrows) — reused in nav and footer
- No JavaScript frameworks — vanilla JS only (form handler, scroll compression for nav)
- Contact form uses `handleFormSubmit()` — async Formspree fetch to `https://formspree.io/f/xojpaekn`, shows inline success state on 200 OK. Submissions go to jordan@spencermorleyconsulting.ca.
- WebMCP structured data / JSON-LD is embedded in the `<head>` for AI crawler indexing
- Open Graph and Twitter Card meta tags are present
- Geo targeting meta: Alberta / Canada
- Copyright: © 2026 on all three pages, single line, no duplicate

---

## Nav Labels (current — all three files)

- **Communications and Crisis Management ▾** (dropdown: Crisis Management, Media Relations Training, On-Demand Communications)
- **AI Consulting ▾** (dropdown: Municipal Track, Small Business Track)
- **About**
- **Get a Consultation** (CTA button → #contact)

---

## Footer Link Pattern

On `index.html`: footer links use `#anchor` (same-page scroll)
On `municipal.html` and `small-business.html`: 
- Crisis Communications → `index.html#crisis`
- AI Consulting → `index.html#ai-section`
- About → `#about` (same-page scroll)
- Contact → `#contact` (same-page scroll)

---

## Pending Work

- **Google Analytics:** Jordan needs to create a GA4 property at analytics.google.com for `spencermorleyconsulting.ca`, get the `G-XXXXXXXXXX` Measurement ID, then add the gtag snippet to all three HTML files. All three files already have GA4 custom events wired (`cta_click`, `generate_lead`) — they just need the real Measurement ID.
- **Formspree:** Jordan should verify the notification email in the Formspree dashboard is set to jordan@spencermorleyconsulting.ca, then do a live test submission.
- **Production launch:** Pre-launch review pending before pointing `spencermorleyconsulting.ca` DNS to GitHub Pages. Static site will eventually replace the WordPress production site.
- **TEAM.md archival note:** The team workflow described in TEAM.md is for multi-session copy review. It can be re-engaged by opening Claude Code and saying "Read TEAM.md."

---

## How to Work on This Project

1. **For style changes:** Reference `SMC_Website_Style_Reference.md` — do not ask Jordan to upload index.html just for style context
2. **For content/copy changes:** Ask Jordan to paste the specific section's HTML, make targeted edits, return just that section
3. **For adding new sections:** Use the Style Reference to match design tokens, patterns, and layout conventions exactly
4. **For headshot work:** Jordan's real headshot is already embedded. Files are `Jordan_Headshot.webp` (in project) and `Cheryl_Sharpened_image_1.jpg` (in project)
5. **Always output:** Modified HTML files to `/mnt/user-data/outputs/` using `present_files`
6. **GitHub deployment:** Push via git CLI using HTTPS + fine-grained PAT. Repo initialized locally March 24, 2026. Remote: `https://jordo960:[PAT]@github.com/Jordo960/spencermorleyconsulting.github.io.git`. Pages auto-deploys in ~40 seconds after push.
