# peetoo · App P2P

La app P2P de peetoo, construida con el sistema de diseño Crypto DS. Sin
homepage: al entrar caes directo en el mercado Crypto. El header tiene
un menú Swapped con dos tarjetas (Comprar / Vender), como el menú
Productos de swapped.com (panel de 1100px, tarjetas con padding 24,
título 18 y descripción 16, medidos de ese menú); las tarjetas llevan
a `/swapped`, una sola página con un toggle Comprar/Vender y el
contenido completo de las páginas de comprar/vender de Swapped tal
cual (USDC, a petición suya «por ahora»): hero con el toggle
Comprar/Vender sobre el título (400px, alineado a la izquierda, en
el lugar del chip USDC — eliminado por redundante: símbolo y nombre
decían lo mismo), título 60/70 y descripción, widget real (382×500,
moneda USDC) o aviso de ventas desactivadas (382×500 con degradado
violeta), 3 pasos con tarjeta 215×316 (visual 215×171 sobre
degradado violeta con grano + bloque de texto fondo blanco 6%,
radio inferior 20, padding 20, alto 145, título 20/700, texto 16/22
#e2e2e2; en venta: You sell USDC / You receive EUR con flecha,
billetera → USDC → depósito y billetera → EUR → banco), métodos
como tarjetas 156×100 en 4 columnas (icono genérico 35px + nombre
14px; lista exacta: Apple Pay, Card, Google Pay, PaySafeCard, Bank
Transfer, Skrill, Rapid Transfer, +24 more), bloque
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
cada par crypto×fiat (7 cryptos × 6 fiats) en compra y en venta, con un
único método de pago por oferta (solo 4: Efectivo, PayPal, Transferencia
Bancaria y Zelle; MLC siempre por Transferencia Bancaria) y las redes
rotadas para que cada red aparezca con cada crypto. Los anunciantes son ficticios, sin
carteras ni datos personales, y los precios siguen la convención demo
(~1,0x), no son tasas reales. Tiles de fiat aclarados: Etecsa es CUP
(ticker CuPetec), Clásica es USD (USDcls), MLC es USD (USDmlc) y
Qvapay es USD (USDqp); los cuatro son solo moneda (sin método) y
muestran las 7 ventas de su moneda. PayPal es método + USD (USDpp,
2 ventas) y método + EUR (EURpp, 2 ventas) con su logo; TropiPay es USD (USDtp, 7 ventas) con su logo
amarillo y azul; Etecsa lleva su logo azul en el tile CuPetec en vez
de la foto CUP. No hay login real, ni transacciones
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

## Barra de filtros (escritorio y móvil)

- Sin botón «Eliminar filtros»: el restablecido vive dentro de «Más filtros».
- «Más filtros» es un botón primario cuadrado (50×50, solo icono) con insignia
  con el número de filtros activos; el botón de intercambio también es primario
  (su icono va en línea para heredar el blanco: un SVG en `<img>` no hereda
  `currentColor` y se veía negro).
- Ordenar en la barra (esquina derecha, opciones cortas: «Precio ↑»…); sin
  desplazamiento horizontal a 1440 y 1280.
- En móvil (≤720px) la barra apila sin desplazar: fila 1 toggle + «Más filtros»,
  fila 2 cantidad + la moneda que se compra. Red, método, moneda a vender,
  ordenar y los filtros ocultos (ubicación, ranking, anunciante, depósito)
  viven en «Más filtros», que en móvil es un modal inferior (bottom sheet)
  con fondo oscuro, agarre, cruz arriba y pie fijo con Aplicar y Restablecer.
  Aplicar cierra el modal (los filtros se aplican al cambiarlos).
- La ubicación es un dato derivado del id de la oferta (no existe en los datos
  ni sale en la tabla): 6 ubicaciones ficticias, 7 compras + 7 ventas cada una.

## Lista de ofertas: un solo elemento

- La lista ya no se dibuja dos veces (tabla en escritorio + tarjetas en móvil):
  es una sola estructura (`.offer-list` con `.offer-row` y `.offer-cell`).
- En escritorio se comporta como tabla (`display: table`: mismo algoritmo de
  columnas y mismo aspecto que la tabla anterior); los roles ARIA
  (`table`/`row`/`cell`/`columnheader`) conservan la semántica de tabla.
- En móvil (≤768px) cada fila es una tarjeta por rejilla (`grid-template-areas`):
  fila 1 par + usuario, fila 2 disponible/min-max, fila 3 redes, fila 4 precio
  en línea con el botón. El cabecero se oculta.
- La tabla `<table>` y las tarjetas `.cards` anteriores se eliminaron; no queda
  ningún resto en App.jsx ni en index.css.

## Modal de orden (adoptado de la prueba del modal, 2026-10-30)

- En móvil (≤768px) el detalle de la orden es un modal inferior (bottom
  sheet: ancho completo, agarre, 85vh máx.); en escritorio sigue centrado.
- La información de la orden usa el MetadataList del DS (Límite, Disponible,
  Métodos de pago, Blockchains) dentro de una caja con borde; el título va en
  su propia barra con fondo encima, y la tabla pasa por encima (z-index) con
  solape 24px tapando el borde inferior del título (mayor que el radio 16 de
  las esquinas); la tabla lleva el mismo fondo que el modal; 24px sobre el
  título y 24px bajo la tabla hasta la nota legal.
- El campo de cantidad ES el SwapPair: se escribe lo que se da (Das) y se
  calcula lo que se recibe (Recibes) con el precio; la validación usa el lado
  de venta de la oferta. La línea de tasa va bajo el swap; el bloque de ayudas
  antiguo (precio unitario + límite) se eliminó por duplicado.
- Las píldoras del SwapPair muestran la imagen de la moneda cuando existe
  (si no, la letra) y no llevan flecha cuando no son desplegables.
  La pata fiat (par de la fila y píldoras del modal) es método + moneda:
  si la combinación tiene tile propio en Comprar fiat, muestra su imagen
  y su ticker (USDpp, USDzl, CuPdc...); si no, la foto y el código de
  la moneda. Las cantidades y la tasa siguen en código de moneda.
- El campo Das muestra estado de error (borde rojo) cuando el monto escrito
  no es válido.
- Divergencias vendorizadas pendientes de posible port al DS (solo en la
  copia de peetoo-app, no en el DS): el bloque de sheet del Modal, el port
  del MetadataList, la imagen/flecha/error del SwapPair, y el efecto de foco
  del Modal (el foco solo se mueve al panel al abrir; antes cada render lo
  devolvía al panel y el teclado móvil se cerraba a cada tecla).

## Perfil público del anunciante

- Ruta `/perfil/:nombre` (p. ej. `/perfil/criptoblue`), vista de la app
  como /swapped: mantiene header y footer, entrada directa y navegación
  por historial; las celdas de anunciante (tabla y modal) enlazan a ella.
- Estructura como la referencia de perfil de candidato, con contenido
  P2P y estilos del Crypto DS (no sus colores ni su contenido): columna
  lateral + columna principal + tabla debajo a ancho completo.
- Lateral (tarjeta): franja violeta + avatar 80 con anillo de
  reputación (% completado), nombre e insignia de verificado/Premium;
  métodos de pago con su destino (a dónde pagar), botón de copiar y QR
  por destino (el QR sale en un modal, con fondo blanco; Efectivo no
  lleva botones), incluidos los métodos web3 ETH, SOL y BTC (direcciones
  ficticias por anunciante; son datos del perfil, no de las ofertas, y
  no tocan los filtros del mercado),
  disponibilidad (Presencial / En línea),
  ubicaciones en tarjetas con scroll horizontal (mapa + ciudad +
  punto exacto/zona aproximada), listas de ofertas por moneda y por
  fiat (3 + «Ver más») y botones Comprar/Vender que bajan a las
  ofertas.
- Principal: 6 tarjetas (operaciones, ofertas activas, en compra, en
  venta, métodos, redes); medidor radial de reputación (% completado,
  arco de 270°); tarjeta Resumen (verificado/Premium, ofertas, ciudades)
  y Comparativa (su % frente a la media de los demás anunciantes).
- Sus ofertas en la misma lista unificada del mercado (misma fila y mismo
  modal), paginada de 6 en 6 y ordenada por precio, sin filtros del
  mercado: el precio no hereda la cantidad del mercado ni la red
  filtrada.
- El modal desde el perfil usa el lado de la oferta misma (`orderSide`),
  no el toggle del mercado: una oferta de venta abre como venta aunque
  el mercado estuviera en compra. El botón de vuelta dice «Volver al
  perfil» en vez de «Volver al mercado».
- Sin datos privados ni inventados: no hay bio, desde cuándo, rating
  aparte, en línea, métodos con datos, direcciones ni historial; como en
  el perfil ajeno del repo original, solo perfil + ofertas.

## Ubicaciones y detalles de pago

- `PAYMENT_DETAILS` en `src/data/offers.js`: un detalle ficticio de
  muestra por anunciante y método (correos, Revtag, bancos con cuenta
  completa sin enmascarar — el que ve el perfil debe saber a dónde
  pagar —; 'Efectivo' es siempre pago en persona), igual en todas
  sus ofertas. El perfil muestra cada método con su destino en el
  bloque «Métodos de pago» de la lateral.
- Modal: la fila «Método de pago» nombra el método, sin detalle; si el
  método es Efectivo aparece «Ubicación:» con la ciudad derivada de la
  oferta (la misma del filtro Ubicación). Sin Efectivo no hay fila de
  ubicación.
- Perfil: «Ubicaciones» con tarjetas de sus ciudades en efectivo con
  scroll horizontal (sin bloque si no tiene ninguna).
- La tabla no cambia: ahí siguen solo los nombres de los métodos.

## Mockup de mapa (sin stack de mapas todavía)

- Imágenes estáticas en `src/assets/maps/`: `map-pin.svg` (punto
  exacto) y `map-zone.svg` (zona aproximada con círculo discontinuo).
  El dibujo es genérico; la ciudad va en el pie de cada mapa.
- `LOCATION_PRECISION` en `src/data/offers.js`: precisión por
  anunciante (`exact` para criptoblue y habana_p2p, `city` para el
  resto). Nunca se dibuja un pin exacto para quien solo compartió la
  ciudad; por defecto (sin entrada) se muestra zona.
- Modal: el mockup va bajo la información de la orden, solo en ofertas
  en Efectivo. Perfil: un mockup por cada ciudad presencial (rejilla
  de 2 columnas, 1 en móvil).

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
