import React, { useEffect, useRef, useState } from 'react';
import { Heading } from '../ds/components/Heading/Heading.jsx';
import { Text } from '../ds/components/Text/Text.jsx';
import { Card } from '../ds/components/Card/Card.jsx';
import { Panel } from '../ds/components/Panel/Panel.jsx';
import { Button } from '../ds/components/Button/Button.jsx';
import { Alert } from '../ds/components/Alert/Alert.jsx';
import { StepProgress } from '../ds/components/StepProgress/StepProgress.jsx';
import { TradeStatusPill } from '../ds/components/TradeStatusPill/TradeStatusPill.jsx';
import { OrderSummary } from '../ds/components/OrderSummary/OrderSummary.jsx';
import { TraderCell } from '../ds/components/TraderCell/TraderCell.jsx';
import { ChatMessage } from '../ds/components/ChatMessage/ChatMessage.jsx';
import { ChatComposer } from '../ds/components/ChatComposer/ChatComposer.jsx';
import { RatingStars } from '../ds/components/RatingStars/RatingStars.jsx';
import { Textarea } from '../ds/components/Textarea/Textarea.jsx';
import { DIVISA_OFFERS } from '../data/divisaOffers.js';
import styles from './DivisaOrderView.module.css';

/**
 * Vista /divisa/orden — orden de divisa tomada desde el mercado.
 *
 * En Divisa NO hay garantía (escrow): al tomar la orden se abre el
 * chat directo con el anunciante, se acuerda y se entrega el pago
 * fuera de la plataforma, y al completarse el tomador valora al
 * anunciante (la valoración alimenta su reputación).
 *
 * Flujo demo local persistido en localStorage (`coob:orden-divisa`):
 * acordando → pagada → completada (la confirmación de la contraparte
 * se simula a los pocos segundos de marcar el pago), o cancelada.
 * Las valoraciones se guardan además en `coob:valoraciones`.
 */

const STORAGE_KEY = 'coob:orden-divisa';
const RATINGS_KEY = 'coob:valoraciones';
const CONFIRM_DELAY_MS = 4000;

const STEPS = ['Orden tomada', 'Pago enviado', 'Completada'];
const STEP_INDEX = { acordando: 0, pagada: 1, completada: 3, cancelada: 0 };

const PILL = {
  acordando: { status: 'pendiente', label: 'En curso' },
  pagada: { status: 'pagado', label: 'Pago enviado' },
  completada: { status: 'completado' },
  cancelada: { status: 'cancelado' },
};

const numFmt = new Intl.NumberFormat('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
const rateFmt = new Intl.NumberFormat('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 4 });
const timeFmt = new Intl.DateTimeFormat('es-ES', { hour: '2-digit', minute: '2-digit' });

const nowTime = () => timeFmt.format(new Date());
const newId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
const systemMsg = (text) => ({ id: newId(), kind: 'system', text, time: nowTime() });
const chatMsg = (from, text) => ({ id: newId(), kind: 'chat', from, text, time: nowTime() });

/** Método de la pata que entrega el tomador y de la que recibe. */
function legMethods(offer, dasCode) {
  const dasIsBuy = dasCode === offer.buy_currency;
  return {
    dasMethod: dasIsBuy ? offer.buy_method : offer.sell_method,
    recibesMethod: dasIsBuy ? offer.sell_method : offer.buy_method,
  };
}

function freshOrder(offer, das, recibes) {
  const { dasMethod } = legMethods(offer, das.code);
  return {
    offerId: offer.id,
    das,
    recibes,
    status: 'acordando',
    confirmAt: 0,
    rated: null,
    messages: [
      systemMsg(`Orden tomada. En Divisa no hay garantía: acuerda el pago directamente con ${offer.advertiser_name} en este chat.`),
      chatMsg('anunciante', `Hola, gracias por tomar mi oferta. Puedes entregarme los ${numFmt.format(das.amount)} ${das.code} por ${dasMethod}. Cuando lo hagas, pulsa «Marcar como pagado» y te confirmo la recepción aquí mismo.`),
    ],
  };
}

function loadOrder(offer, das, recibes) {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return freshOrder(offer, das, recibes);
    const parsed = JSON.parse(raw);
    const sameOrder = parsed
      && parsed.offerId === offer.id
      && parsed.das && parsed.recibes
      && Number(parsed.das.amount) === Number(das.amount)
      && Number(parsed.recibes.amount) === Number(recibes.amount)
      && (parsed.status in STEP_INDEX)
      && Array.isArray(parsed.messages);
    return sameOrder ? parsed : freshOrder(offer, das, recibes);
  } catch {
    return freshOrder(offer, das, recibes);
  }
}

const defaultOffer = () => DIVISA_OFFERS[0];

function defaultAmounts(offer) {
  // Sin paso por el modal: el tomador entrega 100 de la pata que el
  // anunciante quiere recibir según el lado de su oferta.
  if (offer.side === 'buy') {
    return {
      das: { amount: 100, code: offer.buy_currency },
      recibes: { amount: Math.round(100 * offer.price * 100) / 100, code: offer.sell_currency },
    };
  }
  return {
    das: { amount: 100, code: offer.sell_currency },
    recibes: { amount: Math.round((100 / offer.price) * 100) / 100, code: offer.buy_currency },
  };
}

export default function DivisaOrderView({ offer, das, recibes, goToMarket, goToTrader }) {
  // Con paso por el modal mandan la oferta y las patas recibidas. Sin
  // él (recarga o enlace directo), se restaura la orden guardada con
  // sus importes; si no hay ninguna, una por defecto.
  const explicit = Boolean(offer && das && recibes);
  const [stored] = useState(() => {
    try { return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || 'null'); } catch { return null; }
  });
  const storedOffer = !explicit && stored ? DIVISA_OFFERS.find((o) => o.id === stored.offerId) : null;
  const activeOffer = offer || storedOffer || defaultOffer();
  const defaults = defaultAmounts(activeOffer);
  const activeDas = das && Number(das.amount) > 0 ? das : (storedOffer ? stored.das : defaults.das);
  const activeRecibes = recibes && Number(recibes.amount) > 0 ? recibes : (storedOffer ? stored.recibes : defaults.recibes);
  const { dasMethod, recibesMethod } = legMethods(activeOffer, activeDas.code);

  const trader = {
    name: activeOffer.advertiser_name,
    verified: activeOffer.advertiser_verified,
    verification: activeOffer.advertiser_premium ? 'premium' : 'standard',
    trades: activeOffer.advertiser_trades,
    completion: activeOffer.advertiser_completion,
  };

  const [order, setOrder] = useState(() => loadOrder(activeOffer, activeDas, activeRecibes));
  const [draft, setDraft] = useState('');
  const [confirmingCancel, setConfirmingCancel] = useState(false);
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState('');
  const fileRef = useRef(null);
  const chatListRef = useRef(null);

  useEffect(() => {
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(order)); } catch { /* sin almacenamiento */ }
  }, [order]);

  useEffect(() => {
    const el = chatListRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [order.messages]);

  // Confirmación simulada de la contraparte: al marcar el pago, el
  // anunciante confirma la recepción a los pocos segundos.
  useEffect(() => {
    if (order.status !== 'pagada') return undefined;
    const wait = Math.max(0, (order.confirmAt || 0) - Date.now());
    const t = window.setTimeout(() => {
      setOrder((o) => (o.status !== 'pagada' ? o : {
        ...o,
        status: 'completada',
        messages: [
          ...o.messages,
          chatMsg('anunciante', '¡Recibido! Todo correcto. Gracias por el cambio.'),
          systemMsg('Orden completada. Valora a tu contraparte para cerrar el flujo.'),
        ],
      }));
    }, wait);
    return () => window.clearTimeout(t);
  }, [order.status, order.confirmAt]);

  const sendMessage = () => {
    const text = draft.trim();
    if (!text) return;
    setDraft('');
    setOrder((o) => ({ ...o, messages: [...o.messages, chatMsg('tu', text)] }));
  };

  const onAttachFile = (e) => {
    const file = e.target.files && e.target.files[0];
    e.target.value = '';
    if (!file) return;
    setOrder((o) => ({ ...o, messages: [...o.messages, chatMsg('tu', `Comprobante adjunto: ${file.name}`)] }));
  };

  const markPaid = () =>
    setOrder((o) => ({
      ...o,
      status: 'pagada',
      confirmAt: Date.now() + CONFIRM_DELAY_MS,
      messages: [...o.messages, systemMsg(`Marcaste el pago de ${numFmt.format(activeDas.amount)} ${activeDas.code} por ${dasMethod}. Esperando la confirmación de ${activeOffer.advertiser_name}.`)],
    }));

  const cancelOrder = () => {
    setConfirmingCancel(false);
    setOrder((o) => ({
      ...o,
      status: 'cancelada',
      messages: [...o.messages, systemMsg('Orden cancelada. No se entregó ningún pago.')],
    }));
  };

  const submitRating = () => {
    if (!stars) return;
    const rating = { stars, comment: comment.trim() };
    try {
      const all = JSON.parse(window.localStorage.getItem(RATINGS_KEY) || '[]');
      all.push({ advertiser: activeOffer.advertiser_name, offerId: activeOffer.id, ...rating, at: new Date().toISOString() });
      window.localStorage.setItem(RATINGS_KEY, JSON.stringify(all));
    } catch { /* sin almacenamiento */ }
    setOrder((o) => ({ ...o, rated: rating }));
  };

  const resetDemo = () => {
    try { window.localStorage.removeItem(STORAGE_KEY); } catch { /* sin almacenamiento */ }
    setStars(0);
    setComment('');
    setConfirmingCancel(false);
    setOrder(freshOrder(activeOffer, activeDas, activeRecibes));
  };

  const pill = PILL[order.status];
  const chatClosed = order.status === 'completada' || order.status === 'cancelada';

  return (
    <main className="shell">
        <div className={styles.head}>
          <div>
            <Heading level="h1">Orden de divisa</Heading>
            <Text tone="muted">
              Sin garantía: chat directo con el anunciante y valoración al completar.
            </Text>
          </div>
          <Button variant="ghost" size="sm" onClick={goToMarket}>Volver al mercado</Button>
        </div>

        <div className={styles.grid}>
          <div className={styles.col}>
            <Card>
              <div className={styles.cardHead}>
                <TraderCell
                  trader={trader}
                  href={`/crypto/perfil/${activeOffer.advertiser_name}`}
                  onClick={goToTrader ? (e) => { e.preventDefault(); goToTrader(activeOffer.advertiser_name); } : undefined}
                />
                <TradeStatusPill status={pill.status} label={pill.label} />
              </div>
              <OrderSummary
                title="Resumen de la orden"
                rows={[
                  { label: 'Das', value: `${numFmt.format(activeDas.amount)} ${activeDas.code} · ${dasMethod}` },
                  { label: 'Recibes', value: `${numFmt.format(activeRecibes.amount)} ${activeRecibes.code} · ${recibesMethod}` },
                  { label: 'Tasa', value: `1 ${activeOffer.buy_currency} = ${rateFmt.format(activeOffer.price)} ${activeOffer.sell_currency}` },
                  { label: 'Garantía', value: 'Sin garantía · acuerdo directo' },
                  { label: 'Referencia', value: `DIV-${activeOffer.id}` },
                ]}
                total={`${numFmt.format(activeRecibes.amount)} ${activeRecibes.code}`}
              />
            </Card>

            <Card>
              <Heading level="h3" className={styles.cardTitle}>Progreso</Heading>
              <StepProgress steps={STEPS} current={STEP_INDEX[order.status]} />
            </Card>

            {order.status === 'completada' && (
              <Panel title={`Valorar a ${activeOffer.advertiser_name}`}>
                {order.rated ? (
                  <div className={styles.actions}>
                    <RatingStars value={order.rated.stars} size={26} />
                    <Text>
                      Valoraste a {activeOffer.advertiser_name} con {order.rated.stars} de 5.
                      {order.rated.comment ? ` «${order.rated.comment}»` : ''}
                    </Text>
                    <Text tone="muted">Tu valoración quedó registrada y suma a su reputación.</Text>
                  </div>
                ) : (
                  <div className={styles.actions}>
                    <Text tone="muted">¿Cómo fue el cambio con {activeOffer.advertiser_name}?</Text>
                    <RatingStars value={stars} size={30} onRate={setStars} />
                    <Textarea
                      label="Comentario (opcional)"
                      rows={3}
                      placeholder="Puntual, buen trato, pago rápido…"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <Button size="lg" disabled={!stars} onClick={submitRating}>Enviar valoración</Button>
                  </div>
                )}
              </Panel>
            )}

            <Card>
              <div className={styles.actions}>
                {order.status === 'acordando' && !confirmingCancel && (
                  <>
                    <Button size="lg" onClick={markPaid}>Marcar como pagado</Button>
                    <Text size="body-sm" tone="muted">
                      Pulsa solo cuando hayas entregado los {numFmt.format(activeDas.amount)} {activeDas.code} por {dasMethod}.
                      En Divisa no hay garantía que retenga los fondos: la reputación del anunciante es la protección.
                    </Text>
                    <Button variant="ghost" size="sm" className={styles.resetBtn} onClick={() => setConfirmingCancel(true)}>
                      Cancelar orden
                    </Button>
                  </>
                )}
                {order.status === 'acordando' && confirmingCancel && (
                  <>
                    <Alert variant="warning" title="¿Cancelar esta orden?">
                      Todavía no marcas el pago; si ya entregaste el dinero,
                      no la canceles: espera la confirmación en el chat.
                    </Alert>
                    <div className={styles.confirmButtons}>
                      <Button variant="danger" onClick={cancelOrder}>Sí, cancelar</Button>
                      <Button variant="secondary" onClick={() => setConfirmingCancel(false)}>Seguir con la orden</Button>
                    </div>
                  </>
                )}
                {order.status === 'pagada' && (
                  <>
                    <Button size="lg" loading>Esperando confirmación…</Button>
                    <Text size="body-sm" tone="muted">
                      {activeOffer.advertiser_name} está verificando la recepción de tu pago.
                    </Text>
                  </>
                )}
                {order.status === 'completada' && (
                  <Text>Operación completada. Recibiste {numFmt.format(activeRecibes.amount)} {activeRecibes.code}.</Text>
                )}
                {order.status === 'cancelada' && (
                  <>
                    <Alert variant="danger" title="Orden cancelada">
                      No se entregó ningún pago.
                    </Alert>
                    <Button variant="secondary" onClick={goToMarket}>Volver al mercado</Button>
                  </>
                )}
                <Text size="body-sm" tone="muted" className={styles.note}>
                  Flujo demo con datos de muestra: el chat y la confirmación son locales,
                  y la valoración se guarda en este navegador.
                </Text>
                <Button variant="ghost" size="sm" onClick={resetDemo} className={styles.resetBtn}>
                  Reiniciar demo
                </Button>
              </div>
            </Card>
          </div>

          <Panel title={`Chat con ${activeOffer.advertiser_name}`} className={styles.chatPanel}>
            <div className={styles.chatList} ref={chatListRef}>
              {order.messages.map((m) => {
                if (m.kind === 'system') {
                  return (
                    <ChatMessage key={m.id} variant="system" time={m.time}>
                      {m.text}
                    </ChatMessage>
                  );
                }
                const own = m.from === 'tu';
                return (
                  <ChatMessage
                    key={m.id}
                    variant={own ? 'outgoing' : 'incoming'}
                    author={own ? 'Tú' : activeOffer.advertiser_name}
                    time={m.time}
                    status={own ? 'sent' : undefined}
                  >
                    {m.text}
                  </ChatMessage>
                );
              })}
            </div>
            <ChatComposer
              value={draft}
              onChange={setDraft}
              onSend={sendMessage}
              onAttach={() => fileRef.current?.click()}
              placeholder={chatClosed ? 'La orden está cerrada' : 'Escribe un mensaje…'}
            />
            <input
              ref={fileRef}
              type="file"
              accept="image/*,.pdf"
              hidden
              onChange={onAttachFile}
              aria-hidden="true"
              tabIndex={-1}
            />
          </Panel>
        </div>
    </main>
  );
}
