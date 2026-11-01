import React from 'react';
import styles from './Grid.module.css';
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

/**
 * Grid — primitiva de layout en rejilla: `columns` es el número de
 * columnas iguales (repeat) y `gap` una clave de la escala de espacio
 * (1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 24, 32) o cualquier valor CSS.
 * Sin responsive complejo en esta versión: las columnas son fijas.
 */
export function Grid({ columns = 2, gap = 4, align, children, className = '', ...rest }) {
  const gapValue = SPACE_KEYS.includes(gap) ? `var(--cds-space-${gap})` : gap;
  return (
    <div
      className={cn(styles.grid, align && styles[ALIGN[align]], className)}
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`, gap: gapValue }}
      {...rest}
    >
      {children}
    </div>
  );
}
