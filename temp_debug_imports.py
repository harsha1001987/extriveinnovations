import re
from pathlib import Path
p = Path('src/app/page.js')
text = p.read_text(encoding='utf-8')
print('FILE', p)
print('FIRST LINES', text.splitlines()[:10])
pattern = re.compile(r'^(?:import|export)\s+(?:[^\n]*?from\s+)?["\'](\.\.?/[^"\']+)["\']', re.MULTILINE)
print('PATTERN', pattern.pattern)
print('MATCHES')
for m in pattern.finditer(text):
    print(m.group(1))
