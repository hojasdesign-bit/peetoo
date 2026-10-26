import React from 'react';
import styles from './Pagination.module.css';
import { cn } from '../../utils.js';

/**
 * Pagination — anterior/siguiente más números de página con elipsis.
 * Colapsa los rangos intermedios cuando hay muchas páginas. Dos formas:
 * `pill` (números sueltos, el seleccionado en píldora), `rounded`
 * (botones cuadrados con bordes redondeados y borde visible) y `soft`
 * (los mismos cuadrados con fondo suave, pero sin borde).
 */
export function Pagination({ page = 1, totalPages = 1, onChange, shape = 'pill', className = '', ...rest }) {
  const go = (next) => {
    if (next >= 1 && next <= totalPages && next !== page) onChange?.(next);
  };

  const items = buildItems(page, totalPages);

  return (
    <nav className={cn(styles.pagination, shape === 'rounded' && styles.rounded, shape === 'soft' && styles.soft, className)} aria-label="Paginación" {...rest}>
      <button
        type="button"
        className={styles.pageBtn}
        onClick={() => go(page - 1)}
        disabled={page <= 1}
        aria-label="Página anterior"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M9 2.5L4.5 7 9 11.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {items.map((item, index) =>
        item === '…' ? (
          <span key={`ellipsis-${index}`} className={styles.ellipsis} aria-hidden="true">
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            className={cn(styles.pageBtn, item === page && styles.current)}
            onClick={() => go(item)}
            aria-label={`Página ${item}`}
            aria-current={item === page ? 'page' : undefined}
          >
            {item}
          </button>
        ),
      )}

      <button
        type="button"
        className={styles.pageBtn}
        onClick={() => go(page + 1)}
        disabled={page >= totalPages}
        aria-label="Página siguiente"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M5 2.5L9.5 7 5 11.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </nav>
  );
}

/** Construye la secuencia de páginas: números y elipsis ('…'). */
function buildItems(page, totalPages) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const pages = new Set([1, 2, page - 1, page, page + 1, totalPages - 1, totalPages]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b);
  const result = [];
  let prev = 0;
  for (const p of sorted) {
    if (prev && p - prev > 1) result.push('…');
    result.push(p);
    prev = p;
  }
  return result;
}
