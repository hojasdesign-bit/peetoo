import React from 'react';
import { Heading } from '../ds/components/Heading/Heading.jsx';
import { Text } from '../ds/components/Text/Text.jsx';
import { Button } from '../ds/components/Button/Button.jsx';

// Páginas internas: JSX movido tal cual desde App.jsx, sin cambios.
// Solo reciben goToMarket (botón «Volver al mercado»).
export function LegalPage({ goToMarket }) {
  return (
      <main className="info-page">
        <section aria-label="Legal">
          <Heading level="h1">Legal</Heading>
          <Text tone="muted">Última actualización: noviembre de 2026.</Text>
          <section>
            <Heading level="h2">Qué es peetoo</Heading>
            <Text>peetoo es una demostración sin inicio de sesión de un mercado P2P: compra y venta de stablecoins entre personas, con fiat y métodos de pago. No es una plataforma en funcionamiento: no se ejecuta ninguna compraventa, no se mueve dinero real y no hay cuentas de usuario.</Text>
          </section>
          <section>
            <Heading level="h2">Demo y datos de muestra</Heading>
            <Text>Todo lo que ves son datos de muestra: las ofertas, los anunciantes, sus estadísticas, los destinos de pago y las tasas son ficticios o de referencia. La insignia «Demo · datos de muestra» del header lo señala en toda la app. Nada de lo mostrado constituye una oferta real ni un compromiso de compra o venta.</Text>
          </section>
          <section>
            <Heading level="h2">Privacidad</Heading>
            <Text>peetoo no pide ni guarda datos personales: no hay registro, inicio de sesión ni perfiles propios. La navegación no requiere identificarse y la app no recoge información de contacto, cuentas ni billeteras.</Text>
          </section>
          <section>
            <Heading level="h2">Compras con Swapped</Heading>
            <Text>La página de Swapped muestra el widget de un tercero (Swapped): sus términos, disponibilidad y funcionamiento son responsabilidad de Swapped. El lado Vender muestra su aviso porque Swapped tiene las ventas desactivadas temporalmente; peetoo no vende ni intermedia esas operaciones.</Text>
          </section>
          <section>
            <Heading level="h2">Responsabilidad</Heading>
            <Text>peetoo no custodia fondos, no ejecuta pagos y no ofrece asesoramiento financiero. Las tasas y precios de muestra no son cotizaciones en vivo ni una recomendación de compra o venta. Esta página puede actualizarse cuando el producto avance de fase.</Text>
          </section>
          <div className="info-back"><Button size="lg" onClick={goToMarket}>Volver al mercado</Button></div>
        </section>
      </main>
  );
}

export function GlossaryPage({ goToMarket }) {
  return (
      <main className="info-page">
        <section aria-label="Glosario">
          <Heading level="h1">Glosario</Heading>
          <Text tone="muted">Los términos del mercado P2P de peetoo, en pocas palabras.</Text>
          <dl>
            <dt>Anunciante</dt>
            <dd>Persona que publica una oferta de compra o venta. En la demo, todos los anunciantes son ficticios.</dd>
            <dt>Blockchain (red)</dt>
            <dd>Red sobre la que se mueve una crypto (BNB Chain, Polygon, Base, Arbitrum, Optimism). Cada oferta indica en qué redes opera el anunciante.</dd>
            <dt>Billetera</dt>
            <dd>Medio con el que una persona guarda y envía sus cryptos. peetoo no crea ni gestiona billeteras.</dd>
            <dt>Custodia</dt>
            <dd>Quién guarda los fondos mientras se completa un intercambio. La demo de peetoo no custodia ni mueve fondos reales.</dd>
            <dt>Disponible</dt>
            <dd>Cantidad de crypto que el anunciante ofrece en una oferta.</dd>
            <dt>Fiat</dt>
            <dd>Moneda de curso legal: CUP, USD, EUR, MXN y CAD en peetoo.</dd>
            <dt>KYC</dt>
            <dd>Verificación de identidad que algunas plataformas piden antes de operar. La demo no pide ninguna.</dd>
            <dt>Método de pago</dt>
            <dd>Medio con el que se paga la pata fiat: Efectivo, Transferencia Bancaria, PayPal, Zelle, Etecsa, Clásica, Qvapay o TropiPay. Cada oferta tiene uno solo.</dd>
            <dt>Min-Max</dt>
            <dd>Límites en fiat de una oferta: la cantidad mínima y máxima que acepta el anunciante.</dd>
            <dt>MLC</dt>
            <dd>En peetoo, el ticker de USD por Transferencia Bancaria, no una moneda aparte.</dd>
            <dt>Orden</dt>
            <dd>La compra o venta que se crea desde una oferta, con su cantidad, precio y método. En la demo, la orden es solo una confirmación de muestra.</dd>
            <dt>P2P</dt>
            <dd>Intercambio directo entre personas, sin una casa de cambio central que fije el precio.</dd>
            <dt>Precio</dt>
            <dd>Unidades de fiat por cada unidad de crypto en una oferta. En la demo parte de tasas de referencia, no de cotizaciones en vivo.</dd>
            <dt>Spread</dt>
            <dd>Diferencia entre el precio de compra y el de venta. En peetoo, la compra lleva una pequeña prima y la venta un pequeño descuento.</dd>
            <dt>Stablecoin</dt>
            <dd>Crypto diseñada para mantener paridad con una fiat: USDT, USAT, USDC, PYUSD, ZLUSD y OUSD siguen al dólar; EURC, al euro.</dd>
            <dt>Tasa informal</dt>
            <dd>Referencia del mercado no oficial de divisas en Cuba, como la que publica elTOQUE a partir de ofertas de compra y venta.</dd>
          </dl>
          <div className="info-back"><Button size="lg" onClick={goToMarket}>Volver al mercado</Button></div>
        </section>
      </main>
  );
}
