import React from 'react';
import { Button } from '../ds/components/Button/Button.jsx';
import { signInWithGoogle, signInWithEmail, signInWithWallet } from '../lib/auth.js';

// Modal de acceso con el patrón de Privy (referente de Adrián):
// correo primero, después redes sociales, al final la wallet; quien
// entra sin wallet recibe la suya embebida en la cuenta. Dialog
// nativo: foco contenido, Esc y clic fuera cierran, página inerte.
export function AuthModal({ open, onClose }) {
  const dialogRef = React.useRef(null);
  const [email, setEmail] = React.useState('');
  const [sentTo, setSentTo] = React.useState('');
  const [busy, setBusy] = React.useState(''); // 'google' | 'email' | 'wallet'
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open ]);

  // Al reabrir, el modal vuelve a su estado inicial.
  React.useEffect(() => {
    if (open) {
      setSentTo('');
      setError('');
      setBusy('');
    }
  }, [open ]);

  const fail = (err) => {
    setBusy('');
    if (err?.message === 'NO_WALLET') {
      setError('No detectamos una wallet en este navegador. Instala MetaMask o entra con Google o tu correo.');
    } else if (err?.status === 429 || /rate limit/i.test(err?.message || '')) {
      setError('Demasiados intentos seguidos. Espera unos minutos y vuelve a intentarlo.');
    } else if (err?.code === 4001 || /rejected|denied|rechaz/i.test(err?.message || '')) {
      setError('Rechazaste la firma en tu wallet. Sin firma no hay acceso.');
    } else {
      setError('Algo salió mal. Inténtalo de nuevo.');
    }
  };

  const handleGoogle = async () => {
    setError('');
    setBusy('google');
    try {
      await signInWithGoogle(); // Redirige a Google; al volver hay sesión.
    } catch (err) {
      fail(err);
    }
  };

  const handleWallet = async () => {
    setError('');
    setBusy('wallet');
    try {
      await signInWithWallet();
      onClose();
    } catch (err) {
      fail(err);
    }
  };

  const handleEmail = async (event) => {
    event.preventDefault();
    const value = email.trim();
    if (!value) return;
    setError('');
    setBusy('email');
    try {
      await signInWithEmail(value);
      setSentTo(value);
      setBusy('');
    } catch (err) {
      fail(err);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="auth-dialog"
      closedby="any"
      aria-labelledby="auth-title"
      onClose={onClose}
    >
      <div className="auth-card">
        <div className="auth-head">
          <h2 id="auth-title" className="auth-title">Entrar a Coob</h2>
          <button type="button" className="auth-close" aria-label="Cerrar" onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {sentTo ? (
          <div className="auth-sent">
            <p className="auth-text">
              Te enviamos un enlace de acceso a <strong>{sentTo}</strong>.
              Ábrelo en este dispositivo para entrar. El enlace caduca en una hora.
            </p>
            <Button variant="secondary" size="lg" fullWidth onClick={() => setSentTo('')}>
              Usar otro correo
            </Button>
          </div>
        ) : (
          <>
            <form className="auth-form" onSubmit={handleEmail}>
              <label className="auth-label" htmlFor="auth-email">Correo electrónico</label>
              <input
                id="auth-email"
                className="auth-input"
                type="email"
                autoComplete="email"
                placeholder="tu@correo.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <Button type="submit" variant="primary" size="lg" fullWidth loading={busy === 'email'} disabled={busy !== '' || !email.trim()}>
                Continuar
              </Button>
            </form>

            <div className="auth-divider" aria-hidden="true"><span>o</span></div>

            <Button variant="secondary" size="lg" fullWidth loading={busy === 'google'} disabled={busy !== ''} onClick={handleGoogle}>
              Continuar con Google
            </Button>
            <Button variant="secondary" size="lg" fullWidth loading={busy === 'wallet'} disabled={busy !== ''} onClick={handleWallet}>
              Conectar wallet
            </Button>
          </>
        )}

        {error && <p className="auth-error" role="alert">{error}</p>}

        <p className="auth-note">
          Sin contraseñas ni frases semilla: si entras con tu correo o con
          Google, tu cuenta crea su propia wallet integrada.
        </p>
      </div>
    </dialog>
  );
}
