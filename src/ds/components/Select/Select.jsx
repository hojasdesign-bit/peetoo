import { useId } from 'react';
import styles from './Select.module.css';
import { cn } from '../../utils.js';

/**
 * Select — selector nativo estilizado con chevron propio.
 * Incluye etiqueta, texto de ayuda y mensaje de error.
 */
export function Select({
  label,
  hint,
  error,
  options = [],
  placeholder = 'Seleccionar…',
  id: idProp,
  className = '',
  ...rest
}) {
  const autoId = useId();
  const id = idProp || `cds-select-${autoId.replace(/:/g, '')}`;
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
      <div className={styles.wrap}>
        <select
          id={id}
          className={cn(styles.select, error && styles.hasError)}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options.map((opt) =>
            typeof opt === 'string' ? (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ) : (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ),
          )}
        </select>
        <svg className={styles.chevron} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
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
