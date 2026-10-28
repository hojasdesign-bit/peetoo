import React from 'react';
import styles from './MenuCoinButton.module.css';

/** Botón de moneda de un mega-menú: icono de color, etiqueta y código
 *  pegado a la etiqueta (no alineado a la derecha).
 *  EXTENSIÓN LOCAL peetoo-app (no está en el DS fuente): `src` opcional
 *  con el logo de la moneda; si viene, se muestra la imagen dentro del
 *  círculo en vez de la letra. Un snapshot fresco la sobrescribiría:
 *  hay que subirla al DS primero. */
export function MenuCoinButton({ symbol, color, label, code, src, href = '#', onClick }) {
  return (
    <a className={styles.root} href={href} onClick={onClick} role="menuitem">
      <span className={styles.icon} style={color ? { background: color } : undefined} aria-hidden="true">
        {src ? <img src={src} alt="" className={styles.iconImg} /> : (symbol || code?.[0])}
      </span>
      <span className={styles.label}>{label}</span>
      <span className={styles.code}>{code}</span>
    </a>
  );
}
