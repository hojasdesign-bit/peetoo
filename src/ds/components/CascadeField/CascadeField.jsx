import React, { useEffect, useRef, useState } from 'react';
import styles from './CascadeField.module.css';
import { cn } from '../../utils.js';
import { OptionRow } from '../OptionRow/OptionRow.jsx';

/**
 * CascadeField — dos campos UNIDOS en una sola pieza: a la izquierda
 * un input de texto con opciones (escribes y eliges de la lista
 * filtrada) y a la derecha un select cuyas opciones DEPENDEN de lo
 * elegido en el primero. Al cambiar el primero, el segundo se
 * reinicia y queda deshabilitado hasta que haya una elección válida.
 *
 * Datos: cada opción del primer campo puede traer su lista en
 * `options`; o se resuelve con `optionsFor(valorDelPrimero)`.
 * Valor: { first, second } — `onChange` emite el objeto actualizado.
 *
 * Ejemplo: activo → redes disponibles
 *   options = [{ value: 'USDC', label: 'USDC', options: [
 *     { value: 'base', label: 'Base' }, { value: 'tron', label: 'Tron' } ] }]
 */
export function CascadeField({
  label,
  options = [],
  optionsFor,
  value = {},
  onChange,
  firstPlaceholder = 'Escribe o elige…',
  secondPlaceholder = 'Selecciona…',
  firstAriaLabel = 'Primer campo',
  secondAriaLabel = 'Segundo campo',
  error,
  hint,
  className = '',
}) {
  const firstOption = options.find((o) => o.value === value.first) || null;
  const dependent = value.first
    ? optionsFor
      ? optionsFor(value.first) || []
      : firstOption?.options || []
    : [];

  const [text, setText] = useState(firstOption ? firstOption.label : '');
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const rootRef = useRef(null);
  const inputRef = useRef(null);

  // Sincroniza el texto cuando el valor llega de fuera
  useEffect(() => {
    setText(firstOption ? firstOption.label : '');
  }, [value.first]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  const q = text.trim().toLowerCase();
  const filtered =
    firstOption && text === firstOption.label
      ? options
      : options.filter((o) => `${o.label} ${o.description || ''}`.toLowerCase().includes(q));

  const chooseFirst = (opt) => {
    setText(opt.label);
    setOpen(false);
    onChange?.({ first: opt.value, second: null });
  };

  const handleText = (e) => {
    const next = e.target.value;
    setText(next);
    setOpen(true);
    setHighlight(0);
    if (value.first && next !== firstOption?.label) {
      // El texto ya no coincide con la elección: se limpia la cascada
      onChange?.({ first: null, second: null });
    }
  };

  const handleBlur = () => {
    // Sin elección válida escrita a mano, el texto vuelve a la opción
    const match = options.find((o) => o.label.toLowerCase() === text.trim().toLowerCase());
    if (match) {
      if (match.value !== value.first) chooseFirst(match);
      else setText(match.label);
    } else if (text.trim() === '') {
      if (value.first) onChange?.({ first: null, second: null });
    } else {
      setText(firstOption ? firstOption.label : '');
      if (!firstOption) onChange?.({ first: null, second: null });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setOpen(false);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setHighlight((h) => Math.min(h + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === 'Enter' && open && filtered[highlight]) {
      e.preventDefault();
      chooseFirst(filtered[highlight]);
    }
  };

  const secondDisabled = !value.first || dependent.length === 0;

  return (
    <div className={cn(styles.root, className)} ref={rootRef}>
      {label && <span className={styles.label}>{label}</span>}
      <div className={cn(styles.joint, error && styles.hasError)}>
        <div className={styles.firstWrap}>
          <input
            ref={inputRef}
            type="text"
            className={styles.input}
            value={text}
            placeholder={firstPlaceholder}
            aria-label={firstAriaLabel}
            role="combobox"
            aria-expanded={open}
            aria-haspopup="listbox"
            autoComplete="off"
            onChange={handleText}
            onFocus={() => setOpen(true)}
            // FIX LOCAL peetoo-app (no está en el DS fuente): tras elegir una
            // opción el input conserva el foco (mousedown con preventDefault),
            // así que un segundo clic no dispara onFocus y el panel no
            // reabría. Con onClick reabre siempre; subir este fix al DS.
            onClick={() => setOpen(true)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
          />
          {open && filtered.length > 0 && (
            <ul className={styles.panel} role="listbox" aria-label={firstAriaLabel}>
              {filtered.map((opt, i) => (
                <li key={opt.value}>
                  <OptionRow
                    role="option"
                    aria-selected={value.first === opt.value}
                    icon={opt.icon}
                    label={opt.label}
                    code={opt.description}
                    selected={value.first === opt.value}
                    className={cn(i === highlight && styles.highlighted)}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => chooseFirst(opt)}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
        <span className={styles.divider} aria-hidden="true" />
        <div className={styles.selectWrap}>
          <select
            className={styles.select}
            aria-label={secondAriaLabel}
            value={value.second ?? ''}
            disabled={secondDisabled}
            onChange={(e) => onChange?.({ first: value.first, second: e.target.value || null })}
          >
            <option value="">{secondPlaceholder}</option>
            {dependent.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <svg className={styles.chevron} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      {error ? (
        <p className={styles.error} role="alert">{error}</p>
      ) : (
        hint && <p className={styles.hint}>{hint}</p>
      )}
    </div>
  );
}
