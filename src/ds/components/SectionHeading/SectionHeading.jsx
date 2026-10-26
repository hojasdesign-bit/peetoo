import React from 'react';
import styles from './SectionHeading.module.css';
import { cn } from '../../utils.js';

/**
 * SectionHeading — encabezado de sección de las páginas:
 * titular grande centrado (60px, o 48 con `level="h1"`) y texto
 * de apoyo de 18px en ancho contenido. Sin tracking, todo en 700.
 */
export function SectionHeading({
  eyebrow,
  title,
  text,
  align = 'center',
  level = 'display',
  className = '',
  ...rest
}) {
  return (
    <div className={cn(styles.wrap, styles[align], className)} {...rest}>
      {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
      <h2 className={cn(styles.title, styles[level])}>{title}</h2>
      {text && <p className={styles.text}>{text}</p>}
    </div>
  );
}
