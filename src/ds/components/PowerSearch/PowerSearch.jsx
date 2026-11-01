import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './PowerSearch.module.css';
import { cn } from '../../utils.js';

/**
 * PowerSearch — buscador avanzado compuesto, distinto de SearchInput
 * (que es solo el campo) y de Combobox (campo con lista de opciones):
 * barra con selector de ámbito, panel con recientes y sugerencias, y
 * navegación con teclado. Sin backend: todo llega por props.
 * `scopes`: [{ id, label }] (sin ámbitos, no se muestra el selector).
 * `suggestions`: [{ id, label, hint?, scope? }] (sin `scope`, valen
 * para todos los ámbitos). `recents`: textos de búsquedas anteriores.
 * Enter sin sugerencia activa llama a `onSearch(query, scopeId)`; una
 * sugerencia activa o pulsada llama a `onSelect(item)`; pulsar un
 * reciente llama a `onSearch(reciente, scopeId)`. Escape cierra.
 */
export function PowerSearch({
  scopes = [],
  suggestions = [],
  recents = [],
  placeholder = 'Buscar…',
  onSearch,
  onSelect,
  className = '',
  ...rest
}) {
  const [query, setQuery] = useState('');
  const [selectedScope, setSelectedScope] = useState(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef(null);
  const inputRef = useRef(null);

  const scopeId = selectedScope ?? scopes[0]?.id ?? '';

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) setOpen(false);
    };
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        inputRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open ]);

  const q = query.trim().toLowerCase();
  const filteredSuggestions = useMemo(
    () =>
      suggestions.filter((item) => {
        if (scopeId && item.scope && item.scope !== scopeId) return false;
        if (!q) return true;
        return `${item.label} ${item.hint || ''}`.toLowerCase().includes(q);
      }),
    [suggestions, q, scopeId],
  );

  // Sin consulta: recientes; con consulta: sugerencias filtradas.
  const rows = useMemo(() => {
    if (q) return filteredSuggestions.map((item) => ({ kind: 'suggestion', item }));
    return recents.map((label, index) => ({ kind: 'recent', item: { id: `recent-${index}`, label } }));
  }, [q, filteredSuggestions, recents]);

  const safeActive = Math.min(active, Math.max(0, rows.length - 1));

  const chooseRow = (row) => {
    if (row.kind === 'suggestion') onSelect?.(row.item);
    else onSearch?.(row.item.label, scopeId);
    setOpen(false);
  };

  const onInputKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setOpen(true);
      setActive((current) => Math.min(current + 1, rows.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive((current) => Math.max(current - 1, 0));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (rows[safeActive]) chooseRow(rows[safeActive]);
      else onSearch?.(query, scopeId);
      setOpen(false);
    }
  };

  return (
    <div className={cn(styles.root, className)} ref={rootRef} {...rest}>
      <div className={styles.bar}>
        {scopes.length > 0 && (
          <span className={styles.scopeWrap}>
            <select
              className={styles.scope}
              value={scopeId}
              aria-label="Ámbito de búsqueda"
              onChange={(event) => {
                setSelectedScope(event.target.value);
                setActive(0);
              }}
            >
              {scopes.map((scope) => (
                <option key={scope.id} value={scope.id}>
                  {scope.label}
                </option>
              ))}
            </select>
            <svg className={styles.chevron} width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        )}
        <svg className={styles.searchIcon} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.8" />
          <path d="M12.5 12.5 16 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <input
          ref={inputRef}
          className={styles.input}
          value={query}
          placeholder={placeholder}
          role="searchbox"
          aria-label={rest['aria-label'] || 'Buscar'}
          onFocus={() => setOpen(true)}
          onChange={(event) => {
            setQuery(event.target.value);
            setActive(0);
            setOpen(true);
          }}
          onKeyDown={onInputKeyDown}
        />
        {query && (
          <button
            type="button"
            className={styles.clear}
            onClick={() => {
              setQuery('');
              setActive(0);
              inputRef.current?.focus();
            }}
            aria-label="Limpiar búsqueda"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 2l8 8M10 2 2 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>
      {open && (
        <div className={styles.panel}>
          {rows.length === 0 ? (
            <p className={styles.empty}>
              {q ? `Sin resultados para «${query}»` : 'Escribe para buscar.'}
            </p>
          ) : (
            <>
              <p className={styles.section}>{q ? 'Sugerencias' : 'Recientes'}</p>
              {rows.map((row, index) => (
                <button
                  key={row.item.id}
                  type="button"
                  className={cn(styles.row, index === safeActive && styles.rowActive)}
                  onMouseEnter={() => setActive(index)}
                  onClick={() => chooseRow(row)}
                >
                  <span className={styles.rowLabel}>{row.item.label}</span>
                  {row.item.hint && <span className={styles.rowHint}>{row.item.hint}</span>}
                  {row.kind === 'recent' && <span className={styles.rowHint}>Reciente</span>}
                </button>
              ))}
            </>
          )}
          <p className={styles.footer}>↑↓ navegar · Enter seleccionar · Esc cerrar</p>
        </div>
      )}
    </div>
  );
}
