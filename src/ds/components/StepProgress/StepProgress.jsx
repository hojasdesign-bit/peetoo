import React from 'react';
import styles from './StepProgress.module.css';
import { cn } from '../../utils.js';

/**
 * StepProgress — indicador horizontal de pasos con conectores.
 * `steps`: etiquetas de cada paso. `current`: índice del paso activo (0-based).
 * El paso actual se muestra en violeta con resplandor; los completados, con check.
 * Variante `compact`: solo nodos y conectores, sin etiquetas.
 */
export function StepProgress({
  steps = [],
  current = 0,
  variant = 'default',
  className = '',
  ...rest
}) {
  return (
    <ol className={cn(styles.steps, styles[variant], className)} {...rest}>
      {steps.map((label, i) => {
        const state = i < current ? 'done' : i === current ? 'current' : 'todo';
        return (
          <li
            key={i}
            className={cn(styles.step, styles[state])}
            aria-current={state === 'current' ? 'step' : undefined}
          >
            {i > 0 && (
              <span
                className={cn(styles.connector, i <= current && styles.connectorDone)}
                aria-hidden="true"
              />
            )}
            <span className={styles.node}>
              {state === 'done' ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 12.5 9.5 18 20 6.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <span className={styles.number}>{i + 1}</span>
              )}
            </span>
            {variant === 'default' && <span className={styles.label}>{label}</span>}
          </li>
        );
      })}
    </ol>
  );
}
