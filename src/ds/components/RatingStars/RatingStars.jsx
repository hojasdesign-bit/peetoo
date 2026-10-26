import React from 'react';
import styles from './RatingStars.module.css';
import { cn } from '../../utils.js';

const STAR = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.6l2.9 5.9 6.5.95-4.7 4.58 1.1 6.47L12 17.45l-5.8 3.05 1.1-6.47L2.6 9.45l6.5-.95L12 2.6z" />
  </svg>
);

/**
 * RatingStars — valoración de 0 a 5 estrellas con relleno parcial.
 * Con `onRate` se vuelve interactiva (botones por estrella).
 */
export function RatingStars({ value = 0, size = 16, onRate, className = '', ...rest }) {
  const pct = (Math.max(0, Math.min(5, value)) / 5) * 100;
  if (onRate) {
    return (
      <span className={cn(styles.wrap, className)} role="radiogroup" aria-label="Tu valoración" {...rest}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={value === n}
            aria-label={`${n} de 5`}
            className={cn(styles.btn, n <= Math.round(value) && styles.on)}
            style={{ width: size, height: size }}
            onClick={() => onRate(n)}
          >
            {STAR}
          </button>
        ))}
      </span>
    );
  }
  return (
    <span className={cn(styles.wrap, className)} role="img" aria-label={`${value} de 5 estrellas`} {...rest}>
      <span className={styles.base} style={{ width: size * 5 + 8, height: size }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className={styles.star} style={{ width: size, height: size }}>{STAR}</span>
        ))}
      </span>
      <span className={styles.fill} style={{ width: `calc(${pct}% )`, height: size }} aria-hidden="true">
        <span className={styles.baseInner} style={{ width: size * 5 + 8, height: size }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className={styles.star} style={{ width: size, height: size }}>{STAR}</span>
          ))}
        </span>
      </span>
    </span>
  );
}
