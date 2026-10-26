# peetoo · App P2P

La app P2P de peetoo, construida con el sistema de diseño Crypto DS. Sin
homepage: al entrar caes directo en el mercado.

## Qué incluye

- Mercado P2P (comprar / vender) con tabla densa de ofertas.
- Tomar orden → sala de orden (espera → pago / venta) → éxito → calificar.
- Mis anuncios: crear anuncio → revisar y publicar → detalle.
- Botón «🧪 Probar flujos» (abajo a la izquierda) para saltar directo a cada
  pantalla, y toggle claro/oscuro (abajo a la derecha).

Saltos directos por hash: `/#mercado`, `/#mercado-vender`, `/#login`,
`/#tomar-orden`, `/#sala-espera`, `/#sala-pago`, `/#sala-venta`, `/#exito`,
`/#calificar`, `/#mis-anuncios`, `/#crear`, `/#revisar`, `/#detalle`.

## Datos de muestra

Todo lo que ves son **datos de solo muestra**: no hay login real, ni
transacciones reales, ni conexión con Supabase u OpenFort en esta versión.
Las ofertas de ejemplo vienen de las composiciones de flujos del Crypto DS
(reconstruidas a partir de los videos de Cueva). Nada de lo mostrado es una
operación real ni usa datos personales reales.

## Stack

React 19 + Vite 8. Sin router: la navegación es por estado interno y los
saltos directos usan el hash de la URL.

## Sistema de diseño

Los componentes del Crypto DS están vendorizados en `src/ds/` (snapshot de
`crypto-design-system` v1.11 + prop opcional `brand` en el Sidebar de los
flujos, para que el logo diga «peetoo»). La fuente de verdad del DS sigue
siendo el proyecto `crypto-design-system`; para actualizar el snapshot,
volver a copiar su `src/` aquí excluyendo `*.stories.jsx`, `App.jsx`,
`main.jsx` y los SVG de plantilla sin uso en `assets/`.

## Desarrollo

```bash
npm install
npm run dev      # desarrollo
npm run build    # build de producción en dist/
```

## Despliegue

Solo en la rama `app` del proyecto Pages `peetoo` (subdominio
`app.peetoo.pages.dev`). La producción `peetoo.pages.dev` NO se toca.

```bash
npx wrangler pages deploy dist --project-name peetoo --branch app --commit-dirty=true
```
