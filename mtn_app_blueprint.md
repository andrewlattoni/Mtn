# Mtn App — Master Blueprint

*Last updated: February 2026. This is the authoritative product reference. Update it when decisions change — don't let it drift from the DecisionLog.*

---

## Product Vision

Mtn is an adventure readiness system. It bridges daily nutrition and training with preparation for multi-day wilderness adventures across Canada.

**Core principle:** The adventure is the goal. Nutrition and training serve it.

This is not a generic health tracker. It is not a meal planner. It is not a trail database. Every feature must trace back to the question: does this make the next wilderness adventure more achievable, safer, or better?

---

## The Problem It Solves

The gap between the builder's current fitness and their 2-year goal is not leg strength. It is learning to manage the body as a system over consecutive high-output days: hydration, caloric intake, electrolyte balance, recovery between days, and renal resilience. Without a system, the user either under-prepares (goes underfueled, gets injured) or over-trains (burns out, can't sustain).

The app creates a feedback loop: set a target adventure → understand what it demands → train and eat to close the gap → read daily briefings that connect today's choices to the goal.

---

## Fitness Anchors

Three specific Canadian trails define the progression the app is built around:

| Level | Trail | Key Demand |
|-------|-------|------------|
| Current comfortable max | West Coast Trail (~85km, 6 nights) | Baseline — user can do this with margin today |
| Current stretch | Rockwall Trail, Kootenay NP (4 nights) | Systems management: hydration, electrolytes, kidney stress |
| 2-year goal | GDT Section B, Coleman to Kananaskis Lakes (8–10 nights) | North star — everything the app builds toward |

The Rockwall gap analysis is the key insight: the limiting factor is body-systems management, not raw strength. This is why nutrition and hydration are core features.

---

## MVP Scope

### Two Pillars and a Bridge

**Pillar 1 — Adventure Planning**
- Set a target adventure
- View fitness requirements for that adventure
- Track readiness score based on logged training

**Pillar 2 — Nutritional Guidance**
- Claude-generated 3-day meal plans
- Focus areas: kidney health, anti-inflammatory, cardiovascular
- Guidance grounded in the user's current training load

**The Bridge — Adventure-Aware Nutrition**
- Nutritional recommendations adjust based on proximity to the next adventure
- Morning briefing connects today's nutrition and training to the target adventure

### Explicitly Out of MVP
- Sports (soccer, hockey, skiing, racquet sports)
- Apple Health / Peloton integration
- Maps and sun path analysis
- Gear and grocery shopping features
- Multi-user support
- Dehydrated food and water filtration planning
- No-code / dashboard tools

*Before adding anything, check whether it passes the scope guard: does it trace back to adventure readiness? See DecisionLog Decision 001 and Decision 003.*

---

## Interaction Model

Three modes, designed around a "2–3 minutes in the morning" engagement pattern:

| Mode | Type | Trigger | Example |
|------|------|---------|---------|
| Morning briefing | User pulls | User opens app | "You're 6 weeks from Rockwall. Yesterday's hike was solid. Here's your 3-day meal plan." |
| Scheduled nudge | App pushes | Calendar rhythm | "Adventure is 3 weeks out — time to start tapering carb-heavy meals." |
| Intelligent trigger | App pushes | Data condition | "You've logged 3 consecutive rest days. Readiness score is dropping." |

The app cannot rely on active logging throughout the day. The briefing must be valuable in a single 2-minute read.

---

## Intelligence Layer

The Claude API handles all reasoning and explanation. The app handles data, state, and UI.

**Claude does:**
- Morning briefing generation
- 3-day meal plan generation
- Training recommendations
- Pattern-based alerts
- Plain-language explanations of nutritional science

**The app does:**
- Store and retrieve user data
- Calculate readiness scores
- Trigger Claude API calls at the right moments
- Display outputs clearly

*See DecisionLog Decision 006 for API risks and mitigations.*

---

## Technical Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Backend | Python + Flask or FastAPI | Claude Code-friendly, simple, no overhead |
| Frontend | Plain HTML/CSS/JS | No framework justified at v1 complexity |
| Database | SQLite | Single-user, local-first, no server setup |
| Intelligence | Claude API | Reasoning and explanation layer |
| Deployment | Local-first | No hosting costs or complexity during build |

Flask vs. FastAPI to be decided during Cycle 0 setup.

---

## Data Model (Core Tables)

| Table | Purpose |
|-------|---------|
| User | Builder profile — weight, health context, preferences |
| Adventure | Target adventure with trail data and fitness requirements |
| TrainingLog | Manual activity entries (date, type, duration, intensity, notes) |
| DailyCheckin | Morning inputs (sleep, hydration, energy, weight) |

*Schema details defined during Cycle 0 implementation.*

---

## Roadmap — Shape Up Cycles

Framework: Shape Up (4-week build cycles + 1-week cooldowns). Scope is shaped to fit the time appetite — the time budget does not expand to fit scope.

### Cycle 0 — Skeleton (2 weeks)
**Ship criterion:** Open browser → see target adventure → log training session → read Claude-generated briefing.

- Python project setup, dependencies, folder structure
- SQLite schema: User, Adventure, TrainingLog, DailyCheckin
- Set target adventure (static UI)
- Log a training session (form → database)
- Claude API: morning briefing generation (basic)
- Local dev server running

### Cycle 1 — Nutrition Pillar (4 weeks)
**Ship criterion:** Generate a 3-day meal plan from the app, tuned to the current target adventure.

- Meal plan generation via Claude API
- User health profile input (kidney history, dietary preferences)
- Basic meal plan display
- Adventure-proximity adjustment (simple: weeks-out calculation)

### Cycle 2 — Readiness Scoring (4 weeks)
**Ship criterion:** Readiness score updates in real-time as training is logged; morning briefing references it.

- Readiness scoring algorithm (training load vs. trail demands)
- Training log history view
- Briefing upgraded to reference readiness score
- Cooldown: assess both pillars, validate the bridge is working

### Cycle 3 — Interaction Polish (4 weeks)
**Ship criterion:** App can push a scheduled nudge and a data-triggered alert without user action.

- Scheduled nudge system (adventure proximity calendar)
- Intelligent trigger system (data condition monitoring)
- Notification or in-app alert delivery

### Cycle 4 — Daily Use Hardening (4 weeks)
**Ship criterion:** 30 consecutive days of personal daily use with no manual intervention needed.

- Stability, edge case handling
- UX improvements from 60+ days of personal use data
- Assessment: multi-user support? Frontend framework? (See DecisionLog)

---

## Organizing Principles

1. **Adventure first.** Every feature must trace back to making the next adventure more achievable.
2. **Build for one.** The builder is the sole user until Cycle 4 validation. No premature generalization.
3. **Shape Up discipline.** Time appetite is fixed. Scope is cut to fit — never the reverse.
4. **Claude does the thinking.** The app is a data and delivery layer. Claude is the reasoning layer.
5. **Local-first.** No hosting complexity until the app has proven daily value.
6. **Decisions are documented.** Don't change direction silently. Log it in DecisionLog_Mtn.md.
