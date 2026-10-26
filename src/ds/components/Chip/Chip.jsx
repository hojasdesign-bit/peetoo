import React from 'react';
import styles from './Chip.module.css';
import { cn } from '../../utils.js';

/**
 * Chip — píldora clicable, usada para montos rápidos ($100, $200, $500, $1k)
 * o filtros de una sola selección.
 * `selected` activa el estado violeta; comunica `aria-pressed` para accesibilidad.
 * `size="lg"` reproduce los filtros de categoría del blog (46px, radio 12, superficie translúcida).
 */
export function Chip({
  selected = false,
  size = 'md',
  onClick,
  children,
  className = '',
  ...rest
}) {
  return (
    <button
      type="button"
      className={cn(styles.chip, styles[size], selected && styles.selected, className)}
      aria-pressed={selected}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
