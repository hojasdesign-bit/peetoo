import React from 'react';
import styles from './RiskNotice.module.css';
import { cn } from '../../utils.js';

/**
 * RiskNotice — caja de advertencia con borde violeta y radio 12px.
 * Para textos legales cortos (riesgo de inversión, descargos, etc.).
 */
export function RiskNotice({
  title = 'Aviso de riesgo',
  text,
  className = '',
  ...rest
}) {
  return (
    <div className={cn(styles.notice, className)} role="note" {...rest}>
      <svg
        className={styles.icon}
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M10 2.2L17.8 16H2.2L10 2.2z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M10 7.5v3.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="10" cy="13.6" r="0.9" fill="currentColor" />
      </svg>
      <div className={styles.texts}>
        <strong className={styles.title}>{title}</strong>
        {text && <p className={styles.text}>{text}</p>}
      </div>
    </div>
  );
}
