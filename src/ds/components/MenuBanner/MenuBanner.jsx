import React from 'react';
import styles from './MenuBanner.module.css';

/** Banner con degradado y CTA de un mega-menú. */
export function MenuBanner({ title, description, ctaLabel, href = '#', onClick }) {
  return (
    <div className={styles.root}>
      <div className={styles.copy}>
        <strong className={styles.title}>{title}</strong>
        <p className={styles.text}>{description}</p>
      </div>
      <a className={styles.cta} href={href} onClick={onClick}>
        {ctaLabel}
        <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
}
