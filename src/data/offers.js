/**
 * Ofertas de muestra del mercado Crypto de peetoo.
 * Son los datos demo del repo original (lib/mock-data.ts), sin carteras
 * ni datos personales: los anunciantes son ficticios.
 * Campos: id, side (buy/sell), buy_currency, sell_currency, price,
 * available, min_amount, max_amount, payment_methods, blockchains,
 * deposit_made, advertiser_*.
 */
import usdcLogo from '../assets/coins/usdc.svg';
import usdtLogo from '../assets/coins/usdt.svg';
import bnbLogo from '../assets/chains/bnb-chain.svg';
import polygonLogo from '../assets/chains/polygon.svg';
import baseLogo from '../assets/chains/base.svg';
import arbitrumLogo from '../assets/chains/arbitrum.svg';
import optimismLogo from '../assets/chains/optimism.svg';

/**
 * Logos web3 copiados al proyecto desde web3icons.io (variante branded):
 * no se enlazan en caliente, son archivos locales en src/assets/.
 * Las fíat (CUP, USD) no tienen logo web3 y mantienen el símbolo del DS.
 */
export const ASSETS = {
  USDC: { code: 'USDC', symbol: '$', color: '#2775CA', src: usdcLogo },
  USDT: { code: 'USDT', symbol: '₮', color: '#26A17B', src: usdtLogo },
  CUP: { code: 'CUP', symbol: '$', color: '#D64545' },
  USD: { code: 'USD', symbol: '$', color: '#2E7D32' },
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
  { id: 1, side: 'buy', advertiser_name: 'criptoblue', advertiser_trades: 10060, advertiser_completion: 100, advertiser_verified: true, advertiser_premium: true, buy_currency: 'USDC', sell_currency: 'CUP', price: 1.01, available: 50000, min_amount: 1, max_amount: 50500, payment_methods: ['Efectivo'], blockchains: ['BNB Chain', 'Polygon', 'Base', 'Arbitrum'], deposit_made: true },
  { id: 2, side: 'buy', advertiser_name: 'yosusenador', advertiser_trades: 3392, advertiser_completion: 100, advertiser_verified: true, advertiser_premium: false, buy_currency: 'USDT', sell_currency: 'USD', price: 1.05, available: 4000, min_amount: 1, max_amount: 4200, payment_methods: ['Wise (USD)', 'Bank USA', 'PayPal'], blockchains: ['BNB Chain', 'Polygon', 'Base', 'Optimism'], deposit_made: true },
  { id: 3, side: 'buy', advertiser_name: 'tucambioalpoars', advertiser_trades: 702, advertiser_completion: 98, advertiser_verified: true, advertiser_premium: false, buy_currency: 'USDC', sell_currency: 'USD', price: 1.07, available: 10000, min_amount: 1000, max_amount: 10700, payment_methods: ['Efectivo', 'Transferencia Bancaria'], blockchains: ['BNB Chain', 'Base'], deposit_made: true },
  { id: 4, side: 'sell', advertiser_name: 'criptoblue', advertiser_trades: 10060, advertiser_completion: 100, advertiser_verified: true, advertiser_premium: true, buy_currency: 'USDC', sell_currency: 'USD', price: 0.99, available: 45000, min_amount: 1, max_amount: 44500, payment_methods: ['Efectivo'], blockchains: ['BNB Chain', 'Polygon', 'Base'], deposit_made: true },
  { id: 5, side: 'sell', advertiser_name: 'yosusenador', advertiser_trades: 3392, advertiser_completion: 100, advertiser_verified: true, advertiser_premium: false, buy_currency: 'USDT', sell_currency: 'USD', price: 0.97, available: 8000, min_amount: 50, max_amount: 7800, payment_methods: ['Wise (USD)', 'Bank USA', 'Zelle'], blockchains: ['BNB Chain', 'Polygon', 'Base'], deposit_made: true },
  { id: 6, side: 'sell', advertiser_name: 'tucambioalpoars', advertiser_trades: 702, advertiser_completion: 98, advertiser_verified: true, advertiser_premium: false, buy_currency: 'USDT', sell_currency: 'USD', price: 0.96, available: 5000, min_amount: 100, max_amount: 4800, payment_methods: ['Efectivo', 'Transferencia Bancaria'], blockchains: ['BNB Chain', 'Base'], deposit_made: true },
  { id: 7, side: 'buy', advertiser_name: 'criptoblue - local', advertiser_trades: 10060, advertiser_completion: 100, advertiser_verified: true, advertiser_premium: true, buy_currency: 'USDC', sell_currency: 'CUP', price: 1.02, available: 12000, min_amount: 100, max_amount: 12300, payment_methods: ['Efectivo', 'Transferencia Bancaria'], blockchains: ['Base', 'Polygon'], deposit_made: false },
  { id: 8, side: 'buy', advertiser_name: 'yosusenador', advertiser_trades: 3392, advertiser_completion: 100, advertiser_verified: true, advertiser_premium: false, buy_currency: 'USDC', sell_currency: 'CUP', price: 1.04, available: 3500, min_amount: 200, max_amount: 3700, payment_methods: ['Revolut', 'PayPal', 'Wise (USD)'], blockchains: ['BNB Chain', 'Base', 'Arbitrum'], deposit_made: true },
  { id: 9, side: 'sell', advertiser_name: 'tucambioalpoars', advertiser_trades: 702, advertiser_completion: 98, advertiser_verified: true, advertiser_premium: false, buy_currency: 'USDC', sell_currency: 'USD', price: 0.98, available: 6000, min_amount: 50, max_amount: 5900, payment_methods: ['Wire', 'Transferencia Bancaria'], blockchains: ['BNB Chain', 'Base', 'Polygon'], deposit_made: true },
  { id: 10, side: 'sell', advertiser_name: 'criptoblue', advertiser_trades: 10060, advertiser_completion: 100, advertiser_verified: true, advertiser_premium: true, buy_currency: 'USDT', sell_currency: 'USD', price: 1.0, available: 22000, min_amount: 100, max_amount: 22000, payment_methods: ['Efectivo', 'Wise (USD)'], blockchains: ['BNB Chain', 'Polygon', 'Arbitrum'], deposit_made: true },
];
