import React, { useEffect, useRef, useState } from 'react';
import styles from './Combobox.module.css';
import { cn } from '../../utils.js';
import { SearchInput } from '../SearchInput/SearchInput.jsx';
import { OptionRow } from '../OptionRow/OptionRow.jsx';

/**
 * Combobox — selector genérico CON buscador: el patrón del filtro de
 * blockchain de Peetoo, que ni el Select nativo ni el CurrencySelect
 * (especializado en monedas) cubren. El disparador parece un campo de
 * formulario; el panel trae buscador (si hay más de 5 opciones o se
 * pide con `searchable`), filas OptionRow y cierre con Escape o clic
 * fuera. Opciones: { value, label, description, meta, icon }.
 */
export function Combobox({
  label,
  value,
  options = [],
  onChange,
  placeholder = 'Seleccionar…',
  panelTitle,
  searchPlaceholder = 'Buscar…',
  searchable = true,
  disabled = false,
  error,
  hint,
  id: idProp,
  className = '',
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const autoId = React.useId();
  const id = idProp || `cds-combobox-${autoId.replace(/:/g, '')}`;
  const selected = options.find((o) => o.value === value) || null;

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open ]);

  const close = () => {
    setOpen(false);
    setQuery('');
  };
  const choose = (opt) => {
    onChange?.(opt.value, opt);
    close();
  };

  const q = query.trim().toLowerCase();
  const filtered = q
    ? options.filter((o) => `${o.label} ${o.description || ''}`.toLowerCase().includes(q))
    : options;
  const showSearch = searchable && options.length > 5;

  return (
    <div className={cn(styles.root, className)} ref={rootRef}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
      <button
        type="button"
        id={id}
        ref={triggerRef}
        disabled={disabled}
        className={cn(styles.trigger, open && styles.open, error && styles.hasError)}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => (open ? close() : setOpen(true))}
      >
        {selected?.icon && <span className={styles.triggerIcon}>{selected.icon}</span>}
        <span className={cn(styles.triggerLabel, !selected && styles.placeholder)}>
          {selected ? selected.label : placeholder}
        </span>
        <svg className={styles.chevron} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className={styles.panel} role="listbox" aria-label={panelTitle || label || placeholder}>
          {(panelTitle || showSearch) && (
            <div className={styles.panelHead}>
              {panelTitle && <span className={styles.panelTitle}>{panelTitle}</span>}
              {showSearch && (
                <SearchInput
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={searchPlaceholder}
                  aria-label={searchPlaceholder}
                />
              )}
            </div>
          )}
          <ul className={styles.list}>
            {filtered.map((opt) => (
              <li key={opt.value}>
                <OptionRow
                  role="option"
                  aria-selected={selected?.value === opt.value}
                  icon={opt.icon}
                  label={opt.label}
                  code={opt.description}
                  meta={opt.meta}
                  selected={selected?.value === opt.value}
                  onClick={() => choose(opt)}
                />
              </li>
            ))}
            {filtered.length === 0 && <li className={styles.empty}>Sin resultados</li>}
          </ul>
        </div>
      )}
      {error ? (
        <p className={styles.error} role="alert">{error}</p>
      ) : (
        hint && <p className={styles.hint}>{hint}</p>
      )}
    </div>
  );
}
