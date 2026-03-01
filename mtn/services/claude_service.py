import os
from anthropic import Anthropic
from datetime import date, datetime

client = Anthropic()  # reads ANTHROPIC_API_KEY from environment automatically


def generate_briefing(adventure, recent_logs):
    """
    Generate a morning briefing using the Claude API.

    adventure   — sqlite3.Row or None (active adventure)
    recent_logs — list of sqlite3.Row (last 5 training sessions)

    Returns a plain-text briefing string.
    Falls back to a static message if the API key is missing or the call fails.
    """
    if not os.environ.get("ANTHROPIC_API_KEY"):
        return (
            "API key not configured. Add ANTHROPIC_API_KEY to your .env file "
            "to enable morning briefing generation."
        )

    today = date.today().strftime("%A, %B %-d, %Y")

    # Build adventure context
    if adventure:
        try:
            start = datetime.strptime(adventure["start_date"], "%Y-%m-%d").date()
            days_out = (start - date.today()).days
        except (ValueError, TypeError):
            days_out = None

        adventure_ctx = (
            f"Target adventure: {adventure['trail_name']}, "
            f"{adventure['nights']} nights, {adventure['distance_km']} km, "
            f"{adventure['elevation_gain_m']} m elevation gain, "
            f"difficulty: {adventure['difficulty']}, "
            f"start date: {adventure['start_date']}"
            + (f" ({days_out} days from today)" if days_out is not None else "")
            + "."
        )
    else:
        adventure_ctx = "No target adventure has been set yet."

    # Build training context
    if recent_logs:
        log_lines = []
        for r in recent_logs:
            hours, mins = divmod(r["duration_minutes"], 60)
            duration_str = f"{hours}h {mins}m" if hours else f"{mins}m"
            log_lines.append(
                f"  - {r['date']}: {r['activity_type']}, {duration_str}, {r['intensity'].lower()} intensity"
                + (f". Notes: {r['notes']}" if r["notes"] else "")
            )
        training_ctx = "Recent training sessions:\n" + "\n".join(log_lines)
    else:
        training_ctx = "No training sessions logged yet."

    prompt = f"""Today is {today}.

You are the intelligence layer of Mtn, an adventure readiness app. Generate a concise morning briefing for the user — a solo builder training toward multi-day wilderness adventures in Canada.

Context:
{adventure_ctx}
{training_ctx}

Write a briefing of 3–5 sentences. Be direct and specific. Connect today's nutrition and recovery to the target adventure. If no adventure is set, encourage them to set one. If no training is logged, encourage them to log their first session. Do not use bullet points — write in plain prose."""

    try:
        message = client.messages.create(
            model="claude-opus-4-5",
            max_tokens=300,
            messages=[{"role": "user", "content": prompt}],
        )
        return message.content[0].text
    except Exception as e:
        return f"Briefing unavailable: {e}"
