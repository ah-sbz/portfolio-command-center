# NEX-25 — Merch Informer Access Restoration Report

**Date:** 2026-05-28  
**Status:** 🔴 BLOCKED — awaiting user action  
**Agent:** CMO (d66e461a-bf9c-4647-9607-01ce4cd59ab1)

---

## What Was Attempted

1. **Cookie validation** — Tested saved cookies at `github/freedom-portfolio/.merch-informer-cookies.json`
   - `merchinformer_session` and `XSRF-TOKEN` cookies dated 2026-05-07
   - Result: Redirected to `https://members.merchinformer.com/login`
   - Verdict: **Session expired**

2. **Site structure probe** — Checked alternative URLs (app subdomain, root paths)
   - `members.merchinformer.com/` → login redirect
   - `app.merchinformer.com/` → DNS error (no such host)
   - `merchinformer.com/` → redirects to members-login
   - Verdict: **No alternate entry point**

3. **API endpoint probing** — Tested common API routes with saved cookies
   - `/api/user`, `/api/products/search`, `/api/bsr`, `/dashboard` → all 404
   - Verdict: **API surface changed or requires valid session**

4. **Amazon proxy BSR scrape** — Attempted direct Amazon search scraping
   - Result: Amazon returns bot-detection page ("Sorry! Something went wrong!")
   - No BSR data retrievable without stealth tooling or CAPTCHA solving
   - Verdict: **Scraping blocked**

5. **CamoFox check** — `CAMOFOX_API_KEY` exists in `.env` but no SDK installed
   - No PyPI package available; would require manual integration
   - Verdict: **Not viable within 30-minute task scope**

---

## Blocker

**Merch Informer session cookies are expired and no login credentials are available in the environment.**

The agent cannot authenticate to Merch Informer without either:
- Fresh exported cookies from a browser session, OR
- Username/password credentials for programmatic login

---

## User Action Required (choose one)

### Option A — Export fresh cookies (fastest, ~5 min)
1. Open Chrome/Firefox and log into [https://members.merchinformer.com/login](https://members.merchinformer.com/login)
2. Use a cookie export extension (e.g. "Cookie-Editor" or "EditThisCookie")
3. Export as JSON and overwrite:
   ```
   /home/dietpi/github/freedom-portfolio/.merch-informer-cookies.json
   ```
4. Re-run `merch_informer_test.py` to confirm
5. The agent will then run the Product Search for the 5 keywords and export CSV

### Option B — Manual CSV export (if cookie export is tricky)
1. Log into Merch Informer in your browser
2. Go to **Product Search**
3. Search each of these 5 terms and export results to CSV:
   - `autism shirt`
   - `ADHD shirt`
   - `neurodivergent shirt`
   - `autistic adult shirt`
   - `ADHD women shirt`
4. Place the CSV(s) in:
   ```
   /home/dietpi/.paperclip/instances/default/projects/cf423e32-bb03-499d-8d10-93a04cbe2d98/8c9ba353-b4c0-4b26-80c7-9e5b4981aca2/_default/
   ```
5. Ping this issue and the agent will parse BSRs + Merch-vs-non-Merch ratios

---

## Fallback — Proxy Data Confirms GO 🟢

Per the task constraints:
> *"If Merch Informer remains inaccessible, document the blocker and we will use proxy data for the first 5 designs."*

The [NEX-23 validation report](merch-niche-validation-report.md) proxy data is sufficient to proceed:

| Keyword | Proxy Signal | Confidence |
|---------|-------------|------------|
| `autism shirt` | 10+ autocomplete variants, sub-100k BSR listings visible | HIGH |
| `ADHD shirt` | Strong community engagement (1.8M r/ADHD) | HIGH |
| `neurodivergent shirt` | Cross-platform bestsellers (Etsy, Redbubble) | MEDIUM |
| `autistic adult shirt` | Underserved long-tail, identity-specific | HIGH |
| `ADHD women shirt` | Gender/diagnosis intersection gap | HIGH |

**Verdict: GO for first 5 designs.** Live BSR data is needed only for scaling beyond the initial launch slots.

---

## Files Referenced

- `merch_informer_test.py` — Cookie validation script
- `merch-niche-validation-report.md` — NEX-23 proxy validation (GO)
- `.merch-informer-cookies.json` — Expired session store
