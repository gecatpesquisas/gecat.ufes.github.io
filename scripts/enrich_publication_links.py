"""Enrich data/publications.json with DOI and access links.

What it does:
- Reads data/publications.json.
- For records without DOI, searches Crossref by title.
- Adds DOI URL when the match is sufficiently similar.
- Adds a Google Scholar search link for every record.

Notes:
- Google Scholar does not provide an official free API for automated scraping. This script
  creates stable Google Scholar search links instead of scraping Google Scholar pages.
- Crossref matching is conservative to avoid wrong DOI assignments.
"""
from __future__ import annotations

import json
import re
import time
from difflib import SequenceMatcher
from pathlib import Path
from urllib.parse import quote_plus

import requests

ROOT = Path(__file__).resolve().parents[1]
PUBS = ROOT / "data" / "publications.json"
MAILTO = "gecat.pesquisas@gmail.com"


def clean(text: str) -> str:
    text = text.lower()
    text = re.sub(r"[^a-z0-9áéíóúàâêôãõçñü ]+", " ", text)
    return re.sub(r"\s+", " ", text).strip()


def similarity(a: str, b: str) -> float:
    return SequenceMatcher(None, clean(a), clean(b)).ratio()


def scholar_link(title: str) -> str:
    return "https://scholar.google.com/scholar?q=" + quote_plus(title)


def crossref_lookup(title: str) -> tuple[str | None, str | None]:
    url = "https://api.crossref.org/works"
    params = {"query.title": title, "rows": 3, "select": "DOI,title,URL"}
    headers = {"User-Agent": f"GECAT website updater (mailto:{MAILTO})"}
    try:
        response = requests.get(url, params=params, headers=headers, timeout=20)
        response.raise_for_status()
        items = response.json().get("message", {}).get("items", [])
    except Exception:
        return None, None

    best = None
    best_score = 0.0
    for item in items:
        candidate_title = " ".join(item.get("title") or [])
        score = similarity(title, candidate_title)
        if score > best_score:
            best = item
            best_score = score

    if best and best_score >= 0.86 and best.get("DOI"):
        doi = best["DOI"]
        return doi, "https://doi.org/" + doi
    return None, None


def main() -> None:
    data = json.loads(PUBS.read_text(encoding="utf-8"))
    changed = False

    for item in data:
        title = item.get("title", "")
        if not title:
            continue
        item["scholar"] = item.get("scholar") or scholar_link(title)
        if not item.get("doi"):
            doi, doi_url = crossref_lookup(title)
            if doi and doi_url:
                item["doi"] = doi_url
                changed = True
            time.sleep(1)
        changed = True

    PUBS.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("Updated publication links" if changed else "No changes")


if __name__ == "__main__":
    main()
