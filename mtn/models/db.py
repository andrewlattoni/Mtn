import sqlite3
from flask import g

DATABASE = "mtn.db"


def get_db():
    """Open a database connection scoped to the current request."""
    if "db" not in g:
        g.db = sqlite3.connect(DATABASE, detect_types=sqlite3.PARSE_DECLTYPES)
        g.db.row_factory = sqlite3.Row  # rows behave like dicts
    return g.db


def close_db(e=None):
    db = g.pop("db", None)
    if db is not None:
        db.close()


def init_db(app):
    """Create all tables if they don't exist. Called once at startup."""
    with app.app_context():
        db = get_db()
        db.executescript("""
            CREATE TABLE IF NOT EXISTS user (
                id          INTEGER PRIMARY KEY,
                name        TEXT    NOT NULL DEFAULT 'Builder',
                weight_kg   REAL,
                notes       TEXT,
                created_at  TEXT    DEFAULT (datetime('now'))
            );

            CREATE TABLE IF NOT EXISTS adventure (
                id              INTEGER PRIMARY KEY,
                trail_name      TEXT    NOT NULL,
                start_date      TEXT    NOT NULL,
                nights          INTEGER NOT NULL,
                distance_km     REAL    NOT NULL,
                elevation_gain_m INTEGER NOT NULL,
                difficulty      TEXT    NOT NULL,
                is_active       INTEGER NOT NULL DEFAULT 1,
                created_at      TEXT    DEFAULT (datetime('now'))
            );

            CREATE TABLE IF NOT EXISTS training_log (
                id              INTEGER PRIMARY KEY,
                date            TEXT    NOT NULL,
                activity_type   TEXT    NOT NULL,
                duration_minutes INTEGER NOT NULL,
                intensity       TEXT    NOT NULL,
                notes           TEXT,
                created_at      TEXT    DEFAULT (datetime('now'))
            );

            CREATE TABLE IF NOT EXISTS daily_checkin (
                id              INTEGER PRIMARY KEY,
                date            TEXT    NOT NULL UNIQUE,
                sleep_hours     REAL,
                hydration_l     REAL,
                energy_level    INTEGER,
                weight_kg       REAL,
                notes           TEXT,
                created_at      TEXT    DEFAULT (datetime('now'))
            );
        """)
        db.commit()
    app.teardown_appcontext(close_db)
