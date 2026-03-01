# Mtn — Adventure Readiness App

## Project
An adventure readiness system that bridges daily nutrition and training with long-term preparation for multi-day wilderness adventures across Canada.

Core principle: the adventure is the goal. Nutrition and training serve it.

Load `ConversationContext_Mtn_20260228.md` to restore full project context and decisions.

## Stack
- Python backend (Flask)
- Plain HTML/CSS/JS (no frontend framework in v1)
- SQLite database
- Claude API (intelligence layer: meal plans, briefings, recommendations)
- Local-first deployment

## Status
Cycle 0 in progress. Project skeleton running locally.

## Commands
Run from `mtn/` directory:
- Activate venv: `source .venv/bin/activate`
- Dev server: `python app.py` → http://127.0.0.1:5000
- Tests: `pytest` (placeholder — no tests yet)

## Scope Guard
Before adding any feature, verify it traces back to adventure readiness.
- Check `DecisionLog_Mtn.md` Decision 001 (product identity)
- Check `DecisionLog_Mtn.md` Decision 003 (MVP scope — what's explicitly out)

## Mistakes to Avoid

**Never put a real API key in .env.example.**
.env.example is tracked by git. The real key belongs in .env (gitignored).
The correct workflow: copy .env.example to .env, then add the key to .env only.
If a key is ever written to .env.example, revoke it immediately in the Anthropic
Console — assume it compromised — then generate a new one. See docs/SECURITY.md.

**load_dotenv() must use override=True and an explicit path.**
The shell environment (e.g. Claude Code) pre-sets ANTHROPIC_API_KEY to an empty
string. Without override=True, load_dotenv silently skips .env and the API key
is never loaded. Without Path(__file__).parent, the .env path is relative to the
shell's working directory, not the project directory. Both fixes are in app.py.
