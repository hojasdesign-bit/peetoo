import { useEffect, useRef, useState } from 'react';
import styles from './CurrencySelect.module.css';
import { cn } from '../../utils.js';
import { TokenIcon } from '../TokenIcon/TokenIcon.jsx';
import { SearchInput } from '../SearchInput/SearchInput.jsx';
import { OptionRow } from '../OptionRow/OptionRow.jsx';

/**
 * CurrencySelect — selector de moneda en forma de píldora (icono de
 * 14px, como el del widget). Al abrir despliega el PANEL del widget:
 * cabecera con título, buscador (con más de 5 opciones) y lista de
 * filas OptionRow con icono, nombre, código y check de seleccionado.
 * Se cierra al hacer clic fuera y con Escape.
 */
export function CurrencySelect({
  label,
  value,
  options = [],
  onChange,
  id: idProp,
  panelTitle = 'Seleccionar moneda',
  searchPlaceholder = 'Buscar moneda',
  searchable = true,
  align = 'left',
  className = '',
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const selected = options.find((o) => o.code === value) || options[0];

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
    onChange?.(opt.code, opt);
    close();
  };

  const q = query.trim().toLowerCase();
  const filtered = q
    ? options.filter((o) => `${o.name} ${o.code}`.toLowerCase().includes(q))
    : options;
  const showSearch = searchable && options.length > 5;

  return (
    <div className={cn(styles.root, className)} ref={rootRef}>
      {label && (
        <span className={styles.label} id={idProp}>
          {label}
        </span>
      )}
      <button
        type="button"
        ref={triggerRef}
        className={cn(styles.trigger, open && styles.open)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-labelledby={label ? idProp : undefined}
        onClick={() => (open ? close() : setOpen(true))}
      >
        {selected && <TokenIcon symbol={selected.symbol} color={selected.color} size={14} />}
        <span className={styles.code}>{selected ? selected.code : '—'}</span>
        <svg className={styles.chevron} width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className={cn(styles.menu, align === 'right' && styles.alignRight)} role="dialog" aria-label={panelTitle}>
          <div className={styles.menuHead}>
            <span className={styles.menuTitle}>{panelTitle}</span>
            <button type="button" className={styles.closeBtn} onClick={close} aria-label="Cerrar">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          {showSearch && (
            <SearchInput
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
            />
          )}
          <ul className={styles.list} role="listbox" aria-label={panelTitle}>
            {filtered.map((opt) => (
              <li key={opt.code} className={styles.item}>
                <OptionRow
                  role="option"
                  aria-selected={selected && opt.code === selected.code}
                  icon={<TokenIcon symbol={opt.symbol} color={opt.color} size={24} />}
                  label={opt.name}
                  code={opt.code}
                  selected={!!selected && opt.code === selected.code}
                  onClick={() => choose(opt)}
                />
              </li>
            ))}
            {filtered.length === 0 && <li className={styles.empty}>Sin resultados</li>}
          </ul>
        </div>
      )}
    </div>
  );
}
