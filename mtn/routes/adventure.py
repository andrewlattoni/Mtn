from flask import Blueprint, render_template, request, redirect, url_for
from models.db import get_db
from datetime import date

bp = Blueprint("adventure", __name__)


@bp.route("/adventure", methods=["GET"])
def adventure():
    db = get_db()
    current = db.execute(
        "SELECT * FROM adventure WHERE is_active = 1 ORDER BY created_at DESC LIMIT 1"
    ).fetchone()
    feed = _build_feed(db)
    today = date.today().isoformat()
    return render_template(
        "adventure.html", active="adventure", current=current, feed=feed, today=today
    )


@bp.route("/adventure", methods=["POST"])
def adventure_submit():
    db = get_db()

    trail_name       = request.form.get("trail_name", "").strip()
    start_date       = request.form.get("start_date", "").strip()
    nights           = int(request.form.get("nights", 1) or 1)
    distance_km      = float(request.form.get("distance_km", 0) or 0)
    elevation_gain_m = int(request.form.get("elevation_gain_m", 0) or 0)
    difficulty       = request.form.get("difficulty", "Moderate").strip()

    if trail_name and start_date:
        # deactivate any previous active adventure
        db.execute("UPDATE adventure SET is_active = 0")
        db.execute(
            """INSERT INTO adventure (trail_name, start_date, nights, distance_km, elevation_gain_m, difficulty, is_active)
               VALUES (?, ?, ?, ?, ?, ?, 1)""",
            (trail_name, start_date, nights, distance_km, elevation_gain_m, difficulty),
        )
        db.commit()

    return redirect(url_for("briefing.index"))


def _build_feed(db):
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
