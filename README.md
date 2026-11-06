# peetoo · App P2P

La app P2P de peetoo: mercados de compra y venta entre personas, perfiles
de anunciante, retiros con QvaPay y la página de compra con Swapped. Todo
con datos de muestra: no hay login real, ni transacciones reales, ni
conexión con ningún backend.

React 19 + Vite 8. Sin router: la navegación es por estado interno y la
History API (`pushState`), así que cada vista tiene su URL y funciona el
botón de atrás del navegador.

## Rutas

| Ruta | Vista |
| --- | --- |
| `/` | Portada (distinta en `peetoo.pages.dev` y en `app.peetoo.pages.dev`) |
| `/crypto/` | Mercado Crypto |
| `/divisa/` | Mercado Divisa |
| `/crypto/swapped` | Compra con Swapped |
| `/crypto/perfil/:nombre` | Perfil público del anunciante |
| `/crypto/qvapay` | Retiro con QvaPay |
| `/crypto/qvapay/debug` | Página de pruebas del widget de QvaPay (no enlazada) |
| `/crypto/legal` | Legal |
| `/crypto/glosario` | Glosario |
| `/crypto/glosario/:termino` | Término del glosario |

Las URLs viejas (`/swapped`, `/perfil/...`, `/legal`, `/glosario`,
`/qvapay`) redirigen a sus equivalentes bajo `/crypto/`, y
`/crypto/qvapay/efectivo` redirige a `/crypto/qvapay`.

## Header

Logo + interruptor Crypto/Divisa junto a él, menús del centro (Comprar
crypto, Comprar fiat, Swapped), enlace directo a QvaPay, insignia Demo y
botón Login (sin acción por el momento). En móvil (≤720px) el centro se
esconde y hay un cajón con el interruptor, los tres menús, QvaPay y un
bloque de información (Blog, Glosario, Legal, redes de ejemplo).

Los menús son mega-paneles que se abren al pasar el ratón en escritorio y
con acordeón en móvil. Cada selección limpia los filtros y aplica solo lo
suyo. «Comprar crypto» lista las 7 stablecoins por emisor, «Otras
monedas» y «Todas las ofertas»; «Comprar fiat» lista los métodos con su
moneda (efectivo, Zelle, PayPal, Etecsa, Clásica, Qvapay, TropiPay,
Transferencia) y «Todas las fiat». Los submenús llevan además Blog,
Glosario y Legal, y «Seguir» con redes de ejemplo.

El interruptor Crypto/Divisa cambia de mercado limpiando los filtros,
sin tocar el toggle Comprar/Vender. Los menús del centro pertenecen al
mercado Crypto: desde Divisa, elegir una moneda vuelve a `/crypto/`.

## Mercado Crypto

El mercado de stablecoins contra fiat: 7 stablecoins (USDT, USAT, USDC,
EURC, PYUSD, ZLUSD, OUSD) por 5 fiats (CUP, USD, EUR, MXN, CAD), 84
ofertas en total, con una por cada par en compra y en venta (USD
duplicado). Cada oferta tiene un solo método de pago.

Tabla densa en escritorio (Das/Recibes, Disponible/Min-Max, Precio, Red
blockchain, Anunciante, acción) y tarjetas en móvil. Paginación de 6 por
página con «Mostrando X - Y de Z items».

## Mercado Divisa

El mercado de fiat contra fiat: 20 ofertas (10 pares × 2 lados). La
tabla tiene 5 columnas, sin columna de red blockchain: las dos patas son
divisas con método + moneda.

Las tasas parten de las anclas de elTOQUE en CUP (USD 890, EUR 970, CAD
553,30, MXN 52,69), con +1% en compra y −1% en venta. En la celda de
precio van dos píldoras de método, una por línea: la de venta junto al
precio y la de compra junto a «1 {moneda}».

## Filtros e intercambio

La barra lleva, en orden: toggle Comprar/Vender, cantidad, par de la
izquierda, botón de intercambio, par de la derecha, «Más filtros» y
«Ordenar». Cada par es un CascadeField: el primer campo filtra las
opciones del segundo (red → monedas crypto, método → monedas fiat).

El botón de intercambio invierte el orden de los dos pares y con ello la
moneda en la que se busca la cantidad: por defecto [crypto, fiat] y la
cantidad se busca en fiat (rango mín-máx directo); intercambiados
[fiat, crypto] y se busca en crypto (convertida por el precio de cada
oferta). El intercambio no cambia el toggle ni los labels: los labels
siguen al toggle (la izquierda es su valor, la derecha el contrario).
Lo que cambia es el lado efectivo de los resultados, que es el contrario
del toggle mientras los campos están intercambiados. Las selecciones del
menú y «Eliminar filtros» restauran el orden por defecto.

«Más filtros» abre un panel con Ubicación, Ranking, Anunciante y
Depósito, y el restablecido. En móvil es un modal inferior (bottom
sheet) que además recoge Ordenar, red, método y moneda a vender. En
móvil la barra apila: fila 1 toggle + «Más filtros», fila 2 cantidad +
moneda.

## Modal de orden

Al pulsar Comprar o Vender en una fila se abre el detalle de la oferta:
anunciante (con operaciones y valoración), información de la orden
(Límite, Disponible, Método de pago, Finalización promedio y Ubicación
si es en efectivo; en Divisa no hay filas de método ni de blockchains),
el campo de cantidad (se escribe lo que se da y se calcula lo que se
recibe, con la tasa debajo), el selector de red cuando la oferta tiene
más de una, y el botón «Comenzar intercambio». En móvil es un modal
inferior. La validación usa el lado de venta de la oferta.

Junto a «Comenzar intercambio» hay un menú «•••» con Compartir
(WhatsApp, Telegram, Copiar enlace), Copiar detalles, Ver perfil del
anunciante, Guardar/Quitar de favoritos, Denunciar oferta y Bloquear/
Desbloquear anunciante. Compartir usa un enlace profundo
(`/{crypto|divisa}/?oferta={id}`) que abre el modal al cargar.
Favoritos, bloqueados y reportes se guardan en localStorage; bloquear
oculta las ofertas del anunciante en el mercado (el perfil las sigue
mostrando para poder desbloquear).

## Perfil público del anunciante

Ruta `/crypto/perfil/:nombre` para los 5 anunciantes. Lateral en
tarjeta (métodos con su destino, botón de copiar y QR por destino;
Efectivo es pago en persona, sin botones; ubicaciones con mapa y
ciudad; listas de ofertas con «Ver más»; botones Comprar/Vender) y
principal con 6 tarjetas (operaciones, ofertas activas, en compra, en
venta, métodos, redes), medidor radial de reputación, Resumen y
Comparativa frente a la media. Debajo, sus ofertas en la misma lista
del mercado, paginadas de 6 en 6 y ordenadas por precio, sin filtros
del mercado. El modal desde el perfil usa el lado de la oferta misma
y el botón de vuelta dice «Volver al perfil».

ETH, SOL y BTC son las cadenas que el anunciante dejó configuradas en
su perfil (con sus direcciones), independientes de las ofertas: las
ofertas son solo fiat y stablecoins. No hay bio, desde cuándo, rating
aparte, en línea ni datos privados.

## QvaPay

Página de retiro en `/crypto/qvapay`, como la de Swapped (hero + widget
+ 3 pasos + métodos populares). El widget es un asistente en 3 pasos
(Monto, Destinatario, Confirmar) sin indicador de pasos arriba, de
altura fija 500px, con el pie de botones fijo abajo. Todo es demo: no
se envía ningún retiro real.

8 métodos: efectivo, tarjetas CUP/MLC/Clásica/Tropical, Zelle,
transferencia en EE. UU. y SWIFT (mínimos $1–$100). La comisión es la
real de QvaPay y se descuenta del estimado: CUP 10%, MLC 15%, Clásica
2,5%, Tropical 5%, Zelle 1% ($2 fijos hasta $100), transferencias 2%,
efectivo $5 fijos por debajo de $100 más el cargo de zona. El efectivo
se estima por zona (16 provincias, 132 municipios) y el entregado es
múltiplo de $5.

El destinatario es una lista en línea con buscador (título
«Destinatario» centrado arriba, con saeta de volver); el formulario
solo aparece al elegir «Otra persona». Provincia y Municipio son
selects que abren un panel con buscador (el municipio muestra el cargo
de zona y se deshabilita hasta elegir provincia). Los contactos se
crean en peetoo, no en QvaPay.

El botón de volver vive solo arriba: una saeta junto al título en los
pasos 2 y 3 (en el paso 2 de Lista, en su cabecera). El pie no lleva
«Atrás»: paso 1 y 2 solo «Continuar», y el paso 3 «Cancelar» (vuelve
al paso 1 conservando monto y método) + «Retirar $X».

La página de pruebas `/crypto/qvapay/debug` (no enlazada) muestra el
widget en sus tres variantes de selección de destinatario — Lista,
Select y Select + «o» — con un control para cambiar entre ellas; cada
cambio reinicia el widget.

## Swapped

`/crypto/swapped` es la página de compra con Swapped: hero con toggle
Comprar/Vender, widget real de Swapped (USDC) en Comprar y el aviso de
Swapped de ventas desactivadas temporalmente en Vender, porque no
existe widget de venta. Debajo, 3 pasos, métodos populares, contenido
editorial, estadísticas, precio, recursos y preguntas frecuentes.

## Legal y Glosario

Páginas internas con la misma plantilla de contenido. El glosario tiene
16 términos (anunciante, blockchain, billetera, custodia, disponible,
fiat, KYC, método de pago, min-max, MLC, orden, P2P, precio, spread,
stablecoin, tasa informal) con lista filtrable por letra y página por
término. Legal recoge los 5 apartados del sitio.

## Datos de muestra

Todo son datos ficticios: 84 ofertas Crypto y 20 Divisa, 5
anunciantes, precios de elTOQUE con prima en compra y descuento en
venta, límites min/max en fiat. Un solo método por oferta. MLC es el
ticker de USD por Transferencia Bancaria, no una moneda. PayPal no
aplica a CUP. Etecsa solo CUP; Clásica, Qvapay y TropiPay solo USD.
Las cantidades se abrevian con sensatez (1k en vez de 1000) y muestran
el valor exacto al pasar el ratón solo donde abrevian.

## Sistema de diseño

Los componentes del Crypto DS están vendorizados en `src/ds/`
(snapshot del repo `crypto-design-system`). La fuente de verdad del DS
sigue siendo ese proyecto; para actualizar el snapshot, volver a copiar
su `src/` aquí excluyendo `*.stories.jsx`, `App.jsx`, `main.jsx` y los
SVG de plantilla sin uso en `assets/`.

La copia vendorizada lleva fixes locales que un snapshot fresco
sobrescribiría: hay que subirlos al DS primero. Entre ellos, el panel
del CascadeField (se abre también con `onClick`, no solo con `onFocus`,
y es `fixed` posicionado por JS), la prop `src` de MenuCoinButton
(logo de la moneda dentro del círculo) y la página actual de
Pagination en cuadrado con bordes redondeados.

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
