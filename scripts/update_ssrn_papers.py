"""
Update data/ssrn_papers.json manually or from SSRN metadata.

This script intentionally writes only to data/ssrn_papers.json.
It must never write to index.html.
"""
from pathlib import Path
import json

DATA = Path("data/ssrn_papers.json")

def main():
    data = json.loads(DATA.read_text(encoding="utf-8"))
    DATA.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Validated {len(data.get('papers', []))} SSRN working papers.")

if __name__ == "__main__":
    main()
