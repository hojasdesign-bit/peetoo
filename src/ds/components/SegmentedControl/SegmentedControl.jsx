import React from 'react';
import styles from './SegmentedControl.module.css';
import { cn } from '../../utils.js';

/**
 * SegmentedControl — conmutador de segmentos (Comprar/Vender en el
 * mercado P2P, pestañas compactas de catálogo). Una sola selección.
 */
export function SegmentedControl({
  options = [],
  value,
  onChange,
  tone = 'neutral',
  ariaLabel,
  className = '',
  ...rest
}) {
  return (
    <div className={cn(styles.root, className)} role="tablist" aria-label={ariaLabel} {...rest}>
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="tab"
            aria-selected={active}
            className={cn(styles.seg, active && styles.active, active && tone === 'accent' && styles.activeAccent)}
            onClick={() => onChange?.(opt.value)}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
