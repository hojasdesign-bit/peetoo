import React, { useEffect, useRef } from 'react';
import QRLib from 'qrcode';
import styles from './QRCode.module.css';
import { cn } from '../../utils.js';

/**
 * QRCode — código QR REAL y escaneable del valor dado (dirección de
 * wallet, alias de pago…), generado con la librería `qrcode` — el mismo
 * enfoque del QRModal de Peetoo. Se pinta siempre oscuro sobre blanco:
 * un QR necesita ese contraste en los dos temas. `label` titula la
 * tarjeta y `showValue` imprime el valor en mono debajo.
 */
export function QRCode({ value, size = 200, label, showValue = true, framed = true, className = '', ...rest }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !value) return;
    QRLib.toCanvas(canvasRef.current, value, {
      width: size,
      margin: 1,
      color: { dark: '#101010', light: '#ffffff' },
    }).catch(() => {});
  }, [value, size]);

  return (
    <figure className={cn(styles.figure, framed && styles.framed, className)} {...rest}>
      {label && <figcaption className={styles.label}>{label}</figcaption>}
      <canvas ref={canvasRef} width={size} height={size} className={styles.canvas} role="img" aria-label={`Código QR: ${value}`} />
      {showValue && <figcaption className={styles.value}>{value}</figcaption>}
    </figure>
  );
}
