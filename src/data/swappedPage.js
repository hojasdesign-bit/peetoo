// Contenido de la página /swapped tal cual está en swapped.com/es/buy/usdc
// (extraído en vivo el 2026-10-29). Los métodos no llevan logos de marca.
// La sección «Más criptos» ya no usa la lista original de swapped.com:
// desde 2026-10-31 lleva el top 10 de stablecoins del artículo de
// stablewatch.io «10 best stablecoins you should know in 2026» (por
// capitalización), con el logo real donde existe (USDT/USDC/PYUSD ya en
// el proyecto, DAI/USDe/USDD de web3icons, USDY de icons.stablewatch.io)
// y disco con la inicial como placeholder para USDS/USD G/RLUSD (sin SVG
// público en web3icons; no se usa la marca de otro token).
import usdtLogo from '../assets/coins/usdt.svg';
import usdcLogo from '../assets/coins/usdc.svg';
import pyusdLogo from '../assets/coins/pyusd.svg';
import daiLogo from '../assets/coins/dai.svg';
import usdeLogo from '../assets/coins/usde.svg';
import usddLogo from '../assets/coins/usdd.svg';
import usdyLogo from '../assets/coins/usdy.webp';

export const SWAPPED_EDITORIAL_INTRO = 'En los mercados de criptomonedas, donde los precios cambian drásticamente en cuestión de minutos, necesitas un refugio seguro para proteger el valor de tus activos. Por eso existen las stablecoins para salvarte. USDC destaca especialmente—es el resultado de la colaboración entre Circle y Coinbase. Se ha convertido en la base de DeFi en todas las blockchains.';

export const SWAPPED_EDITORIAL = [
  {
    heading: '¿Qué es USDC?',
    paras: [
      'USDC es un tipo de criptomoneda conocida como stablecoin. ¿Su propósito? Mantener una relación 1:1 con el dólar estadounidense. Es diferente a muchas criptomonedas que puedes conocer, como Bitcoin o Ethereum. Su valor no cambia, lo que la hace ideal para ahorros y también como protección contra la volatilidad del mercado.',
      '¿Qué la hace diferente? Su fuerte énfasis en el cumplimiento regulatorio. USDC se percibe como la stablecoin más regulada, lo que la convierte en la opción preferida de grandes inversores e instituciones. USDC está completamente respaldada por dólares estadounidenses y sus equivalentes, como bonos del Tesoro. Esto significa que por cada unidad de stablecoin, hay un billete de dólar guardado en custodia.',
    ],
  },
  {
    heading: '¿Por qué usar USDC?',
    paras: [
      'La principal ventaja de USDC es su estabilidad. Comparada con otras monedas, no fluctúa y ofrece un refugio seguro durante las caídas del mercado.',
      'USDC está disponible en múltiples blockchains, ya sea como versión oficial o conectada por puentes, lo que ofrece fácil acceso sin importar la red. Dependiendo de la blockchain, las transacciones de USDC pueden ser baratas y rápidas o caras y lentas, así que elige sabiamente. USDC está fuertemente integrada en casi todos los protocolos DeFi que puedas nombrar, lo que la hace perfecta para cualquier tipo de interacción—desde préstamos hasta trading. Debido a su estabilidad, los pagos y transacciones diarias son donde USDC también puede usarse.',
    ],
  },
  {
    heading: 'Cómo funciona USDC',
    paras: [
      'USDC aprovecha la tecnología blockchain para la transparencia mientras moderniza el dólar estadounidense y crea una versión digital mejorada. El uso de blockchain permite la integración de USDC en diferentes dApps.',
      'El proceso de emisión y redención es muy sencillo. Una parte deposita una porción de sus reservas de efectivo con una institución financiera regulada, y una vez que se verifica el depósito, se emite una cantidad correspondiente a la dirección de wallet del usuario. De manera similar, la redención sigue pasos similares, durante los cuales los tokens USDC se queman y se hace una transferencia bancaria.',
      'Gracias a ser una entidad regulada, se realizan auditorías regulares de terceros para verificar las reservas de USDC. Además, la información sobre las reservas está disponible al público con varios informes. También puedes encontrar en la web el valor de los bonos gubernamentales de Circle mantenidos con BlackRock.',
    ],
  },
  {
    heading: 'Historia de USDC',
    paras: [
      'USDC fue lanzada por Circle y Coinbase en 2018. En 2019 apareció por primera vez en Ethereum y luego se expandió a múltiples redes. En 2020 se integró con múltiples exchanges de crypto y plataformas DeFi para facilitar el acceso y aumentar la liquidez. En 2021, USDC se hizo disponible en Solana y se asoció con Visa. Desde entonces se ha integrado en múltiples procesadores de pago, creciendo significativamente en capitalización de mercado, y cooperando con reguladores para obtener licencias y hacerla lo más compatible posible.',
    ],
  },
  {
    heading: 'Los riesgos de Bitcoin',
    paras: [
      'USDC depende de Circle y Coinbase para mantener una proporción adecuada de reservas. Aunque estas son instituciones fuertemente reguladas, cualquier mala gestión o brecha de seguridad podría paralizar el token y potencialmente colapsarlo. Obviamente existe riesgo regulatorio, al cual USDC también está sujeta pero en menor medida debido a sus vínculos con el sistema bancario.',
      'La tecnología blockchain no está completamente investigada, y pueden ocurrir vulnerabilidades en los smart contracts. USDC, sin embargo, está preparada para esta posibilidad con la gama de redes que soporta, diversificando así el riesgo.',
      'Los competidores nunca duermen y harán cualquier cosa para aumentar su cuota de mercado. Si USDC quiere mantenerse en el liderazgo, necesita ser vista como la mejor por el público general y mantenerse por delante de la competencia ofreciendo mejores ofertas, utilizando estrategias de marketing, o trabajando estrechamente con instituciones financieras.',
    ],
  },
  {
    heading: 'Por qué USDC es importante',
    paras: [
      'USDC ha abierto la puerta a una mayor liquidez en el mercado crypto así como a su transparencia. Al trabajar estrechamente con las autoridades regulatorias, comenzó a ser percibida como la más segura y confiable. Mientras el mercado crypto continúa madurando, observaremos si USDC se mantiene o si otra stablecoin, quizás nueva, toma su lugar.',
    ],
  },
];

// Foto del momento de la extracción (2026-10-29): el precio en vivo cambia.
export const SWAPPED_STATS = {
  intro: 'USDC tiene un precio de 0.8956 EUR ahora mismo, subió 0.02% en las últimas 24 horas, con un volumen de trading de 12.00B EUR. Como la #6ª criptomoneda más grande por capitalización de mercado, la valoración total de USDC es de 63.80B EUR (2.61% de dominancia), basada en un suministro circulante de 71.23B.',
  cells: [
    { label: 'Precio', value: '0.8956 EUR' },
    { label: 'Capitalización de mercado', value: '63.80B EUR' },
    { label: 'Volumen (24h)', value: '12.00B EUR' },
    { label: 'Circulación', value: '71.23B' },
  ],
};

export const SWAPPED_PRECIO_TEXT = 'Consulta el precio actual de USDC, gráficos detallados y estadísticas clave del mercado. Mantente actualizado con datos en tiempo real para seguir el rendimiento de USDC y las tendencias del mercado.';

export const SWAPPED_RESOURCES_TEXT = 'Access relevant resources such as USDC’s website or whitepaper to help you better understand its purpose and shed some light on the future of the project.';

export const SWAPPED_RESOURCES_LINKS = [
  { label: 'Sitio web', href: 'https://www.circle.com/en/usdc' },
  { label: 'Whitepaper', href: 'https://www.circle.com/legal/mica-usdc-whitepaper' },
];

export const SWAPPED_FAQS = [
  {
    q: '¿Por qué debería comprar USDC (USDC)?',
    a: 'Decidir si comprar USDC es una decisión personal, y es importante entender que invertir en cualquier criptomoneda conlleva riesgos. Muchas personas consideran factores como el precio de USDC, su capitalización de mercado y suministro, junto con su propia tolerancia al riesgo, antes de tomar una decisión. Swapped.com no puede proporcionar consejos de inversión ni garantizar el valor de ninguna criptomoneda. Siempre investiga por tu cuenta antes de realizar cualquier compra para asegurarte de que se alinee con tus objetivos financieros.',
  },
  {
    q: '¿Cómo puedo comprar USDC con tarjeta de crédito?',
    a: 'Swapped.com acepta las principales tarjetas de crédito y débito, incluyendo VISA y MasterCard. Para comprar USDC, simplemente ingresa la cantidad que deseas comprar en USDC o en tu moneda local, y luego proporciona la dirección de tu wallet de USDC. Una vez hecho esto, estarás listo para comprar USDC con tu tarjeta o método de pago preferido, ¡todo de forma segura y conveniente!',
  },
  {
    q: '¿Puedo comprar USDC hoy y vender mañana?',
    a: '¡Por supuesto! Puedes comprar USDC hoy y venderlo cuando estés listo. Swapped.com ofrece un proceso sencillo para comprar USDC y convertirlo de vuelta a monedas tradicionales como USD o EUR. Al vender, el precio se fija después de que tu transacción tenga 1 confirmación en la blockchain. Esto normalmente no toma más de 30 minutos.',
  },
];

export const SWAPPED_MORE_CRYPTOS = [
  { name: 'Tether', ticker: 'USDT', logo: usdtLogo },
  { name: 'USD Coin', ticker: 'USDC', logo: usdcLogo },
  { name: 'Sky Dollar', ticker: 'USDS', color: '#555555' },
  { name: 'Dai', ticker: 'DAI', logo: daiLogo },
  { name: 'Ethena USDe', ticker: 'USDe', logo: usdeLogo },
  { name: 'PayPal USD', ticker: 'PYUSD', logo: pyusdLogo },
  { name: 'Global Dollar', ticker: 'USDG', color: '#555555' },
  { name: 'Ripple USD', ticker: 'RLUSD', color: '#555555' },
  { name: 'USDD', ticker: 'USDD', logo: usddLogo },
  { name: 'Ondo USDY', ticker: 'USDY', logo: usdyLogo },
];

export const SWAPPED_METHODS = ['Apple Pay', 'Card', 'Google Pay', 'PaySafeCard', 'Bank Transfer', 'Skrill', 'Rapid Transfer', '+24 more'];
