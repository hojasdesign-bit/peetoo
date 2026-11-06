import React from 'react';
import { SegmentedControl } from '../ds/components/SegmentedControl/SegmentedControl.jsx';
import QvapayWidget from '../components/QvapayWidget.jsx';

// Variantes del flujo de selección del destinatario en el widget de
// QvaPay. Página solo para debugear: no está enlazada en el header,
// se entra por /crypto/qvapay/debug. Cada cambio de variante reinicia
// el widget (key), así cada flujo empieza desde el paso 1.
const VARIANTS = [
  {
    id: 'list',
    label: 'Lista',
    description: 'Los contactos guardados se muestran como una lista; el formulario solo aparece al elegir «Otra persona».',
  },
  {
    id: 'select',
    label: 'Select',
    description: 'El destinatario es un select que abre el panel; el formulario solo aparece al elegir «Otra persona».',
  },
  {
    id: 'or',
    label: 'Select + «o»',
    description: 'El select arriba y el formulario siempre visible abajo, separados por la línea «o»; gana la última acción, sin auto-avance.',
  },
];

export default function QvapayDebugView() {
  const [variant, setVariant] = React.useState('list');
  const current = VARIANTS.find((v) => v.id === variant) || VARIANTS[2];
  return (
    <main className="qv-debug">
      <h1 className="qv-debug-title">QvaPay · Debug del destinatario</h1>
      <p className="qv-debug-sub">Página de pruebas, no enlazada en el header. Cada cambio de variante reinicia el widget.</p>
      <SegmentedControl
        className="qv-debug-seg"
        ariaLabel="Flujo de selección del destinatario"
        options={VARIANTS.map((v) => ({ value: v.id, label: v.label }))}
        value={variant}
        onChange={setVariant}
      />
      <p className="qv-debug-desc">{current.description}</p>
      <QvapayWidget key={variant} variant={variant} />
    </main>
  );
}
