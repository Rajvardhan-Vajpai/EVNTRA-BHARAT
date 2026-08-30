import os
import requests
from io import BytesIO
from PIL import Image
from duckduckgo_search import DDGS

events_to_fetch = [
    {"query": "Sunburn Festival Goa crowd DJ", "folder": "assets/images/events/goa/sunburn-festival"},
    {"query": "Durga Puja Kolkata pandal idol", "folder": "assets/images/events/kolkata/durga-puja"},
    {"query": "Jaipur Literature Festival audience authors", "folder": "assets/images/events/jaipur/jaipur-literature-festival"},
    {"query": "Delhi Comic Con cosplay", "folder": "assets/images/events/delhi/comic-con-delhi"},
    {"query": "NH7 Weekender Pune music concert", "folder": "assets/images/events/pune/nh7-weekender-pune"},
    {"query": "Bengaluru food festival stalls crowd", "folder": "assets/images/events/bengaluru/bengaluru-food-fete"},
    {"query": "International Kite Festival Ahmedabad sky", "folder": "assets/images/events/ahmedabad/international-kite-festival"},
    {"query": "Chennai Marathon runners", "folder": "assets/images/events/chennai/chennai-marathon"},
    {"query": "Numaish Exhibition Hyderabad fair rides", "folder": "assets/images/events/hyderabad/numaish-exhibition"},
]

ddgs = DDGS()

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

def process_image(url, output_path):
    try:
        response = requests.get(url, headers=headers, timeout=10)
        if response.status_code == 200:
            img = Image.open(BytesIO(response.content))
            img = img.convert("RGB")
            # Resize and crop to 800x600 for consistency
            target_ratio = 800 / 600
            w, h = img.size
            img_ratio = w / h
            if img_ratio > target_ratio:
                # crop width
                new_w = int(h * target_ratio)
                left = (w - new_w) / 2
                img = img.crop((left, 0, left + new_w, h))
            else:
                # crop height
                new_h = int(w / target_ratio)
                top = (h - new_h) / 2
                img = img.crop((0, top, w, top + new_h))
            
            img = img.resize((800, 600), Image.Resampling.LANCZOS)
            img.save(output_path, "WEBP", quality=85)
            return True
    except Exception as e:
        print(f"Error downloading {url}: {e}")
    return False

for ev in events_to_fetch:
    print(f"Searching for: {ev['query']}")
    os.makedirs(ev['folder'], exist_ok=True)
    
    results = ddgs.images(
        keywords=ev['query'],
        region="in-en",
        safesearch="moderate",
        size="Large",
        max_results=15
    )
    
    downloaded = 0
    for res in results:
        url = res['image']
        out_file = os.path.join(ev['folder'], f"{downloaded + 1}.webp")
        if process_image(url, out_file):
            print(f"  Downloaded image {downloaded + 1}")
            downloaded += 1
        if downloaded >= 4:
            break
    
    if downloaded < 4:
        print(f"  Only got {downloaded} images for {ev['query']}")

print("Done downloading relevant images!")
