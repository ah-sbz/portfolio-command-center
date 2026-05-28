# Autism/ADHD-Adapted Tracking Dashboard Design Specs

## Freedom Portfolio — NEX-24 Design Deliverables

---

## Core Design Principles (All Deliverables)

| Principle | Why It Matters | How We Apply It |
|-----------|---------------|-----------------|
| **One Glance = One State** | ADHD working memory is limited; context-switching is expensive | Every screen/section answers exactly one question: "What do I do *right now*?" |
| **Color = Decision, Not Decoration** | Autistic brains parse systems better when color has consistent semantic meaning | Green = on track, Yellow = attention needed, Red = blocked / off target. Never use color for branding alone. |
| **Checklists > Free Text** | Open-ended inputs create decision paralysis | Every status is a dropdown, checkbox, or pre-defined option. Free text lives in a single "Notes" column only. |
| **Time-Boxing Is Visible** | Parkinson's Law + ADHD time blindness = tasks expand to fill unbounded space | Every lane shows "Time spent this week / 5 hours" as a prominent progress bar. |
| **72h Filter Is Physical** | Abstract rules get forgotten under hyperfocus or impulse | The cooling-off queue has its own visual space — not a note, not a mental rule. A *list you can see*. |
| **Same Pattern, Different Data** | Novelty-seeking ADHD brain gets distracted by "shiny new layouts" | All three lanes use identical tab structures. Only the column headers change. |

---

## Deliverable 1: Spreadsheet Tab Design Specs

### Tab Naming Convention

```
Lane 1: Weekly Grid Bot Tracking   ← exists (NEX-19)
Lane 2: Weekly Merch Tracking      ← new
Lane 3: Weekly Lane 3 Tracking     ← new
Shared: Targets & Reference        ← exists (NEX-19)
Shared: Notes & Issues             ← exists (NEX-19)
Shared: 72h Cooling-Off Queue      ← new
Shared: Weekly Portfolio Summary   ← new
```

### Tab 2: Weekly Merch Tracking

Follows the **exact same row/column rhythm** as the grid bot tab. One row = one week of activity for one design batch.

| Column | Data Type | Purpose |
|--------|-----------|---------|
| Week Start | Date (Mon) | Anchor week |
| Week End | Date (Sun) | Anchor week |
| Niche Focus | Dropdown: `Neurodivergent` / `Introvert` / `Tech Humor` | Prevents context switching between niches mid-week |
| Designs Created | Number (0–10) | Raw output count |
| Designs Uploaded | Number (0–10) | What actually hit Amazon |
| Tier Progress | Dropdown: `Tier 10` / `Tier 25` / `Tier 100` / `Tier 500` / `Tier 1000` | One-click status |
| Sales This Week | Number | Units sold |
| Royalties (USD) | Currency | Actual income |
| BSR of Best Seller | Number | Competitive health check |
| ChatGPT Plus Prompts Used | Number | Cost tracking |
| Time Spent (hours) | Decimal (0.5h increments) | Critical for 5h ceiling |
| Weekly Target Met? | Dropdown: `✅ Yes` / `⚠️ Partial` / `❌ No` | Instant pass/fail |
| Cumulative Royalties | Currency | Running total |
| Next Week Action | Dropdown pre-filled: `Research niche X` / `Create batch` / `Upload batch` / `Analyze BSRs` / `Iterate designs` | Removes "what do I do now?" paralysis |
| Notes / Issues | Free text | One catch-all column |

**Visual Formatting Rules:**
- Header row: Bold, light gray fill, black border bottom
- `Weekly Target Met?` column: Conditional formatting — green background if `✅ Yes`, yellow if `⚠️ Partial`, light red if `❌ No`
- `Time Spent (hours)` column: If value > 1.5 (Merch's ~1/3 of weekly budget), cell turns yellow. If > 2.0, red.
- `Niche Focus` column: Color-coded per niche (Neurodivergent = purple, Introvert = blue, Tech = gray) — purely for visual grouping, not semantic urgency
- Frozen panes: Lock header row + first 2 columns so week/date is always visible when scrolling

### Tab 3: Weekly Lane 3 Tracking

Same skeleton, different metrics. One row = one week of Lane 3 work.

| Column | Data Type | Purpose |
|--------|-----------|---------|
| Week Start | Date (Mon) | Anchor week |
| Week End | Date (Sun) | Anchor week |
| Project Name | Dropdown (updated as project is chosen) | What's being built |
| Milestone This Week | Dropdown: `Discovery` / `Setup` / `Build` / `Test` / `Launch` / `Iterate` | Phase-gate check |
| Tasks Completed | Number | Discrete count |
| Tasks Planned | Number | For completion % |
| Completion % | Formula: `Tasks Completed / Tasks Planned` | Auto-calculated |
| Time Spent (hours) | Decimal (0.5h increments) | Critical for 5h ceiling |
| Weekly Target Met? | Dropdown: `✅ Yes` / `⚠️ Partial` / `❌ No` | Instant pass/fail |
| Cumulative Time (Lane 3) | Formula: sum of time spent | Auto-calculated |
| Tool / Stack | Dropdown (e.g., `Python/Flask`, `Node/Express`, `Static Site`, `WordPress`, etc.) | Stack documentation |
| Output URL / Path | Text | Where the work lives |
| Next Week Action | Dropdown: `Research requirements` / `Set up repo` / `Build feature X` / `Write tests` / `Deploy` / `User feedback loop` | Pre-defined options |
| Notes / Issues | Free text | One catch-all column |

**Visual Formatting Rules:**
- Same header/border/frozen-pane rules as Merch tab
- `Completion %` column: Conditional formatting — ≥80% green, 50–79% yellow, <50% red
- `Milestone This Week` column: Color gradient by phase — Discovery (light blue) → Setup (blue) → Build (orange) → Test (yellow) → Launch (green) → Iterate (purple). This shows project maturity at a glance.
- `Time Spent (hours)` column: Same traffic-light rules as Merch (yellow at >1.5h, red at >2.0h)

### Tab 4: 72-Hour Cooling-Off Queue (New Shared Tab)

This is the **anti-idea-hopping shield**. Every new idea goes here first. No exceptions.

| Column | Data Type | Purpose |
|--------|-----------|---------|
| Idea Name | Text | What is it? |
| Lane | Dropdown: `Lane 1` / `Lane 2` / `Lane 3` / `New Lane (REJECT)` | Where would it live? |
| Entered Queue | Date/Time | When the idea struck |
| Cool-Off Expires | Formula: `Entered Queue + 3 days` | When you are *allowed* to act |
| Status | Dropdown: `🔒 Cooling` / `⏳ Ready to Review` / `✅ Approved` / `❌ Rejected` / `🗑️ Expired` | State machine |
| Initial Excitement | Dropdown: `1-Meh` / `2-Interesting` / `3-Excited` / `4-Obsessed` / `5-Must Do Now` | Captures impulse intensity |
| Post-72h Excitement | Dropdown: `1-Meh` / `2-Interesting` / `3-Excited` / `4-Obsessed` / `5-Must Do Now` | Filled after cool-off |
| Excitement Delta | Formula: `Post - Initial` | If negative, auto-reject candidate |
| 5h Budget Fit? | Dropdown: `Yes` / `No` / `Needs reduction` | Hard constraint check |
| Replaces Existing? | Dropdown: `None` / `Replaces Lane 1` / `Replaces Lane 2` / `Replaces Lane 3` | One-in, one-out rule |
| Final Decision | Dropdown: `APPROVE` / `REJECT` / `DEFER 7d` | Board-level decision |
| Notes | Free text | Why it was rejected/approved |

**Visual Formatting Rules:**
- `Status` column:
  - `🔒 Cooling` = gray background
  - `⏳ Ready to Review` = yellow background + bold
  - `✅ Approved` = green background
  - `❌ Rejected` = light red + strikethrough font
  - `🗑️ Expired` = white background, gray italic text
- `Excitement Delta` column: Negative values = red text. Zero or positive = black text. This is the key behavioral metric.
- `Final Decision` column: `APPROVE` = green bold, `REJECT` = red bold, `DEFER 7d` = orange
- Row height: 1.5x normal for readability
- **Important**: Sort this tab by `Cool-Off Expires` ascending (soonest first) so the queue acts like a countdown dashboard

### Tab 5: Weekly Portfolio Summary (New Shared Tab)

The "command center" view. One row = one week. Pulls key numbers from all lanes.

| Column | Data Type | Source |
|--------|-----------|--------|
| Week Start | Date | Manual |
| Week End | Date | Manual |
| Lane 1 Status | Dropdown: `🟢 On Track` / `🟡 Attention` / `🔴 Off Target` | Derived from Grid Bot tab |
| Lane 1 Net P&L | Currency | From Grid Bot tab |
| Lane 2 Status | Dropdown: `🟢 On Track` / `🟡 Attention` / `🔴 Off Target` | Derived from Merch tab |
| Lane 2 Royalties | Currency | From Merch tab |
| Lane 3 Status | Dropdown: `🟢 On Track` / `🟡 Attention` / `🔴 Off Target` | Derived from Lane 3 tab |
| Lane 3 Milestone | Text | From Lane 3 tab |
| Total Weekly Income | Formula: sum of Lane 1 + Lane 2 | Auto-calculated |
| Total Time Spent | Formula: sum of all lanes | Auto-calculated |
| Time Budget Remaining | Formula: `5.0 - Total Time Spent` | Auto-calculated |
| 5% Monthly Target Progress | Formula: `(Cumulative Net P&L + Cumulative Royalties) / Monthly Target` | Percentage toward 5% goal |
| 72h Queue Items | Number | Count from Cooling-Off Queue |
| Portfolio Health | Formula: `IF(Time Budget Remaining >= 0 AND 5% Target Progress >= week_num/4.33, "🟢 Healthy", IF(Time Budget Remaining < 0, "🔴 Over Budget", "🟡 Watch"))` | Master status |
| Key Decision This Week | Dropdown: `None` / `Approve queue item` / `Reject queue item` / `Adjust lane time` / `Escalate issue` | Forces explicit weekly reflection |
| Notes | Free text | |

**Visual Formatting Rules:**
- `Portfolio Health` row: Entire row gets background tint — green (#e6f4ea), yellow (#fff4e5), or red (#fce8e6). This is the only tab where a full-row color change happens, making it impossible to miss the overall state.
- `Time Budget Remaining`: Conditional format — ≥1.0h green, 0–1.0h yellow, <0 red
- `5% Monthly Target Progress`: Conditional format — ≥week_target green, within 20% yellow, <20% behind red
- `72h Queue Items`: If >0, yellow highlight (reminder that ideas are waiting)
- Frozen header + frozen first column

---

## Deliverable 2: Dashboard Wireframe / Guide (Future Web Tracker)

> Constraint: No new app builds now. This is a reference spec if the spreadsheet outgrows its 5h/week mission.

### Layout Philosophy: "Parking Lot Dashboard"

ADHD brains benefit from **spatial memory**. The dashboard is organized like a parking lot: each lane is a fixed physical zone. The user always knows "Merch lives in the top-right quadrant" without reading labels.

### ASCII Wireframe — Desktop View (≥1024px)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  FREEDOM PORTFOLIO                    Week of 25 May – 31 May    [?] [⚙]   │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                             │
│  ┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐  │
│  │  LANE 1             │  │  LANE 2             │  │  LANE 3             │  │
│  │  Grid Bots          │  │  Amazon Merch       │  │  Utility Project    │  │
│  │                     │  │                     │  │                     │  │
│  │  [████████░░] 83%   │  │  [██████░░░░] 60%   │  │  [██████████] 100%  │  │
│  │  Weekly ROI         │  │  Tier Progress      │  │  Milestone Done     │  │
│  │                     │  │                     │  │                     │  │
│  │  🟢 On Track        │  │  🟡 Attention       │  │  🟢 On Track        │  │
│  │  $12.40 this week   │  │  $0.00 this week    │  │  Build phase        │  │
│  │                     │  │                     │  │                     │  │
│  │  [Check PnL]        │  │  [Upload Batch]     │  │  [Open Project]     │  │
│  └─────────────────────┘  └─────────────────────┘  └─────────────────────┘  │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  WEEKLY BUDGET:  [████████████░░░░░░░░░░░░]  3.2h / 5.0h used       │    │
│  │                                                                     │    │
│  │  5% Monthly Target:  [████░░░░░░░░]  23%  ($34 / $150 target)      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ┌─────────────────────────────┐  ┌─────────────────────────────────────┐  │
│  │  72-HOUR COOLING-OFF QUEUE  │  │  THIS WEEK'S RHYTHM                 │  │
│  │                             │  │                                     │  │
│  │  ⏳ "Start a Substack"      │  │  Mon □  Grid bot check (5 min)      │  │
│  │     Ready in 14h             │  │  Tue □  ─                           │  │
│  │     [REJECT] [APPROVE]       │  │  Wed □  Discipline check (5 min)    │  │
│  │                             │  │  Thu □  ─                           │  │
│  │  🔒 "Learn Rust"            │  │  Fri □  ─                           │  │
│  │     Ready Sat 09:00          │  │  Sat □  ─                           │  │
│  │                             │  │  Sun □  MERCH SESSION (2h)          │  │
│  │                             │  │  Sun □  LANE 3 SESSION (1h)         │  │
│  │                             │  │  Sun □  Weekly review (30 min)      │  │
│  └─────────────────────────────┘  └─────────────────────────────────────┘  │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  [+ ADD NEW IDEA TO QUEUE]  (triggers 72h timer automatically)      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### ASCII Wireframe — Mobile View (<600px)

```
┌─────────────────────────┐
│ FREEDOM PORTFOLIO       │
│ Week 25 May – 31 May    │
├─────────────────────────┤
│ LANE 1: Grid Bots       │
│ [████████░░] 83%        │
│ 🟢 On Track  $12.40     │
│ [Check PnL]             │
├─────────────────────────┤
│ LANE 2: Amazon Merch    │
│ [██████░░░░] 60%        │
│ 🟡 Attention  $0.00       │
│ [Upload Batch]          │
├─────────────────────────┤
│ LANE 3: Utility Project │
│ [██████████] 100%       │
│ 🟢 On Track  Build phase  │
│ [Open Project]          │
├─────────────────────────┤
│ BUDGET: 3.2h / 5.0h ⬇️  │
│ 5% TARGET: 23% ⬇️       │
├─────────────────────────┤
│ 72h QUEUE (2 items) ⬇️  │
│ ⏳ Start a Substack      │
│    Ready in 14h          │
│ [REJECT] [APPROVE]     │
├─────────────────────────┤
│ THIS WEEK ⬇️             │
│ Sun □ MERCH (2h)        │
│ Sun □ LANE 3 (1h)       │
│ Sun □ REVIEW (30m)      │
├─────────────────────────┤
│ [+ ADD IDEA]            │
└─────────────────────────┘
```

### Design Rules (Future Implementation)

#### 1. Visual Hierarchy — "3-Second Rule"
Every screen must communicate its primary state in ≤3 seconds without scrolling.

Priority order (top to bottom, left to right):
1. **Portfolio Health** (master green/yellow/red)
2. **Time Budget Remaining** (the hard ceiling)
3. **Lane Status Cards** (the three lanes)
4. **72h Queue Alert** (only if items are ready for review)
5. **Weekly Rhythm Checklist** (what's happening this week)

#### 2. Color System

| Token | Hex | Usage | Never Use For |
|-------|-----|-------|---------------|
| `success` | `#34a853` | On track, approved, completed | Avoid for "money" — it's not a brand color |
| `warning` | `#f9ab00` | Attention needed, partial, cooling | Never for errors |
| `danger` | `#ea4335` | Off target, over budget, rejected | Never for "urgent but okay" |
| `neutral` | `#5f6368` | Cooling, inactive, locked | Never for primary actions |
| `info` | `#4285f4` | Links, blue lane accents | Never for status |
| `bg-green` | `#e6f4ea` | Row/cell highlight for success | Only for backgrounds, not text |
| `bg-yellow` | `#fff4e5` | Row/cell highlight for warning | Only for backgrounds, not text |
| `bg-red` | `#fce8e6` | Row/cell highlight for danger | Only for backgrounds, not text |

#### 3. Typography Scale

| Level | Size | Weight | Usage |
|-------|------|--------|-------|
| H1 (Portfolio title) | 24px | 700 | Page header only |
| H2 (Lane title) | 18px | 600 | Card headers |
| H3 (Section label) | 14px | 600 | Sub-sections, queue headers |
| Body | 14px | 400 | All data, metrics, labels |
| Caption | 12px | 400 | Dates, timestamps, metadata |
| Mono | 13px | 500 | Numbers, currency, percentages (tabular nums) |

> **ADHD rule**: No font size below 12px. No thin weights (100–300). Minimum 400 weight everywhere.

#### 4. Spacing System

Use an 8px base grid. Key spacing tokens:
- `xs` = 4px (tight internal padding)
- `sm` = 8px (icon-to-text gap)
- `md` = 16px (card internal padding)
- `lg` = 24px (gap between cards)
- `xl` = 32px (section breaks)

> **Autism rule**: Consistent spacing is more important than "balanced" spacing. A 24px gap that is *always* 24px is calmer than a 20px gap that "feels right."

#### 5. Progress Bars

All progress bars must follow this spec:
- Height: 12px (thick enough to see without precision)
- Border radius: 6px (fully rounded ends)
- Fill color: `success`/`warning`/`danger` based on value
- Background track: `#e8eaed`
- No stripes, no animation, no glow effects — **static only** (motion is distracting for ADHD)
- Always show percentage as text to the right of the bar (e.g., `[████████░░] 83%`)

#### 6. Buttons / CTAs

| Type | Style | Usage |
|------|-------|-------|
| Primary | `success` bg, white text, 8px radius | The ONE action this screen wants you to take |
| Secondary | White bg, `#5f6368` border, dark text | Alternative actions |
| Destructive | `danger` bg, white text | Reject, delete, stop |
| Ghost | No bg, `info` text, underline on hover | Links, "learn more" |

> **ADHD rule**: No more than one primary button per card. No more than three buttons total per card.

#### 7. The 72h Queue UI

Critical behavioral patterns:
- **Default sort**: Soonest to expire first (countdown urgency)
- **Collapsed by default** on mobile (tap to expand)
- **Always visible** on desktop (it's the anti-impulse shield)
- **Action buttons**: `[REJECT]` must be physically easier to reach than `[APPROVE]` (left-side placement, neutral style). This introduces friction for approval, which is the desired behavior.
- **Count badge**: If >0 items are "Ready to Review", show a yellow badge on the queue header

#### 8. Weekly Rhythm Checklist

This replaces a traditional calendar. ADHD users often experience "time blindness" — a calendar shows *when* but not *what*.

- One checkbox per scheduled action
- Checkboxes are large (24px × 24px minimum touch target)
- Completed items: strikethrough + gray text (not hidden — seeing completion matters)
- Future items: normal text
- Today's items: bold + left border accent (4px `info` color strip)
- Past uncompleted items: red text + `[Reschedule]` button

---

## Deliverable 3: Notification Design Brief

### Context
Current stack: ntfy (Docker, port 2586) + Mattermost webhook (`freedom-portfolio` channel).

### Notification Taxonomy

| Category | Channel | Cadence | Purpose |
|----------|---------|---------|---------|
| **Trigger** | ntfy | Event-driven | Immediate action required NOW |
| **Nudge** | ntfy | Scheduled (cron) | Gentle prompt to start a habit |
| **Digest** | Mattermost | Weekly | Rich summary, reflection, planning |
| **Alert** | ntfy + Mattermost | Exception-based | Something is wrong/off target |

### Tone Guidelines

**Core Voice: "Gentle Project Manager"**

Not a boss. Not a cheerleader. A calm, organized colleague who checks in, doesn't judge, and always leaves you with one clear next step.

| Do | Don't |
|----|-------|
| "Time for your 5-minute grid bot check." | "URGENT: Check your bots NOW!!!" |
| "Sunday Merch session — 2 hours blocked. Ready when you are." | "You MUST do Merch today or you'll fail!" |
| "72h filter: "Start a Substack" is ready for review. Feeling the same?" | "New idea approved! Go build it!" |
| "Week check-in: 3.2h used, 1.8h left. Lane 2 needs attention." | "You're behind schedule. Pick up the pace." |
| "Stay the course. No new lanes for 67 more days." | "Don't get distracted! Focus!" |

**Autism-specific tone rules:**
- No sarcasm, no irony, no "motivational" language
- No exclamation marks (they read as shouting)
- Numbers are your friend — "3.2h used" is better than "most of your budget"
- One instruction per message. If two things need saying, send two messages.

### ntfy Message Structure

All ntfy messages follow this template:

```
[Icon Tag] [One-line instruction]

[Context metric]
[One-click action or timebox]
```

Examples:

**Daily Grid Bot Check (Trigger)**
```
Tags: money_chart
Priority: 3

Check grid bot status & PnL. Update spreadsheet.

Current week: 23% toward 5% target.
Time needed: ~5 minutes.
```

**Sunday Merch Session (Nudge)**
```
Tags: art,paintbrush
Priority: 4

Merch session: research niches, create designs, upload batch. Tier progress check.

Time blocked: 2 hours (10:00 – 12:00).
Niche this week: Neurodivergent Pride.
```

**Wednesday Discipline Check (Nudge)**
```
Tags: stop_sign,lock
Priority: 4

72-hour filter check: no new income streams. Stay the course.

Days remaining in lock-in: 67.
Queue items waiting: 2.
```

**Off-Target Alert (Alert)**
```
Tags: warning
Priority: 5 (max)

Lane 2 attention: 0 uploads this week, Tier 10 stagnant.

Time available: 1.8h this week.
Suggested action: 30-min design batch today.
```

### Mattermost Digest Structure (Weekly Review)

Cross-posted from `freedom-weekly-review` ntfy topic. Rich formatting because Mattermost supports markdown.

```markdown
## 🗓️ Freedom Portfolio — Week of 25 May

---

### Lane Status

| Lane | Status | This Week | Trend |
|------|--------|-----------|-------|
| **Grid Bots** | 🟢 On Track | +$12.40 | ↑ |
| **Amazon Merch** | 🟡 Attention | $0.00 | → |
| **Utility Project** | 🟢 On Track | Build phase | ↑ |

### Time Budget
- **Used**: 3.2h / 5.0h
- **Remaining**: 1.8h
- **Heaviest lane**: Lane 2 (2.0h)

### 5% Monthly Target
- **Progress**: 23% ($34 / $150)
- **On pace?**: Yes (week 4 of 12, target 33% — slightly behind but recoverable)

### 72-Hour Queue
- **Cooling**: 1 item
- **Ready for review**: 1 item — *"Start a Substack"*
- **Approved this week**: 0

### Next Week Plan
1. **Sun 10:00** — Merch batch (Neurodivergent niche, 2h)
2. **Sun 11:00** — Lane 3 build session (1h)
3. **Wed 12:00** — Discipline check
4. **Daily** — 5-min grid bot check

### One Decision Needed
> **"Start a Substack"** has passed the 72h filter. Post-cool excitement: 2 (was 4). Budget fit: No (would need 3h/week). **Recommended: REJECT.**

[Confirm in spreadsheet] [Discuss in thread]
```

### Mattermost Thread Usage

For the weekly digest, the Mattermost post should **enable threading** so the user can reply with decisions without cluttering the channel.

- Original post = the digest (read-only reference)
- Replies = decisions, notes, "done" confirmations
- The bot should read replies and update the spreadsheet's "Key Decision This Week" column

### Priority Mapping

| Priority | ntfy Value | Use Case | Expected User Response |
|----------|-----------|----------|----------------------|
| 1 (min) | Background sync | None currently | Silent |
| 2 | Low nudge | Optional reminders | Read when convenient |
| 3 | Standard prompt | Daily checks, habit nudges | Act within 1 hour |
| 4 | Focus session | Weekly deep-work blocks | Act within scheduled window |
| 5 (max) | Alert | Off-target, over-budget, exception | Act immediately |

---

## Appendix A: Spreadsheet Conditional Formatting Cheat Sheet

| Tab | Column | Rule | Format |
|-----|--------|------|--------|
| All | `Weekly Target Met?` | `✅ Yes` | Green fill, bold |
| All | `Weekly Target Met?` | `⚠️ Partial` | Yellow fill |
| All | `Weekly Target Met?` | `❌ No` | Light red fill |
| All | `Time Spent` | > lane_budget × 0.6 | Yellow fill |
| All | `Time Spent` | > lane_budget × 0.8 | Red fill |
| Grid Bot | `Target Met?` | `YES` | Green fill |
| Grid Bot | `Target Met?` | `NO` | Red fill |
| Merch | `Tier Progress` | `Tier 10` | Neutral (default) |
| Merch | `Tier Progress` | `Tier 25+` | Green fill |
| Lane 3 | `Completion %` | ≥ 80% | Green fill |
| Lane 3 | `Completion %` | 50–79% | Yellow fill |
| Lane 3 | `Completion %` | < 50% | Red fill |
| Cooling Queue | `Status` | `🔒 Cooling` | Gray fill |
| Cooling Queue | `Status` | `⏳ Ready to Review` | Yellow fill, bold |
| Cooling Queue | `Status` | `✅ Approved` | Green fill |
| Cooling Queue | `Status` | `❌ Rejected` | Light red, strikethrough |
| Summary | `Portfolio Health` | `🟢 Healthy` | Full row green tint |
| Summary | `Portfolio Health` | `🟡 Watch` | Full row yellow tint |
| Summary | `Portfolio Health` | `🔴 Over Budget` | Full row red tint |

> Lane budget assumptions: Lane 1 ≈ 1.5h/week (daily 5-min checks), Lane 2 ≈ 2.0h/week (Sunday batch), Lane 3 ≈ 1.5h/week (Sunday + mid-week). Total = 5.0h.

---

## Appendix B: ASCII Icons Reference

For terminals, ntfy tags, and quick spreadsheet labels:

| Meaning | Icon | ntfy Tag |
|---------|------|----------|
| Money / Profit | 💰 | `money_chart` |
| Growth / Up | 📈 | `chart_with_upwards_trend` |
| Art / Design | 🎨 | `art` / `paintbrush` |
| Build / Code | 🔧 | `computer` / `wrench` |
| Review / Plan | 📝 | `memo` / `clipboard` |
| Stop / Block | 🛑 | `stop_sign` / `lock` |
| Success / Done | ✅ | `white_check_mark` |
| Warning / Attention | ⚠️ | `warning` |
| Time / Clock | ⏰ | `alarm_clock` |
| Cool-off / Ice | ❄️ | `snowflake` |

---

## File Location

`life/projects/freedom-portfolio/autism-adhd-tracking-design-specs.md`
