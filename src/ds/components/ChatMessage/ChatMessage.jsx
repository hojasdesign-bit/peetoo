import React from 'react';
import styles from './ChatMessage.module.css';
import { cn } from '../../utils.js';
import { Avatar } from '../Avatar/Avatar.jsx';

/**
 * ChatMessage — fila completa de mensaje (distinta de ChatBubble, que
 * es solo la burbuja): avatar, autor, hora, cuerpo y estado opcional.
 * `incoming` entra por la izquierda y `outgoing` por la derecha con
 * tinte de marca; `system` es un aviso centrado y atenuado (p. ej.
 * «La orden fue creada»). El estado solo aplica a los propios:
 * `sent` (enviado) o `read` (leído).
 */
export function ChatMessage({
  author,
  avatarSrc,
  time,
  variant = 'incoming',
  status,
  children,
  className = '',
  ...rest
}) {
  if (variant === 'system') {
    return (
      <div className={cn(styles.row, styles.system, className)} role="note" {...rest}>
        <span className={styles.systemText}>{children}</span>
        {time && <span className={styles.systemTime}>{time}</span>}
      </div>
    );
  }

  const outgoing = variant === 'outgoing';
  return (
    <div className={cn(styles.row, outgoing && styles.outgoing, className)} {...rest}>
      <Avatar src={avatarSrc} name={author || ''} size={32} className={styles.avatar} />
      <div className={styles.content}>
        <div className={styles.header}>
          {author && <span className={styles.author}>{author}</span>}
          {time && <span className={styles.time}>{time}</span>}
        </div>
        <div className={styles.body}>{children}</div>
        {outgoing && status && (
          <span className={styles.status}>{status === 'read' ? '✓✓ Leído' : '✓ Enviado'}</span>
        )}
      </div>
    </div>
  );
}
