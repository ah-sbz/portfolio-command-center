#!/usr/bin/env python3
"""Proxy niche validation via Amazon autocomplete API"""

import json
import urllib.request
import urllib.parse
from collections import defaultdict

KEYWORDS = {
    "Niche 1: Neurodivergent": [
        "autism shirt",
        "ADHD shirt",
        "neurodivergent shirt",
        "autistic adult shirt",
        "ADHD women shirt",
        "stimming shirt",
        "masking shirt",
        "special interest shirt",
        "sensory friendly shirt",
    ],
    "Niche 2: Introvert": [
        "introvert shirt",
        "social battery shirt",
        "homebody shirt",
        "socially selective shirt",
        "peopleing is hard shirt",
    ],
    "Niche 3: Tech Humor": [
        "programmer shirt",
        "sysadmin shirt",
        "IT support shirt",
        "devops shirt",
        "developer gifts for women",
    ]
}

def fetch_suggestions(keyword):
    url = (
        "https://completion.amazon.com/api/2017/suggestions?"
        "alias=aps&prefix=" + urllib.parse.quote(keyword) +
        "&suggestion-type=KEYWORD"
    )
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
            "Accept": "application/json",
        }
    )
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode())
            return data.get("suggestions", [])
    except Exception as e:
        return [{"error": str(e)}]

results = {}
for niche, terms in KEYWORDS.items():
    results[niche] = {}
    for term in terms:
        suggestions = fetch_suggestions(term)
        results[niche][term] = suggestions
        print(f"Fetched: {term} -> {len(suggestions)} suggestions")

with open("amazon_autocomplete_results.json", "w") as f:
    json.dump(results, f, indent=2)

print("\nSaved to amazon_autocomplete_results.json")
