import React from 'react';
import styles from './OfferCard.module.css';
import { cn } from '../../utils.js';
import { Avatar } from '../Avatar/Avatar.jsx';
import { Button } from '../Button/Button.jsx';
import { PriceChange } from '../PriceChange/PriceChange.jsx';

const Verified = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-label="Verificado">
    <circle cx="12" cy="12" r="9.2" fill="var(--cds-accent)" />
    <path d="m8.6 12.4 2.3 2.3 4.4-4.9" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * OfferCard — anuncio del mercado P2P: anunciante con reputación,
 * precio con variación sobre el mercado, disponible, límites,
 * métodos de pago y red, y la acción de comprar/vender.
 */
export function OfferCard({
  trader = {},
  type = 'buy',
  price,
  priceNote,
  marketDelta,
  available,
  limits,
  methods = [],
  network,
  ctaLabel,
  onAction,
  className = '',
  ...rest
}) {
  return (
    <article className={cn(styles.card, className)} {...rest}>
      <header className={styles.trader}>
        <Avatar name={trader.name} size={40} ringScore={trader.score} online={trader.online} />
        <span className={styles.traderBody}>
          <span className={styles.traderName}>
            {trader.name}
            {trader.verified && Verified}
          </span>
          <span className={styles.traderMeta}>
            {trader.trades} operaciones · {trader.completion}% completadas
          </span>
        </span>
        {network && <span className={styles.network}>{network}</span>}
      </header>

      <div className={styles.priceRow}>
        <span className={styles.price}>{price}</span>
        {marketDelta != null && <PriceChange value={marketDelta} />}
      </div>
      {priceNote && <p className={styles.priceNote}>{priceNote}</p>}

      <dl className={styles.facts}>
        <div className={styles.fact}>
          <dt>Disponible</dt>
          <dd>{available}</dd>
        </div>
        <div className={styles.fact}>
          <dt>Límites</dt>
          <dd>{limits}</dd>
        </div>
      </dl>

      <footer className={styles.footer}>
        <span className={styles.methods}>
          {methods.map((m) => (
            <span key={m} className={styles.method}>
              {m}
            </span>
          ))}
        </span>
        <Button size="md" onClick={onAction}>
          {ctaLabel || (type === 'buy' ? 'Comprar' : 'Vender')}
        </Button>
      </footer>
    </article>
  );
}
