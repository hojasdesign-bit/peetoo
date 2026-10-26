import React from 'react';
import styles from './Breadcrumb.module.css';
import { cn } from '../../utils.js';

/**
 * Breadcrumb — migas de pan.
 * `items`: [{ label, href? }]. El último elemento se muestra como página
 * actual (sin enlace, con `aria-current="page"`).
 * Separador: chevron SVG.
 */
export function Breadcrumb({
  items = [],
  className = '',
  ...rest
}) {
  return (
    <nav className={cn(styles.nav, className)} aria-label="Migas de pan" {...rest}>
      <ol className={styles.list}>
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i} className={styles.item}>
              {i > 0 && (
                <svg
                  className={styles.separator}
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
              {last || !item.href ? (
                <span className={styles.current} aria-current={last ? 'page' : undefined}>
                  {item.label}
                </span>
              ) : (
                <a className={styles.link} href={item.href}>
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
