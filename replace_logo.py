import os
import re

html_dir = r'c:\Users\hp\OneDrive\Desktop\eventra india\html'
logo_html = '<a href="home.html" class="logo"><img src="../assets/logo/logo.png" alt="Eventra Bharat Logo" style="height: 44px; width: auto; object-fit: contain;"></a>'

for f in os.listdir(html_dir):
    if f.endswith('.html'):
        path = os.path.join(html_dir, f)
        with open(path, 'r', encoding='utf-8') as file:
            content = file.read()
        
        new_content = re.sub(r'<a[^>]*class="logo"[^>]*>.*?</a>', logo_html, content, flags=re.DOTALL | re.IGNORECASE)
        new_content = re.sub(r'<div[^>]*class="logo"[^>]*>.*?</div>', logo_html, new_content, flags=re.DOTALL | re.IGNORECASE)
        
        if new_content != content:
            with open(path, 'w', encoding='utf-8') as file:
                file.write(new_content)
            print(f'Updated {f}')
