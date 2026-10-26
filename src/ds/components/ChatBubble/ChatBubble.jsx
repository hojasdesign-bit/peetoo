import React from 'react';
import styles from './ChatBubble.module.css';
import { cn } from '../../utils.js';

/**
 * ChatBubble — mensaje del chat de una orden (o de soporte).
 * `from="me"` lo alinea a la derecha en violeta; `them`, a la
 * izquierda en superficie. Hora y doble check de lectura opcionales.
 */
export function ChatBubble({
  from = 'them',
  text,
  time,
  read = false,
  className = '',
  ...rest
}) {
  return (
    <div className={cn(styles.row, styles[from], className)} {...rest}>
      <div className={styles.bubble}>
        <p className={styles.text}>{text}</p>
        {(time || (from === 'me' && read != null)) && (
          <span className={styles.meta}>
            {time}
            {from === 'me' && (
              <svg width="15" height="10" viewBox="0 0 15 10" fill="none" aria-label={read ? 'Leído' : 'Enviado'} className={cn(styles.ticks, read && styles.read)}>
                <path d="M1 5.5 4 8.5 9.5 1.5M6.5 8.5l1.8 0 5.2-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" transform="translate(0.5 0.5)" />
              </svg>
            )}
          </span>
        )}
      </div>
    </div>
  );
}
