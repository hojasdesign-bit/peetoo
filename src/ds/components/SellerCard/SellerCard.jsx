import React from 'react';
import styles from './SellerCard.module.css';
import { cn } from '../../utils.js';
import { Avatar } from '../Avatar/Avatar.jsx';
import { RatingStars } from '../RatingStars/RatingStars.jsx';
import { Button } from '../Button/Button.jsx';

const Verified = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-label="Verificado">
    <circle cx="12" cy="12" r="9.2" fill="var(--cds-accent)" />
    <path d="m8.6 12.4 2.3 2.3 4.4-4.9" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * SellerCard — tarjeta de vendedor/tienda (avatar, verificado,
 * valoración, ventas y puesto en el ranking opcional).
 */
export function SellerCard({
  name,
  avatarSrc,
  verified = false,
  rating,
  ratingCount,
  sales,
  rank,
  actionLabel = 'Ver tienda',
  onAction,
  className = '',
  ...rest
}) {
  return (
    <article className={cn(styles.card, className)} {...rest}>
      {rank != null && <span className={styles.rank}>Top {rank}</span>}
      <Avatar src={avatarSrc} name={name} size={52} shape="rounded" />
      <span className={styles.body}>
        <span className={styles.name}>
          {name}
          {verified && Verified}
        </span>
        {rating != null && (
          <span className={styles.rating}>
            <RatingStars value={rating} size={13} />
            <span className={styles.ratingText}>
              {rating.toFixed(1)}
              {ratingCount != null ? ` (${ratingCount})` : ''}
            </span>
          </span>
        )}
        {sales && <span className={styles.sales}>{sales} ventas</span>}
      </span>
      {onAction && (
        <Button size="sm" variant="secondary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </article>
  );
}
