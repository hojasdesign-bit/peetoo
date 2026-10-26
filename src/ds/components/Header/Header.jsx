import React, { useEffect, useRef, useState } from 'react';
import styles from './Header.module.css';
import { DropdownMenu } from '../DropdownMenu/DropdownMenu.jsx';

/**
 * Header — cabecera de sitio con la geometría exacta de la página de
 * referencia: logo 32px + marca 20px/700, nav 16px/500 con gap 30px y
 * margen izquierdo 44px, CTA violeta 16px/700 radio 16, y mega-menús
 * de 1100px centrados en el header con intro, monedas, tarjetas,
 * banner, enlaces y redes (componentes DropdownMenu, MenuIntro,
 * MenuCoinButton, MenuCard, MenuBanner, MenuLinkColumn, MenuSocials).
 *
 * Apertura POR HOVER: al entrar al ítem se abre su menú y al salir
 * del header se cierra (con 150ms de margen); el clic sigue
 * funcionando como respaldo táctil y de teclado, y Escape o clic
 * fuera también cierran. En móvil (≤720px) el nav se pliega en un
 * panel con acordeones que se abren con clic.
 */
export function Header({
  brand = { label: 'Crypto DS', href: '#' },
  brandIcon,
  items = [],
  cta,
  className = '',
  ...rest
}) {
  const [open, setOpen] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef(null);
  const rootRef = useRef(null);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(null), 150);
  };
  const openItem = (index) => {
    cancelClose();
    setOpen(index);
  };

  useEffect(() => () => cancelClose(), []);

  useEffect(() => {
    if (open === null) return;
    const onPointerDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(null);
    };
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(null);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open ]);

  const openDropdown = open !== null ? items[open]?.dropdown : null;

  return (
    <header
      className={`${styles.header} ${className}`.trim()}
      ref={rootRef}
      onMouseLeave={scheduleClose}
      onMouseEnter={cancelClose}
      {...rest}
    >
      <div className={styles.inner}>
        <a className={styles.brand} href={brand.href || '#'}>
          <span className={styles.brandIcon} aria-hidden="true">
            {brandIcon || brand.label?.[0] || 'C'}
          </span>
          <span className={styles.brandWord}>{brand.label}</span>
        </a>

        <nav className={styles.nav} aria-label="Principal">
          {items.map((item, i) =>
            item.dropdown ? (
              <div key={item.label} className={styles.navItem} onMouseEnter={() => openItem(i)}>
                <button
                  type="button"
                  className={`${styles.navLink} ${open === i ? styles.navLinkOpen : ''}`.trim()}
                  aria-expanded={open === i}
                  aria-haspopup="true"
                  onClick={() => setOpen((cur) => (cur === i ? null : i))}
                  onFocus={() => openItem(i)}
                >
                  {item.label}
                  <span className={styles.chev} aria-hidden="true" />
                </button>
              </div>
            ) : (
              <a
                key={item.label}
                className={`${styles.navLink} ${styles.navPlain}`.trim()}
                href={item.href || '#'}
                onMouseEnter={() => setOpen(null)}
              >
                {item.label}
              </a>
            ),
          )}
        </nav>

        <div className={styles.right} onMouseEnter={scheduleClose}>
          {cta && (
            <a className={styles.cta} href={cta.href || '#'}>
              {cta.label}
              <span aria-hidden="true">↗</span>
            </a>
          )}
          <button
            type="button"
            className={`${styles.toggle} ${mobileOpen ? styles.toggleOpen : ''}`.trim()}
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {openDropdown && (
        <DropdownMenu dropdown={openDropdown} onNavigate={() => setOpen(null)} />
      )}

      {mobileOpen && (
        <nav className={styles.mobileNav} aria-label="Principal (móvil)">
          {items.map((item, i) =>
            item.dropdown ? (
              <div key={item.label} className={styles.mobileItem}>
                <button
                  type="button"
                  className={styles.mobileLink}
                  aria-expanded={open === i}
                  onClick={() => setOpen((cur) => (cur === i ? null : i))}
                >
                  {item.label}
                  <span className={`${styles.chev} ${open === i ? styles.chevOpen : ''}`.trim()} aria-hidden="true" />
                </button>
                <DropdownMenu dropdown={item.dropdown} mobile open={open === i} onNavigate={() => setMobileOpen(false)} />
              </div>
            ) : (
              <a key={item.label} className={styles.mobileLink} href={item.href || '#'}>
                {item.label}
              </a>
            ),
          )}
        </nav>
      )}
    </header>
  );
}
