import os
from pathlib import Path
from flask import Flask
from dotenv import load_dotenv

# Load .env relative to this file's location, not the shell's working directory.
# override=True ensures .env values win even if the variable is already set in
# the shell environment (e.g. set to empty by another tool).
load_dotenv(dotenv_path=Path(__file__).parent / ".env", override=True)

from models.db import init_db
from routes.briefing import bp as briefing_bp
from routes.training import bp as training_bp
from routes.adventure import bp as adventure_bp


def create_app():
    app = Flask(__name__)
    app.secret_key = os.environ.get("SECRET_KEY", "mtn-dev-secret")

    # Register route blueprints
    app.register_blueprint(briefing_bp)
    app.register_blueprint(training_bp)
    app.register_blueprint(adventure_bp)

    # Add a Jinja2 filter: days_until("2026-07-15") → 137
    from datetime import date, datetime

    def days_until(date_str):
        try:
            target = datetime.strptime(str(date_str), "%Y-%m-%d").date()
            return max(0, (target - date.today()).days)
        except (ValueError, TypeError):
            return "—"

    app.jinja_env.filters["days_until"] = days_until

    # Create database tables if they don't exist
    init_db(app)

    return app


if __name__ == "__main__":
    app = create_app()
    print("\n  MTN dev server running → http://127.0.0.1:5000\n")
    # host='127.0.0.1' explicitly binds to localhost only — never the network.
    # This means the app is unreachable from other devices even on the same Wi-Fi.
    app.run(debug=True, host="127.0.0.1", port=5000)
