import React from 'react';
import styles from './PageBackground.module.css';

/**
 * PageBackground — el fondo de página como en la referencia: color de
 * lienzo + una sola elipse radial violeta con caída gaussiana
 * (2688×920, centrada bajo el contenido). Solo pinta el fondo
 * (fijo, sin interceptar clics); el contenido va como hermano con
 * position relative y z-index 1. En tema claro el resplandor baja
 * a opacidad 0.28, como en la referencia.
 */
export function PageBackground({ glow = true, position = 'bottom', className = '' }) {
  return (
    <div className={`${styles.root} ${className}`.trim()} aria-hidden="true">
      {glow && (
        <div className={`${styles.glow} ${position === 'center' ? styles.glowCenter : ''}`.trim()} />
      )}
    </div>
  );
}
