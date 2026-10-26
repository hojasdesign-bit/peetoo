import styles from './Switch.module.css';
import { cn } from '../../utils.js';

/**
 * Switch — interruptor con etiqueta.
 * Usa role="switch" con aria-checked para accesibilidad.
 */
export function Switch({
  checked = false,
  onChange,
  label,
  disabled = false,
  className = '',
  ...rest
}) {
  return (
    <span className={cn(styles.root, disabled && styles.disabled, className)}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={typeof label === 'string' ? label : undefined}
        disabled={disabled}
        className={cn(styles.track, checked && styles.on)}
        onClick={() => onChange?.(!checked)}
        {...rest}
      >
        <span className={styles.thumb} aria-hidden="true" />
      </button>
      {label && <span className={styles.label}>{label}</span>}
    </span>
  );
}
