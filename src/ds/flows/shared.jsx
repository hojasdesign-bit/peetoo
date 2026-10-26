import React from 'react';
import styles from './flows.module.css';
import { MenuItem } from '../components/MenuItem/MenuItem.jsx';
import { Avatar } from '../components/Avatar/Avatar.jsx';
import { ChatBubble } from '../components/ChatBubble/ChatBubble.jsx';
import { ChatComposer } from '../components/ChatComposer/ChatComposer.jsx';

/** Barra lateral de la app, como en los videos (logo + navegación + ayuda). */
export function Sidebar({ active = 'Mercado P2P', onNavigate, brand }) {
  const items = [
    { icon: '⇄', label: 'Mercado P2P' },
    { icon: '☰', label: 'Mis anuncios' },
    { icon: '▤', label: 'Mis órdenes' },
    { icon: '◈', label: 'Mi billetera' },
  ];
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        {brand ?? <>Mercado<em>P2P</em></>}
      </div>
      {items.map((it) => (
        <div
          key={it.label}
          style={
            it.label === active
              ? { background: 'var(--cds-accent-soft)', borderRadius: 'var(--cds-radius-md)' }
              : undefined
          }
        >
          <MenuItem icon={it.icon} label={it.label} onClick={() => onNavigate?.(it.label)} />
        </div>
      ))}
      <div className={styles.navSpacer} />
      <MenuItem icon="?" label="Preguntas frecuentes" onClick={() => onNavigate?.('Preguntas frecuentes')} />
      <MenuItem icon="✉" label="Soporte" onClick={() => onNavigate?.('Soporte')} />
    </aside>
  );
}

/** Panel de chat de la sala de orden, con aviso de seguridad del sistema. */
export function ChatPanel({ peerName = 'juan.cripto', messages = [] }) {
  const [draft, setDraft] = React.useState('');
  const [extra, setExtra] = React.useState([]);
  return (
    <div className={styles.chatCard}>
      <div className={styles.chatHead}>
        <Avatar name={peerName} size={36} online />
        <div>
          <div style={{ fontWeight: 700, fontSize: 'var(--cds-text-body-sm)' }}>{peerName}</div>
          <div style={{ color: 'var(--cds-success)', fontSize: 'var(--cds-text-caption)' }}>En línea</div>
        </div>
      </div>
      <div className={styles.chatBody}>
        <div className={styles.chatNotice}>
          ⚠ Por tu seguridad, mantén toda la conversación y el pago dentro de la plataforma. Nunca
          compartas tus datos de contacto ni aceptes pagos por fuera: la garantía solo cubre
          operaciones hechas aquí.
        </div>
        <div className={styles.dayDivider}>Operación iniciada · Hoy 9:41</div>
        {messages.map((m, i) => (
          <ChatBubble key={i} from={m.from} text={m.text} time={m.time} read={m.read} />
        ))}
        {extra.map((m, i) => (
          <ChatBubble key={`x${i}`} from="me" text={m} time="ahora" read />
        ))}
      </div>
      <ChatComposer
        value={draft}
        onChange={setDraft}
        onSend={() => {
          if (draft.trim()) setExtra((e) => [...e, draft.trim()]);
          setDraft('');
        }}
        placeholder="Escribe un mensaje…"
      />
    </div>
  );
}

export const RATE = '1.398,67';

export const OFFERS = [
  {
    trader: { name: 'juan.cripto', trades: 48, completion: 100, verified: true, online: true, score: 96 },
    price: '1.398,67 ARS', marketDelta: 0.4, available: '1.250 USDT',
    limits: '10.000 — 500.000 ARS', methods: ['Transferencia', 'Mercado Pago'], network: 'Base',
  },
  {
    trader: { name: 'Camila Prieto', trades: 233, completion: 99, verified: true, online: true, score: 84 },
    price: '1.401,20 ARS', marketDelta: 0.6, available: '850 USDT',
    limits: '20.000 — 400.000 ARS', methods: ['Transferencia'], network: 'Tron',
  },
  {
    trader: { name: 'mdp.trading', trades: 512, completion: 98, verified: true, online: false, score: 91 },
    price: '1.405,50 ARS', marketDelta: 0.9, available: '3.400 USDT',
    limits: '5.000 — 1.000.000 ARS', methods: ['Transferencia', 'Efectivo'], network: 'Base',
  },
  {
    trader: { name: 'Sur Inversiones', trades: 1024, completion: 99, verified: true, online: true, score: 88 },
    price: '1.410,00 ARS', marketDelta: 1.2, available: '5.000 USDT',
    limits: '50.000 — 2.000.000 ARS', methods: ['Transferencia', 'Wise'], network: 'Polygon',
  },
  {
    trader: { name: 'patagonia.fx', trades: 87, completion: 97, verified: false, online: true, score: 72 },
    price: '1.415,90 ARS', marketDelta: 1.6, available: '640 USDT',
    limits: '10.000 — 300.000 ARS', methods: ['Mercado Pago'], network: 'Tron',
  },
];
