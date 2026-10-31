# Fuentes de los logos de la sección «Más criptos» (/swapped)

Top 10 de stablecoins del artículo de stablewatch.io
«10 best stablecoins you should know in 2026» (por capitalización).

- USDT, USDC, PYUSD: ya estaban en el proyecto (del repo original).
- DAI, USDe, USDD: `@web3icons/core` (MIT), `dist/svgs/tokens/branded/`,
  extraídos del `.svg.js` a SVG plano.
- USDY: `https://icons.stablewatch.io/0xaf37c1167910ebC994e266949387d2c7C326b879-small.webp`
  (webp 64x64, de la plataforma de analítica de stablewatch).
  El push de GitHub solo acepta texto: este webp NO está en el repo.
  Se recupera con `scripts/download-stablewatch-icons.sh` y sí va en el
  despliegue (Vite lo empaqueta en dist).
- USDS, USDG, RLUSD: SIN logo (no hay SVG público en web3icons).
  Placeholder: disco con la inicial, color neutro #555555. No se usa la
  marca de otro token. Si aparece un SVG oficial, se sustituye el disco.
