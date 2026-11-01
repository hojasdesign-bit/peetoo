import React from 'react';
import styles from './StatusDot.module.css';
import { cn } from '../../utils.js';

const LABELS = {
  online: 'En línea',
  live: 'En vivo',
  busy: 'Ocupado',
  offline: 'Desconectado',
  danger: 'Error',
};

/**
 * StatusDot — punto de estado sin texto: `online` (éxito), `live`
 * (acento con pulso, para emisiones o mercados en vivo), `busy`
 * (aviso), `offline` (neutro) y `danger` (error). El significado va
 * en el aria-label para que no dependa solo del color.
 */
export function StatusDot({ variant = 'online', size = 'md', label, className = '', ...rest }) {
  return (
    <span
      className={cn(styles.dot, styles[variant], styles[size], className)}
      role="img"
      aria-label={label || LABELS[variant] || variant}
      {...rest}
    />
  );
}
