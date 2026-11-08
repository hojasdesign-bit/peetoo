import React from 'react';
import { SwappedMethodIcon } from './SwappedMethodIcon.jsx';
import { usdPng, cupPng } from '../assets/coins/fiat-images.js';
import zelleIcon from '../assets/coins/zelle.svg';
import usdtIcon from '../assets/coins/usdt.svg';
import usdcIcon from '../assets/coins/usdc.svg';
import usatIcon from '../assets/coins/usat.svg';
import pyusdIcon from '../assets/coins/pyusd.svg';
import ousdIcon from '../assets/coins/ousd.svg';
import { usdgPng } from '../assets/coins/usdg.js';
import cuFlag from '../assets/flags/cu.svg';
import usFlag from '../assets/flags/us.svg';
import bscIcon from '../assets/chains/bsc.svg';
import ethIcon from '../assets/chains/eth.svg';
import polIcon from '../assets/chains/pol.svg';
import arbIcon from '../assets/chains/arbitrum.svg';
import baseIcon from '../assets/chains/base.svg';
import hypeIcon from '../assets/chains/hype.svg';
import arcIcon from '../assets/chains/arc.svg';
import hoodIcon from '../assets/chains/hood.svg';
import {
  QVAPAY_COUNTRIES,
  QVAPAY_PAY_CHAINS,
  QVAPAY_PAY_CRYPTOS,
  QVAPAY_RECEIVE_FIATS,
  QVAPAY_CUP_RATE,
  QVAPAY_METHODS,
  QVAPAY_SAVED_CONTACTS,
  QVAPAY_PROVINCES,
  qvapayMunicipalities,
  qvapayZone,
  qvapayZoneFeePct,
  coinFee,
  cashZoneCharge,
  fmtUsd,
} from '../data/qvapay.js';

// Widget de retiro con QvaPay en pasos dentro de la tarjeta (Monto,
// Destinatario, Confirmar), sin indicador de pasos arriba, con los
// estilos del widget del clon de Swapped. El método se elige en un
// panel completo sobre el widget (con buscador y saeta para cerrarlo),
// como la selección de método de pago del widget original. El
// destinatario es un contacto guardado (sus datos se gestionan fuera,
// en QvaPay) u otra persona, cuyo formulario vive solo en su paso.
// Una sola versión: el retiro general (el monto es el bruto que se
// debita del saldo). Demo: no llama a la API de QvaPay ni envía ningún
// retiro real; en efectivo, la estimación sí usa la fórmula y el
// tarifario reales de la documentación.
const QUICK_AMOUNTS = [100, 200, 500, 1000];

// Icono por método: las imágenes que usamos en la columna Das/Recibes
// (foto CUP para el efectivo, logo de Zelle para Zelle, foto USD para
// las transferencias). Las tarjetas aún no tienen icono: quedan con el
// glifo genérico hasta que se creen.
const METHOD_ICON = {
  USDCASH: usdPng,
  ZELLE: zelleIcon,
  BANK: usdPng,
  BANK_INTL: usdPng,
};

// Bandera circular por país (selector del panel de métodos).
const COUNTRY_FLAG = { CU: cuFlag, US: usFlag };

// Logos de las cryptos con las que se paga y fotos de las fiats que se reciben.
const PAY_CRYPTO_ICON = { USDT: usdtIcon, USDC: usdcIcon, USAT: usatIcon, PYUSD: pyusdIcon, ZLUSD: zelleIcon, OUSD: ousdIcon, USDG: usdgPng };
// Logo por cadena (selector de cadena del panel «Pagar con»).
const CHAIN_ICON = { BSC: bscIcon, ETH: ethIcon, POL: polIcon, ARB: arbIcon, BASE: baseIcon, HYPE: hypeIcon, ARC: arcIcon, HOOD: hoodIcon };
const RECEIVE_FIAT_ICON = { USD: usdPng, CUP: cupPng };

// Glifo genérico de reserva para los métodos sin icono propio.
const METHOD_GLYPH = {
  BANK_CUP: 'Card',
  BANK_MLC: 'Card',
  CLASICA: 'Card',
  TROPICAL: 'Card',
};
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

// Dato clave del destinatario para la fila del listado: la zona en
// efectivo, los últimos 4 de la tarjeta o el correo/celular de Zelle.
// Nunca el carnet ni la tarjeta completa.
function keyLineFor(tick, d) {
  if (tick === 'USDCASH') {
    const z = qvapayZone(d['Provincia'], d['Municipio']);
    const place = [d['Municipio'], d['Provincia']].filter(Boolean).join(', ');
    return z ? `${place} · ${z.etaMin}–${z.etaMax} h` : place;
  }
  if (d['Nro de tarjeta']) return `Tarjeta ···· ${digits(d['Nro de tarjeta']).slice(-4)}`;
  if (d['Correo o Celular']) return d['Correo o Celular'];
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

export default function QvapayWidget({ variant = 'list' }) {
  const [methodTick, setMethodTick] = React.useState('USDCASH');
  const method = QVAPAY_METHODS.find((m) => m.tick === methodTick) || QVAPAY_METHODS.find((m) => m.tick === 'USDCASH');
  const [amountText, setAmountText] = React.useState('100');
  const [step, setStep] = React.useState(1);
  const [done, setDone] = React.useState(false);
  const [methodOverlay, setMethodOverlay] = React.useState(false);
  // País del panel de métodos: Cuba sale por defecto; Estados Unidos
  // agrupa Zelle, transferencia en EE. UU. y SWIFT.
  const [methodCountry, setMethodCountry] = React.useState('CU');
  const [countryOverlay, setCountryOverlay] = React.useState(false);
  // Pagar con crypto (stablecoin en USD, 1:1) y recibir en fiat (USD o CUP).
  const [payCrypto, setPayCrypto] = React.useState('USDT');
  const [receiveFiat, setReceiveFiat] = React.useState('USD');
  // Cadena con la que se paga: BNB Chain por defecto (la que más se usa
  // en Cuba); su selección es una píldora en el panel «Pagar con», como
  // la del país en el panel de métodos.
  const [payChain, setPayChain] = React.useState('BSC');
  const [chainOverlay, setChainOverlay] = React.useState(false);
  const [cryptoOverlay, setCryptoOverlay] = React.useState(false);
  const [fiatOverlay, setFiatOverlay] = React.useState(false);
  const [recipientOverlay, setRecipientOverlay] = React.useState(false);
  const [recipientSearch, setRecipientSearch] = React.useState('');
  const [provinceOverlay, setProvinceOverlay] = React.useState(false);
  const [municipalityOverlay, setMunicipalityOverlay] = React.useState(false);
  const [methodSearch, setMethodSearch] = React.useState('');
  const [provinceSearch, setProvinceSearch] = React.useState('');
  const [municipalitySearch, setMunicipalitySearch] = React.useState('');
  const [extraContacts, setExtraContacts] = React.useState([]);
  const [saveContact, setSaveContact] = React.useState(false);
  const initialRecipient = defaultRecipient('USDCASH', []);
  const [details, setDetails] = React.useState(initialRecipient.details);
  const [appliedContact, setAppliedContact] = React.useState(initialRecipient.applied);
  const [recipientMode, setRecipientMode] = React.useState(initialRecipient.mode);
  const savedForMethod = [...QVAPAY_SAVED_CONTACTS, ...extraContacts].filter((c) => c.tick === method.tick);
  const applied = savedForMethod.find((c) => c.name === appliedContact) || null;

  const province = details['Provincia'] || '';
  // La provincia del formulario (persona nueva): con un contacto
  // guardado el formulario está vacío y no usa su provincia.
  const formProvince = recipientMode === 'saved' ? '' : province;
  const municipality = details['Municipio'] || '';
  // El municipio del formulario (persona nueva): con un contacto
  // guardado el formulario está vacío y no usa su municipio.
  const formMunicipality = recipientMode === 'saved' ? '' : municipality;
  // La zona solo existe si el método es efectivo: la aportan los datos
  // del destinatario (paso 2).
  const zone = method.tick === 'USDCASH' ? qvapayZone(province, municipality) : null;

  const amountNum = parseFloat(String(amountText).replace(',', '.')) || 0;
  // El bruto es el monto; lo que se recibe es el monto menos la
  // comisión de la moneda (fee_out o fee fijo por tramo) y, en
  // efectivo, el cargo de la zona (documentación de QvaPay).
  const coinFeeAmount = coinFee(amountNum, method);
  const zoneChargeAmount = method.tick === 'USDCASH' ? cashZoneCharge(amountNum, zone) : 0;
  const totalFee = coinFeeAmount + zoneChargeAmount;
  // Si el fee es porcentaje se muestra junto al importe; si es fijo, solo el importe.
  const feeIsPercent = !(method.feeOutFixed && amountNum <= method.feeOutFixed[0]);
  const feeLabel = totalFee > 0
    ? `$${fmtUsd(totalFee)}${feeIsPercent && method.feeOut ? ` · ${method.feeOut}%` : ''}`
    : 'Sin comisión';
  const generalReceive = method.tick === 'USDCASH' && zone
    ? Math.max(0, Math.floor((amountNum - totalFee) / 5) * 5)
    : Math.max(0, amountNum - totalFee);
  // Lo que se recibe, en la fiat elegida (CUP = USD x tasa elTOQUE).
  const receiveAmount = receiveFiat === 'CUP' ? generalReceive * QVAPAY_CUP_RATE : generalReceive;

  const fieldsValid = method.fields.every((f) => fieldOk(f, details[f.key]));
  const valid = amountNum >= method.min && fieldsValid;
  const step1Valid = amountNum >= method.min;
  const step2Valid = recipientMode === 'saved' ? !!applied : fieldsValid;
  const recipientName = recipientMode === 'saved' ? applied?.name : details['Nombre y Apellidos'];
  const recipientKey = recipientMode === 'saved' && applied
    ? keyLineFor(applied.tick, applied.details)
    : keyLineFor(method.tick, details);

  const setDetail = (key, value) => {
    // Escribir en el formulario es la otra rama: pasa a «Otra persona»
    // y empieza un destinatario nuevo (los datos del contacto guardado
    // no se editan aquí).
    if (recipientMode === 'saved') {
      setRecipientMode('new');
      setAppliedContact(null);
      setDetails(() => {
        const next = { [key]: value };
        if (key === 'Provincia') next['Municipio'] = '';
        return next;
      });
      return;
    }
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

  const applyRecipient = (tick, extras) => {
    const r = defaultRecipient(tick, extras);
    setDetails(r.details);
    setAppliedContact(r.applied);
    setRecipientMode(r.mode);
  };

  const switchMethod = (tick) => {
    setMethodTick(tick);
    applyRecipient(tick, extraContacts);
    setMethodSearch('');
    setRecipientSearch('');
    setMethodOverlay(false);
  };

  // Cambiar la fiat que se recibe ajusta el método a uno compatible:
  // CUP solo se entrega por tarjeta CUP; al volver a USD, efectivo.
  const selectReceiveFiat = (code) => {
    setReceiveFiat(code);
    setFiatOverlay(false);
    if (code === 'CUP') {
      setMethodCountry('CU');
      if (methodTick !== 'BANK_CUP') switchMethod('BANK_CUP');
    } else if (methodTick === 'BANK_CUP') {
      switchMethod('USDCASH');
    }
  };

  // Elegir cadena: filtra las cryptos a las de esa cadena; si la crypto
  // elegida no existe en ella, pasa a la primera de la cadena (USDT).
  const selectChain = (code) => {
    setPayChain(code);
    setChainOverlay(false);
    const chain = QVAPAY_PAY_CHAINS.find((c) => c.code === code);
    if (chain && !chain.cryptos.includes(payCrypto)) setPayCrypto(chain.cryptos[0]);
  };

  // Los paneles de crypto y de fiat se cierran con Escape.
  React.useEffect(() => {
    if (!cryptoOverlay && !fiatOverlay) return undefined;
    const onKeyDown = (e) => { if (e.key === 'Escape') { if (chainOverlay) setChainOverlay(false); else { setCryptoOverlay(false); setFiatOverlay(false); } } };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [cryptoOverlay, fiatOverlay, chainOverlay]);

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

  // El panel de métodos se cierra con Escape; al abrirse, el foco va al buscador.
  // En la vista de selección de país, Escape vuelve a la lista de métodos.
  const searchInputRef = React.useRef(null);
  React.useEffect(() => {
    if (!methodOverlay) return undefined;
    const onKeyDown = (e) => { if (e.key === 'Escape') { countryOverlay ? setCountryOverlay(false) : setMethodOverlay(false); } };
    document.addEventListener('keydown', onKeyDown);
    if (!countryOverlay) searchInputRef.current?.focus();
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [methodOverlay, countryOverlay]);

  // El panel del destinatario se cierra con Escape.
  React.useEffect(() => {
    if (!recipientOverlay) return undefined;
    const onKeyDown = (e) => { if (e.key === 'Escape') setRecipientOverlay(false); };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [recipientOverlay]);

  // El panel de provincias se cierra con Escape; al abrirse, el foco va al buscador.
  const provinceSearchInputRef = React.useRef(null);
  React.useEffect(() => {
    if (!provinceOverlay) return undefined;
    const onKeyDown = (e) => { if (e.key === 'Escape') setProvinceOverlay(false); };
    document.addEventListener('keydown', onKeyDown);
    provinceSearchInputRef.current?.focus();
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [provinceOverlay]);

  // El panel de municipios se cierra con Escape; al abrirse, el foco va al buscador.
  const municipalitySearchInputRef = React.useRef(null);
  React.useEffect(() => {
    if (!municipalityOverlay) return undefined;
    const onKeyDown = (e) => { if (e.key === 'Escape') setMunicipalityOverlay(false); };
    document.addEventListener('keydown', onKeyDown);
    municipalitySearchInputRef.current?.focus();
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [municipalityOverlay]);

  const searchQuery = methodSearch.trim().toLowerCase();
  const countryMethods = QVAPAY_METHODS.filter((m) => m.fiat === receiveFiat && m.country === methodCountry);
  const countryLabel = (QVAPAY_COUNTRIES.find((c) => c.code === methodCountry) || QVAPAY_COUNTRIES[0]).label;
  const chainLabel = (QVAPAY_PAY_CHAINS.find((c) => c.code === payChain) || QVAPAY_PAY_CHAINS[0]).label;
  const chainCryptos = QVAPAY_PAY_CRYPTOS.filter((c) => (QVAPAY_PAY_CHAINS.find((x) => x.code === payChain) || QVAPAY_PAY_CHAINS[0]).cryptos.includes(c.code));
  const filteredMethods = searchQuery
    ? countryMethods.filter((m) => `${m.label} ${m.tick} ${m.short || ''}`.toLowerCase().includes(searchQuery))
    : countryMethods;

  const recipientSearchQuery = recipientSearch.trim().toLowerCase();
  const filteredRecipients = recipientSearchQuery
    ? savedForMethod.filter((c) => `${c.name} ${keyLineFor(c.tick, c.details)}`.toLowerCase().includes(recipientSearchQuery))
    : savedForMethod;

  const provinceSearchQuery = provinceSearch.trim().toLowerCase();
  const filteredProvinces = provinceSearchQuery
    ? QVAPAY_PROVINCES.filter((p) => p.toLowerCase().includes(provinceSearchQuery))
    : QVAPAY_PROVINCES;

  const municipalities = formProvince ? qvapayMunicipalities(formProvince) : [];
  const municipalitySearchQuery = municipalitySearch.trim().toLowerCase();
  const filteredMunicipalities = municipalitySearchQuery
    ? municipalities.filter((m) => m.toLowerCase().includes(municipalitySearchQuery))
    : municipalities;

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
            {`Se retirarían ${fmtUsd(amountNum)} ${payCrypto} por ${method.label}.`}
          </p>
          <dl className="qv-summary">
            <div className="qv-summary-row"><dt>Monto</dt><dd>{fmtUsd(amountNum)} {payCrypto}</dd></div>
            <div className="qv-summary-row"><dt>Cadena</dt><dd>{chainLabel}</dd></div>
          </dl>
          <p className="qv-demo-note">Simulación: no se envió ningún retiro real a QvaPay.</p>
          <button type="button" className="qv-cta" onClick={reset}>Hacer otro retiro</button>
        </div>
      </section>
    );
  }

  const listStep2 = step === 2 && variant === 'list';
  const headBack = step > 1 && !listStep2;
  return (
    <section className={`qv-widget${listStep2 ? ' qv-widget-no-head' : ''}${headBack ? ' qv-widget-has-back' : ''}`} aria-label="Widget de retiro con QvaPay">
      {!listStep2 && (
        <div className={`qv-widget-head${headBack ? ' qv-widget-head-back' : ''}`}>
          {headBack && (
            <button type="button" className="qv-overlay-back" aria-label="Volver" onClick={() => setStep(step - 1)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
          <span className="qv-widget-brand">Retiro con QvaPay</span>
          <span className="qv-demo">Demo</span>
        </div>
      )}

      <div className="qv-widget-body">
        {step === 1 && (
          <>
            {/* Monto que se paga (el bruto que se debita del saldo, en crypto). */}
            <div className="qv-field">
              <span className="qv-field-label">Pagas con</span>
              <div className="qv-field-row">
                <input
                  className="qv-amount"
                  type="text"
                  inputMode="decimal"
                  aria-label="Monto a pagar"
                  value={amountText}
                  onChange={onAmountChange}
                  placeholder="0,00"
                />
                <button type="button" className="qv-pill qv-pill-btn" aria-label={`Pagar con ${payCrypto}. Cambiar crypto`} onClick={() => setCryptoOverlay(true)}>
                  <img className="qv-pill-icon" src={PAY_CRYPTO_ICON[payCrypto]} alt="" />
                  {payCrypto}
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Segundo campo, superpuesto como en el clon: lo que se recibe. */}
            <div className="qv-field qv-receive-field">
              <span className="qv-field-label">Recibes (estimado)</span>
              <div className="qv-field-row">
                <span className="qv-amount qv-amount-receive">
                  {receiveFiat === 'CUP' ? fmtUsd(receiveAmount) : `$${fmtUsd(receiveAmount)}`}
                </span>
                <button type="button" className="qv-pill qv-pill-btn" aria-label={`Recibir en ${receiveFiat}. Cambiar fiat`} onClick={() => setFiatOverlay(true)}>
                  <img className="qv-pill-icon" src={RECEIVE_FIAT_ICON[receiveFiat]} alt="" />
                  {receiveFiat}
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
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

            {/* Método: la fila abre el panel completo de selección. */}
            <div className="qv-paywith">
              <div className="qv-paywith-label-row"><span className="qv-field-label">Retirar con</span></div>
              <button type="button" className="qv-paywith-row" aria-expanded={methodOverlay} onClick={() => { setMethodSearch(''); setCountryOverlay(false); setMethodOverlay(true); }}>
                <span className="qv-method">{method.label} · {method.tick}</span>
                <span className="qv-fee">Mín. ${method.min}<span className="qv-chev" aria-hidden="true" /></span>
              </button>
            </div>

          </>
        )}

        {step === 2 && (
          <>
            {/* Destinatario: lista, select con panel, o select + «o»
                + formulario. La variante la elige la página de debug. */}
            <div>
              {variant !== 'list' && <span className="qv-saved-label">Destinatario</span>}
              {savedForMethod.length > 0 ? (
                variant === 'list' ? (
                  <>
                    <div className="qv-overlay-head">
                      <button type="button" className="qv-overlay-back" aria-label="Volver" onClick={() => setStep(1)}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                      <span className="qv-overlay-title">Destinatario</span>
                      <span aria-hidden="true" />
                    </div>
                    <div className="qv-overlay-search">
                      <span className="qv-overlay-search-icon" aria-hidden="true">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="2" />
                          <path d="M16 16l4.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </span>
                      <input
                        className="qv-overlay-search-input"
                        type="search"
                        aria-label="Buscar destinatarios"
                        placeholder="Buscar destinatarios"
                        value={recipientSearch}
                        onChange={(e) => setRecipientSearch(e.target.value)}
                      />
                    </div>
                    <div className="qv-saved-list">
                      {filteredRecipients.map((c) => (
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
                    {filteredRecipients.length === 0 && (
                      <p className="qv-overlay-empty">Sin destinatarios para «{recipientSearch.trim()}».</p>
                    )}
                    <button
                      type="button"
                      className={`qv-other${recipientMode === 'new' ? ' is-selected' : ''}`}
                      onClick={chooseOtherPerson}
                    >
                      <span className="qv-other-plus" aria-hidden="true">+</span> Otra persona
                    </button>
                    </div>
                  </>
                ) : (
                  <button
                    type="button"
                    className="qv-contact-row qv-recipient-row"
                    aria-expanded={recipientOverlay}
                    onClick={() => setRecipientOverlay(true)}
                  >
                    {recipientMode === 'saved' && applied ? (
                      <>
                        <span className="qv-saved-avatar" aria-hidden="true">{applied.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}</span>
                        <span className="qv-contact-info">
                          <span className="qv-contact-name">{applied.name}</span>
                          <span className="qv-contact-key">{keyLineFor(applied.tick, applied.details)}</span>
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="qv-saved-avatar" aria-hidden="true">+</span>
                        <span className="qv-contact-info">
                          <span className="qv-contact-name">Otra persona</span>
                        </span>
                      </>
                    )}
                    <span className="qv-chev" aria-hidden="true" />
                  </button>
                )
              ) : (
                <p className="qv-saved-note">Sin contactos guardados para este método.</p>
              )}
            </div>

            {/* «o»: solo en la variante con el formulario siempre visible. */}
            {variant === 'or' && savedForMethod.length > 0 && <div className="qv-or-divider" aria-hidden="true"><span>o</span></div>}

            {/* Persona nueva: el formulario del método. En la variante «o»
                está siempre visible; en lista y select solo con
                «Otra persona». */}
            {(variant === 'or' || recipientMode === 'new') && (
              <>
                <div className="qv-details">
                  {method.fields.map((f) => {
                    const value = recipientMode === 'saved' ? '' : (details[f.key] || '');
                    if (f.type === 'select-province') {
                      return (
                        <div className="qv-detail-field" key={f.key}>
                          <span className="qv-detail-label">{f.key}</span>
                          <button
                            type="button"
                            className="qv-paywith-row"
                            aria-expanded={provinceOverlay}
                            onClick={() => { setProvinceSearch(''); setProvinceOverlay(true); }}
                          >
                            <span className={formProvince ? 'qv-method' : 'qv-method qv-select-empty'}>{formProvince || f.placeholder}</span>
                            <span className="qv-chev" aria-hidden="true" />
                          </button>
                        </div>
                      );
                    }
                    if (f.type === 'select-municipality') {
                      return (
                        <div className="qv-detail-field" key={f.key}>
                          <span className="qv-detail-label">{f.key}</span>
                          <button
                            type="button"
                            className="qv-paywith-row"
                            aria-expanded={municipalityOverlay}
                            disabled={!formProvince}
                            onClick={() => { setMunicipalitySearch(''); setMunicipalityOverlay(true); }}
                          >
                            <span className={formMunicipality ? 'qv-method' : 'qv-method qv-select-empty'}>{formMunicipality || (formProvince ? f.placeholder : 'Primero elige la provincia')}</span>
                            <span className="qv-chev" aria-hidden="true" />
                          </button>
                        </div>
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

          </>
        )}

        {step === 3 && (
          <>
            {/* Confirmar: resumen de todo antes de retirar. */}
            <dl className="qv-summary qv-summary-confirm">
              <div className="qv-summary-row"><dt>Retiras</dt><dd>{fmtUsd(amountNum)} {payCrypto}</dd></div>
              <div className="qv-summary-row"><dt>Cadena</dt><dd>{chainLabel}</dd></div>
              <div className="qv-summary-row"><dt>Recibes (estimado)</dt><dd>{fmtUsd(receiveAmount)} {receiveFiat}</dd></div>
              <div className="qv-summary-row"><dt>Retirar con</dt><dd>{method.label} · {method.tick}</dd></div>
              <div className="qv-summary-row"><dt>Destinatario</dt><dd className="qv-summary-recipient"><span>{recipientName}</span>{recipientKey && <span className="qv-summary-key">{recipientKey}</span>}</dd></div>
              <div className="qv-summary-row"><dt>Mínimo</dt><dd>${fmtUsd(method.min)}</dd></div>
              <div className="qv-summary-row"><dt>Comisión</dt><dd>{feeLabel}</dd></div>
            </dl>
            <p className="qv-demo-note">Simulación: no se envía ningún retiro real a QvaPay.</p>
          </>
        )}
      </div>

      <div className="qv-widget-foot">
        {step === 1 && (
          <button type="button" className="qv-cta qv-step-cta" disabled={!step1Valid} onClick={() => setStep(2)}>Continuar</button>
        )}
        {step === 2 && (
          <button type="button" className="qv-cta qv-step-cta" disabled={!step2Valid} onClick={() => setStep(3)}>Continuar</button>
        )}
        {step === 3 && (
          <div className="qv-step-actions">
            <button type="button" className="qv-back" onClick={reset}>Cancelar</button>
            <button type="button" className="qv-cta" disabled={!valid} onClick={confirmWithdrawal}>
              {`Retirar ${fmtUsd(amountNum)} ${payCrypto}`}
            </button>
          </div>
        )}
      </div>

      {/* Panel de selección del método: cubre todo el widget, como en el
          widget original, y se cierra con la saeta de arriba o con Escape. */}
      {methodOverlay && (
        <div className="qv-method-overlay" role="dialog" aria-label={countryOverlay ? 'Seleccionar país' : 'Retirar con'}>
          <div className="qv-overlay-head qv-overlay-head-country">
            <button type="button" className="qv-overlay-back" aria-label="Volver" onClick={() => countryOverlay ? setCountryOverlay(false) : setMethodOverlay(false)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span className="qv-overlay-title">{countryOverlay ? 'Seleccionar país' : 'Retirar con'}</span>
            {countryOverlay || receiveFiat === 'CUP' ? <span aria-hidden="true" /> : (
              <button type="button" className="qv-country-btn" aria-label={`País: ${countryLabel}. Cambiar país`} onClick={() => setCountryOverlay(true)}>
                <img className="qv-country-flag" src={COUNTRY_FLAG[methodCountry]} alt="" />
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}
          </div>
          {countryOverlay ? (
            <div className="qv-overlay-list qv-overlay-list-no-search">
              {QVAPAY_COUNTRIES.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  className={`qv-overlay-option${c.code === methodCountry ? ' is-selected' : ''}`}
                  onClick={() => { setMethodCountry(c.code); setMethodSearch(''); setCountryOverlay(false); }}
                >
                  <span className="qv-overlay-icon" aria-hidden="true"><img className="qv-country-flag" src={COUNTRY_FLAG[c.code]} alt="" /></span>
                  <span className="qv-overlay-name">{c.label}</span>
                  {c.code === methodCountry && <span className="qv-overlay-check" aria-hidden="true">✓</span>}
                </button>
              ))}
            </div>
          ) : (
            <>
              <div className="qv-overlay-search">
                <span className="qv-overlay-search-icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="2" />
                    <path d="M16 16l4.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
                <input
                  ref={searchInputRef}
                  className="qv-overlay-search-input"
                  type="search"
                  aria-label="Buscar métodos"
                  placeholder="Buscar métodos"
                  value={methodSearch}
                  onChange={(e) => setMethodSearch(e.target.value)}
                />
              </div>
              <p className="qv-overlay-section">Popular en {countryLabel}</p>
              <div className="qv-overlay-list">
                {filteredMethods.map((m) => (
                  <button
                    key={m.tick}
                    type="button"
                    className={`qv-overlay-option${m.tick === method.tick ? ' is-selected' : ''}`}
                    onClick={() => switchMethod(m.tick)}
                  >
                    <span className="qv-overlay-icon" aria-hidden="true">{METHOD_ICON[m.tick] ? <img src={METHOD_ICON[m.tick]} alt="" /> : <SwappedMethodIcon method={METHOD_GLYPH[m.tick]} />}</span>
                    <span className="qv-overlay-name">{m.label}</span>
                    <span className="qv-overlay-min">Mín. ${m.min}</span>
                    {m.tick === method.tick && <span className="qv-overlay-check" aria-hidden="true">✓</span>}
                  </button>
                ))}
                {filteredMethods.length === 0 && (
                  <p className="qv-overlay-empty">Sin métodos para «{methodSearch.trim()}».</p>
                )}
              </div>
            </>
          )}
        </div>
      )}

      {/* Panel de selección de la crypto con la que se paga. La cadena
          se elige con una píldora arriba a la derecha, como el país en el
          panel de métodos; al tocarla, el panel muestra la lista de cadenas. */}
      {cryptoOverlay && (
        <div className="qv-method-overlay" role="dialog" aria-label={chainOverlay ? 'Seleccionar cadena' : 'Pagar con'}>
          <div className="qv-overlay-head qv-overlay-head-country">
            <button type="button" className="qv-overlay-back" aria-label="Volver" onClick={() => chainOverlay ? setChainOverlay(false) : setCryptoOverlay(false)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span className="qv-overlay-title">{chainOverlay ? 'Seleccionar cadena' : 'Pagar con'}</span>
            {chainOverlay ? <span aria-hidden="true" /> : (
              <button type="button" className="qv-chain-btn" aria-label={`Cadena: ${chainLabel}. Cambiar cadena`} onClick={() => setChainOverlay(true)}>
                <img className="qv-chain-flag" src={CHAIN_ICON[payChain]} alt="" />
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}
          </div>
          {chainOverlay ? (
            <div className="qv-overlay-list qv-overlay-list-no-search">
              {QVAPAY_PAY_CHAINS.map((ch) => (
                <button
                  key={ch.code}
                  type="button"
                  className={`qv-overlay-option${ch.code === payChain ? ' is-selected' : ''}`}
                  onClick={() => selectChain(ch.code)}
                >
                  <span className="qv-overlay-icon" aria-hidden="true"><img src={CHAIN_ICON[ch.code]} alt="" /></span>
                  <span className="qv-overlay-name">{ch.label}</span>
                  <span className="qv-overlay-min">{ch.cryptos.length} {ch.cryptos.length === 1 ? 'crypto' : 'cryptos'}</span>
                  {ch.code === payChain && <span className="qv-overlay-check" aria-hidden="true">✓</span>}
                </button>
              ))}
            </div>
          ) : (
          <div className="qv-overlay-list qv-overlay-list-no-search">
            {chainCryptos.map((c) => (
              <button
                key={c.code}
                type="button"
                className={`qv-overlay-option${c.code === payCrypto ? ' is-selected' : ''}`}
                onClick={() => { setPayCrypto(c.code); setCryptoOverlay(false); }}
              >
                <span className="qv-overlay-icon" aria-hidden="true"><img src={PAY_CRYPTO_ICON[c.code]} alt="" /></span>
                <span className="qv-overlay-name">{c.code}</span>
                <span className="qv-overlay-min">{c.label}</span>
                {c.code === payCrypto && <span className="qv-overlay-check" aria-hidden="true">✓</span>}
              </button>
            ))}
          </div>
          )}
        </div>
      )}

      {/* Panel de selección de la fiat que se recibe (USD o CUP). */}
      {fiatOverlay && (
        <div className="qv-method-overlay" role="dialog" aria-label="Recibir en">
          <div className="qv-overlay-head">
            <button type="button" className="qv-overlay-back" aria-label="Volver" onClick={() => setFiatOverlay(false)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span className="qv-overlay-title">Recibir en</span>
            <span aria-hidden="true" />
          </div>
          <div className="qv-overlay-list qv-overlay-list-no-search">
            {QVAPAY_RECEIVE_FIATS.map((f) => (
              <button
                key={f.code}
                type="button"
                className={`qv-overlay-option${f.code === receiveFiat ? ' is-selected' : ''}`}
                onClick={() => selectReceiveFiat(f.code)}
              >
                <span className="qv-overlay-icon" aria-hidden="true"><img src={RECEIVE_FIAT_ICON[f.code]} alt="" /></span>
                <span className="qv-overlay-name">{f.code}</span>
                <span className="qv-overlay-min">{f.label}</span>
                {f.code === receiveFiat && <span className="qv-overlay-check" aria-hidden="true">✓</span>}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Panel de selección del destinatario: cubre todo el widget, como
          el del método, y se cierra con la saeta de arriba o con Escape. */}
      {recipientOverlay && savedForMethod.length > 0 && (
        <div className="qv-method-overlay" role="dialog" aria-label="Destinatario">
          <div className="qv-overlay-head">
            <button type="button" className="qv-overlay-back" aria-label="Volver" onClick={() => setRecipientOverlay(false)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span className="qv-overlay-title">Destinatario</span>
            <span aria-hidden="true" />
          </div>
          <div className="qv-overlay-list qv-overlay-list-no-search">
            {savedForMethod.map((c) => (
              <button
                key={c.name}
                type="button"
                className={`qv-contact-row${appliedContact === c.name ? ' is-selected' : ''}`}
                onClick={() => { applyContact(c); setRecipientOverlay(false); }}
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
              onClick={() => { chooseOtherPerson(); setRecipientOverlay(false); }}
            >
              <span className="qv-other-plus" aria-hidden="true">+</span> Otra persona
            </button>
          </div>
        </div>
      )}

      {/* Panel de selección de la provincia: cubre todo el widget, como
          el del método, y se cierra con la saeta de arriba o con Escape. */}
      {provinceOverlay && (
        <div className="qv-method-overlay" role="dialog" aria-label="Provincia">
          <div className="qv-overlay-head">
            <button type="button" className="qv-overlay-back" aria-label="Volver" onClick={() => setProvinceOverlay(false)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span className="qv-overlay-title">Provincia</span>
            <span aria-hidden="true" />
          </div>
          <div className="qv-overlay-search">
            <span className="qv-overlay-search-icon" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="2" />
                <path d="M16 16l4.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
            <input
              ref={provinceSearchInputRef}
              className="qv-overlay-search-input"
              type="search"
              aria-label="Buscar provincias"
              placeholder="Buscar provincias"
              value={provinceSearch}
              onChange={(e) => setProvinceSearch(e.target.value)}
            />
          </div>
          <div className="qv-overlay-list">
            {filteredProvinces.map((p) => (
              <button
                key={p}
                type="button"
                className={`qv-overlay-option${formProvince === p ? ' is-selected' : ''}`}
                onClick={() => { setDetail('Provincia', p); setProvinceOverlay(false); }}
              >
                <span className="qv-overlay-name">{p}</span>
                {formProvince === p && <span className="qv-overlay-check" aria-hidden="true">✓</span>}
              </button>
            ))}
            {filteredProvinces.length === 0 && (
              <p className="qv-overlay-empty">Sin provincias para «{provinceSearch.trim()}».</p>
            )}
          </div>
        </div>
      )}

      {/* Panel de selección del municipio: cubre todo el widget, como
          el de la provincia, y se cierra con la saeta de arriba o con
          Escape. El fee % va como meta a la derecha de cada opción. */}
      {municipalityOverlay && (
        <div className="qv-method-overlay" role="dialog" aria-label="Municipio">
          <div className="qv-overlay-head">
            <button type="button" className="qv-overlay-back" aria-label="Volver" onClick={() => setMunicipalityOverlay(false)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span className="qv-overlay-title">Municipio</span>
            <span aria-hidden="true" />
          </div>
          <div className="qv-overlay-search">
            <span className="qv-overlay-search-icon" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="2" />
                <path d="M16 16l4.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
            <input
              ref={municipalitySearchInputRef}
              className="qv-overlay-search-input"
              type="search"
              aria-label="Buscar municipios"
              placeholder="Buscar municipios"
              value={municipalitySearch}
              onChange={(e) => setMunicipalitySearch(e.target.value)}
            />
          </div>
          <div className="qv-overlay-list">
            {filteredMunicipalities.map((m) => {
              const fee = qvapayZoneFeePct(formProvince, m);
              return (
                <button
                  key={m}
                  type="button"
                  className={`qv-overlay-option${formMunicipality === m ? ' is-selected' : ''}`}
                  onClick={() => { setDetail('Municipio', m); setMunicipalityOverlay(false); }}
                >
                  <span className="qv-overlay-name">{m}</span>
                  {fee != null && <span className="qv-overlay-min">{fee}%</span>}
                  {formMunicipality === m && <span className="qv-overlay-check" aria-hidden="true">✓</span>}
                </button>
              );
            })}
            {filteredMunicipalities.length === 0 && (
              <p className="qv-overlay-empty">Sin municipios para «{municipalitySearch.trim()}».</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
