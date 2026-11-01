import React from 'react';
import { Heading } from '../ds/components/Heading/Heading.jsx';
import { Text } from '../ds/components/Text/Text.jsx';
import { Button } from '../ds/components/Button/Button.jsx';
import { Modal } from '../ds/components/Modal/Modal.jsx';
import { Pagination } from '../ds/components/Pagination/Pagination.jsx';
import { Avatar } from '../ds/components/Avatar/Avatar.jsx';
import { VerifiedBadge } from '../ds/components/VerifiedBadge/VerifiedBadge.jsx';
import { ExchangeIcon } from '../ds/components/TraderCell/TraderCell.jsx';
import QRCode from 'react-qr-code';
import { CopyIcon, QrIcon, CheckIcon, LocationIcon } from '../components/icons.jsx';
import { PAYMENT_DETAILS, LOCATION_PRECISION, ASSETS } from '../data/offers.js';
import mapPinImg from '../assets/maps/map-pin.svg';
import mapZoneImg from '../assets/maps/map-zone.svg';

// Vista /crypto/perfil/:nombre: JSX movido tal cual desde App.jsx, sin cambios.
// Las derivaciones (profileTrader, conteos, paginación) siguen en App y
// llegan por props; renderOfferRow también (la comparte el mercado).
export default function ProfileView({ profileTrader, profileOffers, profileBuyCount, profileSellCount, profilePayMethods, profileChains, profileHasCash, profileHasOnline, profileCashCities, profileCryptoCounts, profileFiatCounts, profileOthersAvg, gaugeC, profileCurrent, profileTotalPages, profilePageOffers, profileFrom, profileTo, showAllCryptos, setShowAllCryptos, showAllFiats, setShowAllFiats, copiedMethod, qrModal, setQrModal, handleCopy, scrollToOffers, setProfilePage, goToMarket, renderOfferRow }) {
  return (
      <main className="profile-shell">
        <section className="profile" aria-label="Perfil del anunciante">
          {profileTrader ? (
            <>
              <div className="profile-layout">
                <aside className="profile-side">
                  <div className="profile-cover">
                    <div className="profile-cover-banner" aria-hidden="true" />
                    <div className="profile-cover-identity">
                      <Avatar name={profileTrader.name} size={80} ringScore={profileTrader.completion} />
                      <div className="profile-cover-name-row">
                        <h1 className="profile-name">{profileTrader.name}</h1>
                        {profileTrader.verified && <VerifiedBadge variant={profileTrader.verification} size={18} />}
                      </div>
                    </div>
                  </div>
                  <div className="profile-side-block">
                    <h3 className="profile-side-title">Métodos de pago</h3>
                    <ul className="profile-side-list">
                      {profilePayMethods.map((m) => {
                        const dest = PAYMENT_DETAILS[profileTrader.name]?.[m] || m;
                        const canShare = m !== 'Efectivo';
                        return (
                          <li key={m} className="profile-side-pay-row">
                            <div className="profile-side-pay-head">
                              <div className="profile-side-pay-method">{m}</div>
                              {canShare && (
                                <span className="profile-side-pay-actions">
                                  <button type="button" className="profile-pay-btn" aria-label={copiedMethod === m ? '¡Copiado!' : `Copiar ${m}`} title={copiedMethod === m ? '¡Copiado!' : 'Copiar'} onClick={() => handleCopy(m, dest)}>
                                    {copiedMethod === m ? CheckIcon : CopyIcon}
                                  </button>
                                  <button type="button" className="profile-pay-btn" aria-label={`Mostrar QR de ${m}`} title="Mostrar QR" onClick={() => setQrModal(m)}>
                                    {QrIcon}
                                  </button>
                                  {copiedMethod === m && <span className="profile-pay-copied">Copiado</span>}
                                </span>
                              )}
                            </div>
                            <div className="profile-side-pay-dest">{dest}</div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="profile-side-block">
                    <h3 className="profile-side-title">Disponibilidad</h3>
                    <div className="profile-chips">
                      {profileHasCash && <span className="profile-chip">Presencial</span>}
                      {profileHasOnline && <span className="profile-chip">En línea</span>}
                    </div>
                  </div>
                  <div className="profile-side-block">
                    <h3 className="profile-side-title">Ubicaciones</h3>
                    {profileCashCities.length > 0 ? (
                      <div className="profile-loc-scroll">
                        {profileCashCities.map((city) => (
                          <figure key={city} className="profile-loc-card">
                            <img src={LOCATION_PRECISION[profileTrader.name] === 'exact' ? mapPinImg : mapZoneImg} alt={`Mapa de ${city}`} className="profile-loc-img" />
                            <figcaption className="profile-loc-caption">{city} · {LOCATION_PRECISION[profileTrader.name] === 'exact' ? 'Punto exacto' : 'Zona aproximada'}</figcaption>
                          </figure>
                        ))}
                      </div>
                    ) : (
                      <p className="profile-side-text">Sin ofertas presenciales</p>
                    )}
                  </div>
                  <div className="profile-side-block">
                    <h3 className="profile-side-title">Ofertas por moneda</h3>
                    <ul className="profile-side-list">
                      {(showAllCryptos ? profileCryptoCounts : profileCryptoCounts.slice(0, 3)).map((c) => (
                        <li key={c.code} className="profile-side-row">
                          {ASSETS[c.code]?.src ? <img src={ASSETS[c.code].src} alt="" className="profile-side-coin-img" /> : <span className="profile-side-coin" style={{ background: ASSETS[c.code]?.color }}>{ASSETS[c.code]?.symbol || c.code[0]}</span>}
                          <span className="profile-side-code">{c.code}</span>
                          <span className="profile-side-count">{c.count} {c.count === 1 ? 'oferta' : 'ofertas'}</span>
                        </li>
                      ))}
                    </ul>
                    {profileCryptoCounts.length > 3 && (
                      <button type="button" className="profile-side-more" onClick={() => setShowAllCryptos((v) => !v)}>
                        {showAllCryptos ? 'Ver menos' : `Ver ${profileCryptoCounts.length - 3} más`}
                      </button>
                    )}
                  </div>
                  <div className="profile-side-block">
                    <h3 className="profile-side-title">Ofertas por fiat</h3>
                    <ul className="profile-side-list">
                      {(showAllFiats ? profileFiatCounts : profileFiatCounts.slice(0, 3)).map((c) => (
                        <li key={c.code} className="profile-side-row">
                          {ASSETS[c.code]?.src ? <img src={ASSETS[c.code].src} alt="" className="profile-side-coin-img" /> : <span className="profile-side-coin" style={{ background: ASSETS[c.code]?.color }}>{ASSETS[c.code]?.symbol || c.code[0]}</span>}
                          <span className="profile-side-code">{c.code}</span>
                          <span className="profile-side-count">{c.count} {c.count === 1 ? 'oferta' : 'ofertas'}</span>
                        </li>
                      ))}
                    </ul>
                    {profileFiatCounts.length > 3 && (
                      <button type="button" className="profile-side-more" onClick={() => setShowAllFiats((v) => !v)}>
                        {showAllFiats ? 'Ver menos' : `Ver ${profileFiatCounts.length - 3} más`}
                      </button>
                    )}
                  </div>
                  <div className="profile-side-actions">
                    <Button size="md" onClick={scrollToOffers} className="profile-side-action">Comprar</Button>
                    <Button size="md" variant="outline" onClick={scrollToOffers} className="profile-side-action">Vender</Button>
                  </div>
                </aside>
                <div className="profile-main">
                  <div className="profile-statcards">
                    <div className="profile-statcard"><div className="profile-statcard-value">{profileTrader.trades.toLocaleString('es-ES')}</div><div className="profile-statcard-label">Operaciones</div></div>
                    <div className="profile-statcard"><div className="profile-statcard-value">{profileOffers.length}</div><div className="profile-statcard-label">Ofertas activas</div></div>
                    <div className="profile-statcard"><div className="profile-statcard-value">{profileBuyCount}</div><div className="profile-statcard-label">En compra</div></div>
                    <div className="profile-statcard"><div className="profile-statcard-value">{profileSellCount}</div><div className="profile-statcard-label">En venta</div></div>
                    <div className="profile-statcard"><div className="profile-statcard-value">{profilePayMethods.length}</div><div className="profile-statcard-label">Métodos</div></div>
                    <div className="profile-statcard"><div className="profile-statcard-value">{profileChains.length}</div><div className="profile-statcard-label">Redes</div></div>
                  </div>
                  <div className="profile-row3">
                    <div className="profile-card">
                      <h3 className="profile-card-title">Reputación</h3>
                      <div className="profile-gauge-wrap">
                        <svg viewBox="0 0 160 160" className="profile-gauge-svg" aria-hidden="true">
                          <circle cx="80" cy="80" r="64" fill="none" strokeWidth="12" strokeLinecap="round" transform="rotate(225 80 80)" style={{ stroke: 'var(--cds-border-strong)', strokeDasharray: `${0.75 * gaugeC} ${gaugeC}` }} />
                          <circle cx="80" cy="80" r="64" fill="none" strokeWidth="12" strokeLinecap="round" transform="rotate(225 80 80)" style={{ stroke: 'var(--cds-accent)', strokeDasharray: `${(profileTrader.completion / 100) * 0.75 * gaugeC} ${gaugeC}` }} />
                        </svg>
                        <div className="profile-gauge-number">{profileTrader.completion}<span>%</span></div>
                      </div>
                      <p className="profile-card-sub">Porcentaje de operaciones completadas</p>
                    </div>
                    <div className="profile-card">
                      <h3 className="profile-card-title">Resumen</h3>
                      <div className="profile-summary-row">
                        <span className="profile-summary-icon">{CheckIcon}</span>
                        <div className="profile-summary-text">
                          <div className="profile-summary-title">{profileTrader.verification === 'premium' ? 'Premium' : 'Verificado'}</div>
                          <div className="profile-summary-sub">{profileTrader.verification === 'premium' ? 'Cuenta premium' : 'Cuenta verificada'}</div>
                        </div>
                      </div>
                      <div className="profile-summary-row">
                        <span className="profile-summary-icon">{ExchangeIcon}</span>
                        <div className="profile-summary-text">
                          <div className="profile-summary-title">Ofertas activas</div>
                          <div className="profile-summary-sub">{profileOffers.length} en total · {profileBuyCount} compra · {profileSellCount} venta</div>
                        </div>
                      </div>
                      <div className="profile-summary-row">
                        <span className="profile-summary-icon">{LocationIcon}</span>
                        <div className="profile-summary-text">
                          <div className="profile-summary-title">Presenciales</div>
                          <div className="profile-summary-sub">{profileCashCities.length > 0 ? `${profileCashCities.length} ${profileCashCities.length === 1 ? 'ciudad' : 'ciudades'}` : 'Sin ofertas presenciales'}</div>
                        </div>
                      </div>
                    </div>
                    <div className="profile-card">
                      <h3 className="profile-card-title">Comparativa</h3>
                      <div className="profile-compare-row">
                        <div className="profile-compare-label"><span>{profileTrader.name}</span><span>{profileTrader.completion}%</span></div>
                        <div className="profile-compare-track"><div className="profile-compare-bar profile-compare-bar--me" style={{ width: `${profileTrader.completion}%` }} /></div>
                      </div>
                      <div className="profile-compare-row">
                        <div className="profile-compare-label"><span>Otros anunciantes</span><span>{profileOthersAvg}%</span></div>
                        <div className="profile-compare-track"><div className="profile-compare-bar profile-compare-bar--others" style={{ width: `${profileOthersAvg}%` }} /></div>
                      </div>
                      <p className="profile-card-sub">Media de completado de los demás anunciantes</p>
                    </div>
                  </div>
                </div>
              </div>
              {qrModal && (
                <Modal open={!!qrModal} onClose={() => setQrModal(null)} title={`QR de ${qrModal}`}>
                  <div className="qr-modal-body">
                    <div className="qr-modal-code">
                      <QRCode value={PAYMENT_DETAILS[profileTrader.name]?.[qrModal] || qrModal} size={220} bgColor="#ffffff" fgColor="#000000" />
                    </div>
                    <p className="qr-modal-dest">{PAYMENT_DETAILS[profileTrader.name]?.[qrModal] || qrModal}</p>
                    <Button size="md" onClick={() => handleCopy(qrModal, PAYMENT_DETAILS[profileTrader.name]?.[qrModal] || qrModal)}>
                      {copiedMethod === qrModal ? '¡Copiado!' : 'Copiar destino'}
                    </Button>
                  </div>
                </Modal>
              )}
              <h2 id="profile-offers" className="profile-offers-title">Ofertas de {profileTrader.name}</h2>
              <div className="offer-list-wrap">
                <div className="offer-list" role="table" aria-label={`Ofertas de ${profileTrader.name}`}>
                  <div className="offer-head" role="row">
                    <div className="offer-cell" role="columnheader">Das / Recibes</div>
                    <div className="offer-cell" role="columnheader">Disponible / Min - Max</div>
                    <div className="offer-cell" role="columnheader">Precio</div>
                    <div className="offer-cell" role="columnheader">Red blockchain</div>
                    <div className="offer-cell" role="columnheader">Anunciante</div>
                    <div className="offer-cell" role="columnheader"><span className="sr-only">Acciones</span></div>
                  </div>
                  {profilePageOffers.map((o) => renderOfferRow(o, true))}
                </div>
              </div>
              <div className="pager">
                <Pagination page={profileCurrent} totalPages={profileTotalPages} onChange={setProfilePage} />
                <Text tone="muted">Mostrando {profileFrom} - {profileTo} de {profileOffers.length} items</Text>
              </div>
            </>
          ) : (
            <div className="profile-notfound">
              <Heading level="h1">Anunciante no encontrado</Heading>
              <Text tone="muted">No existe un anunciante con ese nombre.</Text>
              <Button size="lg" onClick={goToMarket}>Volver al mercado</Button>
            </div>
          )}
        </section>
      </main>
  );
}
