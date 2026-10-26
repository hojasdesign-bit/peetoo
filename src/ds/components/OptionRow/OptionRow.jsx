import React from 'react';
import styles from './OptionRow.module.css';
import { cn } from '../../utils.js';

/**
 * OptionRow — fila de opción seleccionable (patrón radio de lista)
 * de los paneles del widget: icono, etiqueta, código en gris tras la
 * etiqueta, metadato a la derecha (p. ej. la comisión) y, si está
 * seleccionada, insignia circular con check.
 * Es el patrón de los selectores de país y de método de pago.
 */
export function OptionRow({
  icon,
  label,
  code,
  meta,
  selected = false,
  onClick,
  disabled = false,
  className = '',
  ...rest
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      disabled={disabled}
      onClick={onClick}
      className={cn(styles.row, selected && styles.selected, className)}
      {...rest}
    >
      {icon && (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      )}
      <span className={styles.label}>
        {label}
        {code && <span className={styles.code}>{code}</span>}
      </span>
      {meta && <span className={styles.meta}>{meta}</span>}
      {selected && (
        <span className={styles.check} aria-hidden="true">
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
            <path d="M2.5 7.5l3 3 6-6.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
    </button>
  );
}
