import React, { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './OverflowChips.module.css';
import { cn } from '../../utils.js';

const labelOf = (item) => (typeof item === 'string' ? item : item.label);

/**
 * OverflowChips — lista corta de etiquetas con desborde «+N»: muestra
 * hasta `maxVisible` y agrupa el resto en un contador. Al pasar el
 * cursor (o enfocar) sobre el «+N», un panel flotante muestra los
 * elementos ocultos tal cual, sin el tooltip nativo del navegador.
 * El panel va en un portal con posición fija para que ningún
 * contenedor con scroll (la tabla de ofertas, p. ej.) lo recorte.
 * Los items pueden ser textos u objetos { label, icon }; con
 * `renderItem` se pinta cada uno a medida (p. ej. NetworkChip).
 */
export function OverflowChips({ items = [], maxVisible = 2, renderItem, className = '', ...rest }) {
  const visible = items.slice(0, maxVisible);
  const hidden = items.slice(maxVisible);
  const anchorRef = useRef(null);
  const [pos, setPos] = useState(null);

  const renderOne = (item, i) =>
    renderItem ? (
      <React.Fragment key={i}>{renderItem(item, i)}</React.Fragment>
    ) : (
      <span key={i} className={styles.chip}>
        {typeof item === 'string' ? item : (
          <>
            {item.icon}
            {item.label}
          </>
        )}
      </span>
    );

  const show = () => {
    const el = anchorRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const below = r.top < 160;
    setPos({
      x: Math.min(Math.max(r.left + r.width / 2, 140), window.innerWidth - 140),
      y: below ? r.bottom + 8 : r.top - 8,
      below,
    });
  };
  const hide = () => setPos(null);

  return (
    <span className={cn(styles.wrap, className)} {...rest}>
      {visible.map(renderOne)}
      {hidden.length > 0 && (
        <span
          ref={anchorRef}
          className={styles.more}
          tabIndex={0}
          aria-label={`y ${hidden.length} más: ${hidden.map(labelOf).join(', ')}`}
          onMouseEnter={show}
          onMouseLeave={hide}
          onFocus={show}
          onBlur={hide}
        >
          +{hidden.length}
        </span>
      )}
      {pos &&
        createPortal(
          <div
            className={styles.portal}
            role="tooltip"
            style={{
              left: pos.x,
              top: pos.y,
              transform: pos.below ? 'translate(-50%, 0)' : 'translate(-50%, -100%)',
            }}
          >
            {hidden.map(renderOne)}
          </div>,
          document.body,
        )}
    </span>
  );
}
