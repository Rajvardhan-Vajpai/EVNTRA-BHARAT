import os
import re
import requests
from io import BytesIO
from PIL import Image
from duckduckgo_search import DDGS

ddgs = DDGS()
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}

base_dir = r"c:\Users\hp\OneDrive\Desktop\eventra india"
dynamic_dir = os.path.join(base_dir, "assets", "images", "dynamic")
os.makedirs(dynamic_dir, exist_ok=True)

def sanitize_filename(name):
    return re.sub(r'[^a-zA-Z0-9]', '_', name).strip('_')[:50]

def download_image(query):
    filename = sanitize_filename(query) + ".webp"
    filepath = os.path.join(dynamic_dir, filename)
    relative_path = f"../assets/images/dynamic/{filename}"
    
    if os.path.exists(filepath):
        return relative_path
        
    print(f"Searching for: {query}")
    try:
        results = ddgs.images(keywords=query, region="in-en", safesearch="moderate", max_results=3)
        for res in results:
            url = res['image']
            try:
                resp = requests.get(url, headers=headers, timeout=10)
                if resp.status_code == 200:
                    img = Image.open(BytesIO(resp.content)).convert("RGB")
                    # Resize and crop to 800x600
                    target_ratio = 800 / 600
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
                    
                    img = img.resize((800, 600), Image.Resampling.LANCZOS)
                    img.save(filepath, "WEBP", quality=85)
                    return relative_path
            except Exception as inner_e:
                print(f"Skipping url {url} due to error")
    except Exception as e:
        print(f"Error on DDG search for {query}: {e}")
        
    return None

def process_js(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    changed = False
    current_title = None
    
    for i, line in enumerate(lines):
        # Look for title: "..."
        title_match = re.search(r'title:\s*["\'](.*?)["\']', line)
        if title_match:
            current_title = title_match.group(1)
            
        # Also check for name: "..." used in explore.js categories
        name_match = re.search(r'name:\s*["\'](.*?)["\']', line)
        if name_match:
            current_title = name_match.group(1)
            
        if current_title and "image:" in line and "unsplash.com" in line:
            new_path = download_image(current_title)
            if new_path:
                lines[i] = re.sub(r'image:\s*["\']https://images\.unsplash\.com.*?["\']', f'image: "{new_path}"', line)
                changed = True
            current_title = None
            
        if current_title and "img:" in line and "unsplash.com" in line:
            new_path = download_image(current_title)
            if new_path:
                lines[i] = re.sub(r'img:\s*["\']https://images\.unsplash\.com.*?["\']', f'img: "{new_path}"', line)
                changed = True
            current_title = None
            
    if changed:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.writelines(lines)
        print(f"Updated JS: {filepath}")

def process_html(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    def replacer(match):
        full_tag = match.group(0)
        alt_match = re.search(r'alt=["\'](.*?)["\']', full_tag)
        if alt_match:
            alt_text = alt_match.group(1)
            new_path = download_image(alt_text)
            if new_path:
                return re.sub(r'src=["\']https://images\.unsplash\.com.*?["\']', f'src="{new_path}"', full_tag)
        return full_tag
        
    new_content = re.sub(r'<img[^>]+src=["\']https://images\.unsplash\.com[^>]+>', replacer, content)
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated HTML: {filepath}")

for f in ["events.js", "event-details.js", "explore.js", "discover.js"]:
    p = os.path.join(base_dir, "js", f)
    if os.path.exists(p):
        process_js(p)

for f in ["explore.html", "event-details.html", "home.html", "events.html"]:
    p = os.path.join(base_dir, "html", f)
    if os.path.exists(p):
        process_html(p)

print("Done exact image downloads!")
