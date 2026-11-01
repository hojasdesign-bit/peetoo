import React from 'react';
import styles from './Spinner.module.css';
import { cn } from '../../utils.js';

/**
 * Spinner — indicador de carga circular: un anillo tenue con el
 * arco superior en color de marca (`accent`) o atenuado (`neutral`,
 * para fondos ya coloreados). Tamaños sm | md | lg. Anuncia
 * «Cargando» a lectores de pantalla.
 */
export function Spinner({ size = 'md', variant = 'accent', label = 'Cargando', className = '', ...rest }) {
  return (
    <span
      className={cn(styles.spinner, styles[size], styles[variant], className)}
      role="status"
      aria-label={label}
      {...rest}
    />
  );
}
