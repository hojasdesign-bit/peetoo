import React from 'react';
import styles from './TrustBadge.module.css';
import { cn } from '../../utils.js';

const icons = {
  shield: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M10 1.8l6.2 2.4v4.6c0 3.9-2.7 6.9-6.2 8.4-3.5-1.5-6.2-4.5-6.2-8.4V4.2L10 1.8z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M7 9.8l2.1 2.1L13 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  check: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="8.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6.8 10.2l2.3 2.3 4.1-4.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  lock: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="4.5" y="9" width="11" height="7.5" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7 9V6.8a3 3 0 016 0V9" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
};

/**
 * TrustBadge — fila inline de confianza: icono en círculo violeta suave,
 * título y texto corto.
 */
export function TrustBadge({ icon = 'shield', title, text, className = '', ...rest }) {
  return (
    <div className={cn(styles.badge, className)} {...rest}>
      <span className={styles.icon} aria-hidden="true">
        {icons[icon] ?? icons.shield}
      </span>
      <span className={styles.texts}>
        <strong className={styles.title}>{title}</strong>
        {text && <span className={styles.text}>{text}</span>}
      </span>
    </div>
  );
}
