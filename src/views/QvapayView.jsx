import React from 'react';
import { SegmentedControl } from '../ds/components/SegmentedControl/SegmentedControl.jsx';
import { Heading } from '../ds/components/Heading/Heading.jsx';
import { Text } from '../ds/components/Text/Text.jsx';
import { SwappedStepVisual } from '../components/SwappedStepVisuals.jsx';
import { SwappedMethodIcon } from '../components/SwappedMethodIcon.jsx';
import QvapayWidget from '../components/QvapayWidget.jsx';
import { QVAPAY_CONTENT, QVAPAY_METHODS } from '../data/qvapay.js';

// Glifo genérico por método (los de /swapped más Efectivo y Cripto).
const METHOD_GLYPH = {
  USDCASH: 'Efectivo',
  BANK_CUP: 'Card',
  BANK_MLC: 'Card',
  CLASICA: 'Card',
  TROPICAL: 'Card',
  ZELLE: 'Rapid Transfer',
  BANK: 'Bank Transfer',
  BANK_INTL: 'Bank Transfer',
  USDT: 'Cripto',
  BTCLN: 'Cripto',
};

// Vista /crypto/qvapay: misma página que /swapped (hero + widget fijo a
// la derecha + 3 pasos + métodos populares), con el widget de retiro
// propio en vez del iframe de Swapped. Dos versiones: general y efectivo.
export default function QvapayView({ variant, onChangeVariant }) {
  const content = QVAPAY_CONTENT[variant];
  return (
    <main className="swapped-stage qvapay-stage">
      <div className="swapped-layout">
        {/* Resplandor violeta bajo el widget, como en /swapped. */}
        <div className="swapped-glow" aria-hidden="true" />
        <div className="swapped-hero-text">
          <SegmentedControl
            ariaLabel="Tipo de retiro"
            options={[{ value: 'general', label: 'General' }, { value: 'cash', label: 'Efectivo' }]}
            value={variant}
            onChange={onChangeVariant}
            className="swapped-toggle"
          />
          <div className="swapped-hero-copy">
            <Heading level="h1">{content.title}</Heading>
            <Text tone="muted">{content.description}</Text>
          </div>
        </div>
        <div className="qv-widget-wrap">
          <QvapayWidget key={variant} variant={variant} />
        </div>
        <div className="swapped-rest">
          <section className="swapped-steps" aria-label={content.stepsTitle}>
            <Heading level="h2">{content.stepsTitle}</Heading>
            <div className="swapped-steps-grid">
              {content.steps.map((s) => (
                <article className="swapped-step" key={s.title}>
                  <div className="swapped-step-visual"><SwappedStepVisual variant={s.visual} /></div>
                  <div className="swapped-step-body">
                    <h3 className="swapped-step-title">{s.title}</h3>
                    <p className="swapped-step-text">{s.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
          <section className="swapped-methods" aria-label="Métodos de retiro populares">
            <Heading level="h2">Métodos de retiro populares</Heading>
            <div className="swapped-methods-grid">
              {QVAPAY_METHODS.map((m) => (
                <span className="swapped-method-card" key={m.tick}>
                  <span className="swapped-method-icon"><SwappedMethodIcon method={METHOD_GLYPH[m.tick]} /></span>
                  <span className="swapped-method-name">{m.label}</span>
                </span>
              ))}
            </div>
          </section>
          <section className="swapped-info-card" aria-label="Comisiones y plazos">
            <h3 className="swapped-info-heading">Comisiones y plazos</h3>
            {variant === 'cash' ? (
              <p className="swapped-info-text">
                El efectivo se entrega en billetes: lo entregado es un múltiplo de $5 y al menos el mínimo de la zona.
                El cargo de la zona es el mayor entre el monto × el % del proveedor y un mínimo fijo, más el monto × el margen.
                Ejemplo de la documentación: retirar $208,33 a Santa Clara entrega $200.
                Cada zona tiene su propio plazo de entrega, de 1 a 144 horas según el municipio.
              </p>
            ) : (
              <p className="swapped-info-text">
                Cada método tiene su propio formulario y su mínimo: cripto desde $2, tarjetas cubanas desde $1,
                Zelle y efectivo desde $50, transferencias desde $100.
                Las claves del formulario son exactas: una de más o una de menos rechaza el retiro entero.
                La comisión exacta la confirma QvaPay al crear el retiro.
              </p>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
