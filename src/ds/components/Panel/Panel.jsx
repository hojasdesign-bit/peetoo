import React from 'react';
import styles from './Panel.module.css';
import { cn } from '../../utils.js';

/**
 * Panel — vista secundaria del widget (selector de país, "Pagar con",
 * menú de cuenta): contenedor de 400px con cabecera de botón circular
 * a la izquierda, título centrado (17px/600) y hueco de acciones a la
 * derecha. Sin `title` ni `onBack`, la cabecera se omite.
 */
export function Panel({
  title,
  onBack,
  backIcon = 'arrow',
  actions,
  children,
  className = '',
  ...rest
}) {
  const showHead = title || onBack || actions;
  return (
    <section className={cn(styles.panel, className)} {...rest}>
      {showHead && (
        <header className={styles.head}>
          <span className={styles.headSide}>
            {onBack && (
              <button type="button" className={styles.circleBtn} onClick={onBack} aria-label="Volver">
                {backIcon === 'arrow' ? (
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M10 2.5 5 8l5 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3.5 6 8 10.5 12.5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            )}
          </span>
          {title && <h2 className={styles.title}>{title}</h2>}
          <span className={cn(styles.headSide, styles.headRight)}>{actions}</span>
        </header>
      )}
      <div className={styles.body}>{children}</div>
    </section>
  );
}
