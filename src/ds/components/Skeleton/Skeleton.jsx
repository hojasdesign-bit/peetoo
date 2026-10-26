import React from 'react';
import styles from './Skeleton.module.css';
import { cn } from '../../utils.js';

/**
 * Skeleton — placeholder de carga con efecto shimmer.
 * `shape`: 'text' (línea), 'rect' (bloque) o 'circle'.
 * `width` / `height` aceptan número (px) o cadena CSS.
 */
export function Skeleton({
  shape = 'text',
  width,
  height,
  className = '',
  style,
  ...rest
}) {
  const dims = {};
  if (width !== undefined) dims.width = typeof width === 'number' ? `${width}px` : width;
  if (height !== undefined) dims.height = typeof height === 'number' ? `${height}px` : height;
  return (
    <span
      className={cn(styles.skeleton, styles[shape], className)}
      style={{ ...dims, ...style }}
      aria-hidden="true"
      {...rest}
    />
  );
}
