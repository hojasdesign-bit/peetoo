/**
 * check-data.mjs — consistencia de los datos de muestra de peetoo.
 *
 * Lee src/data/offers.js SIN bundler: el archivo importa SVGs, así que
 * se quitan las líneas de import y se evalúa el módulo con stubs para
 * los logos (al script solo le importan los datos, no las imágenes).
 *
 * Dos niveles, a propósito:
 * - ERROR: imposible o typo (precio <= 0, min >= max, método en una
 *   fiat que no le toca, referencia desconocida, precio salvajemente
 *   fuera de su grupo, max incoherente con disponible x precio).
 *   Un ERROR hace fallar el proceso (exit 1).
 * - AVISO: sospechoso pero legítimo si es deliberado. El caso principal
 *   es el SPREAD: antes era regla dura (compra > venta en cada grupo),
 *   pero un anunciante puede querer hacer una rebaja (vender más
 *   barato o pagar más para atraer), así que un grupo con el spread
 *   invertido o tocado solo avisa, con los ids, y no bloquea.
 *   Los tiles sin ofertas y los duplicados (legítimos por la ex-MLC)
 *   también son avisos.
 *
 * Uso: npm run check-data   (o: node scripts/check-data.mjs)
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const offersPath = path.join(here, '..', 'src', 'data', 'offers.js');

const src = fs.readFileSync(offersPath, 'utf8');

// Recoge los nombres importados para sustituirlos por stubs.
const imported = new Set();
for (const line of src.split('\n')) {
  const mDefault = line.match(/^import\s+(\w+)\s+from\s+/);
  if (mDefault) imported.add(mDefault[1]);
  const mNamed = line.match(/^import\s*\{([^}]+)\}\s*from\s+/);
  if (mNamed) for (const n of mNamed[1].split(',')) imported.add(n.trim());
}
let body = src.replace(/^import .*$/gm, '').replace(/export const /g, 'const ');
body += '\n;return { OFFERS, PAYMENT_DETAILS };';
const stubs = Object.fromEntries([...imported].map((n) => [n, n]));
const { OFFERS, PAYMENT_DETAILS } = new Function(...Object.keys(stubs), body)(...Object.values(stubs));

const CRYPTOS = ['USDT', 'USAT', 'USDC', 'EURC', 'PYUSD', 'ZLUSD', 'OUSD'];
const FIATS = ['CUP', 'USD', 'EUR', 'MXN', 'CAD'];
const METHODS = ['Efectivo', 'PayPal', 'Transferencia Bancaria', 'Zelle', 'Etecsa', 'Clásica', 'Qvapay', 'TropiPay'];
const CHAINS = ['BNB Chain', 'Polygon', 'Base', 'Arbitrum', 'Optimism'];
// Solo para estas fiats vale cada método restringido.
const METHOD_FIATS = {
  Etecsa: ['CUP'],
  'Clásica': ['USD'],
  Qvapay: ['USD'],
  TropiPay: ['USD'],
};
// Tiles método+moneda del menú «Comprar fiat» (App.jsx, fiatDropdown).
// Un tile sin ofertas es un aviso, no un error: el menú lo tolera.
const TILES = [
  ['Efectivo', 'CUP'], ['Efectivo', 'USD'], ['Zelle', 'USD'],
  ['PayPal', 'USD'], ['PayPal', 'EUR'], ['PayPal', 'MXN'], ['PayPal', 'CAD'],
  ['Transferencia Bancaria', 'CUP'], ['Etecsa', 'CUP'],
  ['Clásica', 'USD'], ['Transferencia Bancaria', 'USD'],
  ['Qvapay', 'USD'], ['TropiPay', 'USD'],
];

const errors = [];
const warnings = [];
const err = (msg) => errors.push(msg);
const warn = (msg) => warnings.push(msg);

// 1. Estructura y referencias.
const ids = new Set();
for (const o of OFFERS) {
  const tag = `id ${o.id}`;
  if (typeof o.id !== 'number' || ids.has(o.id)) err(`${tag}: id duplicado o no numérico`);
  ids.add(o.id);
  if (o.side !== 'buy' && o.side !== 'sell') err(`${tag}: side inválido (${o.side})`);
  if (!CRYPTOS.includes(o.buy_currency)) err(`${tag}: crypto desconocida (${o.buy_currency})`);
  if (!FIATS.includes(o.sell_currency)) err(`${tag}: fiat desconocida (${o.sell_currency})`);
  if (o.sell_currency === 'MLC') err(`${tag}: MLC no es una moneda, es el ticker de USD por Transferencia`);
  if (!METHODS.includes(o.payment_method)) err(`${tag}: método desconocido (${o.payment_method})`);
  if (!(o.price > 0)) err(`${tag}: precio no positivo (${o.price})`);
  if (!(o.available > 0)) err(`${tag}: disponible no positivo (${o.available})`);
  if (!(o.min_amount > 0) || !(o.max_amount > 0)) err(`${tag}: min/max no positivos (${o.min_amount}/${o.max_amount})`);
  if (o.min_amount >= o.max_amount) err(`${tag}: min >= max (${o.min_amount}/${o.max_amount})`);
  if (!o.advertiser_name) err(`${tag}: sin anunciante`);
  else if (!PAYMENT_DETAILS[o.advertiser_name]) err(`${tag}: anunciante sin entrada en PAYMENT_DETAILS (${o.advertiser_name})`);
  if (!Array.isArray(o.blockchains) || o.blockchains.length === 0) err(`${tag}: sin redes`);
  else for (const c of o.blockchains) if (!CHAINS.includes(c)) err(`${tag}: red desconocida (${c})`);
  // 2. Reglas método x fiat.
  const allowed = METHOD_FIATS[o.payment_method];
  if (allowed && !allowed.includes(o.sell_currency)) err(`${tag}: ${o.payment_method} no aplica a ${o.sell_currency}`);
  if (o.payment_method === 'PayPal' && o.sell_currency === 'CUP') err(`${tag}: PayPal nunca aplica a CUP`);
  // 3. max ≈ disponible x precio (±10%).
  const ratio = o.max_amount / (o.available * o.price);
  if (ratio < 0.9 || ratio > 1.1) err(`${tag}: max (${o.max_amount}) incoherente con disponible x precio (${(o.available * o.price).toFixed(2)}, ratio ${ratio.toFixed(3)})`);
}

// 4. Precio dentro de ±25% de la mediana de su grupo crypto x fiat.
//    Atrapa typos (un 0 de más) sin prohibir rebajas (5-10% típicas).
const groups = new Map();
for (const o of OFFERS) {
  const k = `${o.buy_currency}/${o.sell_currency}`;
  if (!groups.has(k)) groups.set(k, []);
  groups.get(k).push(o);
}
for (const [k, arr] of groups) {
  const sorted = arr.map((o) => o.price).sort((a, b) => a - b);
  const median = sorted[Math.floor(sorted.length / 2)];
  for (const o of arr) {
    const dev = Math.abs(o.price / median - 1);
    if (dev > 0.25) err(`id ${o.id}: precio ${o.price} fuera de banda en ${k} (mediana ${median}, desvío ${(dev * 100).toFixed(0)}%)`);
  }
  // 5. SPREAD (aviso, no error): la convención demo es compra > venta,
  //    pero una rebaja deliberada puede invertirlo o tocarlo.
  const buys = arr.filter((o) => o.side === 'buy').map((o) => o.price);
  const sells = arr.filter((o) => o.side === 'sell').map((o) => o.price);
  if (buys.length && sells.length && Math.min(...buys) <= Math.max(...sells)) {
    warn(`spread tocado en ${k}: compra mínima ${Math.min(...buys)} <= venta máxima ${Math.max(...sells)} (ids ${arr.filter((o) => o.side === 'buy').map((o) => o.id).join(',')} / ${arr.filter((o) => o.side === 'sell').map((o) => o.id).join(',')})`);
  }
}

// 6. Tiles sin ofertas (aviso).
for (const [method, fiat] of TILES) {
  if (!OFFERS.some((o) => o.payment_method === method && o.sell_currency === fiat)) {
    warn(`tile sin ofertas: ${method} + ${fiat}`);
  }
}

// 7. Duplicados (aviso informativo: mismo anunciante con el mismo combo
//    dos veces huele a copiar-pegar; dos anunciantes distintos con el
//    mismo combo es competencia normal y no avisa).
const combos = new Map();
for (const o of OFFERS) {
  const k = `${o.buy_currency}/${o.sell_currency}/${o.payment_method}/${o.side}/${o.advertiser_name}`;
  if (!combos.has(k)) combos.set(k, []);
  combos.get(k).push(o.id);
}
for (const [k, comboIds] of combos) if (comboIds.length > 1) warn(`combo duplicado ${k}: ids ${comboIds.join(', ')}`);

// Informe.
const byCrypto = {};
const byFiat = {};
const byMethod = {};
for (const o of OFFERS) {
  byCrypto[o.buy_currency] = (byCrypto[o.buy_currency] || 0) + 1;
  byFiat[o.sell_currency] = (byFiat[o.sell_currency] || 0) + 1;
  byMethod[o.payment_method] = (byMethod[o.payment_method] || 0) + 1;
}
console.log(`Ofertas: ${OFFERS.length} (compra ${OFFERS.filter((o) => o.side === 'buy').length}, venta ${OFFERS.filter((o) => o.side === 'sell').length}), ${groups.size} grupos crypto x fiat`);
console.log(`Por crypto: ${Object.entries(byCrypto).map(([k, v]) => `${k} ${v}`).join(', ')}`);
console.log(`Por fiat: ${Object.entries(byFiat).map(([k, v]) => `${k} ${v}`).join(', ')}`);
console.log(`Por método: ${Object.entries(byMethod).map(([k, v]) => `${k} ${v}`).join(', ')}`);
for (const w of warnings) console.log(`AVISO: ${w}`);
for (const e of errors) console.log(`ERROR: ${e}`);
if (errors.length === 0 && warnings.length === 0) console.log('OK: sin errores ni avisos.');
else console.log(`Resultado: ${errors.length} errores, ${warnings.length} avisos.`);
process.exit(errors.length ? 1 : 0);
