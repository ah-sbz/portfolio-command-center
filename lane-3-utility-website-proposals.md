# Lane 3 Utility Website — 3 Proposed Options

## Selection Criteria
- **Single-purpose**: one thing, done well — no scope creep
- **Static or lightweight**: no auth, no database, minimal backend
- **5-hour-week compatible**: buildable in 1–2 sprints; ≤30 min/week maintenance
- **Portfolio-aligned**: supports Lane 1 (grid bots) or Lane 2 (Merch), OR is a standalone micro-tool with future monetization path
- **ADHD/autism-adapted**: clear bounded scope, visible progress, no infinite iteration

---

## Option 1: Portfolio Command Center (Recommended)

### Concept
A single-page static dashboard that tracks all three Freedom Portfolio lanes in one place. Think of it as a personal KPI board — not a complex app, just a clean visual snapshot updated weekly.

### What It Shows
| Lane | Metric | Source |
|------|--------|--------|
| Lane 1 — Grid Bots | Active pairs, monthly return %, capital deployed | Manual entry or CSV import from grid bot exports |
| Lane 2 — Amazon Merch | Current tier, designs live, sales/royalties this month | Manual entry (Tier 10 has no API) |
| Lane 3 — Utility Site | Weekly hours spent, Git commits, feature shipped | Git history + manual log |
| Overall | 90-day countdown, total weekly hours used vs. 5 hr budget | Calculated |

### Tech Stack
- **Framework**: Astro (static site generator) or plain HTML/CSS/JS
- **Styling**: Tailwind CSS (fast, consistent) or vanilla CSS
- **Data**: YAML or JSON files checked into the repo — no database
- **Hosting**: GitHub Pages or Cloudflare Pages (free, zero ops)
- **Updates**: Edit YAML/JSON, git push → site redeploys automatically

### Build Estimate
- **Initial build**: 4–6 hours
  - Layout & styling: 2 hrs
  - YAML/JSON data layer + parsing: 1.5 hrs
  - Charts/visuals (lightweight, e.g., Chart.js or CSS bars): 1.5 hrs
  - Deploy pipeline: 1 hr
- **Weekly maintenance**: 15–30 min (update data file, commit, push)

### Monetization Path (Post-90 Days)
- Open-source the template → traffic + credibility
- Offer a "hosted version" for others running similar multi-lane portfolios
- Newsletter signup from the page → audience building

### Pros
- Immediately useful — you see all lanes at a glance
- Supports discipline (5-hour budget visibility, 90-day countdown)
- Zero hosting cost, zero backend complexity
- Natural integration point for all other tools

### Cons
- Requires manual data entry (no APIs for Merch Tier 10)
- Not a "tool" in the traditional sense — more of a dashboard

---

## Option 2: Grid Bot Configurator

### Concept
A simple web calculator for planning grid bot setups. Input: trading pair, price range, number of grids, total investment. Output: grid spacing, required capital per grid, estimated fee exposure, and a printable config summary.

### Features (MVP)
1. **Input form**: lower price, upper price, grid count, investment amount, exchange fee %
2. **Calculations**:
   - Grid spacing = (upper − lower) / grid count
   - Capital per grid = investment / grid count
   - Estimated fee exposure = grids × 2 × fee% × capital per grid
   - Profit per grid (arithmetic spacing) = grid spacing
3. **Output**: Config summary card + JSON export (paste into your bot)
4. **Risk note**: Simple warning if grids < 5 or capital per grid < minimum lot size

### Tech Stack
- **Framework**: Vanilla HTML/CSS/JS (no build step needed)
- **Hosting**: GitHub Pages or Cloudflare Pages
- **Libraries**: None required; optionally Alpine.js for reactivity

### Build Estimate
- **Initial build**: 3–4 hours
  - Form + validation: 1 hr
  - Math logic + edge cases: 1.5 hrs
  - Output formatting + JSON export: 1 hr
  - Styling + deploy: 0.5–1 hr
- **Weekly maintenance**: ~0 hr (static tool, no data to update)

### Monetization Path (Post-90 Days)
- Add more advanced features (geometric grids, multi-pair comparison) → freemium or tip jar
- Embed affiliate links to exchanges → passive referral income
- Blog post: "How I size my grid bots" → drive traffic

### Pros
- Directly supports Lane 1
- Immediately useful before you deploy your first bot
- True utility — does math you’d otherwise do in a spreadsheet
- Zero maintenance once shipped

### Cons
- Very narrow scope — only useful for grid bot setup
- No visual progress tracking (unlike Option 1)

---

## Option 3: Merch Prompt Factory

### Concept
A lightweight web tool that generates optimized ChatGPT Plus image prompts for Amazon Merch designs. Select a niche (Neurodivergent / Introvert / Tech Humor), pick a template phrase or enter custom text, choose a style, and get a copy-paste-ready prompt plus a design brief.

### Features (MVP)
1. **Niche selector**: 3 tabs matching the researched niches
2. **Template picker**: Pre-loaded phrases from the niche research doc (e.g., "Social Battery: 0%")
3. **Customizer**: Toggle style (minimalist, retro, bold), color count (2 or 3), layout (centered, badge)
4. **Output**:
   - ChatGPT Plus prompt (copy button)
   - Design brief (aspect ratio, safe zone notes, Merch-ready tips)
   - Optional: save to local JSON log (browser localStorage)

### Tech Stack
- **Framework**: Vanilla HTML/CSS/JS or lightweight React/Vite
- **Hosting**: GitHub Pages / Cloudflare Pages
- **Data**: Hardcoded prompt templates + formula assembly (no AI API calls needed)

### Build Estimate
- **Initial build**: 4–5 hours
  - Template data structure + niche tabs: 1.5 hrs
  - Prompt assembler logic: 1 hr
  - UI / copy-to-clipboard / localStorage: 1.5 hrs
  - Styling + deploy: 1 hr
- **Weekly maintenance**: ~15 min (add new templates as you discover winning phrases)

### Monetization Path (Post-90 Days)
- Expand niches → paid tier or one-time purchase
- Add mockup preview (placeholder image generator) → premium feature
- SEO: "Amazon Merch prompt generator" → organic traffic

### Pros
- Directly supports Lane 2 — speeds up design pipeline
- Reduces ChatGPT iteration time (better prompts = fewer retries)
- ADHD-friendly: bounded choices, no blank-page paralysis
- Content grows naturally as you research more niches

### Cons
- Only useful if you're actively uploading Merch designs
- Slightly more content to maintain (new templates)

---

## Comparison Matrix

| Criterion | Option 1: Command Center | Option 2: Grid Bot Calc | Option 3: Merch Prompt Factory |
|-----------|------------------------|------------------------|------------------------------|
| Supports Lane 1 | ★★★★☆ | ★★★★★ | ★☆☆☆☆ |
| Supports Lane 2 | ★★★☆☆ | ★☆☆☆☆ | ★★★★★ |
| Supports Lane 3 (itself) | ★★★★★ | ★★★☆☆ | ★★★☆☆ |
| Build Speed | ★★★★☆ (4–6 hrs) | ★★★★★ (3–4 hrs) | ★★★★☆ (4–5 hrs) |
| Maintenance Burden | ★★★☆☆ (30 min/wk) | ★★★★★ (~0 hr) | ★★★★☆ (15 min/wk) |
| Future Monetization | ★★★★☆ | ★★★☆☆ | ★★★★☆ |
| ADHD/Autism Friendly | ★★★★★ (visual, bounded) | ★★★★★ (one task, done) | ★★★★★ (structured choices) |
| Hosting Cost | $0 | $0 | $0 |
| Backend Complexity | None | None | None |

---

## Recommendation

**Primary recommendation: Option 1 (Portfolio Command Center)**

Rationale:
1. It is the only option that supports **all three lanes simultaneously**
2. The 90-day countdown and 5-hour budget tracker directly reinforce the campaign's core discipline constraints
3. It creates a natural "home base" for the other tools — the grid bot calc and merch prompt factory could later be linked from it
4. Weekly data entry is actually a feature: it forces a 5-minute portfolio review ritual, which prevents neglect
5. Static site + YAML data is the simplest possible architecture — no auth, no DB, no API keys, no uptime worries

**If you want two tools**: Build Option 1 first, then Option 2 (Grid Bot Configurator) as a standalone linked page. Total build time: ~8 hours across 2–3 weeks.

**If you want the fastest win**: Option 2 alone ships in a single afternoon and immediately improves Lane 1 setup quality.

---

## 72-Hour Filter Application

Before committing to any option:
- **Sleep on it**: Re-read this doc after 24 hours
- **Test scope discipline**: Can you describe the project in one sentence? If not, it’s too big
- **Check motivation**: Are you excited about building it, or just excited about the *idea* of having built it? (Build = yes. Idea = filter.)
- **Verify time budget**: Which option leaves the most hours for Lane 1 and Lane 2 activity? (Option 2 = most; Option 1 = moderate; Option 3 = moderate)

---

## Next Steps

1. **Pick one option** (or signal if you want a hybrid)
2. Create a sub-task for the build phase (scaffold repo, initial UI, data layer, deploy)
3. Set a timebox: e.g., "Command Center MVP in 5 hours by [date]"
4. If Option 1: scaffold Astro project + GitHub Pages pipeline
5. If Option 2: scaffold vanilla JS project + deploy
6. If Option 3: scaffold Vite + template data structure
