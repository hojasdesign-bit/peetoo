import React from 'react';
import styles from './Banner.module.css';
import { cn } from '../../utils.js';

/** Iconos por variante (trazos del DS, sin emojis). */
const ICONS = {
  info: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9.2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 10.8v5.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="7.8" r="1.15" fill="currentColor" />
    </svg>
  ),
  success: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9.2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 12.4l2.7 2.7L16.4 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  warning: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3.5 21.5 20h-19L12 3.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M12 9.5v4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="16.9" r="1.1" fill="currentColor" />
    </svg>
  ),
  danger: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9.2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M9 9l6 6M15 9l-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
};

/**
 * Banner — tira de anuncio a ancho completo, distinta de Alert (aviso
 * en tarjeta con borde) y de CTABanner (marketing con acciones): una
 * franja con barra de acento lateral, tinte de variante, título
 * opcional, mensaje, acción opcional y cierre opcional.
 * `variant`: info | success | warning | danger.
 */
export function Banner({
  variant = 'info',
  title,
  children,
  action,
  dismissible = false,
  onClose,
  className = '',
  ...rest
}) {
  return (
    <div className={cn(styles.banner, styles[variant], className)} role="status" {...rest}>
      <span className={styles.icon}>{ICONS[variant]}</span>
      <div className={styles.body}>
        {title && <p className={styles.title}>{title}</p>}
        {children && <div className={styles.text}>{children}</div>}
      </div>
      {action && <div className={styles.action}>{action}</div>}
      {dismissible && (
        <button type="button" className={styles.close} onClick={onClose} aria-label="Cerrar anuncio">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 5l14 14M19 5 5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
}
