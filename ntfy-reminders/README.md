# Freedom Portfolio ntfy Reminder System

Self-hosted notification reminders using the existing [ntfy](https://ntfy.sh) Docker container (`ntfy`, port 2586) plus optional Mattermost webhooks.

## Quick start

```bash
# 1. Seed the topics (one-time)
./ntfy-reminders/send.sh freedom-grid-bots   "Grid bot reminders active ✅"
./ntfy-reminders/send.sh freedom-merch        "Merch reminders active ✅"
./ntfy-reminders/send.sh freedom-lane3        "Lane 3 reminders active ✅"
./ntfy-reminders/send.sh freedom-weekly-review "Weekly review reminders active ✅"
./ntfy-reminders/send.sh freedom-discipline   "Discipline filter active ✅"

# 2. Install the cron schedule
crontab ntfy-reminders/crontab.txt

# 3. Verify
ntfy sub freedom-grid-bots   # or open https://ntfy.huhn.tk/freedom-grid-bots in your browser
```

## Topics

| Topic | Cadence | Purpose |
|-------|---------|---------|
| `freedom-grid-bots` | Daily 09:00 + 09:05 | Lane 1 — Binance grid bot PnL check + Ghost Tiger scan |
| `freedom-merch` | Sun 10:00 | Lane 2 — Amazon Merch research, design, upload batch |
| `freedom-lane3` | Sun 11:00 | Lane 3 — Utility website deep-work block |
| `freedom-weekly-review` | Sun 20:00 | Portfolio review + planning (also mirrors to Mattermost) |
| `freedom-discipline` | Wed 12:00 | Anti-idea-hopping 72-hour filter check |

## Scripts

- `send.sh <topic> <message> [--tags=...] [--priority=1-5] [--mattermost]`  
  Publishes to the local ntfy server. Use `--mattermost` for weekly reviews to cross-post into the Mattermost `freedom-portfolio` channel.

## Constraints respected

- **No host crontab modified by automation** — the `crontab.txt` file is provided for you to install manually.
- **Max 5 hours/week** — reminders are time-boxed and focused; Sunday is the main work day.
- **Autism/ADHD-adapted** — short, specific instructions with emojis/tags for visual parsing.
- **Anti-idea-hopping** — Wednesday discipline ping enforces the 72-hour filter.

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| `ntfy publish failed` | Verify `docker ps` shows `ntfy` as healthy on port 2586. |
| `Mattermost webhook failed` | Check that `http://localhost:8065/hooks/oq5dbrom4tbc8e8kfzw4ami6bo` is reachable. |
| Cron not firing | Run `crontab -l` to confirm install. Check `grep CRON /var/log/syslog`. |

## Files

- `send.sh` — publisher script
- `crontab.txt` — schedule (install manually)
- `README.md` — this file
