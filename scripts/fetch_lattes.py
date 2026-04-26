"""Update data/publications.json from a Lattes export.

Recommended workflow:
1. Export the Lattes CV as XML or HTML.
2. Save it as `data/lattes.xml` or `data/lattes.html` in the repository.
3. Run this script through GitHub Actions.

Because the Lattes platform may change formatting and often requires manual export,
this script is conservative: it parses a local export when present and then calls
`enrich_publication_links.py` to add DOI and Google Scholar links.
"""
from __future__ import annotations

import json
import re
import subprocess
import sys
from pathlib import Path
from urllib.parse import quote_plus

from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data"
PUBS = DATA / "publications.json"


def scholar_link(title: str) -> str:
    return "https://scholar.google.com/scholar?q=" + quote_plus(title)


def parse_lattes_html(path: Path) -> list[dict]:
    soup = BeautifulSoup(path.read_text(encoding="utf-8", errors="ignore"), "html.parser")
    text = soup.get_text("\n")
    lines = [re.sub(r"\s+", " ", line).strip() for line in text.splitlines() if line.strip()]
    items = []
    for line in lines:
        # Conservative heuristic: keep lines that look like article records and contain a year.
        if not re.search(r"\b20\d{2}\b", line):
            continue
        if not any(term in line.lower() for term in ["revista", "journal", "accounting", "contabilidade"]):
            continue
        year = re.search(r"\b(20\d{2})\b", line).group(1)
        title = line
        items.append({
            "year": year,
            "title": title[:260],
            "authors": "",
            "venue": "Lattes export",
            "type": "Published paper",
            "scholar": scholar_link(title[:260])
        })
    return items


def main() -> None:
    html = DATA / "lattes.html"
    xml = DATA / "lattes.xml"
    if html.exists():
        items = parse_lattes_html(html)
        if items:
            PUBS.write_text(json.dumps(items, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
            print(f"Imported {len(items)} records from Lattes HTML")
    elif xml.exists():
        print("Lattes XML found. Add custom XML parsing rules if needed for the exported format.")
    else:
        print("No Lattes export found. Keeping existing data/publications.json")

    subprocess.run([sys.executable, str(ROOT / "scripts" / "enrich_publication_links.py")], check=False)


if __name__ == "__main__":
    main()
