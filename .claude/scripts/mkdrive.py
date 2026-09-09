import re, sys
from premailer import transform

src, out, titulo = sys.argv[1], sys.argv[2], sys.argv[3]
html = open(src, encoding="utf-8").read()

style = re.search(r"<style>(.*?)</style>", html, re.S).group(1)
body  = re.sub(r"<style>.*?</style>", "", html, flags=re.S)
body  = re.sub(r"<link[^>]*>", "", body)
body  = re.sub(r"<title>.*?</title>", "", body, flags=re.S)

# 1. resolve as variáveis do tema claro e descarta os blocos escuros
root = re.search(r":root\{(.*?)\}", style, re.S).group(1)
vars_ = dict(re.findall(r"(--[\w-]+)\s*:\s*([^;]+);", root))
style = re.sub(r"@media[^{]*\{(?:[^{}]*\{[^{}]*\})*[^{}]*\}", "", style, flags=re.S)
style = re.sub(r":root\[data-theme=\"dark\"\]\{.*?\}\s*(?=\n\s*\*)", "", style, flags=re.S)
for _ in range(3):
    style = re.sub(r"var\((--[\w-]+)\)", lambda m: vars_.get(m.group(1), "inherit").strip(), style)

doc = f"<html><head><meta charset='utf-8'><title>{titulo}</title><style>{style}</style></head><body>{body}</body></html>"
inlined = transform(doc, remove_classes=True, keep_style_tags=False, disable_validation=True)
open(out, "w", encoding="utf-8").write(inlined)
print(out, len(inlined) // 1024, "KB")
