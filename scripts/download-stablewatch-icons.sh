#!/bin/sh
# Recupera los logos binarios que el push de GitHub no admite (ver SOURCES.md).
# Uso: sh scripts/download-stablewatch-icons.sh (desde la raíz del proyecto)
# OJO: el CDN rechaza User-Agents genéricos (403 con urllib); usar curl.
set -eu
cd "$(dirname "$0")/.."
mkdir -p src/assets/coins/stablewatch
curl -sL -o src/assets/coins/stablewatch/buidl.webp "https://icons.stablewatch.io/0x7712c34205737192402172409a8f7ccef8aa2aec-small.webp"
curl -sL -o src/assets/coins/stablewatch/syrupusdg.webp "https://icons.stablewatch.io/0x87b65C4aAFFA76881f9E96F3e7ED945ddFC3Cd7A-small.webp"
curl -sL -o src/assets/coins/stablewatch/m.webp "https://icons.stablewatch.io/0x866A2BF4E572CbcF37D5071A7a58503Bfb36be1b-small.webp"
curl -sL -o src/assets/coins/stablewatch/savusd.webp "https://icons.stablewatch.io/0x06d47F3fb376649c3A9Dafe069B3D6E35572219E-small.webp"
echo "4 webp de stablewatch recuperados"
