import os
import re
from pathlib import Path

root = Path('src')
files = [p for p in root.rglob('*') if p.suffix in {'.js', '.jsx', '.ts', '.tsx'}]

# Parse local imports only (relative paths) and build graph
graph = {}
for p in files:
    text = p.read_text(encoding='utf-8', errors='ignore')
    imports = re.findall(r'^(?:import|export)\s+(?:[^\n]*?from\s+)?["\'](\.\.?/[^"\']+)["\']', text, flags=re.MULTILINE)
    resolved_path = str(p.resolve())
    graph[resolved_path] = []
    for imp in imports:
        target = (p.parent / imp).resolve()
        if target.exists() and target.is_file():
            graph[resolved_path].append(str(target))
            continue
        for suf in ['.js', '.jsx', '.ts', '.tsx', '/index.js', '/index.jsx', '/index.ts', '/index.tsx']:
            candidate = Path(str(target) + suf)
            if candidate.exists() and candidate.is_file():
                graph[resolved_path].append(str(candidate))
                break

roots = [
    'src/app/layout.js',
    'src/app/page.js',
    'src/app/contact/page.js',
    'src/app/ProductsPage/page.js',
    'src/app/roi-calculator/page.js',
    'src/app/products/[slug]/page.js',
    'src/app/sitemap.js',
    'src/app/robots.js',
]

reachable = set()
stack = [str(Path(r).resolve()) for r in roots if Path(r).exists()]
while stack:
    cur = stack.pop()
    if cur in reachable:
        continue
    reachable.add(cur)
    for nxt in graph.get(cur, []):
        stack.append(nxt)

unused = sorted(str(p.resolve()) for p in files if str(p.resolve()) not in reachable and not str(p).startswith('src/app/api'))

print('REACHABLE FILES:')
for p in sorted(reachable):
    print(p)
print('\nUNUSED FILES:')
for p in unused:
    print(p)
print('\nTOTAL UNUSED:', len(unused))
