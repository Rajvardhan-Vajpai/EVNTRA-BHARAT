"""
Eventra Bharat - Event Image Downloader
Downloads curated images from Unsplash for all 9 cities x 4 events x 4 images.
Converts to WebP, resizes to max 1600px longest edge.
"""
import os, sys, time, io
from urllib.request import urlopen, Request
from PIL import Image

BASE = os.path.join("assets", "images", "events")

# Curated Unsplash image URLs mapped to each city/event
# Format: { "city/event-folder": [url1, url2, url3, url4] }
# Each URL returns a high-quality landscape photo

EVENTS = {
    # ==================== DELHI ====================
    "delhi/nh7-weekender-delhi": [
        "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1600&q=80&fit=crop",
        "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1600&q=80&fit=crop",
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1600&q=80&fit=crop",
        "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1600&q=80&fit=crop",
    ],
    "delhi/qutub-festival": [
        "https://images.unsplash.com/photo-1548013146-72479768bada?w=1600&q=80&fit=crop",  # Qutub Minar
        "https://images.unsplash.com/photo-1585135497273-1a86d9d9e2c3?w=1600&q=80&fit=crop",  # Indian classical
        "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1600&q=80&fit=crop",  # India Gate/monument
        "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1600&q=80&fit=crop",  # Stage performance
    ],
    "delhi/india-international-trade-fair": [
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=80&fit=crop",  # Exhibition hall
        "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=1600&q=80&fit=crop",  # Trade fair
        "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1600&q=80&fit=crop",  # Conference
        "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=1600&q=80&fit=crop",  # Expo booth
    ],
    "delhi/comic-con-delhi": [
        "https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?w=1600&q=80&fit=crop",  # Cosplay
        "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=1600&q=80&fit=crop",  # Comic con
        "https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?w=1600&q=80&fit=crop",  # Comics/pop culture
        "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1600&q=80&fit=crop",  # Convention crowd
    ],

    # ==================== BENGALURU ====================
    "bengaluru/bangalore-open-air": [
        "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=1600&q=80&fit=crop",  # Rock concert
        "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1600&q=80&fit=crop",  # Metal concert
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&q=80&fit=crop",  # Concert lights
        "https://images.unsplash.com/photo-1468164016595-6108e4a8c3f6?w=1600&q=80&fit=crop",  # Live band
    ],
    "bengaluru/karaga-festival": [
        "https://images.unsplash.com/photo-1604948501466-4e9c339b9c24?w=1600&q=80&fit=crop",  # Indian festival
        "https://images.unsplash.com/photo-1567591370504-80f8e1bca4a2?w=1600&q=80&fit=crop",  # Temple festival
        "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1600&q=80&fit=crop",  # Indian temple
        "https://images.unsplash.com/photo-1609766418204-94aae78e7703?w=1600&q=80&fit=crop",  # Festival lights
    ],
    "bengaluru/bengaluru-food-fete": [
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1600&q=80&fit=crop",  # Street food
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80&fit=crop",  # Food platter
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80&fit=crop",  # Restaurant dining
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1600&q=80&fit=crop",  # Food preparation
    ],
    "bengaluru/bengaluru-tech-summit": [
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=80&fit=crop",  # Tech conference
        "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1600&q=80&fit=crop",  # Speaker on stage
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1600&q=80&fit=crop",  # Tech summit
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600&q=80&fit=crop",  # Innovation
    ],

    # ==================== HYDERABAD ====================
    "hyderabad/hyderabad-music-festival": [
        "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=1600&q=80&fit=crop",  # Classical music
        "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=1600&q=80&fit=crop",  # Guitar performance
        "https://images.unsplash.com/photo-1486092993810-e93067b4da68?w=1600&q=80&fit=crop",  # Concert hall
        "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1600&q=80&fit=crop",  # Music crowd
    ],
    "hyderabad/bonalu-festival": [
        "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=1600&q=80&fit=crop",  # Indian celebration
        "https://images.unsplash.com/photo-1604948501466-4e9c339b9c24?w=1600&q=80&fit=crop",  # Decorations
        "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=1600&q=80&fit=crop",  # Colorful festival
        "https://images.unsplash.com/photo-1567591370504-80f8e1bca4a2?w=1600&q=80&fit=crop",  # Temple
    ],
    "hyderabad/numaish-exhibition": [
        "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=1600&q=80&fit=crop",  # Exhibition
        "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=1600&q=80&fit=crop",  # Fair/expo
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&q=80&fit=crop",  # Night lights
        "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1600&q=80&fit=crop",  # Crowd celebration
    ],
    "hyderabad/formula-e-hyderabad": [
        "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1600&q=80&fit=crop",  # Race car
        "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?w=1600&q=80&fit=crop",  # Racing
        "https://images.unsplash.com/photo-1504093376-5e1b06ec4121?w=1600&q=80&fit=crop",  # Speed
        "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1600&q=80&fit=crop",  # Car
    ],

    # ==================== PUNE ====================
    "pune/nh7-weekender-pune": [
        "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1600&q=80&fit=crop",  # Live concert
        "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1600&q=80&fit=crop",  # Concert stage
        "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1600&q=80&fit=crop",  # Festival crowd
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&q=80&fit=crop",  # Lights
    ],
    "pune/ganesh-festival-pune": [
        "https://images.unsplash.com/photo-1609766418204-94aae78e7703?w=1600&q=80&fit=crop",  # Festival lights
        "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=1600&q=80&fit=crop",  # Indian festival
        "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1600&q=80&fit=crop",  # Indian temple
        "https://images.unsplash.com/photo-1567591370504-80f8e1bca4a2?w=1600&q=80&fit=crop",  # Temple procession
    ],
    "pune/pune-food-festival": [
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80&fit=crop",  # Indian food
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1600&q=80&fit=crop",  # Street food
        "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=1600&q=80&fit=crop",  # Food plating
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1600&q=80&fit=crop",  # Cooking
    ],
    "pune/pune-international-marathon": [
        "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=1600&q=80&fit=crop",  # Marathon runners
        "https://images.unsplash.com/photo-1461896836934-bd45ea8f76c2?w=1600&q=80&fit=crop",  # Running event
        "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=1600&q=80&fit=crop",  # Finish line
        "https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?w=1600&q=80&fit=crop",  # Runners
    ],

    # ==================== JAIPUR ====================
    "jaipur/jaipur-literature-festival": [
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1600&q=80&fit=crop",  # Library
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1600&q=80&fit=crop",  # Books
        "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1600&q=80&fit=crop",  # Speaker panel
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&q=80&fit=crop",  # Author event
    ],
    "jaipur/gangaur-festival": [
        "https://images.unsplash.com/photo-1598091383021-15dea01d2d05?w=1600&q=80&fit=crop",  # Jaipur palace
        "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1600&q=80&fit=crop",  # Rajasthani colors
        "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1600&q=80&fit=crop",  # India monument
        "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=1600&q=80&fit=crop",  # Festival celebration
    ],
    "jaipur/teej-fair-jaipur": [
        "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=1600&q=80&fit=crop",  # Colorful market
        "https://images.unsplash.com/photo-1604948501466-4e9c339b9c24?w=1600&q=80&fit=crop",  # Fair decorations
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&q=80&fit=crop",  # Night lights
        "https://images.unsplash.com/photo-1609766418204-94aae78e7703?w=1600&q=80&fit=crop",  # Festive lights
    ],
    "jaipur/pink-city-half-marathon": [
        "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=1600&q=80&fit=crop",  # Marathon
        "https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?w=1600&q=80&fit=crop",  # Runners
        "https://images.unsplash.com/photo-1598091383021-15dea01d2d05?w=1600&q=80&fit=crop",  # Jaipur backdrop
        "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=1600&q=80&fit=crop",  # Running event
    ],

    # ==================== KOLKATA ====================
    "kolkata/durga-puja": [
        "https://images.unsplash.com/photo-1604948501466-4e9c339b9c24?w=1600&q=80&fit=crop",  # Indian festival
        "https://images.unsplash.com/photo-1609766418204-94aae78e7703?w=1600&q=80&fit=crop",  # Festival lights
        "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=1600&q=80&fit=crop",  # Celebration
        "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=1600&q=80&fit=crop",  # Colorful decorations
    ],
    "kolkata/kolkata-international-film-festival": [
        "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1600&q=80&fit=crop",  # Cinema
        "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1600&q=80&fit=crop",  # Film reel
        "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1600&q=80&fit=crop",  # Movie theater
        "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1600&q=80&fit=crop",  # Stage event
    ],
    "kolkata/park-street-carnival": [
        "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1600&q=80&fit=crop",  # Carnival
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&q=80&fit=crop",  # Night festival
        "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=1600&q=80&fit=crop",  # Celebration/confetti
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&q=80&fit=crop",  # Night lights
    ],
    "kolkata/kolkata-book-fair": [
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1600&q=80&fit=crop",  # Books
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1600&q=80&fit=crop",  # Library
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&q=80&fit=crop",  # People
        "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1600&q=80&fit=crop",  # Bookshelf
    ],

    # ==================== AHMEDABAD ====================
    "ahmedabad/navratri-garba": [
        "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=1600&q=80&fit=crop",  # Festival dance
        "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=1600&q=80&fit=crop",  # Colorful
        "https://images.unsplash.com/photo-1609766418204-94aae78e7703?w=1600&q=80&fit=crop",  # Night lights
        "https://images.unsplash.com/photo-1604948501466-4e9c339b9c24?w=1600&q=80&fit=crop",  # Decorations
    ],
    "ahmedabad/international-kite-festival": [
        "https://images.unsplash.com/photo-1534103639282-d47da2482e01?w=1600&q=80&fit=crop",  # Kites in sky
        "https://images.unsplash.com/photo-1524503033411-c9566986fc8f?w=1600&q=80&fit=crop",  # Colorful kites
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&q=80&fit=crop",  # Blue sky
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&q=80&fit=crop",  # Festival
    ],
    "ahmedabad/ahmedabad-food-festival": [
        "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=1600&q=80&fit=crop",  # Food plating
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80&fit=crop",  # Indian food
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1600&q=80&fit=crop",  # Street food
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80&fit=crop",  # Food market
    ],
    "ahmedabad/sabarmati-marathon": [
        "https://images.unsplash.com/photo-1461896836934-bd45ea8f76c2?w=1600&q=80&fit=crop",  # Running
        "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=1600&q=80&fit=crop",  # Marathon
        "https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?w=1600&q=80&fit=crop",  # Runners crowd
        "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=1600&q=80&fit=crop",  # Running road
    ],

    # ==================== CHENNAI ====================
    "chennai/margazhi-music-season": [
        "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=1600&q=80&fit=crop",  # Classical music
        "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=1600&q=80&fit=crop",  # Instrument
        "https://images.unsplash.com/photo-1486092993810-e93067b4da68?w=1600&q=80&fit=crop",  # Concert venue
        "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1600&q=80&fit=crop",  # Stage
    ],
    "chennai/pongal-festival": [
        "https://images.unsplash.com/photo-1604948501466-4e9c339b9c24?w=1600&q=80&fit=crop",  # Indian festival
        "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=1600&q=80&fit=crop",  # Celebration
        "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1600&q=80&fit=crop",  # Temple
        "https://images.unsplash.com/photo-1567591370504-80f8e1bca4a2?w=1600&q=80&fit=crop",  # Religious
    ],
    "chennai/chennai-book-fair": [
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1600&q=80&fit=crop",  # Bookstore
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1600&q=80&fit=crop",  # Library
        "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1600&q=80&fit=crop",  # Book stacks
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=80&fit=crop",  # Expo/fair
    ],
    "chennai/chennai-marathon": [
        "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=1600&q=80&fit=crop",  # Marathon
        "https://images.unsplash.com/photo-1461896836934-bd45ea8f76c2?w=1600&q=80&fit=crop",  # Road runners
        "https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?w=1600&q=80&fit=crop",  # Running crowd
        "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=1600&q=80&fit=crop",  # Finish line
    ],

    # ==================== GOA ====================
    "goa/sunburn-festival": [
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&q=80&fit=crop",  # DJ lights
        "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=1600&q=80&fit=crop",  # Concert crowd
        "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1600&q=80&fit=crop",  # Festival stage
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1600&q=80&fit=crop",  # Concert night
    ],
    "goa/carnival-of-goa": [
        "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1600&q=80&fit=crop",  # Carnival/parade
        "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=1600&q=80&fit=crop",  # Confetti
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&q=80&fit=crop",  # Festival night
        "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=1600&q=80&fit=crop",  # Colorful
    ],
    "goa/goa-food-cultural-festival": [
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1600&q=80&fit=crop",  # Food stalls
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80&fit=crop",  # Food platter
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80&fit=crop",  # Dining
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1600&q=80&fit=crop",  # Food prep
    ],
    "goa/shigmo-festival": [
        "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=1600&q=80&fit=crop",  # Indian festival
        "https://images.unsplash.com/photo-1604948501466-4e9c339b9c24?w=1600&q=80&fit=crop",  # Decorations
        "https://images.unsplash.com/photo-1609766418204-94aae78e7703?w=1600&q=80&fit=crop",  # Festive lights
        "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1600&q=80&fit=crop",  # Temple
    ],
}


def download_and_convert(url, output_path, max_edge=1600):
    """Download an image, resize, and save as WebP."""
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    }
    req = Request(url, headers=headers)
    try:
        with urlopen(req, timeout=30) as resp:
            data = resp.read()
        img = Image.open(io.BytesIO(data))
        img = img.convert("RGB")

        # Resize longest edge to max_edge
        w, h = img.size
        if max(w, h) > max_edge:
            if w > h:
                new_w = max_edge
                new_h = int(h * max_edge / w)
            else:
                new_h = max_edge
                new_w = int(w * max_edge / h)
            img = img.resize((new_w, new_h), Image.LANCZOS)

        img.save(output_path, "WEBP", quality=82)
        size_kb = os.path.getsize(output_path) / 1024
        return True, f"{size_kb:.0f}KB"
    except Exception as e:
        return False, str(e)


def main():
    total = 0
    success = 0
    failed = []

    total_events = len(EVENTS)
    event_num = 0

    for event_path, urls in EVENTS.items():
        event_num += 1
        folder = os.path.join(BASE, event_path)
        os.makedirs(folder, exist_ok=True)

        city, event = event_path.split("/", 1)
        print(f"\n[{event_num}/{total_events}] {city.upper()} / {event}")

        for i, url in enumerate(urls, 1):
            total += 1
            out = os.path.join(folder, f"{i}.webp")

            if os.path.exists(out) and os.path.getsize(out) > 1000:
                print(f"  {i}.webp - already exists, skipping")
                success += 1
                continue

            ok, info = download_and_convert(url, out)
            if ok:
                success += 1
                print(f"  {i}.webp - OK ({info})")
            else:
                failed.append(f"{event_path}/{i}.webp: {info}")
                print(f"  {i}.webp - FAILED: {info}")

            time.sleep(0.3)  # Be polite

    print(f"\n{'='*60}")
    print(f"DOWNLOAD COMPLETE")
    print(f"{'='*60}")
    print(f"Cities:       9")
    print(f"Events:       {total_events}")
    print(f"Total images: {total}")
    print(f"Success:      {success}")
    print(f"Failed:       {len(failed)}")
    if failed:
        print(f"\nFailed downloads:")
        for f in failed:
            print(f"  ✗ {f}")
    else:
        print(f"\n✓ All images downloaded successfully!")


if __name__ == "__main__":
    main()
