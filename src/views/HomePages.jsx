import React from 'react';
import { Heading } from '../ds/components/Heading/Heading.jsx';
import { Text } from '../ds/components/Text/Text.jsx';
import { Button } from '../ds/components/Button/Button.jsx';

// Homepages PLACEHOLDER, inventadas (sin datos reales): la principal vive
// en peetoo.pages.dev y la del mercado en app.peetoo.pages.dev. La
// elección va por dominio: app.peetoo.pages.dev muestra la del mercado y
// cualquier otro dominio, la principal. Cuando lleguen las homepages
// definitivas (fase 2, segunda parte), estas se sustituyen.
// El texto solo afirma hechos del propio mercado (monedas, fiats y
// métodos reales de la demo); nada de cifras, testimonios ni redes.

const CARDS = [
  { title: 'Stablecoins', text: 'USDT, USAT, USDC, EURC, PYUSD, ZLUSD y OUSD.' },
  { title: 'Fiat', text: 'CUP, USD, EUR, MXN y CAD.' },
  { title: 'Métodos de pago', text: 'Efectivo, Transferencia Bancaria, PayPal, Zelle, Etecsa, Clásica, Qvapay y TropiPay.' },
];

function HomeCards() {
  return (
    <section className="home-cards" aria-label="Qué hay en el mercado">
      {CARDS.map((c) => (
        <div className="home-card" key={c.title}>
          <div className="home-card-title">{c.title}</div>
          <div className="home-card-text">{c.text}</div>
        </div>
      ))}
    </section>
  );
}

export function HomeMain() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <Heading level="h1">Compra y vende stablecoins entre personas</Heading>
        <Text tone="muted">peetoo es una demostración de mercado P2P: sin cuentas, sin dinero real y con datos de muestra.</Text>
        <div className="home-cta-row">
          <Button size="lg" onClick={() => { window.location.href = 'https://app.peetoo.pages.dev/crypto/'; }}>Ir al mercado</Button>
        </div>
      </section>
      <HomeCards />
      <p className="home-note">El mercado vive en app.peetoo.pages.dev.</p>
    </main>
  );
}

export function HomeMarket({ goToMarket }) {
  return (
    <main className="home-page">
      <section className="home-hero">
        <Heading level="h1">Mercado Crypto</Heading>
        <Text tone="muted">Compra y vende USDC y USDT directamente entre personas, con fiat y métodos de pago. Demostración con datos de muestra.</Text>
        <div className="home-cta-row">
          <Button size="lg" onClick={goToMarket}>Entrar al mercado</Button>
        </div>
      </section>
      <HomeCards />
    </main>
  );
}

export function HomePage({ goToMarket }) {
  const isApp = typeof window !== 'undefined' && window.location.hostname === 'app.peetoo.pages.dev';
  return isApp ? <HomeMarket goToMarket={goToMarket} /> : <HomeMain />;
}
