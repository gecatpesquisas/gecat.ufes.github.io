"""Update data/working-papers.json from SSRN IDs.

SSRN pages may change their HTML. This script uses the SSRN IDs listed in
`data/ssrn_ids.json` and keeps the output stable. When page metadata cannot be
read, it preserves the existing record and still provides SSRN/DOI links.
"""
from __future__ import annotations

import json
import re
from pathlib import Path
from urllib.parse import quote_plus

import requests
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
IDS = ROOT / "data" / "ssrn_ids.json"
OUT = ROOT / "data" / "working-papers.json"


def scholar_link(title: str) -> str:
    return "https://scholar.google.com/scholar?q=" + quote_plus(title)


def existing_by_id() -> dict[str, dict]:
    if not OUT.exists():
        return {}
    data = json.loads(OUT.read_text(encoding="utf-8"))
    result = {}
    for item in data:
        ssrn = item.get("ssrn", "")
        match = re.search(r"abstract=(\d+)", ssrn)
        if match:
            result[match.group(1)] = item
    return result


def fetch_metadata(ssrn_id: str, fallback: dict | None = None) -> dict:
    fallback = fallback or {}
    ssrn_url = f"https://ssrn.com/abstract={ssrn_id}"
    doi_url = f"https://doi.org/10.2139/ssrn.{ssrn_id}"
    item = dict(fallback)
    item.update({"ssrn": ssrn_url, "doi": doi_url, "status": "Working Paper"})

    try:
        html = requests.get(ssrn_url, timeout=20, headers={"User-Agent":"GECAT website updater"}).text
        soup = BeautifulSoup(html, "html.parser")
        title = soup.find("meta", attrs={"name": "citation_title"})
        authors = soup.find_all("meta", attrs={"name": "citation_author"})
        date = soup.find("meta", attrs={"name": "citation_publication_date"})
        if title and title.get("content"):
            item["title"] = title["content"].strip()
        if authors:
            item["authors"] = "; ".join(a.get("content", "").strip() for a in authors if a.get("content"))
        if date and date.get("content"):
            m = re.search(r"(20\d{2}|19\d{2})", date["content"])
            if m:
                item["year"] = m.group(1)
    except Exception:
        pass

    if item.get("title"):
        item["scholar"] = scholar_link(item["title"])
    item.setdefault("year", "")
    item.setdefault("title", f"SSRN Working Paper {ssrn_id}")
    item.setdefault("authors", "")
    return item


def main() -> None:
    ids = json.loads(IDS.read_text(encoding="utf-8"))
    old = existing_by_id()
    data = [fetch_metadata(str(ssrn_id), old.get(str(ssrn_id))) for ssrn_id in ids]
    data.sort(key=lambda x: str(x.get("year", "")), reverse=True)
    OUT.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Updated {len(data)} SSRN working papers")


if __name__ == "__main__":
    main()
