import React from 'react';
import styles from './OrderSummary.module.css';
import { cn } from '../../utils.js';

/**
 * OrderSummary — tarjeta con el desglose de la orden:
 * filas de costos, divisor, total destacado y CTA a ancho completo.
 * Autocontenida: no importa otros componentes del sistema.
 */
export function OrderSummary({
  title = 'Resumen de la orden',
  rows = [],
  total,
  ctaLabel,
  onCta,
  className = '',
  ...rest
}) {
  return (
    <div className={cn(styles.card, className)} {...rest}>
      {title && <h3 className={styles.title}>{title}</h3>}
      <div className={styles.rows}>
        {rows.map((row, index) => (
          <div key={index} className={styles.row}>
            <span className={styles.label}>{row.label}</span>
            <span className={styles.value}>{row.value}</span>
          </div>
        ))}
      </div>
      <hr className={styles.divider} />
      <div className={cn(styles.row, styles.totalRow)}>
        <span className={styles.totalLabel}>Total</span>
        <span className={styles.totalValue}>{total}</span>
      </div>
      {ctaLabel && (
        <button type="button" className={styles.cta} onClick={onCta}>
          {ctaLabel}
        </button>
      )}
    </div>
  );
}
