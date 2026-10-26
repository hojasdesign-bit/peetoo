import React from 'react';
import styles from './SwapPair.module.css';
import { cn } from '../../utils.js';

/**
 * SwapPair — el bloque de INTERCAMBIO de la SwapCard, como
 * subcomponente reutilizable: campo «Usted paga» (monto editable de
 * 28px + píldora de moneda) y campo «Usted recibe» (monto calculado
 * de 18px + píldora), SOLAPADOS como en el widget de referencia
 * (el segundo pasa por detrás, −24px), con la fila de montos rápidos
 * opcional. Sin método de pago ni CTA: eso es la SwapCard completa.
 *
 * Con `onFlip` aparece un botón circular de intercambio sobre la
 * costura entre campos (el widget original no lo trae: es opt-in).
 */
export function SwapPair({
  payLabel = 'Usted paga',
  receiveLabel = 'Usted recibe',
  payAmount = '100',
  receiveAmount = '0.0042',
  onPayAmountChange,
  payCurrency = { code: 'USD', symbol: '$', color: '#3b82f6' },
  receiveCurrency = { code: 'BTC', symbol: '₿', color: '#f7931a' },
  onPayCurrencyClick,
  onReceiveCurrencyClick,
  onFlip,
  quickAmounts = [100, 200, 500, 1000],
  activeQuick = null,
  onQuickSelect,
  className = '',
  ...rest
}) {
  return (
    <div className={cn(styles.root, className)} {...rest}>
      {/* ---- Usted paga ---- */}
      <div className={cn(styles.field, styles.fieldPay)}>
        <span className={styles.label}>{payLabel}</span>
        <div className={styles.fieldRow}>
          <input
            className={styles.amount}
            value={payAmount}
            onChange={onPayAmountChange}
            inputMode="decimal"
            aria-label={payLabel}
            placeholder="0"
          />
          <CurrencyPill currency={payCurrency} onClick={onPayCurrencyClick} label={`Moneda de pago: ${payCurrency.code}`} />
        </div>
      </div>

      {/* ---- Botón de intercambio (opt-in) ---- */}
      {onFlip && (
        <button type="button" className={styles.flipBtn} onClick={onFlip} aria-label="Intercambiar monedas">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M7 4v13M7 4 4 7M7 4l3 3M17 20V7M17 20l3-3M17 20l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {/* ---- Usted recibe (solapa por detrás del campo anterior) ---- */}
      <div className={cn(styles.field, styles.fieldReceive)}>
        <span className={styles.label}>{receiveLabel}</span>
        <div className={styles.fieldRow}>
          <div className={styles.amountStatic} aria-live="polite" aria-label={receiveLabel}>
            {receiveAmount}
          </div>
          <CurrencyPill currency={receiveCurrency} onClick={onReceiveCurrencyClick} label={`Moneda a recibir: ${receiveCurrency.code}`} />
        </div>
      </div>

      {/* ---- Montos rápidos ---- */}
      {quickAmounts.length > 0 && (
        <div className={styles.quicks} role="group" aria-label="Montos rápidos">
          {quickAmounts.map((amount) => (
            <button
              key={amount}
              type="button"
              className={cn(styles.chip, activeQuick === amount && styles.chipActive)}
              onClick={() => onQuickSelect?.(amount)}
              aria-pressed={activeQuick === amount}
            >
              {formatQuick(amount)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function CurrencyPill({ currency, onClick, label }) {
  return (
    <button type="button" className={styles.pill} onClick={onClick} aria-label={label}>
      <span className={styles.coin} style={{ backgroundColor: currency.color }} aria-hidden="true">
        {currency.symbol}
      </span>
      <span>{currency.code}</span>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

function formatQuick(amount) {
  return amount >= 1000 ? `$${amount / 1000}k` : `$${amount}`;
}
