import os
import glob
import re

html_dir = r"c:\Users\hp\OneDrive\Desktop\eventra india\html"
files = glob.glob(os.path.join(html_dir, "*.html"))

nav_logo_pattern = re.compile(r'<a[^>]*class="[^"]*nav-logo[^"]*"[^>]*>.*?</a>', re.DOTALL)
footer_logo_pattern = re.compile(r'<a[^>]*class="[^"]*nav-logo[^"]*"[^>]*style="display:inline-flex;"[^>]*>.*?</a>', re.DOTALL)

# For home.html specifically, we might have multiple nav-logos.
# So let's be careful.
# Actually, the replacement for both is the same structure.

new_logo_html = '''<a href="home.html" class="nav-logo dynamic-logo-container">
      <span class="logo-text">Eventra</span>
      <span class="logo-mark dynamic-bharat">Bharat</span>
    </a>'''

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    
    # 1. Clean up old inline styles/scripts in home.html
    if 'home.html' in filepath:
        content = re.sub(r'<style>\s*/\* Dynamic Logo Styles \*/.*?</style>', '', content, flags=re.DOTALL)
        content = re.sub(r'<script>\s*// Dynamic Logo Language Rotation.*?</script>', '', content, flags=re.DOTALL)

    # 2. Add logo.css to head
    if '../css/logo.css' not in content:
        content = content.replace('</head>', '  <link rel="stylesheet" href="../css/logo.css">\n</head>')

    # 3. Add logo.js to body
    if '../js/logo.js' not in content:
        content = content.replace('</body>', '  <script src="../js/logo.js"></script>\n</body>')

    # 4. Replace ALL nav-logo anchors with the new one
    content = nav_logo_pattern.sub(new_logo_html, content)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {os.path.basename(filepath)}")

print("All files updated successfully.")
