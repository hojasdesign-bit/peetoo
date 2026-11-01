import React, { useEffect, useRef } from 'react';
import styles from './Popover.module.css';
import { cn } from '../../utils.js';

/**
 * Popover — panel flotante que se abre al hacer CLIC en el disparador
 * (distinto de Tooltip/HoverCard, que son de hover, y de Modal, que
 * usa scrim y bloquea la página). Es controlado: `open` lo muestra,
 * `onClose` lo cierra y `onOpen` se llama al pulsar el disparador
 * cuando está cerrado (imprescindible en un componente controlado:
 * sin `onOpen` no habría forma de abrirlo). Se cierra con clic fuera
 * y con Escape. `title` opcional; sin título no hay cabecera.
 * `position`: bottom | top.
 */
export function Popover({
  trigger,
  children,
  title,
  open = false,
  onClose,
  onOpen,
  position = 'bottom',
  className = '',
  ...rest
}) {
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) onClose?.();
    };
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose?.();
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  const toggle = () => {
    if (open) onClose?.();
    else onOpen?.();
  };

  return (
    <span className={cn(styles.wrapper, className)} ref={rootRef} {...rest}>
      <span className={styles.trigger} onClick={toggle}>
        {trigger}
      </span>
      {open && (
        <span className={cn(styles.panel, styles[position])}>
          {title && (
            <span className={styles.header}>
              <span className={styles.title}>{title}</span>
              <button type="button" className={styles.close} onClick={onClose} aria-label="Cerrar panel">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2 2l8 8M10 2 2 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </span>
          )}
          <span className={styles.body}>{children}</span>
        </span>
      )}
    </span>
  );
}
