# peetoo · App P2P

La app P2P de peetoo, construida con el sistema de diseño Crypto DS. Sin
homepage: al entrar caes directo en el mercado Crypto. El header tiene
un menú Swapped con dos tarjetas (Comprar / Vender), como el menú
Productos de swapped.com (panel de 1100px, tarjetas con padding 24,
título 18 y descripción 16, medidos de ese menú); las tarjetas llevan
a `/swapped`, una sola página con un toggle Comprar/Vender y el
contenido completo de las páginas de comprar/vender de Swapped tal
cual (USDC, a petición suya «por ahora»): hero con chip USDC, título
60/70 y descripción, widget real (382×500, moneda USDC) o aviso de
ventas desactivadas (382×500 con degradado violeta), 3 pasos con
visual 215×171, métodos como tarjetas 156×100 en 4 columnas, bloque
editorial sobre USDC (columna 635: intro + 6 secciones), tarjeta de
estadísticas de mercado (670, celdas 297×92), tarjetas de precio y
recursos, preguntas frecuentes (acordeón, primera abierta) y rejilla
de 32 criptos (tarjetas 330×60). El layout está medido de esas
páginas a 1440 (contenido 1072: texto 670 + 20 + widget 382; huecos
entre secciones 40). Sin copiar logos ni ilustraciones de marca: los
visuales de los pasos son mini-mockups propios en SVG (widget de
compra, lista de monedas, métodos de pago, envío, billetera y banco
con check), los métodos son tarjetas solo con el nombre y las criptos
llevan un disco de color con la inicial. El fondo de /swapped es #101010
con el resplandor violeta de la página de Swapped bajo el widget (div
775×276 con ::before #4608e3 extendido 225px y difuminado por
máscara de 4 degradados; el elipse de PageBackground del resto de la
app sigue apagado aquí). El resplandor queda fijo detrás del widget
al desplazar (sticky en el área del widget, siempre 76px bajo su
borde), igual que el widget o el aviso (sticky bajo el header)
durante toda la columna izquierda.
El header
y el footer son los de peetoo, no los
corporativos de Swapped; las cifras de mercado son la foto del
2026-10-29 (el precio en vivo cambia). Los menús del mercado desde
esa vista vuelven al mercado con su filtro.

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
  primero (redes por moneda, monedas por método). Entre los dos
  CascadeFields, un botón de intercambio (50×50, icono de flechas) que
  invierte el orden de los campos y con ello la moneda en la que se
  busca la cantidad: por defecto [crypto, fiat] y la cantidad se busca
  en fiat (rango mín-máx); intercambiados [fiat, crypto] y la cantidad
  se busca en crypto (convertida por el precio de cada oferta). Los
  los labels siguen al toggle: el de la izquierda es el valor del
  toggle (Comprar o Vender) y el de la derecha el contrario; el
  intercambio NO cambia los labels, solo los pares. La dirección
  EFECTIVA de los resultados también se invierte (lo que se compraba
  pasa a venderse y viceversa), así que los resultados cambian de
  ofertas de compra a ofertas de venta, PERO el toggle Comprar/Vender
  NO se toca con el intercambio: su estado queda intacto (el lado
  efectivo es el contrario del toggle solo mientras los campos están
  intercambiados). Las selecciones del menú y Eliminar filtros
  restauran el orden por defecto, así el lado efectivo vuelve a ser el
  del toggle. Ningún valor cambia.
- Tabla densa en escritorio (Das/Recibes, Disponible/Min-Max, Precio, Red
  blockchain, Anunciante, acción) y tarjetas en móvil.
- Paginación de 6 por página con resumen «Mostrando X - Y de Z items».
- Modal de compra/venta: resumen de la orden, monto con precio unitario y
  límites, selector de blockchain y confirmación (demo).
- Toggle claro/oscuro. Sin router: la navegación es por estado interno.

## Datos de muestra

Todo lo que ves son **datos de solo muestra**: 84 ofertas demo, una por
cada par crypto×fiat (7 cryptos × 6 fiats) en compra y en venta, con los
métodos de pago y las redes rotados para que cada método aparezca con
cada fiat y cada red con cada crypto. Los anunciantes son ficticios, sin
carteras ni datos personales, y los precios siguen la convención demo
(~1,0x), no son tasas reales. Etecsa y Clásica no tienen ofertas: sus
pares están pendientes de aclaración. No hay login real, ni transacciones
reales, ni conexión con Supabase u OpenFort en esta versión.

## Stack

React 19 + Vite 8.

## Sistema de diseño

Los componentes del Crypto DS están vendorizados en `src/ds/` (snapshot de
`crypto-design-system` v1.11, sin la carpeta de flujos). La fuente de verdad
del DS sigue siendo el proyecto `crypto-design-system`; para actualizar el
snapshot, volver a copiar su `src/` aquí excluyendo `*.stories.jsx`,
`App.jsx`, `main.jsx` y los SVG de plantilla sin uso en `assets/`.
OJO: `src/ds/components/CascadeField/CascadeField.jsx` lleva dos FIXES LOCALES
(el panel también se abre con `onClick`, no solo con `onFocus`, porque tras
elegir una opción el input conserva el foco y el panel no reabría; y el panel
es `fixed` posicionado por JS, porque el absoluto quedaba recortado por el
overflow-x: auto de la fila de filtros y las opciones caían bajo la tabla)
que un snapshot fresco sobrescribiría: hay que subir esos fixes al DS primero.
Igual `src/ds/components/MenuCoinButton/` lleva una EXTENSIÓN LOCAL (prop
`src` opcional: muestra el logo de la moneda dentro del círculo en vez de
la letra), también pendiente de subir al DS.
Igual `src/ds/components/Pagination/` lleva un CAMBIO LOCAL (la página
actual va en cuadrado con bordes redondeados, `radius-md`, en vez de en
píldora), también pendiente de subir al DS.

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
