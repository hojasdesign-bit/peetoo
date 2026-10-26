import { useRef } from 'react';
import styles from './SearchInput.module.css';
import { cn } from '../../utils.js';

/**
 * SearchInput — campo de búsqueda con icono de lupa a la izquierda
 * y botón para limpiar el texto cuando hay contenido.
 */
export function SearchInput({
  value,
  onChange,
  placeholder = 'Buscar…',
  onClear,
  className = '',
  ...rest
}) {
  const inputRef = useRef(null);

  const clear = () => {
    // Notifica el cambio de forma compatible con onChange controlado/no controlado
    onChange?.({ target: { value: '' } });
    onClear?.();
    inputRef.current?.focus();
  };

  return (
    <div className={cn(styles.root, className)}>
      <svg className={styles.iconLeft} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12.5 12.5 16 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
      <input
        ref={inputRef}
        type="text"
        role="searchbox"
        className={styles.input}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-label={rest['aria-label'] || 'Buscar'}
        {...rest}
      />
      {value && (
        <button
          type="button"
          className={styles.clear}
          onClick={clear}
          aria-label="Limpiar búsqueda"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
}
