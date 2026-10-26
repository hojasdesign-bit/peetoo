import React from 'react';
import styles from './OfferTable.module.css';
import { cn } from '../../utils.js';
import { AssetPair } from '../AssetPair/AssetPair.jsx';
import { TraderCell } from '../TraderCell/TraderCell.jsx';
import { OverflowChips } from '../OverflowChips/OverflowChips.jsx';
import { NetworkChip } from '../NetworkChip/NetworkChip.jsx';
import { Button } from '../Button/Button.jsx';
import { IconButton } from '../IconButton/IconButton.jsx';

const PauseIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 5v14M15 5v14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg>
);
const PlayIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M8 5.5v13l11-6.5-11-6.5Z" fill="currentColor" /></svg>
);
const EyeIcon = (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M2.5 12S6 5 12 5s9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z" stroke="currentColor" strokeWidth="1.8" /><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" /></svg>
);

/**
 * OfferTable — la tabla DENSA de ofertas del mercado P2P (la vista de
 * escritorio de Peetoo): par Das/Recibes, disponible y límites, precio,
 * métodos y redes con desborde +N, anunciante y acción. OfferCard sigue
 * siendo la vista de tarjeta/móvil; esta es su contraparte en tabla.
 * Con `own` en una oferta, la acción pasa a ser pausar/reanudar y ver
 * (la vista de «Mis ofertas»).
 * Oferta: { id, give, receive, reverse, available, limits, price,
 * priceNote, methods[], networks[{name,symbol,color}], trader, ctaLabel,
 * own, paused }
 */
export function OfferTable({ offers = [], onAction, onTogglePause, onView, className = '', ...rest }) {
  return (
    <div className={cn(styles.wrap, className)} {...rest}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">Das / Recibes</th>
            <th scope="col">Disponible / Límites</th>
            <th scope="col">Precio</th>
            <th scope="col">Métodos de pago</th>
            <th scope="col">Red blockchain</th>
            <th scope="col">Anunciante</th>
            <th scope="col"><span className={styles.srOnly}>Acciones</span></th>
          </tr>
        </thead>
        <tbody>
          {offers.map((o, i) => (
            <tr key={o.id ?? i} className={cn(o.paused && styles.paused)}>
              <td>
                <AssetPair from={o.give} to={o.receive} reverse={o.reverse} size={40} />
              </td>
              <td>
                <div className={styles.amount}>{o.available}</div>
                {o.limits && <div className={styles.sub}>{o.limits}</div>}
              </td>
              <td>
                <div className={styles.price}>{o.price}</div>
                {o.priceNote && <div className={styles.sub}>{o.priceNote}</div>}
              </td>
              <td>
                <OverflowChips items={o.methods || []} maxVisible={2} />
              </td>
              <td>
                {o.networks?.length ? (
                  <OverflowChips
                    items={o.networks}
                    maxVisible={2}
                    renderItem={(n) => <NetworkChip name={n.name} symbol={n.symbol} color={n.color} />}
                  />
                ) : (
                  <span className={styles.sub}>—</span>
                )}
              </td>
              <td>
                <TraderCell trader={o.trader} />
              </td>
              <td className={styles.actions}>
                {o.own ? (
                  <span className={styles.ownActions}>
                    <IconButton label={o.paused ? 'Reanudar oferta' : 'Pausar oferta'} size="lg" onClick={() => onTogglePause?.(o)}>
                      {o.paused ? PlayIcon : PauseIcon}
                    </IconButton>
                    <IconButton label="Ver detalles" size="lg" onClick={() => onView?.(o)}>
                      {EyeIcon}
                    </IconButton>
                  </span>
                ) : (
                  <Button size="md" onClick={() => onAction?.(o)}>
                    {o.ctaLabel || 'Comprar'}
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {offers.length === 0 && <p className={styles.empty}>No hay ofertas que coincidan con los filtros.</p>}
    </div>
  );
}
