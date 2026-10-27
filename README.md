# peetoo · App P2P

La app P2P de peetoo, construida con el sistema de diseño Crypto DS. Sin
homepage: al entrar caes directo en el mercado Crypto.

## Referencia (importante)

Esta app reconstruye el mercado `/p2p/crypto/` del repo original de peetoo
(tabla densa de ofertas, barra de filtros, modal de compra) con el lenguaje
visual del Crypto DS. NO usa los flujos P2P de Cueva: esos flujos se
eliminaron del sistema de diseño el 2026-10-26 para no confundirlos con el
producto real. Aquí no hay menú lateral: hay tablas, filtros y un modal.

## Qué incluye (v2)

- Mercado Crypto: título, barra de filtros (Comprar/Vender, cantidad,
  red + moneda crypto unidas en un CascadeField (primero la red, segundo
  las monedas de esa red), método + moneda de venta unidos en otro
  CascadeField, eliminar filtros) con la misma lógica de
  filtrado del original; las opciones del segundo campo dependen del
  primero (redes por moneda, monedas por método).
- Tabla densa en escritorio (Das/Recibes, Disponible/Min-Max, Precio, Red
  blockchain, Anunciante, acción) y tarjetas en móvil.
- Paginación de 6 por página con resumen «Mostrando X - Y de Z items».
- Modal de compra/venta: resumen de la orden, monto con precio unitario y
  límites, selector de blockchain y confirmación (demo).
- Toggle claro/oscuro. Sin router: la navegación es por estado interno.

## Datos de muestra

Todo lo que ves son **datos de solo muestra**: las 10 ofertas crypto del
repo original, sin carteras ni datos personales (los anunciantes son
ficticios). No hay login real, ni transacciones reales, ni conexión con
Supabase u OpenFort en esta versión.

## Stack

React 19 + Vite 8.

## Sistema de diseño

Los componentes del Crypto DS están vendorizados en `src/ds/` (snapshot de
`crypto-design-system` v1.11, sin la carpeta de flujos). La fuente de verdad
del DS sigue siendo el proyecto `crypto-design-system`; para actualizar el
snapshot, volver a copiar su `src/` aquí excluyendo `*.stories.jsx`,
`App.jsx`, `main.jsx` y los SVG de plantilla sin uso en `assets/`.
OJO: `src/ds/components/CascadeField/CascadeField.jsx` lleva un FIX LOCAL
(el panel también se abre con `onClick`, no solo con `onFocus`, porque tras
elegir una opción el input conserva el foco y el panel no reabría) que un
snapshot fresco sobrescribiría: hay que subir ese fix al DS primero.

## Desarrollo

```bash
npm install
npm run dev      # desarrollo
npm run build    # build de producción en dist/
```

## Despliegue

Proyecto Pages `peetoo`, con el mismo build en dos sitios:

- Producción: `https://peetoo.pages.dev` (rama `main`).
- Preview de la rama `app`: `https://app.peetoo.pages.dev` (mismo build).

```bash
npx wrangler pages deploy dist --project-name peetoo --branch main --commit-dirty=true
npx wrangler pages deploy dist --project-name peetoo --branch app --commit-dirty=true
```
