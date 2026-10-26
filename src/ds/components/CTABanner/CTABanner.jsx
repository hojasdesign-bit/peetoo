import React from 'react';
import styles from './CTABanner.module.css';
import { cn } from '../../utils.js';

/**
 * CTABanner — banda horizontal de llamada a la acción (radio 16,
 * tinte violeta, padding 32): título y texto a la izquierda,
 * acciones a la derecha. Patrón del banner de referidos del sitio.
 */
export function CTABanner({ title, text, children, className = '', ...rest }) {
  return (
    <section className={cn(styles.banner, className)} {...rest}>
      <div className={styles.copy}>
        {title && <h3 className={styles.title}>{title}</h3>}
        {text && <p className={styles.text}>{text}</p>}
      </div>
      {children && <div className={styles.actions}>{children}</div>}
    </section>
  );
}
