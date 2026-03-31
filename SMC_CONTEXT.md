# SMC_CONTEXT.md
## Spencer Morley Consulting — Shared Business Context
**Single source of truth. Referenced by all team and agent files.**
Version 1.2 · March 2026

---

## The Firm

**Spencer Morley Consulting (SMC)** is a Canadian AI consulting and strategic communications & crisis management firm.

**Principals:**
- **Jordan Morley** — AI Practice Lead & Co-Principal
- **Cheryl Spencer-Morley** — Strategic Communications & Crisis Management Practice Lead & Co-Principal

**Jordan's operating mode:** Founder Mode. Jordan makes all decisions and approves all deliverables. Agents and team members execute. Jordan does not draft, research, or format — that is the team's job. Jordan reads, approves, and sends.

---

## Two Client Tracks — Never Conflate These

### Municipal Track
**Target clients:** CAOs and administrative staff at small and rural Canadian municipalities across Canada.

**Primary pain:** Shadow AI compliance risk. 48% of public servants are already using public AI tools (ChatGPT, Gemini, Copilot) with ratepayer data — without policy or training.

**Urgency driver:** Alberta municipalities face a June 11, 2026 Privacy Management Program deadline under ATIA and POPA. An existing IT acceptable use policy does not satisfy these obligations.

**Primary desire:** Close the compliance gap efficiently, without breaking the budget.

**Communication style:** Policy/administration-minded. Compliance-first language. Formal but plain English. Decision-makers who need confidence that the risk is real and the solution is practical.

**Services (in delivery sequence):**
1. AI Readiness Assessment
2. Staff AI Training & Prompt Engineering
3. AI Policy Development
4. Private LLM Deployment (MuniMind)
5. Agentic Workflows

---

### Small Business Track (SMB)
**Target clients:** Alberta small and medium-sized business owners.

**Primary pain:** Wasting time on repetitive tasks; not being found or recommended by AI platforms.

**Urgency driver:** AI adoption among Canadian businesses doubled in one year (6% → 12%). AI platforms are already recommending businesses to customers. Businesses not structured for AI discoverability are invisible in conversations they don't know are happening. WebMCP only became available in February 2026 — first movers have a narrow window.

**Primary desire:** Get time back. Stay ahead of competitors. Be found by AI.

**Communication style:** Time-poor, results-focused. Outcome-first language. Plain English. No jargon. What does this mean for me and what do I do next?

**Anchor product:** $597 AI Blind Spot Audit — fee credited in full against any subsequent service.

**Services (in delivery sequence):**
1. AI Blind Spot Audit ($597 anchor)
2. AI Readiness Assessment
3. WebMCP Readiness *(new for 2026)*
4. AI Presence & Reputation (monthly retainer)
5. Staff AI Training & Prompt Engineering
6. Workflow Automation
7. AI Readiness Maintenance Add-On ($400–$600/mo)

---

## Negative Audience (Excluded from All Targeting)
- Students and recent graduates
- Foreign nationals residing outside Canada
- Enterprise or large-corporation employees (not SMC's market)
- Tech-industry insiders (already know AI — not SMC's buyer)

---

## SMC Brand Voice

**Tone:** Confident, credible, plain English. No hype. No buzzwords.
**Tagline direction:** "Navigate the chaos."
**SMC is never positioned as a tech company** — always as a consulting firm that happens to use AI.
**Forbidden words:** "leverage," "utilize," "synergy," "cutting-edge," "robust"
**Voice model:** Jordan Morley. Direct. Practical. Dry wit when appropriate — never forced. Speaks to operators, not academics. Short paragraphs. Active voice.

**Two-audience calibration:**
- **Municipal:** Compliance and risk framing. Policy language. Operational efficiency. Council-ready outputs.
- **SMB:** Outcomes and time savings. Plain language. Role-specific. What works tomorrow, not in theory.

---

## Brand Design System

| Element | Value |
|---|---|
| Charcoal | `#323232` |
| Gold | `#C9A84C` |
| Off-white | `#F7F7F5` |
| Display font | Cormorant Garamond |
| UI/headings font | Montserrat |
| Body font | Lato |

All client-facing materials must use this design system.

---

## Technical Infrastructure

| Asset | Details |
|---|---|
| VPS | OVH · IP: `158.69.213.186` · User: `ubuntu` |
| Municipal audit app | `/home/ubuntu/SMC_Assets/` · served at `audit.spencermorleyconsulting.ca` |
| SMB audit app | `/home/ubuntu/smc_biz_audit/` · served at `bizaudit.spencermorleyconsulting.ca` |
| Shared brand assets | `/home/ubuntu/SMC_Assets/` — copy to `smc_biz_audit/assets/` when deploying biz app |
| Email | `jordan@spencermorleyconsulting.ca` via Gmail App Password in `.env` as `GMAIL_APP_PASSWORD` (16-character plain ASCII — no hidden Unicode) |
| Database | SQLite — assessment scores and client records |
| Report generation | `python-pptx` · PPTX template at `/home/ubuntu/SMC_Assets/` |
| Static website | `spencermorleyconsulting.ca` · deployed via IONOS Webspace · workflow: edit locally → push to GitHub → upload changed files via IONOS Webspace Explorer |
| GitHub | `jordo960/spencermorleyconsulting.github.io` |
| Content agent | `smc_content_agent.py` · deployed via GitHub Actions · runs weekly |
| Meta Pixel | ID: `921953610727268` · installed on all three site pages |

**Website pages:**
- Home: `https://jordo960.github.io/spencermorleyconsulting.github.io/index.html`
- Municipal: `https://jordo960.github.io/spencermorleyconsulting.github.io/municipal.html`
- Small Business: `https://jordo960.github.io/spencermorleyconsulting.github.io/small-business.html`

---

## Pricing Rules
- All client-facing quotes are **single numbers** — never ranges
- Internal scoping ranges are documented separately for Jordan's reference only
- They never appear in client-facing documents

---

## Copy Review Standard
All outbound client-facing deliverables pass through the TEAM.md seven-role sequential review (Alex → Blake → Morgan → River → Casey → Drew → Sam) before Jordan's final approval. The ServiceDelivery Copy Reviewer (Agent 8) integrates into this workflow.

---

*This file is maintained by Jordan Morley. Update whenever firm details, services, infrastructure, or brand guidelines change. All other team/agent files reference this document instead of duplicating its contents.*
