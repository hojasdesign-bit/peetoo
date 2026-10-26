import React from 'react';
import styles from './StatCard.module.css';
import { cn } from '../../utils.js';

/**
 * StatCard — tarjeta de estadística con etiqueta, valor y delta opcional.
 * `label`: caption muted. `value`: cifra grande en ink.
 * `delta`: texto del cambio (ej. "+2,4 %"); `trend`: 'up' | 'down' para
 * colorear el delta y mostrar la flecha correspondiente.
 */
export function StatCard({
  label,
  value,
  delta,
  trend,
  className = '',
  ...rest
}) {
  const up = trend === 'up';
  return (
    <div className={cn(styles.card, className)} {...rest}>
      <p className={styles.label}>{label}</p>
      <p className={styles.value}>{value}</p>
      {delta && (
        <span className={cn(styles.delta, trend && styles[trend])}>
          {trend && (
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d={up ? 'M12 19V5M5 12l7-7 7 7' : 'M12 5v14M19 12l-7 7-7-7'}
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          {delta}
        </span>
      )}
    </div>
  );
}
