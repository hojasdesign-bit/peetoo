import React from 'react';
import styles from './PaymentMethodRow.module.css';
import { cn } from '../../utils.js';

/**
 * PaymentMethodRow — fila de método de pago.
 * Icono (slot), nombre, sublabel, texto de comisión a la derecha,
 * insignia opcional y chevron. `selected` la resalta con el acento.
 */
export function PaymentMethodRow({
  icon = null,
  name,
  sublabel,
  fee,
  badge,
  selected = false,
  onClick,
  className = '',
  ...rest
}) {
  return (
    <button
      type="button"
      className={cn(styles.row, selected && styles.selected, className)}
      onClick={onClick}
      aria-pressed={selected}
      {...rest}
    >
      <span className={styles.icon} aria-hidden="true">
        {icon ?? (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="1.5" y="3.5" width="15" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
            <path d="M1.5 7h15" stroke="currentColor" strokeWidth="1.6" />
            <path d="M4 12.5h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        )}
      </span>
      <span className={styles.texts}>
        <span className={styles.name}>{name}</span>
        {sublabel && <span className={styles.sublabel}>{sublabel}</span>}
      </span>
      <span className={styles.right}>
        {fee && <span className={styles.fee}>{fee}</span>}
        {badge && <span className={styles.badge}>{badge}</span>}
        <svg
          className={styles.chevron}
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M5 2.5L9.5 7 5 11.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  );
}
