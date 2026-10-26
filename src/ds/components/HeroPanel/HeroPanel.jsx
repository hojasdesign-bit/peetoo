import React from 'react';
import styles from './HeroPanel.module.css';
import { cn } from '../../utils.js';

/**
 * HeroPanel — panel oscuro con resplandor radial violeta inferior
 * y patrón de cuadrícula tenue hecho con CSS. El contenido (children)
 * va centrado.
 */
export function HeroPanel({ children, className = '', ...rest }) {
  return (
    <section className={cn(styles.panel, className)} {...rest}>
      <div className={styles.content}>{children}</div>
    </section>
  );
}
