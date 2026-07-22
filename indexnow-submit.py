#!/usr/bin/env python3
"""
IndexNow submitter for spencermorleyconsulting.ca
-------------------------------------------------
Notifies Bing, Yandex, Seznam, Naver (and any other IndexNow engine — one
submission is shared across all of them) that URLs have changed, so they
re-crawl within minutes instead of waiting days.

USAGE
  # Submit every URL in sitemap.xml (default):
  python3 indexnow-submit.py

  # Submit only specific URLs (e.g. the pages you just deployed):
  python3 indexnow-submit.py https://spencermorleyconsulting.ca/municipal.html \
                             https://spencermorleyconsulting.ca/blog/new-post.html

  # Dry run — show what would be sent, send nothing:
  python3 indexnow-submit.py --dry-run

Run it AFTER each SFTP deploy + Cloudflare purge. Only submit URLs that
actually changed (added / updated / deleted) — do not re-submit the whole
site on every run once you are past the initial seeding.

No third-party libraries required (standard library only).
"""

import json
import sys
import os
import re
import urllib.request
import urllib.error

# ── CONFIG ──────────────────────────────────────────────────────────────
HOST         = "spencermorleyconsulting.ca"
KEY          = "397d6c0e236d53a6127f40906ee62365"
KEY_LOCATION = f"https://{HOST}/{KEY}.txt"
ENDPOINT     = "https://api.indexnow.org/IndexNow"   # shared endpoint; fans out to all engines
SITEMAP      = os.path.join(os.path.dirname(os.path.abspath(__file__)), "sitemap.xml")
# ────────────────────────────────────────────────────────────────────────


def urls_from_sitemap(path):
    """Extract <loc> URLs from a sitemap.xml on disk."""
    if not os.path.exists(path):
        sys.exit(f"ERROR: sitemap not found at {path}\n"
                 f"Pass URLs explicitly, or place sitemap.xml next to this script.")
    with open(path, "r", encoding="utf-8") as fh:
        xml = fh.read()
    locs = re.findall(r"<loc>\s*(.*?)\s*</loc>", xml, flags=re.IGNORECASE | re.DOTALL)
    return [u.strip() for u in locs if u.strip()]


def validate(urls):
    """Keep only URLs on our own host — IndexNow rejects (422) foreign hosts."""
    good, bad = [], []
    for u in urls:
        if re.match(rf"^https?://([a-z0-9-]+\.)?{re.escape(HOST)}(/|$)", u, re.IGNORECASE):
            good.append(u)
        else:
            bad.append(u)
    return good, bad


def submit(urls, dry_run=False):
    payload = {
        "host": HOST,
        "key": KEY,
        "keyLocation": KEY_LOCATION,
        "urlList": urls,
    }
    body = json.dumps(payload, ensure_ascii=False).encode("utf-8")

    print(f"IndexNow endpoint : {ENDPOINT}")
    print(f"Key location      : {KEY_LOCATION}")
    print(f"URLs to submit    : {len(urls)}")
    for u in urls:
        print(f"    • {u}")

    if dry_run:
        print("\n[--dry-run] Nothing sent.")
        return 0

    req = urllib.request.Request(
        ENDPOINT, data=body, method="POST",
        headers={"Content-Type": "application/json; charset=utf-8"},
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            code = resp.getcode()
            print(f"\nHTTP {code} — {explain(code)}")
            return 0 if code == 200 else 1
    except urllib.error.HTTPError as e:
        print(f"\nHTTP {e.code} — {explain(e.code)}")
        detail = e.read().decode("utf-8", "ignore").strip()
        if detail:
            print(f"Server said: {detail}")
        return 1
    except urllib.error.URLError as e:
        print(f"\nNetwork error: {e.reason}")
        return 1


def explain(code):
    return {
        200: "OK — URLs accepted.",
        202: "Accepted — key validation pending.",
        400: "Bad request — invalid JSON/format.",
        403: "Forbidden — key file not found or key mismatch. "
             "Confirm the key .txt is live at the key location and readable.",
        422: "Unprocessable — a URL does not belong to this host, or key/schema mismatch.",
        429: "Too many requests — slow down; you are being rate-limited.",
    }.get(code, "Unexpected response.")


def main():
    args = [a for a in sys.argv[1:] if a != "--dry-run"]
    dry  = "--dry-run" in sys.argv

    if args:
        urls = args
    else:
        urls = urls_from_sitemap(SITEMAP)

    good, bad = validate(urls)
    if bad:
        print("SKIPPED (not on host — IndexNow would reject these):")
        for u in bad:
            print(f"    ✗ {u}")
        print()
    if not good:
        sys.exit("Nothing to submit.")

    sys.exit(submit(good, dry_run=dry))


if __name__ == "__main__":
    main()
