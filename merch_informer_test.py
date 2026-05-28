#!/usr/bin/env python3
"""Quick test to see if Merch Informer cookies work in Playwright"""

import json
from playwright.sync_api import sync_playwright

COOKIES_PATH = "/home/dietpi/github/freedom-portfolio/.merch-informer-cookies.json"

with open(COOKIES_PATH) as f:
    cookies_raw = json.load(f)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context(
        user_agent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
    )
    
    # Load cookies
    for c in cookies_raw:
        context.add_cookies([{
            "name": c["name"],
            "value": c["value"],
            "domain": c["domain"],
            "path": c["path"],
            "httpOnly": c.get("httpOnly", False),
            "secure": c.get("secure", True),
            "sameSite": c.get("sameSite", "Lax").capitalize() if c.get("sameSite") else "Lax",
        }])
    
    page = context.new_page()
    page.goto("https://members.merchinformer.com/dashboard", wait_until="networkidle", timeout=30000)
    
    print(f"Page title: {page.title()}")
    print(f"URL: {page.url}")
    
    # Check if we're on Cloudflare challenge
    if "cloudflare" in page.title().lower() or "attention" in page.title().lower():
        print("Cloudflare challenge detected")
    elif "login" in page.title().lower():
        print("Redirected to login — cookies expired")
    else:
        print("Possibly logged in")
        # Dump some text
        body_text = page.locator("body").inner_text()[:500]
        print(f"Body preview: {body_text}")
    
    browser.close()
