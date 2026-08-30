import os
import requests
from io import BytesIO
from PIL import Image
from duckduckgo_search import DDGS

ddgs = DDGS()
headers = {'User-Agent': 'Mozilla/5.0'}

base_dir = r"c:\Users\hp\OneDrive\Desktop\eventra india"
dynamic_dir = os.path.join(base_dir, "assets", "images", "dynamic")
os.makedirs(dynamic_dir, exist_ok=True)

hero_queries = [
    ("hero_taj", "Taj Mahal wide landscape high quality"),
    ("hero_charminar", "Charminar Hyderabad night high quality"),
    ("hero_hawa", "Hawa Mahal Jaipur wide photography"),
    ("hero_gateway", "Gateway of India Mumbai wide shot")
]

for name, query in hero_queries:
    filepath = os.path.join(dynamic_dir, f"{name}.webp")
    if os.path.exists(filepath):
        print(f"Skipping {name}, already exists")
        continue
    
    print(f"Searching for: {query}")
    try:
        results = ddgs.images(keywords=query, region="in-en", safesearch="moderate", size="Large", max_results=3)
        for res in results:
            url = res['image']
            try:
                resp = requests.get(url, headers=headers, timeout=10)
                if resp.status_code == 200:
                    img = Image.open(BytesIO(resp.content)).convert("RGB")
                    # Resize and crop to 1920x1080 (16:9)
                    target_ratio = 1920 / 1080
                    w, h = img.size
                    img_ratio = w / h
                    if img_ratio > target_ratio:
                        new_w = int(h * target_ratio)
                        left = (w - new_w) / 2
                        img = img.crop((left, 0, left + new_w, h))
                    else:
                        new_h = int(w / target_ratio)
                        top = (h - new_h) / 2
                        img = img.crop((0, top, w, top + new_h))
                    
                    img = img.resize((1920, 1080), Image.Resampling.LANCZOS)
                    img.save(filepath, "WEBP", quality=85)
                    print(f"Saved {filepath}")
                    break
            except Exception as e:
                print(f"Error downloading {url}: {e}")
    except Exception as e:
        print(f"Search error for {query}: {e}")

print("Hero images downloaded.")
