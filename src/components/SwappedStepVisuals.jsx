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

function Panel({ children }) {
  return (
    <svg viewBox="0 0 215 171" role="img" aria-hidden="true">
      <rect width="215" height="171" rx="16" fill="#1c1c38" />
      {children}
    </svg>
  );
}

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

function SellSelect() {
  const rows = [
    { y: 16, sym: '$', code: 'USD', name: 'US Dollar', selected: true },
    { y: 66, sym: '€', code: 'EUR', name: 'Euro', selected: false },
    { y: 116, sym: '£', code: 'GBP', name: 'Pound', selected: false },
  ];
  return (
    <Panel>
      {rows.map((r) => (
        <g key={r.code}>
          <rect x="16" y={r.y} width="183" height="44" rx="12" fill={BOX} stroke={r.selected ? ACCENT : LINE} strokeWidth={r.selected ? 1.5 : 1} />
          <circle cx="38" cy={r.y + 22} r="11" fill={PILL} />
          <text x="38" y={r.y + 26} fontSize="10" fontWeight="700" fill="#ffffff" textAnchor="middle">{r.sym}</text>
          <text x="58" y={r.y + 27} fontSize="12" fontWeight="700" fill="#ffffff">{r.code}</text>
          <text x="100" y={r.y + 27} fontSize="11" fill={LABEL}>{r.name}</text>
          <circle cx="183" cy={r.y + 22} r="9" fill={r.selected ? ACCENT : 'none'} stroke={r.selected ? ACCENT : '#6a6a9a'} strokeWidth="1.5" />
          {r.selected && <circle cx="183" cy={r.y + 22} r="3.5" fill="#ffffff" />}
        </g>
      ))}
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

function Send() {
  return (
    <Panel>
      <rect x="16" y="52" width="68" height="66" rx="12" fill={BOX} stroke={LINE} />
      <rect x="36" y="68" width="28" height="20" rx="4" stroke={ICON} strokeWidth="2" fill="none" />
      <rect x="56" y="75" width="6" height="7" rx="2" fill={ICON} />
      <text x="50" y="106" fontSize="9" fill={LABEL} textAnchor="middle">Wallet</text>
      <path d="M92 85 h34 M120 79 L128 85 L120 91" stroke={ACCENT} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="134" y="52" width="65" height="66" rx="12" fill={BOX} stroke={LINE} />
      <text x="166.5" y="82" fontSize="11" fontWeight="700" fill="#ffffff" textAnchor="middle">0x7f…3a</text>
      <text x="166.5" y="100" fontSize="9" fill={LABEL} textAnchor="middle">Deposit</text>
      <rect x="74" y="132" width="67" height="18" rx="9" fill="rgba(34, 197, 94, 0.15)" />
      <path d="M86 141 l3 3 5 -6" stroke="#4ade80" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="100" y="144" fontSize="8" fill="#4ade80">Sent</text>
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

function ReceiveBank() {
  return (
    <Panel>
      <g stroke={ICON} strokeWidth="2.5" fill="none" strokeLinecap="round">
        <path d="M82 58 L107.5 42 L133 58" />
        <path d="M92 64 v14 M107.5 64 v14 M123 64 v14" />
        <path d="M82 82 h51" />
      </g>
      <circle cx="140" cy="36" r="13" fill="#22c55e" />
      <path d="M134 36 l4 4 8 -8" stroke="#ffffff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="107.5" y="112" fontSize="13" fontWeight="700" fill="#ffffff" textAnchor="middle">Received</text>
      <text x="107.5" y="132" fontSize="11" fill={LABEL} textAnchor="middle">$100.00</text>
      <rect x="57" y="142" width="101" height="20" rx="10" fill={BOX} />
      <text x="107.5" y="156" fontSize="10" fill={ICON} textAnchor="middle">•••• 4821</text>
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
