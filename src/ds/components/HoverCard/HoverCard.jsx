import React from 'react';
import styles from './HoverCard.module.css';
import { cn } from '../../utils.js';

/**
 * HoverCard — tarjeta rica flotante que se abre al pasar el cursor o
 * al enfocar el disparador, y se cierra al salir o perder el foco.
 * Distinta de Tooltip, que es solo texto corto sin interacción: aquí
 * el contenido es rico (perfil de trader, datos, enlaces) y se puede
 * pulsar dentro. Sin JavaScript: hover y foco lo controlan por CSS.
 * `trigger`: nodo disparador (conviene que sea enfocable, p. ej. un
 * botón o un Avatar con tabIndex). `position`: bottom | top.
 */
export function HoverCard({ trigger, children, position = 'bottom', className = '', ...rest }) {
  return (
    <span className={cn(styles.wrapper, className)} {...rest}>
      <span className={styles.trigger} tabIndex={0}>
        {trigger}
      </span>
      <span className={cn(styles.card, styles[position])}>{children}</span>
    </span>
  );
}
