import { useId } from 'react';
import styles from './Input.module.css';
import { cn } from '../../utils.js';

/**
 * Input — campo de texto con etiqueta, texto de ayuda y mensaje de error.
 * Tamaños: sm | md | lg.
 */
export function Input({
  label,
  hint,
  error,
  size = 'md',
  disabled = false,
  id: idProp,
  className = '',
  ...rest
}) {
  const autoId = useId();
  const id = idProp || `cds-input-${autoId.replace(/:/g, '')}`;
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy = error ? errorId : hint ? hintId : undefined;

  return (
    <div className={cn(styles.field, className)}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(styles.input, styles[size], error && styles.hasError)}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        {...rest}
      />
      {error ? (
        <p className={styles.error} id={errorId} role="alert">
          {error}
        </p>
      ) : (
        hint && (
          <p className={styles.hint} id={hintId}>
            {hint}
          </p>
        )
      )}
    </div>
  );
}
