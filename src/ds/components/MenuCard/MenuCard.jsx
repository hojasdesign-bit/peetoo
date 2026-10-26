import React from 'react';
import styles from './MenuCard.module.css';

/** Tarjeta de producto de un mega-menú: título + descripción. */
export function MenuCard({ title, description, href = '#', onClick }) {
  return (
    <a className={styles.root} href={href} onClick={onClick} role="menuitem">
      <span className={styles.title}>{title}</span>
      <span className={styles.text}>{description}</span>
    </a>
  );
}
