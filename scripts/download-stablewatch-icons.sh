#!/bin/sh
# Recupera los logos binarios que el push de GitHub no admite (ver SOURCES.md).
# Uso: sh scripts/download-stablewatch-icons.sh (desde la raíz del proyecto)
set -eu
cd "$(dirname "$0")/.."
mkdir -p src/assets/coins
curl -sL -o src/assets/coins/usdy.webp "https://icons.stablewatch.io/0xaf37c1167910ebC994e266949387d2c7C326b879-small.webp"
echo "usdy.webp recuperado"
