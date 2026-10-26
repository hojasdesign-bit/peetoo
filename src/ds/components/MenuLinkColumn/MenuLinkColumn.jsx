import React from 'react';
import styles from './MenuLinkColumn.module.css';
import { MenuSocials } from '../MenuSocials/MenuSocials.jsx';

/** Columna de enlaces de un mega-menú, con redes opcionales debajo.
 *  Como en la referencia, la columna lleva margen izquierdo de 64px. */
export function MenuLinkColumn({ links = [], socials, mobile = false, onNavigate }) {
  return (
    <div className={`${styles.root} ${mobile ? styles.mobile : ''}`.trim().replace(/\s+/g, ' ')}>
      {links.map((link) => (
        <a key={link.label} className={styles.link} href={link.href || '#'} onClick={onNavigate} role="menuitem">
          {link.label}
        </a>
      ))}
      {socials && <MenuSocials socials={socials} />}
    </div>
  );
}
