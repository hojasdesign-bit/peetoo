import React from 'react';
import styles from './TradeStatusPill.module.css';
import { cn } from '../../utils.js';

const STATUS = {
  pendiente: { label: 'Pendiente de pago', tone: 'warning' },
  pagado: { label: 'Pagado · por liberar', tone: 'info' },
  completado: { label: 'Completado', tone: 'success' },
  liberado: { label: 'Fondos liberados', tone: 'success' },
  disputa: { label: 'En disputa', tone: 'danger' },
  cancelado: { label: 'Cancelado', tone: 'neutral' },
  expirado: { label: 'Expirado', tone: 'neutral' },
};

/**
 * TradeStatusPill — estado de una orden P2P con punto y tinte
 * semánticos. Acepta claves (pendiente, pagado, completado…) o una
 * etiqueta libre con `label` + `tone`.
 */
export function TradeStatusPill({ status = 'pendiente', label, tone, className = '', ...rest }) {
  const conf = STATUS[status] || { label: status, tone: 'neutral' };
  return (
    <span className={cn(styles.pill, styles[tone || conf.tone], className)} {...rest}>
      <span className={styles.dot} aria-hidden="true" />
      {label || conf.label}
    </span>
  );
}
