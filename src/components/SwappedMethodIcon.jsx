import React from 'react';

// Iconos genéricos de los métodos de pago de /swapped: formas simples
// en trazo blanco (currentColor), sin copiar los logos de marca de la
// referencia (Apple Pay, Google Pay, Skrill…). Se dibujan a 35px de alto
// sobre el nombre, como en las tarjetas de la referencia.

function Glyph({ children }) {
  return (
    <svg viewBox="0 0 24 24" role="img" aria-hidden="true" height="35" width="35">
      <g stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </g>
    </svg>
  );
}

const GLYPHS = {
  'Apple Pay': (
    <Glyph>
      <rect x="7" y="2" width="10" height="20" rx="2.5" />
      <path d="M10.5 19 h3" />
    </Glyph>
  ),
  Card: (
    <Glyph>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10 h20" />
    </Glyph>
  ),
  'Google Pay': (
    <Glyph>
      <rect x="3" y="6" width="18" height="13" rx="2.5" />
      <rect x="15" y="10" width="4" height="5" rx="1" fill="currentColor" stroke="none" />
    </Glyph>
  ),
  PaySafeCard: (
    <Glyph>
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <path d="M7 9 v6 M10 9 v6 M13 9 v6 M16.5 9 v6" />
    </Glyph>
  ),
  'Bank Transfer': (
    <Glyph>
      <path d="M3 10 L12 4 L21 10" />
      <path d="M6 12 v6 M12 12 v6 M18 12 v6" />
      <path d="M4 20 h16" />
    </Glyph>
  ),
  Skrill: (
    <Glyph>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7 v10 M8 11 l4 -4 4 4" />
    </Glyph>
  ),
  'Rapid Transfer': (
    <Glyph>
      <path d="M13 2 L5 14 h6 l-2 8 8 -12 h-6 l2 -8" />
    </Glyph>
  ),
};

export function SwappedMethodIcon({ method }) {
  return GLYPHS[method] || null;
}
