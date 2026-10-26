import React from 'react';
import styles from './flows.module.css';
import { Sidebar, ChatPanel, RATE } from './shared.jsx';
import { Alert } from '../components/Alert/Alert.jsx';
import { Card } from '../components/Card/Card.jsx';
import { Button } from '../components/Button/Button.jsx';
import { FeeRow } from '../components/FeeRow/FeeRow.jsx';
import { CopyField } from '../components/CopyField/CopyField.jsx';
import { Countdown } from '../components/Countdown/Countdown.jsx';
import { TradeStatusPill } from '../components/TradeStatusPill/TradeStatusPill.jsx';
import { TokenIcon } from '../components/TokenIcon/TokenIcon.jsx';
import { Divider } from '../components/Divider/Divider.jsx';

const CHAT_ESPERA = [
  { from: 'them', text: '¡Hola! Gracias por tu orden. En cuanto la acepte, te paso los datos para la transferencia.', time: '9:41' },
];
const CHAT_PAGO = [
  { from: 'them', text: '¡Hola! Ya acepté tu orden. Realiza la transferencia por el total y confirma el pago aquí así te libero los USDT.', time: '9:42' },
  { from: 'me', text: 'Perfecto, la hago ahora.', time: '9:43', read: true },
];
const CHAT_VENTA = [
  { from: 'them', text: 'Hola, quiero comprar tus USDT. Ya tengo la plata lista para transferir.', time: '10:02' },
];

/**
 * Sala de la orden — el corazón de los videos: a la izquierda el estado y la
 * acción principal según el paso; a la derecha, el chat con la contraparte.
 * estado: 'espera' (comprador espera aceptación) · 'pago' (debe transferir) ·
 * 'venta' (vendedor espera el pago para liberar).
 */
export function OrdenRoom({ estado = 'pago', onConfirmarPago, onLiberar, onCancelar, onNavigate, brand }) {
  const titles = {
    espera: 'Espera al vendedor',
    pago: 'Transfiere el dinero',
    venta: 'Espera el pago del comprador',
  };
  return (
    <div className={styles.page}>
      <Sidebar active="Mis órdenes" onNavigate={onNavigate} brand={brand} />
      <main className={styles.main}>
        <div className={styles.headRow}>
          <div>
            <h2 className={styles.title}>{titles[estado]}</h2>
            <p className={styles.subtitle}>Orden #8.412 · Comprar USDT · {RATE} ARS por USDT</p>
          </div>
          <TradeStatusPill status={estado === 'venta' ? 'pagado' : 'pendiente'} />
        </div>

        <div className={styles.roomGrid}>
          <div className={styles.colStack}>
            {estado === 'espera' && (
              <>
                <Alert variant="info" title="Orden creada">
                  Avisamos al vendedor. Si no acepta en 15 minutos, la orden se cancela y no sale
                  ningún pago.
                </Alert>
                <Card>
                  <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0' }}>
                    <Countdown secondsLeft={14 * 60 + 32} totalSeconds={900} label="para que acepte" size={92} />
                  </div>
                  <Divider />
                  <FeeRow label="Pagas" value="10.000 ARS" />
                  <FeeRow label="Recibes" value="7,15 USDT" />
                  <FeeRow label="Método" value="Transferencia bancaria" muted />
                  <FeeRow label="Red" value="Base" muted />
                </Card>
                <Button variant="outline" size="lg" onClick={onCancelar}>
                  Cancelar orden
                </Button>
              </>
            )}

            {estado === 'pago' && (
              <>
                <Alert variant="success" title="El vendedor aceptó tu orden">
                  Transfiere el total exacto y confirma el pago dentro del plazo. Los 7,15 USDT ya
                  están retenidos en garantía.
                </Alert>
                <Card>
                  <FeeRow label="Enviar exactamente" value="10.000 ARS" total />
                  <Divider />
                  <FeeRow label="Banco" value="Banco Galicia" />
                  <FeeRow label="Titular" value="Juan Pérez" />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8 }}>
                    <CopyField label="CBU" value="0070999020000012345678" />
                    <CopyField label="Alias" value="juan.cripto.mp" />
                  </div>
                </Card>
                <Button variant="primary" size="lg" onClick={onConfirmarPago}>
                  Confirmar pago
                </Button>
                <Button variant="ghost" size="md" onClick={onCancelar}>
                  Cancelar orden
                </Button>
              </>
            )}

            {estado === 'venta' && (
              <>
                <Alert variant="warning" title="Todavía no liberes">
                  Libera la cripto solo cuando veas el dinero acreditado en tu cuenta. La plataforma
                  nunca te va a pedir que liberes antes.
                </Alert>
                <Card>
                  <FeeRow label="El comprador te paga" value="10.000 ARS" />
                  <FeeRow label="Tú liberas" value="7,15 USDT" total />
                  <Divider />
                  <FeeRow label="En garantía (contrato)" value="7,15 USDT" muted />
                  <FeeRow label="Comprador" value="maria.compra · 96% completadas" muted />
                  <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0' }}>
                    <Countdown secondsLeft={11 * 60 + 5} totalSeconds={900} label="plazo del pago" size={92} />
                  </div>
                </Card>
                <Button variant="primary" size="lg" onClick={onLiberar}>
                  Liberar 7,15 USDT
                </Button>
                <Button variant="outline" size="md">
                  Abrir una disputa
                </Button>
              </>
            )}
          </div>

          <ChatPanel
            peerName={estado === 'venta' ? 'maria.compra' : 'juan.cripto'}
            messages={estado === 'espera' ? CHAT_ESPERA : estado === 'pago' ? CHAT_PAGO : CHAT_VENTA}
          />
        </div>
      </main>
    </div>
  );
}

/** Pantalla final del flujo: intercambio realizado + comprobante. */
export function ExitoScreen({ onOtraOperacion }) {
  return (
    <div className={styles.centerPage}>
      <div className={styles.centerColNarrow} style={{ textAlign: 'center' }}>
        <div className={styles.checkBadge}>✓</div>
        <div>
          <h2 className={styles.title}>¡Listo! Intercambio realizado</h2>
          <p className={styles.subtitle}>Orden #8.412 · Hoy 9:58 · Garantía liberada</p>
        </div>
        <Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <TokenIcon symbol="$" color="#279e5c" size={34} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700 }}>10.000 ARS</div>
                <div style={{ color: 'var(--cds-muted)', fontSize: 'var(--cds-text-caption)' }}>Pagaste por transferencia</div>
              </div>
            </div>
            <div style={{ textAlign: 'center', color: 'var(--cds-muted)' }}>↓</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <TokenIcon symbol="₮" color="#26a17b" size={34} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700 }}>7,15 USDT</div>
                <div style={{ color: 'var(--cds-muted)', fontSize: 'var(--cds-text-caption)' }}>Recibiste en tu billetera · Red Base</div>
              </div>
            </div>
            <Divider />
            <FeeRow label="Precio por unidad" value={`${RATE} ARS`} muted />
            <FeeRow label="Comisión de red (gas)" value="Cubierto por la plataforma" muted />
          </div>
        </Card>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <Button variant="outline" size="lg">
            Descargar comprobante
          </Button>
          <Button variant="primary" size="lg" onClick={onOtraOperacion}>
            Hacer otra operación
          </Button>
        </div>
      </div>
    </div>
  );
}
