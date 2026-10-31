/**
 * Ofertas de muestra del mercado Crypto de peetoo.
 * Cobertura demo: 84 ofertas, una por cada par crypto×fiat en compra
 * y en venta (7 cryptos × 5 fiats: CUP, USD, EUR, MXN, CAD), con USD
 * duplicado por par: la oferta original más la ex-MLC. MLC es el
 * ticker de USD por Transferencia Bancaria, no una moneda aparte.
 * Cada oferta tiene un único método de pago, de 8 en total:
 * Efectivo, PayPal, Transferencia Bancaria y Zelle (todas las monedas)
 * más Etecsa (solo CUP) y Clásica, Qvapay y TropiPay (solo USD).
 * Salvo las filas protegidas
 * de los tiles, el método rota por (crypto + fiat + 2·lado) mod 4;
 * 8 filas se convierten a los métodos nuevos para que sus tiles
 * tengan oferta: Etecsa venta 14 + compra 13, Clásica venta 28 +
 * compra 3, Qvapay venta 40 + compra 15, TropiPay venta 52 + compra 27.
 * PayPal no aplica a CUP: su venta 38 y su compra 61 pasan a Etecsa. Las redes rotan para que
 * cada red aparezca con cada crypto. Los anunciantes son ficticios
 * (sin carteras ni datos personales). Los precios siguen la convención
 * demo del set anterior (~1,0x), no son tasas reales de mercado.
 * Campos: id, side (buy/sell), buy_currency, sell_currency,
 * price, available, min_amount, max_amount, payment_method, blockchains,
 * deposit_made, advertiser_*.
 */
import usdcLogo from '../assets/coins/usdc.svg';
import usdtLogo from '../assets/coins/usdt.svg';
import usatLogo from '../assets/coins/usat.svg';
import eurcLogo from '../assets/coins/eurc.svg';
import pyusdLogo from '../assets/coins/pyusd.svg';
import zelleLogo from '../assets/coins/zelle.svg';
import ousdLogo from '../assets/coins/ousd.svg';
import { cupPng, usdPng, eurPng, mxnPng, cadPng } from '../assets/coins/fiat-images.js';
import bnbLogo from '../assets/chains/bnb-chain.svg';
import polygonLogo from '../assets/chains/polygon.svg';
import baseLogo from '../assets/chains/base.svg';
import arbitrumLogo from '../assets/chains/arbitrum.svg';
import optimismLogo from '../assets/chains/optimism.svg';

/**
 * Iconos copiados al proyecto desde el repo de referencia (peetoo original,
 * public/coins/ y public/chains/) y desde los menús del header: no se
 * enlazan en caliente, son archivos locales en src/assets/. Las cadenas
 * son glifos blancos, pensados para ir sobre el círculo de color de la
 * red. Las monedas llenan todo el círculo (el DS ya renderiza la imagen
 * a 100% con object-cover).
 */
export const ASSETS = {
  USDC: { code: 'USDC', symbol: '$', color: '#2775CA', src: usdcLogo },
  USDT: { code: 'USDT', symbol: '₮', color: '#26A17B', src: usdtLogo },
  USAT: { code: 'USAT', symbol: 'U', color: '#132A55', src: usatLogo },
  EURC: { code: 'EURC', symbol: '€', color: '#0B53BF', src: eurcLogo },
  PYUSD: { code: 'PYUSD', symbol: 'P', color: '#003087', src: pyusdLogo },
  ZLUSD: { code: 'ZLUSD', symbol: 'Z', color: '#6d1ed4', src: zelleLogo },
  OUSD: { code: 'OUSD', symbol: 'O', color: '#3a3a44', src: ousdLogo },
  CUP: { code: 'CUP', symbol: '$', color: '#D64545', src: cupPng },
  USD: { code: 'USD', symbol: '$', color: '#2E7D32', src: usdPng },
  EUR: { code: 'EUR', symbol: '€', color: '#003399', src: eurPng },
  MXN: { code: 'MXN', symbol: '$', color: '#006847', src: mxnPng },
  CAD: { code: 'CAD', symbol: '$', color: '#D80621', src: cadPng },
};

export const CHAIN_SRC = {
  'BNB Chain': bnbLogo,
  Polygon: polygonLogo,
  Base: baseLogo,
  Arbitrum: arbitrumLogo,
  Optimism: optimismLogo,
};

export const CHAIN_SHORT = {
  'BNB Chain': 'BNB',
  Polygon: 'MATIC',
  Base: 'BASE',
  Arbitrum: 'ARB',
  Optimism: 'OP',
};

export const CHAIN_COLORS = {
  'BNB Chain': '#F0B90B',
  Polygon: '#8247E5',
  Base: '#0052FF',
  Arbitrum: '#28A0F0',
  Optimism: '#FF0420',
};

export const OFFERS = [
  { id: 1, side: 'buy', advertiser_name: 'criptoblue', advertiser_trades: 10060, advertiser_completion: 100, advertiser_verified: true, advertiser_premium: true, buy_currency: 'USDT', sell_currency: 'CUP', price: 1.01, available: 4001, min_amount: 1, max_amount: 4001, payment_method: 'Efectivo', blockchains: ['BNB Chain', 'Polygon', 'Arbitrum'], deposit_made: false },
  { id: 2, side: 'sell', advertiser_name: 'yosusenador', advertiser_trades: 3392, advertiser_completion: 100, advertiser_verified: true, advertiser_premium: false, buy_currency: 'USDT', sell_currency: 'CUP', price: 1, available: 8050, min_amount: 50, max_amount: 8050, payment_method: 'Transferencia Bancaria', blockchains: ['Polygon', 'Base', 'Optimism'], deposit_made: true },
  { id: 3, side: 'buy', advertiser_name: 'tucambioalpoars', advertiser_trades: 702, advertiser_completion: 98, advertiser_verified: true, advertiser_premium: false, buy_currency: 'USDT', sell_currency: 'USD', price: 1.02, available: 7950, min_amount: 50, max_amount: 8050, payment_method: 'Clásica', blockchains: ['Base', 'Arbitrum', 'BNB Chain'], deposit_made: true },
  { id: 4, side: 'sell', advertiser_name: 'habana_p2p', advertiser_trades: 1250, advertiser_completion: 99, advertiser_verified: true, advertiser_premium: false, buy_currency: 'USDT', sell_currency: 'USD', price: 0.99, available: 15000, min_amount: 100, max_amount: 15100, payment_method: 'Efectivo', blockchains: ['Arbitrum', 'Optimism', 'Polygon'], deposit_made: true },
  { id: 5, side: 'buy', advertiser_name: 'caribe_crypto', advertiser_trades: 480, advertiser_completion: 97, advertiser_verified: true, advertiser_premium: false, buy_currency: 'USDT', sell_currency: 'EUR', price: 1.03, available: 14900, min_amount: 100, max_amount: 15100, payment_method: 'Transferencia Bancaria', blockchains: ['Optimism', 'BNB Chain', 'Base'], deposit_made: true },
  { id: 6, side: 'sell', advertiser_name: 'criptoblue', advertiser_trades: 10060, advertiser_completion: 100, advertiser_verified: true, advertiser_premium: true, buy_currency: 'USDT', sell_currency: 'EUR', price: 0.98, available: 25000, min_amount: 200, max_amount: 25200, payment_method: 'Efectivo', blockchains: ['BNB Chain', 'Polygon', 'Arbitrum'], deposit_made: false },
  { id: 7, side: 'buy', advertiser_name: 'yosusenador', advertiser_trades: 3392, advertiser_completion: 100, advertiser_verified: true, advertiser_premium: false, buy_currency: 'USDT', sell_currency: 'MXN', price: 1.04, available: 25200, min_amount: 200, max_amount: 25200, payment_method: 'Zelle', blockchains: ['Polygon', 'Base', 'Optimism'], deposit_made: false },
  { id: 8, side: 'sell', advertiser_name: 'tucambioalpoars', advertiser_trades: 702, advertiser_completion: 98, advertiser_verified: true, advertiser_premium: false, buy_currency: 'USDT', sell_currency: 'MXN', price: 0.97, available: 45500, min_amount: 500, max_amount: 45500, payment_method: 'PayPal', blockchains: ['Base', 'Arbitrum', 'BNB Chain'], deposit_made: true },
  { id: 9, side: 'buy', advertiser_name: 'habana_p2p', advertiser_trades: 1250, advertiser_completion: 99, advertiser_verified: true, advertiser_premium: false, buy_currency: 'USDT', sell_currency: 'CAD', price: 1.05, available: 45400, min_amount: 500, max_amount: 45500, payment_method: 'Efectivo', blockchains: ['Arbitrum', 'Optimism', 'Polygon'], deposit_made: true },
  { id: 10, side: 'sell', advertiser_name: 'caribe_crypto', advertiser_trades: 480, advertiser_completion: 97, advertiser_verified: true, advertiser_premium: false, buy_currency: 'USDT', sell_currency: 'CAD', price: 0.96, available: 4900, min_amount: 1000, max_amount: 5000, payment_method: 'Transferencia Bancaria', blockchains: ['Optimism', 'BNB Chain', 'Base'], deposit_made: true },
  { id: 11, side: 'buy', advertiser_name: 'criptoblue', advertiser_trades: 10060, advertiser_completion: 100, advertiser_verified: true, advertiser_premium: true, buy_currency: 'USDT', sell_currency: 'USD', price: 1.06, available: 4800, min_amount: 1000, max_amount: 5000, payment_method: 'Transferencia Bancaria', blockchains: ['BNB Chain', 'Polygon', 'Arbitrum'], deposit_made: true },
  { id: 12, side: 'sell', advertiser_name: 'yosusenador', advertiser_trades: 3392, advertiser_completion: 100, advertiser_verified: true, advertiser_premium: false, buy_currency: 'USDT', sell_currency: 'USD', price: 1, available: 7801, min_amount: 1, max_amount: 8001, payment_method: 'Transferencia Bancaria', blockchains: ['Polygon', 'Base', 'Optimism'], deposit_made: false },
  { id: 13, side: 'buy', advertiser_name: 'habana_p2p', advertiser_trades: 1250, advertiser_completion: 99, advertiser_verified: true, advertiser_premium: false, buy_currency: 'USAT', sell_currency: 'CUP', price: 1.02, available: 14950, min_amount: 50, max_amount: 15050, payment_method: 'Etecsa', blockchains: ['BNB Chain', 'Polygon', 'Arbitrum'], deposit_made: true },
  { id: 14, side: 'sell', advertiser_name: 'caribe_crypto', advertiser_trades: 480, advertiser_completion: 97, advertiser_verified: true, advertiser_premium: false, buy_currency: 'USAT', sell_currency: 'CUP', price: 0.99, available: 25000, min_amount: 100, max_amount: 25100, payment_method: 'Etecsa', blockchains: ['Polygon', 'Base', 'Optimism'], deposit_made: true },
  { id: 15, side: 'buy', advertiser_name: 'criptoblue', advertiser_trades: 10060, advertiser_completion: 100, advertiser_verified: true, advertiser_premium: true, buy_currency: 'USAT', sell_currency: 'USD', price: 1.03, available: 24900, min_amount: 100, max_amount: 25100, payment_method: 'Qvapay', blockchains: ['Base', 'Arbitrum', 'BNB Chain'], deposit_made: true },
  { id: 16, side: 'sell', advertiser_name: 'yosusenador', advertiser_trades: 3392, advertiser_completion: 100, advertiser_verified: true, advertiser_premium: false, buy_currency: 'USAT', sell_currency: 'USD', price: 0.98, available: 45000, min_amount: 200, max_amount: 45200, payment_method: 'PayPal', blockchains: ['Arbitrum', 'Optimism', 'Polygon'], deposit_made: false },
  { id: 17, side: 'buy', advertiser_name: 'tucambioalpoars', advertiser_trades: 702, advertiser_completion: 98, advertiser_verified: true, advertiser_premium: false, buy_currency: 'USAT', sell_currency: 'EUR', price: 1.04, available: 45200, min_amount: 200, max_amount: 45200, payment_method: 'Zelle', blockchains: ['Optimism', 'BNB Chain', 'Base'], deposit_made: false },
  { id: 18, side: 'sell', advertiser_name: 'habana_p2p', advertiser_trades: 1250, advertiser_completion: 99, advertiser_verified: true, advertiser_premium: false, buy_currency: 'USAT', sell_currency: 'EUR', price: 0.97, available: 4500, min_amount: 500, max_amount: 4500, payment_method: 'PayPal', blockchains: ['BNB Chain', 'Polygon', 'Arbitrum'], deposit_made: true },
  { id: 19, side: 'buy', advertiser_name: 'caribe_crypto', advertiser_trades: 480, advertiser_completion: 97, advertiser_verified: true, advertiser_premium: false, buy_currency: 'USAT', sell_currency: 'MXN', price: 1.05, available: 4400, min_amount: 500, max_amount: 4500, payment_method: 'Efectivo', blockchains: ['Polygon', 'Base', 'Optimism'], deposit_made: true },
  { id: 20, side: 'sell', advertiser_name: 'criptoblue', advertiser_trades: 10060, advertiser_completion: 100, advertiser_verified: true, advertiser_premium: true, buy_currency: 'USAT', sell_currency: 'MXN', price: 0.96, available: 8900, min_amount: 1000, max_amount: 9000, payment_method: 'Transferencia Bancaria', blockchains: ['Base', 'Arbitrum', 'BNB Chain'], deposit_made: true },
  { id: 21, side: 'buy', advertiser_name: 'yosusenador', advertiser_trades: 3392, advertiser_completion: 100, advertiser_verified: true, advertiser_premium: false, buy_currency: 'USAT', sell_currency: 'CAD', price: 1.06, available: 8800, min_amount: 1000, max_amount: 9000, payment_method: 'PayPal', blockchains: ['Arbitrum', 'Optimism', 'Polygon'], deposit_made: true },
  { id: 22, side: 'sell', advertiser_name: 'tucambioalpoars', advertiser_trades: 702, advertiser_completion: 98, advertiser_verified: true, advertiser_premium: false, buy_currency: 'USAT', sell_currency: 'CAD', price: 1, available: 14801, min_amount: 1, max_amount: 15001, payment_method: 'Zelle', blockchains: ['Optimism', 'BNB Chain', 'Base'], deposit_made: false },
  { id: 23, side: 'buy', advertiser_name: 'habana_p2p', advertiser_trades: 1250, advertiser_completion: 99, advertiser_verified: true, advertiser_premium: false, buy_currency: 'USAT', sell_currency: 'USD', price: 1.07, available: 15001, min_amount: 1, max_amount: 15001, payment_method: 'Transferencia Bancaria', blockchains: ['BNB Chain', 'Polygon', 'Arbitrum'], deposit_made: false },
  { id: 24, side: 'sell', advertiser_name: 'caribe_crypto', advertiser_trades: 480, advertiser_completion: 97, advertiser_verified: true, advertiser_premium: false, buy_currency: 'USAT', sell_currency: 'USD', price: 0.99, available: 25050, min_amount: 50, max_amount: 25050, payment_method: 'Transferencia Bancaria', blockchains: ['Polygon', 'Base', 'Optimism'], deposit_made: true },
  { id: 25, side: 'buy', advertiser_name: 'yosusenador', advertiser_trades: 3392, advertiser_completion: 100, advertiser_verified: true, advertiser_premium: false, buy_currency: 'USDC', sell_currency: 'CUP', price: 1.03, available: 44900, min_amount: 100, max_amount: 45100, payment_method: 'Transferencia Bancaria', blockchains: ['BNB Chain', 'Polygon', 'Arbitrum'], deposit_made: true },
  { id: 26, side: 'sell', advertiser_name: 'tucambioalpoars', advertiser_trades: 702, advertiser_completion: 98, advertiser_verified: true, advertiser_premium: false, buy_currency: 'USDC', sell_currency: 'CUP', price: 0.98, available: 4000, min_amount: 200, max_amount: 4200, payment_method: 'Efectivo', blockchains: ['Polygon', 'Base', 'Optimism'], deposit_made: false },
  { id: 27, side: 'buy', advertiser_name: 'habana_p2p', advertiser_trades: 1250, advertiser_completion: 99, advertiser_verified: true, advertiser_premium: false, buy_currency: 'USDC', sell_currency: 'USD', price: 1.04, available: 4200, min_amount: 200, max_amount: 4200, payment_method: 'TropiPay', blockchains: ['Base', 'Arbitrum', 'BNB Chain'], deposit_made: false },
  { id: 28, side: 'sell', advertiser_name: 'caribe_crypto', advertiser_trades: 480, advertiser_completion: 97, advertiser_verified: true, advertiser_premium: false, buy_currency: 'USDC', sell_currency: 'USD', price: 0.97, available: 8500, min_amount: 500, max_amount: 8500, payment_method: 'Clásica', blockchains: ['Arbitrum', 'Optimism', 'Polygon'], deposit_made: true },
  { id: 29, side: 'buy', advertiser_name: 'criptoblue', advertiser_trades: 10060, advertiser_completion: 100, advertiser_verified: true, advertiser_premium: true, buy_currency: 'USDC', sell_currency: 'EUR', price: 1.05, available: 8400, min_amount: 500, max_amount: 8500, payment_method: 'Efectivo', blockchains: ['Optimism', 'BNB Chain', 'Base'], deposit_made: true },
  { id: 30, side: 'sell', advertiser_name: 'yosusenador', advertiser_trades: 3392, advertiser_completion: 100, advertiser_verified: true, advertiser_premium: false, buy_currency: 'USDC', sell_currency: 'EUR', price: 0.96, available: 15900, min_amount: 1000, max_amount: 16000, payment_method: 'Transferencia Bancaria', blockchains: ['BNB Chain', 'Polygon', 'Arbitrum'], deposit_made: true },
  { id: 31, side: 'buy', advertiser_name: 'tucambioalpoars', advertiser_trades: 702, advertiser_completion: 98, advertiser_verified: true, advertiser_premium: false, buy_currency: 'USDC', sell_currency: 'MXN', price: 1.06, available: 15800, min_amount: 1000, max_amount: 16000, payment_method: 'PayPal', blockchains: ['Polygon', 'Base', 'Optimism'], deposit_made: true },
  { id: 32, side: 'sell', advertiser_name: 'habana_p2p', advertiser_trades: 1250, advertiser_completion: 99, advertiser_verified: true, advertiser_premium: false, buy_currency: 'USDC', sell_currency: 'MXN', price: 1, available: 24801, min_amount: 1, max_amount: 25001, payment_method: 'Zelle', blockchains: ['Base', 'Arbitrum', 'BNB Chain'], deposit_made: false },
  { id: 33, side: 'buy', advertiser_name: 'caribe_crypto', advertiser_trades: 480, advertiser_completion: 97, advertiser_verified: true, advertiser_premium: false, buy_currency: 'USDC', sell_currency: 'CAD', price: 1.07, available: 25001, min_amount: 1, max_amount: 25001, payment_method: 'Transferencia Bancaria', blockchains: ['Arbitrum', 'Optimism', 'Polygon'], deposit_made: false },
  { id: 34, side: 'sell', advertiser_name: 'criptoblue', advertiser_trades: 10060, advertiser_completion: 100, advertiser_verified: true, advertiser_premium: true, buy_currency: 'USDC', sell_currency: 'CAD', price: 0.99, available: 45050, min_amount: 50, max_amount: 45050, payment_method: 'Efectivo', blockchains: ['Optimism', 'BNB Chain', 'Base'], deposit_made: true },
  { id: 35, side: 'buy', advertiser_name: 'yosusenador', advertiser_trades: 3392, advertiser_completion: 100, advertiser_verified: true, advertiser_premium: false, buy_currency: 'USDC', sell_currency: 'USD', price: 1.01, available: 44950, min_amount: 50, max_amount: 45050, payment_method: 'Transferencia Bancaria', blockchains: ['BNB Chain', 'Polygon', 'Arbitrum'], deposit_made: true },
  { id: 36, side: 'sell', advertiser_name: 'tucambioalpoars', advertiser_trades: 702, advertiser_completion: 98, advertiser_verified: true, advertiser_premium: false, buy_currency: 'USDC', sell_currency: 'USD', price: 0.98, available: 4000, min_amount: 100, max_amount: 4100, payment_method: 'Transferencia Bancaria', blockchains: ['Polygon', 'Base', 'Optimism'], deposit_made: true },
  { id: 37, side: 'buy', advertiser_name: 'caribe_crypto', advertiser_trades: 480, advertiser_completion: 97, advertiser_verified: true, advertiser_premium: false, buy_currency: 'EURC', sell_currency: 'CUP', price: 1.04, available: 8200, min_amount: 200, max_amount: 8200, payment_method: 'Zelle', blockchains: ['BNB Chain', 'Polygon', 'Arbitrum'], deposit_made: false },
  { id: 38, side: 'sell', advertiser_name: 'criptoblue', advertiser_trades: 10060, advertiser_completion: 100, advertiser_verified: true, advertiser_premium: true, buy_currency: 'EURC', sell_currency: 'CUP', price: 0.97, available: 15500, min_amount: 500, max_amount: 15500, payment_method: 'Etecsa', blockchains: ['Polygon', 'Base', 'Optimism'], deposit_made: true },
  { id: 39, side: 'buy', advertiser_name: 'yosusenador', advertiser_trades: 3392, advertiser_completion: 100, advertiser_verified: true, advertiser_premium: false, buy_currency: 'EURC', sell_currency: 'USD', price: 1.05, available: 15400, min_amount: 500, max_amount: 15500, payment_method: 'Efectivo', blockchains: ['Base', 'Arbitrum', 'BNB Chain'], deposit_made: true },
  { id: 40, side: 'sell', advertiser_name: 'tucambioalpoars', advertiser_trades: 702, advertiser_completion: 98, advertiser_verified: true, advertiser_premium: false, buy_currency: 'EURC', sell_currency: 'USD', price: 0.96, available: 25900, min_amount: 1000, max_amount: 26000, payment_method: 'Qvapay', blockchains: ['Arbitrum', 'Optimism', 'Polygon'], deposit_made: true },
  { id: 41, side: 'buy', advertiser_name: 'habana_p2p', advertiser_trades: 1250, advertiser_completion: 99, advertiser_verified: true, advertiser_premium: false, buy_currency: 'EURC', sell_currency: 'EUR', price: 1.06, available: 25800, min_amount: 1000, max_amount: 26000, payment_method: 'PayPal', blockchains: ['Optimism', 'BNB Chain', 'Base'], deposit_made: true },
  { id: 42, side: 'sell', advertiser_name: 'caribe_crypto', advertiser_trades: 480, advertiser_completion: 97, advertiser_verified: true, advertiser_premium: false, buy_currency: 'EURC', sell_currency: 'EUR', price: 1, available: 44801, min_amount: 1, max_amount: 45001, payment_method: 'Zelle', blockchains: ['BNB Chain', 'Polygon', 'Arbitrum'], deposit_made: false },
  { id: 43, side: 'buy', advertiser_name: 'criptoblue', advertiser_trades: 10060, advertiser_completion: 100, advertiser_verified: true, advertiser_premium: true, buy_currency: 'EURC', sell_currency: 'MXN', price: 1.07, available: 45001, min_amount: 1, max_amount: 45001, payment_method: 'Transferencia Bancaria', blockchains: ['Polygon', 'Base', 'Optimism'], deposit_made: false },
  { id: 44, side: 'sell', advertiser_name: 'yosusenador', advertiser_trades: 3392, advertiser_completion: 100, advertiser_verified: true, advertiser_premium: false, buy_currency: 'EURC', sell_currency: 'MXN', price: 0.99, available: 4050, min_amount: 50, max_amount: 4050, payment_method: 'Efectivo', blockchains: ['Base', 'Arbitrum', 'BNB Chain'], deposit_made: true },
  { id: 45, side: 'buy', advertiser_name: 'tucambioalpoars', advertiser_trades: 702, advertiser_completion: 98, advertiser_verified: true, advertiser_premium: false, buy_currency: 'EURC', sell_currency: 'CAD', price: 1.01, available: 3950, min_amount: 50, max_amount: 4050, payment_method: 'Zelle', blockchains: ['Arbitrum', 'Optimism', 'Polygon'], deposit_made: true },
  { id: 46, side: 'sell', advertiser_name: 'habana_p2p', advertiser_trades: 1250, advertiser_completion: 99, advertiser_verified: true, advertiser_premium: false, buy_currency: 'EURC', sell_currency: 'CAD', price: 0.98, available: 8000, min_amount: 100, max_amount: 8100, payment_method: 'PayPal', blockchains: ['Optimism', 'BNB Chain', 'Base'], deposit_made: true },
  { id: 47, side: 'buy', advertiser_name: 'caribe_crypto', advertiser_trades: 480, advertiser_completion: 97, advertiser_verified: true, advertiser_premium: false, buy_currency: 'EURC', sell_currency: 'USD', price: 1.02, available: 7900, min_amount: 100, max_amount: 8100, payment_method: 'Transferencia Bancaria', blockchains: ['BNB Chain', 'Polygon', 'Arbitrum'], deposit_made: true },
  { id: 48, side: 'sell', advertiser_name: 'criptoblue', advertiser_trades: 10060, advertiser_completion: 100, advertiser_verified: true, advertiser_premium: true, buy_currency: 'EURC', sell_currency: 'USD', price: 0.97, available: 15000, min_amount: 200, max_amount: 15200, payment_method: 'Transferencia Bancaria', blockchains: ['Polygon', 'Base', 'Optimism'], deposit_made: false },
  { id: 49, side: 'buy', advertiser_name: 'tucambioalpoars', advertiser_trades: 702, advertiser_completion: 98, advertiser_verified: true, advertiser_premium: false, buy_currency: 'PYUSD', sell_currency: 'CUP', price: 1.05, available: 25400, min_amount: 500, max_amount: 25500, payment_method: 'Efectivo', blockchains: ['BNB Chain', 'Polygon', 'Arbitrum'], deposit_made: true },
  { id: 50, side: 'sell', advertiser_name: 'habana_p2p', advertiser_trades: 1250, advertiser_completion: 99, advertiser_verified: true, advertiser_premium: false, buy_currency: 'PYUSD', sell_currency: 'CUP', price: 0.96, available: 45900, min_amount: 1000, max_amount: 46000, payment_method: 'Transferencia Bancaria', blockchains: ['Polygon', 'Base', 'Optimism'], deposit_made: true },
  { id: 51, side: 'buy', advertiser_name: 'caribe_crypto', advertiser_trades: 480, advertiser_completion: 97, advertiser_verified: true, advertiser_premium: false, buy_currency: 'PYUSD', sell_currency: 'USD', price: 1.06, available: 45800, min_amount: 1000, max_amount: 46000, payment_method: 'PayPal', blockchains: ['Base', 'Arbitrum', 'BNB Chain'], deposit_made: true },
  { id: 52, side: 'sell', advertiser_name: 'criptoblue', advertiser_trades: 10060, advertiser_completion: 100, advertiser_verified: true, advertiser_premium: true, buy_currency: 'PYUSD', sell_currency: 'USD', price: 1, available: 3801, min_amount: 1, max_amount: 4001, payment_method: 'TropiPay', blockchains: ['Arbitrum', 'Optimism', 'Polygon'], deposit_made: false },
  { id: 53, side: 'buy', advertiser_name: 'yosusenador', advertiser_trades: 3392, advertiser_completion: 100, advertiser_verified: true, advertiser_premium: false, buy_currency: 'PYUSD', sell_currency: 'EUR', price: 1.07, available: 4001, min_amount: 1, max_amount: 4001, payment_method: 'Transferencia Bancaria', blockchains: ['Optimism', 'BNB Chain', 'Base'], deposit_made: false },
  { id: 54, side: 'sell', advertiser_name: 'tucambioalpoars', advertiser_trades: 702, advertiser_completion: 98, advertiser_verified: true, advertiser_premium: false, buy_currency: 'PYUSD', sell_currency: 'EUR', price: 0.99, available: 8050, min_amount: 50, max_amount: 8050, payment_method: 'Efectivo', blockchains: ['BNB Chain', 'Polygon', 'Arbitrum'], deposit_made: true },
  { id: 55, side: 'buy', advertiser_name: 'habana_p2p', advertiser_trades: 1250, advertiser_completion: 99, advertiser_verified: true, advertiser_premium: false, buy_currency: 'PYUSD', sell_currency: 'MXN', price: 1.01, available: 7950, min_amount: 50, max_amount: 8050, payment_method: 'Zelle', blockchains: ['Polygon', 'Base', 'Optimism'], deposit_made: true },
  { id: 56, side: 'sell', advertiser_name: 'caribe_crypto', advertiser_trades: 480, advertiser_completion: 97, advertiser_verified: true, advertiser_premium: false, buy_currency: 'PYUSD', sell_currency: 'MXN', price: 0.98, available: 15000, min_amount: 100, max_amount: 15100, payment_method: 'PayPal', blockchains: ['Base', 'Arbitrum', 'BNB Chain'], deposit_made: true },
  { id: 57, side: 'buy', advertiser_name: 'criptoblue', advertiser_trades: 10060, advertiser_completion: 100, advertiser_verified: true, advertiser_premium: true, buy_currency: 'PYUSD', sell_currency: 'CAD', price: 1.02, available: 14900, min_amount: 100, max_amount: 15100, payment_method: 'Efectivo', blockchains: ['Arbitrum', 'Optimism', 'Polygon'], deposit_made: true },
  { id: 58, side: 'sell', advertiser_name: 'yosusenador', advertiser_trades: 3392, advertiser_completion: 100, advertiser_verified: true, advertiser_premium: false, buy_currency: 'PYUSD', sell_currency: 'CAD', price: 0.97, available: 25000, min_amount: 200, max_amount: 25200, payment_method: 'Transferencia Bancaria', blockchains: ['Optimism', 'BNB Chain', 'Base'], deposit_made: false },
  { id: 59, side: 'buy', advertiser_name: 'tucambioalpoars', advertiser_trades: 702, advertiser_completion: 98, advertiser_verified: true, advertiser_premium: false, buy_currency: 'PYUSD', sell_currency: 'USD', price: 1.03, available: 25200, min_amount: 200, max_amount: 25200, payment_method: 'Transferencia Bancaria', blockchains: ['BNB Chain', 'Polygon', 'Arbitrum'], deposit_made: false },
  { id: 60, side: 'sell', advertiser_name: 'habana_p2p', advertiser_trades: 1250, advertiser_completion: 99, advertiser_verified: true, advertiser_premium: false, buy_currency: 'PYUSD', sell_currency: 'USD', price: 0.96, available: 45500, min_amount: 500, max_amount: 45500, payment_method: 'Transferencia Bancaria', blockchains: ['Polygon', 'Base', 'Optimism'], deposit_made: true },
  { id: 61, side: 'buy', advertiser_name: 'criptoblue', advertiser_trades: 10060, advertiser_completion: 100, advertiser_verified: true, advertiser_premium: true, buy_currency: 'ZLUSD', sell_currency: 'CUP', price: 1.06, available: 4800, min_amount: 1000, max_amount: 5000, payment_method: 'Etecsa', blockchains: ['BNB Chain', 'Polygon', 'Arbitrum'], deposit_made: true },
  { id: 62, side: 'sell', advertiser_name: 'yosusenador', advertiser_trades: 3392, advertiser_completion: 100, advertiser_verified: true, advertiser_premium: false, buy_currency: 'ZLUSD', sell_currency: 'CUP', price: 1, available: 7801, min_amount: 1, max_amount: 8001, payment_method: 'Zelle', blockchains: ['Polygon', 'Base', 'Optimism'], deposit_made: false },
  { id: 63, side: 'buy', advertiser_name: 'tucambioalpoars', advertiser_trades: 702, advertiser_completion: 98, advertiser_verified: true, advertiser_premium: false, buy_currency: 'ZLUSD', sell_currency: 'USD', price: 1.07, available: 8001, min_amount: 1, max_amount: 8001, payment_method: 'Transferencia Bancaria', blockchains: ['Base', 'Arbitrum', 'BNB Chain'], deposit_made: false },
  { id: 64, side: 'sell', advertiser_name: 'habana_p2p', advertiser_trades: 1250, advertiser_completion: 99, advertiser_verified: true, advertiser_premium: false, buy_currency: 'ZLUSD', sell_currency: 'USD', price: 0.99, available: 15050, min_amount: 50, max_amount: 15050, payment_method: 'PayPal', blockchains: ['Arbitrum', 'Optimism', 'Polygon'], deposit_made: true },
  { id: 65, side: 'buy', advertiser_name: 'caribe_crypto', advertiser_trades: 480, advertiser_completion: 97, advertiser_verified: true, advertiser_premium: false, buy_currency: 'ZLUSD', sell_currency: 'EUR', price: 1.01, available: 14950, min_amount: 50, max_amount: 15050, payment_method: 'Zelle', blockchains: ['Optimism', 'BNB Chain', 'Base'], deposit_made: true },
  { id: 66, side: 'sell', advertiser_name: 'criptoblue', advertiser_trades: 10060, advertiser_completion: 100, advertiser_verified: true, advertiser_premium: true, buy_currency: 'ZLUSD', sell_currency: 'EUR', price: 0.98, available: 25000, min_amount: 100, max_amount: 25100, payment_method: 'PayPal', blockchains: ['BNB Chain', 'Polygon', 'Arbitrum'], deposit_made: true },
  { id: 67, side: 'buy', advertiser_name: 'yosusenador', advertiser_trades: 3392, advertiser_completion: 100, advertiser_verified: true, advertiser_premium: false, buy_currency: 'ZLUSD', sell_currency: 'MXN', price: 1.02, available: 24900, min_amount: 100, max_amount: 25100, payment_method: 'Efectivo', blockchains: ['Polygon', 'Base', 'Optimism'], deposit_made: true },
  { id: 68, side: 'sell', advertiser_name: 'tucambioalpoars', advertiser_trades: 702, advertiser_completion: 98, advertiser_verified: true, advertiser_premium: false, buy_currency: 'ZLUSD', sell_currency: 'MXN', price: 0.97, available: 45000, min_amount: 200, max_amount: 45200, payment_method: 'Transferencia Bancaria', blockchains: ['Base', 'Arbitrum', 'BNB Chain'], deposit_made: false },
  { id: 69, side: 'buy', advertiser_name: 'habana_p2p', advertiser_trades: 1250, advertiser_completion: 99, advertiser_verified: true, advertiser_premium: false, buy_currency: 'ZLUSD', sell_currency: 'CAD', price: 1.03, available: 45200, min_amount: 200, max_amount: 45200, payment_method: 'PayPal', blockchains: ['Arbitrum', 'Optimism', 'Polygon'], deposit_made: false },
  { id: 70, side: 'sell', advertiser_name: 'caribe_crypto', advertiser_trades: 480, advertiser_completion: 97, advertiser_verified: true, advertiser_premium: false, buy_currency: 'ZLUSD', sell_currency: 'CAD', price: 0.96, available: 4500, min_amount: 500, max_amount: 4500, payment_method: 'Zelle', blockchains: ['Optimism', 'BNB Chain', 'Base'], deposit_made: true },
  { id: 71, side: 'buy', advertiser_name: 'criptoblue', advertiser_trades: 10060, advertiser_completion: 100, advertiser_verified: true, advertiser_premium: true, buy_currency: 'ZLUSD', sell_currency: 'USD', price: 1.04, available: 4400, min_amount: 500, max_amount: 4500, payment_method: 'Transferencia Bancaria', blockchains: ['BNB Chain', 'Polygon', 'Arbitrum'], deposit_made: true },
  { id: 72, side: 'sell', advertiser_name: 'yosusenador', advertiser_trades: 3392, advertiser_completion: 100, advertiser_verified: true, advertiser_premium: false, buy_currency: 'ZLUSD', sell_currency: 'USD', price: 1, available: 8900, min_amount: 1000, max_amount: 9000, payment_method: 'Transferencia Bancaria', blockchains: ['Polygon', 'Base', 'Optimism'], deposit_made: true },
  { id: 73, side: 'buy', advertiser_name: 'habana_p2p', advertiser_trades: 1250, advertiser_completion: 99, advertiser_verified: true, advertiser_premium: false, buy_currency: 'OUSD', sell_currency: 'CUP', price: 1.07, available: 15001, min_amount: 1, max_amount: 15001, payment_method: 'Transferencia Bancaria', blockchains: ['BNB Chain', 'Polygon', 'Arbitrum'], deposit_made: false },
  { id: 74, side: 'sell', advertiser_name: 'caribe_crypto', advertiser_trades: 480, advertiser_completion: 97, advertiser_verified: true, advertiser_premium: false, buy_currency: 'OUSD', sell_currency: 'CUP', price: 0.99, available: 25050, min_amount: 50, max_amount: 25050, payment_method: 'Efectivo', blockchains: ['Polygon', 'Base', 'Optimism'], deposit_made: true },
  { id: 75, side: 'buy', advertiser_name: 'criptoblue', advertiser_trades: 10060, advertiser_completion: 100, advertiser_verified: true, advertiser_premium: true, buy_currency: 'OUSD', sell_currency: 'USD', price: 1.01, available: 24950, min_amount: 50, max_amount: 25050, payment_method: 'Zelle', blockchains: ['Base', 'Arbitrum', 'BNB Chain'], deposit_made: true },
  { id: 76, side: 'sell', advertiser_name: 'yosusenador', advertiser_trades: 3392, advertiser_completion: 100, advertiser_verified: true, advertiser_premium: false, buy_currency: 'OUSD', sell_currency: 'USD', price: 0.98, available: 45000, min_amount: 100, max_amount: 45100, payment_method: 'Zelle', blockchains: ['Arbitrum', 'Optimism', 'Polygon'], deposit_made: true },
  { id: 77, side: 'buy', advertiser_name: 'tucambioalpoars', advertiser_trades: 702, advertiser_completion: 98, advertiser_verified: true, advertiser_premium: false, buy_currency: 'OUSD', sell_currency: 'EUR', price: 1.02, available: 44900, min_amount: 100, max_amount: 45100, payment_method: 'Efectivo', blockchains: ['Optimism', 'BNB Chain', 'Base'], deposit_made: true },
  { id: 78, side: 'sell', advertiser_name: 'habana_p2p', advertiser_trades: 1250, advertiser_completion: 99, advertiser_verified: true, advertiser_premium: false, buy_currency: 'OUSD', sell_currency: 'EUR', price: 0.97, available: 4000, min_amount: 200, max_amount: 4200, payment_method: 'Transferencia Bancaria', blockchains: ['BNB Chain', 'Polygon', 'Arbitrum'], deposit_made: false },
  { id: 79, side: 'buy', advertiser_name: 'caribe_crypto', advertiser_trades: 480, advertiser_completion: 97, advertiser_verified: true, advertiser_premium: false, buy_currency: 'OUSD', sell_currency: 'MXN', price: 1.03, available: 4200, min_amount: 200, max_amount: 4200, payment_method: 'PayPal', blockchains: ['Polygon', 'Base', 'Optimism'], deposit_made: false },
  { id: 80, side: 'sell', advertiser_name: 'criptoblue', advertiser_trades: 10060, advertiser_completion: 100, advertiser_verified: true, advertiser_premium: true, buy_currency: 'OUSD', sell_currency: 'MXN', price: 0.96, available: 8500, min_amount: 500, max_amount: 8500, payment_method: 'Zelle', blockchains: ['Base', 'Arbitrum', 'BNB Chain'], deposit_made: true },
  { id: 81, side: 'buy', advertiser_name: 'yosusenador', advertiser_trades: 3392, advertiser_completion: 100, advertiser_verified: true, advertiser_premium: false, buy_currency: 'OUSD', sell_currency: 'CAD', price: 1.04, available: 8400, min_amount: 500, max_amount: 8500, payment_method: 'Transferencia Bancaria', blockchains: ['Arbitrum', 'Optimism', 'Polygon'], deposit_made: true },
  { id: 82, side: 'sell', advertiser_name: 'tucambioalpoars', advertiser_trades: 702, advertiser_completion: 98, advertiser_verified: true, advertiser_premium: false, buy_currency: 'OUSD', sell_currency: 'CAD', price: 1, available: 15900, min_amount: 1000, max_amount: 16000, payment_method: 'Efectivo', blockchains: ['Optimism', 'BNB Chain', 'Base'], deposit_made: true },
  { id: 83, side: 'buy', advertiser_name: 'habana_p2p', advertiser_trades: 1250, advertiser_completion: 99, advertiser_verified: true, advertiser_premium: false, buy_currency: 'OUSD', sell_currency: 'USD', price: 1.05, available: 15800, min_amount: 1000, max_amount: 16000, payment_method: 'Transferencia Bancaria', blockchains: ['BNB Chain', 'Polygon', 'Arbitrum'], deposit_made: true },
  { id: 84, side: 'sell', advertiser_name: 'caribe_crypto', advertiser_trades: 480, advertiser_completion: 97, advertiser_verified: true, advertiser_premium: false, buy_currency: 'OUSD', sell_currency: 'USD', price: 0.99, available: 24801, min_amount: 1, max_amount: 25001, payment_method: 'Transferencia Bancaria', blockchains: ['Polygon', 'Base', 'Optimism'], deposit_made: false },
];

// Detalles de pago por anunciante y método (datos ficticios de muestra:
// un detalle por anunciante y método, igual en todas sus ofertas; las
// cuentas van enmascaradas. 'Efectivo' es siempre pago en persona y su
// ciudad la da la ubicación de la oferta, no este mapa.
export const PAYMENT_DETAILS = {
  criptoblue: {
    'Efectivo': 'Pago en persona',
    'Etecsa': '+53 5828 6140',
    'Clásica': 'Tarjeta Clásica · 1633 1272 6816 2782',
    'Qvapay': 'criptoblue@qvapay.com',
    'TropiPay': 'criptoblue@tropipay.com',
    'Zelle': 'criptoblue@gmail.com',
    'PayPal': 'criptoblue.pagos@gmail.com',
    'Wise (USD)': 'criptoblue.wise@gmail.com',
    'Revolut': '@criptoblue',
    'ETH': '0xb6d3127c68b6c782d48cc48515318164304becd0',
    'SOL': '6dRd9kpMmxd9HLWni5QyJPdAzzk1beqQ29eL5UARxGCL',
    'BTC': '16E5YmGvQpJTQp2vxJTmUBVJxo1ytWhnRY',
    'Transferencia Bancaria': 'Banco Metropolitano · Cuenta 4000 1000 5000 1234',
    'Bank USA': 'Chase · Cuenta 4137 1211 5089 5678',
    'Wire': 'Transferencia SWIFT · Cuenta 4274 1422 5178 9012',
  },
  yosusenador: {
    'Efectivo': 'Pago en persona',
    'Etecsa': '+53 5996 1318',
    'Clásica': 'Tarjeta Clásica · 2728 6526 1604 1217',
    'Qvapay': 'yosusenador@qvapay.com',
    'TropiPay': 'yosusenador@tropipay.com',
    'Zelle': 'yosusenador@gmail.com',
    'PayPal': 'yosusenador.pagos@gmail.com',
    'Wise (USD)': 'yosusenador.wise@gmail.com',
    'Revolut': '@yosusenador',
    'ETH': '0x27286f26b6a4bcb7976af57321a32a28fb0010f2',
    'SOL': 'DbqeSkUqQXaPh5KmpLv6VD14VES1bgwtEWQnwPKyX7kG',
    'BTC': '1F4ATdZkz7jqunZsv9kK1Jh5Vz2SjBaHi',
    'Transferencia Bancaria': 'Banco Popular de Ahorro · Cuenta 4411 1633 5267 2345',
    'Bank USA': 'Bank of America · Cuenta 4548 1844 5356 6789',
    'Wire': 'Transferencia SWIFT · Cuenta 4685 2055 5445 0123',
  },
  tucambioalpoars: {
    'Efectivo': 'Pago en persona',
    'Etecsa': '+53 5580 3475',
    'Clásica': 'Tarjeta Clásica · 4542 2693 2731 6475',
    'Qvapay': 'tucambioalpoars@qvapay.com',
    'TropiPay': 'tucambioalpoars@tropipay.com',
    'Zelle': 'tucambioalpoars@gmail.com',
    'PayPal': 'tucambioalpoars.pagos@gmail.com',
    'Wise (USD)': 'tucambioalpoars.wise@gmail.com',
    'Revolut': '@tucambioalpoars',
    'ETH': '0xe5e2269327d16475f366bbf4544e37529b9ca771',
    'SOL': '5GzVbCdm3EXVEg8ZWHNmYrPD9wy6G59UqMMkF1tCrp5j',
    'BTC': '16bUUxEhUGLGGUhSw219nKiuToXLXv8HCN',
    'Transferencia Bancaria': 'Banco de Crédito y Comercio · Cuenta 4822 2266 5534 3456',
    'Bank USA': 'Wells Fargo · Cuenta 4959 2477 5623 7890',
    'Wire': 'Transferencia SWIFT · Cuenta 5096 2688 5712 1234',
  },
  habana_p2p: {
    'Efectivo': 'Pago en persona',
    'Etecsa': '+53 5637 9667',
    'Clásica': 'Tarjeta Clásica · 2422 7753 9596 4575',
    'Qvapay': 'habana_p2p@qvapay.com',
    'TropiPay': 'habana_p2p@tropipay.com',
    'Zelle': 'habana.p2p@gmail.com',
    'PayPal': 'habana.p2p.pagos@gmail.com',
    'Wise (USD)': 'habana.p2p.wise@gmail.com',
    'Revolut': '@habana_p2p',
    'ETH': '0x24cc775395964f7f4dc1d72f455c905db5ffde02',
    'SOL': '7sQxPwC5KjjypWc1SdGhGY2oQoZVwNkVQGd1G4eBLaa1',
    'BTC': '14q6G4PdNww9NvPpSxPqHcceH88raSZwvB',
    'Transferencia Bancaria': 'Banco Metropolitano · Cuenta 5233 2899 5801 4567',
    'Bank USA': 'Citibank · Cuenta 5370 3110 5890 8901',
    'Wire': 'Transferencia SWIFT · Cuenta 5507 3321 5979 2345',
  },
  caribe_crypto: {
    'Efectivo': 'Pago en persona',
    'Etecsa': '+53 5804 1942',
    'Clásica': 'Tarjeta Clásica · 4843 8316 7801 2001',
    'Qvapay': 'caribe_crypto@qvapay.com',
    'TropiPay': 'caribe_crypto@tropipay.com',
    'Zelle': 'caribe.crypto@gmail.com',
    'PayPal': 'caribe.crypto.pagos@gmail.com',
    'Wise (USD)': 'caribe.crypto.wise@gmail.com',
    'Revolut': '@caribe_crypto',
    'ETH': '0x484d8d167801200be9c499c299ab4043a8664b81',
    'SOL': 'ACsGc6Bmf9bvY3PjgQrReR8eLsnxHDYJqzjpv6S8n1XW',
    'BTC': '197roteG3PA3i7CC3shzKPwE6phSpH4Jwz',
    'Transferencia Bancaria': 'Banco Popular de Ahorro · Cuenta 5644 3532 6068 5678',
    'Bank USA': 'Chase · Cuenta 5781 3743 6157 9012',
    'Wire': 'Transferencia SWIFT · Cuenta 5918 3954 6246 3456',
  },
};

// Precisión de ubicación por anunciante (mockup de mapa, sin stack de
// mapas todavía): 'exact' muestra pin exacto, 'city' muestra zona
// aproximada sobre la ciudad. Es la configuración de la persona: nunca
// se dibuja un pin exacto para quien solo compartió la ciudad.
export const LOCATION_PRECISION = {
  criptoblue: 'exact',
  habana_p2p: 'exact',
  yosusenador: 'city',
  tucambioalpoars: 'city',
  caribe_crypto: 'city',
};
