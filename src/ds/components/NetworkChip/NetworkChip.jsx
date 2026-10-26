import React from 'react';
import styles from './NetworkChip.module.css';
import { cn } from '../../utils.js';

/**
 * NetworkChip — etiqueta de red blockchain con icono y nombre
 * (Base, Tron, Polygon…), tal como aparece en las tablas de ofertas.
 * No interactiva: para selección usa Chip u OptionRow.
 */
export function NetworkChip({ name, symbol, color, src, size = 'md', className = '', ...rest }) {
  return (
    <span className={cn(styles.chip, styles[size], className)} {...rest}>
      <span className={styles.icon} style={color ? { background: color } : undefined}>
        {src ? <img src={src} alt="" className={styles.img} /> : symbol || name?.[0] || '?'}
      </span>
      <span className={styles.name}>{name}</span>
    </span>
  );
}
