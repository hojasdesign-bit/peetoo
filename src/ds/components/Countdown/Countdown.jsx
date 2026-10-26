import React from 'react';
import styles from './Countdown.module.css';
import { cn } from '../../utils.js';

/**
 * Countdown — cuenta atrás con anillo de progreso (el temporizador
 * de las órdenes P2P: plazo para pagar o para liberar fondos).
 * A menos de 60 segundos se tiñe de peligro.
 */
export function Countdown({
  secondsLeft = 0,
  totalSeconds = 900,
  label,
  size = 72,
  className = '',
  ...rest
}) {
  const frac = totalSeconds > 0 ? Math.max(0, Math.min(1, secondsLeft / totalSeconds)) : 0;
  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const ss = String(secondsLeft % 60).padStart(2, '0');
  const r = (size - 8) / 2;
  const c = 2 * Math.PI * r;
  const urgent = secondsLeft <= 60;
  return (
    <div className={cn(styles.wrap, className)} {...rest}>
      <span className={styles.ring} style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
          <circle cx={size / 2} cy={size / 2} r={r} className={styles.track} />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            className={cn(styles.arc, urgent && styles.urgent)}
            strokeDasharray={c}
            strokeDashoffset={c * (1 - frac)}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </svg>
        <span className={cn(styles.time, urgent && styles.urgentText)} style={{ fontSize: size * 0.24 }}>
          {mm}:{ss}
        </span>
      </span>
      {label && <span className={styles.label}>{label}</span>}
    </div>
  );
}
