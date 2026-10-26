import React from 'react';
import styles from './EmptyState.module.css';
import { cn } from '../../utils.js';

/**
 * EmptyState — bloque centrado para estados vacíos.
 * `icon`: slot para un icono SVG. `title` y `description` (texto muted).
 * `action`: slot para botones o enlaces de acción.
 */
export function EmptyState({
  icon = null,
  title,
  description,
  action = null,
  className = '',
  ...rest
}) {
  return (
    <div className={cn(styles.empty, className)} {...rest}>
      {icon && (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      )}
      {title && <h3 className={styles.title}>{title}</h3>}
      {description && <p className={styles.description}>{description}</p>}
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}
