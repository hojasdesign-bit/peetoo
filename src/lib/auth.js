import { supabase } from './supabaseClient.js';

// Auth de Coob, aislada tras esta interfaz (decisión del 2026-11-08:
// login propio con Supabase Auth, sin OpenFort). Tres vías:
//   · Google (OAuth, redes sociales)
//   · Correo (magic link, sin contraseña)
//   · Wallet (SIWE — Sign-In with Ethereum, signInWithWeb3)
// Quien entra con Google o correo y no tiene wallet recibe su cuenta
// inteligente embebida con passkey; su provisión vive en la fase del
// Paymaster (ERC-4337) y su dirección quedará en walletAddress del
// perfil. Aquí solo se gestiona la sesión y la identidad.

function redirectUrl() {
  // Vuelve a la vista actual tras el OAuth / el enlace del correo.
  return window.location.origin + window.location.pathname;
}

export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

// Suscripción a cambios de sesión. Devuelve la función para cancelar.
export function onAuthChange(callback) {
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session);
  });
  return () => data.subscription.unsubscribe();
}

export async function signInWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: redirectUrl() },
  });
  if (error) throw error;
}

export async function signInWithEmail(email) {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: redirectUrl() },
  });
  if (error) throw error;
}

// Conectar la wallet = entrar con ella (SIWE). La librería usa
// window.ethereum, construye el mensaje EIP-4361 y pide la firma; la
// firma no mueve fondos ni paga gas. Sin wallet en el navegador, la
// librería devuelve error y la UI lo traduce.
export async function signInWithWallet() {
  if (!window.ethereum) {
    throw new Error('NO_WALLET');
  }
  const { data, error } = await supabase.auth.signInWithWeb3({
    chain: 'ethereum',
    statement: 'Entra a Coob con tu wallet. Esta firma no mueve fondos ni paga gas.',
  });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

// La dirección de la wallet del usuario, venga de su identidad web3 o
// de la cuenta embebida guardada en su perfil.
export function walletAddressOf(user) {
  if (!user) return null;
  if (user.user_metadata?.wallet_address) return user.user_metadata.wallet_address;
  const web3 = (user.identities || []).find((i) => i.provider === 'web3');
  return web3?.identity_data?.address || web3?.identity_data?.sub || null;
}

// Etiqueta corta para el header: el correo si entró por redes/correo,
// o la dirección acortada si entró con wallet.
export function userLabelOf(user) {
  if (!user) return '';
  if (user.email) return user.email;
  const address = walletAddressOf(user);
  return address ? shortAddress(address) : 'Mi cuenta';
}

export function shortAddress(address) {
  if (!address) return '';
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}
