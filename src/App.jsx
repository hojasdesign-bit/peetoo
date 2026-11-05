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
import { TraderCell, ExchangeIcon } from './ds/components/TraderCell/TraderCell.jsx';
import QRCode from 'react-qr-code';
import { Avatar } from './ds/components/Avatar/Avatar.jsx';
import { VerifiedBadge } from './ds/components/VerifiedBadge/VerifiedBadge.jsx';
import { MetadataList } from './ds/components/MetadataList/MetadataList.jsx';
import { SwapPair } from './ds/components/SwapPair/SwapPair.jsx';
import { OverflowChips } from './ds/components/OverflowChips/OverflowChips.jsx';
import { NetworkChip } from './ds/components/NetworkChip/NetworkChip.jsx';
import { PageBackground } from './ds/components/PageBackground/PageBackground.jsx';
import { DropdownMenu } from './ds/components/DropdownMenu/DropdownMenu.jsx';
import { MenuLinkColumn } from './ds/components/MenuLinkColumn/MenuLinkColumn.jsx';
import { OFFERS, ASSETS, CHAIN_SHORT, CHAIN_COLORS, CHAIN_SRC, PAYMENT_DETAILS, LOCATION_PRECISION } from './data/offers.js';
import { DIVISA_OFFERS } from './data/divisaOffers.js';
import { GLOSSARY_TERMS } from './data/glossary.js';
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
import paypalIcon from './assets/coins/paypal.svg';
import tropipayIcon from './assets/coins/tropipay.svg';
import etecsaIcon from './assets/coins/etecsa.svg';
import usatIcon from './assets/coins/usat.svg';
import { cupPng, usdPng, eurPng, mxnPng, cadPng } from './assets/coins/fiat-images.js';
import placeholderGenericIcon from './assets/coins/placeholder-generic.svg';
import { HomePage } from './views/HomePages.jsx';
const SwappedView = React.lazy(() => import('./views/SwappedView.jsx'));
const ProfileView = React.lazy(() => import('./views/ProfileView.jsx'));
const LegalPage = React.lazy(() => import('./views/InfoPages.jsx').then((m) => ({ default: m.LegalPage })));
const GlossaryPage = React.lazy(() => import('./views/InfoPages.jsx').then((m) => ({ default: m.GlossaryPage })));
const GlossaryTermPage = React.lazy(() => import('./views/InfoPages.jsx').then((m) => ({ default: m.GlossaryTermPage })));

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
// Abreviatura sensata: desde 1000 se abrevia (1k en vez de 1000) y el
// valor exacto va en el title. Sin decimales superfluos: 1000 -> 1k.
const abbrevNum = (n) => {
  const abs = Math.abs(n);
  if (abs >= 1e6) return `${fmt2(n / 1e6).replace(/,00$/, '')}M`;
  if (abs >= 1e3) return `${fmt2(n / 1e3).replace(/,00$/, '')}k`;
  return fmt2(n);
};
const uniq = (arr) => [...new Set(arr)].sort();
// Tiempo promedio de finalización por anunciante, en minutos (dato demo,
// igual que las operaciones y el porcentaje: no viene de las ofertas).
const AVG_COMPLETION_MIN = { criptoblue: 2, yosusenador: 4, tucambioalpoars: 7, habana_p2p: 3, caribe_crypto: 9 };
const toTrader = (o) => ({
  name: o.advertiser_name,
  verified: o.advertiser_verified,
  verification: o.advertiser_premium ? 'premium' : 'standard',
  trades: o.advertiser_trades,
  completion: o.advertiser_completion,
  avgCompletion: AVG_COMPLETION_MIN[o.advertiser_name] ?? null,
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
  // Mercado Divisa: las dos patas son método + moneda (sin red). Estados
  // propios; Crypto sigue con buyCurrency/payment/chain/sellCurrency.
  const [dBuyMethod, setDBuyMethod] = React.useState('all');
  const [dBuyFiat, setDBuyFiat] = React.useState('all');
  const [dSellMethod, setDSellMethod] = React.useState('all');
  const [dSellFiat, setDSellFiat] = React.useState('all');
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
  // Vista: 'home', 'market', 'swapped', 'profile', 'legal', 'glossary' o 'glossary-term'.
  // /crypto/swapped, /crypto/perfil/:nombre, /crypto/legal y /crypto/glosario son vistas de la app
  // (no páginas estáticas): así mantienen el header y los enlaces se
  // comportan igual que en el mercado. La vista inicial sale de la URL
  // para que todas abran directas.
  // Rutas: la raíz (/) es la homepage (una por dominio: la principal en
  // peetoo.pages.dev y la del mercado en app.peetoo.pages.dev) y el
  // mercado vive bajo /crypto/. Las URLs viejas (/swapped, /perfil/...,
  // /legal, /glosario) redirigen a su equivalente bajo /crypto/ para que
  // ningún enlace compartido se rompa. Todo con replaceState: no añade
  // entradas al historial. La vista inicial ya sale normalizada, así que
  // no hay parpadeo aunque la redirección ocurra durante el primer render.
  const pathToView = () => {
    let path = window.location.pathname.replace(/\.html$/, '');
    if (path.length > 1) path = path.replace(/\/$/, '');
    if (path === '/') return { view: 'home', profile: '' };
    if (path === '/crypto') {
      // Se ejecuta en cada render: conservar la query (?oferta=id) al
      // normalizar, o el enlace profundo y el modal la perderían.
      window.history.replaceState(null, '', `/crypto/${window.location.search}`);
      return { view: 'market', profile: '', segment: 'crypto' };
    }
    if (path === '/divisa') {
      window.history.replaceState(null, '', `/divisa/${window.location.search}`);
      return { view: 'market', profile: '', segment: 'divisa' };
    }
    if (path === '/swapped' || path === '/legal' || path === '/glosario' || path.startsWith('/glosario/') || path.startsWith('/perfil/')) {
      window.history.replaceState(null, '', `/crypto${path}${window.location.search}`);
      path = `/crypto${path}`;
    }
    const inner = path.startsWith('/crypto/') ? path.slice('/crypto'.length) : path;
    if (inner === '/swapped') return { view: 'swapped', profile: '' };
    if (inner === '/legal') return { view: 'legal', profile: '' };
    if (inner === '/glosario') return { view: 'glossary', profile: '' };
    const gm = inner.match(/^\/glosario\/(.+)$/);
    if (gm) return { view: 'glossary-term', profile: '', glossaryTerm: decodeURIComponent(gm[1]) };
    const m = inner.match(/^\/perfil\/(.+)$/);
    if (m) return { view: 'profile', profile: decodeURIComponent(m[1]) };
    return { view: 'market', profile: '' };
  };
  const initialView = pathToView();
  const [view, setView] = React.useState(initialView.view);
  // Segmento del mercado del header (junto al logo): 'crypto' o
  // 'divisa'. Solo lo cambian la URL inicial, el atrás/adelante y el
  // propio interruptor; las vistas internas no lo tocan.
  const [marketSegment, setMarketSegment] = React.useState(initialView.segment || 'crypto');
  const [profileName, setProfileName] = React.useState(initialView.profile);
  const [glossaryTerm, setGlossaryTerm] = React.useState(initialView.glossaryTerm || '');
  const [profilePage, setProfilePage] = React.useState(1);
  const [showAllCryptos, setShowAllCryptos] = React.useState(false);
  const [showAllFiats, setShowAllFiats] = React.useState(false);
  const [copiedMethod, setCopiedMethod] = React.useState(null);
  const [qrModal, setQrModal] = React.useState(null);
  // Lado de la página de Swapped (toggle Comprar/Vender): lo fija la
  // tarjeta del menú Swapped; por defecto Comprar. La página es
  // genérica, sin énfasis a ninguna moneda: el widget arranca en BTC
  // (su moneda por defecto) y dentro de él se puede cambiar.
  const [swappedSide, setSwappedSide] = React.useState('buy');
  // FAQ de la página de Swapped: la primera abierta, como en la referencia.
  const [swappedFaqOpen, setSwappedFaqOpen] = React.useState(0);
  const swappedStatsRef = React.useRef(null);
  const goSwapped = (e) => {
    if (e) e.preventDefault();
    if (view === 'swapped') return;
    window.history.pushState(null, '', '/crypto/swapped');
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
  // Páginas internas (Legal y Glosario): vistas de la app como /swapped
  // y /perfil/:nombre, con header y footer, abribles directas por URL
  // (el _redirects de Pages sirve index.html). Blog y redes quedan
  // para fase 3; el Login, para la integración con OpenFort (fase 2).
  // Página de un término del glosario: cierra los menús y navega sin
  // recargar, como las demás páginas internas.
  const goGlossaryTerm = (slug) => {
    setBuyMenuOpen(false); setFiatMenuOpen(false); setSwappedMenuOpen(false); setHamburgerOpen(false);
    setQrModal(null);
    window.history.pushState(null, '', `/crypto/glosario/${slug}`);
    setGlossaryTerm(slug);
    setView('glossary-term');
    window.scrollTo(0, 0);
  };
  const goToGlossary = () => {
    window.history.pushState(null, '', '/crypto/glosario');
    setView('glossary');
    window.scrollTo(0, 0);
  };
  const goInfoPage = (path, viewName) => {
    setBuyMenuOpen(false); setFiatMenuOpen(false); setSwappedMenuOpen(false); setHamburgerOpen(false);
    setQrModal(null);
    window.history.pushState(null, '', `/crypto${path}`);
    setView(viewName);
    window.scrollTo(0, 0);
  };
  // Ir al mercado SIN desplazar: ni al aplicar un filtro desde el menú
  // estando ya en el mercado, ni al cambiar de vista (perfil, /swapped,
  // Legal, Glosario): la página queda donde estaba. A petición suya,
  // goToMarket no hace scroll en ningún camino.
  const goToMarket = () => {
    if (view === 'home' || view === 'swapped' || view === 'profile' || view === 'legal' || view === 'glossary' || view === 'glossary-term') {
      window.history.pushState(null, '', `/${marketSegment}/`);
      setView('market');
      setQrModal(null);
    }
  };
  // Menús del centro (Comprar crypto / Comprar fiat): son del mercado
  // Crypto; desde Divisa cambian el segmento a Crypto. Si ya se está
  // en el mercado Crypto, no añade otra entrada al historial.
  const goToCryptoMarket = () => {
    if (!(marketSegment === 'crypto' && view === 'market')) {
      window.history.pushState(null, '', '/crypto/');
      setView('market');
    }
    setMarketSegment('crypto');
    setQrModal(null);
  };
  // Interruptor del header (junto al logo): cambia de mercado Crypto
  // a Divisa y viceversa. Solo cambia el segmento de la URL (/crypto/
  // o /divisa/); como los menús, parte de filtros limpios, y en Divisa
  // el par arranca con la fiat a la izquierda (la vista fiat del
  // original), sin tocar el toggle Comprar/Vender ni inventar ofertas.
  const goToMarketSegment = (seg) => {
    if (seg === marketSegment && view === 'market') return;
    setBuyMenuOpen(false); setFiatMenuOpen(false); setSwappedMenuOpen(false); setHamburgerOpen(false);
    setQrModal(null);
    clearFilters();
    setMarketSegment(seg);
    window.history.pushState(null, '', `/${seg}/`);
    setView('market');
  };
  // Ir al perfil público de un anunciante: cierra el modal si estaba
  // abierto y navega sin recargar (el mercado queda intacto detrás).
  const goToTrader = (name) => {
    setSelected(null);
    setOrderDone(false);
    setProfileName(name);
    setProfilePage(1);
    setQrModal(null);
    window.history.pushState(null, '', `/crypto/perfil/${encodeURIComponent(name)}`);
    setView('profile');
    window.scrollTo(0, 0);
  };
  const scrollToOffers = () => {
    document.getElementById('profile-offers')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const copyText = async (text) => {
    try { await navigator.clipboard.writeText(text); return true; }
    catch { const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select(); let ok = false; try { ok = document.execCommand('copy'); } catch { ok = false; } document.body.removeChild(ta); return ok; }
  };
  const handleCopy = async (m, dest) => {
    if (await copyText(dest)) {
      setCopiedMethod(m);
      window.setTimeout(() => setCopiedMethod((c) => (c === m ? null : c)), 2000);
    }
  };
  React.useEffect(() => {
    const onPop = () => {
      const p = pathToView();
      setView(p.view);
      if (p.segment) setMarketSegment(p.segment);
      setProfileName(p.profile);
      setProfilePage(1);
      setQrModal(null);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const [selected, setSelected] = React.useState(null);
  const [modalAmount, setModalAmount] = React.useState('');
  const [modalChain, setModalChain] = React.useState('');
  const [orderDone, setOrderDone] = React.useState(false);
  // Desplegable «•••» del modal de la orden (compartir, detalles, perfil,
  // favoritos, denunciar, bloquear) + enlace profundo a la oferta.
  const [moreOpen, setMoreOpen] = React.useState(false);
  const [copiedAction, setCopiedAction] = React.useState(null);
  const [reportView, setReportView] = React.useState(null);
  const [reportReason, setReportReason] = React.useState('');
  const [reportNote, setReportNote] = React.useState('');
  const [favorites, setFavorites] = React.useState(() => { try { return JSON.parse(window.localStorage.getItem('peetoo:favoritos') || '[]'); } catch { return []; } });
  const [blockedNames, setBlockedNames] = React.useState(() => { try { return JSON.parse(window.localStorage.getItem('peetoo:bloqueados') || '[]'); } catch { return []; } });
  const moreRef = React.useRef(null);
  const [morePos, setMorePos] = React.useState(null);
  // Enlace profundo a una oferta (?oferta=id): abre su modal al cargar.
  React.useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('oferta');
    if (!id) return;
    const o = OFFERS.find((x) => String(x.id) === id) || DIVISA_OFFERS.find((x) => String(x.id) === id);
    if (!o) return;
    const seg = isDivisaOffer(o) ? 'divisa' : 'crypto';
    if (initialView.view !== 'market' || (initialView.segment || 'crypto') !== seg) {
      setMarketSegment(seg);
      setView('market');
      window.history.replaceState(null, '', `/${seg}/?oferta=${o.id}`);
    }
    openModal(o);
  }, []);
  // El menú es fixed (como el panel de filtros): si quedara dentro
  // del cuerpo desplazable del modal, el overflow lo recortaría al
  // abrir hacia arriba. Se ancla al rect del botón «•••».
  const toggleMore = (e) => {
    if (moreOpen) { setMoreOpen(false); return; }
    const r = e.currentTarget.getBoundingClientRect();
    setMorePos({ bottom: Math.round(window.innerHeight - r.top + 8), right: Math.round(window.innerWidth - r.right) });
    setMoreOpen(true);
  };
  // El desplegable «•••» cierra al pulsar fuera, con Escape, al
  // desplazar el modal o al cambiar el tamaño de la ventana (el menú
  // fijo no sigue al botón).
  React.useEffect(() => {
    if (!moreOpen) return;
    const onDown = (e) => { if (moreRef.current && !moreRef.current.contains(e.target)) setMoreOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setMoreOpen(false); };
    const onScroll = () => setMoreOpen(false);
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    document.addEventListener('scroll', onScroll, true);
    window.addEventListener('resize', onScroll);
    return () => { document.removeEventListener('pointerdown', onDown); document.removeEventListener('keydown', onKey); document.removeEventListener('scroll', onScroll, true); window.removeEventListener('resize', onScroll); };
  }, [moreOpen]);
  const [theme, setTheme] = React.useState('oscuro');

  // Submenú «Comprar crypto» del header: la versión planteada en el DS
  // (Header v1.10 + DropdownMenu): mega-panel con intro, monedas y
  // enlaces; apertura por hover (150ms de margen al salir) y clic
  // como respaldo; en móvil (≤720px) la variante acordeón del propio
  // DropdownMenu. Los botones de moneda son los MenuCoinButton del DS
  // (símbolo en círculo de color + «Comprar X» + código).
  // Enlaces informativos (Glosario y Legal navegan a sus páginas;
  // Blog queda para fase 3) y redes de EJEMPLO (las reales las
  // especificará él y sustituirán a estas; también fase 3). Los iconos
  // son Simple Icons (CC0) incrustados, 20px, currentColor.
  const socialIcon = (d) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={d} /></svg>
  );
  const INFO_LINKS = [{ label: 'Blog' }, { label: 'Glosario' }, { label: 'Legal' }];
  const EXAMPLE_SOCIALS = [
    { label: 'X', icon: socialIcon("M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z") },
    { label: 'Instagram', icon: socialIcon("M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077") },
    { label: 'Telegram', icon: socialIcon("M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z") },
    { label: 'Discord', icon: socialIcon("M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z") },
  ];
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
      // Penúltimo tile: no es una moneda; abre el mercado de compra sin
      // filtro de moneda (código vacío → rama de etiqueta en onBuyMenuNavigate).
      { symbol: '+', color: '#3a3a44', label: 'Otras monedas', code: '' },
      // Última opción: todas las ofertas, sin filtro (código vacío →
      // rama de etiqueta; antes vivía en la columna lateral).
      { symbol: '≡', color: '#3a3a44', label: 'Todas las ofertas', code: '' },
    ],
    links: [
      { label: 'Vender crypto' },
      ...INFO_LINKS,
    ],
    socials: EXAMPLE_SOCIALS,
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
  // Pie de enlaces informativos + redes de ejemplo: Glosario y Legal
  // navegan a sus páginas internas; Blog y redes quedan pendientes
  // (fase 3) y solo cierran el panel. En móvil es el bloque único
  // fuera de los submenús, dentro del cajón.
  const closeInfoFoot = (e) => { e.preventDefault(); setSwappedMenuOpen(false); setHamburgerOpen(false); };
  const onInfoFootNavigate = (e, link) => {
    e.preventDefault();
    // Sin link (columna lateral del panel Swapped) la etiqueta sale del
    // propio enlace pulsado, como en los manejadores de los otros menús.
    const label = link?.label || e.currentTarget.textContent.trim();
    if (label === 'Glosario') goInfoPage('/glosario', 'glossary');
    else if (label === 'Legal') goInfoPage('/legal', 'legal');
    else closeInfoFoot(e);
  };
  const renderInfoFoot = (wrapClass) => (
    <div className={wrapClass}>
      <span className="swapped-foot-links">
        {INFO_LINKS.map((link) => (
          <a key={link.label} href="#" className="swapped-foot-link" role="menuitem" onClick={(e) => onInfoFootNavigate(e, link)}>
            {link.label}
          </a>
        ))}
      </span>
      <span className="swapped-foot-socials">
        <span className="swapped-foot-follow">Seguir</span>
        {EXAMPLE_SOCIALS.map((social) => (
          <a key={social.label} href="#" className="swapped-foot-btn" aria-label={social.label} onClick={closeInfoFoot}>
            {social.icon}
          </a>
        ))}
      </span>
    </div>
  );
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
    goToCryptoMarket();
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
      clearFilters(); setSide('sell'); goToCryptoMarket();
    } else if (label.includes('Todas las ofertas')) {
      clearFilters(); goToCryptoMarket();
    } else if (label.includes('Otras monedas')) {
      clearFilters(); setSide('buy'); goToCryptoMarket();
    } else if (label.includes('Glosario')) {
      goInfoPage('/glosario', 'glossary');
    } else if (label.includes('Legal')) {
      goInfoPage('/legal', 'legal');
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
      { symbol: 'Z', color: '#6d1ed4', label: 'Comprar Zelle', code: 'USDzl', method: 'Zelle', currency: 'USD' },
      { symbol: 'P', color: '#003087', label: 'Comprar PayPal', code: 'USDpp', src: paypalIcon, method: 'PayPal', currency: 'USD' },
      { symbol: 'P', color: '#003087', label: 'Comprar PayPal', code: 'EURpp', src: paypalIcon, method: 'PayPal', currency: 'EUR' },
      { symbol: 'P', color: '#003087', label: 'Comprar PayPal', code: 'MXNpp', src: paypalIcon, method: 'PayPal', currency: 'MXN' },
      { symbol: 'P', color: '#003087', label: 'Comprar PayPal', code: 'CADpp', src: paypalIcon, method: 'PayPal', currency: 'CAD' },
      { symbol: '$', color: '#006847', label: 'Comprar MXN', code: 'MXNcash', src: mxnPng },
      { symbol: '€', color: '#003399', label: 'Comprar EUR', code: 'EURcash', src: eurPng },
      { symbol: 'T', color: '#3a3a44', label: 'Comprar Transferencia', code: 'CuPdc', method: 'Transferencia Bancaria', currency: 'CUP' },
      { symbol: 'E', color: '#030364', label: 'Comprar Etecsa', code: 'CuPetec', src: etecsaIcon, method: 'Etecsa', currency: 'CUP' },
      { symbol: '$', color: '#D80621', label: 'Comprar CAD', code: 'CADcash', src: cadPng },
      { symbol: '$', color: '#2E7D32', label: 'Comprar Clásica', code: 'USDcls', src: usdPng, method: 'Clásica', currency: 'USD' },
      { symbol: '$', color: '#2E7D32', label: 'Comprar MLC', code: 'MLC', src: usdPng, method: 'Transferencia Bancaria', currency: 'USD' },
      { symbol: '$', color: '#2E7D32', label: 'Comprar Qvapay', code: 'USDqp', src: usdPng, method: 'Qvapay', currency: 'USD' },
      { symbol: 'T', color: '#f5cc4e', label: 'Comprar TropiPay', code: 'USDtp', src: tropipayIcon, method: 'TropiPay', currency: 'USD' },
      // Penúltimo tile: quita solo el filtro de fiat (código vacío →
      // rama de etiqueta en onFiatMenuNavigate), sin tocar el resto.
      { symbol: '+', color: '#3a3a44', label: 'Todas las fiat', code: '' },
      // Última opción: todas las ofertas, sin filtro (código vacío →
      // rama de etiqueta; antes vivía en la columna lateral).
      { symbol: '≡', color: '#3a3a44', label: 'Todas las ofertas', code: '' },
    ],
    links: [
      ...INFO_LINKS,
    ],
    socials: EXAMPLE_SOCIALS,
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
    // cash) y método abierto. MLC es el ticker de USD por
    // Transferencia Bancaria; Etecsa, Clásica, Qvapay, TropiPay y
    // Zelle ya están aclaradas como métodos.
    const cashToCurrency = { USDcash: 'USD', CuPcash: 'CUP', EURcash: 'EUR', MXNcash: 'MXN', CADcash: 'CAD', CuPetec: 'CUP', USDcls: 'USD', USDqp: 'USD', USDtp: 'USD' };
    clearFilters();
    // La fiat comprada va en el lado Comprar: campos intercambiados y
    // toggle en Comprar → lado efectivo venta → mismos resultados.
    setCascadesSwapped(true);
    setSide('buy');
    setPayment(coin.method || 'all');
    setSellCurrency(coin.currency ?? (cashToCurrency[code] || code));
    setPage(1);
    setFiatMenuOpen(false);
    goToCryptoMarket();
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
      clearFilters(); setCascadesSwapped(true); setSide('buy'); goToCryptoMarket();
    } else if (label.includes('Todas las ofertas')) {
      clearFilters(); goToCryptoMarket();
    } else if (label.includes('Glosario')) {
      goInfoPage('/glosario', 'glossary');
    } else if (label.includes('Legal')) {
      goInfoPage('/legal', 'legal');
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

  const paymentOptions = uniq(OFFERS.map((o) => o.payment_method));
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
      : uniq(OFFERS.filter((o) => o.payment_method === method).map((o) => o.sell_currency));
    // Como en currenciesForChain: la moneda elegida desde el header puede
    // no tener ofertas (EURcash, MXNcash, CADcash): si está seleccionada,
    // se añade para que el segundo campo pueda mostrarla aunque la lista
    // derive de las ofertas.
    if (sellCurrency !== 'all' && !curs.includes(sellCurrency)) curs.push(sellCurrency);
    return curs.map((c) => ({ value: c, label: c }));
  };

  // Divisa: métodos y monedas por pata (las dos patas son fiat, sin red).
  const divisaMethods = uniq([...DIVISA_OFFERS.map((o) => o.buy_method), ...DIVISA_OFFERS.map((o) => o.sell_method)]);
  const currenciesForDivisaMethod = (method, leg) => {
    const curKey = leg === 'buy' ? 'buy_currency' : 'sell_currency';
    const metKey = leg === 'buy' ? 'buy_method' : 'sell_method';
    const curs = method === 'all'
      ? uniq(DIVISA_OFFERS.map((o) => o[curKey]))
      : uniq(DIVISA_OFFERS.filter((o) => o[metKey] === method).map((o) => o[curKey]));
    const sel = leg === 'buy' ? dBuyFiat : dSellFiat;
    if (sel !== 'all' && !curs.includes(sel)) curs.push(sel);
    return curs.map((c) => ({ value: c, label: c }));
  };

  // Misma lógica de filtrado que MarketOffers del repo original.
  const parsedAmount = Number.parseFloat(amount);
  const isDivisaMarket = marketSegment === 'divisa';
  const filtered = (isDivisaMarket ? DIVISA_OFFERS : OFFERS).filter((o) => {
    if (blockedNames.includes(o.advertiser_name)) return false;
    if (o.side !== effectiveSide) return false;
    if (isDivisaMarket) {
      if (dBuyMethod !== 'all' && o.buy_method !== dBuyMethod) return false;
      if (dBuyFiat !== 'all' && o.buy_currency !== dBuyFiat) return false;
      if (dSellMethod !== 'all' && o.sell_method !== dSellMethod) return false;
      if (dSellFiat !== 'all' && o.sell_currency !== dSellFiat) return false;
    } else {
      if (buyCurrency !== 'all' && o.buy_currency !== buyCurrency) return false;
      if (payment !== 'all' && o.payment_method !== payment) return false;
      if (chain !== 'all' && !o.blockchains.includes(chain)) return false;
      if (sellCurrency !== 'all' && o.sell_currency !== sellCurrency) return false;
    }
    // filtros ocultos del agrupador (la ubicación es un dato
    // derivado: no existe en la oferta ni se muestra en la tabla).
    if (locationFilter !== 'all' && offerLocation(o) !== locationFilter) return false;
    if (rankingFilter !== 'all' && o.advertiser_completion < Number(rankingFilter)) return false;
    if (advertiserFilter !== 'all' && o.advertiser_name !== advertiserFilter) return false;
    if (depositFilter === 'yes' && !o.deposit_made) return false;
    if (depositFilter === 'no' && o.deposit_made) return false;
    if (!Number.isNaN(parsedAmount) && parsedAmount > 0) {
      // La cantidad se busca en la moneda del SEGUNDO CascadeField: con
      // el orden por defecto es la pata de venta y se compara directa
      // con el rango mín-máx; con los campos intercambiados es la pata
      // de compra y se convierte por el precio de la oferta (misma
      // conversión que PriceCell: precio × cantidad) antes de comparar
      // con el rango. Vale para Crypto y para Divisa.
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

  // Datos del perfil público: el primer anuncio del nombre da los datos
  // del anunciante (todos comparten sus stats) y sus ofertas salen
  // ordenadas por precio, sin filtros del mercado.
  const profileFirst = view === 'profile' ? OFFERS.find((o) => o.advertiser_name.toLowerCase() === profileName.toLowerCase()) : null;
  const profileTrader = profileFirst ? toTrader(profileFirst) : null;
  const profileOffers = profileFirst ? OFFERS.filter((o) => o.advertiser_name === profileFirst.advertiser_name).sort((a, b) => a.price - b.price) : [];
  const profileBuyCount = profileOffers.filter((o) => o.side === 'buy').length;
  const profileSellCount = profileOffers.length - profileBuyCount;
  const profileMethods = [...new Set(profileOffers.map((o) => o.payment_method))];
  const profilePayMethods = profileTrader ? [...profileMethods, ...['ETH', 'SOL', 'BTC'].filter((k) => PAYMENT_DETAILS[profileTrader.name]?.[k])] : [];
  const profileChains = [...new Set(profileOffers.flatMap((o) => o.blockchains))];
  const profileCashCities = [...new Set(profileOffers.filter((o) => o.payment_method === 'Efectivo').map((o) => offerLocation(o)))];
  const countByCurrency = (key) => {
    const m = new Map();
    profileOffers.forEach((o) => { const k = o[key]; m.set(k, (m.get(k) || 0) + 1); });
    return [...m.entries()].map(([code, count]) => ({ code, count })).sort((a, b) => b.count - a.count || a.code.localeCompare(b.code));
  };
  const profileCryptoCounts = countByCurrency('buy_currency');
  const profileFiatCounts = countByCurrency('sell_currency');
  const profileHasCash = profileCashCities.length > 0;
  const profileHasOnline = profileOffers.some((o) => o.payment_method !== 'Efectivo');
  const allTraderCompletions = new Map(OFFERS.map((o) => [o.advertiser_name, o.advertiser_completion]));
  const otherCompletions = [...allTraderCompletions.entries()].filter(([n]) => n !== (profileFirst && profileFirst.advertiser_name)).map(([, c]) => c);
  const profileOthersAvg = otherCompletions.length ? Math.round(otherCompletions.reduce((a, b) => a + b, 0) / otherCompletions.length) : 0;
  const gaugeC = 2 * Math.PI * 64;
  const profileTotalPages = Math.max(1, Math.ceil(profileOffers.length / PAGE_SIZE));
  const profileCurrent = Math.min(profilePage, profileTotalPages);
  const profilePageOffers = profileOffers.slice((profileCurrent - 1) * PAGE_SIZE, profileCurrent * PAGE_SIZE);
  const profileFrom = profileOffers.length === 0 ? 0 : (profileCurrent - 1) * PAGE_SIZE + 1;
  const profileTo = Math.min(profileCurrent * PAGE_SIZE, profileOffers.length);
  const from = filtered.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const to = Math.min(currentPage * PAGE_SIZE, filtered.length);

  const upd = (setter) => (v) => { setter(v); setPage(1); };
  const updEvent = (setter, clean) => (e) => { setter(clean ? clean(e.target.value) : e.target.value); setPage(1); };
  const clearFilters = () => {
    setBuyCurrency('all'); setAmount(''); setPayment('all'); setSellCurrency('all'); setChain('all'); setPage(1);
    setDBuyMethod('all'); setDBuyFiat('all'); setDSellMethod('all'); setDSellFiat('all');
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
    setReportView(null); setReportReason(''); setReportNote(''); setMoreOpen(false);
    const u = new URL(window.location.href);
    u.searchParams.set('oferta', String(o.id));
    window.history.replaceState(null, '', `${u.pathname}${u.search}`);
  };
  const closeModal = () => {
    setSelected(null); setOrderDone(false); setMoreOpen(false); setReportView(null);
    const u = new URL(window.location.href);
    u.searchParams.delete('oferta');
    window.history.replaceState(null, '', `${u.pathname}${u.search}`);
  };
  // Enlace profundo y textos para compartir una oferta concreta.
  const offerUrl = (o) => `${window.location.origin}/${isDivisaOffer(o) ? 'divisa' : 'crypto'}/?oferta=${o.id}`;
  const offerShareText = (o) => isDivisaOffer(o)
    ? `Oferta en peetoo: 1 ${o.buy_currency} = ${fmt2(o.price)} ${o.sell_currency} con ${o.advertiser_name} (venta por ${o.sell_method}, compra por ${o.buy_method})`
    : `Oferta en peetoo: 1 ${o.buy_currency} = ${fmt2(o.price)} ${o.sell_currency} con ${o.advertiser_name} (${o.payment_method})`;
  const offerDetailsText = (o) => [
    `Oferta en peetoo — ${o.advertiser_name}`,
    `1 ${o.buy_currency} = ${fmt2(o.price)} ${o.sell_currency}`,
    `Límite: ${fmt(o.min_amount)} - ${fmt(o.max_amount)} ${o.sell_currency}`,
    `Disponible: ${fmt(o.available)} ${o.buy_currency}`,
    isDivisaOffer(o) ? `Métodos: compra ${o.buy_method}, venta ${o.sell_method}` : `Método de pago: ${o.payment_method}`,
    offerUrl(o),
  ].join('\n');
  const copyAction = async (kind, text) => {
    if (await copyText(text)) {
      setCopiedAction(kind);
      window.setTimeout(() => setCopiedAction((c) => (c === kind ? null : c)), 2000);
    }
  };
  const shareWhatsApp = () => { if (!selected) return; window.open(`https://wa.me/?text=${encodeURIComponent(`${offerShareText(selected)} ${offerUrl(selected)}`)}`, '_blank', 'noopener'); setMoreOpen(false); };
  const shareTelegram = () => { if (!selected) return; window.open(`https://t.me/share/url?url=${encodeURIComponent(offerUrl(selected))}&text=${encodeURIComponent(offerShareText(selected))}`, '_blank', 'noopener'); setMoreOpen(false); };
  const toggleFavorite = () => {
    if (!selected) return;
    setFavorites((f) => {
      const next = f.includes(selected.id) ? f.filter((id) => id !== selected.id) : [...f, selected.id];
      try { window.localStorage.setItem('peetoo:favoritos', JSON.stringify(next)); } catch { /* sin almacenamiento */ }
      return next;
    });
  };
  const toggleBlock = () => {
    if (!selected) return;
    setBlockedNames((b) => {
      const next = b.includes(selected.advertiser_name) ? b.filter((n) => n !== selected.advertiser_name) : [...b, selected.advertiser_name];
      try { window.localStorage.setItem('peetoo:bloqueados', JSON.stringify(next)); } catch { /* sin almacenamiento */ }
      return next;
    });
  };
  const REPORT_REASONS = ['Precio falso o engañoso', 'Posible estafa', 'Spam o contenido inapropiado', 'El anunciante no responde', 'Otro motivo'];
  const submitReport = () => {
    if (!selected || !reportReason) return;
    try {
      const list = JSON.parse(window.localStorage.getItem('peetoo:reportes') || '[]');
      list.push({ oferta: selected.id, anunciante: selected.advertiser_name, motivo: reportReason, nota: reportNote, fecha: new Date().toISOString() });
      window.localStorage.setItem('peetoo:reportes', JSON.stringify(list));
    } catch { /* sin almacenamiento */ }
    setReportView('done');
  };
  const modalParsed = Number.parseFloat(modalAmount);

// Lado de la orden en el modal: en el mercado coincide con el lado
// efectivo (las filas visibles ya son de ese lado); en el perfil, cada
// oferta puede ser de un lado distinto, así que sale de la oferta
// misma. Así el modal se comporta igual que en el mercado para esa
// oferta, sin tocar el toggle del mercado.
const orderSide = view === 'profile' && selected ? selected.side : effectiveSide;

// El bloque SwapPair ES el campo de cantidad: se escribe lo que se da (Das)
// y se calcula lo que se recibe (Recibes) con el precio. La validación usa
// el lado de venta de la oferta (sus límites están en esa moneda).
const swapDasCode = selected ? (orderSide === 'sell' ? selected.buy_currency : selected.sell_currency) : '';
const swapRecibesCode = selected ? (orderSide === 'sell' ? selected.sell_currency : selected.buy_currency) : '';
const swapDasAmt = !Number.isNaN(modalParsed) ? modalParsed : 0;
const swapRecibesAmt = orderSide === 'sell' ? swapDasAmt * (selected?.price ?? 0) : swapDasAmt / (selected?.price || 1);
const swapSellAmt = orderSide === 'sell' ? swapRecibesAmt : swapDasAmt;
const swapDasMin = orderSide === 'sell' ? (selected?.min_amount ?? 0) / (selected?.price || 1) : (selected?.min_amount ?? 0);
const swapDasMax = orderSide === 'sell' ? (selected?.max_amount ?? 0) / (selected?.price || 1) : (selected?.max_amount ?? 0);
  const modalValid = selected && !Number.isNaN(modalParsed) && swapSellAmt >= selected.min_amount && swapSellAmt <= selected.max_amount;

  const priceMain = (o) => {
    const valid = !Number.isNaN(parsedAmount) && parsedAmount > 0;
    const v = valid ? o.price * parsedAmount : o.price;
    return `${abbrevNum(v)} ${o.sell_currency}`;
  };
  const priceTitle = (o) => {
    const valid = !Number.isNaN(parsedAmount) && parsedAmount > 0;
    const v = valid ? o.price * parsedAmount : o.price;
    const exact = `${fmt2(v)} ${o.sell_currency}`;
    return priceMain(o) === exact ? undefined : exact;
  };
  const priceNote = (o) => {
    const valid = !Number.isNaN(parsedAmount) && parsedAmount > 0;
    return `${valid ? amount : 1} ${o.buy_currency}`;
  };

  // Con filtro de red, la red filtrada va primera para que siempre quede
  // visible en la tabla y no oculta en el +n; como solo se ven 2, otra
  // de las redes pasa al +n (el +n sigue siendo 1). Sin filtro, el orden
  // no cambia. El perfil pasa 'all' para no heredar el filtro del mercado.
  const renderChains = (o, prioChain = chain) => {
    const items = prioChain !== 'all' && o.blockchains.includes(prioChain)
      ? [prioChain, ...o.blockchains.filter((c) => c !== prioChain)]
      : o.blockchains;
    return (
      <OverflowChips
        items={items}
        maxVisible={2}
        renderItem={(c) => <NetworkChip name={c} symbol={CHAIN_SHORT[c]} color={CHAIN_COLORS[c]} src={CHAIN_SRC[c]} />}
      />
    );
  };

  // Fila de oferta, compartida por el mercado y el perfil: en el perfil
  // el verbo, la dirección del par y el precio salen de la oferta misma
  // (sin filtro de cantidad del mercado) y la celda de anunciante no
  // enlaza a sí misma.
  // La pata fiat de una oferta es método + moneda: si esa combinación
  // tiene tile propio en Comprar fiat, la pata se dibuja con la imagen
  // y el ticker del tile (USDpp, USDzl, CuPdc...); si no, con la foto
  // y el código de la moneda.
  const fiatLegAsset = (o) => {
    const tile = fiatDropdown.coins.find((c) => c.method === o.payment_method && c.currency === o.sell_currency);
    return tile ? { code: tile.code, symbol: tile.symbol, color: tile.color, src: tile.src } : ASSETS[o.sell_currency];
  };

  // Oferta Divisa: se reconoce por tener método en las dos patas (las
  // ofertas Crypto tienen un solo payment_method). Su pata se dibuja
  // con el tile de su método + moneda, o la foto de la moneda.
  const isDivisaOffer = (o) => o && o.buy_method !== undefined;
  const divisaLegAsset = (o, currency) => {
    const method = currency === o.buy_currency ? o.buy_method : o.sell_method;
    const tile = fiatDropdown.coins.find((c) => c.method === method && c.currency === currency);
    return tile ? { code: tile.code, symbol: tile.symbol, color: tile.color, src: tile.src } : ASSETS[currency];
  };

  // Etiqueta corta solo para el badge (el resto usa el nombre completo).
  const methodBadgeLabel = (m) => m === 'Efectivo' ? 'Cash' : m === 'Transferencia Bancaria' ? 'Bank' : m;

  const renderOfferRow = (o, inProfile = false) => {
    if (isDivisaOffer(o)) {
      return (
        <div key={o.id} className="offer-row offer-row-divisa" role="row">
          <div className="offer-cell offer-pair" role="cell" title={`${o.buy_method} ${o.buy_currency} · ${o.sell_method} ${o.sell_currency}`}><AssetPair from={divisaLegAsset(o, o.sell_currency)} to={divisaLegAsset(o, o.buy_currency)} reverse={inProfile ? o.side === 'sell' : effectiveSide === 'sell'} size={44} /></div>
          <div className="offer-cell offer-amounts" role="cell">
            <div className="amount">{fmt(o.available)} {o.buy_currency} {o.deposit_made && DepositIcon}</div>
            <div className="sub">{fmt(o.min_amount)} ~ {fmt(o.max_amount)} {o.sell_currency}</div>
          </div>
          <div className="offer-cell offer-price" role="cell">
            <div className="price"><span className="price-value" title={inProfile ? undefined : priceTitle(o)}>{inProfile ? `${fmt2(o.price)} ${o.sell_currency}` : priceMain(o)}</span> <span className="offer-method-badge">{methodBadgeLabel(o.sell_method)}</span></div>
            <div className="sub">{inProfile ? `1 ${o.buy_currency}` : priceNote(o)} <span className="offer-method-badge">{methodBadgeLabel(o.buy_method)}</span></div>
          </div>
          <div className="offer-cell offer-trader" role="cell">{inProfile ? <TraderCell trader={toTrader(o)} /> : <TraderCell trader={toTrader(o)} href={`/crypto/perfil/${o.advertiser_name}`} onClick={(e) => { e.preventDefault(); goToTrader(o.advertiser_name); }} />}</div>
          <div className="offer-cell offer-actions" role="cell"><Button size="md" onClick={() => openModal(o)}>{inProfile ? (o.side === 'buy' ? 'Comprar' : 'Vender') : verb} {o.buy_currency}</Button></div>
        </div>
      );
    }
    return (
    <div key={o.id} className="offer-row" role="row">
      <div className="offer-cell offer-pair" role="cell"><AssetPair from={fiatLegAsset(o)} to={ASSETS[o.buy_currency]} reverse={inProfile ? o.side === 'sell' : effectiveSide === 'sell'} size={44} /></div>
      <div className="offer-cell offer-amounts" role="cell">
        <div className="amount">{fmt(o.available)} {o.buy_currency} {o.deposit_made && DepositIcon}</div>
        <div className="sub">{fmt(o.min_amount)} ~ {fmt(o.max_amount)} {o.sell_currency}</div>
      </div>
      <div className="offer-cell offer-price" role="cell">
        <div className="price"><span className="price-value" title={inProfile ? undefined : priceTitle(o)}>{inProfile ? `${fmt2(o.price)} ${o.sell_currency}` : priceMain(o)}</span> <span className="offer-method-badge">{methodBadgeLabel(o.payment_method)}</span></div>
        <div className="sub">{inProfile ? `1 ${o.buy_currency}` : priceNote(o)}</div>
      </div>
      <div className="offer-cell offer-chains" role="cell">{inProfile ? renderChains(o, 'all') : renderChains(o)}</div>
      <div className="offer-cell offer-trader" role="cell">{inProfile ? <TraderCell trader={toTrader(o)} /> : <TraderCell trader={toTrader(o)} href={`/crypto/perfil/${o.advertiser_name}`} onClick={(e) => { e.preventDefault(); goToTrader(o.advertiser_name); }} />}</div>
      <div className="offer-cell offer-actions" role="cell"><Button size="md" onClick={() => openModal(o)}>{inProfile ? (o.side === 'buy' ? 'Comprar' : 'Vender') : verb} {o.buy_currency}</Button></div>
    </div>
    );
  };

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
  const dBuyPair = {
    firstPlaceholder: 'Método',
    firstAriaLabel: 'Método de pago',
    options: [{ value: 'all', label: 'Cualquier método' }, ...divisaMethods.map((c) => ({ value: c, label: c }))],
    optionsFor: (m) => currenciesForDivisaMethod(m, 'buy'),
    value: { first: dBuyMethod, second: dBuyFiat === 'all' ? null : dBuyFiat },
    onChange: ({ first, second }) => { setDBuyMethod(first ?? 'all'); setDBuyFiat(second ?? 'all'); setPage(1); },
  };
  const dSellPair = {
    firstPlaceholder: 'Método',
    firstAriaLabel: 'Método de pago',
    options: [{ value: 'all', label: 'Cualquier método' }, ...divisaMethods.map((c) => ({ value: c, label: c }))],
    optionsFor: (m) => currenciesForDivisaMethod(m, 'sell'),
    value: { first: dSellMethod, second: dSellFiat === 'all' ? null : dSellFiat },
    onChange: ({ first, second }) => { setDSellMethod(first ?? 'all'); setDSellFiat(second ?? 'all'); setPage(1); },
  };
  const leftDivisaPair = cascadesSwapped ? dSellPair : dBuyPair;
  const rightDivisaPair = cascadesSwapped ? dBuyPair : dSellPair;
  const leftDivisaCascade = (
    <CascadeField
      key={cascadesSwapped ? 'divisa-sell' : 'divisa-buy'}
      className="filter-cascade"
      secondPlaceholder={side === 'buy' ? 'Comprar' : 'Vender'}
      secondAriaLabel={side === 'buy' ? 'Moneda a comprar' : 'Moneda a vender'}
      {...leftDivisaPair}
    />
  );
  const rightDivisaCascade = (
    <CascadeField
      key={cascadesSwapped ? 'divisa-buy' : 'divisa-sell'}
      className="filter-cascade"
      secondPlaceholder={side === 'buy' ? 'Vender' : 'Comprar'}
      secondAriaLabel={side === 'buy' ? 'Moneda a vender' : 'Moneda a comprar'}
      {...rightDivisaPair}
    />
  );
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
      aria-label={marketSegment === 'divisa' ? 'Intercambiar las dos divisas' : 'Alternar la cantidad entre fiat y crypto'}
      title={marketSegment === 'divisa' ? 'Intercambiar las dos divisas' : 'Alternar la cantidad entre fiat y crypto'}
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
    + (isNarrow && marketSegment === 'divisa' && dBuyMethod !== 'all' ? 1 : 0)
    + (isNarrow && marketSegment === 'divisa' && dSellMethod !== 'all' ? 1 : 0)
    + (isNarrow && marketSegment === 'divisa' && (side === 'buy' ? dSellFiat : dBuyFiat) !== 'all' ? 1 : 0)
    + (isNarrow && marketSegment !== 'divisa' && chain !== 'all' ? 1 : 0)
    + (isNarrow && marketSegment !== 'divisa' && payment !== 'all' ? 1 : 0)
    + (isNarrow && marketSegment !== 'divisa' && (side === 'buy' ? sellCurrency : buyCurrency) !== 'all' ? 1 : 0);

  return (
    <div className={`app${view === 'swapped' ? ' app-swapped' : ''}`}>
      {/* En /swapped, el glosario y Legal el fondo es plano como en
          las páginas de Swapped (#101010 sin resplandor); en el resto
          sigue el PageBackground. */}
      <PageBackground glow={view !== 'swapped' && view !== 'glossary' && view !== 'glossary-term' && view !== 'legal'} />
      <header
        className="topbar"
        ref={buyMenuRef}
        onMouseEnter={() => { cancelBuyMenuClose(); cancelFiatMenuClose(); cancelSwappedMenuClose(); }}
        onMouseLeave={() => { scheduleBuyMenuClose(); scheduleFiatMenuClose(); scheduleSwappedMenuClose(); }}
      >
        <div className="topbar-row">
          <span className="brand">
            <img src={logoUrl} alt="Zeroo" className="logo-img" />
            <SegmentedControl
              ariaLabel="Mercado Crypto o Divisa"
              options={[{ value: 'crypto', label: 'Crypto' }, { value: 'divisa', label: 'Divisa' }]}
              value={marketSegment}
              onChange={goToMarketSegment}
              size="sm"
              className="market-seg"
            />
          </span>
          <span className="topbar-center">
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
          </span>
          <span className="topbar-right">
            <span className="topbar-demo"><Badge variant="lavender">Demo · datos de muestra</Badge></span>
            {/* Botón de login, sin acción por el momento */}
            <button type="button" className="topbar-login">Login</button>
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
            {/* Enlaces + redes en la columna lateral, como en los otros
                menús, no en un pie abajo (el pie solo queda en el cajón móvil). */}
            <MenuLinkColumn links={INFO_LINKS} socials={EXAMPLE_SOCIALS} onNavigate={onInfoFootNavigate} />
          </div>
        )}
        {hamburgerOpen && isNarrow && (
          <nav className="topbar-drawer" aria-label="Menú">
            <SegmentedControl
              ariaLabel="Mercado Crypto o Divisa"
              options={[{ value: 'crypto', label: 'Crypto' }, { value: 'divisa', label: 'Divisa' }]}
              value={marketSegment}
              onChange={goToMarketSegment}
              size="sm"
              className="drawer-market-seg"
            />
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
              <DropdownMenu dropdown={{ ...buyDropdown, links: buyDropdown.links.filter((l) => !INFO_LINKS.includes(l)), socials: undefined }} mobile open={buyMenuOpen} onNavigate={onBuyMenuNavigate} />
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
              <DropdownMenu dropdown={{ ...fiatDropdown, links: fiatDropdown.links.filter((l) => !INFO_LINKS.includes(l)), socials: undefined }} mobile open={fiatMenuOpen} onNavigate={onFiatMenuNavigate} />
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
            {/* En móvil, enlaces y redes una sola vez, fuera de los submenús */}
            {renderInfoFoot('drawer-info-foot')}
            <span className="drawer-demo"><Badge variant="lavender">Demo · datos de muestra</Badge></span>
          </nav>
        )}
      </header>

      {view === 'home' ? (
        <HomePage goToMarket={goToMarket} />
      ) : view === 'swapped' ? (
      <React.Suspense fallback={null}><SwappedView swappedSide={swappedSide} setSwappedSide={setSwappedSide} swappedContent={swappedContent} swappedStatsRef={swappedStatsRef} swappedFaqOpen={swappedFaqOpen} setSwappedFaqOpen={setSwappedFaqOpen} /></React.Suspense>
      ) : view === 'profile' ? (
      <React.Suspense fallback={null}><ProfileView profileTrader={profileTrader} profileOffers={profileOffers} profileBuyCount={profileBuyCount} profileSellCount={profileSellCount} profilePayMethods={profilePayMethods} profileChains={profileChains} profileHasCash={profileHasCash} profileHasOnline={profileHasOnline} profileCashCities={profileCashCities} profileCryptoCounts={profileCryptoCounts} profileFiatCounts={profileFiatCounts} profileOthersAvg={profileOthersAvg} gaugeC={gaugeC} profileCurrent={profileCurrent} profileTotalPages={profileTotalPages} profilePageOffers={profilePageOffers} profileFrom={profileFrom} profileTo={profileTo} showAllCryptos={showAllCryptos} setShowAllCryptos={setShowAllCryptos} showAllFiats={showAllFiats} setShowAllFiats={setShowAllFiats} copiedMethod={copiedMethod} qrModal={qrModal} setQrModal={setQrModal} handleCopy={handleCopy} scrollToOffers={scrollToOffers} setProfilePage={setProfilePage} goToMarket={goToMarket} renderOfferRow={renderOfferRow} /></React.Suspense>
      ) : view === 'legal' ? (
      <React.Suspense fallback={null}><LegalPage goToMarket={goToMarket} goToGlossary={goToGlossary} /></React.Suspense>
      ) : view === 'glossary' ? (
      <React.Suspense fallback={null}><GlossaryPage goToMarket={goToMarket} onTerm={goGlossaryTerm} /></React.Suspense>
            ) : view === 'glossary-term' ? (
      <React.Suspense fallback={null}><GlossaryTermPage term={GLOSSARY_TERMS.find((t) => t.slug === glossaryTerm) || null} goToMarket={goToMarket} goToGlossary={goToGlossary} onTerm={goGlossaryTerm} /></React.Suspense>
      ) : (
      <main className="shell">
        <Heading level="h1">{marketSegment === 'divisa' ? 'Divisa' : 'Crypto'}</Heading>
        <Text tone="muted">{marketSegment === 'divisa' ? 'Cambia USD, EUR, CUP y MLC entre personas sin intermediarios.' : 'Compra y vende USDC y USDT directamente entre personas.'}</Text>

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
                  {marketSegment === 'divisa' ? (
                    <select
                      className="filters-mobile-currency"
                      aria-label="Moneda a comprar"
                      value={side === 'buy' ? dBuyFiat : dSellFiat}
                      onChange={(e) => { side === 'buy' ? setDBuyFiat(e.target.value) : setDSellFiat(e.target.value); setPage(1); }}
                    >
                      <option value="all">Comprar</option>
                      {(side === 'buy' ? currenciesForDivisaMethod(dBuyMethod, 'buy') : currenciesForDivisaMethod(dSellMethod, 'sell')).map((c) => (<option key={c.value} value={c.value}>{c.label}</option>))}
                    </select>
                  ) : side === 'buy' ? (
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
            {isDivisaMarket ? leftDivisaCascade : leftCascade}{swapButton}{isDivisaMarket ? rightDivisaCascade : rightCascade}
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
                    {marketSegment === 'divisa' ? (
                      <>
                        <label className="more-filters-field">
                          <span>Método a comprar</span>
                          <select value={dBuyMethod} onChange={(e) => { setDBuyMethod(e.target.value); setPage(1); }}>
                            <option value="all">Cualquier método</option>
                            {divisaMethods.map((c) => (<option key={c} value={c}>{c}</option>))}
                          </select>
                        </label>
                        <label className="more-filters-field">
                          <span>Método a vender</span>
                          <select value={dSellMethod} onChange={(e) => { setDSellMethod(e.target.value); setPage(1); }}>
                            <option value="all">Cualquier método</option>
                            {divisaMethods.map((c) => (<option key={c} value={c}>{c}</option>))}
                          </select>
                        </label>
                        <label className="more-filters-field">
                          <span>Moneda a vender</span>
                          <select
                            value={side === 'buy' ? dSellFiat : dBuyFiat}
                            onChange={(e) => { side === 'buy' ? setDSellFiat(e.target.value) : setDBuyFiat(e.target.value); setPage(1); }}
                          >
                            <option value="all">Vender</option>
                            {(side === 'buy' ? currenciesForDivisaMethod(dSellMethod, 'sell') : currenciesForDivisaMethod(dBuyMethod, 'buy')).map((c) => (<option key={c.value} value={c.value}>{c.label}</option>))}
                          </select>
                        </label>
                      </>
                    ) : (
                      <>
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

          <div className="offer-list-wrap">
            <div className="offer-list" role="table" aria-label="Ofertas del mercado">
              <div className="offer-head" role="row">
                <div className="offer-cell" role="columnheader">Das / Recibes</div>
                <div className="offer-cell" role="columnheader">Disponible / Min - Max</div>
                <div className="offer-cell" role="columnheader">Precio</div>
                {!isDivisaMarket && (<div className="offer-cell" role="columnheader">Red blockchain</div>)}
                <div className="offer-cell" role="columnheader">Anunciante</div>
                <div className="offer-cell" role="columnheader"><span className="sr-only">Acciones</span></div>
              </div>
              {pageOffers.map((o) => renderOfferRow(o))}
            </div>
            {pageOffers.length === 0 && (
              <div className="empty">No hay anuncios que coincidan con los filtros.</div>
            )}
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
            <a className="foot-link" href="/legal" onClick={(e) => { e.preventDefault(); goInfoPage('/legal', 'legal'); }}>Legal Notice</a>
            <span aria-hidden="true">•</span>
            <a className="foot-link" href="/legal" onClick={(e) => { e.preventDefault(); goInfoPage('/legal', 'legal'); }}>Privacy Policy</a>
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

      <Modal open={!!selected} onClose={closeModal} size="lg" title={selected ? (reportView ? 'Denunciar oferta' : (orderDone ? 'Orden creada' : `${view === 'profile' ? (selected.side === 'buy' ? 'Comprar' : 'Vender') : verb} ${selected.buy_currency}`)) : ''}>
        {selected && !orderDone && reportView === null && (
          <div className="order-grid">
            <div className="order-info">
              <TraderCell trader={toTrader(selected)} href={`/crypto/perfil/${selected.advertiser_name}`} onClick={(e) => { e.preventDefault(); goToTrader(selected.advertiser_name); }} />
              <div className="order-meta">
                <h5 className="order-meta-title">Información de la orden</h5>
                <div className="order-meta-box">
                  <MetadataList items={isDivisaOffer(selected) ? [
                    { label: 'Límite:', value: `${fmt(selected.min_amount)} - ${fmt(selected.max_amount)} ${selected.sell_currency}` },
                    { label: 'Disponible:', value: `${fmt(selected.available)} ${selected.buy_currency}` },
                    ...(toTrader(selected).avgCompletion != null ? [{ label: 'Finalización promedio:', value: `~${toTrader(selected).avgCompletion} min` }] : []),
                    ...((selected.buy_method === 'Efectivo' || selected.sell_method === 'Efectivo') ? [{ label: 'Ubicación:', value: offerLocation(selected) }] : []),
                  ] : [
                    { label: 'Límite:', value: `${fmt(selected.min_amount)} - ${fmt(selected.max_amount)} ${selected.sell_currency}` },
                    { label: 'Disponible:', value: `${fmt(selected.available)} ${selected.buy_currency}` },
                    { label: 'Método de pago:', value: selected.payment_method },
                    ...(toTrader(selected).avgCompletion != null ? [{ label: 'Finalización promedio:', value: `~${toTrader(selected).avgCompletion} min` }] : []),
                    ...(selected.payment_method === 'Efectivo' ? [{ label: 'Ubicación:', value: offerLocation(selected) }] : []),
                    { label: 'Blockchains:', value: selected.blockchains.join(', ') },
                  ]} />
                </div>
              </div>
              <p className="legal">Al proceder, confirmas que leíste y aceptaste el aviso legal de intercambio.</p>
            </div>
            <div className="order-form">
              <SwapPair
                payLabel="Das"
                receiveLabel="Recibes"
                payCurrency={isDivisaOffer(selected) ? divisaLegAsset(selected, swapDasCode) : (swapDasCode === selected.sell_currency ? fiatLegAsset(selected) : ASSETS[swapDasCode])}
                receiveCurrency={isDivisaOffer(selected) ? divisaLegAsset(selected, swapRecibesCode) : (swapRecibesCode === selected.sell_currency ? fiatLegAsset(selected) : ASSETS[swapRecibesCode])}
                payAmount={modalAmount}
                onPayAmountChange={(e) => setModalAmount(e.target.value.replace(/[^0-9.]/g, ''))}
                receiveAmount={fmt(swapRecibesAmt)}
                quickAmounts={[]}
                error={Boolean(modalAmount && !modalValid)}
              />
              <p className="order-rate">Tasa de cambio: 1 {selected.buy_currency} = {fmt2(selected.price)} {selected.sell_currency}</p>
              {selected.blockchains.length > 1 && (
                <Select
                  label="Seleccionar blockchain"
                  value={modalChain}
                  onChange={(e) => setModalChain(e.target.value)}
                  options={selected.blockchains.map((c) => ({ value: c, label: c }))}
                />
              )}
              {modalAmount && !modalValid && (
                <Text tone="muted">El monto debe estar entre {fmt(swapDasMin)} y {fmt(swapDasMax)} {swapDasCode}.</Text>
              )}
              <div className="order-actions">
                <Button size="lg" disabled={!modalValid} onClick={() => setOrderDone(true)}>Comenzar intercambio</Button>
                <div className="order-more" ref={moreRef}>
                  <button type="button" className="order-more-btn" aria-label="Más opciones" aria-haspopup="menu" aria-expanded={moreOpen} onClick={toggleMore}>•••</button>
                  {moreOpen && (
                    <div className="order-more-menu" role="menu" style={morePos ? { bottom: morePos.bottom, right: morePos.right } : undefined}>
                      <p className="order-more-label">Compartir</p>
                      <button type="button" role="menuitem" onClick={shareWhatsApp}>Compartir por WhatsApp</button>
                      <button type="button" role="menuitem" onClick={shareTelegram}>Compartir por Telegram</button>
                      <button type="button" role="menuitem" onClick={() => copyAction('link', offerUrl(selected))}>{copiedAction === 'link' ? '¡Enlace copiado!' : 'Copiar enlace de la oferta'}</button>
                      <hr className="order-more-sep" />
                      <button type="button" role="menuitem" onClick={() => copyAction('details', offerDetailsText(selected))}>{copiedAction === 'details' ? '¡Detalles copiados!' : 'Copiar detalles de la oferta'}</button>
                      <button type="button" role="menuitem" onClick={() => { setMoreOpen(false); goToTrader(selected.advertiser_name); }}>Ver perfil del anunciante</button>
                      <button type="button" role="menuitem" onClick={toggleFavorite}>{favorites.includes(selected.id) ? 'Quitar de favoritos' : 'Guardar en favoritos'}</button>
                      <hr className="order-more-sep" />
                      <button type="button" role="menuitem" className="is-danger" onClick={() => { setMoreOpen(false); setReportView('form'); }}>Denunciar oferta</button>
                      <button type="button" role="menuitem" className="is-danger" onClick={toggleBlock}>{blockedNames.includes(selected.advertiser_name) ? 'Desbloquear anunciante' : 'Bloquear anunciante'}</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        {selected && !orderDone && reportView !== null && (
          <div className="order-report">
            <Text>Denuncia la oferta de {selected.advertiser_name} — 1 {selected.buy_currency} = {fmt2(selected.price)} {selected.sell_currency}.</Text>
            {reportView === 'form' && (
              <>
                <div className="order-report-reasons" role="radiogroup" aria-label="Motivo de la denuncia">
                  {REPORT_REASONS.map((r) => (
                    <button type="button" key={r} role="radio" aria-checked={reportReason === r} className={reportReason === r ? 'is-selected' : ''} onClick={() => setReportReason(r)}>{r}</button>
                  ))}
                </div>
                <textarea className="order-report-note" value={reportNote} onChange={(e) => setReportNote(e.target.value)} placeholder="Detalles (opcional)" rows={3} />
                <div className="order-report-actions">
                  <Button size="lg" disabled={!reportReason} onClick={submitReport}>Enviar reporte</Button>
                  <Button size="lg" variant="secondary" onClick={() => setReportView(null)}>Volver a la oferta</Button>
                </div>
              </>
            )}
            {reportView === 'done' && (
              <>
                <Text>Reporte enviado. Lo revisaremos.</Text>
                <Text tone="muted">Demo: el reporte queda guardado en este navegador.</Text>
                <div className="order-report-actions">
                  <Button size="lg" variant="secondary" onClick={() => setReportView(null)}>Volver a la oferta</Button>
                  <Button size="lg" onClick={closeModal}>Cerrar</Button>
                </div>
              </>
            )}
          </div>
        )}
        {selected && orderDone && (
          <div className="order-done">
            <img src={checkIcon} alt="" className="ui-icon-lg" />
            <Text>Orden creada: das {fmt(swapDasAmt)} {swapDasCode} y recibes {fmt(swapRecibesAmt)} {swapRecibesCode} con {selected.advertiser_name}.</Text>
            <Text tone="muted">Datos de muestra: no se realizó ninguna operación real.</Text>
            <Button size="lg" onClick={closeModal}>{view === 'profile' ? 'Volver al perfil' : 'Volver al mercado'}</Button>
          </div>
        )}
      </Modal>
    </div>
  );
}
