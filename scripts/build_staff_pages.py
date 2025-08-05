import json
from pathlib import Path

from bs4 import BeautifulSoup
from jinja2 import Environment, FileSystemLoader

ROOT = Path(__file__).resolve().parents[1]
DATA_FILE = ROOT / "data" / "staff" / "anatomy.json"
TEMPLATE_DIR = ROOT / "templates"
HTML_FILE = ROOT / "anatomy.html"

def main() -> None:
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        staff = json.load(f)

    env = Environment(loader=FileSystemLoader(TEMPLATE_DIR))
    template = env.get_template("staff_block.html")
    blocks = [template.render(**person) for person in staff]

    with open(HTML_FILE, "r", encoding="utf-8") as f:
        soup = BeautifulSoup(f, "html.parser")

    section = soup.find("section", class_="section-tea")
    if section is None:
        raise RuntimeError("section-tea not found in anatomy.html")

    rows = section.find_all("div", class_="row")
    if not rows:
        raise RuntimeError("No rows found in section-tea")
    row = rows[-1]

    row.clear()
    for block in blocks:
        row.append(BeautifulSoup(block, "html.parser"))

    with open(HTML_FILE, "w", encoding="utf-8") as f:
        f.write(str(soup))


if __name__ == "__main__":
    main()
