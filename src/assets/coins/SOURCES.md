# Fuentes de los logos de la sección «Más criptos» (/swapped)

Top 20 por TVL de la plataforma de analítica de stablewatch.io
(/analytics, orden descendente a 2026-10-31): sUSDS, USDY, USYC, BUIDL,
sUSDe, syrupUSDC, USTB, sUSDai, syrupUSDG, OUSG, syrupUSDT, M, sGHO,
USCC, sDAI, wsrUSD, savUSD, sUSDa, mTBILL, fxSAVE.

- 16 SVG color de la home de stablewatch
  (`https://www.stablewatch.io/landing/grid/color/<token>.svg`,
  72x72): sUSDS, USDY, USYC, sUSDe, syrupUSDC, USTB, sUSDai, OUSG,
  syrupUSDT, sGHO, USCC, sDAI, wsrUSD, sUSDa, mTBILL, fxSAVE.
  Están en el repo (texto).
- 4 webp de `https://icons.stablewatch.io/<id>-small.webp` (64x64,
  sin SVG en la home): BUIDL, syrupUSDG, M, savUSD.
  El push de GitHub solo acepta texto: estos webp NO están en el repo.
  Se recuperan con `scripts/download-stablewatch-icons.sh` y sí van en
  el despliegue (Vite los empaqueta en dist o como data URI).

Archivos huérfanos de la versión anterior (#88, ya sin uso, no se
empaquetan): `dai.svg`, `usde.svg`, `usdd.svg` y `usdy.webp` (raíz de
coins/). Se dejan en su sitio; no afectan a la build.
