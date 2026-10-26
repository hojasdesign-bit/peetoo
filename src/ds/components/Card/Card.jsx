import styles from './Card.module.css';
import { cn } from '../../utils.js';

/**
 * Card — contenedor de superficie para agrupar contenido.
 * Variantes: default (plana), glow (resplandor violeta), gradient (degradado radial morado),
 * tint (tinte violeta translúcido) y neutral (blanco translúcido) — las tarjetas de las páginas.
 */
export function Card({
  variant = 'default',
  padding = 'md',
  hoverable = false,
  children,
  className = '',
  ...rest
}) {
  return (
    <div
      className={cn(
        styles.card,
        styles[variant],
        styles[`pad-${padding}`],
        hoverable && styles.hoverable,
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
