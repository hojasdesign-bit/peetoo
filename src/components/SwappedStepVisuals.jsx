import React from 'react';

// Visuales de los pasos de /swapped: mini-mockups de interfaz dibujados
// en SVG propio (215×171, como los de la referencia), sin copiar las
// ilustraciones de Swapped ni logos de marca. Los textos son genéricos
// y los iconos son formas geométricas simples.

const LABEL = '#9a9ab8';
const LINE = 'rgba(255, 255, 255, 0.08)';
const BOX = '#2a2a52';
const PILL = '#3a3a6a';
const ICON = '#c9c9e8';
const ACCENT = '#7c5cf0';

function Panel({ children, violet }) {
  return (
    <svg viewBox="0 0 215 171" role="img" aria-hidden="true">
      {violet ? (
        <>
          <defs>
            <linearGradient id={violet} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0e002c" />
              <stop offset="55%" stopColor="#2a0a6e" />
              <stop offset="100%" stopColor="#4608e3" />
            </linearGradient>
            <filter id={`${violet}-grain`}>
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
          </defs>
          <rect width="215" height="171" fill={`url(#${violet})`} />
          {/* Grano fino sobre el degradado, como el de la referencia. */}
          <rect width="215" height="171" filter={`url(#${violet}-grain)`} opacity="0.12" />
        </>
      ) : (
        <rect width="215" height="171" fill="#1c1c38" />
      )}
      {children}
    </svg>
  );
}

// Caja oscura de los visuales de venta, como en la referencia.
const SELLBOX = '#1e1e45';
const SELLDISC_USDC = '#2775ca';
const SELLDISC_EUR = '#003399';

function BuySelect() {
  return (
    <Panel>
      <rect x="16" y="16" width="183" height="56" rx="12" fill={BOX} stroke={LINE} />
      <text x="28" y="36" fontSize="9" fill={LABEL}>You spend</text>
      <text x="28" y="58" fontSize="16" fontWeight="700" fill="#ffffff">100.00</text>
      <rect x="140" y="30" width="47" height="24" rx="12" fill={PILL} />
      <text x="163.5" y="46" fontSize="10" fontWeight="700" fill="#ffffff" textAnchor="middle">USD</text>
      <circle cx="107.5" cy="86" r="12" fill="#5e17eb" />
      <path d="M107.5 80 v12 m-4 -4 l4 4 4 -4" stroke="#ffffff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="16" y="102" width="183" height="54" rx="12" fill={BOX} stroke={LINE} />
      <text x="28" y="120" fontSize="9" fill={LABEL}>You receive</text>
      <text x="28" y="142" fontSize="16" fontWeight="700" fill="#ffffff">99.84</text>
      <rect x="132" y="114" width="55" height="24" rx="12" fill={PILL} />
      <text x="159.5" y="130" fontSize="10" fontWeight="700" fill="#ffffff" textAnchor="middle">USDC</text>
    </Panel>
  );
}

// Venta, paso 1: dos cajas (You sell USDC / You receive EUR) unidas
// por una flecha violeta, como en la tarjeta de la referencia.
function SellSelect() {
  return (
    <Panel violet="sell-violet-select">
      <rect x="14" y="26" width="187" height="48" rx="12" fill={SELLBOX} stroke={LINE} />
      <text x="26" y="55" fontSize="10" fill={LABEL}>You sell</text>
      <circle cx="143" cy="50" r="13" fill={SELLDISC_USDC} />
      <text x="143" y="54" fontSize="11" fontWeight="700" fill="#ffffff" textAnchor="middle">$</text>
      <text x="162" y="54" fontSize="11" fontWeight="700" fill="#ffffff">USDC</text>
      <circle cx="107.5" cy="86" r="13" fill="#5e17eb" />
      <path d="M107.5 79 v14 m-5 -5 l5 5 5 -5" stroke="#ffffff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="14" y="98" width="187" height="48" rx="12" fill={SELLBOX} stroke={LINE} />
      <text x="26" y="127" fontSize="10" fill={LABEL}>You receive</text>
      <circle cx="148" cy="122" r="13" fill={SELLDISC_EUR} />
      <text x="148" y="126" fontSize="11" fontWeight="700" fill="#ffffff" textAnchor="middle">€</text>
      <text x="167" y="126" fontSize="11" fontWeight="700" fill="#ffffff">EUR</text>
    </Panel>
  );
}

function Pay() {
  const squares = [
    { x: 16, y: 18, glyph: 'card' },
    { x: 114, y: 18, glyph: 'bank' },
    { x: 16, y: 92, glyph: 'phone' },
    { x: 114, y: 92, glyph: 'wallet' },
  ];
  return (
    <Panel>
      {squares.map((s) => {
        const cx = s.x + 42.5;
        const cy = s.y + 31;
        return (
          <g key={s.glyph}>
            <rect x={s.x} y={s.y} width="85" height="62" rx="12" fill={BOX} stroke={LINE} />
            {s.glyph === 'card' && (
              <g stroke={ICON} strokeWidth="2" fill="none" strokeLinecap="round">
                <rect x={cx - 16} y={cy - 11} width="32" height="22" rx="4" />
                <path d={`M${cx - 16} ${cy - 3} h32`} />
              </g>
            )}
            {s.glyph === 'bank' && (
              <g stroke={ICON} strokeWidth="2" fill="none" strokeLinecap="round">
                <path d={`M${cx - 14} ${cy - 6} L${cx} ${cy - 16} L${cx + 14} ${cy - 6}`} />
                <path d={`M${cx - 8} ${cy - 1} v9 M${cx} ${cy - 1} v9 M${cx + 8} ${cy - 1} v9`} />
                <path d={`M${cx - 14} ${cy + 12} h28`} />
              </g>
            )}
            {s.glyph === 'phone' && (
              <g stroke={ICON} strokeWidth="2" fill="none">
                <rect x={cx - 9} y={cy - 14} width="18" height="28" rx="4" />
                <circle cx={cx} cy={cy + 8} r="1.5" fill={ICON} stroke="none" />
              </g>
            )}
            {s.glyph === 'wallet' && (
              <g stroke={ICON} strokeWidth="2" fill="none">
                <rect x={cx - 15} y={cy - 10} width="30" height="20" rx="4" />
                <rect x={cx + 7} y={cy - 4} width="6" height="8" rx="2" fill={ICON} stroke="none" />
              </g>
            )}
          </g>
        );
      })}
    </Panel>
  );
}

// Venta, paso 2: billetera — moneda — depósito, unidos por una línea,
// como en la tarjeta de la referencia.
function Send() {
  return (
    <Panel violet="sell-violet-send">
      <path d="M36 85 h143" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="2" fill="none" />
      <rect x="14" y="63" width="44" height="44" rx="12" fill={SELLBOX} stroke={LINE} />
      <g stroke="#ffffff" strokeWidth="2" fill="none" strokeLinecap="round">
        <rect x="25" y="74" width="22" height="16" rx="3" />
        <rect x="41" y="79" width="5" height="6" rx="1.5" fill="#ffffff" stroke="none" />
      </g>
      <circle cx="107.5" cy="85" r="19" fill={SELLDISC_USDC} />
      <text x="107.5" y="90" fontSize="14" fontWeight="700" fill="#ffffff" textAnchor="middle">$</text>
      <rect x="157" y="63" width="44" height="44" rx="12" fill={SELLBOX} stroke={LINE} />
      <g stroke="#ffffff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M179 76 v8 m-5 -5 l5 5 5 -5" />
        <path d="M168 92 h22" />
      </g>
    </Panel>
  );
}

function ReceiveWallet() {
  return (
    <Panel>
      <rect x="57" y="36" width="101" height="64" rx="12" fill={BOX} stroke={LINE} />
      <rect x="70" y="56" width="26" height="20" rx="4" stroke={ICON} strokeWidth="2" fill="none" />
      <rect x="88" y="62" width="6" height="7" rx="2" fill={ICON} />
      <rect x="114" y="56" width="40" height="20" rx="10" fill={PILL} />
      <text x="134" y="70" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">USDC</text>
      <circle cx="148" cy="32" r="14" fill="#22c55e" />
      <path d="M142 32 l4 4 8 -8" stroke="#ffffff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="107.5" y="128" fontSize="13" fontWeight="700" fill="#ffffff" textAnchor="middle">Received</text>
      <text x="107.5" y="148" fontSize="11" fill={LABEL} textAnchor="middle">100 USDC</text>
    </Panel>
  );
}

// Venta, paso 3: billetera — moneda — banco, unidos por una línea,
// como en la tarjeta de la referencia.
function ReceiveBank() {
  return (
    <Panel violet="sell-violet-receive">
      <path d="M36 85 h143" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="2" fill="none" />
      <rect x="14" y="63" width="44" height="44" rx="12" fill={SELLBOX} stroke={LINE} />
      <g stroke="#ffffff" strokeWidth="2" fill="none" strokeLinecap="round">
        <rect x="25" y="74" width="22" height="16" rx="3" />
        <rect x="41" y="79" width="5" height="6" rx="1.5" fill="#ffffff" stroke="none" />
      </g>
      <circle cx="107.5" cy="85" r="19" fill={SELLDISC_EUR} />
      <text x="107.5" y="90" fontSize="14" fontWeight="700" fill="#ffffff" textAnchor="middle">€</text>
      <rect x="157" y="63" width="44" height="44" rx="12" fill={SELLBOX} stroke={LINE} />
      <g stroke="#ffffff" strokeWidth="2" fill="none" strokeLinecap="round">
        <path d="M168 74 L179 68 L190 74" />
        <path d="M172 78 v8 M179 78 v8 M186 78 v8" />
        <path d="M168 90 h22" />
      </g>
    </Panel>
  );
}

const VARIANTS = {
  'buy-select': BuySelect,
  'sell-select': SellSelect,
  pay: Pay,
  send: Send,
  'receive-wallet': ReceiveWallet,
  'receive-bank': ReceiveBank,
};

export function SwappedStepVisual({ variant }) {
  const Visual = VARIANTS[variant] || BuySelect;
  return <Visual />;
}
