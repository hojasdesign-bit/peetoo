import React from 'react';
import styles from './QuantitySelector.module.css';
import { cn } from '../../utils.js';

/**
 * QuantitySelector — stepper de cantidad (− valor +) para carritos
 * y montos enteros. Respeta min/max y deshabilita en los extremos.
 */
export function QuantitySelector({
  value = 1,
  onChange,
  min = 1,
  max = 99,
  step = 1,
  size = 'md',
  className = '',
  ...rest
}) {
  const dec = () => onChange?.(Math.max(min, value - step));
  const inc = () => onChange?.(Math.min(max, value + step));
  return (
    <div className={cn(styles.root, styles[size], className)} {...rest}>
      <button type="button" className={styles.btn} onClick={dec} disabled={value <= min} aria-label="Menos">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
      </button>
      <span className={styles.value} aria-live="polite">{value}</span>
      <button type="button" className={styles.btn} onClick={inc} disabled={value >= max} aria-label="Más">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2.5v9M2.5 7h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
      </button>
    </div>
  );
}
