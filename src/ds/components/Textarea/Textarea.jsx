import React from 'react';
import styles from './Textarea.module.css';
import { cn } from '../../utils.js';

/**
 * Textarea — campo de texto largo con etiqueta, ayuda y error,
 * en el mismo lenguaje visual que Input (descripciones de producto,
 * notas de una orden, mensajes de soporte).
 */
export function Textarea({
  label,
  hint,
  error,
  id: idProp,
  rows = 4,
  className = '',
  ...rest
}) {
  const autoId = React.useId();
  const id = idProp || autoId;
  return (
    <div className={cn(styles.root, className)}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
      <textarea
        id={id}
        rows={rows}
        className={cn(styles.field, error && styles.invalid)}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        {...rest}
      />
      {error ? (
        <span className={styles.error} id={`${id}-error`} role="alert">
          {error}
        </span>
      ) : hint ? (
        <span className={styles.hint} id={`${id}-hint`}>
          {hint}
        </span>
      ) : null}
    </div>
  );
}
