import React from 'react';
import styles from './VerifiedBadge.module.css';
import { cn } from '../../utils.js';

/**
 * VerifiedBadge — insignia de verificación reutilizable (antes el SVG
 * vivía repetido dentro de OfferCard, ProfileHeader y SellerCard).
 * Variantes: standard (marca), premium (dorada, con corona) y success.
 * `showLabel` añade el texto junto al icono.
 */
export function VerifiedBadge({
  variant = 'standard',
  size = 16,
  label,
  showLabel = false,
  className = '',
  ...rest
}) {
  const text = label ?? (variant === 'premium' ? 'Cuenta premium' : 'Cuenta verificada');
  return (
    <span className={cn(styles.badge, styles[variant], className)} {...rest}>
      <span role="img" aria-label={text} title={text} className={styles.icon}>
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9.4" fill="currentColor" />
          {variant === 'premium' ? (
            <path d="M6.5 15.5 5.4 9.8l3.4 2.3L12 8l3.2 4.1 3.4-2.3-1.1 5.7h-11Z" fill="#fff" />
          ) : (
            <path d="m8.6 12.4 2.3 2.3 4.4-4.9" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          )}
        </svg>
      </span>
      {showLabel && <span className={styles.label}>{text}</span>}
    </span>
  );
}
