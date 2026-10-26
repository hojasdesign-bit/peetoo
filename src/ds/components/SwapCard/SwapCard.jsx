import React from 'react';
import styles from './SwapCard.module.css';
import { cn } from '../../utils.js';

/**
 * SwapCard — widget de compra de crypto (400×482, autocontenido).
 * Réplica del widget de referencia con valores medidos en vivo:
 * cabecera opcional (marca + menú), campos "Usted paga" / "Usted recibe"
 * SOLAPADOS (el segundo pasa por detrás, -24px), chips de montos,
 * fila "Pagar con" con insignia popular sobre la esquina y CTA sólido.
 */
export function SwapCard({
  brandLabel = null,
  onMenuClick,
  payLabel = 'Usted paga',
  receiveLabel = 'Usted recibe',
  payAmount = '100',
  receiveAmount = '0.0042',
  onPayAmountChange,
  payCurrency = { code: 'USD', symbol: '$', color: '#3b82f6' },
  receiveCurrency = { code: 'BTC', symbol: '₿', color: '#f7931a' },
  onPayCurrencyClick,
  onReceiveCurrencyClick,
  quickAmounts = [100, 200, 500, 1000],
  activeQuick = null,
  onQuickSelect,
  paymentMethod = { name: 'Card', fee: '1.75% Comisión', badge: 'Más popular' },
  onPaymentMethodClick,
  ctaLabel = 'Comprar BTC vía Card',
  ctaVariant = 'primary',
  onSubmit,
  footnote,
  className = '',
  ...rest
}) {
  return (
    <article className={cn(styles.card, className)} {...rest}>
      {/* ---- Cabecera (opcional) ---- */}
      {brandLabel && (
        <div className={styles.head}>
          <span className={styles.brand}>{brandLabel}</span>
          <button type="button" className={styles.menuBtn} onClick={onMenuClick} aria-label="Menú">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}

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

      {/* ---- Pagar con ---- */}
      <div className={styles.payWrap}>
        <span className={styles.payMethodLabel}>Pagar con</span>
        {paymentMethod.badge && (
          <span className={styles.pmBadge} aria-hidden="true">
            {'✦'} {paymentMethod.badge}
          </span>
        )}
        <button type="button" className={styles.payMethod} onClick={onPaymentMethodClick} aria-label="Seleccionar método de pago">
          <span className={styles.pmIcon} aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect x="2.5" y="5" width="19" height="14" rx="3" stroke="currentColor" strokeWidth="1.8" />
              <path d="M2.5 10h19" stroke="currentColor" strokeWidth="1.8" />
            </svg>
          </span>
          <span className={styles.pmName}>{paymentMethod.name}</span>
          <span className={styles.pmRight}>
            {paymentMethod.fee && <span className={styles.pmFee}>{paymentMethod.fee}</span>}
            <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>
      </div>

      {/* ---- CTA ---- */}
      <button
        type="button"
        className={cn(styles.cta, styles[ctaVariant === 'dark' ? 'ctaDark' : 'ctaPrimary'])}
        onClick={onSubmit}
      >
        {ctaLabel}
      </button>

      {footnote && <p className={styles.footnote}>{footnote}</p>}
    </article>
  );
}

/** Píldora de moneda: transparente, borde, icono 14px, código y chevron. */
function CurrencyPill({ currency, onClick, label }) {
  return (
    <button type="button" className={styles.pill} onClick={onClick} aria-label={label}>
      <span className={styles.coin} style={{ backgroundColor: currency.color }} aria-hidden="true">
        {currency.symbol}
      </span>
      <span>{currency.code}</span>
      <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

/** 1000 → "$1k", 250 → "$250". */
function formatQuick(amount) {
  return amount >= 1000 ? `$${amount / 1000}k` : `$${amount}`;
}
