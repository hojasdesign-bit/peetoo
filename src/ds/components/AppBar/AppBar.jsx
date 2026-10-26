import React from 'react';
import styles from './AppBar.module.css';
import { cn } from '../../utils.js';

/**
 * AppBar — cabecera móvil: botón de volver opcional, título con
 * subtítulo y acciones a la derecha.
 */
export function AppBar({
  title,
  subtitle,
  onBack,
  actions,
  className = '',
  ...rest
}) {
  return (
    <header className={cn(styles.bar, className)} {...rest}>
      {onBack && (
        <button type="button" className={styles.back} onClick={onBack} aria-label="Volver">
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M10 2.5 5 8l5 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      )}
      <span className={styles.titles}>
        <span className={styles.title}>{title}</span>
        {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
      </span>
      {actions && <span className={styles.actions}>{actions}</span>}
    </header>
  );
}
