import React from 'react';
import styles from './MenuCoinButton.module.css';

/** Botón de moneda de un mega-menú: icono de color, etiqueta y código
 *  pegado a la etiqueta (no alineado a la derecha). */
export function MenuCoinButton({ symbol, color, label, code, href = '#', onClick }) {
  return (
    <a className={styles.root} href={href} onClick={onClick} role="menuitem">
      <span className={styles.icon} style={color ? { background: color } : undefined} aria-hidden="true">
        {symbol || code?.[0]}
      </span>
      <span className={styles.label}>{label}</span>
      <span className={styles.code}>{code}</span>
    </a>
  );
}
