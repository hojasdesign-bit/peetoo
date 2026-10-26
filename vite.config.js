import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));

// La app importa el Crypto DS por ruta relativa (../crypto-design-system/src).
// dedupe + alias fuerzan una sola copia de React: la de esta app.
export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: [
      { find: /^react$/, replacement: path.resolve(root, 'node_modules/react') },
      { find: /^react-dom$/, replacement: path.resolve(root, 'node_modules/react-dom') },
      { find: /^react\/(.*)$/, replacement: path.resolve(root, 'node_modules/react/$1') },
      { find: /^react-dom\/(.*)$/, replacement: path.resolve(root, 'node_modules/react-dom/$1') },
    ],
  },
  server: { fs: { allow: [path.resolve(root, '..')] } },
});
