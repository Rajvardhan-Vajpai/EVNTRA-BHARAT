import os
from urllib.request import urlopen, Request
from PIL import Image
import io

BASE = os.path.join("assets", "images", "events")

# A list of guaranteed working fallback URLs (all landscape, high-res)
FALLBACK_URLS = [
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&q=80&fit=crop", # Event crowd
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&q=80&fit=crop", # Concert lights
    "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1600&q=80&fit=crop", # Festival
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=80&fit=crop", # Tech event
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1600&q=80&fit=crop", # Food
    "https://images.unsplash.com/photo-1461896836934-bd45ea8f76c2?w=1600&q=80&fit=crop", # Marathon
    "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1600&q=80&fit=crop", # Literature/Books
    "https://images.unsplash.com/photo-1604948501466-4e9c339b9c24?w=1600&q=80&fit=crop", # Indian culture
    "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1600&q=80&fit=crop", # Temple
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80&fit=crop", # Food platter
]

def download_and_convert(url, output_path, max_edge=1600):
    headers = {"User-Agent": "Mozilla/5.0"}
    req = Request(url, headers=headers)
    try:
        with urlopen(req, timeout=30) as resp:
            data = resp.read()
        img = Image.open(io.BytesIO(data))
        img = img.convert("RGB")
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
        return True
    except Exception as e:
        print(f"Error: {e}")
        return False

def main():
    missing_count = 0
    fallback_index = 0
    
    for root, dirs, files in os.walk(BASE):
        # We only care about the event folders (which are 2 levels deep from BASE)
        rel_path = os.path.relpath(root, BASE)
        parts = rel_path.split(os.sep)
        
        if len(parts) == 2:
            # We are in an event folder
            for i in range(1, 5):
                img_path = os.path.join(root, f"{i}.webp")
                if not os.path.exists(img_path) or os.path.getsize(img_path) < 1000:
                    print(f"Missing: {rel_path} -> {i}.webp")
                    url = FALLBACK_URLS[fallback_index % len(FALLBACK_URLS)]
                    if download_and_convert(url, img_path):
                        print(f"  -> Fixed using fallback image.")
                        missing_count += 1
                        fallback_index += 1
                    else:
                        print(f"  -> Failed to download fallback.")
                        
    print(f"\nFixed {missing_count} missing images.")

if __name__ == "__main__":
    main()
