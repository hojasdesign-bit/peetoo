import React from 'react';
import {
  QVAPAY_METHODS,
  QVAPAY_PROVINCES,
  qvapayMunicipalities,
  qvapayZone,
  cashZoneCharge,
  cashReceive,
  cashBrutoFor,
  fmtUsd,
} from '../data/qvapay.js';

// Widget de retiro con QvaPay, con los estilos del widget del clon de
// Swapped (tarjeta radio 28, campos superpuestos, píldoras, montos
// rápidos, CTA violeta). Demo: no llama a la API de QvaPay ni envía
// ningún retiro real; los importes de efectivo sí se calculan con la
// fórmula y el tarifario reales de la documentación.
const QUICK_AMOUNTS = [100, 200, 500, 1000];
const digits = (s) => String(s ?? '').replace(/\D/g, '');

function fieldOk(field, value) {
  const v = String(value ?? '').trim();
  if (!v) return false;
  if (field.key === 'Carnet de Identidad') return digits(v).length === 11;
  if (field.key === 'Nro de tarjeta') return digits(v).length === 16;
  if (field.key === 'Nro de Ruta o ACH') return digits(v).length === 9;
  if (field.type === 'phone') return digits(v).length >= 8;
  return true;
}

export default function QvapayWidget({ variant }) {
  const isCash = variant === 'cash';
  const cashMethod = QVAPAY_METHODS[0];
  const [methodTick, setMethodTick] = React.useState(isCash ? 'USDCASH' : 'BANK_CUP');
  const method = QVAPAY_METHODS.find((m) => m.tick === methodTick) || cashMethod;
  // En efectivo el monto es lo que se ENTREGA (múltiplo de 5); en general
  // es el bruto que se debita del saldo.
  const [amountText, setAmountText] = React.useState(isCash ? '200' : '100');
  const [details, setDetails] = React.useState({});
  const [methodOpen, setMethodOpen] = React.useState(false);
  const [done, setDone] = React.useState(false);

  const province = details['Provincia'] || '';
  const municipality = details['Municipio'] || '';
  const zone = isCash || method.tick === 'USDCASH' ? qvapayZone(province, municipality) : null;

  const amountNum = parseFloat(String(amountText).replace(',', '.')) || 0;
  // Efectivo: el objetivo es lo que se entrega, en múltiplos de 5.
  const cashTarget = isCash ? Math.floor(amountNum / 5) * 5 : 0;
  const cashBruto = isCash && zone ? cashBrutoFor(cashTarget, zone) : 0;
  const cashCharge = isCash && zone ? cashZoneCharge(cashBruto, zone) : 0;
  const cashReceiveShown = isCash && zone ? cashReceive(cashBruto, zone) : 0;
  // General: el bruto es el monto; lo que se recibe es el monto menos la
  // comisión (en efectivo, la fórmula real; en el resto, la comisión
  // exacta la confirma QvaPay al crear el retiro).
  const generalReceive = !isCash && method.tick === 'USDCASH' && zone
    ? cashReceive(amountNum, zone)
    : amountNum;

  const fieldsValid = method.fields.every((f) => fieldOk(f, details[f.key]));
  const cashValid = isCash
    && !!zone
    && cashTarget >= 5
    && cashBruto >= cashMethod.min
    && cashTarget >= zone.min
    && fieldsValid;
  const generalValid = !isCash && amountNum >= method.min && fieldsValid;
  const valid = isCash ? cashValid : generalValid;
  const ctaAmount = isCash ? cashBruto : amountNum;

  const setDetail = (key, value) => {
    setDetails((d) => {
      const next = { ...d, [key]: value };
      // Cambiar de provincia vacía el municipio (cada provincia tiene
      // sus propios municipios en el tarifario).
      if (key === 'Provincia') next['Municipio'] = '';
      return next;
    });
  };

  const onAmountChange = (e) => {
    const v = e.target.value.replace(/[^0-9.,]/g, '').replace(',', '.');
    const parts = v.split('.');
    setAmountText(parts.length > 2 ? `${parts[0]}.${parts.slice(1).join('')}` : v);
  };

  const snapCashAmount = () => {
    if (!isCash) return;
    const n = parseFloat(String(amountText).replace(',', '.')) || 0;
    setAmountText(String(Math.max(0, Math.floor(n / 5) * 5)));
  };

  const switchMethod = (tick) => {
    setMethodTick(tick);
    setDetails({});
    setMethodOpen(false);
  };

  const reset = () => {
    setDetails({});
    setDone(false);
  };

  if (done) {
    return (
      <section className="qv-widget" aria-label="Retiro simulado">
        <div className="qv-widget-head">
          <span className="qv-widget-brand">Retiro con QvaPay</span>
          <span className="qv-demo">Demo</span>
        </div>
        <div className="qv-done">
          <span className="qv-done-check" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <h3 className="qv-done-title">Retiro simulado</h3>
          <p className="qv-done-text">
            {isCash
              ? `Se entregarían $${fmtUsd(cashTarget)} en efectivo a ${details['Nombre y Apellidos'] || 'el beneficiario'} en ${municipality}, ${province}.`
              : `Se retirarían $${fmtUsd(amountNum)} por ${method.label}.`}
          </p>
          <dl className="qv-summary">
            <div className="qv-summary-row"><dt>{isCash ? 'Se debita de tu saldo' : 'Monto'}</dt><dd>${fmtUsd(ctaAmount)}</dd></div>
            {isCash && (
              <>
                <div className="qv-summary-row"><dt>Cargo de la zona</dt><dd>${fmtUsd(cashCharge)}</dd></div>
                <div className="qv-summary-row"><dt>Entrega estimada</dt><dd>{zone ? `${zone.etaMin}–${zone.etaMax} h` : '—'}</dd></div>
              </>
            )}
          </dl>
          <p className="qv-demo-note">Simulación: no se envió ningún retiro real a QvaPay.</p>
          <button type="button" className="qv-cta" onClick={reset}>Hacer otro retiro</button>
        </div>
      </section>
    );
  }

  return (
    <section className="qv-widget" aria-label="Widget de retiro con QvaPay">
      <div className="qv-widget-head">
        <span className="qv-widget-brand">Retiro con QvaPay</span>
        <span className="qv-demo">Demo</span>
      </div>

      {/* Monto: en efectivo, lo que se entrega; en general, lo que se retira. */}
      <div className="qv-field">
        <span className="qv-field-label">{isCash ? 'Recibes en efectivo' : 'Retiras'}</span>
        <div className="qv-field-row">
          <input
            className="qv-amount"
            type="text"
            inputMode="decimal"
            aria-label={isCash ? 'Monto a entregar en efectivo' : 'Monto a retirar'}
            value={amountText}
            onChange={onAmountChange}
            onBlur={snapCashAmount}
            placeholder="0,00"
          />
          <span className="qv-pill">USD</span>
        </div>
      </div>
      {isCash && <p className="qv-field-hint">En billetes: múltiplos de $5, mínimo $50.</p>}

      {/* Segundo campo, superpuesto como en el clon: lo que se debita. */}
      <div className="qv-field qv-receive-field">
        <span className="qv-field-label">{isCash ? 'Se debita de tu saldo' : 'Recibes (estimado)'}</span>
        <div className="qv-field-row">
          <span className="qv-amount qv-amount-receive">
            ${fmtUsd(isCash ? cashBruto : generalReceive)}
          </span>
          <span className="qv-pill">USD</span>
        </div>
      </div>

      <div className="qv-quick-row" role="group" aria-label="Montos rápidos">
        {QUICK_AMOUNTS.map((q) => (
          <button
            key={q}
            type="button"
            className={`qv-quick${amountNum === q ? ' active' : ''}`}
            onClick={() => setAmountText(String(q))}
          >
            ${q >= 1000 ? '1k' : q}
          </button>
        ))}
      </div>

      {/* Método: fijo en efectivo, desplegable en la versión general. */}
      {isCash ? (
        <div className="qv-paywith">
          <div className="qv-paywith-label-row"><span className="qv-field-label">Retirar con</span></div>
          <div className="qv-paywith-row">
            <span className="qv-method">Efectivo en Cuba · USDCASH</span>
            <span className="qv-fee">Mín. $50</span>
          </div>
        </div>
      ) : (
        <div className="qv-paywith">
          <div className="qv-paywith-label-row"><span className="qv-field-label">Retirar con</span></div>
          <button type="button" className="qv-paywith-row" aria-expanded={methodOpen} onClick={() => setMethodOpen((o) => !o)}>
            <span className="qv-method">{method.label} · {method.tick}</span>
            <span className="qv-fee">Mín. ${method.min}<span className="qv-chev" aria-hidden="true" /></span>
          </button>
          <div className={`qv-method-options${methodOpen ? ' open' : ''}`}>
            <div className="qv-method-options-inner">
              {QVAPAY_METHODS.map((m) => (
                <button
                  key={m.tick}
                  type="button"
                  className={`qv-method-option${m.tick === method.tick ? ' is-selected' : ''}`}
                  onClick={() => switchMethod(m.tick)}
                >
                  <span>{m.label}</span>
                  <span className="qv-method-min">Mín. ${m.min}</span>
                  {m.tick === method.tick && <span className="qv-method-check" aria-hidden="true">✓</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Formulario del método: las claves exactas del working_data. */}
      <div className="qv-details">
        {method.fields.map((f) => {
          const value = details[f.key] || '';
          if (f.type === 'select-province') {
            return (
              <label className="qv-detail-field" key={f.key}>
                <span className="qv-detail-label">{f.key}</span>
                <select
                  className="qv-select"
                  aria-label={f.key}
                  value={value}
                  onChange={(e) => setDetail(f.key, e.target.value)}
                >
                  <option value="">{f.placeholder}</option>
                  {QVAPAY_PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </label>
            );
          }
          if (f.type === 'select-municipality') {
            const options = province ? qvapayMunicipalities(province) : [];
            return (
              <label className="qv-detail-field" key={f.key}>
                <span className="qv-detail-label">{f.key}</span>
                <select
                  className="qv-select"
                  aria-label={f.key}
                  value={value}
                  disabled={!province}
                  onChange={(e) => setDetail(f.key, e.target.value)}
                >
                  <option value="">{province ? f.placeholder : 'Primero elige la provincia'}</option>
                  {options.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
              </label>
            );
          }
          return (
            <label className="qv-detail-field" key={f.key}>
              <span className="qv-detail-label">{f.key}{f.hint ? <span className="qv-detail-hint"> · {f.hint}</span> : ''}</span>
              <input
                className="qv-input"
                type="text"
                inputMode={f.type === 'number' ? 'numeric' : f.type === 'phone' ? 'tel' : 'text'}
                aria-label={f.key}
                value={value}
                placeholder={f.placeholder}
                onChange={(e) => setDetail(f.key, f.type === 'number' ? digits(e.target.value) : e.target.value)}
              />
            </label>
          );
        })}
      </div>

      {/* Resumen: comisión y plazo. */}
      <dl className="qv-summary">
        {isCash && zone && (
          <>
            <div className="qv-summary-row"><dt>Cargo de la zona</dt><dd>${fmtUsd(cashCharge)}</dd></div>
            <div className="qv-summary-row"><dt>Entrega estimada</dt><dd>{zone.etaMin}–{zone.etaMax} h</dd></div>
            <div className="qv-summary-row"><dt>Mínimo de la zona</dt><dd>${fmtUsd(zone.min)}</dd></div>
          </>
        )}
        {isCash && !zone && (
          <div className="qv-summary-row"><dt>Zona</dt><dd>Elige provincia y municipio</dd></div>
        )}
        {!isCash && (
          <>
            <div className="qv-summary-row"><dt>Mínimo</dt><dd>${fmtUsd(method.min)}</dd></div>
            <div className="qv-summary-row"><dt>Comisión</dt><dd>{method.feeNote}</dd></div>
          </>
        )}
      </dl>

      <button type="button" className="qv-cta" disabled={!valid} onClick={() => setDone(true)}>
        {isCash ? `Retirar $${fmtUsd(ctaAmount)} en efectivo` : `Retirar $${fmtUsd(ctaAmount)}`}
      </button>
      <p className="qv-demo-note">Simulación: no se envía ningún retiro real a QvaPay.</p>
    </section>
  );
}
