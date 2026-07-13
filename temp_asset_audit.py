import re
import pathlib
import json
root = pathlib.Path('.').resolve()
patterns = {
    'src': re.compile(r'src\s*=\s*["\']([^"\']+)["\']', re.I),
    'url': re.compile(r'url\(\s*([^)"\']+?)\s*\)', re.I),
    'background-image': re.compile(r'background-image\s*:\s*([^;]+);', re.I),
    'poster': re.compile(r'poster\s*=\s*["\']([^"\']+)["\']', re.I),
    'image': re.compile(r'image\s*:\s*([^;\n]+);', re.I),
    'icon': re.compile(r'icon\s*:\s*([^;\n]+);', re.I)
}
files = []
for ext in ['.html', '.css', '.js', '.py', '.md', '.json', '.txt']:
    files.extend(root.rglob(f'*{ext}'))
refs = []
for f in files:
    try:
        text = f.read_text(encoding='utf-8')
    except Exception:
        continue
    for key, pat in patterns.items():
        for m in pat.finditer(text):
            refs.append({'file': str(f), 'line': text.count('\n', 0, m.start()) + 1, 'pattern': key, 'match': m.group(1).strip()})
unique = []
seen = set()
for r in refs:
    key = (r['file'], r['line'], r['pattern'], r['match'])
    if key not in seen:
        unique.append(r)
        seen.add(key)
fs = set(str(p.resolve()).replace('\\', '/') for p in root.rglob('*') if p.is_file())
results = []
for r in unique:
    m = r['match']
    if m.startswith('data:') or m.startswith('http://') or m.startswith('https://') or m.startswith('mailto:') or m.strip() == '':
        status = 'external'
        resolved = m
    else:
        mclean = m.strip().strip('"\'')
        mclean = re.sub(r'[#?].*$', '', mclean)
        if mclean.startswith('/'):
            maybe = (root / mclean.lstrip('/')).resolve()
        else:
            maybe = (root / pathlib.Path(r['file']).parent / mclean).resolve()
        maybe_str = str(maybe).replace('\\', '/')
        status = 'found' if maybe_str in fs else 'missing'
        resolved = maybe_str
    results.append({**r, 'status': status, 'resolved': resolved})
missing = [r for r in results if r['status'] == 'missing']
print(json.dumps({'total': len(results), 'missing': len(missing), 'missing_entries': missing, 'found': len(results) - len(missing)}, indent=2))
