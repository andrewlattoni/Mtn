# Mtn Project — Conversation Context (March 1, 2026)

Load this file at the start of any new session to restore context from the Cycle 0 build session.
The prior planning context lives in `ConversationContext_Mtn_20260228.md`.

---

## Session Summary

Cycle 0 skeleton built and running. All three ship criterion actions verified end-to-end.
The app is ready for daily use.

---

## What Was Built This Session

### Project Structure (`mtn/`)
```
mtn/
├── app.py                    # Flask entry point, blueprint registration, Jinja filter
├── requirements.txt          # flask, anthropic, python-dotenv
├── .env.example              # Placeholder only — never a real key
├── .env                      # Gitignored — real API key lives here
├── .gitignore
├── models/
│   └── db.py                 # SQLite connection + 4-table schema
├── routes/
│   ├── briefing.py           # GET / — morning briefing + activity feed
│   ├── training.py           # GET+POST /log — log training session
│   └── adventure.py          # GET+POST /adventure — set target adventure
├── services/
│   └── claude_service.py     # Claude API call → briefing text with fallback
├── templates/
│   ├── base.html             # Shell: collapsible left nav + topbar + collapsible right feed
│   ├── briefing.html         # Morning briefing screen
│   ├── log_training.html     # Training log form (chip selectors, duration, intensity)
│   └── adventure.html        # Adventure form + live JS summary sidebar
└── static/
    ├── css/style.css         # Full design token system (monochromatic green on dark)
    └── js/main.js            # Nav + feed toggle
```

### Documentation Added
- `docs/SETUP_API_KEY.md` — Step-by-step Anthropic API key acquisition procedure
- `docs/SECURITY.md` — Full security posture: what's protected, what to do now, incident response
- `docs/design-reference/Mtn_App.jsx` — JSX design reference (pre-existed, built in Claude Chat)

---

## Database Schema

Four tables, created automatically on first run:

| Table | Key Columns |
|-------|------------|
| `user` | id, name, weight_kg, notes |
| `adventure` | id, trail_name, start_date, nights, distance_km, elevation_gain_m, difficulty, is_active |
| `training_log` | id, date, activity_type, duration_minutes, intensity, notes |
| `daily_checkin` | id, date, sleep_hours, hydration_l, energy_level, weight_kg, notes |

Test data in DB from verification run: Rockwall Trail (Jul 15 2026) + 1 hiking session (135 min, Moderate).

---

## Decisions Made This Session

### Flask over FastAPI (closes DecisionLog Decision 008)
FastAPI's async and validation advantages don't apply to a single-user, HTML-serving,
sequential-request app. Flask's Jinja2 templating, simpler debugging, and deeper
documentation coverage are the right fit. Documented in DecisionLog Decision 008.

### Security posture (local-first)
- `.env` gitignored; real key never committed
- Flask bound to `host="127.0.0.1"` explicitly (not default reliance)
- `load_dotenv(override=True, dotenv_path=Path(__file__).parent / ".env")` — see below
- Anthropic Console spending limit set ($5–10/month recommended)

---

## Mistakes Encountered and Resolved

### 1. API key placed in `.env.example`
User saved the real key to `.env.example` (tracked by git) instead of `.env` (gitignored).
The `mtn/` directory was still untracked at the time — key was not committed or pushed.
Resolution: `cp .env.example .env` while `.env.example` still had the real key,
then `.env.example` restored to placeholder. Key was not compromised.
Documented in `CLAUDE.md` Mistakes to Avoid.

### 2. `load_dotenv()` silently failing
Root cause: Claude Code pre-sets `ANTHROPIC_API_KEY` to an empty string in the shell
environment. Default `load_dotenv()` behaviour is to skip variables already present
in the environment, so the `.env` file was found but not applied.
Fix: `load_dotenv(dotenv_path=Path(__file__).parent / ".env", override=True)`
— path-relative (works from any working directory) + override=True (wins over shell env).
Documented in `CLAUDE.md` Mistakes to Avoid.

---

## Ship Criterion — Status

**Cycle 0 criterion:** Open browser → see target adventure → log training session → read Claude-generated briefing.

| Action | Status |
|--------|--------|
| Open browser, see target adventure | ✓ Verified — Rockwall Trail displayed |
| Log a training session | ✓ Verified — POST saves to DB, redirects to briefing |
| Read Claude-generated briefing | ✓ Verified — Live API call confirmed |

**Cycle 0 is complete.**

---

## Git State

- Branch: `cycle_0_setup`
- Base branch: `main`
- All Cycle 0 work is uncommitted (staged or untracked)
- Nothing has been pushed to remote
- **Next action: commit and merge `cycle_0_setup` → `main`**

---

## What Comes Next

### Immediate (start of next session)
- Commit `cycle_0_setup` branch with a descriptive message
- Merge to `main`
- Begin Cycle 0 cooldown: review what was built, assess the bridge between pillars

### Cycle 1 — Nutrition Pillar (4 weeks)
Ship criterion: Generate a 3-day meal plan from the app, tuned to the current target adventure.
- Meal plan generation via Claude API
- User health profile input (kidney history, dietary preferences)
- Basic meal plan display
- Adventure-proximity adjustment (weeks-out calculation)

The Meal Plan nav item already exists in the shell, gated as "Cycle 1".

---

## How to Start the App

```bash
cd /Users/andrewlattoni/Documents/RepositoryHealth/mtn
source .venv/bin/activate
python app.py
# → http://127.0.0.1:5000
```
