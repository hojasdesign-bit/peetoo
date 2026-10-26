import React from 'react';
import styles from './MenuSocials.module.css';

/** «Seguir» + iconos de redes de un mega-menú. */
export function MenuSocials({ socials = [] }) {
  if (!socials.length) return null;
  return (
    <div className={styles.root}>
      <span className={styles.follow}>Seguir</span>
      <span className={styles.row}>
        {socials.map((social) => (
          <a key={social.label} className={styles.btn} href={social.href || '#'} aria-label={social.label}>
            {social.icon}
          </a>
        ))}
      </span>
    </div>
  );
}
