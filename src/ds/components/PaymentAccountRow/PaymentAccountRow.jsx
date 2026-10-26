import React, { useState } from 'react';
import styles from './PaymentAccountRow.module.css';
import { cn } from '../../utils.js';
import { IconButton } from '../IconButton/IconButton.jsx';

const CopyIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.8" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" strokeWidth="1.8" /></svg>
);
const CheckIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="m4.5 12.5 5 5 10-11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const QrIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" /><rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" /><rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" /><path d="M14 14h3v3h-3zM18 18h3v3h-3z" stroke="currentColor" strokeWidth="1.8" /></svg>
);
const EditIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4.2 1.2L5 15 16.5 3.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg>
);
const TrashIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 7h16M9 7V4h6v3M6.5 7l1 13h9l1-13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const ChevronIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

/**
 * PaymentAccountRow — fila de método de pago GUARDADO en el perfil
 * (distinta de PaymentMethodRow, que es para elegir en checkout):
 * icono, nombre, dato enmascarado en mono, insignia «Principal» y las
 * acciones de copiar, ver QR, editar y eliminar. Con `children` o
 * `meta`, la fila se expande para mostrar el detalle.
 */
export function PaymentAccountRow({
  icon,
  name,
  detail,
  primary = false,
  meta,
  children,
  onCopy,
  onShowQR,
  onEdit,
  onDelete,
  className = '',
  ...rest
}) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const expandable = Boolean(children || meta);

  const handleCopy = () => {
    onCopy?.();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className={cn(styles.row, className)} {...rest}>
      <div className={styles.main}>
        <span className={cn(styles.icon, primary && styles.iconPrimary)} aria-hidden="true">
          {icon}
        </span>
        <span className={styles.body}>
          <span className={styles.nameRow}>
            <span className={styles.name}>{name}</span>
            {primary && <span className={styles.primaryTag}>Principal</span>}
          </span>
          {detail && <span className={styles.detail}>{detail}</span>}
        </span>
        <span className={styles.actions}>
          {onCopy && (
            <IconButton label={copied ? 'Copiado' : 'Copiar dato'} size="sm" onClick={handleCopy}>
              {copied ? <span className={styles.copied}>{CheckIcon}</span> : CopyIcon}
            </IconButton>
          )}
          {onShowQR && (
            <IconButton label="Ver código QR" size="sm" onClick={onShowQR}>
              {QrIcon}
            </IconButton>
          )}
          {onEdit && (
            <IconButton label="Editar método" size="sm" onClick={onEdit}>
              {EditIcon}
            </IconButton>
          )}
          {onDelete && (
            <IconButton label="Eliminar método" size="sm" variant="danger" onClick={onDelete}>
              {TrashIcon}
            </IconButton>
          )}
          {expandable && (
            <IconButton
              label={expanded ? 'Contraer detalle' : 'Expandir detalle'}
              size="sm"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
            >
              <span className={cn(styles.chevron, expanded && styles.chevronOpen)}>{ChevronIcon}</span>
            </IconButton>
          )}
        </span>
      </div>
      {expanded && expandable && <div className={styles.expanded}>{children ?? <span className={styles.meta}>{meta}</span>}</div>}
    </article>
  );
}
