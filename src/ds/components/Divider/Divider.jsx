import React from 'react';
import styles from './Divider.module.css';
import { cn } from '../../utils.js';

/**
 * Divider — separador horizontal o vertical, con etiqueta centrada opcional.
 * `orientation`: 'horizontal' | 'vertical'.
 */
export function Divider({
  orientation = 'horizontal',
  label,
  className = '',
  ...rest
}) {
  if (orientation === 'vertical') {
    return (
      <span
        className={cn(styles.divider, styles.vertical, className)}
        role="separator"
        aria-orientation="vertical"
        aria-hidden="true"
        {...rest}
      />
    );
  }
  return (
    <div
      className={cn(styles.divider, styles.horizontal, className)}
      role={label ? 'separator' : undefined}
      aria-hidden={label ? undefined : true}
      {...rest}
    >
      <span className={styles.line} aria-hidden="true" />
      {label && <span className={styles.label}>{label}</span>}
      {label && <span className={styles.line} aria-hidden="true" />}
    </div>
  );
}
