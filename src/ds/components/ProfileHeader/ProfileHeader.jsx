import React from 'react';
import styles from './ProfileHeader.module.css';
import { cn } from '../../utils.js';
import { Avatar } from '../Avatar/Avatar.jsx';

/**
 * ProfileHeader — cabecera de perfil (P2P, tienda, social): banner,
 * avatar con anillo de reputación, nombre verificado, @usuario,
 * fila de estadísticas y acción principal.
 */
export function ProfileHeader({
  name,
  username,
  avatarSrc,
  ringScore,
  verified = false,
  banner,
  stats = [],
  action,
  meta,
  className = '',
  ...rest
}) {
  return (
    <header className={cn(styles.header, className)} {...rest}>
      <div className={styles.banner} aria-hidden="true">
        {banner}
      </div>
      <div className={styles.main}>
        <div className={styles.topRow}>
          <span className={styles.avatarWrap}>
            <Avatar src={avatarSrc} name={name} size={72} ringScore={ringScore} online />
          </span>
          {action && <span className={styles.action}>{action}</span>}
        </div>
        <h2 className={styles.name}>
          {name}
          {verified && (
            <svg className={styles.verified} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-label="Verificado">
              <circle cx="12" cy="12" r="9.2" fill="var(--cds-accent)" />
              <path d="m8.6 12.4 2.3 2.3 4.4-4.9" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </h2>
        {username && <p className={styles.username}>{username}</p>}
        {meta && <p className={styles.meta}>{meta}</p>}
        {stats.length > 0 && (
          <dl className={styles.stats}>
            {stats.map((s) => (
              <div key={s.label} className={styles.stat}>
                <dt className={styles.statLabel}>{s.label}</dt>
                <dd className={styles.statValue}>{s.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </header>
  );
}
