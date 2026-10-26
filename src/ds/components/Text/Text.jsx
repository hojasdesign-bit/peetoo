import React from 'react';
import styles from './Text.module.css';

const SIZES = {
  'body-lg': 'bodyLg',
  body: 'body',
  'body-sm': 'bodySm',
  caption: 'caption',
  micro: 'micro',
};
const WEIGHTS = { 400: 'w400', 500: 'w500', 600: 'w600', 700: 'w700' };
const TONES = {
  ink: '',
  'ink-2': 'toneInk2',
  muted: 'toneMuted',
  label: 'toneLabel',
  accent: 'toneAccent',
};

/**
 * Text — texto corrido en los tamaños del sistema (18/16/14/12/11)
 * con peso 500 por defecto, como los párrafos de la referencia.
 */
export function Text({ size = 'body', weight = 500, tone = 'ink', as = 'p', children, className = '' }) {
  const Tag = as;
  const cls = [styles.root, styles[SIZES[size] || 'body'], styles[WEIGHTS[weight] || 'w500'], styles[TONES[tone] || ''], className]
    .filter(Boolean)
    .join(' ');
  return <Tag className={cls}>{children}</Tag>;
}
