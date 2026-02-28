# Mtn — Decision Log

This document captures key decisions made during the development of the Mtn project. Each entry records what was decided, why, what alternatives were considered, and when the decision should be revisited.

---

## Decision 001: Product Identity

**Date:** February 2026
**Phase:** Pre-build scoping

**Decision:** Mtn is an adventure readiness system, not a generic health tracker, meal planner, or trail database.

**Context:** The original project brief contained 25+ features spanning health tracking, adventure planning, sports, shopping, maps, and multiple software types. This breadth created a scope that was undeliverable for a solo, non-technical builder.

**Rationale:** During the scoping interview, two competing usage scenarios emerged: (1) creating a meal plan before grocery shopping that supports kidney, cardiovascular, and adventure health, and (2) identifying the right adventure location based on current fitness. Both scenarios shared a common throughline — the adventure is the goal, and nutrition/training exist to serve it. This hierarchy (Aristotle's hierarchy of ends) gave us the organizing principle: everything in the app must trace back to adventure readiness.

**Alternatives considered:**
- Broad health and wellness platform → rejected (too large, no focus)
- Pure meal planning app → rejected (doesn't capture the user's primary motivation)
- Trail finding app → rejected (doesn't address the fitness/nutrition gap that makes adventures achievable)

**Revisit when:** End of Cycle 1. If the adventure-nutrition bridge isn't compelling in daily use, reconsider whether the identity should shift.

---

## Decision 002: Day-One User

**Date:** February 2026
**Phase:** Pre-build scoping

**Decision:** The builder is the sole user for v1. No multi-user support, no onboarding, no account system.

**Rationale:** Building for "me and any potential user" are fundamentally different design targets. Building for one person first is dramatically simpler and gets to a usable product faster. Multi-user support is deferred but not precluded — the architecture should be clean enough to extend later.

**Alternatives considered:**
- Build for general users from the start → rejected (premature, doubles complexity without validation)
- Build with user auth scaffolded but unused → rejected (unnecessary code to maintain before it's needed)

**Revisit when:** The app has been in daily personal use for 60+ days and the core value proposition is validated.

---

## Decision 003: MVP Scope — Two Pillars and a Bridge

**Date:** February 2026
**Phase:** Pre-build scoping

**Decision:** MVP consists of (1) Adventure Planning, (2) Nutritional Guidance, and (3) the bridge between them — adventure-aware nutrition. Everything else is deferred.

**What's in:**
- Target adventure setting with fitness requirement estimation
- Manual training activity logging with readiness scoring
- 3-day meal plan generation (kidney health, anti-inflammatory, cardiovascular)
- Claude API-powered explanations
- Adventure-proximity-based nutritional adjustments
- Morning briefing interface

**What's explicitly out:**
- Sports (soccer, hockey, skiing, racquet sports)
- Apple Health / Peloton integration
- Maps and sun path analysis
- Gear and grocery shopping features
- Multi-user support
- Dehydrated food and water filtration planning
- No-code / dashboard tools

**Rationale:** The original feature list was ~10x what one person can build and maintain. Features were filtered using the Eisenhower urgent/important matrix: only features that are both important and directly tied to the adventure readiness identity made the cut. Integration with Apple Health/Peloton was specifically flagged by the user as potentially creating brittleness.

**Revisit when:** End of Cycle 2. By then, the two pillars and bridge should be functional and the user should have enough experience to judge what's genuinely missing vs. what's nice-to-have.

---

## Decision 004: Fitness Anchors

**Date:** February 2026
**Phase:** Pre-build scoping

**Decision:** Three specific Canadian trails serve as concrete fitness reference points that the app is built around.

| Level | Trail | Purpose |
|-------|-------|---------|
| Current comfortable max | West Coast Trail (~85km, 6 nights) | Baseline — what the user can do today with margin |
| Current stretch | Rockwall Trail, Kootenay NP (4 nights) | Identifies the real gap: systems management (hydration, electrolytes, kidney stress), not raw strength |
| 2-year goal | GDT Section B, Coleman to Kananaskis Lakes (8–10 nights) | North star — everything the app builds toward |

**Rationale:** Abstract fitness goals ("get fitter") are unmeasurable and unmotivating. Concrete trail objectives create specific, testable requirements: can you sustain X km/day with Y elevation gain for Z consecutive days while maintaining hydration and caloric balance? The gap analysis between trails revealed that the limiting factor is body-systems management, not leg strength — which directly shaped the app's focus on nutrition, hydration, and recovery.

**Revisit when:** The user completes (or attempts) the Rockwall Trail. Anchors should be updated based on real performance data.

---

## Decision 005: Interaction Model

**Date:** February 2026
**Phase:** Pre-build scoping

**Decision:** Three interaction modes — morning briefing (user pulls), scheduled nudges (app pushes on rhythm), intelligent triggers (app pushes on data).

**Rationale:** The user self-identified as a "check it in the morning" person. Daily engagement window is 2–3 minutes, which means the app cannot rely on active logging throughout the day. The scheduled nudge and intelligent trigger modes allow the app to provide value without requiring constant user input. The user specifically suggested Claude-powered notifications and data-triggered alerts as a way to keep engagement without creating homework.

**Alternatives considered:**
- Dashboard-heavy design requiring active exploration → rejected (doesn't match actual usage pattern)
- Passive logging only (just record data) → rejected (misses the teaching/guidance function the user wants)

**Revisit when:** After 30 days of daily use. If the morning briefing isn't being opened, the interaction model needs to change.

---

## Decision 006: Claude API as Intelligence Layer

**Date:** February 2026
**Phase:** Pre-build scoping

**Decision:** Use the Claude API as the app's reasoning engine for meal plan generation, training recommendations, contextual explanations, and pattern-based alerts.

**Rationale:** The app needs to teach the user about nutrition (kidney health, anti-inflammatory diet, cardiovascular nutrition) and generate personalized guidance. Building this knowledge into the app itself would be enormous and brittle. Claude can interpret user data in context and generate adaptive, explained recommendations. This reduces the builder's burden to: manage data, state, and interface. Claude manages reasoning and explanation.

**Risks:**
- API dependency — if the API is down, core features break
- Cost — API calls per morning briefing, meal plan generation, and triggers add up
- Quality — Claude's nutritional advice needs to be grounded and safe

**Mitigations:**
- Cache common recommendations locally
- Set API budget limits per cycle
- Include disclaimer that recommendations are educational, not medical advice

**Revisit when:** End of Cycle 1, when meal plan generation is live. Assess: is the Claude output quality sufficient? Is the cost sustainable? Is latency acceptable for the morning briefing?

---

## Decision 007: Framework Selection — Shape Up

**Date:** February 2026
**Phase:** Pre-build scoping

**Decision:** Use Shape Up (Ryan Singer / Basecamp) as the project management framework, adapted for solo work with 4-week build cycles and 1-week cooldowns.

**Rationale:** Evaluated against Lean Startup and Agile Scrum across six criteria (complexity fit, scalability, change management, adaptability, time to value, tool agnosticism). Shape Up scored highest on five of six dimensions. Its core mechanism — setting a time appetite before shaping scope to fit — directly addresses the project's biggest risk: overbuilding. Lean Startup's hypothesis-driven validation is incorporated within each cycle but its formal build-measure-learn loop assumes faster iteration than a solo learning builder can sustain. Agile Scrum's ceremonies and role assumptions are overhead without a team.

**Alternatives considered:**
- Lean Startup → runner-up; its thinking informs validation within cycles
- Agile Scrum → rejected for solo work (designed for teams with distinct roles)

**Revisit when:** End of Cycle 2. If the 4-week cadence feels wrong (too long or too short), adjust.

---

## Decision 008: Technical Stack

**Date:** February 2026
**Phase:** Pre-build scoping

**Decision:** Python backend (Flask or FastAPI), plain HTML/CSS/JS frontend, SQLite database, Claude API integration. Local-first deployment.

**Rationale:** The builder is learning to code and has some Python experience. Python is the most accessible backend language for this skill level. No frontend framework in v1 — the added complexity of React/Vue isn't justified when the interface is a morning briefing dashboard. SQLite avoids database server setup while the app is single-user. Local-first means no hosting costs or deployment complexity during the build phase.

**Alternatives considered:**
- No-code tools (Bubble, Retool) → rejected (the user wants to learn to build, not use shortcuts)
- React/Vue frontend → rejected for v1 (premature complexity)
- PostgreSQL → rejected for v1 (unnecessary for single-user local app)

**Revisit when:** If/when multi-user support is added, SQLite will need to be replaced with PostgreSQL or similar. Frontend framework decision revisits at Cycle 4.

---

## How to Use This Document

- **Before starting a new cycle:** Review relevant decisions to confirm they still hold.
- **When tempted to add scope:** Check whether the new feature traces back to the adventure readiness identity (Decision 001) and passes the MVP filter (Decision 003).
- **When a decision feels wrong:** Don't change it silently. Add a new entry documenting the revision, the reason, and what you learned.
- **Format for new entries:** Copy the template of any entry above. Include: Date, Phase, Decision, Context, Rationale, Alternatives considered, Revisit trigger.
