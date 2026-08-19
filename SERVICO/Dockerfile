# Estúdio Expansion — render + portal de aprovação
#
# A imagem oficial do Playwright já traz o Chromium e as bibliotecas de sistema
# que ele precisa. Montar isso à mão sobre uma imagem slim é onde se perde meio
# dia e se descobre a falta de libnss3 em produção.
FROM mcr.microsoft.com/playwright/python:v1.47.0-jammy

WORKDIR /app

# As fontes entram na imagem, não em runtime: baixar fonte na hora do render é
# exatamente como o PNG sai com fallback sem ninguém perceber.
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY .claude/skills/carrossel-viral/scripts ./.claude/skills/carrossel-viral/scripts
COPY SERVICO ./SERVICO

ENV PYTHONUNBUFFERED=1
EXPOSE 8080
CMD ["python3", "SERVICO/app.py", "8080"]
