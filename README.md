# Freedom Portfolio — Command Center

A static, autism/ADHD-adapted dashboard for tracking the 90-day Freedom Portfolio income campaign.

## Tech Stack
- [Astro](https://astro.build/) — static site generator
- YAML data files — single source of truth for portfolio state
- GitHub Pages — free hosting

## Live URL
> **https://ah-sbz.github.io/portfolio-command-center/**

## Editing Your Data

All state lives in `site/src/data/portfolio.yml`. Edit this file and commit to `main`, then run the build-and-deploy steps below to update the live site.

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

### Current: Manual `gh-pages` deploy
The site is live via the `gh-pages` branch. To update after editing data or code:

```bash
cd site
npm run build
cd ..
git subtree push --prefix site/dist origin gh-pages
# Or manually: copy dist/ to a clean gh-pages branch and force-push
```

### Future: GitHub Actions (recommended)
A workflow file exists at `.github/workflows/deploy.yml`. It will auto-build and deploy on every push to `main` once enabled.

To enable automatic deployment:
1. In **Settings → Pages → Build and deployment**, switch source to **GitHub Actions**.
2. Ensure your GitHub token has the `workflow` scope (or use a classic PAT with `repo` + `workflow`).
3. Push the workflow file to `main`:
   ```bash
   git add .github/workflows/deploy.yml
   git commit -m "Enable GitHub Actions deploy"
   git push origin main
   ```

If you fork this repo, enable GitHub Pages in **Settings → Pages → Build and deployment → GitHub Actions**.
