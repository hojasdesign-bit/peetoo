import React from 'react';
import {
  QVAPAY_METHODS,
  QVAPAY_SAVED_CONTACTS,
  QVAPAY_PROVINCES,
  qvapayMunicipalities,
  qvapayZone,
  cashZoneCharge,
  cashReceive,
  cashBrutoFor,
  fmtUsd,
} from '../data/qvapay.js';

// Widget de retiro con QvaPay en 3 pasos dentro de la tarjeta
// (1 Monto, 2 Destinatario, 3 Confirmar), con los estilos del widget
// del clon de Swapped. El destinatario es un contacto guardado (sus
// datos se gestionan fuera, en QvaPay) u otra persona, cuyo formulario
// vive solo en su paso. Demo: no llama a la API de QvaPay ni envía
// ningún retiro real; los importes de efectivo sí se calculan con la
// fórmula y el tarifario reales de la documentación.
const QUICK_AMOUNTS = [100, 200, 500, 1000];
const STEPS = ['Monto', 'Destinatario', 'Confirmar'];
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

// Dato clave del destinatario para la tarjeta resumen: la zona en
// efectivo, los últimos 4 de la tarjeta, el correo/celular de Zelle
// o la wallet. Nunca el carnet ni la tarjeta completa.
function keyLineFor(tick, d) {
  if (tick === 'USDCASH') {
    const z = qvapayZone(d['Provincia'], d['Municipio']);
    const place = [d['Municipio'], d['Provincia']].filter(Boolean).join(', ');
    return z ? `${place} · ${z.etaMin}–${z.etaMax} h` : place;
  }
  if (d['Nro de tarjeta']) return `Tarjeta ···· ${digits(d['Nro de tarjeta']).slice(-4)}`;
  if (d['Correo o Celular']) return d['Correo o Celular'];
  if (d['Wallet']) return `Wallet ···· ${String(d['Wallet']).slice(-6)}`;
  return '';
}

// Destinatario por defecto de un método: el contacto guardado más
// reciente de la sesión, si no el primero de la lista demo; si el
// método no tiene contactos guardados, formulario vacío ("otra persona").
function defaultRecipient(tick, extras) {
  const saved = [...QVAPAY_SAVED_CONTACTS, ...extras].filter((c) => c.tick === tick);
  const recent = [...extras].reverse().find((c) => c.tick === tick);
  const pick = recent || saved[0];
  return pick
    ? { mode: 'saved', details: { ...pick.details }, applied: pick.name }
    : { mode: 'new', details: {}, applied: null };
}

export default function QvapayWidget({ variant }) {
  const isCash = variant === 'cash';
  const cashMethod = QVAPAY_METHODS[0];
  const initialTick = isCash ? 'USDCASH' : 'BANK_CUP';
  const [methodTick, setMethodTick] = React.useState(initialTick);
  const method = QVAPAY_METHODS.find((m) => m.tick === methodTick) || cashMethod;
  // En efectivo el monto es lo que se ENTREGA (múltiplo de 5); en general
  // es el bruto que se debita del saldo.
  const [amountText, setAmountText] = React.useState(isCash ? '200' : '100');
  const [step, setStep] = React.useState(1);
  const [done, setDone] = React.useState(false);
  const [methodOpen, setMethodOpen] = React.useState(false);
  const methodRef = React.useRef(null);

  // El desplegable del método se cierra al hacer clic fuera o con Escape.
  React.useEffect(() => {
    if (!methodOpen) return;
    const onPointerDown = (e) => {
      if (methodRef.current && !methodRef.current.contains(e.target)) setMethodOpen(false);
    };
    const onKeyDown = (e) => { if (e.key === 'Escape') setMethodOpen(false); };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [methodOpen]);
  const [extraContacts, setExtraContacts] = React.useState([]);
  const [saveContact, setSaveContact] = React.useState(false);
  const initialRecipient = defaultRecipient(initialTick, []);
  const [details, setDetails] = React.useState(initialRecipient.details);
  const [appliedContact, setAppliedContact] = React.useState(initialRecipient.applied);
  const [recipientMode, setRecipientMode] = React.useState(initialRecipient.mode);
  const savedForMethod = [...QVAPAY_SAVED_CONTACTS, ...extraContacts].filter((c) => c.tick === method.tick);
  const applied = savedForMethod.find((c) => c.name === appliedContact) || null;

  const province = details['Provincia'] || '';
  const municipality = details['Municipio'] || '';
  const zone = isCash || method.tick === 'USDCASH' ? qvapayZone(province, municipality) : null;

  const amountNum = parseFloat(String(amountText).replace(',', '.')) || 0;
  // Efectivo: el objetivo es lo que se entrega, en múltiplos de 5.
  const cashTarget = isCash ? Math.floor(amountNum / 5) * 5 : 0;
  const cashBruto = isCash && zone ? cashBrutoFor(cashTarget, zone) : 0;
  const cashCharge = isCash && zone ? cashZoneCharge(cashBruto, zone) : 0;
  // General: el bruto es el monto; lo que se recibe es el monto menos la
  // comisión (en efectivo, la fórmula real; en el resto, la comisión
  // exacta la confirma QvaPay al crear el retiro).
  const generalReceive = !isCash && method.tick === 'USDCASH' && zone
    ? cashReceive(amountNum, zone)
    : amountNum;

  const fieldsValid = method.fields.every((f) => fieldOk(f, details[f.key]));
  // En efectivo la zona la aporta el destinatario (paso 2), así que el
  // débito exacto solo existe a partir de ahí.
  const cashZoneOk = !!zone && cashTarget >= zone.min && cashBruto >= cashMethod.min;
  const cashValid = isCash && cashTarget >= 5 && cashZoneOk && fieldsValid;
  const generalValid = !isCash && amountNum >= method.min && fieldsValid;
  const valid = isCash ? cashValid : generalValid;
  const step1Valid = isCash ? cashTarget >= 5 : amountNum >= method.min;
  const step2Valid = recipientMode === 'saved'
    ? !!applied && (isCash ? cashZoneOk : true)
    : fieldsValid && (isCash ? cashZoneOk : true);
  const ctaAmount = isCash ? cashBruto : amountNum;
  const recipientName = recipientMode === 'saved' ? applied?.name : details['Nombre y Apellidos'];
  const recipientKey = recipientMode === 'saved' && applied
    ? keyLineFor(applied.tick, applied.details)
    : keyLineFor(method.tick, details);

  const setDetail = (key, value) => {
    setAppliedContact(null);
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

  const applyRecipient = (tick, extras) => {
    const r = defaultRecipient(tick, extras);
    setDetails(r.details);
    setAppliedContact(r.applied);
    setRecipientMode(r.mode);
  };

  const switchMethod = (tick) => {
    setMethodTick(tick);
    applyRecipient(tick, extraContacts);
    setMethodOpen(false);
  };

  // Elegir un contacto guardado usa sus datos tal cual, sin formulario.
  const applyContact = (contact) => {
    setDetails({ ...contact.details });
    setAppliedContact(contact.name);
    setRecipientMode('saved');
  };

  const chooseOtherPerson = () => {
    if (recipientMode === 'new') return;
    setDetails({});
    setAppliedContact(null);
    setRecipientMode('new');
  };

  const confirmWithdrawal = () => {
    if (recipientMode === 'new' && saveContact && details['Nombre y Apellidos']) {
      const exists = [...QVAPAY_SAVED_CONTACTS, ...extraContacts].some(
        (c) => c.tick === method.tick && c.name === details['Nombre y Apellidos'],
      );
      if (!exists) {
        setExtraContacts((list) => [...list, { name: details['Nombre y Apellidos'], tick: method.tick, details: { ...details } }]);
      }
    }
    setDone(true);
  };

  const reset = () => {
    setDone(false);
    setStep(1);
    setSaveContact(false);
    applyRecipient(methodTick, extraContacts);
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

      {/* Pasos: solo se puede volver a un paso ya completado. */}
      <div className="qv-steps" role="group" aria-label="Pasos del retiro">
        {STEPS.map((label, i) => {
          const n = i + 1;
          const state = n < step ? 'done' : n === step ? 'active' : '';
          return (
            <button key={label} type="button" className={`qv-step ${state}`} disabled={n >= step} onClick={() => setStep(n)} aria-current={n === step ? 'step' : undefined}>
              <span className="qv-step-dot" aria-hidden="true">{n < step ? '✓' : n}</span>
              <span className="qv-step-label">{label}</span>
            </button>
          );
        })}
      </div>

      {step === 1 && (
        <>
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
                {isCash ? (zone ? `$${fmtUsd(cashBruto)}` : '—') : `$${fmtUsd(generalReceive)}`}
              </span>
              <span className="qv-pill">USD</span>
            </div>
          </div>
          {isCash && !zone && <p className="qv-field-hint">El débito exacto se calcula con la zona del destinatario.</p>}

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
            <div className="qv-paywith" ref={methodRef}>
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

          <button type="button" className="qv-cta qv-step-cta" disabled={!step1Valid} onClick={() => setStep(2)}>Continuar</button>
        </>
      )}

      {step === 2 && (
        <>
          {/* Destinatario: contacto guardado u otra persona. */}
          <div>
            <span className="qv-saved-label">Destinatario</span>
            {savedForMethod.length > 0 ? (
              <>
                <div className="qv-saved-list">
                  {savedForMethod.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      className={`qv-contact-row${appliedContact === c.name ? ' is-selected' : ''}`}
                      onClick={() => applyContact(c)}
                      aria-pressed={appliedContact === c.name}
                    >
                      <span className="qv-saved-avatar" aria-hidden="true">{c.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}</span>
                      <span className="qv-contact-info">
                        <span className="qv-contact-name">{c.name}</span>
                        <span className="qv-contact-key">{keyLineFor(c.tick, c.details)}</span>
                      </span>
                      {appliedContact === c.name && <span className="qv-saved-check" aria-hidden="true">✓</span>}
                    </button>
                  ))}
                  <button
                    type="button"
                    className={`qv-other${recipientMode === 'new' ? ' is-selected' : ''}`}
                    onClick={chooseOtherPerson}
                  >
                    <span className="qv-other-plus" aria-hidden="true">+</span> Otra persona
                  </button>
                </div>
                {recipientMode === 'saved' && <p className="qv-saved-note">Datos gestionados en QvaPay · no se editan aquí.</p>}
              </>
            ) : (
              <p className="qv-saved-note">Sin contactos guardados para este método.</p>
            )}
          </div>

          {/* Otra persona: el formulario del método, solo en su paso. */}
          {recipientMode === 'new' && (
            <>
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
              <label className="qv-save-check">
                <input type="checkbox" checked={saveContact} onChange={(e) => setSaveContact(e.target.checked)} />
                Guardar este contacto para la próxima vez
              </label>
            </>
          )}

          {isCash && zone && !cashZoneOk && (
            <p className="qv-step-warn">
              {cashTarget < zone.min
                ? `Mínimo en ${municipality}: $${fmtUsd(zone.min)}.`
                : 'El débito mínimo es $50.'}
            </p>
          )}

          <div className="qv-step-actions">
            <button type="button" className="qv-back" onClick={() => setStep(1)}>Atrás</button>
            <button type="button" className="qv-cta" disabled={!step2Valid} onClick={() => setStep(3)}>Continuar</button>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          {/* Confirmar: resumen de todo antes de retirar. */}
          <dl className="qv-summary qv-summary-confirm">
            <div className="qv-summary-row"><dt>{isCash ? 'Recibes en efectivo' : 'Retiras'}</dt><dd>${fmtUsd(isCash ? cashTarget : amountNum)}</dd></div>
            <div className="qv-summary-row"><dt>{isCash ? 'Se debita de tu saldo' : 'Recibes (estimado)'}</dt><dd>${fmtUsd(isCash ? cashBruto : generalReceive)}</dd></div>
            <div className="qv-summary-row"><dt>Retirar con</dt><dd>{method.label} · {method.tick}</dd></div>
            <div className="qv-summary-row"><dt>Destinatario</dt><dd className="qv-summary-recipient"><span>{recipientName}</span>{recipientKey && <span className="qv-summary-key">{recipientKey}</span>}</dd></div>
            {isCash && zone && (
              <>
                <div className="qv-summary-row"><dt>Cargo de la zona</dt><dd>${fmtUsd(cashCharge)}</dd></div>
                <div className="qv-summary-row"><dt>Entrega estimada</dt><dd>{zone.etaMin}–{zone.etaMax} h</dd></div>
              </>
            )}
            {!isCash && (
              <>
                <div className="qv-summary-row"><dt>Mínimo</dt><dd>${fmtUsd(method.min)}</dd></div>
                <div className="qv-summary-row"><dt>Comisión</dt><dd>{method.feeNote}</dd></div>
              </>
            )}
          </dl>
          <div className="qv-step-actions">
            <button type="button" className="qv-back" onClick={() => setStep(2)}>Atrás</button>
            <button type="button" className="qv-cta" disabled={!valid} onClick={confirmWithdrawal}>
              {isCash ? `Retirar $${fmtUsd(ctaAmount)} en efectivo` : `Retirar $${fmtUsd(ctaAmount)}`}
            </button>
          </div>
          <p className="qv-demo-note">Simulación: no se envía ningún retiro real a QvaPay.</p>
        </>
      )}
    </section>
  );
}
