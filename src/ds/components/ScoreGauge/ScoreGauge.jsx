import React from 'react';
import styles from './ScoreGauge.module.css';
import { cn } from '../../utils.js';

/**
 * ScoreGauge — medidor circular del score de reputación (el 86 de los
 * perfiles de Peetoo). El color es semántico: ≥80 éxito, ≥60 aviso,
 * por debajo, peligro. `label` muestra la etiqueta del nivel
 * («Alto potencial», «Clase Top»…) bajo el medidor.
 */
export function ScoreGauge({ score = 0, size = 140, label, caption = 'Score', className = '', ...rest }) {
  const pct = Math.max(0, Math.min(100, score));
  const r = 52;
  const c = 2 * Math.PI * r;
  const tone = pct >= 80 ? styles.high : pct >= 60 ? styles.mid : styles.low;
  return (
    <div
      className={cn(styles.wrap, tone, className)}
      role="img"
      aria-label={`${caption}: ${Math.round(pct)} de 100${label ? `. ${label}` : ''}`}
      {...rest}
    >
      <div className={styles.gauge} style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox="0 0 120 120" className={styles.svg} aria-hidden="true">
          <circle cx="60" cy="60" r={r} className={styles.track} />
          <circle
            cx="60"
            cy="60"
            r={r}
            className={styles.arc}
            strokeDasharray={c}
            strokeDashoffset={c - (pct / 100) * c}
          />
        </svg>
        <div className={styles.center}>
          <span className={styles.value} style={{ fontSize: Math.round(size * 0.3) }}>
            {Math.round(pct)}
          </span>
          <span className={styles.caption}>{caption}</span>
        </div>
      </div>
      {label && <span className={styles.label}>{label}</span>}
    </div>
  );
}
