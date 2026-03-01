from flask import Blueprint, render_template
from models.db import get_db
from services.claude_service import generate_briefing

bp = Blueprint("briefing", __name__)


@bp.route("/")
def index():
    db = get_db()

    adventure = db.execute(
        "SELECT * FROM adventure WHERE is_active = 1 ORDER BY created_at DESC LIMIT 1"
    ).fetchone()

    recent_logs = db.execute(
        "SELECT * FROM training_log ORDER BY date DESC LIMIT 5"
    ).fetchall()

    feed = _build_feed(db)

    briefing_text = generate_briefing(adventure, recent_logs)

    return render_template(
        "briefing.html",
        active="briefing",
        adventure=adventure,
        recent_logs=recent_logs,
        briefing_text=briefing_text,
        feed=feed,
    )


def _build_feed(db):
    """Return a merged, time-sorted list of recent activity events."""
    rows = []

    logs = db.execute(
        "SELECT date, activity_type, duration_minutes, intensity, created_at FROM training_log ORDER BY created_at DESC LIMIT 10"
    ).fetchall()
    for r in logs:
        rows.append({
            "time": r["created_at"],
            "type": "training",
            "text": f"Logged: {r['activity_type']}, {r['duration_minutes']} min, {r['intensity'].lower()} intensity.",
        })

    adventures = db.execute(
        "SELECT trail_name, start_date, created_at FROM adventure ORDER BY created_at DESC LIMIT 5"
    ).fetchall()
    for r in adventures:
        rows.append({
            "time": r["created_at"],
            "type": "adventure",
            "text": f"Target adventure set: {r['trail_name']}, {r['start_date']}.",
        })

    rows.sort(key=lambda x: x["time"], reverse=True)
    return rows[:12]
