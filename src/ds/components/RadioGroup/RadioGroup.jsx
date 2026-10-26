import styles from './RadioGroup.module.css';
import { cn } from '../../utils.js';

/**
 * RadioGroup — grupo de opciones excluyentes.
 * options: [{ value, label, hint }]. Radios circulares con punto violeta.
 */
export function RadioGroup({
  name,
  options = [],
  value,
  onChange,
  legend,
  className = '',
  ...rest
}) {
  return (
    <fieldset className={cn(styles.group, className)} {...rest}>
      {legend && <legend className={styles.legend}>{legend}</legend>}
      <div className={styles.options}>
        {options.map((opt) => (
          <label key={opt.value} className={styles.option}>
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange?.(opt.value)}
              className={styles.native}
              disabled={opt.disabled}
            />
            <span className={styles.dot} aria-hidden="true" />
            <span className={styles.text}>
              <span className={styles.label}>{opt.label}</span>
              {opt.hint && <span className={styles.hint}>{opt.hint}</span>}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
