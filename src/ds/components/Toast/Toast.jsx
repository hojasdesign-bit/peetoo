import React from 'react';
import styles from './Toast.module.css';
import { cn } from '../../utils.js';

const ICONS = {
  success: (
    <svg width="18" height="18" viewBox="0 0 14 14" fill="none"><path d="M2.5 7.5l3 3 6-6.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  error: (
    <svg width="18" height="18" viewBox="0 0 14 14" fill="none"><path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg>
  ),
  warning: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 4v9" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /><circle cx="12" cy="17.5" r="1.6" fill="currentColor" /></svg>
  ),
  info: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 10.5V17" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /><circle cx="12" cy="6.8" r="1.6" fill="currentColor" /></svg>
  ),
};

/**
 * Toast — notificación flotante breve (confirmaciones y errores de
 * acciones: pago marcado, oferta publicada, error de red).
 */
export function Toast({
  variant = 'success',
  title,
  message,
  onClose,
  className = '',
  ...rest
}) {
  return (
    <div className={cn(styles.toast, className)} role="status" {...rest}>
      <span className={cn(styles.icon, styles[variant])} aria-hidden="true">
        {ICONS[variant]}
      </span>
      <span className={styles.body}>
        {title && <span className={styles.title}>{title}</span>}
        {message && <span className={styles.message}>{message}</span>}
      </span>
      {onClose && (
        <button type="button" className={styles.close} onClick={onClose} aria-label="Cerrar notificación">
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
        </button>
      )}
    </div>
  );
}
