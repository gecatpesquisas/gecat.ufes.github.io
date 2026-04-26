"""
Update publications_lse_nber.json from an exported Lattes file.

Usage:
  1. Export the Lattes CV as XML or HTML.
  2. Save it as data/lattes.xml or data/lattes.html.
  3. Adapt the parser below to your export format.
  4. Run: python scripts/update_lattes_publications.py

This placeholder keeps the GitHub Pages site static while allowing automated
publication updates via GitHub Actions or local scripts.
"""
from pathlib import Path
import json

DATA = Path("data/publications_lse_nber.json")

def main():
    if not DATA.exists():
        raise SystemExit("data/publications_lse_nber.json not found")
    pubs = json.loads(DATA.read_text(encoding="utf-8"))
    # TODO: parse exported Lattes XML/HTML and merge records here.
    DATA.write_text(json.dumps(pubs, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Checked {len(pubs)} publication records.")

if __name__ == "__main__":
    main()
