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
import {
  createOrder,
  fetchOrder,
  updateOrder,
  fetchMessages,
  sendMessage,
  FINAL_ORDER_STATUSES,
} from '../lib/orders.js';
import { userLabelOf } from '../lib/auth.js';
import styles from './DivisaOrderView.module.css';

/**
 * Vista /divisa/orden — orden de divisa tomada desde el mercado.
 *
 * En Divisa NO hay garantía (escrow): la orden y su chat son reales
 * fuera de cadena (coob_orders / coob_messages, la misma capa que la
 * operación cripto), nacen a nombre de la cuenta conectada y el pago
 * se acuerda directamente con el anunciante en el chat. El tomador
 * marca el pago, confirma la recepción de la otra pata y al completar
 * valora al anunciante; la valoración queda guardada en la orden.
 */

const ORDER_KEY = 'coob:orden-activa-divisa';
const POLL_MS = 5000;

const STEPS = ['Orden tomada', 'Pago enviado', 'Completada'];
const STEP_INDEX = { created: 0, paid: 1, completed: 3, cancelled: 0 };

const PILL = {
  created: { status: 'pendiente', label: 'En curso' },
  paid: { status: 'pagado', label: 'Pago enviado' },
  completed: { status: 'completado' },
  cancelled: { status: 'cancelado' },
};

const numFmt = new Intl.NumberFormat('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
const rateFmt = new Intl.NumberFormat('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 4 });
const timeFmt = new Intl.DateTimeFormat('es-ES', { hour: '2-digit', minute: '2-digit' });
const msgTime = (iso) => timeFmt.format(new Date(iso));

/** Método de la pata que entrega el tomador y de la que recibe. */
function legMethods(offer, dasCode) {
  const dasIsBuy = dasCode === offer.buy_currency;
  return {
    dasMethod: dasIsBuy ? offer.buy_method : offer.sell_method,
    recibesMethod: dasIsBuy ? offer.sell_method : offer.buy_method,
  };
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

export default function DivisaOrderView({ offer, das, recibes, goToMarket, goToTrader, user, onRequireLogin }) {
  const propOffer = offer || defaultOffer();
  const defaults = defaultAmounts(propOffer);
  const propDas = das && Number(das.amount) > 0 ? das : defaults.das;
  const propRecibes = recibes && Number(recibes.amount) > 0 ? recibes : defaults.recibes;

  const takerLabel = user ? userLabelOf(user) : 'Contraparte';

  const [order, setOrder] = useState(null);
  const [orderError, setOrderError] = useState(false);
  const [messages, setMessages] = useState([]);
  const [bootKey, setBootKey] = useState(0);
  const [busy, setBusy] = useState(false);
  const [actionError, setActionError] = useState(null);
  const [draft, setDraft] = useState('');
  const [confirmingCancel, setConfirmingCancel] = useState(false);
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState('');
  const fileRef = useRef(null);
  const chatListRef = useRef(null);

  // La orden manda sobre lo pintado: la oferta se resuelve por su id
  // en el catálogo y las patas salen de la propia orden.
  const activeOffer = (order && DIVISA_OFFERS.find((o) => String(o.id) === String(order.offer_id))) || propOffer;
  const activeDas = order ? { amount: Number(order.crypto_amount), code: order.asset } : propDas;
  const activeRecibes = order ? { amount: Number(order.fiat_total), code: order.fiat_currency } : propRecibes;
  const { dasMethod, recibesMethod } = legMethods(activeOffer, activeDas.code);
  const takerRole = order ? order.taker_role : (activeDas.code === activeOffer.buy_currency ? 'seller' : 'buyer');
  const advertiserRole = takerRole === 'buyer' ? 'seller' : 'buyer';

  const trader = {
    name: activeOffer.advertiser_name,
    verified: activeOffer.advertiser_verified,
    verification: activeOffer.advertiser_premium ? 'premium' : 'standard',
    trades: activeOffer.advertiser_trades,
    completion: activeOffer.advertiser_completion,
  };

  const buildPayload = () => {
    const dasIsBuy = propDas.code === propOffer.buy_currency;
    const role = dasIsBuy ? 'seller' : 'buyer';
    const { dasMethod: dm } = legMethods(propOffer, propDas.code);
    return {
      segment: 'divisa',
      taker_user_id: user?.id || null,
      taker_label: takerLabel,
      offer_id: String(propOffer.id),
      advertiser: propOffer.advertiser_name,
      taker_role: role,
      seller_label: role === 'seller' ? takerLabel : propOffer.advertiser_name,
      buyer_label: role === 'buyer' ? takerLabel : propOffer.advertiser_name,
      asset: propDas.code,
      crypto_amount: propDas.amount,
      fiat_currency: propRecibes.code,
      rate: propOffer.price,
      fiat_total: propRecibes.amount,
      payment_method: dm,
      payment_window_seconds: 3600,
      fund_deadline: null,
      status: 'created',
      chain_id: null,
      contract: null,
      trade_id: null,
    };
  };

  const createFreshOrder = async () => {
    const created = await createOrder(buildPayload());
    if (!created) throw new Error('sin orden');
    try { window.localStorage.setItem(ORDER_KEY, created.id); } catch { /* sin almacenamiento */ }
    await sendMessage(
      created.id,
      'system',
      `Orden tomada. En Divisa no hay garantía: acuerda el pago directamente con ${created.advertiser} en este chat.`,
      'system',
    ).catch(() => null);
    const advRole = created.taker_role === 'buyer' ? 'seller' : 'buyer';
    await sendMessage(
      created.id,
      advRole,
      `Hola, gracias por tomar mi oferta. Puedes entregarme los ${numFmt.format(created.crypto_amount)} ${created.asset} por ${created.payment_method}. Cuando lo hagas, pulsa «Marcar como pagado» y confírmame aquí la recepción.`,
      'text',
    ).catch(() => null);
    return created;
  };

  // Arranque: retoma la orden guardada si sigue abierta y es de esta
  // cuenta; si no, crea una. Sin sesión no se crea ni se retoma nada.
  useEffect(() => {
    if (!user) return undefined;
    let cancelled = false;
    (async () => {
      try {
        setOrderError(false);
        let savedId = null;
        try { savedId = window.localStorage.getItem(ORDER_KEY); } catch { /* sin almacenamiento */ }
        const existing = savedId ? await fetchOrder(savedId).catch(() => null) : null;
        if (cancelled) return;
        if (
          existing
          && existing.segment === 'divisa'
          && existing.taker_user_id === user.id
          && !FINAL_ORDER_STATUSES.includes(existing.status)
        ) {
          setOrder(existing);
          return;
        }
        const created = await createFreshOrder();
        if (!cancelled) setOrder(created);
      } catch {
        if (!cancelled) setOrderError(true);
      }
    })();
    return () => { cancelled = true; };
    // Al montar, al reintentar y cuando la sesión llega.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bootKey, user]);

  // Sondeo de la orden y su chat cada 5 s, pausado en segundo plano
  // (Modern Web Guidance: efficient-background-processing).
  useEffect(() => {
    if (!order?.id) return undefined;
    const orderId = order.id;
    let cancelled = false;
    let timer = null;
    const load = async () => {
      try {
        const [fresh, msgs] = await Promise.all([
          fetchOrder(orderId).catch(() => null),
          fetchMessages(orderId).catch(() => null),
        ]);
        if (cancelled) return;
        if (fresh) setOrder(fresh);
        if (msgs) setMessages(msgs);
      } catch { /* el siguiente sondeo reintenta */ }
    };
    load();
    const tick = () => {
      if (!document.hidden) load();
      timer = window.setTimeout(tick, POLL_MS);
    };
    timer = window.setTimeout(tick, POLL_MS);
    return () => { cancelled = true; if (timer) window.clearTimeout(timer); };
  }, [order?.id]);

  useEffect(() => {
    const el = chatListRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  const reloadMessages = async (orderId) => {
    const msgs = await fetchMessages(orderId).catch(() => null);
    if (msgs) setMessages(msgs);
  };

  const transition = async (patch, systemText) => {
    if (!order || busy) return;
    setBusy(true);
    setActionError(null);
    try {
      const updated = await updateOrder(order.id, patch);
      if (updated) setOrder(updated);
      if (systemText) {
        await sendMessage(order.id, 'system', systemText, 'system').catch(() => null);
        await reloadMessages(order.id);
      }
    } catch {
      setActionError('No se pudo guardar el cambio. Revisa tu conexión e inténtalo de nuevo.');
    } finally {
      setBusy(false);
    }
  };

  const markPaid = () => transition(
    { status: 'paid' },
    `Pago de ${numFmt.format(activeDas.amount)} ${activeDas.code} por ${dasMethod} marcado. Cuando recibas los ${numFmt.format(activeRecibes.amount)} ${activeRecibes.code}, confírmalo aquí.`,
  );

  const confirmReceived = () => transition(
    { status: 'completed' },
    'Recepción confirmada. Orden completada: valora a tu contraparte para cerrar el flujo.',
  );

  const cancelOrder = () => {
    setConfirmingCancel(false);
    transition(
      { status: 'cancelled' },
      'Orden cancelada antes de marcar el pago. No se entregó ningún importe.',
    );
  };

  const startNewOrder = async () => {
    try { window.localStorage.removeItem(ORDER_KEY); } catch { /* sin almacenamiento */ }
    setOrder(null);
    setMessages([]);
    setStars(0);
    setComment('');
    setConfirmingCancel(false);
    setBootKey((k) => k + 1);
  };

  const submitRating = async () => {
    if (!order || !stars || busy) return;
    setBusy(true);
    setActionError(null);
    try {
      const updated = await updateOrder(order.id, {
        rating_stars: stars,
        rating_comment: comment.trim() || null,
        rated_at: new Date().toISOString(),
      });
      if (updated) setOrder(updated);
    } catch {
      setActionError('No se pudo guardar la valoración. Inténtalo de nuevo.');
    } finally {
      setBusy(false);
    }
  };

  const sendChat = async () => {
    const text = draft.trim();
    if (!text || !order) return;
    setDraft('');
    const sent = await sendMessage(order.id, takerRole, text, 'text').catch(() => null);
    if (sent) setMessages((m) => [...m, sent]);
  };

  const onAttachFile = async (e) => {
    const file = e.target.files && e.target.files[0];
    e.target.value = '';
    if (!file || !order) return;
    const sent = await sendMessage(order.id, takerRole, `Comprobante adjunto: ${file.name}`, 'attachment').catch(() => null);
    if (sent) setMessages((m) => [...m, sent]);
  };

  if (!user) {
    return (
      <main className="shell">
        <div className={styles.head}>
          <div>
            <Heading level="h1">Orden de divisa</Heading>
            <Text tone="muted">Las órdenes viven en tu cuenta de Coob.</Text>
          </div>
          <Button variant="ghost" size="sm" onClick={goToMarket}>Volver al mercado</Button>
        </div>
        <Card>
          <div className={styles.actions}>
            <Text>
              Para tomar una orden necesitas entrar con tu cuenta: la orden y su chat quedan
              guardados a tu nombre, no en este navegador.
            </Text>
            <Button size="lg" onClick={onRequireLogin}>Entrar a Coob</Button>
          </div>
        </Card>
      </main>
    );
  }

  const status = order?.status || 'created';
  const pill = PILL[status];
  const chatClosed = status === 'completed' || status === 'cancelled';

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

      {!order && !orderError && (
        <Card>
          <Text tone="muted">Creando tu orden…</Text>
        </Card>
      )}
      {orderError && (
        <Card>
          <div className={styles.actions}>
            <Alert variant="danger" title="No se pudo abrir la orden">
              El servidor de órdenes no respondió. Tu cuenta está bien; es la conexión con las órdenes.
            </Alert>
            <Button variant="secondary" onClick={() => setBootKey((k) => k + 1)}>Reintentar</Button>
          </div>
        </Card>
      )}

      {order && (
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
                  { label: 'Cuenta', value: takerLabel },
                  { label: 'Referencia', value: `DIV-${activeOffer.id}` },
                ]}
                total={`${numFmt.format(activeRecibes.amount)} ${activeRecibes.code}`}
              />
            </Card>

            <Card>
              <Heading level="h3" className={styles.cardTitle}>Progreso</Heading>
              <StepProgress steps={STEPS} current={STEP_INDEX[status]} />
            </Card>

            {status === 'completed' && (
              <Panel title={`Valorar a ${activeOffer.advertiser_name}`}>
                {order.rating_stars ? (
                  <div className={styles.actions}>
                    <RatingStars value={order.rating_stars} size={26} />
                    <Text>
                      Valoraste a {activeOffer.advertiser_name} con {order.rating_stars} de 5.
                      {order.rating_comment ? ` «${order.rating_comment}»` : ''}
                    </Text>
                    <Text tone="muted">Tu valoración quedó guardada en la orden y suma a su reputación.</Text>
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
                    <Button size="lg" disabled={!stars || busy} loading={busy} onClick={submitRating}>Enviar valoración</Button>
                  </div>
                )}
              </Panel>
            )}

            <Card>
              <div className={styles.actions}>
                {actionError && (
                  <Alert variant="danger" title="Algo falló">
                    {actionError}
                  </Alert>
                )}
                {status === 'created' && !confirmingCancel && (
                  <>
                    <Button size="lg" loading={busy} onClick={markPaid}>Marcar como pagado</Button>
                    <Text size="body-sm" tone="muted">
                      Pulsa solo cuando hayas entregado los {numFmt.format(activeDas.amount)} {activeDas.code} por {dasMethod}.
                      En Divisa no hay garantía que retenga los fondos: la reputación del anunciante es la protección.
                    </Text>
                    <Button variant="ghost" size="sm" className={styles.resetBtn} onClick={() => setConfirmingCancel(true)}>
                      Cancelar orden
                    </Button>
                  </>
                )}
                {status === 'created' && confirmingCancel && (
                  <>
                    <Alert variant="warning" title="¿Cancelar esta orden?">
                      Todavía no marcas el pago; si ya entregaste el dinero,
                      no la canceles: espera la confirmación en el chat.
                    </Alert>
                    <div className={styles.confirmButtons}>
                      <Button variant="danger" loading={busy} onClick={cancelOrder}>Sí, cancelar</Button>
                      <Button variant="secondary" onClick={() => setConfirmingCancel(false)}>Seguir con la orden</Button>
                    </div>
                  </>
                )}
                {status === 'paid' && (
                  <>
                    <Button size="lg" loading={busy} onClick={confirmReceived}>Confirmar recepción</Button>
                    <Text size="body-sm" tone="muted">
                      Confirma solo cuando tengas los {numFmt.format(activeRecibes.amount)} {activeRecibes.code} en tu mano
                      o en tu cuenta, nunca por una captura en el chat.
                    </Text>
                  </>
                )}
                {status === 'completed' && (
                  <Text>Orden completada. Recibiste {numFmt.format(activeRecibes.amount)} {activeRecibes.code}.</Text>
                )}
                {status === 'cancelled' && (
                  <>
                    <Alert variant="danger" title="Orden cancelada">
                      No se entregó ningún pago.
                    </Alert>
                    <Button variant="secondary" onClick={goToMarket}>Volver al mercado</Button>
                  </>
                )}
                <Text size="body-sm" tone="muted" className={styles.note}>
                  Orden y chat reales, guardados en tu cuenta ({takerLabel}). El pago se entrega
                  fuera de la plataforma: Coob no retiene fondos en Divisa.
                </Text>
                {(status === 'completed' || status === 'cancelled') && (
                  <Button variant="ghost" size="sm" onClick={startNewOrder} className={styles.resetBtn}>
                    Nueva orden
                  </Button>
                )}
              </div>
            </Card>
          </div>

          <Panel title={`Chat con ${activeOffer.advertiser_name}`} className={styles.chatPanel}>
            <div
              className={styles.chatList}
              ref={chatListRef}
              role="log"
              aria-live="polite"
              aria-label="Mensajes de la orden"
            >
              {messages.map((m, i) => {
                if (m.kind === 'system' || m.author === 'system') {
                  return (
                    <ChatMessage key={m.id} variant="system" time={msgTime(m.created_at)}>
                      {m.body}
                    </ChatMessage>
                  );
                }
                const own = m.author === takerRole;
                return (
                  <ChatMessage
                    key={m.id}
                    variant={own ? 'outgoing' : 'incoming'}
                    author={own ? 'Tú' : activeOffer.advertiser_name}
                    time={msgTime(m.created_at)}
                    status={own ? 'sent' : undefined}
                    className={i === messages.length - 1 ? styles.lastMsg : undefined}
                  >
                    {m.body}
                  </ChatMessage>
                );
              })}
            </div>
            <ChatComposer
              value={draft}
              onChange={setDraft}
              onSend={sendChat}
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
      )}
    </main>
  );
}
