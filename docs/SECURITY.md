# Mtn — Security Procedure

## What the risk actually is

The Claude API key is a secret that authorizes charges to your Anthropic account.
The goal of this procedure is to ensure that key never leaves your machine
unintentionally. There are two distinct threat vectors:

**1. Accidental git exposure**
The most common real-world cause of leaked API keys is committing them to a
repository and pushing to GitHub. Anyone with read access to that repo gets the key.

**2. Network exposure**
If the Flask server binds to a network-accessible address (0.0.0.0 instead of
127.0.0.1), other devices on your Wi-Fi — or the internet — could reach the app
and trigger API calls at your expense.

Mtn is a local-first app. The key never needs to leave your machine.

---

## What is already protected

These safeguards are already in place and do not require action:

| Protection | How | Where |
|------------|-----|--------|
| `.env` is never committed to git | Listed in `mtn/.gitignore` | `mtn/.gitignore` line 2 |
| Flask binds to localhost only | `host="127.0.0.1"` explicit in `app.run()` | `mtn/app.py` line 44 |
| API key loaded from environment | `load_dotenv()` + `os.environ.get()` | `mtn/app.py`, `mtn/services/claude_service.py` |
| Key placeholder, not value, is committed | `.env.example` has `your_key_here` | `mtn/.env.example` |
| No key hardcoded anywhere | Verified by `git grep` scan | — |

---

## Steps to complete now (one-time setup)

### Step 1 — Set a spending limit in the Anthropic Console

This is the most important active step. A spending limit caps the maximum damage
if the key is ever compromised.

1. Go to **https://console.anthropic.com**
2. Click **Settings → Billing**
3. Set a **monthly spend limit** — $5–10 is more than enough for daily personal use
4. Optionally enable email alerts at a lower threshold (e.g. alert at $2)

Mtn's expected cost is roughly **$0.10–0.20/month** at daily use.
A $5 limit gives 25–50× headroom before anything is blocked.

### Step 2 — Confirm your `.env` file was never staged

Before or after creating `.env`, run this from the repo root:

```bash
git status
```

`.env` should never appear in the output. If it does, run immediately:

```bash
git rm --cached mtn/.env
```

Then commit that change. The key has not been pushed until you push.

---

## Ongoing practices

**Never paste the key anywhere except `.env`.**
Not in a message, not in a note, not in code, not in a comment.
If you need to share the key with another machine you own, use a password manager.

**Never change `host="127.0.0.1"` to `host="0.0.0.0"`.**
`0.0.0.0` tells Flask to accept connections from any device on the network.
This is appropriate for production deployments, not local development.

**Treat the `.env` file like a password.**
Don't copy it to cloud-synced folders (Desktop, Documents if iCloud is on, Dropbox).
The `mtn/` project directory is fine if that directory is not itself synced.

---

## If the key is compromised

If you suspect the key has been exposed (committed to git, shared accidentally,
unusual billing activity), take these steps in order:

1. **Revoke the key immediately** — Anthropic Console → API Keys → Delete
   A revoked key stops working within seconds.

2. **Generate a new key** — same page, Create Key

3. **Update `.env`** with the new key

4. **Check billing** — Console → Billing → Usage. Look for any spikes
   that don't match your usage pattern.

5. **If committed to git** — contact GitHub support to purge the commit from history.
   Revoking the key first is more important than cleaning git history.

---

## Security verification (run any time)

```bash
# From the repo root — confirms .env is gitignored
git check-ignore -v mtn/.env

# Scan all tracked files for API key patterns
git grep -rn "sk-ant-"

# Confirm Flask is localhost-bound (look for host="127.0.0.1")
grep "app.run" mtn/app.py
```

All three commands should return clean results.
