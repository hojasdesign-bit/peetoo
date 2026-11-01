import React from 'react';
import styles from './SideNav.module.css';
import { cn } from '../../utils.js';

/**
 * SideNav — navegación vertical para paneles y vistas de escritorio.
 * Distinta de BottomNav (barra inferior móvil) y de Header (barra
 * superior): una columna con secciones, icono y contador opcionales.
 * items: [{ id, label, icon?, badge?, disabled? }] o cabeceras de
 * sección [{ section: 'Título' }]. `activeId` marca el destino actual
 * y `onSelect` recibe su id. Los items deshabilitados no disparan
 * onSelect.
 */
export function SideNav({ items = [], activeId, onSelect, className = '', ...rest }) {
  return (
    <nav className={cn(styles.nav, className)} aria-label={rest['aria-label'] || 'Navegación lateral'} {...rest}>
      {items.map((item, index) => {
        if (item.section != null) {
          return (
            <p key={`section-${index}`} className={styles.section}>
              {item.section}
            </p>
          );
        }
        const active = item.id === activeId;
        return (
          <button
            key={item.id}
            type="button"
            className={cn(styles.item, active && styles.active)}
            aria-current={active ? 'page' : undefined}
            disabled={item.disabled}
            onClick={() => {
              if (!item.disabled) onSelect?.(item.id);
            }}
          >
            {item.icon && <span className={styles.icon}>{item.icon}</span>}
            <span className={styles.label}>{item.label}</span>
            {item.badge != null && <span className={styles.badge}>{item.badge}</span>}
          </button>
        );
      })}
    </nav>
  );
}
