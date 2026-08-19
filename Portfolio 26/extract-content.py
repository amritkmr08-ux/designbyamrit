import re, html as ihtml, os, sys
from html.parser import HTMLParser

SKIP = {'script','style','svg','noscript'}
BLOCK = {'h1','h2','h3','h4','p','li','dt','dd','figcaption','blockquote','cite','td','th','span','div','a'}

class Md(HTMLParser):
    def __init__(self):
        super().__init__()
        self.out, self.skip, self.buf, self.tag, self.cls = [], 0, [], [], []
    def handle_starttag(self, t, attrs):
        a = dict(attrs)
        if t in SKIP: self.skip += 1; return
        if self.skip: return
        c = a.get('class','')
        if t == 'section':
            self.out.append(('SECTION', a.get('id') or c))
        if t in ('h1','h2','h3','h4','p','li','figcaption','blockquote','cite','dt','dd','td','th'):
            self.flush(); self.tag.append(t); self.cls.append(c)
    def handle_endtag(self, t):
        if t in SKIP: self.skip = max(0, self.skip-1); return
        if self.skip: return
        if self.tag and self.tag[-1] == t:
            self.flush()
    def handle_data(self, d):
        if self.skip: return
        if self.tag: self.buf.append(d)
    def flush(self):
        if not self.tag: return
        t = self.tag.pop(); c = self.cls.pop() if self.cls else ''
        txt = ihtml.unescape(' '.join(''.join(self.buf).split()))
        self.buf = []
        if txt: self.out.append((t, txt, c))

def page_md(path):
    src = open(path, encoding='utf-8').read()
    title = re.search(r'<title>(.*?)</title>', src, re.S)
    desc  = re.search(r'name="description" content="(.*?)"', src, re.S)
    p = Md(); p.feed(src.split('</head>',1)[1] if '</head>' in src else src)
    L = [f'# {os.path.basename(path)}', '']
    if title: L += [f'**Page title:** {ihtml.unescape(title.group(1).strip())}', '']
    if desc:  L += [f'**Meta description:** {ihtml.unescape(desc.group(1).strip())}', '']
    for item in p.out:
        if item[0] == 'SECTION':
            L += ['', f'## [section: {item[1]}]', '']; continue
        t, txt, c = item
        if t == 'h1':  L += ['', f'### {txt}', '']
        elif t == 'h2': L += ['', f'#### {txt}', '']
        elif t in ('h3','h4'): L += ['', f'**{txt}**', '']
        elif t == 'blockquote': L += ['', f'> {txt}', '']
        elif t == 'cite': L += [f'> — {txt}', '']
        elif t == 'figcaption': L += [f'*[caption] {txt}*', '']
        elif t in ('li','dt','dd','td','th'): L += [f'- {txt}']
        else: L += [txt, '']
    return '\n'.join(L)

pages = ['index.html','contract-understanding.html','auto-extraction.html',
         'intent-model.html','airtel-self-serve.html','404.html']
print('\n\n---\n\n'.join(page_md(p) for p in pages if os.path.exists(p)))
