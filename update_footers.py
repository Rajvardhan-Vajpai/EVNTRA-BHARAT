import os
import re

dir_path = r'c:\Users\hp\OneDrive\Desktop\eventra india\html'
css_path = r'c:\Users\hp\OneDrive\Desktop\eventra india\css\footer.css'
js_path = r'c:\Users\hp\OneDrive\Desktop\eventra india\js\footer.js'

footer_css = '''
:root {
  --maroon:        #7c1f23;
  --maroon-deep:   #5c1418;
  --cream-deep:    #f3ead9;
  --paper:         #fffdf9;
  --ink-soft:      #5c4c3f;
  --line:          #e3d4ba;
}
footer { background: var(--paper); border-top: 1px solid var(--line); padding: 60px 0 32px; width: 100%; box-sizing: border-box; }
.footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr; gap: 40px; margin-bottom: 44px; width: 100%; box-sizing: border-box; padding: 0 5%; }
.footer-tagline { font-size: 14px; color: var(--ink-soft); line-height: 1.7; margin: 14px 0 20px; max-width: 250px; font-family: 'Lato', sans-serif; }
.socials { display: flex; gap: 8px; }
.soc-btn {
  width: 34px; height: 34px; border-radius: 50%;
  border: 1.4px solid var(--line); background: transparent;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; cursor: pointer; text-decoration: none; color: var(--ink-soft);
  transition: all 0.2s;
}
.soc-btn:hover { background: var(--maroon); border-color: var(--maroon); color: #fff; transform: translateY(-2px); }
.fc-title { font-family: 'Playfair Display', serif; font-size: 14px; font-weight: 700; margin-bottom: 16px; color: var(--maroon-deep); }
.fc a { display: block; font-size: 13px; color: var(--ink-soft); text-decoration: none; margin-bottom: 10px; transition: color 0.2s; font-family: 'Lato', sans-serif; }
.fc a:hover { color: var(--maroon); }
.footer-bottom { display: flex; justify-content: space-between; align-items: center; padding-top: 26px; border-top: 1px solid var(--line); padding-left: 5%; padding-right: 5%; }
.footer-copy { font-size: 12px; color: var(--ink-soft); font-family: 'Lato', sans-serif; }
.footer-legal { display: flex; gap: 20px; }
.footer-legal a { font-size: 12px; color: var(--ink-soft); text-decoration: none; transition: color 0.2s; font-family: 'Lato', sans-serif; }
.footer-legal a:hover { color: var(--maroon); }
@media (max-width: 980px) {
  .footer-grid { grid-template-columns: 1fr 1fr; }
}
'''
with open(css_path, 'w', encoding='utf-8') as f: f.write(footer_css)

footer_js = '''
document.addEventListener("DOMContentLoaded", () => {
    const bharatWords = ["Bharat", "भारत", "பாரதம்", "ভারত", "India"];
    let currentIndex = 0;
    const elements = document.querySelectorAll(".dynamic-bharat");
    if(elements.length > 0) {
      setInterval(() => {
        currentIndex = (currentIndex + 1) % bharatWords.length;
        elements.forEach(el => {
          el.classList.add("fade-out");
          setTimeout(() => {
            el.textContent = bharatWords[currentIndex];
            el.classList.remove("fade-out");
          }, 400);
        });
      }, 3000);
    }
});
'''
with open(js_path, 'w', encoding='utf-8') as f: f.write(footer_js)

home_path = os.path.join(dir_path, 'home.html')
with open(home_path, 'r', encoding='utf-8') as f: home_content = f.read()

footer_match = re.search(r'(<footer.*?>.*?</footer>)', home_content, flags=re.DOTALL)
footer_html = footer_match.group(1) if footer_match else ''
if not footer_html:
    print('No footer HTML found!')
    exit()

# Remove the inline script from home.html
home_content = re.sub(r'<!-- Chatbot.*?<script>.*?</script>', '', home_content, flags=re.DOTALL)
with open(home_path, 'w', encoding='utf-8') as f: f.write(home_content)

for filename in os.listdir(dir_path):
    if filename.endswith('.html'):
        filepath = os.path.join(dir_path, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Inject CSS if not there
        if 'footer.css' not in content:
            content = re.sub(r'(</head>)', r'    <link rel="stylesheet" href="../css/footer.css">\n\1', content, flags=re.IGNORECASE)

        # Inject JS if not there
        if 'footer.js' not in content:
            content = re.sub(r'(</body>)', r'    <script src="../js/footer.js"></script>\n\1', content, flags=re.IGNORECASE)
        
        # Replace Footer
        if re.search(r'<footer[^>]*>.*?</footer>', content, flags=re.DOTALL):
            content = re.sub(r'<footer[^>]*>.*?</footer>', footer_html, content, flags=re.DOTALL)
        else:
            # Append before JS injection or body
            content = re.sub(r'(<script src="../js/footer.js)', footer_html + r'\n\1', content)

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Processed {filename}')
