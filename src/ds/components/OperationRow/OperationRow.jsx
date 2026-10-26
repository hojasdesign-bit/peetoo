import React from 'react';
import styles from './OperationRow.module.css';
import { cn } from '../../utils.js';
import { AssetPair } from '../AssetPair/AssetPair.jsx';
import { Badge } from '../Badge/Badge.jsx';

const STATUS = {
  completed: {
    label: 'Completada',
    tone: 'success',
    icon: (<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="m4.5 12.5 5 5 10-11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>),
  },
  pending: {
    label: 'Pendiente',
    tone: 'warning',
    icon: (<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.9" /><path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg>),
  },
  cancelled: {
    label: 'Cancelada',
    tone: 'danger',
    icon: (<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" /></svg>),
  },
  in_progress: {
    label: 'En curso',
    tone: 'info',
    icon: (<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M7 4 3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg>),
  },
};

/**
 * OperationRow — fila del historial de operaciones P2P, más específica
 * que TransactionRow: icono de estado, par de activos, insignia de
 * Compra/Venta, contraparte y fecha, y el cierre en formato
 * «monto @ precio». Estados: completed · pending · cancelled ·
 * in_progress.
 */
export function OperationRow({
  status = 'completed',
  side = 'buy',
  give,
  receive,
  counterparty,
  date,
  amount,
  price,
  onClick,
  className = '',
  ...rest
}) {
  const cfg = STATUS[status] || STATUS.completed;
  const Tag = onClick ? 'button' : 'div';
  return (
    <Tag
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={cn(styles.row, onClick && styles.clickable, className)}
      {...rest}
    >
      <span className={cn(styles.statusIcon, styles[cfg.tone])} role="img" aria-label={cfg.label} title={cfg.label}>
        {cfg.icon}
      </span>
      <span className={styles.body}>
        <span className={styles.topRow}>
          {give && receive && <AssetPair from={give} to={receive} reverse={side === 'sell'} size={27} />}
          <Badge variant={side === 'buy' ? 'accent' : 'neutral'} size="sm">
            {side === 'buy' ? 'Compra' : 'Venta'}
          </Badge>
          <span className={cn(styles.statusText, styles[`${cfg.tone}Text`])}>{cfg.label}</span>
        </span>
        <span className={styles.meta}>
          Con <span className={styles.counterparty}>{counterparty}</span>
          {date ? ` · ${date}` : ''}
        </span>
      </span>
      <span className={styles.right}>
        {amount && <span className={styles.amount}>{amount}</span>}
        {price && <span className={styles.price}>@ {price}</span>}
      </span>
    </Tag>
  );
}
