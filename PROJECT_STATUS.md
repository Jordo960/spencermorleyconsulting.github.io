# SMC Website — Project Status
**Last updated:** March 24, 2026
**Repo:** github.com/Jordo960/spencermorleyconsulting.github.io
**Live sandbox:** https://jordo960.github.io/spencermorleyconsulting.github.io/

---

## Current State: DEPLOYED ✓

All three HTML files have been updated, committed, and pushed to the `main` branch. GitHub Pages is live at the sandbox URL above.

---

## What Was Completed This Session (March 24, 2026)

### municipal.html
- Added **AI Policy Development** as a named service (full service block with pricing callout)
- Renamed **Workflow Automation → Agentic Workflows** throughout (service block, nav dropdown, JSON-LD)
- Added **Private LLM Deployment** to JSON-LD structured data
- Updated compliance stats box (48%/22% KPMG stats, dynamic day counter)
- Dynamic JS counter: calculates days until June 11, 2026 ATIA/POPA deadline at page load
- Updated form dropdown: added "AI Policy Development — Municipal", renamed "Workflow Automation" → "Agentic Workflows"
- Submit button: "Get a Compliance Assessment"
- Replaced mailto form handler with **Formspree async fetch** (`https://formspree.io/f/xojpaekn`)
- Error fallback directs to jordan@spencermorleyconsulting.ca
- Contact sub + form-success: "Cheryl will be in touch" → "we'll be in touch within one business day"
- All GA4 custom events wired: `cta_click` on CTAs, `generate_lead` on form success

### small-business.html
- Hero H1 rewritten: competitor urgency framing
- Hero subhead updated: time/productivity outcome framing
- Hero CTA: "See Where Your Business Stands" → `#sb-audit`
- Audit section H2: "Here's What That's Costing You"
- Audit section sub: AI recommendations framing
- 4 audit deliverable bullets replaced (Full Visibility Gap Analysis / AI Recommendation Score / Priority Fix List / 45-Minute Briefing)
- Track intro: updated stat framing (6% → 12%, Statistics Canada sourced)
- **CFIB stats box** inserted after track intro (12.2% / 10% / $2.40 / 1.08 hrs)
- Ported stats box CSS from municipal.html (`.shadow-ai-stats`, `.shadow-stat`, etc.)
- Service outcome headlines added to all 5 services (bold strong element)
- **KPMG stats box** embedded inside Service 04 — Staff Training (83% / 48%)
- Maintenance service: headline updated to "Keep Your Visibility Current"
- Contact sub: updated + "Not sure where to start? The $597 Audit answers that."
- Submit button: "Request a Conversation"
- Contact sub + form-success: "Cheryl will be in touch" → "we'll be in touch within one business day"
- Formspree handler with `source: 'Small Business Track'`

### index.html
- AI Consulting section intro: updated to AI-is-already-here framing
- Municipal gateway card copy: compliance urgency framing
- Municipal CTA: "Check Your Compliance Position"
- Small Business gateway card copy: AI findability framing
- Small Business CTA: "See Where Your Business Stands"
- Formspree handler with `source: 'Homepage'`

### sitemap.xml
- All 3 `<lastmod>` dates updated: `2026-03-12` → `2026-03-24`

### llms.txt
- Version bumped: 1.1 → 1.2
- "AI Policy & Governance Framework" → "AI Policy Development" with updated description
- "Municipal Workflow Automation" → "Agentic Workflows" with updated description
- Contact: `cheryl@` → `jordan@spencermorleyconsulting.ca`

### SEO / WebMCP / Structured Data (all three pages)
- JSON-LD `@type: LocalBusiness` / `ProfessionalService` verified and updated on all pages
- `sameAs` arrays populated with relevant profile URLs
- Open Graph and Twitter Card meta confirmed present
- Geo meta (Alberta / Canada) confirmed present
- Canonical URLs confirmed on all pages
- `robots.txt` and `sitemap.xml` confirmed correct and in repo root

---

## Form Handler — Formspree

**Endpoint:** `https://formspree.io/f/xojpaekn`
**Account:** Jordan's free Formspree account
**Submissions go to:** jordan@spencermorleyconsulting.ca *(verify this in Formspree dashboard)*
**Source field:** Each page sends a `source` field identifying which page the submission came from (Homepage / Municipal Track / Small Business Track)

**Action required:** Jordan to do a live test submission from each page and confirm receipt.

---

## Google Analytics — PENDING

All three pages have GA4 custom events wired:
- `cta_click` fires on every primary CTA button click
- `generate_lead` fires on form success

**What's missing:** The GA4 Measurement ID (`G-XXXXXXXXXX`). Jordan needs to:
1. Go to analytics.google.com
2. Create a property for `spencermorleyconsulting.ca`
3. Get the Measurement ID from the Data Streams setup
4. Paste it into the `gtag('config', 'G-XXXXXXXXXX')` placeholder in all three HTML files

---

## Git / Deployment

**Remote:** `https://jordo960:[PAT]@github.com/Jordo960/spencermorleyconsulting.github.io.git`
**Branch:** `main`
**Auth:** Fine-grained PAT (Contents: read/write) created March 24, 2026
**Deployment:** GitHub Pages, auto-deploys ~40 seconds after push

To push future changes from local:
```bash
cd "/Users/jordanmorley/Developer/Claude Code Website Updates"
git add index.html municipal.html small-business.html sitemap.xml llms.txt
git commit -m "describe change here"
git push origin main
```

---

## Next Steps

| Priority | Task | Owner |
|---|---|---|
| High | Verify Formspree dashboard — confirm notification email is jordan@ | Jordan |
| High | Test live form submission from each page | Jordan |
| High | Create GA4 property, get Measurement ID, update all 3 HTML files | Jordan |
| Medium | Production DNS: point spencermorleyconsulting.ca to GitHub Pages | Jordan (when ready) |
| Low | VPS kernel update: `sudo apt upgrade -y` on 158.69.213.186 | Jordan (next maintenance window) |

---

## File Inventory

| File | Status | Notes |
|---|---|---|
| `index.html` | ✓ Deployed | ~430KB (base64 headshots); Formspree handler |
| `municipal.html` | ✓ Deployed | Dynamic deadline counter; Formspree handler |
| `small-business.html` | ✓ Deployed | CFIB + KPMG stats boxes; Formspree handler |
| `sitemap.xml` | ✓ Deployed | lastmod 2026-03-24 |
| `llms.txt` | ✓ Deployed | v1.2; AI platform guidance file |
| `robots.txt` | ✓ Deployed | No changes needed |
| `TEAM.md` | ✓ Updated | Fixed service names, design tokens |
| `files/SMC_Website_Project_Context.md` | ✓ Updated | Fixed stale references |
| `PROJECT_STATUS.md` | ✓ This file | Created March 24, 2026 |
