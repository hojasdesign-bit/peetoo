import React from 'react';
import styles from './MenuIntro.module.css';

/** Bloque introductorio de un mega-menú: tarjeta con título y descripción,
 *  texto anclado abajo (como en la referencia). */
export function MenuIntro({ title, description, className = '' }) {
  return (
    <div className={`${styles.root} ${className}`.trim()}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.text}>{description}</p>
    </div>
  );
}
