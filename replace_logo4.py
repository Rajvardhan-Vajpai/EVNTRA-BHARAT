import os
import re

html_dir = r'c:\Users\hp\OneDrive\Desktop\eventra india\html'

for f in os.listdir(html_dir):
    if f.endswith('.html'):
        path = os.path.join(html_dir, f)
        with open(path, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # 1. Clean up login.html
        content = re.sub(r'<h1>EVENTRA BHARAT</h1>\s*', '', content)
        
        # 2. Clean up home.html text
        content = re.sub(
            r'<div style="display: flex; align-items: baseline; gap: 6px;">\s*<span class="logo-text">Eventra</span>\s*<span class="logo-mark">Bharat</span>\s*</div>\s*',
            '',
            content
        )
        
        # 3. Clean up other files text
        content = re.sub(
            r'<span><span class="brand-accent">EVENTRA</span> BHARAT</span>\s*',
            '',
            content
        )
        
        # 4. Remove the inline gap style from nav-logo / logo as it's not needed anymore if there's no text
        content = content.replace('style="display: flex; align-items: center; gap: 10px;"', '')
        content = content.replace('style="display: flex; align-items: center; gap: 8px; text-decoration: none;"', '')
        
        with open(path, 'w', encoding='utf-8') as file:
            file.write(content)
        print(f'Updated {f}')
