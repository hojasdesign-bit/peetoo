import React from 'react';
import styles from './flows.module.css';
import { RATE } from './shared.jsx';
import { Modal } from '../components/Modal/Modal.jsx';
import { Input } from '../components/Input/Input.jsx';
import { Button } from '../components/Button/Button.jsx';
import { Divider } from '../components/Divider/Divider.jsx';
import { Avatar } from '../components/Avatar/Avatar.jsx';
import { Badge } from '../components/Badge/Badge.jsx';
import { StatCard } from '../components/StatCard/StatCard.jsx';
import { FeeRow } from '../components/FeeRow/FeeRow.jsx';
import { AmountField } from '../components/AmountField/AmountField.jsx';
import { Select } from '../components/Select/Select.jsx';
import { RatingStars } from '../components/RatingStars/RatingStars.jsx';
import { Textarea } from '../components/Textarea/Textarea.jsx';

/** Inicio de sesión, como en el video: email o Google, sobre el mercado. */
export function LoginModal({ onClose, onContinuar }) {
  return (
    <Modal open onClose={onClose} title="Iniciar sesión o registrarse" size="sm">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Input label="Correo electrónico" placeholder="nombre@correo.com" type="email" />
        <Button variant="primary" size="lg" style={{ width: '100%' }} onClick={onContinuar}>
          Continuar
        </Button>
        <Divider label="o" />
        <Button variant="surface" size="lg" style={{ width: '100%' }} onClick={onContinuar}>
          <span className={styles.googleBtn}>
            <span className={styles.gMark}>G</span> Continuar con Google
          </span>
        </Button>
        <p className={styles.subtitle} style={{ textAlign: 'center', margin: 0 }}>
          Al continuar aceptas los términos del servicio y la política de privacidad.
        </p>
      </div>
    </Modal>
  );
}

/**
 * Tomar una orden del mercado: el modal «Comprar USDT» del video, con el
 * perfil del vendedor a la izquierda y el formulario de montos a la derecha.
 */
export function TomarOrdenModal({ onClose, onConfirm, modo = 'comprar' }) {
  const [monto, setMonto] = React.useState('10.000');
  const comprando = modo === 'comprar';
  return (
    <Modal open onClose={onClose} title="" size="lg">
      <div className={styles.modalCols}>
        <div className={styles.modalCol}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Avatar name="juan.cripto" size={44} ringScore={96} online />
            <div>
              <div style={{ fontWeight: 700 }}>juan.cripto</div>
              <div style={{ color: 'var(--cds-muted)', fontSize: 'var(--cds-text-caption)' }}>
                Responde en ~3 min
              </div>
            </div>
            <Badge tone="accent">Verificado</Badge>
          </div>
          <div className={styles.statPair}>
            <StatCard label="Operaciones" value="48" />
            <StatCard label="Completadas" value="100%" />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>Información de la orden</h4>
            <div style={{ marginTop: 8 }}>
              <FeeRow label="Tiempo de liberación" value="5 – 60 min" muted />
              <FeeRow label="Disponibilidad" value="1.250 USDT" muted />
              <FeeRow label="Red" value="Base" muted />
            </div>
          </div>
          <p className={styles.subtitle} style={{ margin: 0 }}>
            El pago debe salir de una cuenta a tu nombre. La cripto queda retenida en garantía
            hasta que confirmes el pago.
          </p>
        </div>

        <div className={styles.modalCol}>
          <h3 className={styles.sectionTitle} style={{ fontSize: 'var(--cds-text-h4, 20px)' }}>
            {comprando ? 'Comprar USDT' : 'Vender USDT'}
          </h3>
          <AmountField
            label={comprando ? 'Pagas' : 'Vendes'}
            value={comprando ? monto : '7,15'}
            onChange={(e) => setMonto(e.target.value)}
            currency={comprando ? { code: 'ARS', symbol: '$', color: '#279e5c' } : { code: 'USDT', symbol: '₮', color: '#26a17b' }}
          />
          <p className={styles.subtitle} style={{ margin: 0 }}>
            Precio por unidad: 1 USDT = {RATE} ARS · Límites: 10.000 – 500.000 ARS
          </p>
          <Select
            label="Método de pago"
            options={[
              { value: 'transfer', label: 'Transferencia bancaria' },
              { value: 'mp', label: 'Mercado Pago' },
            ]}
            defaultValue="transfer"
          />
          <Select
            label="Red donde recibes"
            options={[
              { value: 'base', label: 'Base' },
              { value: 'tron', label: 'Tron' },
            ]}
            defaultValue="base"
          />
          <div className={styles.rateRow}>
            <span className={styles.subtitle} style={{ margin: 0 }}>Recibes</span>
            <span className={styles.rateBig}>{comprando ? '7,15 USDT' : '10.000 ARS'} ✓</span>
            <span className={styles.subtitle} style={{ margin: 0 }}>Sin comisión de red: el gas lo cubre la plataforma</span>
          </div>
          <Button variant="primary" size="lg" style={{ width: '100%' }} onClick={onConfirm}>
            {comprando ? 'Confirmar compra' : 'Confirmar venta'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

/** Calificación al cerrar la operación, como el modal final del video. */
export function CalificarModal({ onClose, onEnviar }) {
  const [stars, setStars] = React.useState(0);
  return (
    <Modal
      open
      onClose={onClose}
      title="¿Cómo fue tu experiencia?"
      size="sm"
      footer={
        <>
          <Button variant="ghost" size="md" onClick={onClose}>
            Ahora no
          </Button>
          <Button variant="primary" size="md" onClick={onEnviar}>
            Enviar calificación
          </Button>
        </>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center' }}>
        <RatingStars value={stars} onRate={setStars} />
        <Textarea
          label="Comentario (opcional)"
          rows={3}
          placeholder="Cuenta cómo fue operar con juan.cripto…"
          style={{ width: '100%' }}
        />
      </div>
    </Modal>
  );
}
