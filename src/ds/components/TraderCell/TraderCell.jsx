import React from 'react';
import styles from './TraderCell.module.css';
import { cn } from '../../utils.js';
import { Avatar } from '../Avatar/Avatar.jsx';
import { VerifiedBadge } from '../VerifiedBadge/VerifiedBadge.jsx';

const TradesIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M7 4 3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ThumbIcon = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M7 22V11H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3V2.6A2.6 2.6 0 0 1 11.8.7L14 5.6c.2.5.1 1-.1 1.4H19a2 2 0 0 1 2 2.4l-1 8a2 2 0 0 1-2 1.6H9.5A2.5 2.5 0 0 1 7 22Z" />
  </svg>
);

/**
 * TraderCell — celda de anunciante para tablas P2P: avatar, nombre con
 * insignia de verificación y nivel (Premium), y la línea de reputación
 * con operaciones y porcentaje completado. Con `href` enlaza al perfil.
 */
export function TraderCell({ trader = {}, href, className = '', ...rest }) {
  const { name = '', avatarSrc, verified = false, verification = 'standard', tier, trades, completion, score, online } = trader;
  const Tag = href ? 'a' : 'div';
  return (
    <Tag href={href} className={cn(styles.cell, href && styles.link, className)} {...rest}>
      <Avatar src={avatarSrc} name={name} size={38} ringScore={score ?? null} online={online} />
      <span className={styles.body}>
        <span className={styles.nameRow}>
          <span className={styles.name}>{name}</span>
          {verified && <VerifiedBadge variant={verification} size={15} />}
          {tier && <span className={styles.tier}>{tier}</span>}
        </span>
        {(trades != null || completion != null) && (
          <span className={styles.meta}>
            {trades != null && (
              <span className={styles.metaItem}>
                {TradesIcon}
                {typeof trades === 'number' ? trades.toLocaleString('es-ES') : trades}
              </span>
            )}
            {completion != null && (
              <span className={styles.metaItem}>
                {ThumbIcon}
                {completion}%
              </span>
            )}
          </span>
        )}
      </span>
    </Tag>
  );
}
