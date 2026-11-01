import React from 'react';
import styles from './Field.module.css';
import { cn } from '../../utils.js';

/**
 * Field — envoltorio de campo: etiqueta, control, ayuda y error con
 * una sola estructura. `label` se asocia al control con `htmlFor` y,
 * si el hijo único no trae id, se le inyecta el de Field. Con
 * `required` muestra el asterisco y el texto «obligatorio» para
 * lectores de pantalla. Si hay `error`, sustituye al `hint`.
 */
export function Field({ id, label, hint, error, required = false, children, className = '', ...rest }) {
  const control =
    React.Children.count(children) === 1 && React.isValidElement(children) && id && !children.props.id
      ? React.cloneElement(children, { id })
      : children;

  return (
    <div className={cn(styles.field, className)} {...rest}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
          {required && (
            <>
              <span className={styles.required} aria-hidden="true">
                {' '}
                *
              </span>
              <span className={styles.srOnly}> (obligatorio)</span>
            </>
          )}
        </label>
      )}
      <div className={styles.control}>{control}</div>
      {hint && !error && <p className={styles.hint}>{hint}</p>}
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
