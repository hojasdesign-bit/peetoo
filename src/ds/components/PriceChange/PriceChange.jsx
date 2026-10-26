import React from 'react';
import styles from './PriceChange.module.css';
import { cn } from '../../utils.js';

/**
 * PriceChange — variación porcentual con flecha (sobre el precio de
 * mercado en ofertas P2P, o variación 24h de un activo).
 */
export function PriceChange({ value = 0, suffix, className = '', ...rest }) {
  const up = value >= 0;
  return (
    <span className={cn(styles.pill, up ? styles.up : styles.down, className)} {...rest}>
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true" className={cn(!up && styles.flip)}>
        <path d="M5 1.5 8.5 7h-7L5 1.5Z" fill="currentColor" />
      </svg>
      {up ? '+' : ''}
      {value.toFixed(2)}%{suffix ? ` ${suffix}` : ''}
    </span>
  );
}
