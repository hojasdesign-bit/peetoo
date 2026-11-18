/**
 * Órdenes y chat fuera de cadena del P2P de Coob (Supabase).
 *
 * La orden nace al tomar la oferta en `coob_orders` y su conversación
 * vive en `coob_messages`: es la capa previa al escrow en cadena. El
 * contrato solo mueve dinero (importes, plazos, estados); la evidencia
 * de la operación — el chat — queda aquí, y el árbitro la lee en solo
 * lectura cuando una disputa enlaza la orden por (chain_id, contract,
 * trade_id). Acceso por PostgREST con la clave publishable, la misma
 * que lee `coob_trades` en escrow.js (pública por diseño; RLS
 * desactivado en esta fase demo/testnet).
 */

const SUPABASE_URL = 'https://lbmgxxdfjmdaclkwafwr.supabase.co';
const SUPABASE_KEY = 'sb_publishable_cP7575TvmywhsloihY4zeg_b4V0Ipcj';

const HEADERS = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
};

/** Estados desde los que la orden ya no avanza. */
export const FINAL_ORDER_STATUSES = ['completed', 'cancelled', 'expired'];

async function read(path, signal) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    headers: HEADERS,
    // Lectura de fondo: no compite con lo que el usuario está haciendo
    // (Modern Web Guidance: deprioritize-background-fetches).
    priority: 'low',
    signal,
  });
  if (!res.ok) throw new Error(`coob: HTTP ${res.status}`);
  return res.json();
}

async function write(path, { method, body, prefer }) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    method,
    headers: {
      ...HEADERS,
      'Content-Type': 'application/json',
      ...(prefer ? { Prefer: prefer } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`coob: HTTP ${res.status}`);
  if (res.status === 204) return null;
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

/** Crea la orden con la foto de la oferta; devuelve la fila creada. */
export async function createOrder(payload) {
  const rows = await write('coob_orders', {
    method: 'POST',
    body: payload,
    prefer: 'return=representation',
  });
  return rows?.[0] ?? null;
}

/** Una orden por su id (o null si no existe). */
export async function fetchOrder(id, signal) {
  if (!id) return null;
  const rows = await read(`coob_orders?id=eq.${encodeURIComponent(id)}&limit=1`, signal);
  return rows[0] ?? null;
}

/** Aplica cambios a la orden (estado, disputa…) y devuelve la fila. */
export async function updateOrder(id, patch) {
  const rows = await write(`coob_orders?id=eq.${encodeURIComponent(id)}`, {
    method: 'PATCH',
    body: { ...patch, updated_at: new Date().toISOString() },
    prefer: 'return=representation',
  });
  return rows?.[0] ?? null;
}

/** Mensajes de la orden, del más antiguo al más reciente. */
export async function fetchMessages(orderId, signal) {
  return read(
    `coob_messages?order_id=eq.${encodeURIComponent(orderId)}&order=id.asc&select=id,order_id,created_at,author,kind,body`,
    signal,
  );
}

/** Escribe un mensaje (de una parte, del sistema o un adjunto). */
export async function sendMessage(orderId, author, body, kind = 'text') {
  const rows = await write('coob_messages', {
    method: 'POST',
    body: { order_id: orderId, author, body, kind },
    prefer: 'return=representation',
  });
  return rows?.[0] ?? null;
}

/**
 * La orden enlazada a una operación en cadena, para el panel del
 * árbitro. Devuelve null si la operación no tiene orden asociada
 * (p. ej. las operaciones de testnet creadas a mano).
 */
export async function fetchOrderByTrade(chainId, contract, tradeId, signal) {
  const rows = await read(
    `coob_orders?chain_id=eq.${chainId}&contract=eq.${encodeURIComponent(contract)}&trade_id=eq.${tradeId}&limit=1`,
    signal,
  );
  return rows[0] ?? null;
}
