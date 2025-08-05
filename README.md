# CGMC Static Site

This repository contains the static site for Government Cuddalore Medical College and Hospital.

## Updating Staff Pages

Staff listings are generated from JSON files located under `data/staff`. After editing any of these files, rebuild the pages with:

```bash
python scripts/build_staff_pages.py
```

The script will read the staff data, render the Jinja2 template for each entry, and update `anatomy.html` with the latest information.
