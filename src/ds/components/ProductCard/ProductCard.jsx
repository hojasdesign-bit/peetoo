import { useState } from 'react';
import styles from './ProductCard.module.css';
import { cn } from '../../utils.js';
import { RatingStars } from '../RatingStars/RatingStars.jsx';

/**
 * ProductCard — ficha de producto de la tienda: imagen, insignia
 * (oferta/stock), favorito, título, valoración, precio con tachado
 * y botón de añadir.
 */
export function ProductCard({
  image,
  imageAlt = '',
  title,
  price,
  oldPrice,
  rating,
  ratingCount,
  badge,
  onAdd,
  onClick,
  className = '',
  ...rest
}) {
  const [fav, setFav] = useState(false);
  return (
    <article className={cn(styles.card, className)} {...rest}>
      <div className={styles.media}>
        {typeof image === 'string' ? <img src={image} alt={imageAlt} loading="lazy" /> : image}
        {badge && <span className={styles.badge}>{badge}</span>}
        <button
          type="button"
          className={cn(styles.fav, fav && styles.favOn)}
          aria-label={fav ? 'Quitar de guardados' : 'Guardar'}
          aria-pressed={fav}
          onClick={() => setFav((f) => !f)}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill={fav ? 'currentColor' : 'none'} aria-hidden="true">
            <path d="M12 20.5C7 16.5 3.5 13.2 3.5 9.6A4.6 4.6 0 0 1 8.1 5c1.6 0 3 .8 3.9 2a4.9 4.9 0 0 1 3.9-2 4.6 4.6 0 0 1 4.6 4.6c0 3.6-3.5 6.9-8.5 10.9Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        {rating != null && (
          <span className={styles.rating}>
            <RatingStars value={rating} size={13} />
            {ratingCount != null && <span className={styles.ratingCount}>({ratingCount})</span>}
          </span>
        )}
        <div className={styles.footer}>
          <span className={styles.prices}>
            <span className={styles.price}>{price}</span>
            {oldPrice && <span className={styles.oldPrice}>{oldPrice}</span>}
          </span>
          {onAdd && (
            <button type="button" className={styles.add} onClick={onAdd} aria-label={`Añadir ${title} al carrito`}>
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none"><path d="M7 2.5v9M2.5 7h9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg>
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
