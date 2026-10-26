import React from 'react';
import styles from './TokenIcon.module.css';
import { cn } from '../../utils.js';

/**
 * TokenIcon — círculo de color con la letra o símbolo del token (ej. "₿", "Ξ", "B").
 * `color` acepta cualquier color o degradado CSS válido; si se omite,
 * usa el degradado violeta del sistema. Tamaños: sm | md | lg | xl.
 */
export function TokenIcon({
  symbol = '?',
  color,
  size = 'md',
  className = '',
  style,
  ...rest
}) {
  const numeric = typeof size === 'number';
  const sizeStyle = numeric
    ? { width: size, height: size, fontSize: Math.round(size * 0.45) }
    : undefined;
  return (
    <span
      className={cn(styles.icon, !numeric && styles[size], className)}
      style={{ ...(color ? { background: color } : undefined), ...sizeStyle, ...style }}
      aria-hidden="true"
      {...rest}
    >
      {symbol}
    </span>
  );
}
