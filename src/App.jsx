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
import logoUrl from './assets/logo.svg';
import checkIcon from './assets/icons/check.svg';
import botIcon from './assets/icons/bot.svg';
import usdcIcon from './assets/coins/usdc.svg';
import usdtIcon from './assets/coins/usdt.svg';
import pyusdIcon from './assets/coins/pyusd.svg';
import ousdIcon from './assets/coins/ousd.svg';
import eurcIcon from './assets/coins/eurc.svg';
import placeholderIcon from './assets/coins/placeholder.svg';
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
    coins: [
      { symbol: 'P', color: '#003087', label: 'Comprar PYUSD', code: 'PYUSD', src: pyusdIcon },
      { symbol: '$', color: '#2775ca', label: 'Comprar USDC', code: 'USDC', src: usdcIcon },
      { symbol: '₮', color: '#26a17b', label: 'Comprar USDT', code: 'USDT', src: usdtIcon },
      { symbol: 'Z', color: '#3a3a44', label: 'Comprar ZLUSD', code: 'ZLUSD', src: placeholderIcon },
      { symbol: 'O', color: '#3a3a44', label: 'Comprar OUSD', code: 'OUSD', src: ousdIcon },
      // Tether (MXNT), Circle (EURC) y pagos internacionales (RLUSD de
      // Ripple). MXNT y RLUSD no tienen logo público en las fuentes
      // consultadas (web3icons, repo original) y usan placeholder.
      { symbol: 'M', color: '#26a17b', label: 'Comprar MXNT', code: 'MXNT', src: placeholderGenericIcon },
      { symbol: '€', color: '#2775ca', label: 'Comprar EURC', code: 'EURC', src: eurcIcon },
      { symbol: 'R', color: '#3a3a44', label: 'Comprar RLUSD', code: 'RLUSD', src: placeholderGenericIcon },
      // USAT: el dólar regulado de Tether para EE. UU. (GENIUS Act,
      // emitido por Anchorage Digital Bank; token distinto de USDT).
      // Sin logo público en las fuentes consultadas → placeholder.
      { symbol: 'U', color: '#26a17b', label: 'Comprar USAT', code: 'USAT', src: placeholderGenericIcon },
    ],
    links: [
      { label: 'Vender crypto' },
      { label: 'Todas las ofertas' },
    ],
  };
  const [buyMenuOpen, setBuyMenuOpen] = React.useState(false);
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
    cancelBuyMenuClose(); setBuyMenuOpen(true);
  };
  React.useEffect(() => () => cancelBuyMenuClose(), []);
  const [isNarrow, setIsNarrow] = React.useState(() => window.matchMedia('(max-width: 720px)').matches);
  React.useEffect(() => {
    const mq = window.matchMedia('(max-width: 720px)');
    const fn = () => setIsNarrow(mq.matches);
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, []);
  React.useEffect(() => {
    if (!buyMenuOpen) return undefined;
    const onPointerDown = (e) => {
      if (buyMenuRef.current && !buyMenuRef.current.contains(e.target)) setBuyMenuOpen(false);
    };
    const onKey = (e) => { if (e.key === 'Escape') setBuyMenuOpen(false); };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [buyMenuOpen]);
  const buyCoin = (code) => {
    setSide('buy'); setBuyCurrency(code); setChain('all'); setPage(1);
    setBuyMenuOpen(false);
    document.querySelector('.market')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  // El DropdownMenu entrega un único onNavigate con el evento: los
  // botones de moneda llevan el código en su tercer span y los enlaces
  // solo texto, así se distingue la acción sin tocar el componente.
  const onBuyMenuNavigate = (e) => {
    e.preventDefault();
    cancelBuyMenuClose();
    setBuyMenuOpen(false);
    const el = e.currentTarget;
    const codeEl = el.children && el.children[2];
    if (codeEl && codeEl.textContent) {
      buyCoin(codeEl.textContent.trim());
      return;
    }
    const label = el.textContent.trim();
    const scrollToMarket = () => document.querySelector('.market')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (label === 'Vender crypto') {
      setSide('sell'); setPage(1); scrollToMarket();
    } else if (label === 'Todas las ofertas') {
      clearFilters(); scrollToMarket();
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
    return curs.map((c) => ({ value: c, label: c }));
  };

  // Misma lógica de filtrado que MarketOffers del repo original.
  const parsedAmount = Number.parseFloat(amount);
  const filtered = OFFERS.filter((o) => {
    if (o.side !== side) return false;
    if (buyCurrency !== 'all' && o.buy_currency !== buyCurrency) return false;
    if (payment !== 'all' && !o.payment_methods.includes(payment)) return false;
    if (chain !== 'all' && !o.blockchains.includes(chain)) return false;
    if (sellCurrency !== 'all' && o.sell_currency !== sellCurrency) return false;
    if (!Number.isNaN(parsedAmount) && parsedAmount > 0) {
      if (parsedAmount < o.min_amount || parsedAmount > o.max_amount) return false;
    }
    return true;
  }).sort((a, b) => a.price - b.price);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageOffers = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const from = filtered.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const to = Math.min(currentPage * PAGE_SIZE, filtered.length);

  const upd = (setter) => (v) => { setter(v); setPage(1); };
  const updEvent = (setter, clean) => (e) => { setter(clean ? clean(e.target.value) : e.target.value); setPage(1); };
  const clearFilters = () => {
    setBuyCurrency('all'); setAmount(''); setPayment('all'); setSellCurrency('all'); setChain('all'); setPage(1);
  };
  const verb = side === 'buy' ? 'Comprar' : 'Vender';
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

  return (
    <div className="app">
      <PageBackground />
      <header
        className="topbar"
        ref={buyMenuRef}
        onMouseEnter={cancelBuyMenuClose}
        onMouseLeave={scheduleBuyMenuClose}
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
                onClick={() => setBuyMenuOpen((o) => !o)}
              >
                Comprar crypto
                <span className="buy-menu-chev" aria-hidden="true" />
              </button>
            </span>
            <span className="topbar-demo"><Badge variant="lavender">Demo · datos de muestra</Badge></span>
          </span>
        </div>
        {buyMenuOpen && !isNarrow && (
          <DropdownMenu dropdown={buyDropdown} onNavigate={onBuyMenuNavigate} />
        )}
        {buyMenuOpen && isNarrow && (
          <DropdownMenu dropdown={buyDropdown} mobile open={buyMenuOpen} onNavigate={onBuyMenuNavigate} />
        )}
      </header>

      <main className="shell">
        <Heading level="h1">Crypto</Heading>
        <Text tone="muted">Compra y vende USDC y USDT directamente entre personas.</Text>

        <section className="market" aria-label="Ofertas del mercado">
          <div className="filters">
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
            <CascadeField
              className="filter-cascade"
              firstPlaceholder="Blockchain"
              secondPlaceholder="Comprar"
              firstAriaLabel="Red blockchain"
              secondAriaLabel="Moneda a comprar"
              options={[{ value: 'all', label: 'Cualquier blockchain' }, ...chainOptions.map((c) => ({ value: c, label: c }))]}
              optionsFor={currenciesForChain}
              value={{ first: chain, second: buyCurrency === 'all' ? null : buyCurrency }}
              onChange={({ first, second }) => { setChain(first ?? 'all'); setBuyCurrency(second ?? 'all'); setPage(1); }}
            />
            <CascadeField
              className="filter-cascade"
              firstPlaceholder="Método"
              secondPlaceholder="Vender"
              firstAriaLabel="Método de pago"
              secondAriaLabel="Moneda a vender"
              options={[{ value: 'all', label: 'Cualquier método' }, ...paymentOptions.map((c) => ({ value: c, label: c }))]}
              optionsFor={currenciesForMethod}
              value={{ first: payment, second: sellCurrency === 'all' ? null : sellCurrency }}
              onChange={({ first, second }) => { setPayment(first ?? 'all'); setSellCurrency(second ?? 'all'); setPage(1); }}
            />
            <Button variant="outline" onClick={clearFilters} className="filter-clear">Eliminar filtros</Button>
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
                    <td><AssetPair from={ASSETS[o.sell_currency]} to={ASSETS[o.buy_currency]} reverse={side === 'sell'} size={44} /></td>
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
                  <AssetPair from={ASSETS[o.sell_currency]} to={ASSETS[o.buy_currency]} reverse={side === 'sell'} size={44} />
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
