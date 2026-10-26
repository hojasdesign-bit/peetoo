import React from 'react';
import styles from './TestimonialCard.module.css';
import { cn } from '../../utils.js';

/**
 * TestimonialCard — tarjeta violeta sólida con 5 estrellas blancas,
 * cita del cliente y firma del autor.
 */
export function TestimonialCard({ quote, author, role, className = '', ...rest }) {
  const initial = author ? author.trim().charAt(0).toUpperCase() : '?';
  return (
    <figure className={cn(styles.card, className)} {...rest}>
      <div className={styles.stars} role="img" aria-label="Calificación: 5 de 5 estrellas">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} className={styles.star} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M8 1.5l1.95 3.95 4.36.63-3.16 3.08.75 4.35L8 11.6l-3.9 2.05.75-4.35L1.69 6.08l4.36-.63L8 1.5z"
              fill="currentColor"
            />
          </svg>
        ))}
      </div>
      <blockquote className={styles.quote}>“{quote}”</blockquote>
      <figcaption className={styles.author}>
        <span className={styles.avatar} aria-hidden="true">
          {initial}
        </span>
        <span className={styles.authorTexts}>
          <strong className={styles.authorName}>{author}</strong>
          {role && <span className={styles.authorRole}>{role}</span>}
        </span>
      </figcaption>
    </figure>
  );
}
