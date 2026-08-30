import os
import re
import random

# Categories of Unsplash images
images = {
    "beach": [
        "https://images.unsplash.com/photo-1512343879784-a960bf40e4f2?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=800&auto=format&fit=crop"
    ],
    "food": [
        "https://images.unsplash.com/photo-1585938389612-a552a28d6914?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=800&auto=format&fit=crop"
    ],
    "mountain": [
        "https://images.unsplash.com/photo-1564507592227-884d25071578?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1580227700204-5f502ce0e2da?q=80&w=800&auto=format&fit=crop"
    ],
    "event": [
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1540039155732-6761b33604f3?q=80&w=800&auto=format&fit=crop"
    ],
    "heritage": [
        "https://images.unsplash.com/photo-1515091943-9d5c0ad74baf?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1532664189809-02133fee698d?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=800&auto=format&fit=crop"
    ],
    "general": [
        "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800&auto=format&fit=crop"
    ]
}

def get_image_for_line(line_lower):
    if any(w in line_lower for w in ["goa", "beach", "water", "cruise"]):
        return random.choice(images["beach"])
    if any(w in line_lower for w in ["food", "cuisine", "taste", "dining", "banquet"]):
        return random.choice(images["food"])
    if any(w in line_lower for w in ["mountain", "kashmir", "shimla", "valley", "alpine", "snow"]):
        return random.choice(images["mountain"])
    if any(w in line_lower for w in ["concert", "music", "festival", "symphony", "dance", "stage"]):
        return random.choice(images["event"])
    if any(w in line_lower for w in ["heritage", "palace", "temple", "jaipur", "varanasi", "khajuraho"]):
        return random.choice(images["heritage"])
    return random.choice(images["general"])

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    changed = False
    for i, line in enumerate(lines):
        line_lower = line.lower()
        if "../assets/images/placeholder-landscape.svg" in line or "../assets/images/placeholder-square.svg" in line:
            img_url = get_image_for_line(line_lower)
            # Replace landscape
            if "../assets/images/placeholder-landscape.svg" in line:
                lines[i] = line.replace("../assets/images/placeholder-landscape.svg", img_url)
                changed = True
            # Replace square
            if "../assets/images/placeholder-square.svg" in line:
                # for square, maybe add a crop square parameter if we want, but auto=format&fit=crop works
                lines[i] = lines[i].replace("../assets/images/placeholder-square.svg", img_url)
                changed = True
                
    if changed:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.writelines(lines)
        print(f"Updated {filepath}")

base_dir = r"c:\Users\hp\OneDrive\Desktop\eventra india"

# Process HTML
html_dir = os.path.join(base_dir, "html")
if os.path.exists(html_dir):
    for f in os.listdir(html_dir):
        if f.endswith(".html"):
            process_file(os.path.join(html_dir, f))

# Process JS
js_dir = os.path.join(base_dir, "js")
if os.path.exists(js_dir):
    for f in os.listdir(js_dir):
        if f.endswith(".js"):
            process_file(os.path.join(js_dir, f))
