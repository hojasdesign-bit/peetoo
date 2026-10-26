import React from 'react';
import styles from './TransactionRow.module.css';
import { cn } from '../../utils.js';

/**
 * TransactionRow — fila de historial (movimientos de wallet, órdenes
 * pasadas, pagos): icono, título, detalle y monto con signo/tono.
 */
export function TransactionRow({
  icon,
  title,
  subtitle,
  amount,
  amountTone = 'neutral',
  meta,
  onClick,
  className = '',
  ...rest
}) {
  const Tag = onClick ? 'button' : 'div';
  return (
    <Tag
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={cn(styles.row, onClick && styles.clickable, className)}
      {...rest}
    >
      {icon && (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      )}
      <span className={styles.body}>
        <span className={styles.title}>{title}</span>
        {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
      </span>
      <span className={styles.right}>
        {amount && <span className={cn(styles.amount, styles[amountTone])}>{amount}</span>}
        {meta && <span className={styles.meta}>{meta}</span>}
      </span>
    </Tag>
  );
}
