# Framework Selection Prompt — Completed

You are an accomplished physician consultant with specialization in nephrology, cardiology and vascular medicine. You have a deep knowledge of the kinesiology of mountaineering and cycling and have a lifetime of experience in training to optimize mental, emotional and physical health for these activities.

## Objective

Recommend three proven frameworks for planning and executing the project described below — especially suited to work where streams are interdependent but lack a strict sequential order. The selected frameworks must be practical and repeatable.

## Evaluation Criteria

Assess each framework against these dimensions:

- **Complexity fit**: How well does it handle ambiguous dependencies and competing priorities?
- **Scalability**: Does it match the scale of this project (team size, scope, duration)?
- **Change management**: Does it account for human/organizational resistance?
- **Adaptability**: Can it absorb scope changes and shifting priorities mid-execution?
- **Time to value**: How quickly can someone start using it without heavy upfront investment?
- **Tool agnosticism**: Can it be implemented with simple tools (docs, spreadsheets) or does it require specialized software?

## Project Context

- **Project name**: Mtn
- **Goal**: An adventure readiness system that bridges daily nutrition and training with long-term preparation for increasingly challenging multi-day wilderness adventures across Canada. Diet and training exist to serve adventure readiness — not as standalone health tracking.
- **Scale**: Solo project. Day-one user is the builder. Architecture should support future multi-user extension without a rewrite.
- **Core design principle**: The adventure is the goal. Everything else serves the adventure.

### Key Work Streams (Scoped to MVP)

**Pillar 1 — Adventure Planning**
- Set a target adventure (trail, dates, distance, elevation, nights)
- Fitness requirement estimation for the target
- Manual training activity logging
- Readiness score comparing logged training against adventure demands

**Pillar 2 — Nutritional Guidance**
- 3-day meal plan generator focused on kidney health, anti-inflammatory diet, cardiovascular nutrition
- Claude API-powered explanations connecting each recommendation to health outcomes and adventure goals
- Simple daily adherence logging

**The Bridge — Adventure-Aware Nutrition**
- Meal plans adjust based on proximity to the next adventure
- Training load influences nutritional guidance
- Dehydration risk modeling based on trail conditions and hydration patterns

### Fitness Anchors (Concrete Reference Points)

| Level | Trail | Key Demands |
|-------|-------|-------------|
| Current comfortable max | West Coast Trail, Vancouver Island (~85km, 6 nights) | Endurance, footing, basic multi-day self-sufficiency |
| Current stretch | Rockwall Trail, Kootenay NP (4 nights, alpine) | Hydration/electrolyte management, kidney stress, caloric timing |
| 2-year goal | GDT Section B, Coleman to Kananaskis Lakes (8–10 nights) | Mental endurance, logistical precision, extended self-sufficiency |

### Interaction Model

1. **Morning briefing** (user pulls, 2–3 minutes): Today's meal focus, training note, readiness snapshot
2. **Scheduled nudges** (app pushes on rhythm): Hydration reminders, weekly trends, grocery planning triggers
3. **Intelligent triggers** (app pushes on data): Pattern detection for missed targets, readiness plateau alerts

### Technical Approach

- Python backend (Flask or FastAPI)
- Simple HTML/CSS/JS frontend (no framework in v1)
- SQLite database
- Claude API as reasoning engine for recommendations and explanations
- Local-first, deployable to cloud when ready

- **Known dependencies**: Planning blocks design, design blocks build. Claude API is a core dependency for the intelligence layer.
- **Constraints**: Builder is learning to code — explanations in plain language are essential. The project also serves as a vehicle for learning to organize complex work using established frameworks.
- **Biggest risk**: Building too much and losing interest. The app must earn its place in the user's daily routine within 30 days of first use.

### What's Explicitly Out of MVP

Sports (soccer, hockey, skiing, racquet sports), Apple Health/Peloton integration, maps and sun path analysis, gear/grocery shopping features, multi-user support, dehydrated food planning, water filtration guidance, no-code/dashboard tools.

## Deliverables — Completed

### 1. Comparison Table

| Criterion | Shape Up | Lean Startup | Agile Scrum |
|-----------|----------|-------------|-------------|
| Complexity fit | ★★★★★ | ★★★★ | ★★★ |
| Scalability | ★★★★★ | ★★★★ | ★★ |
| Change management | ★★★★ | ★★★ | ★★★ |
| Adaptability | ★★★★★ | ★★★★★ | ★★★ |
| Time to value | ★★★★★ | ★★★★ | ★★ |
| Tool agnosticism | ★★★★★ | ★★★★ | ★★ |

### 2. Recommendation

**Shape Up** (Ryan Singer / Basecamp) — adapted for solo work with 4-week build cycles and 1-week cooldowns. Its appetite-based scoping is the strongest natural constraint against the primary risk: overbuilding. Lean Startup thinking (hypothesis-driven validation) is incorporated within each cycle.

### 3. Starter Roadmap

- **Cycle 0 (2 weeks):** Foundation — working skeleton, one Claude-powered feature, target adventure + readiness dashboard
- **Cycle 1 (4 weeks):** Nutritional intelligence — meal plan generator with Claude explanations, adherence logging, adventure-aware recommendations
- **Cycle 2 (4 weeks):** Training & readiness engine — dynamic readiness score, training recommendations, scheduled nudges, pattern detection
- **Cycle 3 (4 weeks):** Adventure-adaptive nutrition — dynamic nutritional adjustments, dehydration risk modeling, pre-trip protocols
- **Cycle 4 (4 weeks):** Polish & integrate — UI refinement, data export, integration exploration, grocery lists

Full roadmap details are in `mtn_app_blueprint.md`.
