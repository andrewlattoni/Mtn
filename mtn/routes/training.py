from flask import Blueprint, render_template, request, redirect, url_for
from models.db import get_db
from datetime import date

bp = Blueprint("training", __name__)


@bp.route("/log", methods=["GET"])
def log():
    db = get_db()
    feed = _build_feed(db)
    today = date.today().isoformat()
    return render_template("log_training.html", active="log", feed=feed, today=today)


@bp.route("/log", methods=["POST"])
def log_submit():
    db = get_db()

    log_date       = request.form.get("date", date.today().isoformat())
    activity_type  = request.form.get("activity_type", "").strip()
    hours          = int(request.form.get("hours", 0) or 0)
    mins           = int(request.form.get("mins", 0) or 0)
    intensity      = request.form.get("intensity", "").strip()
    notes          = request.form.get("notes", "").strip()

    duration_minutes = hours * 60 + mins

    if activity_type and intensity and duration_minutes > 0:
        db.execute(
            """INSERT INTO training_log (date, activity_type, duration_minutes, intensity, notes)
               VALUES (?, ?, ?, ?, ?)""",
            (log_date, activity_type, duration_minutes, intensity, notes),
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
