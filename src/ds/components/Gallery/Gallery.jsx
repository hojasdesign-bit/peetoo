import { useState } from 'react';
import styles from './Gallery.module.css';
import { cn } from '../../utils.js';

/**
 * Gallery — galería de imágenes de producto: vista principal y fila
 * de miniaturas con la activa resaltada. `images` acepta URLs o nodos.
 */
export function Gallery({ images = [], alt = '', className = '', ...rest }) {
  const [active, setActive] = useState(0);
  const current = images[active];
  return (
    <div className={cn(styles.root, className)} {...rest}>
      <div className={styles.main}>
        {typeof current === 'string' ? <img src={current} alt={alt} /> : current}
      </div>
      {images.length > 1 && (
        <div className={styles.thumbs} role="tablist" aria-label="Imágenes">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={active === i}
              aria-label={`Imagen ${i + 1}`}
              className={cn(styles.thumb, active === i && styles.thumbActive)}
              onClick={() => setActive(i)}
            >
              {typeof img === 'string' ? <img src={img} alt="" /> : img}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
