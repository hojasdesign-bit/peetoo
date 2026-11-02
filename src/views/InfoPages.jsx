import React from 'react';
import { Button } from '../ds/components/Button/Button.jsx';
import { GLOSSARY_TERMS } from '../data/glossary.js';

// Iconos genéricos de la referencia (lupa y flecha arriba-derecha),
// dibujados en línea; no son marcas de nadie.
function SearchIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="glossary-search-icon">
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="glossary-arrow">
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  );
}

// Comparación sin tildes para el buscador (Método = metodo).
const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const termLetter = (t) => t.term[0].toUpperCase();
const LETTERS = ['#', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
const lettersWithTerms = [...new Set(GLOSSARY_TERMS.map(termLetter))];

function GlossaryCard({ t, onTerm }) {
  return (
    <a
      className="glossary-card"
      href={`/crypto/glosario/${t.slug}`}
      onClick={(e) => { e.preventDefault(); onTerm(t.slug); }}
    >
      <h3>{t.term}</h3>
      <p>{t.definition}</p>
      <span className="glossary-more">Leer más <ArrowIcon /></span>
    </a>
  );
}

// Páginas internas: JSX movido tal cual desde App.jsx, sin cambios.
// Solo reciben goToMarket (botón «Volver al mercado»).
export function LegalPage({ goToMarket, goToGlossary }) {
  // Misma plantilla de página de contenido que el detalle del glosario
  // (héroe + cuerpo 742 + lateral 280 fijo); el texto no cambia.
  // Sin CTA: una página legal no vende nada; el botón de vuelta basta.
  return (
      <main className="glossary-page">
        <div className="glossary-hero">
          <div className="glossary-hero-glow" aria-hidden="true" />
          <div className="glossary-hero-grid" aria-hidden="true" />
          <h1>Legal</h1>
          <p>Qué es peetoo, qué datos muestra la demo y qué no hace.</p>
        </div>
        <div className="glossary-detail-body">
          <div className="glossary-detail-grid">
            <div className="glossary-article">
              <p className="glossary-dateline">Última actualización: noviembre de 2026.</p>
              <section id="que-es-peetoo">
                <h2>Qué es peetoo</h2>
                <p>peetoo es una demostración sin inicio de sesión de un mercado P2P: compra y venta de stablecoins entre personas, con fiat y métodos de pago. No es una plataforma en funcionamiento: no se ejecuta ninguna compraventa, no se mueve dinero real y no hay cuentas de usuario.</p>
              </section>
              <section id="demo-y-datos-de-muestra">
                <h2>Demo y datos de muestra</h2>
                <p>Todo lo que ves son datos de muestra: las ofertas, los anunciantes, sus estadísticas, los destinos de pago y las tasas son ficticios o de referencia. La insignia «Demo · datos de muestra» del header lo señala en toda la app. Nada de lo mostrado constituye una oferta real ni un compromiso de compra o venta.</p>
              </section>
              <section id="privacidad">
                <h2>Privacidad</h2>
                <p>peetoo no pide ni guarda datos personales: no hay registro, inicio de sesión ni perfiles propios. La navegación no requiere identificarse y la app no recoge información de contacto, cuentas ni billeteras.</p>
              </section>
              <section id="compras-con-swapped">
                <h2>Compras con Swapped</h2>
                <p>La página de Swapped muestra el widget de un tercero (Swapped): sus términos, disponibilidad y funcionamiento son responsabilidad de Swapped. El lado Vender muestra su aviso porque Swapped tiene las ventas desactivadas temporalmente; peetoo no vende ni intermedia esas operaciones.</p>
              </section>
              <section id="responsabilidad">
                <h2>Responsabilidad</h2>
                <p>peetoo no custodia fondos, no ejecuta pagos y no ofrece asesoramiento financiero. Las tasas y precios de muestra no son cotizaciones en vivo ni una recomendación de compra o venta. Esta página puede actualizarse cuando el producto avance de fase.</p>
              </section>
              <div className="info-back"><Button size="lg" onClick={goToMarket}>Volver al mercado</Button></div>
            </div>
            <aside className="glossary-aside">
              <nav className="glossary-toc" aria-label="En esta página">
                <h3>En esta página</h3>
                <a href="#que-es-peetoo">Qué es peetoo</a>
                <a href="#demo-y-datos-de-muestra">Demo y datos de muestra</a>
                <a href="#privacidad">Privacidad</a>
                <a href="#compras-con-swapped">Compras con Swapped</a>
                <a href="#responsabilidad">Responsabilidad</a>
              </nav>
            </aside>
          </div>
        </div>
        <section id="otras-paginas" className="glossary-others" aria-label="Otras páginas">
          <h2>Otras páginas</h2>
          <div className="glossary-others-grid">
            <a
              className="glossary-other-card"
              href="/crypto/glosario"
              onClick={(e) => { e.preventDefault(); goToGlossary(); }}
            >
              <div>
                <h3>Glosario</h3>
                <p>Los términos del mercado P2P de peetoo, en pocas palabras.</p>
              </div>
              <span className="glossary-more">Leer más <ArrowIcon /></span>
            </a>
          </div>
        </section>
      </main>
  );
}

export function GlossaryPage({ goToMarket, onTerm }) {
  const [query, setQuery] = React.useState('');
  const [letter, setLetter] = React.useState('all');
  const q = norm(query.trim());
  const visible = GLOSSARY_TERMS.filter((t) => {
    if (letter !== 'all' && termLetter(t) !== letter) return false;
    if (q && !norm(`${t.term} ${t.definition}`).includes(q)) return false;
    return true;
  });
  const groups = [];
  visible.forEach((t) => {
    const l = termLetter(t);
    const g = groups.find((x) => x.letter === l);
    if (g) g.terms.push(t);
    else groups.push({ letter: l, terms: [t] });
  });
  return (
      <main className="glossary-page">
        <div className="glossary-hero">
          <div className="glossary-hero-glow" aria-hidden="true" />
          <div className="glossary-hero-grid" aria-hidden="true" />
          <h1>Glosario</h1>
          <p>Los términos del mercado P2P de peetoo, en pocas palabras.</p>
        </div>
        <section className="glossary-list" aria-label="Glosario">
          <div className="glossary-search">
            <SearchIcon />
            <input
              type="search"
              placeholder="Buscar"
              aria-label="Buscar en el glosario"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="glossary-filter" role="group" aria-label="Filtrar por letra">
            <button
              type="button"
              className={letter === 'all' ? 'active' : ''}
              onClick={() => setLetter('all')}
            >
              Todos
            </button>
            {LETTERS.map((l) => (
              <button
                key={l}
                type="button"
                className={letter === l ? 'active' : ''}
                disabled={!lettersWithTerms.includes(l)}
                onClick={() => setLetter(l)}
              >
                {l}
              </button>
            ))}
          </div>
          {groups.length === 0 ? (
            <p className="glossary-empty">No hay términos que coincidan{query.trim() ? ` con «${query.trim()}»` : ''}.</p>
          ) : (
            <div className="glossary-groups">
              {groups.map((g) => (
                <div className="glossary-group" key={g.letter}>
                  <h2>{g.letter}</h2>
                  <div className="glossary-cards">
                    {g.terms.map((t) => <GlossaryCard key={t.slug} t={t} onTerm={onTerm} />)}
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="info-back"><Button size="lg" onClick={goToMarket}>Volver al mercado</Button></div>
        </section>
      </main>
  );
}

export function GlossaryTermPage({ term, goToMarket, goToGlossary, onTerm }) {
  if (!term) {
    return (
      <main className="glossary-page">
        <div className="glossary-detail">
          <h1>Término no encontrado</h1>
          <p>Este término no está en el glosario de peetoo.</p>
          <div className="info-back"><Button size="lg" onClick={goToGlossary}>Volver al glosario</Button></div>
        </div>
      </main>
    );
  }
  const idx = GLOSSARY_TERMS.findIndex((t) => t.slug === term.slug);
  const others = [1, 2, 3].map((i) => GLOSSARY_TERMS[(idx + i) % GLOSSARY_TERMS.length]);
  return (
      <main className="glossary-page">
        <div className="glossary-hero">
          <div className="glossary-hero-glow" aria-hidden="true" />
          <div className="glossary-hero-grid" aria-hidden="true" />
          <h1>{term.term}</h1>
          <p>{term.definition}</p>
        </div>
        <div className="glossary-detail-body">
          <div className="glossary-detail-grid">
            <div className="glossary-article">
              <p id="definicion">{term.definition}</p>
              <section id="explorar" className="glossary-cta">
                <div>
                  <h2>¿Listo para explorar el mercado?</h2>
                  <p>Entra al mercado P2P y explora las ofertas de la demo.</p>
                </div>
                <Button size="lg" onClick={goToMarket}>Ir al mercado</Button>
              </section>
              <div className="info-back"><Button size="lg" onClick={goToGlossary}>Volver al glosario</Button></div>
            </div>
            <aside className="glossary-aside">
              <nav className="glossary-toc" aria-label="En esta página">
                <h3>En esta página</h3>
                <a href="#definicion">Definición</a>
                <a href="#explorar">Explorar el mercado</a>
                <a href="#otros-terminos">Otros términos</a>
              </nav>
            </aside>
          </div>
        </div>
        <section id="otros-terminos" className="glossary-others" aria-label="Otros términos">
          <h2>Otros términos</h2>
          <div className="glossary-others-grid">
            {others.map((t) => (
              <a
                key={t.slug}
                className="glossary-other-card"
                href={`/crypto/glosario/${t.slug}`}
                onClick={(e) => { e.preventDefault(); onTerm(t.slug); }}
              >
                <div>
                  <h3>{t.term}</h3>
                  <p>{t.definition}</p>
                </div>
                <span className="glossary-more">Leer más <ArrowIcon /></span>
              </a>
            ))}
          </div>
        </section>
      </main>
  );
}
