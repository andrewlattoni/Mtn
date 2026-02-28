# Mtn Project — Conversation Context (February 28, 2026)

This file compresses the scoping conversation that produced the Mtn project blueprint, decision log, and updated starter prompt. Load this file at the start of any new conversation to restore context.

---

## Who Is the User

- Solo builder, non-technical but actively learning to code (Python)
- Wants to learn how to organize complex projects using established frameworks, not just build the app
- Prefers direct language, no fluff
- "Check it in the morning" engagement pattern — 2–3 minutes daily max
- Values plain-language explanations of technical concepts
- Canadian, planning wilderness adventures across Western Canada

## What We Built

Three project documents:

1. **`mtn_app_blueprint.md`** — The master blueprint. Contains: product vision, fitness anchors, interaction model, MVP scope (in/out), framework recommendation (Shape Up), 5-cycle roadmap, and organizing principles.
2. **`StarterPrompt_HealthApp.md`** (updated) — The original framework selection prompt, now completed with decisions and scoped project context.
3. **`DecisionLog_Mtn.md`** — Eight numbered decisions with rationale, alternatives considered, and revisit triggers.

## Key Decisions Made

| # | Decision | One-Line Rationale |
|---|----------|-------------------|
| 001 | Mtn is an adventure readiness system | Adventure is the goal; diet and training serve it |
| 002 | Builder is the sole day-one user | Build for one, architect for many |
| 003 | MVP = adventure planning + nutritional guidance + the bridge between them | Original 25+ features filtered to what traces back to adventure readiness |
| 004 | Three trail anchors define fitness progression | WCT (current max) → Rockwall (stretch) → GDT Section B (2-year goal) |
| 005 | Three interaction modes: morning briefing, scheduled nudges, intelligent triggers | Matches "check in the morning" pattern without requiring constant input |
| 006 | Claude API as intelligence layer | App manages data/state/UI; Claude manages reasoning/explanation |
| 007 | Shape Up framework, 4-week cycles + 1-week cooldowns | Best fit for solo builder at risk of overbuilding |
| 008 | Python + plain HTML/CSS/JS + SQLite + Claude API | Matches current skill level, no premature complexity |

## The Scoping Process Used

The conversation followed a structured interview approach:

1. **Identified the hierarchy of ends** (Aristotle): What is the app *for* at the deepest level? → Adventure readiness
2. **Captured two usage scenarios**: Meal planning before grocery shopping for adventure health, and finding the right adventure for current fitness
3. **Discovered the throughline**: Diet isn't standalone — it serves adventure. This became the core design principle.
4. **Established concrete fitness anchors**: Three specific trails at three difficulty levels, revealing that the real gap is body-systems management (hydration, electrolytes, kidney stress), not raw strength
5. **Defined interaction pattern**: Morning briefing + push notifications + data-triggered alerts
6. **Drew the MVP boundary**: Used Eisenhower matrix to filter 25+ features down to two pillars and a bridge
7. **Selected framework**: Shape Up, evaluated against Lean Startup and Agile Scrum across six criteria
8. **Built the roadmap**: Five cycles from skeleton to daily-use app (~5 months)

## Critical Insight

The gap between the user's current fitness and their 2-year goal (GDT Section B) is not about leg strength. It's about learning to manage the body as a system over multi-day efforts — hydration, caloric intake, electrolyte balance, recovery between days, and renal resilience. This insight shapes the entire app: it's why nutrition and hydration are core features, not afterthoughts.

## What Comes Next

**Cycle 0 (2 weeks):** Set up Python project, build data model (User, Adventure, Training Log, Daily Check-in), implement one feature (set target adventure + static readiness dashboard), connect Claude API for morning briefing generation, run locally.

**Ship criterion for Cycle 0:** Open browser → see target adventure → log training session → read Claude-generated briefing.

## Tone and Working Style

- Direct, no hedging
- Explain technical concepts in plain language
- Use established frameworks and name their origins (the user wants to learn the thinking tools, not just the outputs)
- Follow-up questions only when they genuinely advance the work
- The user appreciates when scope is challenged — they know the vision is bigger than what one person can build
