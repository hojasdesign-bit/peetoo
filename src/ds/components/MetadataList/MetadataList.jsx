import React from 'react';
import styles from './MetadataList.module.css';
import { cn } from '../../utils.js';

/**
 * MetadataList — lista clave/valor para el detalle de una orden (o
 * de una transacción): precio, red, método, comisiones. Cada fila
 * lleva un divisor, la etiqueta atenuada a la izquierda y el valor
 * a la derecha; el valor admite un nodo (p. ej. un Badge o un
 * CopyField) y con `mono` se pinta en monoespaciada, útil para
 * direcciones y hashes.
 */
export function MetadataList({ items = [], mono = false, className = '', ...rest }) {
  return (
    <dl className={cn(styles.list, mono && styles.mono, className)} {...rest}>
      {items.map((item, i) => (
        <div key={item.label ?? i} className={styles.row}>
          <dt className={styles.label}>{item.label}</dt>
          <dd className={styles.value}>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
