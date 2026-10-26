import React from 'react';
import styles from './flows.module.css';
import { Sidebar, RATE } from './shared.jsx';
import { StepProgress } from '../components/StepProgress/StepProgress.jsx';
import { SegmentedControl } from '../components/SegmentedControl/SegmentedControl.jsx';
import { CurrencySelect } from '../components/CurrencySelect/CurrencySelect.jsx';
import { Select } from '../components/Select/Select.jsx';
import { Input } from '../components/Input/Input.jsx';
import { AmountField } from '../components/AmountField/AmountField.jsx';
import { Textarea } from '../components/Textarea/Textarea.jsx';
import { Switch } from '../components/Switch/Switch.jsx';
import { RadioGroup } from '../components/RadioGroup/RadioGroup.jsx';
import { PaymentMethodRow } from '../components/PaymentMethodRow/PaymentMethodRow.jsx';
import { Button } from '../components/Button/Button.jsx';
import { Alert } from '../components/Alert/Alert.jsx';
import { FeeRow } from '../components/FeeRow/FeeRow.jsx';
import { Divider } from '../components/Divider/Divider.jsx';
import { EmptyState } from '../components/EmptyState/EmptyState.jsx';
import { OfferCard } from '../components/OfferCard/OfferCard.jsx';
import { StatCard } from '../components/StatCard/StatCard.jsx';

/**
 * Crear anuncio — el segundo flujo del video de compra: tipo y cripto, red,
 * precio, condiciones (disponibilidad, límites, tiempo de pago), métodos de
 * pago y condiciones opcionales, todo en un asistente por pasos.
 */
export function CrearAnuncioScreen({ onContinuar, onAtras }) {
  const [tipo, setTipo] = React.useState('comprar');
  const [precio, setPrecio] = React.useState('mercado');
  const [verificados, setVerificados] = React.useState(true);
  return (
    <div className={styles.centerPage}>
      <div className={styles.centerCol}>
        <div style={{ textAlign: 'center' }}>
          <h2 className={styles.title}>Crear anuncio</h2>
          <p className={styles.subtitle}>Publica tus condiciones y recibe órdenes de otros usuarios</p>
        </div>
        <StepProgress steps={['Anuncio', 'Condiciones', 'Publicar']} current={1} />

        <div className={styles.formCard}>
          <h3 className={styles.sectionTitle}>¿Qué quieres hacer?</h3>
          <SegmentedControl
            options={[
              { value: 'comprar', label: 'Quiero comprar' },
              { value: 'vender', label: 'Quiero vender' },
            ]}
            value={tipo}
            onChange={setTipo}
          />
          <div className={styles.formGrid2}>
            <CurrencySelect
              label="Cripto"
              value="usdt"
              options={[
                { code: 'USDT', label: 'Tether', symbol: '₮', color: '#26a17b' },
                { code: 'USDC', label: 'USD Coin', symbol: '$', color: '#2775ca' },
              ]}
            />
            <Select
              label="Red blockchain"
              options={[
                { value: 'base', label: 'Base' },
                { value: 'tron', label: 'Tron' },
                { value: 'polygon', label: 'Polygon' },
              ]}
              defaultValue="base"
            />
          </div>
        </div>

        <div className={styles.formCard}>
          <h3 className={styles.sectionTitle}>Precio</h3>
          <RadioGroup
            name="precio"
            value={precio}
            onChange={setPrecio}
            options={[
              { value: 'mercado', label: 'Precio de mercado', hint: 'Se actualiza solo con el mercado' },
              { value: 'fijo', label: 'Precio fijo', hint: 'Lo defines tú y no cambia' },
            ]}
          />
          <AmountField
            label="Tu precio por USDT"
            value="1.398,67"
            currency={{ code: 'ARS', symbol: '$', color: '#279e5c' }}
          />
          <p className={styles.subtitle} style={{ margin: 0 }}>
            Precio de mercado ahora: {RATE} ARS por USDT
          </p>
        </div>

        <div className={styles.formCard}>
          <h3 className={styles.sectionTitle}>Condiciones de tu anuncio</h3>
          <div className={styles.formGrid2}>
            <Input label="Disponibilidad total (ARS)" defaultValue="50.000" />
            <Select
              label="Tiempo para pagar"
              options={[
                { value: '15', label: '15 minutos' },
                { value: '30', label: '30 minutos' },
                { value: '60', label: '1 hora' },
              ]}
              defaultValue="15"
            />
            <Input label="Límite mínimo por orden (ARS)" defaultValue="10.000" />
            <Input label="Límite máximo por orden (ARS)" defaultValue="50.000" />
          </div>

          <h3 className={styles.sectionTitle}>Métodos de pago</h3>
          <PaymentMethodRow
            icon="🏦"
            name="Transferencia bancaria"
            sublabel="Banco Galicia · Alias juan.cripto.mp"
            selected
          />
          <Button variant="surface" size="md">
            + Añadir método de pago
          </Button>

          <h3 className={styles.sectionTitle}>Condiciones opcionales</h3>
          <div className={styles.switchRow}>
            <span>Solo usuarios verificados</span>
            <Switch checked={verificados} onChange={setVerificados} />
          </div>
          <Textarea
            label="Mensaje automático para la contraparte"
            rows={3}
            defaultValue="Hola, gracias por tu orden. Acepto solo transferencias desde cuentas a tu nombre. Libero en cuanto se acredite el pago."
          />
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <Button variant="outline" size="lg" style={{ flex: 1 }} onClick={onAtras}>
            Atrás
          </Button>
          <Button variant="primary" size="lg" style={{ flex: 2 }} onClick={onContinuar}>
            Continuar
          </Button>
        </div>
      </div>
    </div>
  );
}

/** Último paso del asistente: revisar el resumen y publicar. */
export function RevisarScreen({ onPublicar, onEditar }) {
  return (
    <div className={styles.centerPage}>
      <div className={styles.centerColNarrow}>
        <div style={{ textAlign: 'center' }}>
          <h2 className={styles.title}>Revisa y publica tu anuncio</h2>
          <p className={styles.subtitle}>Así lo verán los demás usuarios en el mercado</p>
        </div>
        <div className={styles.formCard}>
          <FeeRow label="Quieres comprar" value="35,75 USDT" total />
          <FeeRow label="Disponibilidad" value="50.000 ARS" />
          <Divider />
          <FeeRow label="Precio por unidad" value={`${RATE} ARS`} muted />
          <FeeRow label="Tipo de precio" value="De mercado" muted />
          <FeeRow label="Red" value="Base" muted />
          <FeeRow label="Métodos de pago" value="Transferencia bancaria" muted />
          <FeeRow label="Tiempo para pagar" value="15 minutos" muted />
          <FeeRow label="Límites por orden" value="10.000 — 50.000 ARS" muted />
        </div>
        <Alert variant="info">
          Al publicar aceptas que la cripto de cada orden queda retenida en garantía hasta que la
          contraparte confirme el pago.
        </Alert>
        <Button variant="primary" size="lg" onClick={onPublicar}>
          Publicar anuncio
        </Button>
        <Button variant="ghost" size="md" onClick={onEditar}>
          Volver a editar
        </Button>
      </div>
    </div>
  );
}

/** Mis anuncios sin publicar todavía: el estado vacío del video. */
export function MisAnunciosScreen({ onCrear, onNavigate, brand }) {
  return (
    <div className={styles.page}>
      <Sidebar active="Mis anuncios" onNavigate={onNavigate} brand={brand} />
      <main className={styles.main}>
        <div className={styles.headRow}>
          <div>
            <h2 className={styles.title}>Mis anuncios</h2>
            <p className={styles.subtitle}>Tus publicaciones en el mercado</p>
          </div>
          <Button variant="primary" size="md" onClick={onCrear}>
            + Crear anuncio
          </Button>
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <EmptyState
            icon="📭"
            title="No tienes anuncios publicados"
            description="Crea tu primer anuncio con tus condiciones y empieza a recibir órdenes de otros usuarios."
            action={<Button variant="primary" size="lg" onClick={onCrear}>Crear anuncio</Button>}
          />
        </div>
      </main>
    </div>
  );
}

/** Detalle de un anuncio propio ya publicado, con sus estadísticas. */
export function DetalleAnuncioScreen({ onNavigate, brand }) {
  const [activo, setActivo] = React.useState(true);
  return (
    <div className={styles.page}>
      <Sidebar active="Mis anuncios" onNavigate={onNavigate} brand={brand} />
      <main className={styles.main}>
        <div className={styles.headRow}>
          <div>
            <h2 className={styles.title}>Detalle de anuncio</h2>
            <p className={styles.subtitle}>Anuncio #312 · Compra de USDT · Publicado hoy</p>
          </div>
          <div className={styles.switchRow}>
            <span>Anuncio activo</span>
            <Switch checked={activo} onChange={setActivo} />
          </div>
        </div>

        <OfferCard
          trader={{ name: 'Tú · tu anuncio', trades: 233, completion: 99, verified: true, online: true, score: 84 }}
          type="buy"
          price={`${RATE} ARS`}
          marketDelta={0.4}
          available="35,75 USDT"
          limits="10.000 — 50.000 ARS"
          methods={['Transferencia']}
          network="Base"
          ctaLabel="Ver en el mercado"
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--cds-space-3)' }}>
          <StatCard label="Vistas" value="128" />
          <StatCard label="Órdenes recibidas" value="6" />
          <StatCard label="Disponibilidad restante" value="41.200 ARS" />
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <Button variant="outline" size="lg">
            Editar condiciones
          </Button>
          <Button variant="ghost" size="lg">
            Eliminar anuncio
          </Button>
        </div>
      </main>
    </div>
  );
}
