import React from 'react';
import styles from './IconButton.module.css';
import { cn } from '../../utils.js';

/**
 * IconButton — botón de solo icono para acciones compactas y repetidas:
 * copiar, ver QR, pausar, reanudar, ver detalle, editar, eliminar, abrir
 * filtros. `label` es obligatorio: alimenta `aria-label` y el tooltip.
 * Variantes: ghost · surface · outline · accent · danger.
 * Tamaños: sm 32 · md 40 · lg 44.
 */
export function IconButton({
  label,
  variant = 'ghost',
  size = 'md',
  disabled = false,
  children,
  className = '',
  ...rest
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      className={cn(styles.btn, styles[variant], styles[size], className)}
      {...rest}
    >
      {children}
    </button>
  );
}
