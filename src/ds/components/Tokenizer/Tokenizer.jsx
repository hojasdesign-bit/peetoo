import React, { useRef, useState } from 'react';
import styles from './Tokenizer.module.css';
import { cn } from '../../utils.js';

/**
 * Tokenizer — entrada multi-valor (etiquetas, monedas, métodos): cada
 * valor se muestra como una píldora con su × para quitarlo. Es
 * controlado: `values` es la lista y `onChange` recibe la nueva lista.
 * Se añade con Enter o con coma, y al perder el foco se confirma el
 * texto pendiente; no admite duplicados (sin distinguir mayúsculas).
 * Con el campo vacío, Backspace quita el último valor.
 */
export function Tokenizer({
  values = [],
  onChange,
  placeholder = 'Añadir…',
  disabled = false,
  className = '',
  ...rest
}) {
  const [draft, setDraft] = useState('');
  const inputRef = useRef(null);

  const commit = (raw) => {
    const value = raw.trim();
    if (!value) return;
    const exists = values.some((item) => item.trim().toLowerCase() === value.toLowerCase());
    if (!exists) onChange?.([...values, value]);
    setDraft('');
  };

  const remove = (index) => {
    onChange?.(values.filter((_, i) => i !== index));
  };

  const onKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      commit(draft);
    } else if (event.key === ',') {
      event.preventDefault();
      commit(draft);
    } else if (event.key === 'Backspace' && draft === '' && values.length > 0) {
      event.preventDefault();
      remove(values.length - 1);
    }
  };

  return (
    <div
      className={cn(styles.box, disabled && styles.disabled, className)}
      onClick={() => inputRef.current?.focus()}
      {...rest}
    >
      {values.map((value, index) => (
        <span key={`${value}-${index}`} className={styles.token}>
          <span className={styles.tokenLabel}>{value}</span>
          <button
            type="button"
            className={styles.remove}
            disabled={disabled}
            onClick={(event) => {
              event.stopPropagation();
              remove(index);
            }}
            aria-label={`Quitar ${value}`}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <path d="M1.5 1.5l7 7M8.5 1.5l-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </span>
      ))}
      <input
        ref={inputRef}
        className={styles.input}
        value={draft}
        disabled={disabled}
        placeholder={values.length === 0 ? placeholder : ''}
        aria-label={rest['aria-label'] || 'Añadir valor'}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={onKeyDown}
        onBlur={() => commit(draft)}
      />
    </div>
  );
}
