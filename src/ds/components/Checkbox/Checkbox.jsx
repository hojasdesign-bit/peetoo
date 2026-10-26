import styles from './Checkbox.module.css';
import { cn } from '../../utils.js';

/**
 * Checkbox — casilla de verificación con etiqueta.
 * Tilde SVG violeta; el input nativo queda oculto pero enfocable.
 */
export function Checkbox({
  checked,
  onChange,
  disabled = false,
  children,
  className = '',
  ...rest
}) {
  return (
    <label className={cn(styles.root, disabled && styles.disabled, className)}>
      <input
        type="checkbox"
        className={styles.native}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        {...rest}
      />
      <span className={styles.box} aria-hidden="true">
        <svg className={styles.check} width="13" height="13" viewBox="0 0 14 14" fill="none">
          <path d="M2.5 7.5l3 3 6-6.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      {children && <span className={styles.label}>{children}</span>}
    </label>
  );
}
