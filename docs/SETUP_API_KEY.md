# How to Get a Claude API Key

This key is what allows Mtn to call the Claude API for morning briefing generation.
Without it, the briefing screen shows a fallback message instead of live text.

---

## Step 1 — Create an Anthropic Account

Go to **https://console.anthropic.com** and sign up.
A standard Google or email account works. No special access is required.

---

## Step 2 — Add a Payment Method

The Claude API is pay-as-you-go. Anthropic requires a credit card on file before
issuing keys.

1. In the Console, click **Settings** in the left sidebar
2. Click **Billing**
3. Add a credit card

For context on cost: a morning briefing call uses roughly 300–500 tokens total
(input + output). At current API pricing, this is less than $0.01 per briefing.
Daily use for a month costs roughly $0.10–0.20 total.

---

## Step 3 — Generate an API Key

1. In the Console, click **API Keys** in the left sidebar
2. Click **Create Key**
3. Give it a name (e.g. `mtn-local`)
4. Copy the key — **it is only shown once**

---

## Step 4 — Add the Key to the App

From the `mtn/` directory:

```bash
cp .env.example .env
```

Open `.env` and replace the placeholder:

```
ANTHROPIC_API_KEY=sk-ant-...your-key-here...
```

Save the file. The `.env` file is listed in `.gitignore` — it will never be
committed to the repository.

---

## Step 5 — Verify It Works

Start the dev server (if it isn't already running):

```bash
source .venv/bin/activate
python app.py
```

Open **http://127.0.0.1:5000** in your browser.

The "Today's Briefing" card should show a paragraph of generated text, not the
fallback message. If you have a target adventure and at least one training session
logged, the briefing will reference both.

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| Fallback message: "API key not configured" | `.env` file missing or key not saved | Re-check Step 4 |
| `AuthenticationError` in the terminal | Key is invalid or was deleted | Generate a new key in the Console |
| `Briefing unavailable: ...` on the page | Network error or billing issue | Check Console for errors; verify billing is active |

The error is always printed to the terminal where `python app.py` is running —
that's the first place to look if something goes wrong.
