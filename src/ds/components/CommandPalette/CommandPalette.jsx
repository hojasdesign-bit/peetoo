import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './CommandPalette.module.css';
import { cn } from '../../utils.js';

/**
 * CommandPalette — panel de comandos centrado sobre un scrim, con
 * buscador y resultados agrupados por sección. Se navega con ↑↓,
 * se confirma con Enter y se cierra con Escape o clic en el scrim.
 * Es controlado: `open` lo muestra, `onClose` lo cierra y `onSelect`
 * recibe el item elegido. Los items son { id?, label, hint?,
 * shortcut?, icon?, section? }; sin `section`, van sin encabezado.
 * No instala ningún atajo global: quien lo usa decide cómo abrirlo.
 */
export function CommandPalette({
  open = false,
  onClose,
  items = [],
  onSelect,
  placeholder = 'Buscar acciones…',
  className = '',
  ...rest
}) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [wasOpen, setWasOpen] = useState(open);
  const inputRef = useRef(null);

  // Al abrir, la búsqueda vuelve a empezar (ajuste durante el render,
  // patrón documentado para sincronizar estado con una prop).
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) {
      setQuery('');
      setActive(0);
    }
  }

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  const q = query.trim().toLowerCase();
  const filtered = useMemo(
    () => items.filter((item) => !q || `${item.label} ${item.hint || ''}`.toLowerCase().includes(q)),
    [items, q],
  );

  const groups = useMemo(() => {
    const out = [];
    filtered.forEach((item) => {
      const key = item.section || '';
      let group = out.find((entry) => entry.key === key);
      if (!group) {
        group = { key, items: [] };
        out.push(group);
      }
      group.items.push(item);
    });
    return out;
  }, [filtered]);

  const safeActive = Math.min(active, Math.max(0, filtered.length - 1));

  const choose = (item) => {
    onSelect?.(item);
  };

  const onInputKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActive((current) => Math.min(current + 1, filtered.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive((current) => Math.max(current - 1, 0));
    } else if (event.key === 'Enter' && filtered[safeActive]) {
      event.preventDefault();
      choose(filtered[safeActive]);
    }
  };

  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={cn(styles.panel, className)}
        role="dialog"
        aria-modal="true"
        aria-label="Paleta de comandos"
        onClick={(event) => event.stopPropagation()}
        {...rest}
      >
        <div className={styles.search}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className={styles.searchIcon}>
            <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.8" />
            <path d="M12.5 12.5 16 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
            }}
            onKeyDown={onInputKeyDown}
            placeholder={placeholder}
            aria-label="Buscar comandos"
            className={styles.input}
          />
          {query && (
            <button type="button" className={styles.clear} onClick={() => setQuery('')} aria-label="Limpiar búsqueda">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 2l8 8M10 2 2 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>
        <div className={styles.results}>
          {filtered.length === 0 ? (
            <p className={styles.empty}>Sin resultados{query ? ` para «${query}»` : ''}</p>
          ) : (
            groups.map((group) => (
              <div key={group.key || 'general'} className={styles.group}>
                {group.key && <p className={styles.section}>{group.key}</p>}
                {group.items.map((item) => {
                  const index = filtered.indexOf(item);
                  return (
                    <button
                      key={item.id ?? item.label}
                      type="button"
                      className={cn(styles.item, index === safeActive && styles.active)}
                      onMouseEnter={() => setActive(index)}
                      onClick={() => choose(item)}
                    >
                      {item.icon && <span className={styles.icon}>{item.icon}</span>}
                      <span className={styles.label}>{item.label}</span>
                      {item.hint && <span className={styles.hint}>{item.hint}</span>}
                      {item.shortcut && <kbd className={styles.kbd}>{item.shortcut}</kbd>}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>
        <div className={styles.footer}>
          <span>↑↓ navegar</span>
          <span>Enter seleccionar</span>
          <span>Esc cerrar</span>
        </div>
      </div>
    </div>
  );
}
