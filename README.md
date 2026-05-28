# Freedom Portfolio — Command Center

A static, autism/ADHD-adapted dashboard for tracking the 90-day Freedom Portfolio income campaign.

## Tech Stack
- [Astro](https://astro.build/) — static site generator
- YAML data files — single source of truth for portfolio state
- GitHub Pages — free hosting

## Live URL
> <will be set after first deploy>

## Editing Your Data

All state lives in `site/src/data/portfolio.yml`. Edit this file and push to `main` to update the site (GitHub Actions rebuilds automatically).

### Key Sections

| Section | What to edit |
|---------|-------------|
| `campaign` | Start date and duration |
| `lanes` | Status, targets, and next actions for each income lane |
| `weeklyBudget` | Hours used this week |
| `coolingQueue` | Ideas waiting out the 72-hour filter |
| `weeklyRhythm` | Daily checkbox state |

### Status Values
Use exactly these strings in `status` fields:
- `on-track` — green
- `watch` — yellow
- `blocked` — red

### Example: Updating Lane 2

```yaml
lanes:
  - id: lane-2
    name: "Amazon Merch Tier 10"
    status: "on-track"   # changed from "watch"
    target: "Tier 10 → 25"
    lastUpdated: "2026-06-02"
    nextAction: "Upload 3 new designs"
```

After editing, commit and push:

```bash
git add site/src/data/portfolio.yml
git commit -m "Update Merch lane status"
git push origin main
```

## Local Development

```bash
cd site
npm install
npm run dev
```

## Deploying

GitHub Actions automatically builds and deploys on every push to `main`. No manual steps required.

If you fork this repo, enable GitHub Pages in **Settings → Pages → Build and deployment → GitHub Actions**.
