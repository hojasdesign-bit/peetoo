import React from 'react';
import styles from './Footer.module.css';

/**
 * Footer — el pie de página de la referencia: enlaces 16px/500 en
 * muted con gap 32 a la izquierda y copyright a la derecha,
 * separados del contenido por una línea superior tenue.
 */
export function Footer({ links = [], copyright, className = '' }) {
  return (
    <footer className={`${styles.root} ${className}`.trim()}>
      <div className={styles.inner}>
        {links.length > 0 && (
          <nav className={styles.links} aria-label="Pie de página">
            {links.map((link) => (
              <a key={link.label} className={styles.link} href={link.href || '#'}>
                {link.label}
              </a>
            ))}
          </nav>
        )}
        {copyright && <p className={styles.copyright}>{copyright}</p>}
      </div>
    </footer>
  );
}
