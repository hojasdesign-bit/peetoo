import React from 'react';
import { SegmentedControl } from '../ds/components/SegmentedControl/SegmentedControl.jsx';
import { Heading } from '../ds/components/Heading/Heading.jsx';
import { Text } from '../ds/components/Text/Text.jsx';
import { SwappedStepVisual } from '../components/SwappedStepVisuals.jsx';
import { SwappedMethodIcon } from '../components/SwappedMethodIcon.jsx';
import { SWAPPED_METHODS, SWAPPED_EDITORIAL_INTRO, SWAPPED_EDITORIAL, SWAPPED_STATS, SWAPPED_PRECIO_TEXT, SWAPPED_RESOURCES_TEXT, SWAPPED_RESOURCES_LINKS, SWAPPED_FAQS, SWAPPED_MORE_CRYPTOS } from '../data/swappedPage.js';

// Vista /swapped: JSX movido tal cual desde App.jsx, sin cambios.
// Recibe por props todo lo que antes era estado o derivado de App.
export default function SwappedView({ swappedSide, setSwappedSide, swappedContent, swappedStatsRef, swappedFaqOpen, setSwappedFaqOpen }) {
  return (
        <main className="swapped-stage">
          <div className="swapped-layout">
            {/* Resplandor violeta de la página de Swapped: un div
                absoluto detrás del contenido, como su .glow. */}
            <div className="swapped-glow" aria-hidden="true" />
            <div className="swapped-hero-text">
              {/* El toggle Comprar/Vender va aquí, sobre el título,
                  en el lugar del chip USDC (símbolo y nombre repetidos,
                  sin sentido): el chip queda eliminado. */}
              <SegmentedControl
                ariaLabel="Comprar o vender"
                options={[{ value: 'buy', label: 'Comprar' }, { value: 'sell', label: 'Vender' }]}
                value={swappedSide}
                onChange={setSwappedSide}
                className="swapped-toggle"
              />
              <div className="swapped-hero-copy">
                <Heading level="h1">{swappedContent.title}</Heading>
                <Text tone="muted">{swappedContent.description}</Text>
              </div>
            </div>
            {swappedSide === 'buy' ? (
              <iframe src="https://widget.swapped.com/?currencyCode=USDC" title="Widget de Swapped" allow="clipboard-write" />
            ) : (
              // Sin widget de venta que incrustar: la propia página de
              // Swapped (/sell/usdc) muestra este mismo aviso — las
              // ventas están desactivadas temporalmente.
              <section className="swapped-sell" aria-label="Ventas desactivadas">
                <h2 className="swapped-sell-title">Las ventas de criptomonedas están desactivadas temporalmente</h2>
                <p className="swapped-sell-text">Estamos trabajando para recuperar esta función en un plazo de dos semanas. Aún puedes comprar criptomonedas al instante con tu método de pago preferido.</p>
              </section>
            )}
            <div className="swapped-rest">
            <section className="swapped-steps" aria-label={swappedContent.stepsTitle}>
              <Heading level="h2">{swappedContent.stepsTitle}</Heading>
              <div className="swapped-steps-grid">
                {swappedContent.steps.map((s) => (
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
            <section className="swapped-methods" aria-label="Métodos de pago populares">
              <Heading level="h2">Métodos de pago populares</Heading>
              <div className="swapped-methods-grid">
                {SWAPPED_METHODS.map((m) => (
                  <span className={`swapped-method-card${m.startsWith('+') ? ' swapped-method-more' : ''}`} key={m}>
                    {!m.startsWith('+') && (
                      <span className="swapped-method-icon"><SwappedMethodIcon method={m} /></span>
                    )}
                    <span className="swapped-method-name">{m}</span>
                  </span>
                ))}
              </div>
            </section>
          <section className="swapped-editorial" aria-label="Sobre USDC">
            <div className="swapped-editorial-block">
              <p className="swapped-editorial-text">{SWAPPED_EDITORIAL_INTRO}</p>
              <h3 className="swapped-editorial-heading">{SWAPPED_EDITORIAL[0].heading}</h3>
              <div className="swapped-editorial-paras">
                {SWAPPED_EDITORIAL[0].paras.map((para, i) => (
                  <p className="swapped-editorial-text" key={i}>{para}</p>
                ))}
              </div>
            </div>
            {SWAPPED_EDITORIAL.slice(1).map((s) => (
              <div className="swapped-editorial-block" key={s.heading}>
                <h3 className="swapped-editorial-heading">{s.heading}</h3>
                <div className="swapped-editorial-paras">
                  {s.paras.map((para, i) => (
                    <p className="swapped-editorial-text" key={i}>{para}</p>
                  ))}
                </div>
              </div>
            ))}
          </section>
          <section className="swapped-stats" ref={swappedStatsRef} aria-label="Estadísticas de mercado de USDC">
            <h3 className="swapped-stats-heading">USDC (USDC) market stats</h3>
            <p className="swapped-stats-intro">{SWAPPED_STATS.intro}</p>
            <div className="swapped-stats-grid">
              {SWAPPED_STATS.cells.map((c) => (
                <div className="swapped-stat-cell" key={c.label}>
                  <span className="swapped-stat-label">{c.label}</span>
                  <span className="swapped-stat-value">{c.value}</span>
                </div>
              ))}
            </div>
          </section>
          <section className="swapped-info-card" aria-label="Precio de USDC">
            <h3 className="swapped-info-heading">Precio de USDC (USDC), gráficos y estadísticas</h3>
            <p className="swapped-info-text">{SWAPPED_PRECIO_TEXT}</p>
            <div className="swapped-info-links">
              <button type="button" className="swapped-info-link" onClick={() => swappedStatsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>Explorar ↗</button>
              <button type="button" className="swapped-info-link" onClick={() => { setSwappedSide('sell'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Vender USDC ↗</button>
            </div>
          </section>
          <section className="swapped-info-card" aria-label="Recursos sobre USDC">
            <h3 className="swapped-info-heading">Relevant resources for USDC</h3>
            <p className="swapped-info-text">{SWAPPED_RESOURCES_TEXT}</p>
            <div className="swapped-info-links">
              {SWAPPED_RESOURCES_LINKS.map((l) => (
                <a className="swapped-info-link" key={l.label} href={l.href} target="_blank" rel="noreferrer">{l.label} ↗</a>
              ))}
            </div>
          </section>
          <section className="swapped-faq" aria-label="Preguntas frecuentes sobre USDC">
            <Heading level="h2">Preguntas frecuentes sobre USDC</Heading>
            <div className="swapped-faq-list">
              {SWAPPED_FAQS.map((f, i) => (
                <article className="swapped-faq-card" key={f.q}>
                  <button type="button" className="swapped-faq-question" aria-expanded={swappedFaqOpen === i} onClick={() => setSwappedFaqOpen(swappedFaqOpen === i ? -1 : i)}>
                    <span>{f.q}</span>
                    <span className="swapped-faq-chevron" aria-hidden="true" />
                  </button>
                  {swappedFaqOpen === i && <p className="swapped-faq-answer">{f.a}</p>}
                </article>
              ))}
            </div>
          </section>
            </div>
          </div>
          <section className="swapped-more" aria-label="Más criptos que compran nuestros clientes">
            <Heading level="h2">Más criptos que compran nuestros clientes</Heading>
            <div className="swapped-more-grid">
              {SWAPPED_MORE_CRYPTOS.map((c) => (
                <span className="swapped-more-card" key={c.ticker}>
                  <span className="swapped-more-disc" style={c.logo ? undefined : { backgroundColor: c.color }}>{c.logo ? <img className="swapped-more-logo" src={c.logo} alt="" /> : c.ticker[0]}</span>
                  <span className="swapped-more-name">Comprar {c.name} ({c.ticker})</span>
                </span>
              ))}
            </div>
          </section>
        </main>
  );
}
