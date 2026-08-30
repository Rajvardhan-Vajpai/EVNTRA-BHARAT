import os
import re

html_dir = r'c:\Users\hp\OneDrive\Desktop\eventra india\html'
old_logo_html = '<a href="home.html" class="logo"><img src="../assets/logo/logo.png" alt="Eventra Bharat Logo" style="height: 44px; width: auto; object-fit: contain;"></a>'

new_logo_html = """<a href="home.html" class="logo" style="display: flex; align-items: center; gap: 8px; text-decoration: none;">
    <img src="../assets/logo/logo.png" alt="Eventra Bharat Logo" style="height: 44px; width: auto; object-fit: contain;">
    <span><span class="brand-accent">EVENTRA</span> BHARAT</span>
</a>"""

for f in os.listdir(html_dir):
    if f.endswith('.html'):
        path = os.path.join(html_dir, f)
        with open(path, 'r', encoding='utf-8') as file:
            content = file.read()
        
        new_content = content.replace(old_logo_html, new_logo_html)
        
        if new_content != content:
            with open(path, 'w', encoding='utf-8') as file:
                file.write(new_content)
            print(f'Updated {f}')
