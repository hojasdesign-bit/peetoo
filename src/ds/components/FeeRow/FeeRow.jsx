import React from 'react';
import styles from './FeeRow.module.css';
import { cn } from '../../utils.js';

/**
 * FeeRow — fila de desglose de costos.
 * Etiqueta a la izquierda (muted), valor a la derecha (ink).
 * Con `total`, el valor va en negrita y más grande.
 */
export function FeeRow({ label, value, total = false, muted = false, className = '', ...rest }) {
  return (
    <div className={cn(styles.row, total && styles.total, muted && styles.muted, className)} {...rest}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
    </div>
  );
}
