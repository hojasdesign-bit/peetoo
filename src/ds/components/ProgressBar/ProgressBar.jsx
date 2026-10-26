import React from 'react';
import styles from './ProgressBar.module.css';
import { cn } from '../../utils.js';

/**
 * ProgressBar — barra de progreso (límites de orden, verificación,
 * subida de archivos). Variantes semánticas y etiqueta opcional.
 */
export function ProgressBar({
  value = 0,
  variant = 'accent',
  showLabel = false,
  label,
  className = '',
  ...rest
}) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className={cn(styles.wrap, className)} {...rest}>
      {(label || showLabel) && (
        <div className={styles.head}>
          {label && <span className={styles.label}>{label}</span>}
          {showLabel && <span className={styles.pct}>{Math.round(pct)}%</span>}
        </div>
      )}
      <div className={styles.track} role="progressbar" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100}>
        <div className={cn(styles.fill, styles[variant])} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
