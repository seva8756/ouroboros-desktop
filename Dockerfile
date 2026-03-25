 FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    OUROBOROS_SERVER_PORT=8765 \
    OUROBOROS_SERVER_HOST=0.0.0.0 \
    OUROBOROS_DATA_DIR=/data \
    OUROBOROS_REPO_DIR=/app

WORKDIR /app

RUN apt-get update && \
    apt-get install -y --no-install-recommends git && \
    rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN python -m pip install --upgrade pip && \
    pip install -r requirements.txt

COPY . .

# Backward-compatible repo path for components that still expect ~/Ouroboros/repo.
# Keep real working repo in /app and expose it via legacy path.
RUN mkdir -p /root/Ouroboros && ln -sfn /app /root/Ouroboros/repo

EXPOSE 8765

VOLUME ["/data"]

CMD ["python", "server.py"]
