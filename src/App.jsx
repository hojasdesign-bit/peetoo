import React from 'react';
import { Heading } from './ds/components/Heading/Heading.jsx';
import { Text } from './ds/components/Text/Text.jsx';
import { SegmentedControl } from './ds/components/SegmentedControl/SegmentedControl.jsx';
import { Input } from './ds/components/Input/Input.jsx';
import { Select } from './ds/components/Select/Select.jsx';
import { CascadeField } from './ds/components/CascadeField/CascadeField.jsx';
import { Button } from './ds/components/Button/Button.jsx';
import { Badge } from './ds/components/Badge/Badge.jsx';
import { Modal } from './ds/components/Modal/Modal.jsx';
import { Pagination } from './ds/components/Pagination/Pagination.jsx';
import { AssetPair } from './ds/components/AssetPair/AssetPair.jsx';
import { TraderCell } from './ds/components/TraderCell/TraderCell.jsx';
import { OverflowChips } from './ds/components/OverflowChips/OverflowChips.jsx';
import { NetworkChip } from './ds/components/NetworkChip/NetworkChip.jsx';
import { PageBackground } from './ds/components/PageBackground/PageBackground.jsx';
import { DropdownMenu } from './ds/components/DropdownMenu/DropdownMenu.jsx';
import { OFFERS, ASSETS, CHAIN_SHORT, CHAIN_COLORS, CHAIN_SRC } from './data/offers.js';
import { SWAPPED_EDITORIAL_INTRO, SWAPPED_EDITORIAL, SWAPPED_STATS, SWAPPED_PRECIO_TEXT, SWAPPED_RESOURCES_TEXT, SWAPPED_RESOURCES_LINKS, SWAPPED_FAQS, SWAPPED_MORE_CRYPTOS, SWAPPED_METHODS } from './data/swappedPage.js';
import { SwappedStepVisual } from './components/SwappedStepVisuals.jsx';
import { SwappedMethodIcon } from './components/SwappedMethodIcon.jsx';
import logoUrl from './assets/logo.svg';
import checkIcon from './assets/icons/check.svg';
import botIcon from './assets/icons/bot.svg';
import usdcIcon from './assets/coins/usdc.svg';
import usdtIcon from './assets/coins/usdt.svg';
import pyusdIcon from './assets/coins/pyusd.svg';
import ousdIcon from './assets/coins/ousd.svg';
import eurcIcon from './assets/coins/eurc.svg';
import zelleIcon from './assets/coins/zelle.svg';
import usatIcon from './assets/coins/usat.svg';
import { cupPng, usdPng, eurPng, mxnPng, cadPng } from './assets/coins/fiat-images.js';
import placeholderGenericIcon from './assets/coins/placeholder-generic.svg';

/**
 * peetoo · Mercado Crypto.
 * Reconstrucción de /p2p/crypto/ del repo original con el lenguaje visual
 * del Crypto DS: sin menú lateral, tabla densa de ofertas y la misma barra
 * de filtros (lado, cantidad+moneda, blockchain, método, moneda de venta).
 * Datos de solo muestra; no hay operaciones reales.
 */

const PAGE_SIZE = 6;
const fmt = (n) => n.toLocaleString('es-ES');
const fmt2 = (n) => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const uniq = (arr) => [...new Set(arr)].sort();
const toTrader = (o) => ({
  name: o.advertiser_name,
  verified: o.advertiser_verified,
  verification: o.advertiser_premium ? 'premium' : 'standard',
  trades: o.advertiser_trades,
  completion: o.advertiser_completion,
});
const DepositIcon = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-label="Depósito en garantía realizado">
    <path d="M21 11V13C21 16.7712 21 18.6569 19.8284 19.8284C18.6569 21 16.7712 21 13 21H11C7.22876 21 5.34315 21 4.17157 19.8284C3 18.6569 3 16.7712 3 13V11C3 7.22876 3 5.34315 4.17157 4.17157C5.34315 3 7.22876 3 11 3H13C16.7712 3 18.6569 3 19.8284 4.17157C21 5.34315 21 7.22876 21 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function App() {
  const [side, setSide] = React.useState('buy');
  const [buyCurrency, setBuyCurrency] = React.useState('all');
  const [amount, setAmount] = React.useState('');
  const [payment, setPayment] = React.useState('all');
  const [chain, setChain] = React.useState('all');
  const [sellCurrency, setSellCurrency] = React.useState('all');
  const [page, setPage] = React.useState(1);
  // El ordenar va en
  // la barra (no dentro del agrupador) y el agrupador lleva solo
  // filtros ocultos. La ubicación NO existe en los datos ni sale en
  // la tabla: se deriva del id de la oferta para probar el filtro sin
  // tocar los datos ni añadir columnas.
  // Ordenar: precio menor a mayor es el orden actual por defecto.
  const [sortBy, setSortBy] = React.useState('price-asc');
  const TEST_LOCATIONS = ['La Habana', 'Santiago de Cuba', 'Camagüey', 'Holguín', 'Villa Clara', 'Matanzas'];
  // Por pareja compra/venta (cada par comparte ubicación) para que cada
  // lado tenga las 6 ubicaciones: 7 ofertas de compra y 7 de venta cada una.
  const offerLocation = (o) => TEST_LOCATIONS[Math.floor((o.id - 1) / 2) % TEST_LOCATIONS.length];
  const TEST_ADVERTISERS = uniq(OFFERS.map((o) => o.advertiser_name));
  const [locationFilter, setLocationFilter] = React.useState('all');
  // Ranking = valoración del anunciante (% de operaciones completadas).
  const [rankingFilter, setRankingFilter] = React.useState('all');
  const [advertiserFilter, setAdvertiserFilter] = React.useState('all');
  // Depósito: si la oferta ya tiene depósito realizado o no.
  const [depositFilter, setDepositFilter] = React.useState('all');
  const [moreFiltersOpen, setMoreFiltersOpen] = React.useState(false);
  const moreFiltersBtnRef = React.useRef(null);
  const moreFiltersPanelRef = React.useRef(null);
  const [moreFiltersPos, setMoreFiltersPos] = React.useState(null);
  // Orden de los CascadeField: false = [crypto, fiat] (cantidad en fiat),
  // true = [fiat, crypto] (cantidad en crypto). El botón de intercambio
  // invierte este orden; el lado Comprar/Vender NO cambia.
  const [cascadesSwapped, setCascadesSwapped] = React.useState(false);
  // Lado efectivo de los resultados: el toggle (side) es la elección
  // explícita del usuario y el intercambio NO lo toca; pero al invertir
  // los pares, la dirección efectiva se invierte (con los campos
  // intercambiados se muestran las ofertas del lado contrario). Todo lo
  // que describe resultados (filtro, verbo, dirección del par) usa
  // effectiveSide; solo el SegmentedControl muestra side.
  const effectiveSide = cascadesSwapped ? (side === 'buy' ? 'sell' : 'buy') : side;
  // Vista: 'market' o 'swapped'. La página /swapped es una vista de la
  // app (no una página estática): así mantiene el header y los enlaces
  // se comportan igual que en el mercado. La vista inicial sale de la
  // URL para que /swapped abra directo en el widget.
  const isSwappedPath = () => window.location.pathname.replace(/\.html$/, '') === '/swapped';
  const [view, setView] = React.useState(isSwappedPath() ? 'swapped' : 'market');
  // Lado de la página de Swapped (toggle Comprar/Vender): lo fija la
  // tarjeta del menú Swapped; por defecto Comprar. La página es
  // genérica, sin énfasis a ninguna moneda: el widget arranca en BTC
  // (su moneda por defecto) y dentro de él se puede cambiar.
  const [swappedSide, setSwappedSide] = React.useState('buy');
  // FAQ de la página de Swapped: la primera abierta, como en la referencia.
  const [swappedFaqOpen, setSwappedFaqOpen] = React.useState(0);
  const swappedStatsRef = React.useRef(null);
  const pendingMarketScroll = React.useRef(false);
  const goSwapped = (e) => {
    if (e) e.preventDefault();
    if (view === 'swapped') return;
    window.history.pushState(null, '', '/swapped');
    setView('swapped');
  };
  // Tarjetas del menú Swapped: llevan a la misma página (/swapped) con
  // el lado ya elegido; el toggle de la página solo cambia el lado.
  const goSwappedSide = (side) => {
    setSwappedSide(side);
    setSwappedMenuOpen(false);
    setHamburgerOpen(false);
    goSwapped();
  };
  // Ir al mercado y desplazarlo a la vista: desde la vista del widget
  // primero navega; el mercado se renderiza tras el cambio de estado y
  // el desplazamiento lo hace el efecto de abajo.
  const goToMarket = () => {
    if (view === 'swapped') {
      pendingMarketScroll.current = true;
      window.history.pushState(null, '', '/');
      setView('market');
    } else {
      document.querySelector('.market')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  React.useEffect(() => {
    if (view === 'market' && pendingMarketScroll.current) {
      pendingMarketScroll.current = false;
      document.querySelector('.market')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [view]);
  React.useEffect(() => {
    const onPop = () => setView(isSwappedPath() ? 'swapped' : 'market');
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  const [selected, setSelected] = React.useState(null);
  const [modalAmount, setModalAmount] = React.useState('');
  const [modalChain, setModalChain] = React.useState('');
  const [orderDone, setOrderDone] = React.useState(false);
  const [theme, setTheme] = React.useState('oscuro');

  // Submenú «Comprar crypto» del header: la versión planteada en el DS
  // (Header v1.10 + DropdownMenu): mega-panel con intro, monedas y
  // enlaces; apertura por hover (150ms de margen al salir) y clic
  // como respaldo; en móvil (≤720px) la variante acordeón del propio
  // DropdownMenu. Los botones de moneda son los MenuCoinButton del DS
  // (símbolo en círculo de color + «Comprar X» + código).
  const buyDropdown = {
    intro: {
      title: 'Comprar crypto',
      description: 'Compra stablecoins directamente entre personas, con ofertas publicadas por otros usuarios.',
    },
    // Orden: agrupado por emisor y, dentro de cada emisor, por
    // importancia (Tether, Circle, PayPal, Zelle, Origin). MXNT y RLUSD
    // ocultas a petición (2026-10-28).
    coins: [
      { symbol: '₮', color: '#26a17b', label: 'Comprar USDT', code: 'USDT', src: usdtIcon },
      // USAT: escudo oficial (Brandfetch) sobre azul marino #132A55, el
      // color del propio escudo, para que las esquinas del círculo fundan.
      { symbol: 'U', color: '#132A55', label: 'Comprar USAT', code: 'USAT', src: usatIcon },
      { symbol: '$', color: '#2775ca', label: 'Comprar USDC', code: 'USDC', src: usdcIcon },
      { symbol: '€', color: '#2775ca', label: 'Comprar EURC', code: 'EURC', src: eurcIcon },
      { symbol: 'P', color: '#003087', label: 'Comprar PYUSD', code: 'PYUSD', src: pyusdIcon },
      // ZLUSD: marca Zelle (Simple Icons, CC0) en morado #6d1ed4; aún no
      // hay logo propio del token publicado.
      { symbol: 'Z', color: '#6d1ed4', label: 'Comprar ZLUSD', code: 'ZLUSD', src: zelleIcon },
      { symbol: 'O', color: '#3a3a44', label: 'Comprar OUSD', code: 'OUSD', src: ousdIcon },
      // Último tile: no es una moneda; abre el mercado de compra sin
      // filtro de moneda (código vacío → rama de etiqueta en onBuyMenuNavigate).
      { symbol: '+', color: '#3a3a44', label: 'Otras monedas', code: '' },
    ],
    links: [
      { label: 'Vender crypto' },
      { label: 'Todas las ofertas' },
    ],
  };
  const [buyMenuOpen, setBuyMenuOpen] = React.useState(false);
  // Declarado aquí (no en el bloque fiat) porque el efecto de cierre
  // por clic fuera evalúa fiatMenuOpen en su array de dependencias
  // durante el render; declararlo después rompería con TDZ.
  const [fiatMenuOpen, setFiatMenuOpen] = React.useState(false);
  // Menú Swapped del header: dos tarjetas (Comprar / Vender), como el
  // menú Productos de swapped.com. Mismo patrón que los otros menús:
  // hover en escritorio (150ms de margen), clic como respaldo.
  const [swappedMenuOpen, setSwappedMenuOpen] = React.useState(false);
  const swappedMenuTimer = React.useRef(null);
  const cancelSwappedMenuClose = () => {
    if (swappedMenuTimer.current) { clearTimeout(swappedMenuTimer.current); swappedMenuTimer.current = null; }
  };
  const scheduleSwappedMenuClose = () => {
    cancelSwappedMenuClose();
    swappedMenuTimer.current = setTimeout(() => setSwappedMenuOpen(false), 150);
  };
  const openSwappedMenu = () => {
    if (isNarrow) return;
    cancelSwappedMenuClose(); setSwappedMenuOpen(true); setBuyMenuOpen(false); setFiatMenuOpen(false);
  };
  // Menú hamburguesa (móvil ≤720px, como en swapped.com/es/): el botón
  // va en la fila del header y el panel contiene las dos secciones
  // desplegables + el enlace a Swapped + la insignia Demo.
  const [hamburgerOpen, setHamburgerOpen] = React.useState(false);
  const buyMenuRef = React.useRef(null);
  const buyMenuTimer = React.useRef(null);
  const cancelBuyMenuClose = () => {
    if (buyMenuTimer.current) { clearTimeout(buyMenuTimer.current); buyMenuTimer.current = null; }
  };
  const scheduleBuyMenuClose = () => {
    cancelBuyMenuClose();
    buyMenuTimer.current = setTimeout(() => setBuyMenuOpen(false), 150);
  };
  // En móvil no hay hover: el tap emula mouseenter + clic, y abrir por
  // hover + alternar por clic se cancelarían. Como en el DS (hover en
  // escritorio, clic en móvil), el hover solo abre fuera de móvil.
  const openBuyMenu = () => {
    if (isNarrow) return;
    cancelBuyMenuClose(); setBuyMenuOpen(true); setFiatMenuOpen(false); setSwappedMenuOpen(false);
  };
  React.useEffect(() => () => { cancelBuyMenuClose(); cancelFiatMenuClose(); cancelSwappedMenuClose(); }, []);
  const [isNarrow, setIsNarrow] = React.useState(() => window.matchMedia('(max-width: 720px)').matches);
  React.useEffect(() => {
    const mq = window.matchMedia('(max-width: 720px)');
    const fn = () => setIsNarrow(mq.matches);
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, []);
  React.useEffect(() => {
    if (!buyMenuOpen && !fiatMenuOpen && !hamburgerOpen && !swappedMenuOpen) return undefined;
    const onPointerDown = (e) => {
      if (buyMenuRef.current && !buyMenuRef.current.contains(e.target)) { setBuyMenuOpen(false); setFiatMenuOpen(false); setHamburgerOpen(false); setSwappedMenuOpen(false); }
    };
    const onKey = (e) => { if (e.key === 'Escape') { setBuyMenuOpen(false); setFiatMenuOpen(false); setHamburgerOpen(false); setSwappedMenuOpen(false); } };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [buyMenuOpen, fiatMenuOpen, hamburgerOpen, swappedMenuOpen]);
  const buyCoin = (code) => {
    clearFilters();
    setSide('buy'); setBuyCurrency(code); setChain('all'); setPage(1);
    setBuyMenuOpen(false);
    goToMarket();
  };
  // El DropdownMenu entrega un único onNavigate con el evento: los
  // botones de moneda llevan el código en su tercer span y los enlaces
  // solo texto, así se distingue la acción sin tocar el componente.
  // El tile «Otras monedas» lleva el código vacío y cae en la rama de
  // etiqueta: compra sin filtro de moneda.
  const onBuyMenuNavigate = (e) => {
    e.preventDefault();
    cancelBuyMenuClose();
    setBuyMenuOpen(false); setHamburgerOpen(false);
    const el = e.currentTarget;
    const codeEl = el.children && el.children[2];
    if (codeEl && codeEl.textContent) {
      buyCoin(codeEl.textContent.trim());
      return;
    }
    const label = el.textContent.trim();
    if (label.includes('Vender crypto')) {
      clearFilters(); setSide('sell'); goToMarket();
    } else if (label.includes('Todas las ofertas')) {
      clearFilters(); goToMarket();
    } else if (label.includes('Otras monedas')) {
      clearFilters(); setSide('buy'); goToMarket();
    }
  };


  // Submenú «Comprar fiat» del header: mismo DropdownMenu del DS que
  // el de crypto. Comprar una fiat = ofertas de venta en las que la
  // recibes (vendes crypto y te pagan en esa fiat). Como el enlace dice
  // Comprar, el par fiat va en el lado Comprar (izquierda): con los
  // campos intercambiados y el toggle en Comprar, el lado efectivo es
  // venta y los resultados son los mismos de antes, solo cambia la
  // posición del par. Al fijar la fiat se reinicia el método de pago
  // (primer campo de la cascada fiat, del que depende la segunda),
  // igual que el menú crypto reinicia la red.
  const fiatDropdown = {
    intro: {
      title: 'Comprar fiat',
      description: 'Elige una fiat y verás las ofertas para comprarla vendiendo crypto.',
    },
    coins: [
      { symbol: '$', color: '#D64545', label: 'Comprar CUP', code: 'CuPcash', src: cupPng, method: 'Efectivo', currency: 'CUP' },
      { symbol: '$', color: '#2E7D32', label: 'Comprar USD', code: 'USDcash', src: usdPng, method: 'Efectivo', currency: 'USD' },
      { symbol: 'Z', color: '#6d1ed4', label: 'Comprar Zelle', code: 'ZELLE', method: 'Zelle', currency: 'USD' },
      { symbol: '$', color: '#006847', label: 'Comprar MXN', code: 'MXNcash', src: mxnPng },
      { symbol: '€', color: '#003399', label: 'Comprar EUR', code: 'EURcash', src: eurPng },
      { symbol: 'T', color: '#3a3a44', label: 'Comprar Transferencia', code: 'TRANSF', method: 'Transferencia Bancaria', currency: 'all' },
      { symbol: 'E', color: '#3a3a44', label: 'Comprar Etecsa', code: 'ETECSA' },
      { symbol: '$', color: '#D80621', label: 'Comprar CAD', code: 'CADcash', src: cadPng },
      { symbol: 'C', color: '#3a3a44', label: 'Comprar Clásica', code: 'CLASICA' },
      { symbol: '$', color: '#0F766E', label: 'Comprar MLC', code: 'MLC' },
      // Último tile: quita solo el filtro de fiat (código vacío → rama
      // de etiqueta en onFiatMenuNavigate), sin tocar el resto.
      { symbol: '+', color: '#3a3a44', label: 'Todas las fiat', code: '' },
    ],
    links: [
      { label: 'Todas las ofertas' },
    ],
  };
  const fiatMenuTimer = React.useRef(null);
  const cancelFiatMenuClose = () => {
    if (fiatMenuTimer.current) { clearTimeout(fiatMenuTimer.current); fiatMenuTimer.current = null; }
  };
  const scheduleFiatMenuClose = () => {
    cancelFiatMenuClose();
    fiatMenuTimer.current = setTimeout(() => setFiatMenuOpen(false), 150);
  };
  // En móvil no hay hover, igual que el menú crypto: el hover solo abre
  // fuera de móvil. Abrir un menú cierra el otro.
  const openFiatMenu = () => {
    if (isNarrow) return;
    cancelFiatMenuClose(); setFiatMenuOpen(true); setBuyMenuOpen(false); setSwappedMenuOpen(false);
  };
  const fiatFilter = (code) => {
    const coin = fiatDropdown.coins.find((c) => c.code === code) || {};
    // Par del tile si lo trae; si no, moneda = ticker (o su moneda
    // cash) y método abierto. Pendiente de que aclare ticker, nombre
    // y logo de los nuevos métodos/monedas.
    const cashToCurrency = { USDcash: 'USD', CuPcash: 'CUP', EURcash: 'EUR', MXNcash: 'MXN', CADcash: 'CAD' };
    clearFilters();
    // La fiat comprada va en el lado Comprar: campos intercambiados y
    // toggle en Comprar → lado efectivo venta → mismos resultados.
    setCascadesSwapped(true);
    setSide('buy');
    setPayment(coin.method || 'all');
    setSellCurrency(coin.currency ?? (cashToCurrency[code] || code));
    setPage(1);
    setFiatMenuOpen(false);
    goToMarket();
  };
  // Igual que onBuyMenuNavigate: el código va en el tercer span del
  // botón de moneda; el tile «Todas las fiat» lleva el código vacío y
  // cae en la rama de etiqueta.
  const onFiatMenuNavigate = (e) => {
    e.preventDefault();
    cancelFiatMenuClose();
    setFiatMenuOpen(false); setHamburgerOpen(false);
    const el = e.currentTarget;
    const codeEl = el.children && el.children[2];
    if (codeEl && codeEl.textContent) {
      fiatFilter(codeEl.textContent.trim());
      return;
    }
    const label = el.textContent.trim();
    if (label.includes('Todas las fiat')) {
      // Igual que los demás tiles del menú Comprar fiat: sin filtro de
      // fiat, pero en el lado Comprar y con ofertas de venta.
      clearFilters(); setCascadesSwapped(true); setSide('buy'); goToMarket();
    } else if (label.includes('Todas las ofertas')) {
      clearFilters(); goToMarket();
    }
  };

  // Tema como en el footer de la app original: Oscuro / Claro / Sistema
  // (Sistema sigue la preferencia del sistema operativo).
  React.useEffect(() => {
    const apply = () => {
      const light = theme === 'claro'
        || (theme === 'sistema' && window.matchMedia('(prefers-color-scheme: light)').matches);
      if (light) document.documentElement.dataset.theme = 'claro';
      else delete document.documentElement.dataset.theme;
    };
    apply();
    if (theme === 'sistema') {
      const mq = window.matchMedia('(prefers-color-scheme: light)');
      mq.addEventListener('change', apply);
      return () => mq.removeEventListener('change', apply);
    }
  }, [theme]);

  const paymentOptions = uniq(OFFERS.flatMap((o) => o.payment_methods));
  const chainOptions = uniq(OFFERS.flatMap((o) => o.blockchains));
  const buyOptions = uniq(OFFERS.map((o) => o.buy_currency));
  const sellOptions = uniq(OFFERS.map((o) => o.sell_currency));

  // Cascadas reales derivadas de las ofertas: las monedas crypto
  // dependen de la red elegida y las monedas de venta del método elegido.
  const currenciesForChain = (ch) => {
    const curs = ch === 'all'
      ? buyOptions
      : uniq(OFFERS.filter((o) => o.blockchains.includes(ch)).map((o) => o.buy_currency));
    // La moneda elegida desde el header puede no tener ofertas (PYUSD,
    // ZLUSD, OUSD): si está seleccionada, se añade para que el segundo
    // campo pueda mostrarla aunque la lista derive de las ofertas.
    if (buyCurrency !== 'all' && !curs.includes(buyCurrency)) curs.push(buyCurrency);
    return curs.map((c) => ({ value: c, label: c }));
  };
  const currenciesForMethod = (method) => {
    const curs = method === 'all'
      ? sellOptions
      : uniq(OFFERS.filter((o) => o.payment_methods.includes(method)).map((o) => o.sell_currency));
    // Como en currenciesForChain: la moneda elegida desde el header puede
    // no tener ofertas (EURcash, MXNcash, CADcash): si está seleccionada,
    // se añade para que el segundo campo pueda mostrarla aunque la lista
    // derive de las ofertas.
    if (sellCurrency !== 'all' && !curs.includes(sellCurrency)) curs.push(sellCurrency);
    return curs.map((c) => ({ value: c, label: c }));
  };

  // Misma lógica de filtrado que MarketOffers del repo original.
  const parsedAmount = Number.parseFloat(amount);
  const filtered = OFFERS.filter((o) => {
    if (o.side !== effectiveSide) return false;
    if (buyCurrency !== 'all' && o.buy_currency !== buyCurrency) return false;
    if (payment !== 'all' && !o.payment_methods.includes(payment)) return false;
    if (chain !== 'all' && !o.blockchains.includes(chain)) return false;
    if (sellCurrency !== 'all' && o.sell_currency !== sellCurrency) return false;
    // filtros ocultos del agrupador (la ubicación es un dato
    // derivado: no existe en la oferta ni se muestra en la tabla).
    if (locationFilter !== 'all' && offerLocation(o) !== locationFilter) return false;
    if (rankingFilter !== 'all' && o.advertiser_completion < Number(rankingFilter)) return false;
    if (advertiserFilter !== 'all' && o.advertiser_name !== advertiserFilter) return false;
    if (depositFilter === 'yes' && !o.deposit_made) return false;
    if (depositFilter === 'no' && o.deposit_made) return false;
    if (!Number.isNaN(parsedAmount) && parsedAmount > 0) {
      // La cantidad se busca en la moneda del SEGUNDO CascadeField: con
      // el orden por defecto [crypto, fiat] es fiat y se compara directa
      // con el rango mín-máx; con los campos intercambiados [fiat,
      // crypto] es crypto y se convierte por el precio de la oferta
      // (misma conversión que PriceCell: precio × cantidad) antes de
      // comparar con el rango.
      const fiatAmount = cascadesSwapped ? parsedAmount * o.price : parsedAmount;
      if (fiatAmount < o.min_amount || fiatAmount > o.max_amount) return false;
    }
    return true;
  }).sort((a, b) => {
    // el ordenar de la barra (por defecto, precio menor a
    // mayor, que es el orden actual sin tocar).
    switch (sortBy) {
      case 'price-desc': return b.price - a.price;
      case 'available-desc': return b.available - a.available;
      case 'min-asc': return a.min_amount - b.min_amount;
      case 'max-desc': return b.max_amount - a.max_amount;
      case 'rating-desc': return (b.advertiser_completion - a.advertiser_completion) || (b.advertiser_trades - a.advertiser_trades);
      default: return a.price - b.price;
    }
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageOffers = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const from = filtered.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const to = Math.min(currentPage * PAGE_SIZE, filtered.length);

  const upd = (setter) => (v) => { setter(v); setPage(1); };
  const updEvent = (setter, clean) => (e) => { setter(clean ? clean(e.target.value) : e.target.value); setPage(1); };
  const clearFilters = () => {
    setBuyCurrency('all'); setAmount(''); setPayment('all'); setSellCurrency('all'); setChain('all'); setPage(1);
    // Restaurar el orden por defecto: las selecciones del menú y el
    // botón Eliminar filtros parten de cero, y con el orden restaurado
    // el lado efectivo vuelve a ser el del toggle (si no, el menú
    // prometería una dirección y se mostraría la contraria).
    setCascadesSwapped(false);
    // el restablecido también limpia el panel oculto y el
    // ordenar de la barra (vuelve al orden por defecto).
    setSortBy('price-asc'); setLocationFilter('all'); setRankingFilter('all'); setAdvertiserFilter('all'); setDepositFilter('all'); setMoreFiltersOpen(false);
  };
  // el panel oculto es fixed (la fila de filtros desplaza en
  // horizontal y recortaría un panel absoluto) y se posiciona desde el
  // rect del botón, sujeto al borde derecho y por encima si abajo no
  // cabe; se cierra al pulsar fuera o con Escape.
  React.useLayoutEffect(() => {
    if (!moreFiltersOpen) return undefined;
    const place = () => {
      const btn = moreFiltersBtnRef.current;
      const panel = moreFiltersPanelRef.current;
      if (!btn || !panel) return;
      const r = btn.getBoundingClientRect();
      const w = 300;
      const left = Math.max(8, Math.min(r.left, window.innerWidth - w - 8));
      if (window.innerWidth <= 720) {
        // Móvil: el panel es un modal inferior (bottom sheet):
        // todo el ancho, pegado abajo, altura máxima del 85% de la
        // pantalla y desplazamiento interno.
        setMoreFiltersPos({ top: 'auto', left: 0, right: 0, bottom: 0, maxHeight: '85vh' });
        return;
      }
      const h = panel.offsetHeight;
      const top = r.bottom + 8 + h <= window.innerHeight ? r.bottom + 8 : Math.max(8, r.top - 8 - h);
      setMoreFiltersPos({ top, left });
    };
    place();
    window.addEventListener('scroll', place, true);
    window.addEventListener('resize', place);
    const onDown = (e) => {
      if (moreFiltersPanelRef.current && !moreFiltersPanelRef.current.contains(e.target)
        && moreFiltersBtnRef.current && !moreFiltersBtnRef.current.contains(e.target)) setMoreFiltersOpen(false);
    };
    const onKey = (e) => { if (e.key === 'Escape') setMoreFiltersOpen(false); };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('scroll', place, true);
      window.removeEventListener('resize', place);
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [moreFiltersOpen]);
  // Intercambiar los CascadeField: invierte su orden en la barra y con
  // ello la moneda en la que se busca la cantidad (segundo campo: fiat
  // por defecto, crypto tras intercambiar) Y la dirección efectiva de
  // los resultados: lo que se compraba pasa a venderse y viceversa, así
  // que los resultados cambian de ofertas de compra a ofertas de venta
  // (y al revés). El toggle NO se toca: su estado queda intacto y solo
  // cambia el lado efectivo (effectiveSide). Ningún valor cambia
  // (cantidad, red, moneda crypto, método, moneda fiat y filtros del
  // menú se mantienen). Tampoco intercambia la moneda crypto con la
  // fíat: eso dejaba valores inválidos con los pares unidos (por eso
  // se quitó en v2.3).
  const swapCascadesOrder = () => { setCascadesSwapped((v) => !v); setPage(1); };
  const verb = effectiveSide === 'buy' ? 'Comprar' : 'Vender';
  const openModal = (o) => {
    setSelected(o); setModalAmount(''); setModalChain(o.blockchains[0] || ''); setOrderDone(false);
  };
  const closeModal = () => { setSelected(null); setOrderDone(false); };
  const modalParsed = Number.parseFloat(modalAmount);
  const modalValid = selected && !Number.isNaN(modalParsed) && modalParsed >= selected.min_amount && modalParsed <= selected.max_amount;

  const priceMain = (o) => {
    const valid = !Number.isNaN(parsedAmount) && parsedAmount > 0;
    return `${fmt2(valid ? o.price * parsedAmount : o.price)} ${o.sell_currency}`;
  };
  const priceNote = (o) => {
    const valid = !Number.isNaN(parsedAmount) && parsedAmount > 0;
    return `${valid ? amount : 1} ${o.buy_currency}`;
  };

  const renderChains = (o) => (
    <OverflowChips
      items={o.blockchains}
      maxVisible={2}
      renderItem={(c) => <NetworkChip name={c} symbol={CHAIN_SHORT[c]} color={CHAIN_COLORS[c]} src={CHAIN_SRC[c]} />}
    />
  );

  // Los dos pares del filtro, como objetos de props: cada par sigue
  // ligado a su dominio (crypto: red+moneda; fiat: método+moneda) y los
  // pares son lo que intercambia de sitio (solo el botón de intercambio
  // y el menú fiat los mueven). Los labels de compra y venta NO viajan
  // con los pares: van ligados al toggle (izquierda = valor del toggle,
  // derecha = el contrario). Así el intercambio no cambia los labels y
  // el toggle los invierte: con el toggle en Vender, el primero es
  // Vender y el último Comprar, y el label de la izquierda siempre
  // describe el papel del par que ocupa esa posición en la búsqueda
  // efectiva. Las claves ligadas al par son obligatorias: al cambiar de
  // sitio el componente se vuelve a montar con las props del par, y así
  // el texto del primer campo (estado local del CascadeField,
  // sincronizado solo cuando cambia value.first) arranca correcto
  // incluso cuando ambos valen 'all'.
  const cryptoPair = {
    firstPlaceholder: 'Blockchain',
    firstAriaLabel: 'Red blockchain',
    options: [{ value: 'all', label: 'Cualquier blockchain' }, ...chainOptions.map((c) => ({ value: c, label: c }))],
    optionsFor: currenciesForChain,
    value: { first: chain, second: buyCurrency === 'all' ? null : buyCurrency },
    onChange: ({ first, second }) => { setChain(first ?? 'all'); setBuyCurrency(second ?? 'all'); setPage(1); },
  };
  const fiatPair = {
    firstPlaceholder: 'Método',
    firstAriaLabel: 'Método de pago',
    options: [{ value: 'all', label: 'Cualquier método' }, ...paymentOptions.map((c) => ({ value: c, label: c }))],
    optionsFor: currenciesForMethod,
    value: { first: payment, second: sellCurrency === 'all' ? null : sellCurrency },
    onChange: ({ first, second }) => { setPayment(first ?? 'all'); setSellCurrency(second ?? 'all'); setPage(1); },
  };
  const leftPair = cascadesSwapped ? fiatPair : cryptoPair;
  const rightPair = cascadesSwapped ? cryptoPair : fiatPair;
  const leftCascade = (
    <CascadeField
      key={cascadesSwapped ? 'fiat' : 'crypto'}
      className="filter-cascade"
      secondPlaceholder={side === 'buy' ? 'Comprar' : 'Vender'}
      secondAriaLabel={side === 'buy' ? 'Moneda a comprar' : 'Moneda a vender'}
      {...leftPair}
    />
  );
  const rightCascade = (
    <CascadeField
      key={cascadesSwapped ? 'crypto' : 'fiat'}
      className="filter-cascade"
      secondPlaceholder={side === 'buy' ? 'Vender' : 'Comprar'}
      secondAriaLabel={side === 'buy' ? 'Moneda a vender' : 'Moneda a comprar'}
      {...rightPair}
    />
  );
  const swapButton = (
    <Button
      onClick={swapCascadesOrder}
      className="filter-swap"
      aria-label="Alternar la cantidad entre fiat y crypto"
      title="Alternar la cantidad entre fiat y crypto"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M19.9999 17L3.99994 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17 14C17 14 19.9999 16.2095 19.9999 17C19.9999 17.7906 16.9999 20 16.9999 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4.99994 7L19.9999 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6.99992 4C6.99992 4 3.99995 6.20947 3.99994 7.00002C3.99993 7.79058 6.99994 10 6.99994 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Button>
  );

  // Contenido de la página de Swapped: el mismo de las páginas de
  // Swapped (/buy/usdc y /sell/usdc) pero genérico, sin énfasis a
  // ninguna moneda. El bloque editorial sobre USDC (qué es, precio,
  // estadísticas, FAQ) no entra: es contenido de USDC, no de la página.
  const swappedContent = swappedSide === 'buy' ? {
    title: 'Comprar USDC hecho simple',
    description: 'Swapped.com ofrece una forma rápida y fácil de comprar USDC (USDC) con tarjeta de crédito o débito, transferencia bancaria, Apple Pay, Google Pay y más.',
    stepsTitle: 'Cómo comprar USDC en 3 pasos sencillos',
    steps: [
      { title: 'Seleccionar', text: 'Ingresa cuánto USDC quieres comprar.', visual: 'buy-select' },
      { title: 'Pagar', text: 'Paga usando uno de 40+ métodos de pago.', visual: 'pay' },
      { title: 'Recibir', text: 'Recibe el USDC en tu billetera.', visual: 'receive-wallet' },
    ],
  } : {
    title: 'Vender USDC hecho simple',
    description: 'Swapped.com ofrece una forma rápida y fácil de vender USDC (USDC) con tarjeta de crédito o débito, transferencia bancaria, Apple Pay, Google Pay y más.',
    stepsTitle: 'Cómo vender USDC en 3 pasos sencillos',
    steps: [
      { title: 'Seleccionar', text: 'Selecciona la moneda que quieres recibir.', visual: 'sell-select' },
      { title: 'Enviar', text: 'Envía tu USDC a la dirección de depósito.', visual: 'send' },
      { title: 'Recibir', text: 'Recibe el dinero en tu cuenta bancaria.', visual: 'receive-bank' },
    ],
  };

  // cuántos filtros ocultos están activos (para el contador
  // del botón de icono de Más filtros).
  const moreFiltersCount = [locationFilter, rankingFilter, advertiserFilter, depositFilter].filter((v) => v !== 'all').length
    + (isNarrow && sortBy !== 'price-asc' ? 1 : 0)
    + (isNarrow && chain !== 'all' ? 1 : 0)
    + (isNarrow && payment !== 'all' ? 1 : 0)
    + (isNarrow && (side === 'buy' ? sellCurrency : buyCurrency) !== 'all' ? 1 : 0);

  return (
    <div className={`app${view === 'swapped' ? ' app-swapped' : ''}`}>
      {/* En /swapped el fondo es plano como en la página de Swapped
          (#101010 sin resplandor); en el resto sigue el PageBackground. */}
      <PageBackground glow={view !== 'swapped'} />
      <header
        className="topbar"
        ref={buyMenuRef}
        onMouseEnter={() => { cancelBuyMenuClose(); cancelFiatMenuClose(); cancelSwappedMenuClose(); }}
        onMouseLeave={() => { scheduleBuyMenuClose(); scheduleFiatMenuClose(); scheduleSwappedMenuClose(); }}
      >
        <div className="topbar-row">
          <span className="brand">
            <img src={logoUrl} alt="Zeroo" className="logo-img" />
          </span>
          <span className="topbar-right">
            <span className="buy-menu" onMouseEnter={openBuyMenu}>
              <button
                type="button"
                className={`buy-menu-btn ${buyMenuOpen ? 'buy-menu-btn-open' : ''}`}
                aria-haspopup="menu"
                aria-expanded={buyMenuOpen}
                onClick={() => { setBuyMenuOpen((o) => !o); setFiatMenuOpen(false); setSwappedMenuOpen(false); }}
              >
                Comprar crypto
                <span className="buy-menu-chev" aria-hidden="true" />
              </button>
            </span>
            <span className="fiat-menu" onMouseEnter={openFiatMenu}>
              <button
                type="button"
                className={`fiat-menu-btn ${fiatMenuOpen ? 'fiat-menu-btn-open' : ''}`}
                aria-haspopup="menu"
                aria-expanded={fiatMenuOpen}
                onClick={() => { setFiatMenuOpen((o) => !o); setBuyMenuOpen(false); setSwappedMenuOpen(false); }}
              >
                Comprar fiat
                <span className="fiat-menu-chev" aria-hidden="true" />
              </button>
            </span>
            <span className="swapped-menu" onMouseEnter={openSwappedMenu}>
              <button
                type="button"
                className={`swapped-menu-btn ${swappedMenuOpen ? 'swapped-menu-btn-open' : ''}`}
                aria-haspopup="menu"
                aria-expanded={swappedMenuOpen}
                onClick={() => { setSwappedMenuOpen((o) => !o); setBuyMenuOpen(false); setFiatMenuOpen(false); }}
              >
                Swapped
                <span className="swapped-menu-chev" aria-hidden="true" />
              </button>
            </span>
            <span className="topbar-demo"><Badge variant="lavender">Demo · datos de muestra</Badge></span>
          </span>
          <button
            type="button"
            className={`topbar-burger ${hamburgerOpen ? 'topbar-burger-open' : ''}`}
            aria-label={hamburgerOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={hamburgerOpen}
            onClick={() => { if (hamburgerOpen) { setBuyMenuOpen(false); setFiatMenuOpen(false); setSwappedMenuOpen(false); } setHamburgerOpen((o) => !o); }}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
        {buyMenuOpen && !isNarrow && (
          <DropdownMenu dropdown={buyDropdown} onNavigate={onBuyMenuNavigate} />
        )}
        {fiatMenuOpen && !isNarrow && (
          <DropdownMenu dropdown={fiatDropdown} onNavigate={onFiatMenuNavigate} />
        )}
        {swappedMenuOpen && !isNarrow && (
          <div className="swapped-panel" role="menu" aria-label="Swapped">
            <button type="button" className="swapped-card" role="menuitem" onClick={() => goSwappedSide('buy')}>
              <span className="swapped-card-title">Comprar</span>
              <span className="swapped-card-desc">Compra cripto al instante con tarjeta, transferencia, Apple Pay, Google Pay y más.</span>
            </button>
            <button type="button" className="swapped-card" role="menuitem" onClick={() => goSwappedSide('sell')}>
              <span className="swapped-card-title">Vender</span>
              <span className="swapped-card-desc">Vende tu cripto y recibe el dinero con tu método de pago preferido.</span>
            </button>
          </div>
        )}
        {hamburgerOpen && isNarrow && (
          <nav className="topbar-drawer" aria-label="Menú">
            <button
              type="button"
              className="drawer-section"
              aria-expanded={buyMenuOpen}
              onClick={() => { setBuyMenuOpen((o) => !o); setFiatMenuOpen(false); setSwappedMenuOpen(false); }}
            >
              Comprar crypto
              <span className={`drawer-chev ${buyMenuOpen ? 'drawer-chev-open' : ''}`} aria-hidden="true" />
            </button>
            {buyMenuOpen && (
              <DropdownMenu dropdown={buyDropdown} mobile open={buyMenuOpen} onNavigate={onBuyMenuNavigate} />
            )}
            <button
              type="button"
              className="drawer-section"
              aria-expanded={fiatMenuOpen}
              onClick={() => { setFiatMenuOpen((o) => !o); setBuyMenuOpen(false); setSwappedMenuOpen(false); }}
            >
              Comprar fiat
              <span className={`drawer-chev ${fiatMenuOpen ? 'drawer-chev-open' : ''}`} aria-hidden="true" />
            </button>
            {fiatMenuOpen && (
              <DropdownMenu dropdown={fiatDropdown} mobile open={fiatMenuOpen} onNavigate={onFiatMenuNavigate} />
            )}
            <button
              type="button"
              className="drawer-section"
              aria-expanded={swappedMenuOpen}
              onClick={() => { setSwappedMenuOpen((o) => !o); setBuyMenuOpen(false); setFiatMenuOpen(false); }}
            >
              Swapped
              <span className={`drawer-chev ${swappedMenuOpen ? 'drawer-chev-open' : ''}`} aria-hidden="true" />
            </button>
            {swappedMenuOpen && (
              <div className="swapped-drawer-cards">
                <button type="button" className="swapped-card" onClick={() => goSwappedSide('buy')}>
                  <span className="swapped-card-title">Comprar</span>
                  <span className="swapped-card-desc">Compra cripto al instante con tarjeta, transferencia, Apple Pay, Google Pay y más.</span>
                </button>
                <button type="button" className="swapped-card" onClick={() => goSwappedSide('sell')}>
                  <span className="swapped-card-title">Vender</span>
                  <span className="swapped-card-desc">Vende tu cripto y recibe el dinero con tu método de pago preferido.</span>
                </button>
              </div>
            )}
            <span className="drawer-demo"><Badge variant="lavender">Demo · datos de muestra</Badge></span>
          </nav>
        )}
      </header>

      {view === 'swapped' ? (
        <main className="swapped-stage">
          <div className="swapped-layout">
            {/* Resplandor violeta de la página de Swapped: un div
                absoluto detrás del contenido, como su .glow. */}
            <div className="swapped-glow" aria-hidden="true" />
            <div className="swapped-hero-text">
              {/* El toggle Comprar/Vender va aquí, sobre el título,
                  en el lugar del chip USDC (símbolo y nombre repetidos,
                  sin sentido): el chip queda eliminado. */}
              <SegmentedControl
                ariaLabel="Comprar o vender"
                options={[{ value: 'buy', label: 'Comprar' }, { value: 'sell', label: 'Vender' }]}
                value={swappedSide}
                onChange={setSwappedSide}
                className="swapped-toggle"
              />
              <div className="swapped-hero-copy">
                <Heading level="h1">{swappedContent.title}</Heading>
                <Text tone="muted">{swappedContent.description}</Text>
              </div>
            </div>
            {swappedSide === 'buy' ? (
              <iframe src="https://widget.swapped.com/?currencyCode=USDC" title="Widget de Swapped" allow="clipboard-write" />
            ) : (
              // Sin widget de venta que incrustar: la propia página de
              // Swapped (/sell/usdc) muestra este mismo aviso — las
              // ventas están desactivadas temporalmente.
              <section className="swapped-sell" aria-label="Ventas desactivadas">
                <h2 className="swapped-sell-title">Las ventas de criptomonedas están desactivadas temporalmente</h2>
                <p className="swapped-sell-text">Estamos trabajando para recuperar esta función en un plazo de dos semanas. Aún puedes comprar criptomonedas al instante con tu método de pago preferido.</p>
              </section>
            )}
            <div className="swapped-rest">
            <section className="swapped-steps" aria-label={swappedContent.stepsTitle}>
              <Heading level="h2">{swappedContent.stepsTitle}</Heading>
              <div className="swapped-steps-grid">
                {swappedContent.steps.map((s) => (
                  <article className="swapped-step" key={s.title}>
                    <div className="swapped-step-visual"><SwappedStepVisual variant={s.visual} /></div>
                    <div className="swapped-step-body">
                      <h3 className="swapped-step-title">{s.title}</h3>
                      <p className="swapped-step-text">{s.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
            <section className="swapped-methods" aria-label="Métodos de pago populares">
              <Heading level="h2">Métodos de pago populares</Heading>
              <div className="swapped-methods-grid">
                {SWAPPED_METHODS.map((m) => (
                  <span className={`swapped-method-card${m.startsWith('+') ? ' swapped-method-more' : ''}`} key={m}>
                    {!m.startsWith('+') && (
                      <span className="swapped-method-icon"><SwappedMethodIcon method={m} /></span>
                    )}
                    <span className="swapped-method-name">{m}</span>
                  </span>
                ))}
              </div>
            </section>
          <section className="swapped-editorial" aria-label="Sobre USDC">
            <div className="swapped-editorial-block">
              <p className="swapped-editorial-text">{SWAPPED_EDITORIAL_INTRO}</p>
              <h3 className="swapped-editorial-heading">{SWAPPED_EDITORIAL[0].heading}</h3>
              <div className="swapped-editorial-paras">
                {SWAPPED_EDITORIAL[0].paras.map((para, i) => (
                  <p className="swapped-editorial-text" key={i}>{para}</p>
                ))}
              </div>
            </div>
            {SWAPPED_EDITORIAL.slice(1).map((s) => (
              <div className="swapped-editorial-block" key={s.heading}>
                <h3 className="swapped-editorial-heading">{s.heading}</h3>
                <div className="swapped-editorial-paras">
                  {s.paras.map((para, i) => (
                    <p className="swapped-editorial-text" key={i}>{para}</p>
                  ))}
                </div>
              </div>
            ))}
          </section>
          <section className="swapped-stats" ref={swappedStatsRef} aria-label="Estadísticas de mercado de USDC">
            <h3 className="swapped-stats-heading">USDC (USDC) market stats</h3>
            <p className="swapped-stats-intro">{SWAPPED_STATS.intro}</p>
            <div className="swapped-stats-grid">
              {SWAPPED_STATS.cells.map((c) => (
                <div className="swapped-stat-cell" key={c.label}>
                  <span className="swapped-stat-label">{c.label}</span>
                  <span className="swapped-stat-value">{c.value}</span>
                </div>
              ))}
            </div>
          </section>
          <section className="swapped-info-card" aria-label="Precio de USDC">
            <h3 className="swapped-info-heading">Precio de USDC (USDC), gráficos y estadísticas</h3>
            <p className="swapped-info-text">{SWAPPED_PRECIO_TEXT}</p>
            <div className="swapped-info-links">
              <button type="button" className="swapped-info-link" onClick={() => swappedStatsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>Explorar ↗</button>
              <button type="button" className="swapped-info-link" onClick={() => { setSwappedSide('sell'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Vender USDC ↗</button>
            </div>
          </section>
          <section className="swapped-info-card" aria-label="Recursos sobre USDC">
            <h3 className="swapped-info-heading">Relevant resources for USDC</h3>
            <p className="swapped-info-text">{SWAPPED_RESOURCES_TEXT}</p>
            <div className="swapped-info-links">
              {SWAPPED_RESOURCES_LINKS.map((l) => (
                <a className="swapped-info-link" key={l.label} href={l.href} target="_blank" rel="noreferrer">{l.label} ↗</a>
              ))}
            </div>
          </section>
          <section className="swapped-faq" aria-label="Preguntas frecuentes sobre USDC">
            <Heading level="h2">Preguntas frecuentes sobre USDC</Heading>
            <div className="swapped-faq-list">
              {SWAPPED_FAQS.map((f, i) => (
                <article className="swapped-faq-card" key={f.q}>
                  <button type="button" className="swapped-faq-question" aria-expanded={swappedFaqOpen === i} onClick={() => setSwappedFaqOpen(swappedFaqOpen === i ? -1 : i)}>
                    <span>{f.q}</span>
                    <span className="swapped-faq-chevron" aria-hidden="true" />
                  </button>
                  {swappedFaqOpen === i && <p className="swapped-faq-answer">{f.a}</p>}
                </article>
              ))}
            </div>
          </section>
            </div>
          </div>
          <section className="swapped-more" aria-label="Más criptos que compran nuestros clientes">
            <Heading level="h2">Más criptos que compran nuestros clientes</Heading>
            <div className="swapped-more-grid">
              {SWAPPED_MORE_CRYPTOS.map((c) => (
                <span className="swapped-more-card" key={c.ticker}>
                  <span className="swapped-more-disc" style={{ backgroundColor: c.color }}>{c.ticker[0]}</span>
                  <span className="swapped-more-name">Comprar {c.name} ({c.ticker})</span>
                </span>
              ))}
            </div>
          </section>
        </main>
      ) : (
      <main className="shell">
        <Heading level="h1">Crypto</Heading>
        <Text tone="muted">Compra y vende USDC y USDT directamente entre personas.</Text>

        <section className="market" aria-label="Ofertas del mercado">
          <div className={isNarrow ? 'filters filters-mobile' : 'filters'}>
            {isNarrow && (
              <>
                <div className="filters-mobile-row">
                  <SegmentedControl
                    ariaLabel="Comprar o vender"
                    options={[{ value: 'buy', label: 'Comprar' }, { value: 'sell', label: 'Vender' }]}
                    value={side}
                    onChange={upd(setSide)}
                    className="filter-seg"
                  />
                  <span ref={moreFiltersBtnRef} className="filter-more-wrap">
                    <Button
                      onClick={() => setMoreFiltersOpen((v) => !v)}
                      className="filter-more"
                      aria-expanded={moreFiltersOpen}
                      aria-label={moreFiltersCount > 0 ? `Más filtros (${moreFiltersCount} activos)` : 'Más filtros'}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                        <path d="M4 6 h16 M7 12 h10 M10 18 h4" />
                      </svg>
                    </Button>
                    {moreFiltersCount > 0 && (<span className="filter-more-badge">{moreFiltersCount}</span>)}
                  </span>
                </div>
                <div className="filters-mobile-row">
                  <Input
                    placeholder="Cantidad"
                    aria-label="Cantidad"
                    inputMode="decimal"
                    value={amount}
                    onChange={updEvent(setAmount, (v) => v.replace(/[^0-9.]/g, ''))}
                    className="filter-amount"
                  />
                  {side === 'buy' ? (
                    <select
                      className="filters-mobile-currency"
                      aria-label="Moneda a comprar"
                      value={buyCurrency}
                      onChange={(e) => { setBuyCurrency(e.target.value); setPage(1); }}
                    >
                      <option value="all">Comprar</option>
                      {currenciesForChain(chain).map((c) => (<option key={c.value} value={c.value}>{c.label}</option>))}
                    </select>
                  ) : (
                    <select
                      className="filters-mobile-currency"
                      aria-label="Moneda a comprar"
                      value={sellCurrency}
                      onChange={(e) => { setSellCurrency(e.target.value); setPage(1); }}
                    >
                      <option value="all">Comprar</option>
                      {currenciesForMethod(payment).map((c) => (<option key={c.value} value={c.value}>{c.label}</option>))}
                    </select>
                  )}
                </div>
              </>
            )}
            {!isNarrow && (
              <>
            <SegmentedControl
              ariaLabel="Comprar o vender"
              options={[{ value: 'buy', label: 'Comprar' }, { value: 'sell', label: 'Vender' }]}
              value={side}
              onChange={upd(setSide)}
              className="filter-seg"
            />
            <Input
              placeholder="Cantidad"
              aria-label="Cantidad"
              inputMode="decimal"
              value={amount}
              onChange={updEvent(setAmount, (v) => v.replace(/[^0-9.]/g, ''))}
              className="filter-amount"
            />
            {leftCascade}{swapButton}{rightCascade}
            {/* el botón Eliminar filtros sale de la barra; en
                su lugar va este agrupador de filtros ocultos, con la
                opción de restablecer dentro del panel. Queda al final
                de los filtros, con icono además del texto. */}
            <span ref={moreFiltersBtnRef} className="filter-more-wrap">
              <Button
                onClick={() => setMoreFiltersOpen((v) => !v)}
                className="filter-more"
                aria-expanded={moreFiltersOpen}
                aria-label={moreFiltersCount > 0 ? `Más filtros (${moreFiltersCount} activos)` : 'Más filtros'}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M4 6 h16 M7 12 h10 M10 18 h4" />
                </svg>
              </Button>
              {moreFiltersCount > 0 && (<span className="filter-more-badge">{moreFiltersCount}</span>)}
            </span>
            {/* el ordenar va aquí, en la esquina derecha de
                la barra (al final, después de Más filtros), no dentro
                del agrupador. */}
            <span className="filter-sort-wrap">
              <select
                className="filter-sort"
                aria-label="Ordenar resultados"
                value={sortBy}
                onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
              >
                <option value="price-asc">Precio ↑</option>
                <option value="price-desc">Precio ↓</option>
                <option value="available-desc">Disponible ↓</option>
                <option value="min-asc">Mínimo ↑</option>
                <option value="max-desc">Máximo ↓</option>
                <option value="rating-desc">Valoración ↓</option>
              </select>
            </span>
              </>
            )}
            {moreFiltersOpen && isNarrow && (
              <div className="more-filters-backdrop" aria-hidden="true" />
            )}
            {moreFiltersOpen && (
              <div
                className={isNarrow ? 'more-filters-panel more-filters-sheet' : 'more-filters-panel'}
                ref={moreFiltersPanelRef}
                role={isNarrow ? 'dialog' : undefined}
                aria-modal={isNarrow ? true : undefined}
                aria-label={isNarrow ? 'Más filtros' : undefined}
                style={moreFiltersPos ? { top: moreFiltersPos.top, left: moreFiltersPos.left, right: moreFiltersPos.right, bottom: moreFiltersPos.bottom, maxHeight: moreFiltersPos.maxHeight } : undefined}
              >
                {isNarrow && (
                  <div className="more-filters-header">
                    <div className="more-filters-grabber" aria-hidden="true" />
                    <button type="button" className="more-filters-close" aria-label="Cerrar" onClick={() => setMoreFiltersOpen(false)}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6 L18 18 M18 6 L6 18" /></svg>
                    </button>
                  </div>
                )}
                <div className="more-filters-body">
                {isNarrow && (
                  <>
                    <label className="more-filters-field">
                      <span>Ordenar</span>
                      <select value={sortBy} onChange={(e) => { setSortBy(e.target.value); setPage(1); }}>
                        <option value="price-asc">Precio ↑</option>
                        <option value="price-desc">Precio ↓</option>
                        <option value="available-desc">Disponible ↓</option>
                        <option value="min-asc">Mínimo ↑</option>
                        <option value="max-desc">Máximo ↓</option>
                        <option value="rating-desc">Valoración ↓</option>
                      </select>
                    </label>
                    <label className="more-filters-field">
                      <span>Red blockchain</span>
                      <select value={chain} onChange={(e) => { setChain(e.target.value); setPage(1); }}>
                        <option value="all">Cualquier blockchain</option>
                        {chainOptions.map((c) => (<option key={c} value={c}>{c}</option>))}
                      </select>
                    </label>
                    <label className="more-filters-field">
                      <span>Método</span>
                      <select value={payment} onChange={(e) => { setPayment(e.target.value); setPage(1); }}>
                        <option value="all">Cualquier método</option>
                        {paymentOptions.map((c) => (<option key={c} value={c}>{c}</option>))}
                      </select>
                    </label>
                    <label className="more-filters-field">
                      <span>Moneda a vender</span>
                      <select
                        value={side === 'buy' ? sellCurrency : buyCurrency}
                        onChange={(e) => { side === 'buy' ? setSellCurrency(e.target.value) : setBuyCurrency(e.target.value); setPage(1); }}
                      >
                        <option value="all">Vender</option>
                        {(side === 'buy' ? currenciesForMethod(payment) : currenciesForChain(chain)).map((c) => (<option key={c.value} value={c.value}>{c.label}</option>))}
                      </select>
                    </label>
                  </>
                )}
                <label className="more-filters-field">
                  <span>Ubicación</span>
                  <select value={locationFilter} onChange={(e) => { setLocationFilter(e.target.value); setPage(1); }}>
                    <option value="all">Todas las ubicaciones</option>
                    {TEST_LOCATIONS.map((l) => (<option key={l} value={l}>{l}</option>))}
                  </select>
                </label>
                <label className="more-filters-field">
                  <span>Ranking (valoración mínima)</span>
                  <select value={rankingFilter} onChange={(e) => { setRankingFilter(e.target.value); setPage(1); }}>
                    <option value="all">Cualquier valoración</option>
                    <option value="100">100%</option>
                    <option value="99">99% o más</option>
                    <option value="98">98% o más</option>
                  </select>
                </label>
                <label className="more-filters-field">
                  <span>Anunciante</span>
                  <select value={advertiserFilter} onChange={(e) => { setAdvertiserFilter(e.target.value); setPage(1); }}>
                    <option value="all">Todos los anunciantes</option>
                    {TEST_ADVERTISERS.map((a) => (<option key={a} value={a}>{a}</option>))}
                  </select>
                </label>
                <label className="more-filters-field">
                  <span>Depósito</span>
                  <select value={depositFilter} onChange={(e) => { setDepositFilter(e.target.value); setPage(1); }}>
                    <option value="all">Con o sin depósito</option>
                    <option value="yes">Con depósito realizado</option>
                    <option value="no">Sin depósito</option>
                  </select>
                </label>
                </div>
                {isNarrow && (
                  <div className="more-filters-footer">
                    <Button onClick={() => setMoreFiltersOpen(false)} className="more-filters-apply">Aplicar</Button>
                    <Button variant="outline" onClick={clearFilters} className="more-filters-reset">Restablecer</Button>
                  </div>
                )}
                {!isNarrow && (<Button variant="outline" onClick={clearFilters} className="more-filters-reset">Restablecer filtros</Button>)}
              </div>
            )}
          </div>

          <div className="table-wrap">
            <table className="market-table">
              <thead>
                <tr>
                  <th>Das / Recibes</th>
                  <th>Disponible / Min - Max</th>
                  <th>Precio</th>
                  <th>Red blockchain</th>
                  <th>Anunciante</th>
                  <th><span className="sr-only">Acciones</span></th>
                </tr>
              </thead>
              <tbody>
                {pageOffers.length === 0 ? (
                  <tr><td colSpan={6} className="empty">No hay anuncios que coincidan con los filtros.</td></tr>
                ) : pageOffers.map((o) => (
                  <tr key={o.id}>
                    <td><AssetPair from={ASSETS[o.sell_currency]} to={ASSETS[o.buy_currency]} reverse={effectiveSide === 'sell'} size={44} /></td>
                    <td>
                      <div className="amount">{fmt(o.available)} {o.buy_currency} {o.deposit_made && DepositIcon}</div>
                      <div className="sub">{fmt(o.min_amount)} ~ {fmt(o.max_amount)} {o.sell_currency}</div>
                    </td>
                    <td>
                      <div className="price">{priceMain(o)}</div>
                      <div className="sub">{priceNote(o)}</div>
                    </td>
                    <td>{renderChains(o)}</td>
                    <td><TraderCell trader={toTrader(o)} /></td>
                    <td className="actions"><Button size="md" onClick={() => openModal(o)}>{verb} {o.buy_currency}</Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="cards">
            {pageOffers.length === 0 ? (
              <div className="empty">No hay anuncios que coincidan con los filtros.</div>
            ) : pageOffers.map((o) => (
              <div key={o.id} className="card">
                <div className="card-top">
                  <AssetPair from={ASSETS[o.sell_currency]} to={ASSETS[o.buy_currency]} reverse={effectiveSide === 'sell'} size={44} />
                  <div className="card-price">
                    <div className="price">{priceMain(o)}</div>
                    <div className="sub">{priceNote(o)}</div>
                  </div>
                </div>
                <div className="card-mid">
                  <span className="amount">{fmt(o.available)} {o.buy_currency} {o.deposit_made && DepositIcon}</span>
                  <span className="sub">{fmt(o.min_amount)} ~ {fmt(o.max_amount)} {o.sell_currency}</span>
                </div>
                {renderChains(o)}
                <div className="card-foot">
                  <TraderCell trader={toTrader(o)} />
                  <Button size="md" onClick={() => openModal(o)}>{verb} {o.buy_currency}</Button>
                </div>
              </div>
            ))}
          </div>

          <div className="pager">
            <Pagination page={currentPage} totalPages={totalPages} onChange={setPage} />
            <Text tone="muted">Mostrando {from} - {to} de {filtered.length} items</Text>
          </div>
        </section>
      </main>
      )}

      <footer className="app-footer">
        <div className="foot-inner">
          <span className="foot-left">
            © {new Date().getFullYear()} Crypto as a Service™
            <img src={botIcon} alt="" className="ui-icon-sm" />
          </span>
          <span className="foot-right">
            <span className="foot-link">Legal Notice</span>
            <span aria-hidden="true">•</span>
            <span className="foot-link">Privacy Policy</span>
            <SegmentedControl
              ariaLabel="Tema"
              options={[
                { value: 'oscuro', label: 'Oscuro' },
                { value: 'claro', label: 'Claro' },
                { value: 'sistema', label: 'Sistema' },
              ]}
              value={theme}
              onChange={setTheme}
            />
          </span>
        </div>
      </footer>

      <Modal open={!!selected} onClose={closeModal} size="lg" title={selected ? (orderDone ? 'Orden creada' : `${verb} ${selected.buy_currency}`) : ''}>
        {selected && !orderDone && (
          <div className="order-grid">
            <div className="order-info">
              <TraderCell trader={toTrader(selected)} />
              <h5 className="order-subhead">Información de la orden</h5>
              <dl className="order-rows">
                <div><dt>Límite:</dt><dd>{fmt(selected.min_amount)} - {fmt(selected.max_amount)} {selected.sell_currency}</dd></div>
                <div><dt>Disponible:</dt><dd>{fmt(selected.available)} {selected.buy_currency}</dd></div>
                <div><dt>Métodos de pago:</dt><dd>{selected.payment_methods.join(', ')}</dd></div>
                <div><dt>Blockchains:</dt><dd>{selected.blockchains.join(', ')}</dd></div>
              </dl>
              <p className="legal">Al proceder, confirmas que leíste y aceptaste el aviso legal de intercambio.</p>
            </div>
            <div className="order-form">
              <div className="amount-row">
                <Input
                  placeholder="Monto"
                  aria-label="Monto"
                  inputMode="decimal"
                  value={modalAmount}
                  onChange={(e) => setModalAmount(e.target.value.replace(/[^0-9.]/g, ''))}
                />
                <span className="currency-chip">{selected.buy_currency}</span>
              </div>
              <p className="helpers">
                <span>Precio unitario: 1 {selected.buy_currency} = {fmt2(selected.price)} {selected.sell_currency}</span>
                <span>Límite: {fmt(selected.min_amount)} - {fmt(selected.max_amount)} {selected.sell_currency}</span>
              </p>
              {selected.blockchains.length > 1 && (
                <Select
                  label="Seleccionar blockchain"
                  value={modalChain}
                  onChange={(e) => setModalChain(e.target.value)}
                  options={selected.blockchains.map((c) => ({ value: c, label: c }))}
                />
              )}
              {modalAmount && !modalValid && (
                <Text tone="muted">El monto debe estar entre {fmt(selected.min_amount)} y {fmt(selected.max_amount)} {selected.sell_currency}.</Text>
              )}
              <Button size="lg" disabled={!modalValid} onClick={() => setOrderDone(true)}>Comenzar intercambio</Button>
            </div>
          </div>
        )}
        {selected && orderDone && (
          <div className="order-done">
            <img src={checkIcon} alt="" className="ui-icon-lg" />
            <Text>Orden creada con {fmt(modalParsed)} {selected.buy_currency} a {fmt2(selected.price)} {selected.sell_currency} con {selected.advertiser_name}.</Text>
            <Text tone="muted">Datos de muestra: no se realizó ninguna operación real.</Text>
            <Button size="lg" onClick={closeModal}>Volver al mercado</Button>
          </div>
        )}
      </Modal>
    </div>
  );
}
