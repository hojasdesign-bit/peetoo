import React from 'react';
import styles from './FeatureCard.module.css';
import { cn } from '../../utils.js';

/**
 * FeatureCard — tarjeta de característica de las páginas (home, connect).
 * Variantes medidas: neutral (blanco translúcido), tint (tinte violeta) y
 * gradient (degradado violeta de las tarjetas de paso, con chip de paso
 * y título grande de 40px con `large`).
 */
export function FeatureCard({
  eyebrow,
  icon,
  title,
  large = false,
  variant = 'neutral',
  footer,
  children,
  className = '',
  ...rest
}) {
  return (
    <article className={cn(styles.card, styles[variant], className)} {...rest}>
      {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
      {icon && (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      )}
      {title && <h3 className={cn(styles.title, large && styles.titleLarge)}>{title}</h3>}
      {children && <div className={styles.text}>{children}</div>}
      {footer && <div className={styles.footer}>{footer}</div>}
    </article>
  );
}
