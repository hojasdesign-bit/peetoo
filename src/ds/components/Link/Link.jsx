import React from 'react';
import styles from './Link.module.css';
import { cn } from '../../utils.js';

/**
 * Link — enlace con el estilo del DS. `variant`: accent (violeta de
 * marca, subrayado en hover), muted (texto secundario, subrayado en
 * hover) o inherit (hereda el color, subrayado siempre). `underline`
 * permite forzar el subrayado: hover | always | none (por defecto
 * sigue a la variante). `external` abre en pestaña nueva y añade el
 * indicador de enlace externo.
 */
export function Link({
  href,
  children,
  variant = 'accent',
  external = false,
  underline,
  className = '',
  ...rest
}) {
  const underlineClass =
    underline === 'always' ? styles.underlineAlways : underline === 'none' ? styles.underlineNone : styles.underlineHover;
  return (
    <a
      href={href}
      className={cn(styles.link, styles[variant], underlineClass, className)}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      {...rest}
    >
      {children}
      {external && (
        <svg className={styles.external} width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M3.5 9.5 9.5 3.5M6 3h3.5v3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9.5 7.5V10H2V2.5h2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </a>
  );
}
