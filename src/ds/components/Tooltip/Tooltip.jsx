import React, { useId } from 'react';
import styles from './Tooltip.module.css';
import { cn } from '../../utils.js';

/**
 * Tooltip — ayuda contextual que aparece en hover y foco del teclado.
 * `content`: texto del tooltip. `position`: top | bottom | left | right.
 * Fondo surface-3, texto ink; usa `role="tooltip"` con `aria-describedby`.
 */
export function Tooltip({
  content,
  position = 'top',
  children,
  className = '',
  ...rest
}) {
  const id = useId();
  return (
    <span className={cn(styles.wrapper, className)} {...rest}>
      <span className={styles.trigger} tabIndex={0} aria-describedby={id}>
        {children}
      </span>
      <span className={cn(styles.tooltip, styles[position])} role="tooltip" id={id}>
        {content}
      </span>
    </span>
  );
}
