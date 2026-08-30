import os

html_dir = r'c:\Users\hp\OneDrive\Desktop\eventra india\html'

for f in os.listdir(html_dir):
    if f.endswith('.html'):
        path = os.path.join(html_dir, f)
        with open(path, 'r', encoding='utf-8') as file:
            content = file.read()
        
        new_content = content.replace('logo.png', 'logo_final.png')
        
        if new_content != content:
            with open(path, 'w', encoding='utf-8') as file:
                file.write(new_content)
            print(f'Updated {f}')
