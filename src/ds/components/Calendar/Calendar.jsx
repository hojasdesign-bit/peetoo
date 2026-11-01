import React, { useMemo, useState } from 'react';
import styles from './Calendar.module.css';
import { cn } from '../../utils.js';

const MESES = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
];
const DIAS = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

const mismoDia = (a, b) =>
  a instanceof Date &&
  b instanceof Date &&
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

// Día actual al cargar el módulo: basta para destacar «hoy» sin llamar
// a Date durante el render.
const HOY = new Date();

/**
 * Calendar — calendario mensual en español, con la semana desde el
 * lunes. Navega al mes anterior y siguiente, destaca el día actual
 * y el seleccionado, y deshabilita días con el predicado opcional
 * `isDisabled(fecha)`. Es de un solo día: sin selector de rango en
 * esta versión. `selected` es un Date o null; `onSelect` recibe el
 * Date elegido.
 */
export function Calendar({ selected = null, onSelect, isDisabled, className = '', ...rest }) {
  const [vista, setVista] = useState(() => {
    const inicial = selected instanceof Date ? selected : new Date();
    return new Date(inicial.getFullYear(), inicial.getMonth(), 1);
  });
  const hoy = HOY;

  const year = vista.getFullYear();
  const month = vista.getMonth();
  const celdas = useMemo(() => {
    const primerDia = (new Date(year, month, 1).getDay() + 6) % 7; // lunes = 0
    const diasDelMes = new Date(year, month + 1, 0).getDate();
    const lista = [];
    for (let i = 0; i < primerDia; i += 1) lista.push(null);
    for (let dia = 1; dia <= diasDelMes; dia += 1) lista.push(new Date(year, month, dia));
    return lista;
  }, [year, month]);

  const titulo = `${MESES[month][0].toUpperCase()}${MESES[month].slice(1)} ${year}`;
  const mover = (delta) => setVista(new Date(year, month + delta, 1));

  return (
    <div className={cn(styles.calendar, className)} {...rest}>
      <div className={styles.header}>
        <button type="button" className={styles.nav} onClick={() => mover(-1)} aria-label="Mes anterior">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 3 5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className={styles.title}>{titulo}</p>
        <button type="button" className={styles.nav} onClick={() => mover(1)} aria-label="Mes siguiente">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <div className={styles.grid} role="row">
        {DIAS.map((dia) => (
          <span key={dia} className={styles.weekday}>
            {dia}
          </span>
        ))}
        {celdas.map((fecha, i) => {
          if (!fecha) return <span key={`vacio-${i}`} className={styles.empty} />;
          const deshabilitado = isDisabled?.(fecha) ?? false;
          return (
            <button
              key={fecha.toISOString()}
              type="button"
              className={cn(
                styles.day,
                mismoDia(fecha, hoy) && styles.today,
                mismoDia(fecha, selected) && styles.selected,
                deshabilitado && styles.disabled,
              )}
              disabled={deshabilitado}
              aria-label={fecha.toLocaleDateString('es', { day: 'numeric', month: 'long', year: 'numeric' })}
              aria-pressed={mismoDia(fecha, selected)}
              onClick={() => onSelect?.(fecha)}
            >
              {fecha.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
