import React from 'react';
import styles from './ChatComposer.module.css';
import { cn } from '../../utils.js';

/**
 * ChatComposer — caja de envío del chat: botón adjuntar, campo de
 * texto y botón enviar (deshabilitado sin texto).
 */
export function ChatComposer({
  value,
  onChange,
  onSend,
  onAttach,
  placeholder = 'Escribe un mensaje…',
  className = '',
  ...rest
}) {
  const send = () => {
    if (value?.trim()) onSend?.(value);
  };
  return (
    <div className={cn(styles.root, className)} {...rest}>
      {onAttach && (
        <button type="button" className={styles.iconBtn} onClick={onAttach} aria-label="Adjuntar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 5.5v13M5.5 12h13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        </button>
      )}
      <input
        className={styles.input}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        aria-label="Mensaje"
        onKeyDown={(e) => {
          if (e.key === 'Enter') send();
        }}
      />
      <button type="button" className={styles.send} onClick={send} disabled={!value?.trim()} aria-label="Enviar">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4.5 12 20 4.8 13.4 20l-2-6.4L4.5 12Z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" /></svg>
      </button>
    </div>
  );
}
