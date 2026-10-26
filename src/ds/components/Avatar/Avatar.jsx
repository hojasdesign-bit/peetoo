import React from 'react';
import styles from './Avatar.module.css';
import { cn } from '../../utils.js';

/**
 * Avatar — foto o iniciales de usuario. Formas según el uso: `circle`
 * para personas (perfiles, chat, P2P) y `rounded` (cuadrado con bordes
 * redondeados) para tiendas, apps y marcas. Opcional: punto de presencia
 * (`online`) y anillo de reputación (`ringScore` 0–100, como el score
 * de los perfiles P2P).
 */
export function Avatar({
  src,
  name = '',
  size = 40,
  online = false,
  ringScore = null,
  shape = 'circle',
  className = '',
  ...rest
}) {
  const initials = name
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const inner = (
    <span className={styles.circle} style={{ width: size, height: size, fontSize: Math.round(size * 0.38) }}>
      {src ? <img src={src} alt={name} className={styles.img} /> : initials || '?'}
      {online && <span className={styles.dot} style={{ width: Math.max(9, size * 0.26), height: Math.max(9, size * 0.26) }} />}
    </span>
  );

  if (ringScore == null) {
    return (
      <span className={cn(styles.wrap, shape === 'rounded' && styles.rounded, className)} {...rest}>
        {inner}
      </span>
    );
  }
  const pct = Math.max(0, Math.min(100, ringScore));
  return (
    <span
      className={cn(styles.wrap, styles.ring, shape === 'rounded' && styles.rounded, className)}
      style={{ background: `conic-gradient(var(--cds-accent) ${pct * 3.6}deg, var(--cds-surface-overlay) 0deg)` }}
      role="img"
      aria-label={`${name} · reputación ${pct}%`}
      {...rest}
    >
      {inner}
    </span>
  );
}
