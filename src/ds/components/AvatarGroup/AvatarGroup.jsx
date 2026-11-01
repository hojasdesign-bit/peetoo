import React from 'react';
import styles from './AvatarGroup.module.css';
import { cn } from '../../utils.js';
import { Avatar } from '../Avatar/Avatar.jsx';

const SIZES = { sm: 28, md: 36 };

/**
 * AvatarGroup — pila de avatares solapados con contador «+N»: muestra
 * hasta `max` avatares y agrupa el resto en un círculo con el exceso.
 * Cada avatar puede ser un objeto { src, name }, un nombre en texto o
 * un nodo (p. ej. un Avatar ya construido). Reutiliza Avatar, así que
 * las iniciales y las fotos se comportan igual que en solitario.
 */
export function AvatarGroup({ avatars = [], max = 4, size = 'md', className = '', ...rest }) {
  const px = SIZES[size] ?? SIZES.md;
  const visible = avatars.slice(0, max);
  const hidden = avatars.slice(max);
  const hiddenNames = hidden
    .map((item) => (typeof item === 'string' ? item : item?.name))
    .filter(Boolean);

  const renderOne = (item, i) => {
    // z-index creciente: cada avatar queda POR ENCIMA del anterior,
    // así la pila se lee como discos apilados y no como anillos enlazados.
    if (React.isValidElement(item)) {
      return (
        <span key={i} className={styles.item} style={{ zIndex: i + 1 }}>
          {item}
        </span>
      );
    }
    const { src, name = '' } = typeof item === 'string' ? { name: item } : item || {};
    return (
      <span key={i} className={styles.item} style={{ zIndex: i + 1 }} title={name || undefined}>
        <Avatar src={src} name={name} size={px} />
      </span>
    );
  };

  return (
    <span
      className={cn(styles.group, className)}
      style={{ '--ag-size': `${px}px` }}
      role="group"
      aria-label={
        hiddenNames.length > 0
          ? `Participantes: ${visible
              .map((item) => (typeof item === 'string' ? item : item?.name))
              .filter(Boolean)
              .join(', ')} y ${hidden.length} más`
          : undefined
      }
      {...rest}
    >
      {visible.map(renderOne)}
      {hidden.length > 0 && (
        <span
          className={styles.more}
          style={{ width: px, height: px, fontSize: Math.round(px * 0.34), zIndex: visible.length + 1 }}
          title={hiddenNames.length > 0 ? hiddenNames.join(', ') : undefined}
          aria-label={`y ${hidden.length} más${hiddenNames.length > 0 ? `: ${hiddenNames.join(', ')}` : ''}`}
        >
          +{hidden.length}
        </span>
      )}
    </span>
  );
}
