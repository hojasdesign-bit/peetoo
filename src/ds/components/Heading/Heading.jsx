import React from 'react';
import styles from './Heading.module.css';

const CLASSES = {
  'display-xl': 'displayXl',
  display: 'display',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
};
const TAGS = {
  'display-xl': 'h1',
  display: 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
};
const TONES = { ink: '', muted: 'toneMuted', accent: 'toneAccent' };

/**
 * Heading — titulares en los niveles de la escala del sistema
 * (display-xl 78, display 60, h1 48, h2 40, h3 32, h4 20; Satoshi
 * 700 sin tracking). `level` fija el tamaño y `as` la etiqueta.
 */
export function Heading({ level = 'h2', as, tone = 'ink', children, className = '' }) {
  const Tag = as || TAGS[level] || 'h2';
  const cls = [styles.root, styles[CLASSES[level] || 'h2'], styles[TONES[tone] || ''], className]
    .filter(Boolean)
    .join(' ');
  return <Tag className={cls}>{children}</Tag>;
}
