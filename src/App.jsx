import React from 'react';
import { MercadoScreen } from './ds/flows/MercadoScreen.jsx';
import { OrdenRoom, ExitoScreen } from './ds/flows/OrdenRoom.jsx';
import {
  CrearAnuncioScreen,
  RevisarScreen,
  MisAnunciosScreen,
  DetalleAnuncioScreen,
} from './ds/flows/CrearAnuncio.jsx';
import {
  LoginModal,
  TomarOrdenModal,
  CalificarModal,
} from './ds/flows/modals.jsx';

/**
 * Mercado P2P — los flujos de los videos de Cueva recorribles de punta a punta
 * con los componentes del Crypto DS:
 * mercado → (login) → tomar orden → sala (espera → pago / venta) → éxito →
 * calificar; y crear anuncio → revisar → publicar → detalle.
 */
export default function App() {
  const [screen, setScreen] = React.useState('mercado');
  const [mode, setMode] = React.useState('comprar');
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [loginOpen, setLoginOpen] = React.useState(false);
  const [tomarOpen, setTomarOpen] = React.useState(false);
  const [salaEstado, setSalaEstado] = React.useState('espera');
  const [calificarOpen, setCalificarOpen] = React.useState(false);
  const [light, setLight] = React.useState(false);
  const [demoOpen, setDemoOpen] = React.useState(false);

  React.useEffect(() => {
    if (light) document.documentElement.dataset.theme = 'claro';
    else delete document.documentElement.dataset.theme;
  }, [light]);

  // En «espera», el vendedor acepta a los pocos segundos y la sala avanza sola.
  React.useEffect(() => {
    if (screen !== 'sala' || salaEstado !== 'espera') return;
    const t = setTimeout(() => setSalaEstado('pago'), 7000);
    return () => clearTimeout(t);
  }, [screen, salaEstado]);

  // Saltos directos a cada flujo con datos de muestra (botón «Probar flujos»
  // o por URL: /#sala-pago, /#crear, /#calificar…).
  const goDemo = (key) => {
    setLoginOpen(false);
    setTomarOpen(false);
    setCalificarOpen(false);
    window.location.hash = key;
    if (key === 'mercado') { setMode('comprar'); setScreen('mercado'); }
    else if (key === 'mercado-vender') { setMode('vender'); setScreen('mercado'); }
    else if (key === 'login') { setScreen('mercado'); setLoginOpen(true); }
    else if (key === 'tomar-orden') { setLoggedIn(true); setScreen('mercado'); setTomarOpen(true); }
    else if (key === 'sala-espera') { setLoggedIn(true); setSalaEstado('espera'); setScreen('sala'); }
    else if (key === 'sala-pago') { setLoggedIn(true); setSalaEstado('pago'); setScreen('sala'); }
    else if (key === 'sala-venta') { setLoggedIn(true); setSalaEstado('venta'); setScreen('sala'); }
    else if (key === 'exito') { setLoggedIn(true); setScreen('exito'); }
    else if (key === 'calificar') { setLoggedIn(true); setScreen('exito'); setCalificarOpen(true); }
    else if (key === 'mis-anuncios') setScreen('anuncios');
    else if (key === 'crear') setScreen('crear');
    else if (key === 'revisar') setScreen('revisar');
    else if (key === 'detalle') setScreen('detalle');
    setDemoOpen(false);
  };

  React.useEffect(() => {
    const h = window.location.hash.replace('#', '');
    if (h) goDemo(h);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = (label) => {
    if (label === 'Mercado P2P') setScreen('mercado');
    else if (label === 'Mis anuncios') setScreen('anuncios');
    else if (label === 'Mis órdenes') setScreen('mercado');
  };

  const takeOffer = () => {
    if (!loggedIn) setLoginOpen(true);
    else setTomarOpen(true);
  };

  const loginDone = () => {
    setLoggedIn(true);
    setLoginOpen(false);
    setTomarOpen(true);
  };

  const confirmTake = () => {
    setTomarOpen(false);
    setSalaEstado(mode === 'comprar' ? 'espera' : 'venta');
    setScreen('sala');
  };

  const finishToExito = () => {
    setScreen('exito');
    setTimeout(() => setCalificarOpen(true), 900);
  };

  return (
    <div className="app-shell">
      {screen === 'mercado' && (
        <MercadoScreen
          brand="peetoo"
          mode={mode}
          onModeChange={setMode}
          onTakeOffer={takeOffer}
          onCrear={() => setScreen('crear')}
          onNavigate={navigate}
        />
      )}
      {screen === 'sala' && (
        <OrdenRoom
          brand="peetoo"
          estado={salaEstado}
          onConfirmarPago={finishToExito}
          onLiberar={finishToExito}
          onCancelar={() => setScreen('mercado')}
          onNavigate={navigate}
        />
      )}
      {screen === 'exito' && <ExitoScreen onOtraOperacion={() => setScreen('mercado')} />}
      {screen === 'crear' && (
        <CrearAnuncioScreen
          onContinuar={() => setScreen('revisar')}
          onAtras={() => setScreen('anuncios')}
        />
      )}
      {screen === 'revisar' && (
        <RevisarScreen
          onPublicar={() => setScreen('detalle')}
          onEditar={() => setScreen('crear')}
        />
      )}
      {screen === 'anuncios' && (
        <MisAnunciosScreen onCrear={() => setScreen('crear')} onNavigate={navigate} brand="peetoo" />
      )}
      {screen === 'detalle' && <DetalleAnuncioScreen onNavigate={navigate} brand="peetoo" />}

      {loginOpen && <LoginModal onClose={() => setLoginOpen(false)} onContinuar={loginDone} />}
      {tomarOpen && (
        <TomarOrdenModal modo={mode} onClose={() => setTomarOpen(false)} onConfirm={confirmTake} />
      )}
      {calificarOpen && (
        <CalificarModal onClose={() => setCalificarOpen(false)} onEnviar={() => setCalificarOpen(false)} />
      )}

      <div className="demo">
        <button type="button" className="demo-btn" onClick={() => setDemoOpen((v) => !v)}>
          🧪 Probar flujos
        </button>
        {demoOpen && (
          <div className="demo-panel">
            <b>Ir directo a un flujo</b>
            <span className="demo-note">Datos de solo muestra · Funciona offline</span>
            <div className="demo-group">Compra</div>
            <button type="button" onClick={() => goDemo('mercado')}>Mercado · Comprar</button>
            <button type="button" onClick={() => goDemo('login')}>Iniciar sesión</button>
            <button type="button" onClick={() => goDemo('tomar-orden')}>Tomar orden</button>
            <button type="button" onClick={() => goDemo('sala-espera')}>Sala · Espera al vendedor</button>
            <button type="button" onClick={() => goDemo('sala-pago')}>Sala · Transfiere el dinero</button>
            <button type="button" onClick={() => goDemo('exito')}>Éxito · Intercambio realizado</button>
            <button type="button" onClick={() => goDemo('calificar')}>Calificar operación</button>
            <div className="demo-group">Venta</div>
            <button type="button" onClick={() => goDemo('mercado-vender')}>Mercado · Vender</button>
            <button type="button" onClick={() => goDemo('sala-venta')}>Sala · Espera el pago</button>
            <div className="demo-group">Anuncios</div>
            <button type="button" onClick={() => goDemo('mis-anuncios')}>Mis anuncios (vacío)</button>
            <button type="button" onClick={() => goDemo('crear')}>Crear anuncio</button>
            <button type="button" onClick={() => goDemo('revisar')}>Revisar y publicar</button>
            <button type="button" onClick={() => goDemo('detalle')}>Detalle de anuncio</button>
          </div>
        )}
      </div>

      <button type="button" className="theme-toggle" onClick={() => setLight((v) => !v)}>
        {light ? '🌙 Modo oscuro' : '☀ Modo claro'}
      </button>
    </div>
  );
}
