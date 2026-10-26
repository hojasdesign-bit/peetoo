import { useEffect, useRef, useState } from 'react';
import styles from './CopyField.module.css';
import { cn } from '../../utils.js';

/**
 * CopyField — valor de solo lectura con botón de copiar y confirmación
 * visual (direcciones de wallet, IDs de orden, enlaces de referido).
 */
export function CopyField({ label, value, className = '', ...rest }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      /* portapapeles no disponible: la confirmación sirve de demo */
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className={cn(styles.root, className)} {...rest}>
      {label && <span className={styles.label}>{label}</span>}
      <div className={styles.box}>
        <span className={styles.value}>{value}</span>
        <button type="button" className={cn(styles.btn, copied && styles.copied)} onClick={copy} aria-label={copied ? 'Copiado' : 'Copiar'}>
          {copied ? (
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2.5 7.5l3 3 6-6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="9" y="9" width="11" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
              <path d="M5 15H4.5A2.5 2.5 0 0 1 2 12.5v-8A2.5 2.5 0 0 1 4.5 2h8A2.5 2.5 0 0 1 15 4.5V5" stroke="currentColor" strokeWidth="1.8" />
            </svg>
          )}
          {copied ? 'Copiado' : 'Copiar'}
        </button>
      </div>
    </div>
  );
}
