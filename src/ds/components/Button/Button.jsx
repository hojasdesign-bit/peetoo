import React from 'react';
import styles from './Button.module.css';
import { cn } from '../../utils.js';

/**
 * Button — CTA principal del sistema.
 * Variantes: primary (violeta), secondary (borde), ghost, dark (negro, para el widget en tema claro),
 * surface (superficie translúcida) y outline (borde violeta) — las dos últimas, de los héroes del sitio.
 * Tamaños: sm, md, lg (48px, CTA de cabecera) y xl (56px, CTA de héroe, 18px/700).
 */
export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  arrow = false,
  leftIcon = null,
  children,
  className = '',
  ...rest
}) {
  return (
    <button
      className={cn(
        styles.button,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        loading && styles.loading,
        className,
      )}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      {leftIcon && <span className={styles.icon}>{leftIcon}</span>}
      <span className={styles.label}>{children}</span>
      {arrow && (
        <svg className={styles.arrow} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}
