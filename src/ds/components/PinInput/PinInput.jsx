import { useRef } from 'react';
import styles from './PinInput.module.css';
import { cn } from '../../utils.js';

/**
 * PinInput — código de N dígitos en cajas individuales (PIN de banca,
 * verificación en dos pasos). Avanza solo, retrocede con Backspace
 * y distribuye el texto al pegar.
 */
export function PinInput({
  length = 4,
  value = '',
  onChange,
  label,
  error = false,
  className = '',
  ...rest
}) {
  const refs = useRef([]);
  const arr = () => Array.from({ length }, (_, k) => value[k] || '');

  const handleChange = (i, e) => {
    const ch = e.target.value.replace(/\D/g, '').slice(-1);
    const a = arr();
    a[i] = ch;
    onChange?.(a.join(''));
    if (ch && i < length - 1) refs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace') {
      const a = arr();
      if (a[i]) {
        a[i] = '';
        onChange?.(a.join(''));
      } else if (i > 0) {
        refs.current[i - 1]?.focus();
        a[i - 1] = '';
        onChange?.(a.join(''));
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = (e.clipboardData.getData('text') || '').replace(/\D/g, '').slice(0, length);
    if (text) {
      onChange?.(text);
      refs.current[Math.min(text.length, length - 1)]?.focus();
    }
  };

  return (
    <div className={cn(styles.root, className)} {...rest}>
      {label && <span className={styles.label}>{label}</span>}
      <div className={styles.boxes} onPaste={handlePaste}>
        {Array.from({ length }).map((_, i) => (
          <input
            key={i}
            ref={(el) => (refs.current[i] = el)}
            className={cn(styles.box, error && styles.invalid)}
            inputMode="numeric"
            autoComplete={i === 0 ? 'one-time-code' : 'off'}
            aria-label={`Dígito ${i + 1} de ${length}`}
            value={value[i] || ''}
            onChange={(e) => handleChange(i, e)}
            onKeyDown={(e) => handleKeyDown(i, e)}
          />
        ))}
      </div>
    </div>
  );
}
