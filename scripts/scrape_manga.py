import random
import re
import time
from urllib.parse import urljoin
from bs4 import BeautifulSoup
import requests
from supabase import create_client
from dotenv import load_dotenv
import os
# ==========================================
# CONFIGURATION
# ==========================================

# 1. Load the environment variables from .env
load_dotenv()

# 2. Access variables using os.getenv()
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# Provide fallback default values if variable isn't found
port = os.getenv("PORT", "8000")

print(f"Loaded API Key: {SUPABASE_KEY}")
print(f"Connecting to DB at: {SUPABASE_URL}")

BASE_URL = "https://weebcentral.com"
SEARCH_ENDPOINT = "https://weebcentral.com/search/data"

# Regex to capture the 26-character ULID from /series/<ULID>
SERIES_ID_REGEX = re.compile(r"/series/([A-Z0-9]{26})")

# Initialize Supabase Client
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)


def save_manga_batch(manga_list):
    """Inserts or updates a batch of manga records in Supabase.

    Uses upsert on the 'id' primary key to prevent duplicate errors.
    """
    if not manga_list:
        return

    # Upsert updates existing records if ID matches
    response = supabase.table("manga").upsert(manga_list, on_conflict="id").execute()


def fetch_first_960_manga(target_count=960):
    headers = {
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
            " (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        ),
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    }

    limit = 32  # Server-enforced cap per page
    max_pages = target_count // limit  # 960 / 32 = 30 pages
    offset = 960
    total_saved = 0

    print(f"Starting scrape: Target = {target_count} manga ({max_pages} pages)")

    for page in range(1, max_pages + 1):
        params = {
            "limit": limit,
            "offset": offset,
            "display_mode": "Full Display",
            "sort": "Best Match",
            "order": "Descending",
            "official": "Any",
            "anime": "Any",
            "adult": "Any",
        }

        print(
            f"\n[Page {page}/{max_pages}] Fetching offset {offset} (Items"
            f" {offset+1} - {offset+limit})..."
        )
        response = requests.get(
            SEARCH_ENDPOINT, params=params, headers=headers
        )

        if response.status_code != 200:
            print(
                f"HTTP Error {response.status_code}. Stopping scraper early."
            )
            break

        soup = BeautifulSoup(response.text, "html.parser")

        # Find series links
        series_links = soup.select("a[href*='/series/']")

        page_records = []
        seen_ids = set()

        for link in series_links:
            href = link.get("href", "")
            match = SERIES_ID_REGEX.search(href)

            if not match:
                continue

            series_id = match.group(1)

            if series_id in seen_ids:
                continue
            seen_ids.add(series_id)

            full_url = urljoin(BASE_URL, href)

            img_tag = link.find("img")
            title = (
                img_tag.get("alt", "").strip()
                if img_tag
                else link.get_text(strip=True)
            )
            cover_image = img_tag.get("src", "") if img_tag else ""

            if title:
                page_records.append({
                    "id": series_id,
                    "title": title,
                    "url": full_url,
                    "cover_image": cover_image,
                })

        if not page_records:
            print("No items found on page. End of catalog reached.")
            break

        # Save batch to Supabase
        save_manga_batch(page_records)
        total_saved += len(page_records)
        print(f"  -> Uploaded {len(page_records)} manga to Supabase.")

        offset += limit

        # Random sleep between 1.0 and 5.0 seconds
        sleep_duration = round(random.uniform(1.0, 5.0), 2)
        print(f"  -> Sleeping for {sleep_duration}s...")
        time.sleep(sleep_duration)

    print(
        f"\nDone! Successfully scraped and stored {total_saved} manga in"
        " Supabase."
    )


if __name__ == "__main__":
    fetch_first_960_manga(target_count=960)