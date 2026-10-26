import React from 'react';
import styles from './MenuItem.module.css';
import { cn } from '../../utils.js';

/**
 * MenuItem — fila de menú (patrón del menú de cuenta del widget):
 * icono a la izquierda, etiqueta, y cierre a la derecha: chevron,
 * icono de enlace externo o un control (p. ej. un Switch) vía `trailing`.
 */
export function MenuItem({
  icon,
  label,
  trailing = 'chevron',
  onClick,
  href,
  danger = false,
  className = '',
  ...rest
}) {
  const content = (
    <>
      {icon && (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      )}
      <span className={styles.label}>{label}</span>
      <span className={styles.trailing}>
        {trailing === 'chevron' && (
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M6 3.5 10.5 8 6 12.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        {trailing === 'external' && (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M6.5 3.5H3.5v9h9V9.5M9 3h3.5v3.5M12.2 3.2 6.8 8.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        {trailing !== 'chevron' && trailing !== 'external' && trailing !== 'none' ? trailing : null}
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={cn(styles.item, danger && styles.danger, className)} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cn(styles.item, danger && styles.danger, className)} {...rest}>
      {content}
    </button>
  );
}
