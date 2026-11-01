import React, { useRef, useState } from 'react';
import styles from './FileInput.module.css';
import { cn } from '../../utils.js';

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1).replace('.', ',')} MB`;
}

/**
 * FileInput — zona de subida con arrastrar y soltar más botón para
 * elegir desde el dispositivo. `multiple` permite varios archivos y
 * `accept` filtra por tipo (p. ej. "image/*"). Debajo muestra la
 * lista de elegidos con su tamaño y un botón para quitar cada uno.
 * `error` pinta el borde en peligro y el mensaje debajo.
 */
export function FileInput({
  multiple = false,
  accept,
  onChange,
  error,
  label = 'Arrastra archivos aquí o elige desde tu dispositivo',
  buttonLabel = 'Elegir archivos',
  className = '',
  ...rest
}) {
  const inputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);

  const update = (next) => {
    setFiles(next);
    onChange?.(next);
  };

  const addFiles = (list) => {
    const incoming = Array.from(list || []);
    if (incoming.length === 0) return;
    update(multiple ? [...files, ...incoming] : [incoming[0]]);
  };

  const remove = (index) => update(files.filter((_, i) => i !== index));
  const openDialog = () => inputRef.current?.click();

  return (
    <div className={cn(styles.wrap, className)} {...rest}>
      <input
        ref={inputRef}
        type="file"
        className={styles.hidden}
        multiple={multiple}
        accept={accept}
        tabIndex={-1}
        aria-hidden="true"
        onChange={(event) => {
          addFiles(event.target.files);
          event.target.value = '';
        }}
      />
      <div
        className={cn(styles.dropzone, dragging && styles.dragging, error && styles.error)}
        role="button"
        tabIndex={0}
        aria-label={label}
        onClick={openDialog}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openDialog();
          }
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          addFiles(event.dataTransfer.files);
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={styles.icon}>
          <path
            d="M12 16V4m0 0 4 4m-4-4-4 4M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className={styles.label}>{label}</p>
        <button
          type="button"
          className={styles.button}
          onClick={(event) => {
            event.stopPropagation();
            openDialog();
          }}
        >
          {buttonLabel}
        </button>
        {accept && <p className={styles.accept}>Acepta: {accept}</p>}
      </div>
      {files.length > 0 && (
        <ul className={styles.list}>
          {files.map((file, i) => (
            <li key={`${file.name}-${i}`} className={styles.file}>
              <span className={styles.name} title={file.name}>
                {file.name}
              </span>
              <span className={styles.size}>{formatSize(file.size)}</span>
              <button type="button" className={styles.remove} onClick={() => remove(i)} aria-label={`Quitar ${file.name}`}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2 2l8 8M10 2 2 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
      {error && (
        <p className={styles.errorText} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
