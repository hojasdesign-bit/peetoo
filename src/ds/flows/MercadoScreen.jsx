import React from 'react';
import styles from './flows.module.css';
import { Sidebar, OFFERS } from './shared.jsx';
import { Tabs } from '../components/Tabs/Tabs.jsx';
import { Select } from '../components/Select/Select.jsx';
import { OfferCard } from '../components/OfferCard/OfferCard.jsx';
import { Pagination } from '../components/Pagination/Pagination.jsx';
import { Button } from '../components/Button/Button.jsx';

/**
 * Mercado P2P — la pantalla principal de los videos: pestañas Comprar/Vender,
 * filtros (cripto, monto, método, red) y la lista de anuncios con paginación.
 */
export function MercadoScreen({ initialMode = 'comprar', mode: modeProp, onModeChange, onTakeOffer, onCrear, onNavigate, brand }) {
  const [internalMode, setInternalMode] = React.useState(initialMode);
  const mode = modeProp ?? internalMode;
  const setMode = (m) => { setInternalMode(m); onModeChange?.(m); }
  const [page, setPage] = React.useState(1);
  const comprar = mode === 'comprar';
  return (
    <div className={styles.page}>
      <Sidebar active="Mercado P2P" onNavigate={onNavigate} brand={brand} />
      <main className={styles.main}>
        <div className={styles.headRow}>
          <div>
            <h2 className={styles.title}>Mercado P2P</h2>
            <p className={styles.subtitle}>
              {comprar ? 'Compra USDT a otros usuarios' : 'Vende tus USDT a otros usuarios'} · Garantía
              en contrato inteligente · Sin gas
            </p>
          </div>
          <Button variant="primary" size="md" onClick={onCrear}>
            + Crear anuncio
          </Button>
        </div>

        <Tabs
          tabs={[
            { id: 'comprar', label: 'Comprar' },
            { id: 'vender', label: 'Vender' },
          ]}
          active={mode}
          onChange={setMode}
        />

        <div className={styles.filters}>
          <Select
            label="Cripto"
            options={[
              { value: 'usdt', label: 'USDT' },
              { value: 'usdc', label: 'USDC' },
            ]}
            defaultValue="usdt"
          />
          <Select
            label="Moneda"
            options={[
              { value: 'ars', label: 'ARS · Peso argentino' },
              { value: 'usd', label: 'USD · Dólar' },
            ]}
            defaultValue="ars"
          />
          <Select
            label="Método de pago"
            options={[
              { value: 'all', label: 'Todos los métodos' },
              { value: 'transfer', label: 'Transferencia bancaria' },
              { value: 'mp', label: 'Mercado Pago' },
              { value: 'cash', label: 'Efectivo' },
            ]}
            defaultValue="all"
          />
          <Select
            label="Red"
            options={[
              { value: 'all', label: 'Cualquier red' },
              { value: 'base', label: 'Base' },
              { value: 'tron', label: 'Tron' },
              { value: 'polygon', label: 'Polygon' },
            ]}
            defaultValue="all"
          />
        </div>

        <div className={styles.listCol}>
          {OFFERS.map((o) => (
            <OfferCard
              key={o.trader.name}
              trader={o.trader}
              type={comprar ? 'buy' : 'sell'}
              price={o.price}
              marketDelta={o.marketDelta}
              available={o.available}
              limits={o.limits}
              methods={o.methods}
              network={o.network}
              ctaLabel={comprar ? 'Comprar USDT' : 'Vender USDT'}
              onAction={() => onTakeOffer?.(o)}
            />
          ))}
        </div>

        <div className={styles.footRow}>
          <span>Mostrando 5 de 24 resultados</span>
          <Pagination page={page} totalPages={5} onChange={setPage} shape="rounded" />
        </div>
      </main>
    </div>
  );
}
