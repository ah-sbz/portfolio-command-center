#!/usr/bin/env node
/**
 * weekly-digest.js — Freedom Portfolio Weekly Digest
 *
 * Reads site/src/data/portfolio.yml and posts a rich Markdown digest
 * to Mattermost + a short summary to ntfy.
 *
 * Run: cd site && node scripts/weekly-digest.js [--dry-run]
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const http = require('http');
const https = require('https');

const DATA_PATH = path.join(__dirname, '..', 'src', 'data', 'portfolio.yml');
const NTFY_URL = process.env.NTFY_URL || 'http://localhost:2586';
const MATTERMOST_WEBHOOK = process.env.MATTERMOST_WEBHOOK || 'http://localhost:8065/hooks/oq5dbrom4tbc8e8kfzw4ami6bo';
const NTFY_TOPIC = process.env.NTFY_TOPIC || 'freedom-weekly-review';

function loadData() {
  const raw = fs.readFileSync(DATA_PATH, 'utf8');
  return yaml.load(raw);
}

function fmtCurrency(n, currency = 'USD') {
  if (n === undefined || n === null) return '$0.00';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(n);
}

function fmtDate(iso) {
  const d = new Date(iso);
  return d.toISOString().slice(0, 10);
}

function getWeekRange(startDateStr) {
  const start = new Date(startDateStr);
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  return { start: fmtDate(start), end: fmtDate(end) };
}

function computeMetrics(data) {
  const lanes = data.lanes || [];
  const usedHours = data.weeklyBudget?.usedHours || 0;
  const totalHours = data.weeklyBudget?.totalHours || 5;
  const remaining = Math.max(0, totalHours - usedHours);

  const totalIncome = lanes.reduce((sum, l) => sum + (l.incomeThisWeek || 0), 0);
  const monthlyTarget = data.campaign?.monthlyTarget || 150;
  const targetProgress = monthlyTarget > 0 ? (totalIncome / monthlyTarget) * 100 : 0;

  const elapsedDays = Math.max(0, Math.floor((Date.now() - new Date(data.campaign.startDate).getTime()) / 86400000));
  const totalDays = data.campaign.durationDays || 90;
  const expectedProgress = totalDays > 0 ? (elapsedDays / totalDays) * 100 : 0;

  // Lane status mapping
  const statusEmoji = {
    'on-track': '🟢',
    'watch': '🟡',
    'blocked': '🔴',
  };
  const statusText = {
    'on-track': 'On Track',
    'watch': 'Attention',
    'blocked': 'Off Target',
  };
  const trendArrow = {
    up: '↑',
    down: '↓',
    flat: '→',
  };

  // Queue analysis
  const queue = data.coolingQueue || [];
  const now = Date.now();
  const cooling = [];
  const ready = [];
  let approvedThisWeek = 0;

  queue.forEach((item) => {
    const submitted = new Date(item.submittedAt).getTime();
    const hoursElapsed = (now - submitted) / 3600000;
    const isReady = hoursElapsed >= 72;
    if (item.status === 'approved') {
      approvedThisWeek++;
    } else if (isReady) {
      ready.push({ ...item, hoursElapsed });
    } else {
      cooling.push({ ...item, hoursRemaining: Math.ceil(72 - hoursElapsed) });
    }
  });

  // Heaviest lane
  const heaviestLane = lanes.reduce((max, l) => ((l.timeSpent || 0) > (max.timeSpent || 0) ? l : max), lanes[0] || {});

  // Next week plan from rhythm
  const rhythm = data.weeklyRhythm?.days || [];
  const planItems = rhythm
    .filter((d) => d.label && !d.label.toLowerCase().includes('rest'))
    .map((d) => ({ day: d.day, label: d.label }));

  // Decision needed: first ready queue item
  const decisionItem = ready[0];

  return {
    lanes,
    usedHours,
    totalHours,
    remaining,
    totalIncome,
    monthlyTarget,
    targetProgress,
    elapsedDays,
    totalDays,
    expectedProgress,
    statusEmoji,
    statusText,
    trendArrow,
    queueCounts: { total: queue.length, cooling: cooling.length, ready: ready.length, approvedThisWeek },
    cooling,
    ready,
    approvedThisWeek,
    heaviestLane,
    planItems,
    decisionItem,
    currency: data.campaign?.currency || 'USD',
    weekRange: getWeekRange(data.weeklyRhythm?.weekStart || data.campaign?.startDate),
  };
}

function buildDigest(metrics) {
  const { weekRange, lanes, usedHours, totalHours, remaining, totalIncome, monthlyTarget, targetProgress, elapsedDays, totalDays, ready, cooling, approvedThisWeek, heaviestLane, planItems, decisionItem, currency, statusEmoji, statusText, trendArrow } = metrics;

  let md = `## 🗓️ Freedom Portfolio — Week of ${weekRange.start}
\n---\n`;

  // Lane Status
  md += '\n### Lane Status\n\n';
  md += '| Lane | Status | This Week | Trend |\n';
  md += '|------|--------|-----------|-------|\n';
  lanes.forEach((l) => {
    const st = statusText[l.status] || l.status;
    const em = statusEmoji[l.status] || '⚪';
    const inc = l.incomeThisWeek !== undefined ? (l.incomeThisWeek > 0 ? `+${fmtCurrency(l.incomeThisWeek, currency)}` : fmtCurrency(l.incomeThisWeek, currency)) : (l.target || '');
    const tr = trendArrow[l.trend] || '→';
    md += `| **${l.name}** | ${em} ${st} | ${inc} | ${tr} |\n`;
  });

  // Time Budget
  md += '\n### Time Budget\n';
  md += `- **Used**: ${usedHours.toFixed(1)}h / ${totalHours}h\n`;
  md += `- **Remaining**: ${remaining.toFixed(1)}h\n`;
  md += `- **Heaviest lane**: ${heaviestLane.name || 'N/A'} (${(heaviestLane.timeSpent || 0).toFixed(1)}h)\n`;

  // 5% Target
  md += '\n### 5% Monthly Target\n';
  md += `- **Progress**: ${targetProgress.toFixed(0)}% (${fmtCurrency(totalIncome, currency)} / ${fmtCurrency(monthlyTarget, currency)})\n`;
  const weekNum = Math.floor(elapsedDays / 7) + 1;
  const expectedPct = totalDays > 0 ? (elapsedDays / totalDays) * 100 : 0;
  const onPace = targetProgress >= expectedPct * 0.8;
  md += `- **On pace?**: ${onPace ? 'Yes' : 'Slightly behind'} (week ${weekNum} of ${Math.ceil(totalDays / 7)}, target ~${expectedPct.toFixed(0)}%)\n`;

  // 72h Queue
  md += '\n### 72-Hour Queue\n';
  md += `- **Cooling**: ${cooling.length} item${cooling.length !== 1 ? 's' : ''}\n`;
  if (ready.length > 0) {
    md += `- **Ready for review**: ${ready.length} item${ready.length !== 1 ? 's' : ''}`;
    ready.forEach((r) => {
      md += ` — *"${r.idea}"*`;
    });
    md += '\n';
  } else {
    md += `- **Ready for review**: 0\n`;
  }
  md += `- **Approved this week**: ${approvedThisWeek}\n`;

  // Next Week Plan
  md += '\n### Next Week Plan\n';
  if (planItems.length === 0) {
    md += '_No plan items defined._\n';
  } else {
    planItems.forEach((p, i) => {
      md += `${i + 1}. **${p.day}** — ${p.label}\n`;
    });
  }

  // One Decision Needed
  if (decisionItem) {
    md += '\n### One Decision Needed\n';
    md += `> **"${decisionItem.idea}"** has passed the 72h filter.`;
    if (decisionItem.excitement !== undefined) {
      md += ` Post-cool excitement: ${decisionItem.postExcitement !== undefined ? decisionItem.postExcitement : 'TBD'} (was ${decisionItem.excitement}).`;
    }
    if (decisionItem.budgetFit === false) {
      md += ' Budget fit: No (would exceed 5h/week). **Recommended: REJECT.**';
    } else if (decisionItem.budgetFit === true) {
      md += ' Budget fit: Yes. **Recommended: APPROVE or DEFER.**';
    }
    md += '\n';
  }

  md += '\n*Stay the course. No new lanes for ' + Math.max(0, 90 - elapsedDays) + ' more days.*\n';

  return md;
}

function buildShortDigest(metrics) {
  const { lanes, usedHours, totalHours, remaining, totalIncome, targetProgress, ready, elapsedDays } = metrics;
  const onTrack = lanes.filter((l) => l.status === 'on-track').length;
  const attention = lanes.filter((l) => l.status === 'watch').length;
  const blocked = lanes.filter((l) => l.status === 'blocked').length;

  let msg = `Week check-in: ${usedHours.toFixed(1)}h used, ${remaining.toFixed(1)}h left.`;
  if (attention > 0) msg += ` ${attention} lane(s) need attention.`;
  if (blocked > 0) msg += ` ${blocked} lane(s) blocked.`;
  msg += ` Income: $${totalIncome.toFixed(2)}.`;
  msg += ` Target: ${targetProgress.toFixed(0)}%.`;
  if (ready.length > 0) msg += ` ${ready.length} queue item(s) ready for review.`;
  msg += ` Days remaining: ${Math.max(0, 90 - elapsedDays)}.`;

  return msg;
}

async function httpPost(url, body, headers = {}) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https:') ? https : http;
    const urlObj = new URL(url);
    const data = typeof body === 'string' ? body : JSON.stringify(body);
    const mergedHeaders = {
      'Content-Type': typeof body === 'string' ? 'text/plain; charset=utf-8' : 'application/json',
      'Content-Length': Buffer.byteLength(data),
      ...headers,
    };

    const req = client.request(
      {
        hostname: urlObj.hostname,
        port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
        path: urlObj.pathname + urlObj.search,
        method: 'POST',
        headers: mergedHeaders,
      },
      (res) => {
        let responseBody = '';
        res.on('data', (chunk) => (responseBody += chunk));
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve({ status: res.statusCode, body: responseBody });
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${responseBody}`));
          }
        });
      }
    );

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function postNtfy(shortMessage) {
  const url = `${NTFY_URL}/${NTFY_TOPIC}`;
  console.log(`Posting to ntfy: ${url}`);
  try {
    const res = await httpPost(url, shortMessage, {
      Title: 'Freedom Portfolio — Weekly Digest',
      Tags: 'memo,clipboard',
      Priority: '4',
    });
    console.log('ntfy OK:', res.status);
  } catch (err) {
    console.error('ntfy failed:', err.message);
    throw err;
  }
}

async function postMattermost(markdown) {
  console.log('Posting to Mattermost...');
  try {
    const res = await httpPost(MATTERMOST_WEBHOOK, { text: markdown });
    console.log('Mattermost OK:', res.status);
  } catch (err) {
    console.error('Mattermost failed:', err.message);
    throw err;
  }
}

async function main() {
  const dryRun = process.argv.includes('--dry-run');

  console.log('Freedom Portfolio — Weekly Digest\n');

  const data = loadData();
  const metrics = computeMetrics(data);
  const digest = buildDigest(metrics);
  const shortDigest = buildShortDigest(metrics);

  console.log('=== SHORT DIGEST (ntfy) ===');
  console.log(shortDigest);
  console.log('\n=== FULL DIGEST (Mattermost) ===');
  console.log(digest);

  if (dryRun) {
    console.log('\n[--dry-run] No messages sent.');
    return;
  }

  await postNtfy(shortDigest);
  await postMattermost(digest);
  console.log('\nWeekly digest posted successfully.');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
