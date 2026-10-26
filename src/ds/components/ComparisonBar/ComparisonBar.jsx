import React from 'react';
import styles from './ComparisonBar.module.css';
import { cn } from '../../utils.js';

/**
 * ComparisonBar — comparativa de dos barras «tú vs promedio», como el
 * historial de los perfiles de Peetoo (100% frente a 73%). ProgressBar
 * muestra un solo valor; esta pone los dos en la misma escala, con
 * leyenda y valores.
 */
export function ComparisonBar({
  label,
  value = 0,
  benchmark = 0,
  valueLabel = 'Tú',
  benchmarkLabel = 'Promedio',
  suffix = '%',
  max = 100,
  className = '',
  ...rest
}) {
  const pct = (v) => Math.max(0, Math.min(100, (v / max) * 100));
  return (
    <div className={cn(styles.wrap, className)} {...rest}>
      {label && (
        <div className={styles.head}>
          <span className={styles.label}>{label}</span>
          <span className={styles.headValue}>
            {value}
            {suffix}
          </span>
        </div>
      )}
      <div className={styles.bars}>
        <div className={styles.track} role="img" aria-label={`${valueLabel}: ${value}${suffix}`}>
          <div className={cn(styles.fill, styles.valueFill)} style={{ width: `${pct(value)}%` }} />
        </div>
        <div className={styles.track} role="img" aria-label={`${benchmarkLabel}: ${benchmark}${suffix}`}>
          <div className={cn(styles.fill, styles.benchFill)} style={{ width: `${pct(benchmark)}%` }} />
        </div>
      </div>
      <div className={styles.legend}>
        <span className={styles.legendItem}>
          <span className={cn(styles.dot, styles.valueDot)} />
          {valueLabel} · {value}
          {suffix}
        </span>
        <span className={styles.legendItem}>
          <span className={cn(styles.dot, styles.benchDot)} />
          {benchmarkLabel} · {benchmark}
          {suffix}
        </span>
      </div>
    </div>
  );
}
