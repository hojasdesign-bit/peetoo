import React from 'react';
import styles from './ArticleCard.module.css';
import { cn } from '../../utils.js';

/**
 * ArticleCard — tarjeta de artículo del blog (medida en /blog):
 * imagen a todo ancho con radio 20, título 20/700, extracto de
 * dos líneas, y pie con "Read more ↗" y píldoras de categoría
 * (la principal + "+N" si hay más).
 * `image` acepta una URL o un nodo (útil para placeholders).
 */
export function ArticleCard({
  image,
  imageAlt = '',
  title,
  excerpt,
  category,
  extraCount = 0,
  href = '#',
  readMoreLabel = 'Read more',
  className = '',
  ...rest
}) {
  return (
    <a className={cn(styles.card, className)} href={href} {...rest}>
      <span className={styles.media} aria-hidden={image ? 'true' : undefined}>
        {typeof image === 'string' ? <img src={image} alt={imageAlt} loading="lazy" /> : image}
      </span>
      <span className={styles.body}>
        <span className={styles.title}>{title}</span>
        {excerpt && <span className={styles.excerpt}>{excerpt}</span>}
        <span className={styles.footer}>
          <span className={styles.readMore}>
            {readMoreLabel}
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M4.5 11.5 11.5 4.5M6 4.5h5.5V10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          {(category || extraCount > 0) && (
            <span className={styles.tags}>
              {category && <span className={styles.tag}>{category}</span>}
              {extraCount > 0 && <span className={styles.tag}>+{extraCount}</span>}
            </span>
          )}
        </span>
      </span>
    </a>
  );
}
