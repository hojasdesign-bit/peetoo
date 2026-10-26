import React, { useLayoutEffect, useRef, useState } from 'react';
import styles from './Tabs.module.css';
import { cn } from '../../utils.js';

/**
 * Tabs — pestañas con subrayado animado en color de acento.
 * El indicador mide la pestaña activa y se desliza hasta ella.
 */
export function Tabs({ tabs = [], active, onChange, className = '', ...rest }) {
  const listRef = useRef(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const update = () => {
      const el = listRef.current?.querySelector(`[data-tab="${active}"]`);
      if (el) setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [tabs, active]);

  return (
    <div ref={listRef} className={cn(styles.tabs, className)} role="tablist" {...rest}>
      {tabs.map((tab) => {
        const selected = tab.id === active;
        return (
          <button
            key={tab.id}
            type="button"
            data-tab={tab.id}
            role="tab"
            aria-selected={selected}
            className={cn(styles.tab, selected && styles.active)}
            onClick={() => onChange?.(tab.id)}
          >
            <span className={styles.label}>{tab.label}</span>
            {tab.badge != null && <span className={styles.badge}>{tab.badge}</span>}
          </button>
        );
      })}
      <span
        className={styles.indicator}
        style={{ left: indicator.left, width: indicator.width }}
        aria-hidden="true"
      />
    </div>
  );
}
