/**
 * Ofertas de muestra del mercado Divisa de peetoo: fiat contra fiat.
 * Las dos patas son divisas con su método (método + moneda, como los
 * tiles de Comprar fiat); NO hay blockchains (blockchains: []), por
 * eso la tabla de Divisa no tiene columna de red ni filtro de red.
 * Tasas derivadas de las anclas elTOQUE del 1 nov 2026 ya usadas en
 * offers.js (USD 890, EUR 970, CAD 553.30, MXN 52.69 CUP): precio =
 * ancla(compra)/ancla(venta), +1% en compra y -1% en venta, como en
 * Crypto. 10 pares canónicos x 2 lados = 20 ofertas, mismos 5
 * anunciantes ficticios que en Crypto. Métodos por moneda con las
 * mismas restricciones que en Crypto (Etecsa solo CUP; Clásica,
 * Qvapay y TropiPay solo USD; PayPal nunca CUP). Datos de muestra,
 * no tasas en vivo. No se mezclan con el perfil: el perfil usa solo
 * OFFERS (Crypto).
 * Campos: id, side, advertiser_*, buy_currency, sell_currency,
 * buy_method, sell_method, price, available, min_amount,
 * max_amount, blockchains (siempre []), deposit_made.
 */
export const DIVISA_OFFERS = [
  {
    id: 1001, side: 'buy',
    advertiser_name: 'criptoblue', advertiser_trades: 10060, advertiser_completion: 100, advertiser_verified: true, advertiser_premium: true,
    buy_currency: 'USD', sell_currency: 'EUR', buy_method: 'Efectivo', sell_method: 'Efectivo',
    price: 0.9267, available: 2000, min_amount: 93, max_amount: 1853,
    blockchains: [], deposit_made: false,
  },
  {
    id: 1002, side: 'sell',
    advertiser_name: 'yosusenador', advertiser_trades: 3392, advertiser_completion: 100, advertiser_verified: true, advertiser_premium: false,
    buy_currency: 'USD', sell_currency: 'EUR', buy_method: 'Zelle', sell_method: 'Efectivo',
    price: 0.9084, available: 3000, min_amount: 136, max_amount: 2725,
    blockchains: [], deposit_made: true,
  },
  {
    id: 1003, side: 'buy',
    advertiser_name: 'tucambioalpoars', advertiser_trades: 702, advertiser_completion: 98, advertiser_verified: true, advertiser_premium: false,
    buy_currency: 'USD', sell_currency: 'CAD', buy_method: 'Zelle', sell_method: 'Transferencia Bancaria',
    price: 1.6246, available: 4000, min_amount: 325, max_amount: 6498,
    blockchains: [], deposit_made: true,
  },
  {
    id: 1004, side: 'sell',
    advertiser_name: 'habana_p2p', advertiser_trades: 1250, advertiser_completion: 99, advertiser_verified: true, advertiser_premium: false,
    buy_currency: 'USD', sell_currency: 'CAD', buy_method: 'Clásica', sell_method: 'Transferencia Bancaria',
    price: 1.5924, available: 2000, min_amount: 159, max_amount: 3185,
    blockchains: [], deposit_made: true,
  },
  {
    id: 1005, side: 'buy',
    advertiser_name: 'caribe_crypto', advertiser_trades: 480, advertiser_completion: 97, advertiser_verified: true, advertiser_premium: false,
    buy_currency: 'USD', sell_currency: 'MXN', buy_method: 'Clásica', sell_method: 'PayPal',
    price: 17.0602, available: 3000, min_amount: 2559, max_amount: 51181,
    blockchains: [], deposit_made: false,
  },
  {
    id: 1006, side: 'sell',
    advertiser_name: 'criptoblue', advertiser_trades: 10060, advertiser_completion: 100, advertiser_verified: true, advertiser_premium: true,
    buy_currency: 'USD', sell_currency: 'MXN', buy_method: 'TropiPay', sell_method: 'PayPal',
    price: 16.7223, available: 4000, min_amount: 3344, max_amount: 66889,
    blockchains: [], deposit_made: true,
  },
  {
    id: 1007, side: 'buy',
    advertiser_name: 'yosusenador', advertiser_trades: 3392, advertiser_completion: 100, advertiser_verified: true, advertiser_premium: false,
    buy_currency: 'USD', sell_currency: 'CUP', buy_method: 'TropiPay', sell_method: 'Efectivo',
    price: 898.9, available: 2000, min_amount: 89890, max_amount: 1797800,
    blockchains: [], deposit_made: true,
  },
  {
    id: 1008, side: 'sell',
    advertiser_name: 'tucambioalpoars', advertiser_trades: 702, advertiser_completion: 98, advertiser_verified: true, advertiser_premium: false,
    buy_currency: 'USD', sell_currency: 'CUP', buy_method: 'Transferencia Bancaria', sell_method: 'Efectivo',
    price: 881.1, available: 3000, min_amount: 132165, max_amount: 2643300,
    blockchains: [], deposit_made: true,
  },
  {
    id: 1009, side: 'buy',
    advertiser_name: 'habana_p2p', advertiser_trades: 1250, advertiser_completion: 99, advertiser_verified: true, advertiser_premium: false,
    buy_currency: 'EUR', sell_currency: 'CAD', buy_method: 'PayPal', sell_method: 'Transferencia Bancaria',
    price: 1.7706, available: 3600, min_amount: 319, max_amount: 6374,
    blockchains: [], deposit_made: false,
  },
  {
    id: 1010, side: 'sell',
    advertiser_name: 'caribe_crypto', advertiser_trades: 480, advertiser_completion: 97, advertiser_verified: true, advertiser_premium: false,
    buy_currency: 'EUR', sell_currency: 'CAD', buy_method: 'Transferencia Bancaria', sell_method: 'Transferencia Bancaria',
    price: 1.7356, available: 1800, min_amount: 156, max_amount: 3124,
    blockchains: [], deposit_made: true,
  },
  {
    id: 1011, side: 'buy',
    advertiser_name: 'criptoblue', advertiser_trades: 10060, advertiser_completion: 100, advertiser_verified: true, advertiser_premium: true,
    buy_currency: 'EUR', sell_currency: 'MXN', buy_method: 'Transferencia Bancaria', sell_method: 'PayPal',
    price: 18.5937, available: 2700, min_amount: 2510, max_amount: 50203,
    blockchains: [], deposit_made: true,
  },
  {
    id: 1012, side: 'sell',
    advertiser_name: 'yosusenador', advertiser_trades: 3392, advertiser_completion: 100, advertiser_verified: true, advertiser_premium: false,
    buy_currency: 'EUR', sell_currency: 'MXN', buy_method: 'Efectivo', sell_method: 'PayPal',
    price: 18.2255, available: 3600, min_amount: 3281, max_amount: 65612,
    blockchains: [], deposit_made: true,
  },
  {
    id: 1013, side: 'buy',
    advertiser_name: 'tucambioalpoars', advertiser_trades: 702, advertiser_completion: 98, advertiser_verified: true, advertiser_premium: false,
    buy_currency: 'EUR', sell_currency: 'CUP', buy_method: 'Efectivo', sell_method: 'Efectivo',
    price: 979.7, available: 1800, min_amount: 88173, max_amount: 1763460,
    blockchains: [], deposit_made: false,
  },
  {
    id: 1014, side: 'sell',
    advertiser_name: 'habana_p2p', advertiser_trades: 1250, advertiser_completion: 99, advertiser_verified: true, advertiser_premium: false,
    buy_currency: 'EUR', sell_currency: 'CUP', buy_method: 'PayPal', sell_method: 'Efectivo',
    price: 960.3, available: 2700, min_amount: 129640, max_amount: 2592810,
    blockchains: [], deposit_made: true,
  },
  {
    id: 1015, side: 'buy',
    advertiser_name: 'caribe_crypto', advertiser_trades: 480, advertiser_completion: 97, advertiser_verified: true, advertiser_premium: false,
    buy_currency: 'CAD', sell_currency: 'MXN', buy_method: 'PayPal', sell_method: 'Transferencia Bancaria',
    price: 10.6061, available: 5000, min_amount: 2652, max_amount: 53030,
    blockchains: [], deposit_made: true,
  },
  {
    id: 1016, side: 'sell',
    advertiser_name: 'criptoblue', advertiser_trades: 10060, advertiser_completion: 100, advertiser_verified: true, advertiser_premium: true,
    buy_currency: 'CAD', sell_currency: 'MXN', buy_method: 'Transferencia Bancaria', sell_method: 'Transferencia Bancaria',
    price: 10.396, available: 2500, min_amount: 1300, max_amount: 25990,
    blockchains: [], deposit_made: true,
  },
  {
    id: 1017, side: 'buy',
    advertiser_name: 'yosusenador', advertiser_trades: 3392, advertiser_completion: 100, advertiser_verified: true, advertiser_premium: false,
    buy_currency: 'CAD', sell_currency: 'CUP', buy_method: 'Transferencia Bancaria', sell_method: 'Etecsa',
    price: 558.833, available: 3750, min_amount: 104781, max_amount: 2095624,
    blockchains: [], deposit_made: false,
  },
  {
    id: 1018, side: 'sell',
    advertiser_name: 'tucambioalpoars', advertiser_trades: 702, advertiser_completion: 98, advertiser_verified: true, advertiser_premium: false,
    buy_currency: 'CAD', sell_currency: 'CUP', buy_method: 'Efectivo', sell_method: 'Etecsa',
    price: 547.767, available: 5000, min_amount: 136942, max_amount: 2738835,
    blockchains: [], deposit_made: true,
  },
  {
    id: 1019, side: 'buy',
    advertiser_name: 'habana_p2p', advertiser_trades: 1250, advertiser_completion: 99, advertiser_verified: true, advertiser_premium: false,
    buy_currency: 'MXN', sell_currency: 'CUP', buy_method: 'Efectivo', sell_method: 'Efectivo',
    price: 53.2169, available: 30000, min_amount: 79825, max_amount: 1596507,
    blockchains: [], deposit_made: true,
  },
  {
    id: 1020, side: 'sell',
    advertiser_name: 'caribe_crypto', advertiser_trades: 480, advertiser_completion: 97, advertiser_verified: true, advertiser_premium: false,
    buy_currency: 'MXN', sell_currency: 'CUP', buy_method: 'PayPal', sell_method: 'Efectivo',
    price: 52.1631, available: 45000, min_amount: 117367, max_amount: 2347340,
    blockchains: [], deposit_made: true,
  },
];
