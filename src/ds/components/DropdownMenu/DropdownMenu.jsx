import React from 'react';
import styles from './DropdownMenu.module.css';
import { MenuIntro } from '../MenuIntro/MenuIntro.jsx';
import { MenuCoinButton } from '../MenuCoinButton/MenuCoinButton.jsx';
import { MenuCard } from '../MenuCard/MenuCard.jsx';
import { MenuBanner } from '../MenuBanner/MenuBanner.jsx';
import { MenuLinkColumn } from '../MenuLinkColumn/MenuLinkColumn.jsx';

/**
 * DropdownMenu — el panel mega de la cabecera, con la geometría exacta
 * de la referencia: 1100px centrado en el header, padding 10, radio 10,
 * y tres rejillas según el contenido (monedas 366px 1fr 144px;
 * tarjetas y enlaces 1fr 144px). Se compone de MenuIntro,
 * MenuCoinButton, MenuCard, MenuBanner, MenuLinkColumn y MenuSocials.
 * En escritorio se monta solo al abrir (animación de entrada);
 * en móvil (`mobile`) vive siempre y se pliega con max-height.
 */
export function DropdownMenu({ dropdown = {}, mobile = false, open = true, onNavigate }) {
  const { intro, coins, cards, banner, primaryLinks, links, socials } = dropdown;
  const layout = coins ? 'coins' : cards ? 'cards' : 'links';
  const gridClass = layout === 'coins' ? styles.gridCoins : layout === 'cards' ? styles.gridCards : styles.gridLinks;
  return (
    <div className={`${styles.root} ${mobile ? styles.mobile : ''} ${mobile && open ? styles.mobileOpen : ''}`.trim().replace(/\s+/g, ' ')} role="menu">
      <div className={`${styles.grid} ${gridClass}`}>
        {intro && <MenuIntro title={intro.title} description={intro.description} />}
        {coins && (
          <div className={styles.coins}>
            {coins.map((coin) => (
              <MenuCoinButton key={coin.code} {...coin} onClick={onNavigate} />
            ))}
          </div>
        )}
        {cards && (
          <div className={styles.main}>
            <div className={styles.cards}>
              {cards.map((card) => (
                <MenuCard key={card.title} {...card} onClick={onNavigate} />
              ))}
            </div>
            {banner && <MenuBanner {...banner} onClick={onNavigate} />}
          </div>
        )}
        {primaryLinks && <MenuLinkColumn links={primaryLinks} mobile={mobile} onNavigate={onNavigate} />}
        {(links || socials) && <MenuLinkColumn links={links || []} socials={socials} mobile={mobile} onNavigate={onNavigate} />}
      </div>
    </div>
  );
}
