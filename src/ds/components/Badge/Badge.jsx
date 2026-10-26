import React from 'react';
import styles from './Badge.module.css';
import { cn } from '../../utils.js';

/**
 * Badge — píldora pequeña para etiquetas y estados.
 * Variantes: lavender (ej. "Más popular"), accent, success, warning, danger, neutral, dark.
 * Tamaños: sm | md.
 */
export function Badge({
  variant = 'lavender',
  size = 'md',
  children,
  className = '',
  ...rest
}) {
  return (
    <span className={cn(styles.badge, styles[variant], styles[size], className)} {...rest}>
      {children}
    </span>
  );
}
