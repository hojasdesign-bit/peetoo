import React, { useState } from 'react';
import styles from './Accordion.module.css';
import { cn } from '../../utils.js';

/**
 * Accordion — lista plegable de secciones.
 * Con `allowMultiple` se pueden abrir varias a la vez; sin él, solo una.
 */
export function Accordion({
  items = [],
  allowMultiple = false,
  defaultOpen = [],
  className = '',
  ...rest
}) {
  const [openSet, setOpenSet] = useState(() => new Set(defaultOpen));

  const toggle = (index) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        if (!allowMultiple) next.clear();
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div className={cn(styles.accordion, className)} {...rest}>
      {items.map((item, index) => {
        const open = openSet.has(index);
        const btnId = `cds-accordion-btn-${index}`;
        const panelId = `cds-accordion-panel-${index}`;
        return (
          <div key={index} className={cn(styles.item, open && styles.open)}>
            <button
              type="button"
              id={btnId}
              aria-expanded={open}
              aria-controls={panelId}
              className={styles.header}
              onClick={() => toggle(index)}
            >
              <span className={styles.title}>{item.title}</span>
              <svg
                className={styles.chevron}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4 6l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              aria-hidden={!open}
              className={styles.collapse}
            >
              <div className={styles.collapseInner}>
                <div className={styles.content}>{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
