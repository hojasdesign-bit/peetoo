import React, { useEffect, useRef } from 'react';
import styles from './BottomSheet.module.css';
import { cn } from '../../utils.js';

/**
 * BottomSheet — hoja inferior para móvil: panel anclado abajo con
 * asa de arrastre visual, título opcional y cierre con clic en el
 * scrim o con Escape. En escritorio se centra con un ancho máximo,
 * igual que un diálogo, pero siempre pegada abajo. Al abrirse mueve
 * el foco al panel y bloquea el scroll del fondo (patrón de Modal).
 */
export function BottomSheet({ open = false, onClose, title, children, className = '', ...rest }) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        ref={panelRef}
        className={cn(styles.sheet, className)}
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === 'string' ? title : undefined}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
        {...rest}
      >
        <div className={styles.handle} aria-hidden="true" />
        <div className={styles.header}>
          {title ? <h2 className={styles.title}>{title}</h2> : <span />}
          <button type="button" className={styles.close} onClick={onClose} aria-label="Cerrar hoja">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
}
