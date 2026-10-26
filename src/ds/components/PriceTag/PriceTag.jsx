import React from 'react';
import styles from './PriceTag.module.css';
import { cn } from '../../utils.js';

/**
 * PriceTag — monto + moneda, con flecha de tendencia opcional.
 * `trend`: 'up' (verde, flecha arriba), 'down' (rojo, flecha abajo) o null (sin flecha).
 * Tamaños: sm | md | lg.
 */
export function PriceTag({
  amount,
  currency,
  size = 'md',
  trend = null,
  className = '',
  ...rest
}) {
  const up = trend === 'up';
  return (
    <span className={cn(styles.price, styles[size], className)} {...rest}>
      <span className={styles.amount}>{amount}</span>
      {currency && <span className={styles.currency}>{currency}</span>}
      {trend && (
        <svg
          className={cn(styles.trend, up ? styles.up : styles.down)}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          role="img"
          aria-label={up ? 'Tendencia al alza' : 'Tendencia a la baja'}
        >
          <path
            d={up ? 'M12 19V5M5 12l7-7 7 7' : 'M12 5v14M19 12l-7 7-7-7'}
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </span>
  );
}
