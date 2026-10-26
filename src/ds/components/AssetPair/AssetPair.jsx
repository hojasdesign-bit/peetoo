import React from 'react';
import styles from './AssetPair.module.css';
import { cn } from '../../utils.js';

function AssetCircle({ asset, size }) {
  return (
    <span
      className={styles.circle}
      style={{ width: size, height: size, background: asset.color || 'var(--cds-accent)', fontSize: Math.round(size * 0.4) }}
      title={asset.code}
    >
      {asset.src ? <img src={asset.src} alt="" className={styles.img} /> : asset.symbol || asset.code?.[0] || '?'}
    </span>
  );
}

/**
 * AssetPair — el par «Das / Recibes» de las tablas P2P: dos iconos de
 * activo solapados (cripto o fíat). `reverse` invierte el orden visual
 * según el lado de la operación (comprar / vender). Cada activo acepta
 * { code, symbol, color, src } — con `src` se usa la imagen; si no, el
 * símbolo sobre el color, como TokenIcon.
 */
export function AssetPair({ from, to, reverse = false, size = 44, className = '', ...rest }) {
  const first = reverse ? to : from;
  const second = reverse ? from : to;
  return (
    <span
      className={cn(styles.pair, className)}
      style={{ width: Math.round(size * 1.62), height: size }}
      role="img"
      aria-label={`${first.code} / ${second.code}`}
      {...rest}
    >
      <AssetCircle asset={first} size={size} />
      <span className={styles.second} style={{ left: Math.round(size * 0.62) }}>
        <AssetCircle asset={second} size={size} />
      </span>
    </span>
  );
}
