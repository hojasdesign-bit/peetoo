import React from 'react';
import styles from './NotificationItem.module.css';
import { cn } from '../../utils.js';

/**
 * NotificationItem — elemento del centro de notificaciones:
 * icono o avatar, título, texto, hora y punto de no leída.
 */
export function NotificationItem({
  icon,
  title,
  text,
  time,
  unread = false,
  onClick,
  className = '',
  ...rest
}) {
  const Tag = onClick ? 'button' : 'div';
  return (
    <Tag
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={cn(styles.item, unread && styles.unread, onClick && styles.clickable, className)}
      {...rest}
    >
      {icon && (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      )}
      <span className={styles.body}>
        <span className={styles.head}>
          <span className={styles.title}>{title}</span>
          {time && <span className={styles.time}>{time}</span>}
        </span>
        {text && <span className={styles.text}>{text}</span>}
      </span>
      {unread && <span className={styles.dot} aria-label="Sin leer" />}
    </Tag>
  );
}
