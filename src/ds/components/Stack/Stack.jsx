import React from 'react';
import styles from './Stack.module.css';
import { cn } from '../../utils.js';

/** Claves de la escala de espacio del DS. */
const SPACE_KEYS = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 24, 32];

const ALIGN = {
  start: 'alignStart',
  center: 'alignCenter',
  end: 'alignEnd',
  stretch: 'alignStretch',
  baseline: 'alignBaseline',
};

const JUSTIFY = {
  start: 'justifyStart',
  center: 'justifyCenter',
  end: 'justifyEnd',
  between: 'justifyBetween',
  around: 'justifyAround',
  evenly: 'justifyEvenly',
};

/**
 * Stack — primitiva de layout en flex: apila hijos en vertical u
 * horizontal con un espacio de la escala del DS. `gap` es una clave
 * de la escala (1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 24, 32) o cualquier
 * valor CSS válido. `align` y `justify` siguen los nombres de flex.
 */
export function Stack({
  direction = 'vertical',
  gap = 4,
  align,
  justify,
  wrap = false,
  children,
  className = '',
  ...rest
}) {
  const gapValue = SPACE_KEYS.includes(gap) ? `var(--cds-space-${gap})` : gap;
  return (
    <div
      className={cn(
        styles.stack,
        direction === 'horizontal' ? styles.horizontal : styles.vertical,
        align && styles[ALIGN[align]],
        justify && styles[JUSTIFY[justify]],
        wrap && styles.wrap,
        className,
      )}
      style={{ gap: gapValue }}
      {...rest}
    >
      {children}
    </div>
  );
}
