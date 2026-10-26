import React from 'react';
import styles from './BottomNav.module.css';
import { cn } from '../../utils.js';

/**
 * BottomNav — navegación inferior móvil (los productos del sistema
 * son mobile-first): icono + etiqueta por destino, activo en violeta
 * e insignia de conteo opcional.
 * items: [{ value, label, icon, badge }]
 */
export function BottomNav({
  items = [],
  value,
  onNavigate,
  className = '',
  ...rest
}) {
  return (
    <nav className={cn(styles.nav, className)} aria-label="Navegación principal" {...rest}>
      {items.map((item) => {
        const active = item.value === value;
        return (
          <button
            key={item.value}
            type="button"
            className={cn(styles.item, active && styles.active)}
            aria-current={active ? 'page' : undefined}
            onClick={() => onNavigate?.(item.value)}
          >
            <span className={styles.icon}>
              {item.icon}
              {item.badge != null && <span className={styles.badge}>{item.badge}</span>}
            </span>
            <span className={styles.label}>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
